import { validateAdminKey } from "../auth.js";
import { getReviewerByToken } from "../db.js";
import {
  listAuditUnits,
  listFlaggedUnits,
  getAuditUnit,
  getSourcesForUnit,
  setUnitTriage,
  upsertAuditDecision,
  getDecisionsByReviewer,
  getAllAuditDecisions,
  getAdminProgress,
} from "../audit_db.js";
import {
  reviewerLanding,
  reviewerUnitPage,
  reviewerNotFound,
  adminPage,
} from "../templates/audit.js";

function htmlResponse(body, status = 200) {
  return new Response(body, { status, headers: { "content-type": "text/html; charset=utf-8" } });
}
function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });
}

async function parseBody(request) {
  const ct = request.headers.get("content-type") || "";
  try {
    if (ct.includes("application/json")) return await request.json();
    const fd = await request.formData();
    const raw = {};
    for (const [k, v] of fd.entries()) raw[k] = v;
    return raw;
  } catch {
    return null;
  }
}

// GET /audit/<token>  — landing: intro / resume / done
export async function handleLanding(request, env, token) {
  const reviewer = await getReviewerByToken(env.DB, token);
  if (!reviewer) return htmlResponse(reviewerNotFound(), 404);

  const flagged = await listFlaggedUnits(env.DB);
  const decisions = await getDecisionsByReviewer(env.DB, reviewer.id);
  const decidedSlugs = new Set(decisions.map((d) => d.unit_slug_key));
  const doneCount = flagged.filter((u) => decidedSlugs.has(u.slug_key)).length;
  const firstUndecided = flagged.find((u) => !decidedSlugs.has(u.slug_key));
  const nextSlug = firstUndecided ? firstUndecided.slug_key : (flagged[0] ? flagged[0].slug_key : "");

  return htmlResponse(
    reviewerLanding({
      reviewer,
      flaggedCount: flagged.length,
      doneCount,
      nextSlug,
      token,
      firstTime: decisions.length === 0,
    }),
  );
}

// GET /audit/<token>/u/<slug>  — a single flagged unit
export async function handleUnit(request, env, token, slug) {
  const reviewer = await getReviewerByToken(env.DB, token);
  if (!reviewer) return htmlResponse(reviewerNotFound(), 404);

  const flagged = await listFlaggedUnits(env.DB);
  const index = flagged.findIndex((u) => u.slug_key === slug);
  if (index === -1) {
    // Not a flagged unit (or unknown) — send them back to the landing.
    return Response.redirect(new URL(`/audit/${token}`, request.url).toString(), 302);
  }
  const unit = flagged[index];
  const sources = await getSourcesForUnit(env.DB, unit.id);
  const decisions = await getDecisionsByReviewer(env.DB, reviewer.id);
  const decision = decisions.find((d) => d.unit_slug_key === slug) || null;

  // Next = next undecided after this one, else next in order, else none.
  const decidedSlugs = new Set(decisions.map((d) => d.unit_slug_key));
  let next = flagged.slice(index + 1).find((u) => !decidedSlugs.has(u.slug_key))
    || flagged.find((u, i) => i !== index && !decidedSlugs.has(u.slug_key))
    || flagged[index + 1]
    || null;

  const doneCount = flagged.filter((u) => decidedSlugs.has(u.slug_key)).length;

  return htmlResponse(
    reviewerUnitPage({
      unit,
      sources,
      decision,
      token,
      index,
      total: flagged.length,
      doneCount,
      prevSlug: index > 0 ? flagged[index - 1].slug_key : null,
      nextSlug: next ? next.slug_key : null,
    }),
  );
}

// POST /api/audit/decide  — reviewer approves or raises an issue
export async function handleDecide(request, env) {
  const raw = await parseBody(request);
  if (!raw) return jsonResponse({ ok: false, error: "bad request" }, 400);

  const token = String(raw.token || "");
  const unit_slug_key = String(raw.unit_slug_key || "");
  const outcome = String(raw.outcome || "");
  const issue_text = raw.issue_text != null && raw.issue_text !== "" ? String(raw.issue_text) : null;

  if (!token || !unit_slug_key || !["approved", "issue"].includes(outcome)) {
    return jsonResponse({ ok: false, error: "missing fields" }, 400);
  }
  if (outcome === "issue" && !issue_text) {
    return jsonResponse({ ok: false, error: "issue text required" }, 400);
  }

  const reviewer = await getReviewerByToken(env.DB, token);
  if (!reviewer) return jsonResponse({ ok: false, error: "unauthorized" }, 401);

  await upsertAuditDecision(env.DB, {
    reviewer_id: reviewer.id,
    unit_slug_key,
    outcome,
    issue_text,
  });
  return jsonResponse({ ok: true });
}

// POST /api/audit/triage  — Nate clears/flags a unit (admin-key guarded)
export async function handleTriage(request, env) {
  const raw = await parseBody(request);
  if (!raw) return jsonResponse({ ok: false, error: "bad request" }, 400);
  if (!validateAdminKey(env, raw.key)) {
    return jsonResponse({ ok: false, error: "unauthorized" }, 401);
  }
  const slug_key = String(raw.slug_key || "");
  const review_state = String(raw.review_state || "");
  const flag_note = raw.flag_note != null && raw.flag_note !== "" ? String(raw.flag_note) : null;

  if (!slug_key || !["pending", "cleared", "flagged"].includes(review_state)) {
    return jsonResponse({ ok: false, error: "missing fields" }, 400);
  }
  const unit = await getAuditUnit(env.DB, slug_key);
  if (!unit) return jsonResponse({ ok: false, error: "unknown unit" }, 404);

  await setUnitTriage(env.DB, { slug_key, review_state, flag_note });
  return jsonResponse({ ok: true });
}

// GET /audit-admin?key=...&u=<slug>  — Nate's first pass, one unit at a time
export async function handleAdmin(request, env, url) {
  const key = url.searchParams.get("key");
  if (!validateAdminKey(env, key)) return new Response("Unauthorized", { status: 401 });

  const units = await listAuditUnits(env.DB);
  if (units.length === 0) return htmlResponse(adminPage({ unit: null, adminKey: key }));

  const slug = url.searchParams.get("u") || units[0].slug_key;
  const index = units.findIndex((u) => u.slug_key === slug);
  if (index === -1) return new Response("Not found", { status: 404 });

  const unit = units[index];
  const sources = await getSourcesForUnit(env.DB, unit.id);
  const decisions = await getAllAuditDecisions(env.DB);
  const unitDecisions = decisions.filter((d) => d.unit_slug_key === slug);
  const progress = await getAdminProgress(env.DB);

  return htmlResponse(
    adminPage({
      unit,
      sources,
      unitDecisions,
      index,
      total: units.length,
      prevSlug: index > 0 ? units[index - 1].slug_key : null,
      nextSlug: index < units.length - 1 ? units[index + 1].slug_key : null,
      doneCount: progress.done_count || 0,
      pendingCount: progress.pending_count || 0,
      adminKey: key,
    }),
  );
}
