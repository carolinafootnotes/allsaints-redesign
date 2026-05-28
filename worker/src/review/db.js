function genToken() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export async function getReviewerByToken(db, token) {
  return await db.prepare("SELECT * FROM reviewers WHERE token = ?1").bind(token).first();
}

export async function getReviewerById(db, id) {
  return await db.prepare("SELECT * FROM reviewers WHERE id = ?1").bind(id).first();
}

export async function listAllReviewers(db) {
  const { results } = await db.prepare("SELECT * FROM reviewers ORDER BY name").all();
  return results;
}

export async function createReviewer(db, { name, email, role }) {
  const token = genToken();
  const result = await db
    .prepare("INSERT INTO reviewers (name, email, token, role) VALUES (?1, ?2, ?3, ?4)")
    .bind(name, email, token, role)
    .run();
  return { id: result.meta.last_row_id, token };
}

export async function regenerateReviewerToken(db, id) {
  const token = genToken();
  await db.prepare("UPDATE reviewers SET token = ?1 WHERE id = ?2").bind(token, id).run();
  return { token };
}

export async function getDecisionsForReviewer(db, reviewerId) {
  const { results } = await db
    .prepare(
      `SELECT DISTINCT d.* FROM decisions d
       LEFT JOIN assignments a ON a.decision_id = d.id
       WHERE d.subject_reviewer_id = ?1 OR (d.kind = 'copy' AND a.reviewer_id = ?1)
       ORDER BY d.section, d.id`,
    )
    .bind(reviewerId)
    .all();
  return results;
}

export async function getDecisionById(db, id) {
  return await db.prepare("SELECT * FROM decisions WHERE id = ?1").bind(id).first();
}

export async function listAllDecisions(db) {
  const { results } = await db.prepare("SELECT * FROM decisions ORDER BY section, status, id").all();
  return results;
}

export async function listFinalizedDecisions(db) {
  const { results } = await db
    .prepare("SELECT * FROM decisions WHERE status = 'finalized' ORDER BY section, id")
    .all();
  return results;
}

export async function createDecision(db, { section, kind, question, context, options, subject_reviewer_id, target_selector }) {
  const result = await db
    .prepare(
      `INSERT INTO decisions (section, kind, question, context, options, subject_reviewer_id, target_selector)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`,
    )
    .bind(
      section,
      kind,
      question,
      context ?? null,
      JSON.stringify(options),
      subject_reviewer_id ?? null,
      JSON.stringify(target_selector),
    )
    .run();
  return { id: result.meta.last_row_id };
}

export async function setAssignments(db, decisionId, reviewerIds) {
  await db.prepare("DELETE FROM assignments WHERE decision_id = ?1").bind(decisionId).run();
  for (const rid of reviewerIds) {
    await db
      .prepare("INSERT INTO assignments (decision_id, reviewer_id) VALUES (?1, ?2)")
      .bind(decisionId, rid)
      .run();
  }
}

export async function upsertSubmission(db, { decision_id, reviewer_id, choice, other_text, comment }) {
  await db
    .prepare(
      `INSERT INTO submissions (decision_id, reviewer_id, choice, other_text, comment)
       VALUES (?1, ?2, ?3, ?4, ?5)
       ON CONFLICT (decision_id, reviewer_id) DO UPDATE SET
         choice = excluded.choice,
         other_text = excluded.other_text,
         comment = excluded.comment,
         submitted_at = datetime('now')`,
    )
    .bind(decision_id, reviewer_id, choice, other_text ?? null, comment ?? null)
    .run();
}

export async function getSubmissionsForDecision(db, decisionId) {
  const { results } = await db
    .prepare(
      `SELECT s.*, r.name AS reviewer_name FROM submissions s
       JOIN reviewers r ON r.id = s.reviewer_id
       WHERE s.decision_id = ?1
       ORDER BY r.name`,
    )
    .bind(decisionId)
    .all();
  return results;
}

export async function getSubmissionByReviewerDecision(db, { decision_id, reviewer_id }) {
  return await db
    .prepare("SELECT * FROM submissions WHERE decision_id = ?1 AND reviewer_id = ?2")
    .bind(decision_id, reviewer_id)
    .first();
}

export async function finalizeDecision(db, { decision_id, final_choice, final_other_text }) {
  await db
    .prepare(
      `UPDATE decisions
       SET status = 'finalized', final_choice = ?2, final_other_text = ?3, finalized_at = datetime('now')
       WHERE id = ?1`,
    )
    .bind(decision_id, final_choice, final_other_text ?? null)
    .run();
}

export async function reopenDecision(db, decisionId) {
  await db
    .prepare(
      `UPDATE decisions
       SET status = 'open', final_choice = NULL, final_other_text = NULL, finalized_at = NULL
       WHERE id = ?1`,
    )
    .bind(decisionId)
    .run();
}
