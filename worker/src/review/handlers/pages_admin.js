import { validateAdminKey } from "../auth.js";
import { listAllReviewers, getSubmissionsForDecision } from "../db.js";
import {
  listPages,
  getPageBySlug,
  createPage,
  updatePageStatus,
  listBlocksForPage,
  createBlock,
  deleteBlock,
  assignReviewersToPage,
  getAssignedReviewerIdsForPage,
  getSignoffsForPage,
  listFlagsForPage,
  listAllFlags,
  updateFlag,
  maybeAdvanceAfterFlagResolution,
  tallyForAbBlock,
  tallyForChecklistBlock,
} from "../pages_db.js";
import {
  pagesRegistryView,
  pageEditorView,
  flagsDashboardView,
  signoffAuditView,
  buildBriefMarkdown,
} from "../templates/pages_admin.js";

async function formToObject(request) {
  const fd = await request.formData();
  const data = {};
  for (const [k, v] of fd.entries()) {
    if (data[k] === undefined) {
      data[k] = v;
    } else if (Array.isArray(data[k])) {
      data[k].push(v);
    } else {
      data[k] = [data[k], v];
    }
  }
  return data;
}

function unauthorized() {
  return new Response("Unauthorized", { status: 401 });
}

function htmlResponse(body) {
  return new Response(body, { headers: { "content-type": "text/html; charset=utf-8" } });
}

function redirectTo(loc) {
  return new Response(null, { status: 303, headers: { Location: loc } });
}

// GET /admin/pages
export async function handlePagesRegistry(request, env, url) {
  const key = url.searchParams.get("key");
  if (!validateAdminKey(env, key)) return unauthorized();

  const pages = await listPages(env.DB);
  const reviewers = await listAllReviewers(env.DB);
  const flagsByPage = {};
  const signoffCountsByPage = {};
  for (const p of pages) {
    flagsByPage[p.id] = await listFlagsForPage(env.DB, p.id);
    const signs = await getSignoffsForPage(env.DB, p.id);
    signoffCountsByPage[p.id] = signs.length;
  }
  return htmlResponse(
    pagesRegistryView({ adminKey: key, pages, reviewers, flagsByPage, signoffCountsByPage }),
  );
}

// GET /admin/pages/<slug>
export async function handlePageEditor(request, env, url, slug) {
  const key = url.searchParams.get("key");
  if (!validateAdminKey(env, key)) return unauthorized();

  const page = await getPageBySlug(env.DB, slug);
  if (!page) return new Response("Page not found", { status: 404 });

  const blocks = await listBlocksForPage(env.DB, slug);
  const reviewers = await listAllReviewers(env.DB);
  const assignedReviewerIds = await getAssignedReviewerIdsForPage(env.DB, slug);
  const signoffs = await getSignoffsForPage(env.DB, page.id);
  const flags = await listFlagsForPage(env.DB, page.id);
  const tallyByBlockId = {};
  for (const b of blocks) {
    const subs = await getSubmissionsForDecision(env.DB, b.id);
    if (b.block_type === "ab_choice") {
      tallyByBlockId[b.id] = tallyForAbBlock(subs);
    } else {
      let opts; try { opts = JSON.parse(b.options); } catch { opts = {}; }
      tallyByBlockId[b.id] = tallyForChecklistBlock(subs, opts.items || []);
    }
  }

  return htmlResponse(
    pageEditorView({
      adminKey: key,
      page,
      blocks,
      reviewers,
      assignedReviewerIds,
      signoffs,
      flags,
      tallyByBlockId,
    }),
  );
}

// POST /api/p/page  — create
export async function handleCreatePage(request, env) {
  const data = await formToObject(request);
  if (!validateAdminKey(env, data.admin_key)) return unauthorized();
  await createPage(env.DB, {
    slug: data.slug,
    title: data.title,
    live_url: data.live_url || null,
  });
  return redirectTo(`/admin/pages?key=${encodeURIComponent(data.admin_key)}`);
}

// POST /api/p/page/status
export async function handlePageStatus(request, env) {
  const data = await formToObject(request);
  if (!validateAdminKey(env, data.admin_key)) return unauthorized();
  const pageId = Number(data.page_id);
  await updatePageStatus(env.DB, pageId, data.status);
  const page = await env.DB.prepare("SELECT slug FROM pages WHERE id = ?1").bind(pageId).first();
  return redirectTo(`/admin/pages/${encodeURIComponent(page.slug)}?key=${encodeURIComponent(data.admin_key)}`);
}

// POST /api/p/page/assign
export async function handleAssign(request, env) {
  const data = await formToObject(request);
  if (!validateAdminKey(env, data.admin_key)) return unauthorized();
  const slug = data.page_slug;
  let ids = data.reviewer_ids;
  if (ids === undefined) ids = [];
  if (!Array.isArray(ids)) ids = [ids];
  const reviewerIds = ids.map((s) => Number(s)).filter(Boolean);
  await assignReviewersToPage(env.DB, slug, reviewerIds);
  return redirectTo(`/admin/pages/${encodeURIComponent(slug)}?key=${encodeURIComponent(data.admin_key)}`);
}

// POST /api/p/block  — create A/B or checklist
export async function handleCreateBlock(request, env) {
  const data = await formToObject(request);
  if (!validateAdminKey(env, data.admin_key)) return unauthorized();
  const blockType = data.block_type || "ab_choice";
  const sortOrder = data.sort_order ? Number(data.sort_order) : 0;
  const target_selector = {
    file: data.target_file || "",
    anchor_string: data.target_anchor || "",
  };

  let options;
  if (blockType === "ab_choice") {
    let labels = data.opt_label || [];
    let bodies = data.opt_body || [];
    if (!Array.isArray(labels)) labels = [labels];
    if (!Array.isArray(bodies)) bodies = [bodies];
    options = [];
    for (let i = 0; i < labels.length; i++) {
      const label = String(labels[i] || "").trim();
      const body = String(bodies[i] || "").trim();
      if (!label || !body) continue;
      options.push({ key: String.fromCharCode(97 + i), label, body });
    }
  } else if (blockType === "checklist") {
    const itemsText = String(data.items_text || "");
    const items = itemsText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [k, ...rest] = line.split("|");
        const label = rest.join("|").trim() || k.trim();
        return { key: k.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_"), label };
      });
    options = {
      question: data.question,
      items,
      allow_add: !!data.allow_add,
    };
  } else {
    return new Response("unknown block_type", { status: 400 });
  }

  await createBlock(env.DB, {
    page_slug: data.page_slug,
    block_type: blockType,
    section: data.section || null,
    question: data.question,
    context: data.context || null,
    options,
    target_selector,
    sort_order: sortOrder,
  });

  // Re-fan assignments out to the new block if reviewers are already assigned to the page.
  const assigned = await getAssignedReviewerIdsForPage(env.DB, data.page_slug);
  if (assigned.length) {
    await assignReviewersToPage(env.DB, data.page_slug, assigned);
  }

  return redirectTo(`/admin/pages/${encodeURIComponent(data.page_slug)}?key=${encodeURIComponent(data.admin_key)}`);
}

// POST /api/p/block/delete
export async function handleDeleteBlock(request, env) {
  const data = await formToObject(request);
  if (!validateAdminKey(env, data.admin_key)) return unauthorized();
  await deleteBlock(env.DB, Number(data.block_id));
  return redirectTo(`/admin/pages/${encodeURIComponent(data.page_slug)}?key=${encodeURIComponent(data.admin_key)}`);
}

// GET /admin/flags
export async function handleFlagsDashboard(request, env, url) {
  const key = url.searchParams.get("key");
  if (!validateAdminKey(env, key)) return unauthorized();
  const flags = await listAllFlags(env.DB);
  return htmlResponse(flagsDashboardView({ adminKey: key, flags }));
}

// POST /api/p/flag/update
export async function handleFlagUpdate(request, env) {
  const data = await formToObject(request);
  if (!validateAdminKey(env, data.admin_key)) return unauthorized();
  const flagId = Number(data.flag_id);
  await updateFlag(env.DB, flagId, {
    status: data.status,
    sme_assignee: data.sme_assignee || null,
    sme_note: data.sme_note || null,
  });
  // If terminal, advance page status if all flags resolved.
  if (["confirmed", "rejected", "deferred"].includes(data.status)) {
    const flag = await env.DB.prepare("SELECT page_id FROM factual_flags WHERE id = ?1").bind(flagId).first();
    if (flag) await maybeAdvanceAfterFlagResolution(env.DB, flag.page_id);
  }
  return redirectTo(`/admin/flags?key=${encodeURIComponent(data.admin_key)}`);
}

// GET /admin/audit
export async function handleSignoffAudit(request, env, url) {
  const key = url.searchParams.get("key");
  if (!validateAdminKey(env, key)) return unauthorized();
  const pages = await listPages(env.DB);
  const reviewers = await listAllReviewers(env.DB);
  const signoffsByPage = {};
  for (const p of pages) {
    signoffsByPage[p.id] = await getSignoffsForPage(env.DB, p.id);
  }

  // skip-rate per (reviewer × block_type)
  const skipRates = {};
  const { results: rows } = await env.DB
    .prepare(
      `SELECT s.reviewer_id, d.block_type, s.choice FROM submissions s
       JOIN decisions d ON d.id = s.decision_id
       WHERE d.block_type IN ('ab_choice','checklist')`,
    )
    .all();
  for (const r of rows) {
    if (!skipRates[r.reviewer_id]) skipRates[r.reviewer_id] = {};
    const bt = r.block_type;
    if (!skipRates[r.reviewer_id][bt]) skipRates[r.reviewer_id][bt] = { skipped: 0, total: 0 };
    skipRates[r.reviewer_id][bt].total++;
    if (r.choice === "skip") skipRates[r.reviewer_id][bt].skipped++;
  }

  return htmlResponse(signoffAuditView({ adminKey: key, pages, signoffsByPage, reviewers, skipRates }));
}

// GET /admin/brief/<slug>
export async function handleBuildBrief(request, env, url, slug) {
  const key = url.searchParams.get("key");
  if (!validateAdminKey(env, key)) return unauthorized();
  const format = url.searchParams.get("format") || "md";
  const page = await getPageBySlug(env.DB, slug);
  if (!page) return new Response("Page not found", { status: 404 });

  const blocks = await listBlocksForPage(env.DB, slug);
  const tallyByBlockId = {};
  for (const b of blocks) {
    const subs = await getSubmissionsForDecision(env.DB, b.id);
    if (b.block_type === "ab_choice") {
      tallyByBlockId[b.id] = tallyForAbBlock(subs);
    } else {
      let opts; try { opts = JSON.parse(b.options); } catch { opts = {}; }
      tallyByBlockId[b.id] = tallyForChecklistBlock(subs, opts.items || []);
    }
  }
  const flags = await listFlagsForPage(env.DB, page.id);
  const signoffs = await getSignoffsForPage(env.DB, page.id);

  const md = buildBriefMarkdown({ page, blocks, tallyByBlockId, flags, signoffs });

  if (format === "html") {
    // Tiny markdown-ish renderer: wrap pre.
    const escaped = md.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return new Response(
      `<!doctype html><html><head><meta charset="utf-8"><title>${page.title} brief</title>
<style>body{font-family:'DM Sans',sans-serif;max-width:760px;margin:2rem auto;padding:0 1rem;color:#1a1a1a;}
pre{white-space:pre-wrap;font-family:inherit;background:#faf8f4;padding:1rem;border-radius:8px;}</style>
</head><body><pre>${escaped}</pre></body></html>`,
      { headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }
  return new Response(md, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "content-disposition": `inline; filename="${slug}-build-brief.md"`,
    },
  });
}

// GET /admin/onboarding-email
export async function handleOnboardingEmail(request, env, url) {
  const key = url.searchParams.get("key");
  if (!validateAdminKey(env, key)) return unauthorized();
  const reviewers = await listAllReviewers(env.DB);
  const host = url.origin;

  const linksHtml = reviewers
    .map((r) => `<li><strong>${r.name}</strong> · <code>${host}/r2/${r.token}</code></li>`)
    .join("");

  const body = `<!doctype html><html><head><meta charset="utf-8"><title>Onboarding email draft</title>
<style>body{font-family:'DM Sans',sans-serif;max-width:760px;margin:2rem auto;padding:0 1rem;color:#1a1a1a;line-height:1.55;}
.email{background:#fff;border:1px solid #e8e4dc;border-radius:10px;padding:1.5rem;margin:1rem 0;}
.email h3{margin-top:0;}
code{background:#faf8f4;padding:0.1rem 0.3rem;border-radius:3px;font-size:0.85em;}</style>
</head><body>
<p><a href="/admin/pages?key=${key}">← Pages</a></p>
<h1>Onboarding email draft</h1>
<p>Brian sends this to each reviewer with their personal link substituted in.
Copy-paste, do not auto-send.</p>

<div class="email">
<h3>Subject: Help us land the new All Saints' site, 30 min per page</h3>
<p>Hi [name],</p>
<p>Quick favor. Nate's built the new All Saints' site and we're at the point where I need your eyes on the copy before it goes live mid-July.</p>
<p>Rather than 100 emails back and forth, there's a small tool that asks you to pick between wording options, check off what's covered on each page, and flag anything that's flat-out wrong. About 8 picks per page, plus a checklist. ~12-15 minutes per page. 6 pages total.</p>
<p>If you spot something incorrect, hit "Something's wrong here", those come to me and I'll route them.</p>
<p>Here's your link: [paste from below]</p>
<p>Whenever you have a few minutes is great. The earlier we get sign-offs the calmer cutover week will be.</p>
<p>Thanks,<br>Brian</p>
</div>

<h2>Reviewer links</h2>
<ul>${linksHtml || "<li>No reviewers yet.</li>"}</ul>
</body></html>`;
  return htmlResponse(body);
}
