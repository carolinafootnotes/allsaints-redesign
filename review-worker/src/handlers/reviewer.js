import {
  getReviewerByToken,
  getDecisionsForReviewer,
  getSubmissionByReviewerDecision,
} from "../db.js";
import { reviewerPage, notFoundPage } from "../templates/reviewer.js";

export async function handle(request, env, token) {
  const reviewer = await getReviewerByToken(env.DB, token);
  if (!reviewer) {
    return new Response(notFoundPage(), {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  const decisions = await getDecisionsForReviewer(env.DB, reviewer.id);

  const decisionsBySection = {};
  const submissionsByDecisionId = {};
  for (const d of decisions) {
    if (!decisionsBySection[d.section]) decisionsBySection[d.section] = [];
    decisionsBySection[d.section].push(d);
    const sub = await getSubmissionByReviewerDecision(env.DB, {
      decision_id: d.id,
      reviewer_id: reviewer.id,
    });
    if (sub) submissionsByDecisionId[d.id] = sub;
  }

  return new Response(
    reviewerPage({ reviewer, decisionsBySection, submissionsByDecisionId, token }),
    { headers: { "content-type": "text/html; charset=utf-8" } },
  );
}
