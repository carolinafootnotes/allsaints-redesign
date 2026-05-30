// Content-audit DB helpers — before/after copy accuracy review (Phase 5).

export async function listAuditUnits(db) {
  const { results } = await db
    .prepare("SELECT * FROM audit_units ORDER BY sort_order, id")
    .all();
  return results;
}

export async function listFlaggedUnits(db) {
  const { results } = await db
    .prepare(
      "SELECT * FROM audit_units WHERE review_state = 'flagged' ORDER BY sort_order, id",
    )
    .all();
  return results;
}

export async function getAuditUnit(db, slugKey) {
  return await db
    .prepare("SELECT * FROM audit_units WHERE slug_key = ?1")
    .bind(slugKey)
    .first();
}

export async function getSourcesForUnit(db, unitId) {
  const { results } = await db
    .prepare("SELECT * FROM audit_sources WHERE unit_id = ?1 ORDER BY sort_order, id")
    .bind(unitId)
    .all();
  return results;
}

// Nate's first pass: set a unit cleared|flagged (+optional note).
export async function setUnitTriage(db, { slug_key, review_state, flag_note }) {
  await db
    .prepare(
      "UPDATE audit_units SET review_state = ?2, flag_note = ?3 WHERE slug_key = ?1",
    )
    .bind(slug_key, review_state, flag_note ?? null)
    .run();
}

// The reviewer's second pass: approve | raise issue (upsert; changeable).
export async function upsertAuditDecision(db, { reviewer_id, unit_slug_key, outcome, issue_text }) {
  await db
    .prepare(
      `INSERT INTO audit_decisions (reviewer_id, unit_slug_key, outcome, issue_text)
       VALUES (?1, ?2, ?3, ?4)
       ON CONFLICT (reviewer_id, unit_slug_key) DO UPDATE SET
         outcome = excluded.outcome,
         issue_text = excluded.issue_text,
         updated_at = datetime('now')`,
    )
    .bind(reviewer_id, unit_slug_key, outcome, issue_text ?? null)
    .run();
}

export async function getDecisionsByReviewer(db, reviewerId) {
  const { results } = await db
    .prepare("SELECT * FROM audit_decisions WHERE reviewer_id = ?1")
    .bind(reviewerId)
    .all();
  return results;
}

// Admin progress: units that have feedback (cleared|flagged) vs still pending.
export async function getAdminProgress(db) {
  return await db
    .prepare(
      `SELECT
         SUM(CASE WHEN review_state != 'pending' THEN 1 ELSE 0 END) AS done_count,
         SUM(CASE WHEN review_state =  'pending' THEN 1 ELSE 0 END) AS pending_count
       FROM audit_units`,
    )
    .first();
}

export async function getAllAuditDecisions(db) {
  const { results } = await db
    .prepare(
      `SELECT ad.*, r.name AS reviewer_name, r.email AS reviewer_email
       FROM audit_decisions ad
       JOIN reviewers r ON r.id = ad.reviewer_id
       ORDER BY ad.unit_slug_key, r.name`,
    )
    .all();
  return results;
}
