// Page-level review model (Phase 3 v2). Lives alongside the per-decision db.js,
// reuses the decisions table for block storage with block_type discriminator.

export async function listPages(db) {
  const { results } = await db
    .prepare("SELECT * FROM pages ORDER BY id")
    .all();
  return results;
}

export async function getPageBySlug(db, slug) {
  return await db.prepare("SELECT * FROM pages WHERE slug = ?1").bind(slug).first();
}

export async function getPageById(db, id) {
  return await db.prepare("SELECT * FROM pages WHERE id = ?1").bind(id).first();
}

export async function createPage(db, { slug, title, live_url, status = "draft" }) {
  const r = await db
    .prepare("INSERT INTO pages (slug, title, live_url, status) VALUES (?1, ?2, ?3, ?4)")
    .bind(slug, title, live_url ?? null, status)
    .run();
  return { id: r.meta.last_row_id };
}

export async function updatePageStatus(db, pageId, status) {
  await db
    .prepare("UPDATE pages SET status = ?1, published_at = CASE WHEN ?1 = 'published' THEN datetime('now') ELSE published_at END WHERE id = ?2")
    .bind(status, pageId)
    .run();
}

// Blocks live in `decisions` rows scoped by page_slug and typed via block_type.
export async function listBlocksForPage(db, pageSlug) {
  const { results } = await db
    .prepare(
      `SELECT * FROM decisions
       WHERE page_slug = ?1 AND block_type IN ('ab_choice','checklist')
       ORDER BY sort_order, id`,
    )
    .bind(pageSlug)
    .all();
  return results;
}

export async function createBlock(
  db,
  { page_slug, block_type, section, question, context, options, target_selector, sort_order = 0 },
) {
  // section reused as in-page anchor label for back-compat with existing UI.
  const r = await db
    .prepare(
      `INSERT INTO decisions
        (section, kind, question, context, options, target_selector, block_type, page_slug, sort_order)
       VALUES (?1, 'copy', ?2, ?3, ?4, ?5, ?6, ?7, ?8)`,
    )
    .bind(
      section || page_slug,
      question,
      context ?? null,
      JSON.stringify(options),
      JSON.stringify(target_selector || { file: "", anchor_string: "" }),
      block_type,
      page_slug,
      sort_order,
    )
    .run();
  return { id: r.meta.last_row_id };
}

export async function deleteBlock(db, blockId) {
  await db.prepare("DELETE FROM submissions WHERE decision_id = ?1").bind(blockId).run();
  await db.prepare("DELETE FROM assignments WHERE decision_id = ?1").bind(blockId).run();
  await db.prepare("DELETE FROM decisions WHERE id = ?1").bind(blockId).run();
}

export async function updateBlockSort(db, blockId, sort_order) {
  await db.prepare("UPDATE decisions SET sort_order = ?1 WHERE id = ?2").bind(sort_order, blockId).run();
}

// Page assignments: which reviewers have access to a page. Stored as assignment rows
// against every block of that page on publish. This keeps existing assignment
// semantics intact while letting page authoring fan out reviewers.
export async function assignReviewersToPage(db, pageSlug, reviewerIds) {
  const { results: blocks } = await db
    .prepare("SELECT id FROM decisions WHERE page_slug = ?1 AND block_type IN ('ab_choice','checklist')")
    .bind(pageSlug)
    .all();
  for (const b of blocks) {
    for (const rid of reviewerIds) {
      await db
        .prepare(
          "INSERT OR IGNORE INTO assignments (decision_id, reviewer_id) VALUES (?1, ?2)",
        )
        .bind(b.id, rid)
        .run();
    }
  }
}

export async function getAssignedReviewerIdsForPage(db, pageSlug) {
  const { results } = await db
    .prepare(
      `SELECT DISTINCT a.reviewer_id FROM assignments a
       JOIN decisions d ON d.id = a.decision_id
       WHERE d.page_slug = ?1`,
    )
    .bind(pageSlug)
    .all();
  return results.map((r) => r.reviewer_id);
}

// Sign-off
export async function getSignoffsForPage(db, pageId) {
  const { results } = await db
    .prepare(
      `SELECT ps.*, r.name AS reviewer_name FROM page_signoffs ps
       JOIN reviewers r ON r.id = ps.reviewer_id
       WHERE ps.page_id = ?1
       ORDER BY ps.signed_at`,
    )
    .bind(pageId)
    .all();
  return results;
}

export async function getSignoffByReviewer(db, pageId, reviewerId) {
  return await db
    .prepare("SELECT * FROM page_signoffs WHERE page_id = ?1 AND reviewer_id = ?2")
    .bind(pageId, reviewerId)
    .first();
}

export async function recordSignoff(db, { page_id, reviewer_id, note, signed_off_with_incomplete }) {
  await db
    .prepare(
      `INSERT INTO page_signoffs (page_id, reviewer_id, note, signed_off_with_incomplete)
       VALUES (?1, ?2, ?3, ?4)
       ON CONFLICT(page_id, reviewer_id) DO UPDATE SET
         note = excluded.note,
         signed_off_with_incomplete = excluded.signed_off_with_incomplete,
         signed_at = datetime('now')`,
    )
    .bind(page_id, reviewer_id, note ?? null, signed_off_with_incomplete ? 1 : 0)
    .run();
}

// On sign-off transition: if >=3 signoffs and status is in_review, flip to editorially_approved.
export async function maybeAdvanceAfterSignoff(db, pageId) {
  const page = await getPageById(db, pageId);
  if (!page) return null;
  if (page.status !== "in_review") return page;
  const { c } = await db
    .prepare("SELECT COUNT(*) AS c FROM page_signoffs WHERE page_id = ?1")
    .bind(pageId)
    .first();
  if (c >= 3) {
    await updatePageStatus(db, pageId, "editorially_approved");
    return await getPageById(db, pageId);
  }
  return page;
}

// On factual-flag resolution: if page is editorially_approved and no open flags remain, advance.
export async function maybeAdvanceAfterFlagResolution(db, pageId) {
  const page = await getPageById(db, pageId);
  if (!page) return null;
  if (page.status !== "editorially_approved") return page;
  const { c } = await db
    .prepare(
      "SELECT COUNT(*) AS c FROM factual_flags WHERE page_id = ?1 AND status NOT IN ('confirmed','rejected','deferred')",
    )
    .bind(pageId)
    .first();
  if (c === 0) {
    await updatePageStatus(db, pageId, "publish_ready");
    return await getPageById(db, pageId);
  }
  return page;
}

// Factual flags
export async function createFlag(
  db,
  { page_id, anchor, claim_under_review, proposed_correction, evidence_url, flagged_by_reviewer_id },
) {
  const r = await db
    .prepare(
      `INSERT INTO factual_flags
        (page_id, anchor, claim_under_review, proposed_correction, evidence_url, flagged_by_reviewer_id)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)`,
    )
    .bind(
      page_id,
      anchor ?? null,
      claim_under_review,
      proposed_correction,
      evidence_url ?? null,
      flagged_by_reviewer_id,
    )
    .run();
  return { id: r.meta.last_row_id };
}

export async function listFlagsForPage(db, pageId) {
  const { results } = await db
    .prepare(
      `SELECT f.*, r.name AS flagger_name FROM factual_flags f
       JOIN reviewers r ON r.id = f.flagged_by_reviewer_id
       WHERE f.page_id = ?1
       ORDER BY f.created_at DESC`,
    )
    .bind(pageId)
    .all();
  return results;
}

export async function listAllFlags(db) {
  const { results } = await db
    .prepare(
      `SELECT f.*, r.name AS flagger_name, p.slug AS page_slug, p.title AS page_title
       FROM factual_flags f
       JOIN reviewers r ON r.id = f.flagged_by_reviewer_id
       JOIN pages p ON p.id = f.page_id
       ORDER BY f.created_at DESC`,
    )
    .all();
  return results;
}

export async function updateFlag(db, flagId, { status, sme_assignee, sme_note }) {
  const fields = [];
  const binds = [];
  let n = 1;
  if (status !== undefined) {
    fields.push(`status = ?${n++}`);
    binds.push(status);
  }
  if (sme_assignee !== undefined) {
    fields.push(`sme_assignee = ?${n++}`);
    binds.push(sme_assignee);
  }
  if (sme_note !== undefined) {
    fields.push(`sme_note = ?${n++}`);
    binds.push(sme_note);
  }
  if (status && ["confirmed", "rejected", "deferred"].includes(status)) {
    fields.push(`resolved_at = datetime('now')`);
  }
  binds.push(flagId);
  await db
    .prepare(`UPDATE factual_flags SET ${fields.join(", ")} WHERE id = ?${n}`)
    .bind(...binds)
    .run();
}

export async function markFlaggerNotified(db, flagId) {
  await db
    .prepare("UPDATE factual_flags SET flagger_notified_at = datetime('now') WHERE id = ?1")
    .bind(flagId)
    .run();
}

// Vote-tally helpers
export async function getSubmissionsForBlock(db, blockId) {
  const { results } = await db
    .prepare(
      `SELECT s.*, r.name AS reviewer_name FROM submissions s
       JOIN reviewers r ON r.id = s.reviewer_id
       WHERE s.decision_id = ?1
       ORDER BY r.name`,
    )
    .bind(blockId)
    .all();
  return results;
}

export function tallyForAbBlock(submissions) {
  const counts = {};
  let total = 0;
  for (const s of submissions) {
    if (!s.choice || s.choice === "skip") continue;
    counts[s.choice] = (counts[s.choice] || 0) + 1;
    total++;
  }
  return { counts, total };
}

export function tallyForChecklistBlock(submissions, items) {
  // submissions[i].other_text holds JSON {checked:[], added:[]}
  const itemCounts = {};
  const added = [];
  let responders = 0;
  for (const s of submissions) {
    if (!s.other_text) continue;
    let parsed;
    try {
      parsed = JSON.parse(s.other_text);
    } catch {
      continue;
    }
    responders++;
    for (const k of parsed.checked || []) {
      itemCounts[k] = (itemCounts[k] || 0) + 1;
    }
    for (const a of parsed.added || []) {
      added.push({ reviewer: s.reviewer_name, text: a });
    }
  }
  const itemRates = (items || []).map((it) => ({
    key: it.key,
    label: it.label,
    count: itemCounts[it.key] || 0,
  }));
  return { itemRates, added, responders };
}

export async function markInterstitialSeen(db, reviewerId) {
  await db
    .prepare("UPDATE reviewers SET seen_interstitial_at = datetime('now') WHERE id = ?1")
    .bind(reviewerId)
    .run();
}
