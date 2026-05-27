import { validateAdminKey } from "../auth.js";
import { listAllReviewers, listAllDecisions, getSubmissionsForDecision } from "../db.js";
import { adminPage } from "../templates/admin.js";

export async function handle(request, env, url) {
  const key = url.searchParams.get("key");
  if (!validateAdminKey(env, key)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const reviewers = await listAllReviewers(env.DB);
  const decisions = await listAllDecisions(env.DB);

  const submissionsByDecisionId = {};
  const assignedReviewerIdsByDecisionId = {};
  for (const d of decisions) {
    submissionsByDecisionId[d.id] = await getSubmissionsForDecision(env.DB, d.id);
    const { results } = await env.DB
      .prepare("SELECT reviewer_id FROM assignments WHERE decision_id = ?1")
      .bind(d.id)
      .all();
    assignedReviewerIdsByDecisionId[d.id] = results.map((r) => r.reviewer_id);
  }

  const html = adminPage({
    adminKey: key,
    reviewers,
    decisions,
    submissionsByDecisionId,
    assignedReviewerIdsByDecisionId,
  });

  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}
