// API endpoints for the page-based reviewer flow.
// All accept JSON. All authenticate via reviewer token (not admin key).

import { getReviewerByToken } from "../db.js";
import {
  getPageBySlug,
  recordSignoff,
  maybeAdvanceAfterSignoff,
  createFlag,
  markInterstitialSeen,
} from "../pages_db.js";

async function parseJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

// POST /api/p/submit  { token, block_id, block_type, choice, other_text?, comment? }
export async function handleSubmit(request, env) {
  const body = await parseJson(request);
  if (!body) return Response.json({ ok: false, error: "bad body" }, { status: 400 });

  const { token, block_id, choice, other_text, comment } = body;
  if (!token || !block_id || !choice) {
    return Response.json({ ok: false, error: "missing fields" }, { status: 400 });
  }
  const reviewer = await getReviewerByToken(env.DB, token);
  if (!reviewer) return Response.json({ ok: false, error: "invalid token" }, { status: 401 });

  const block = await env.DB
    .prepare("SELECT * FROM decisions WHERE id = ?1")
    .bind(block_id)
    .first();
  if (!block) return Response.json({ ok: false, error: "block not found" }, { status: 404 });

  const assigned = await env.DB
    .prepare("SELECT 1 FROM assignments WHERE decision_id = ?1 AND reviewer_id = ?2")
    .bind(block_id, reviewer.id)
    .first();
  if (!assigned) return Response.json({ ok: false, error: "not assigned" }, { status: 403 });

  await env.DB
    .prepare(
      `INSERT INTO submissions (decision_id, reviewer_id, choice, other_text, comment)
       VALUES (?1, ?2, ?3, ?4, ?5)
       ON CONFLICT (decision_id, reviewer_id) DO UPDATE SET
         choice = excluded.choice,
         other_text = excluded.other_text,
         comment = excluded.comment,
         submitted_at = datetime('now')`,
    )
    .bind(block_id, reviewer.id, choice, other_text ?? null, comment ?? null)
    .run();

  return Response.json({ ok: true });
}

// POST /api/p/flag  { token, page_slug, anchor?, claim_under_review, proposed_correction, evidence_url? }
export async function handleFlag(request, env) {
  const body = await parseJson(request);
  if (!body) return Response.json({ ok: false, error: "bad body" }, { status: 400 });

  const { token, page_slug, anchor, claim_under_review, proposed_correction, evidence_url } = body;
  if (!token || !page_slug || !claim_under_review || !proposed_correction) {
    return Response.json({ ok: false, error: "missing fields" }, { status: 400 });
  }
  const reviewer = await getReviewerByToken(env.DB, token);
  if (!reviewer) return Response.json({ ok: false, error: "invalid token" }, { status: 401 });

  const page = await getPageBySlug(env.DB, page_slug);
  if (!page) return Response.json({ ok: false, error: "page not found" }, { status: 404 });

  const { id } = await createFlag(env.DB, {
    page_id: page.id,
    anchor: anchor || null,
    claim_under_review,
    proposed_correction,
    evidence_url: evidence_url || null,
    flagged_by_reviewer_id: reviewer.id,
  });
  return Response.json({ ok: true, id });
}

// POST /api/p/signoff  { token, page_slug, signed_off_with_incomplete?, note? }
export async function handleSignoff(request, env) {
  const body = await parseJson(request);
  if (!body) return Response.json({ ok: false, error: "bad body" }, { status: 400 });

  const { token, page_slug, signed_off_with_incomplete, note } = body;
  if (!token || !page_slug) {
    return Response.json({ ok: false, error: "missing fields" }, { status: 400 });
  }
  const reviewer = await getReviewerByToken(env.DB, token);
  if (!reviewer) return Response.json({ ok: false, error: "invalid token" }, { status: 401 });

  const page = await getPageBySlug(env.DB, page_slug);
  if (!page) return Response.json({ ok: false, error: "page not found" }, { status: 404 });

  await recordSignoff(env.DB, {
    page_id: page.id,
    reviewer_id: reviewer.id,
    note: note || null,
    signed_off_with_incomplete: !!signed_off_with_incomplete,
  });

  const beforeStatus = page.status;
  const updated = await maybeAdvanceAfterSignoff(env.DB, page.id);
  const { c } = await env.DB
    .prepare("SELECT COUNT(*) AS c FROM page_signoffs WHERE page_id = ?1")
    .bind(page.id)
    .first();
  return Response.json({
    ok: true,
    count: c,
    advanced: updated && updated.status !== beforeStatus,
    status: updated?.status,
  });
}

// POST /api/p/interstitial  (form body, token)
export async function handleInterstitial(request, env) {
  const fd = await request.formData();
  const token = fd.get("token");
  if (!token) return new Response("missing token", { status: 400 });
  const reviewer = await getReviewerByToken(env.DB, String(token));
  if (!reviewer) return new Response("invalid token", { status: 401 });
  await markInterstitialSeen(env.DB, reviewer.id);
  return new Response(null, {
    status: 303,
    headers: { Location: `/r2/${encodeURIComponent(String(token))}` },
  });
}
