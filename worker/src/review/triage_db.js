// Triage DB helpers — content-triage decisions for the WP page list.

export async function listTriagePages(db) {
  const { results } = await db
    .prepare("SELECT * FROM triage_pages ORDER BY sort_order, id")
    .all();
  return results;
}

export async function getTriagePageBySlugKey(db, slugKey) {
  return await db
    .prepare("SELECT * FROM triage_pages WHERE slug_key = ?1")
    .bind(slugKey)
    .first();
}

export async function upsertTriagePage(db, p) {
  await db
    .prepare(
      `INSERT INTO triage_pages
         (slug_key, title, wp_url, last_modified, word_count, wp_status,
          recommendation, fold_target, rationale, preserved_url, sort_order)
       VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11)
       ON CONFLICT(slug_key) DO UPDATE SET
         title = excluded.title,
         wp_url = excluded.wp_url,
         last_modified = excluded.last_modified,
         word_count = excluded.word_count,
         wp_status = excluded.wp_status,
         recommendation = excluded.recommendation,
         fold_target = excluded.fold_target,
         rationale = excluded.rationale,
         preserved_url = excluded.preserved_url,
         sort_order = excluded.sort_order`,
    )
    .bind(
      p.slug_key,
      p.title,
      p.wp_url ?? null,
      p.last_modified ?? null,
      p.word_count ?? null,
      p.wp_status ?? null,
      p.recommendation,
      p.fold_target ?? null,
      p.rationale ?? null,
      p.preserved_url ? 1 : 0,
      p.sort_order ?? 0,
    )
    .run();
}

export async function upsertTriageDecision(db, { reviewer_id, page_slug_key, decision, comment }) {
  await db
    .prepare(
      `INSERT INTO triage_decisions (reviewer_id, page_slug_key, decision, comment)
       VALUES (?1, ?2, ?3, ?4)
       ON CONFLICT(reviewer_id, page_slug_key) DO UPDATE SET
         decision = excluded.decision,
         comment = excluded.comment,
         created_at = datetime('now')`,
    )
    .bind(reviewer_id, page_slug_key, decision, comment ?? null)
    .run();
}

export async function getDecisionsByReviewer(db, reviewerId) {
  const { results } = await db
    .prepare("SELECT * FROM triage_decisions WHERE reviewer_id = ?1")
    .bind(reviewerId)
    .all();
  return results;
}

export async function getAllTriageDecisions(db) {
  const { results } = await db
    .prepare(
      `SELECT td.*, r.name AS reviewer_name, r.email AS reviewer_email
       FROM triage_decisions td
       JOIN reviewers r ON r.id = td.reviewer_id
       ORDER BY td.page_slug_key, r.name`,
    )
    .all();
  return results;
}

// Tally per-page: { slug_key: {agree, flag, unsure, total} }
export async function getTalliesByPage(db) {
  const { results } = await db
    .prepare(
      `SELECT page_slug_key,
              SUM(CASE WHEN decision='agree' THEN 1 ELSE 0 END) AS agree,
              SUM(CASE WHEN decision='flag' THEN 1 ELSE 0 END) AS flag,
              SUM(CASE WHEN decision='unsure' THEN 1 ELSE 0 END) AS unsure,
              COUNT(*) AS total
       FROM triage_decisions
       GROUP BY page_slug_key`,
    )
    .all();
  const map = {};
  for (const r of results) map[r.page_slug_key] = r;
  return map;
}
