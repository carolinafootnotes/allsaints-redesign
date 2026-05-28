import { parseSubmitBody } from "../auth.js";
import { getReviewerByToken, getDecisionById, upsertSubmission, finalizeDecision } from "../db.js";

export async function handle(request, env) {
  const parsed = await parseSubmitBody(request);
  if (!parsed.ok) {
    return Response.json({ ok: false, error: parsed.error }, { status: parsed.status });
  }

  const { token, decision_id, choice, other_text, comment } = parsed.body;

  const reviewer = await getReviewerByToken(env.DB, token);
  if (!reviewer) {
    return Response.json({ ok: false, error: "invalid token" }, { status: 401 });
  }

  const decision = await getDecisionById(env.DB, decision_id);
  if (!decision) {
    return Response.json({ ok: false, error: "decision not found" }, { status: 404 });
  }

  if (decision.status === "finalized") {
    return Response.json({ ok: false, error: "decision already finalized" }, { status: 409 });
  }

  if (decision.kind === "bio") {
    if (decision.subject_reviewer_id !== reviewer.id) {
      return Response.json({ ok: false, error: "not the bio subject" }, { status: 403 });
    }
  } else {
    const assigned = await env.DB
      .prepare("SELECT 1 FROM assignments WHERE decision_id = ?1 AND reviewer_id = ?2")
      .bind(decision_id, reviewer.id)
      .first();
    if (!assigned) {
      return Response.json({ ok: false, error: "not assigned to this decision" }, { status: 403 });
    }
  }

  await upsertSubmission(env.DB, {
    decision_id,
    reviewer_id: reviewer.id,
    choice,
    other_text,
    comment,
  });

  let finalized = false;
  if (decision.kind === "bio") {
    await finalizeDecision(env.DB, { decision_id, final_choice: choice, final_other_text: other_text });
    finalized = true;
  }

  return Response.json({ ok: true, finalized });
}
