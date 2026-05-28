import { validateAdminKey } from "../auth.js";
import { getReviewerByToken } from "../db.js";
import {
  listTriagePages,
  upsertTriagePage,
  upsertTriageDecision,
  getDecisionsByReviewer,
  getAllTriageDecisions,
  getTalliesByPage,
} from "../triage_db.js";
import { parseCsvRow } from "../csv.js";
import { TRIAGE_CSV } from "../triage_seed_data.js";
import {
  triageReviewerPage,
  triageNotFound,
  triageAdminPage,
} from "../templates/triage.js";

function htmlResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// GET /t/<token>
export async function handleReviewer(request, env, token) {
  const reviewer = await getReviewerByToken(env.DB, token);
  if (!reviewer) return htmlResponse(triageNotFound(), 404);

  const pages = await listTriagePages(env.DB);
  const decisions = await getDecisionsByReviewer(env.DB, reviewer.id);
  const decisionsByKey = {};
  for (const d of decisions) decisionsByKey[d.page_slug_key] = d;

  return htmlResponse(
    triageReviewerPage({ reviewer, pages, decisionsByKey, token }),
  );
}

// POST /api/triage
export async function handleApi(request, env) {
  let raw;
  const ct = request.headers.get("content-type") || "";
  try {
    if (ct.includes("application/json")) raw = await request.json();
    else {
      const fd = await request.formData();
      raw = {};
      for (const [k, v] of fd.entries()) raw[k] = v;
    }
  } catch {
    return new Response("bad request", { status: 400 });
  }

  const token = String(raw.token || "");
  const page_slug = String(raw.page_slug || "");
  const decision = String(raw.decision || "");
  const comment = raw.comment != null ? String(raw.comment) : null;

  if (!token || !page_slug || !decision) {
    return new Response("missing fields", { status: 400 });
  }
  if (!["agree", "flag", "unsure"].includes(decision)) {
    return new Response("bad decision", { status: 400 });
  }

  const reviewer = await getReviewerByToken(env.DB, token);
  if (!reviewer) return new Response("unauthorized", { status: 401 });

  await upsertTriageDecision(env.DB, {
    reviewer_id: reviewer.id,
    page_slug_key: page_slug,
    decision,
    comment,
  });

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "content-type": "application/json" },
  });
}

// GET /triage-admin?key=...
export async function handleAdmin(request, env, url) {
  const key = url.searchParams.get("key");
  if (!validateAdminKey(env, key)) {
    return new Response("Unauthorized", { status: 401 });
  }
  const pages = await listTriagePages(env.DB);
  const talliesByKey = await getTalliesByPage(env.DB);
  const decisions = await getAllTriageDecisions(env.DB);
  return htmlResponse(
    triageAdminPage({ pages, talliesByKey, decisions, adminKey: key }),
  );
}

// GET /api/triage/export?key=...
export async function handleExport(request, env, url) {
  const key = url.searchParams.get("key");
  if (!validateAdminKey(env, key)) {
    return new Response("Unauthorized", { status: 401 });
  }
  const pages = await listTriagePages(env.DB);
  const decisions = await getAllTriageDecisions(env.DB);
  const decisionsByPage = {};
  for (const d of decisions) (decisionsByPage[d.page_slug_key] ||= []).push(d);

  const escCsv = (v) => {
    if (v == null) return "";
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const lines = [
    "slug_key,title,wp_url,recommendation,fold_target,preserved_url,reviewer,decision,comment",
  ];
  for (const p of pages) {
    const ds = decisionsByPage[p.slug_key] || [];
    if (ds.length === 0) {
      lines.push(
        [
          p.slug_key,
          p.title,
          p.wp_url,
          p.recommendation,
          p.fold_target,
          p.preserved_url ? "yes" : "",
          "",
          "",
          "",
        ]
          .map(escCsv)
          .join(","),
      );
    } else {
      for (const d of ds) {
        lines.push(
          [
            p.slug_key,
            p.title,
            p.wp_url,
            p.recommendation,
            p.fold_target,
            p.preserved_url ? "yes" : "",
            d.reviewer_name,
            d.decision,
            d.comment,
          ]
            .map(escCsv)
            .join(","),
        );
      }
    }
  }

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="triage-decisions.csv"',
    },
  });
}

// POST /api/triage/seed?key=...  — one-time loader from embedded CSV
export async function handleSeed(request, env, url) {
  const key = url.searchParams.get("key");
  if (!validateAdminKey(env, key)) {
    return new Response("Unauthorized", { status: 401 });
  }
  const lines = TRIAGE_CSV.split(/\r?\n/).filter((l) => l.length > 0);
  const headers = parseCsvRow(lines[0]);
  const idx = Object.fromEntries(headers.map((h, i) => [h, i]));
  let count = 0;
  for (let i = 1; i < lines.length; i++) {
    const cells = parseCsvRow(lines[i]);
    await upsertTriagePage(env.DB, {
      slug_key: cells[idx.slug_key],
      title: cells[idx.title],
      wp_url: cells[idx.slug],
      last_modified: cells[idx.last_modified] || null,
      word_count: Number(cells[idx.word_count]) || 0,
      wp_status: cells[idx.wp_status] || null,
      recommendation: cells[idx.recommendation] || "UNDECIDED",
      fold_target: cells[idx.fold_target] || null,
      rationale: cells[idx.rationale] || null,
      preserved_url:
        (cells[idx.preserved_url] || "").toLowerCase() === "yes" ? 1 : 0,
      sort_order: Number(cells[idx.num]) || 0,
    });
    count++;
  }
  return new Response(
    JSON.stringify({ ok: true, seeded: count }),
    { headers: { "content-type": "application/json" } },
  );
}
