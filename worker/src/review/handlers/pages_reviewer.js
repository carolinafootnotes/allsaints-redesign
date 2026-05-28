import { getReviewerByToken, getSubmissionsForDecision } from "../db.js";
import {
  getPageBySlug,
  listBlocksForPage,
  listFlagsForPage,
  getSignoffByReviewer,
  getSignoffsForPage,
  tallyForAbBlock,
  tallyForChecklistBlock,
  listPages,
  getAssignedReviewerIdsForPage,
} from "../pages_db.js";
import {
  interstitialPage,
  dashboardPage,
  pageReviewPage,
  notFoundPage,
} from "../templates/pages_reviewer.js";

// GET /r2/<token>
export async function handleDashboard(request, env, token) {
  const reviewer = await getReviewerByToken(env.DB, token);
  if (!reviewer) {
    return new Response(notFoundPage(), {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  if (!reviewer.seen_interstitial_at) {
    return new Response(interstitialPage({ reviewer, token }), {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  const pages = await listPages(env.DB);
  const pageRows = [];
  for (const p of pages) {
    if (p.status === "draft") continue;
    const assigned = await getAssignedReviewerIdsForPage(env.DB, p.slug);
    if (!assigned.includes(reviewer.id)) continue;
    const signoffs = await getSignoffsForPage(env.DB, p.id);
    const youSigned = signoffs.some((s) => s.reviewer_id === reviewer.id);
    const blocks = await listBlocksForPage(env.DB, p.slug);
    let yourSubs = 0;
    for (const b of blocks) {
      const sub = await env.DB
        .prepare("SELECT 1 FROM submissions WHERE decision_id = ?1 AND reviewer_id = ?2")
        .bind(b.id, reviewer.id)
        .first();
      if (sub) yourSubs++;
    }
    const openFlags = (await listFlagsForPage(env.DB, p.id)).filter(
      (f) => !["confirmed", "rejected", "deferred"].includes(f.status),
    ).length;
    pageRows.push({
      slug: p.slug,
      title: p.title,
      you_signed_off: youSigned,
      your_progress: yourSubs,
      signoff_count: signoffs.length,
      threshold: 3,
      open_flag_count: openFlags,
    });
  }

  return new Response(dashboardPage({ reviewer, pageRows, token }), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// GET /r2/<token>/p/<slug>
export async function handlePage(request, env, token, slug) {
  const reviewer = await getReviewerByToken(env.DB, token);
  if (!reviewer) {
    return new Response(notFoundPage(), {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
  if (!reviewer.seen_interstitial_at) {
    return new Response(interstitialPage({ reviewer, token }), {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
  const page = await getPageBySlug(env.DB, slug);
  if (!page) {
    return new Response(notFoundPage(), {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  const blocks = await listBlocksForPage(env.DB, slug);
  const submissionsByBlockId = {};
  const tallyByBlockId = {};

  for (const b of blocks) {
    const mySub = await env.DB
      .prepare("SELECT * FROM submissions WHERE decision_id = ?1 AND reviewer_id = ?2")
      .bind(b.id, reviewer.id)
      .first();
    if (mySub) submissionsByBlockId[b.id] = mySub;
    // Only compute tally if reviewer has voted on this block (vote-aggregate-after-submit).
    if (mySub && mySub.choice !== "skip") {
      const allSubs = await getSubmissionsForDecision(env.DB, b.id);
      if (b.block_type === "ab_choice") {
        tallyByBlockId[b.id] = tallyForAbBlock(allSubs);
      } else {
        let opts; try { opts = JSON.parse(b.options); } catch { opts = {}; }
        tallyByBlockId[b.id] = tallyForChecklistBlock(allSubs, opts.items || []);
      }
    }
  }

  const flags = await listFlagsForPage(env.DB, page.id);
  const signoff = await getSignoffByReviewer(env.DB, page.id, reviewer.id);
  const signoffs = await getSignoffsForPage(env.DB, page.id);

  return new Response(
    pageReviewPage({
      page,
      blocks,
      submissionsByBlockId,
      tallyByBlockId,
      flags,
      reviewer,
      token,
      signoff,
      signoffCount: signoffs.length,
    }),
    { headers: { "content-type": "text/html; charset=utf-8" } },
  );
}
