import { layout, esc } from "./layout.js";

const ADMIN_CSS = `
.page-row { background:#fff; border:1px solid #e8e4dc; border-radius:10px; padding:1rem;
  margin-bottom:0.75rem; }
.page-row a.title { font-weight:600; font-size:1.1rem; color:#7b2332; text-decoration:none; }
.page-row .meta { font-size:0.85rem; color:#666; margin-top:0.3rem; }
.status-pill { display:inline-block; font-size:0.7rem; font-weight:700; padding:0.18rem 0.55rem;
  border-radius:4px; letter-spacing:0.05em; text-transform:uppercase; }
.status-draft { background:#eee; color:#555; }
.status-in_review { background:#fff3cd; color:#8a6d3b; }
.status-editorially_approved { background:#d1ecf1; color:#0c5460; }
.status-publish_ready { background:#d4edda; color:#155724; }
.status-published { background:#cfe2ff; color:#084298; }
.block-row { border:1px solid #e8e4dc; border-radius:8px; padding:0.85rem;
  background:#faf8f4; margin-bottom:0.6rem; }
.block-row .type { font-size:0.72rem; font-weight:700; letter-spacing:0.05em;
  text-transform:uppercase; color:#7b2332; }
table.flag-table { width:100%; border-collapse:collapse; margin-top:0.5rem; }
table.flag-table th, table.flag-table td { text-align:left; padding:0.5rem;
  border-bottom:1px solid #e8e4dc; font-size:0.88rem; vertical-align:top; }
table.flag-table th { background:#faf8f4; font-size:0.78rem; text-transform:uppercase;
  letter-spacing:0.05em; color:#555; }
.option-row { display:flex; gap:0.5rem; margin-bottom:0.4rem; align-items:center; }
.option-row input[type=text] { flex:1; }
`;

function statusPill(status) {
  return `<span class="status-pill status-${esc(status)}">${esc(status)}</span>`;
}

export function pagesRegistryView({ adminKey, pages, reviewers, flagsByPage, signoffCountsByPage }) {
  const reviewerOptions = reviewers
    .map((r) => `<option value="${r.id}">${esc(r.name)}</option>`)
    .join("");

  const pagesHtml = pages
    .map((p) => {
      const openFlags = (flagsByPage[p.id] || []).filter(
        (f) => !["confirmed", "rejected", "deferred"].includes(f.status),
      ).length;
      const signs = signoffCountsByPage[p.id] || 0;
      return `<div class="page-row">
        <a class="title" href="/admin/pages/${esc(p.slug)}?key=${esc(adminKey)}">${esc(p.title)}</a>
        ${statusPill(p.status)}
        <div class="meta">
          slug: <code>${esc(p.slug)}</code> ·
          ${p.live_url ? `<a href="${esc(p.live_url)}" target="_blank">live</a> · ` : ""}
          ${signs} of 3 signed off · ${openFlags} open flag${openFlags === 1 ? "" : "s"}
        </div>
      </div>`;
    })
    .join("");

  const body = `<h1>All Saints' Review · Pages</h1>
    <p>
      <a href="/admin?key=${esc(adminKey)}">Legacy per-decision admin</a> ·
      <a href="/admin/flags?key=${esc(adminKey)}">Factual flags dashboard</a> ·
      <a href="/admin/audit?key=${esc(adminKey)}">Sign-off audit</a>
    </p>
    <div class="section">
      <h2>Pages</h2>
      ${pagesHtml || "<p>No pages yet. Create one below.</p>"}
    </div>
    <div class="section">
      <h2>Create a page</h2>
      <form method="POST" action="/api/p/page" class="decision-card">
        <input type="hidden" name="admin_key" value="${esc(adminKey)}">
        <div class="field"><label>Slug (e.g. home, visit, connect)</label>
          <input type="text" name="slug" required pattern="[a-z0-9-]+"></div>
        <div class="field"><label>Title</label>
          <input type="text" name="title" required></div>
        <div class="field"><label>Live URL (optional)</label>
          <input type="text" name="live_url" placeholder="/final/visit/"></div>
        <button type="submit">Create page</button>
      </form>
    </div>`;

  return layout({ title: "Pages", body, head: `<style>${ADMIN_CSS}</style>` });
}

export function pageEditorView({
  adminKey,
  page,
  blocks,
  reviewers,
  assignedReviewerIds,
  signoffs,
  flags,
  tallyByBlockId,
}) {
  const reviewerCheckboxes = reviewers
    .map(
      (r) =>
        `<label style="display:inline-block; margin:0.2rem 0.5rem 0.2rem 0;">
          <input type="checkbox" name="reviewer_ids" value="${r.id}"${
            assignedReviewerIds.includes(r.id) ? " checked" : ""
          }> ${esc(r.name)}
        </label>`,
    )
    .join("");

  const blocksHtml = blocks
    .map((b) => {
      let opts;
      try { opts = JSON.parse(b.options); } catch { opts = []; }
      const tally = tallyByBlockId[b.id];
      let detail = "";
      if (b.block_type === "ab_choice") {
        detail = `<ul style="margin:0.4rem 0 0 1.2rem; font-size:0.88rem;">${(opts || [])
          .map((o) => `<li><strong>${esc(o.label)}</strong>: ${esc(o.body)} ${tally ? `<em>(${tally.counts?.[o.key] || 0} pick${(tally.counts?.[o.key] || 0) === 1 ? "" : "s"})</em>` : ""}</li>`)
          .join("")}</ul>`;
      } else {
        const items = opts.items || [];
        detail = `<ul style="margin:0.4rem 0 0 1.2rem; font-size:0.88rem;">${items
          .map((it) => `<li>${esc(it.label)} ${tally ? `<em>(${tally.itemRates?.find((r) => r.key === it.key)?.count || 0})</em>` : ""}</li>`)
          .join("")}</ul>`;
        if (tally?.added?.length) {
          detail += `<p style="font-size:0.85rem; margin-top:0.5rem;"><strong>Added:</strong> ${tally.added.map((a) => `${esc(a.text)} <em>(${esc(a.reviewer)})</em>`).join("; ")}</p>`;
        }
      }
      return `<div class="block-row">
        <div class="type">${esc(b.block_type)} · ${esc(b.section || "no anchor")}</div>
        <div style="font-weight:600; margin-top:0.2rem;">${esc(b.question)}</div>
        ${detail}
        <form method="POST" action="/api/p/block/delete" style="display:inline; margin-top:0.5rem;">
          <input type="hidden" name="admin_key" value="${esc(adminKey)}">
          <input type="hidden" name="block_id" value="${b.id}">
          <input type="hidden" name="page_slug" value="${esc(page.slug)}">
          <button type="submit" class="secondary" onclick="return confirm('Delete this block?')">Delete</button>
        </form>
      </div>`;
    })
    .join("");

  const signoffsHtml = signoffs.length
    ? `<ul>${signoffs
        .map((s) => `<li><strong>${esc(s.reviewer_name)}</strong> at ${esc(s.signed_at)}${s.signed_off_with_incomplete ? " <em>(signed off as-is)</em>" : ""}</li>`)
        .join("")}</ul>`
    : `<p>No sign-offs yet.</p>`;

  const flagsHtml = flags.length
    ? `<table class="flag-table"><thead><tr>
        <th>Claim</th><th>Correction</th><th>Flagger</th><th>Status</th><th>SME</th>
      </tr></thead><tbody>${flags
        .map((f) => `<tr>
          <td>${esc(f.claim_under_review)}</td>
          <td>${esc(f.proposed_correction)}</td>
          <td>${esc(f.flagger_name)}</td>
          <td>${statusPill(f.status)}</td>
          <td>${esc(f.sme_assignee || "")}</td>
        </tr>`)
        .join("")}</tbody></table>`
    : `<p>No flags on this page.</p>`;

  const body = `
    <p><a href="/admin/pages?key=${esc(adminKey)}">← All pages</a></p>
    <h1>${esc(page.title)} ${statusPill(page.status)}</h1>
    <p>slug: <code>${esc(page.slug)}</code> ·
      ${page.live_url ? `<a href="${esc(page.live_url)}" target="_blank">live</a>` : "no live URL"} ·
      <a href="/admin/brief/${esc(page.slug)}?key=${esc(adminKey)}">Build brief</a>
    </p>

    <div class="section">
      <h2>Status</h2>
      <form method="POST" action="/api/p/page/status" style="display:flex; gap:0.5rem; align-items:center;">
        <input type="hidden" name="admin_key" value="${esc(adminKey)}">
        <input type="hidden" name="page_id" value="${page.id}">
        <select name="status">
          ${["draft", "in_review", "editorially_approved", "publish_ready", "published"]
            .map((s) => `<option${s === page.status ? " selected" : ""}>${s}</option>`)
            .join("")}
        </select>
        <button type="submit">Update</button>
      </form>
    </div>

    <div class="section">
      <h2>Assigned reviewers</h2>
      <form method="POST" action="/api/p/page/assign">
        <input type="hidden" name="admin_key" value="${esc(adminKey)}">
        <input type="hidden" name="page_slug" value="${esc(page.slug)}">
        ${reviewerCheckboxes}
        <div style="margin-top:0.5rem;"><button type="submit">Save assignments</button></div>
      </form>
    </div>

    <div class="section">
      <h2>Sign-offs (${signoffs.length} of 3)</h2>
      ${signoffsHtml}
    </div>

    <div class="section">
      <h2>Factual flags</h2>
      ${flagsHtml}
    </div>

    <div class="section">
      <h2>Blocks (${blocks.length})</h2>
      ${blocksHtml || "<p>No blocks yet. Add one below.</p>"}
    </div>

    <div class="section">
      <h2>Add A/B block</h2>
      <form method="POST" action="/api/p/block" class="decision-card" id="abForm">
        <input type="hidden" name="admin_key" value="${esc(adminKey)}">
        <input type="hidden" name="page_slug" value="${esc(page.slug)}">
        <input type="hidden" name="block_type" value="ab_choice">
        <div class="field"><label>Section / anchor label</label>
          <input type="text" name="section" placeholder="Hero, Welcome, Service times..."></div>
        <div class="field"><label>Question</label>
          <input type="text" name="question" required placeholder="Which hero subtitle?"></div>
        <div class="field"><label>Context (optional)</label>
          <textarea name="context"></textarea></div>
        <div class="field"><label>Options</label>
          <div id="abOptions">
            <div class="option-row">
              <input type="text" placeholder="Label (e.g. 'Currently shipped')" name="opt_label" value="Option A">
              <input type="text" placeholder="Body" name="opt_body" style="flex:2;">
            </div>
            <div class="option-row">
              <input type="text" placeholder="Label" name="opt_label" value="Option B">
              <input type="text" placeholder="Body" name="opt_body" style="flex:2;">
            </div>
          </div>
          <button type="button" id="addAbOpt" class="secondary" style="font-size:0.85rem; margin-top:0.3rem;">+ add option</button>
        </div>
        <div class="field"><label>Target selector file (optional)</label>
          <input type="text" name="target_file"></div>
        <div class="field"><label>Target selector anchor string (optional)</label>
          <input type="text" name="target_anchor"></div>
        <div class="field"><label>Sort order</label>
          <input type="number" name="sort_order" value="${blocks.length}"></div>
        <button type="submit">Add A/B block</button>
      </form>
    </div>

    <div class="section">
      <h2>Add checklist block</h2>
      <form method="POST" action="/api/p/block" class="decision-card" id="clForm">
        <input type="hidden" name="admin_key" value="${esc(adminKey)}">
        <input type="hidden" name="page_slug" value="${esc(page.slug)}">
        <input type="hidden" name="block_type" value="checklist">
        <div class="field"><label>Section / anchor label</label>
          <input type="text" name="section" placeholder="Your First Sunday"></div>
        <div class="field"><label>Question</label>
          <input type="text" name="question" required placeholder="Does this section answer the questions a first-time guest asks?"></div>
        <div class="field"><label>Context (optional)</label>
          <textarea name="context"></textarea></div>
        <div class="field"><label>Items (one per line; format: key|Label)</label>
          <textarea name="items_text" rows="6" placeholder="parking|Parking&#10;dress|What to Wear&#10;kids|Kids&#10;accessibility|Accessibility"></textarea></div>
        <div class="field"><label><input type="checkbox" name="allow_add" checked> Allow reviewers to add items</label></div>
        <div class="field"><label>Sort order</label>
          <input type="number" name="sort_order" value="${blocks.length}"></div>
        <button type="submit">Add checklist block</button>
      </form>
    </div>

    <script>
      document.getElementById('addAbOpt').addEventListener('click', () => {
        const wrap = document.getElementById('abOptions');
        const idx = wrap.children.length;
        const row = document.createElement('div');
        row.className = 'option-row';
        const labelInput = document.createElement('input');
        labelInput.type = 'text'; labelInput.name = 'opt_label';
        labelInput.placeholder = 'Label'; labelInput.value = 'Option ' + String.fromCharCode(65 + idx);
        const bodyInput = document.createElement('input');
        bodyInput.type = 'text'; bodyInput.name = 'opt_body';
        bodyInput.placeholder = 'Body'; bodyInput.style.flex = '2';
        row.appendChild(labelInput); row.appendChild(bodyInput);
        wrap.appendChild(row);
      });
    </script>
  `;

  return layout({ title: page.title + " · admin", body, head: `<style>${ADMIN_CSS}</style>` });
}

export function flagsDashboardView({ adminKey, flags }) {
  const groupings = {};
  for (const f of flags) {
    if (!groupings[f.status]) groupings[f.status] = [];
    groupings[f.status].push(f);
  }

  const sections = ["open", "triaged", "sme_assigned", "confirmed", "rejected", "deferred"]
    .map((status) => {
      const rows = groupings[status] || [];
      if (rows.length === 0) return "";
      const rowsHtml = rows
        .map((f) => {
          const age = Math.round((Date.now() - new Date(f.created_at + "Z").getTime()) / 3600000);
          return `<tr>
            <td><a href="/admin/pages/${esc(f.page_slug)}?key=${esc(adminKey)}">${esc(f.page_title)}</a></td>
            <td>${esc(f.claim_under_review)}</td>
            <td>${esc(f.proposed_correction)}</td>
            <td>${esc(f.flagger_name)} · ${age}h ago</td>
            <td>
              <form method="POST" action="/api/p/flag/update" style="display:flex; flex-direction:column; gap:0.3rem;">
                <input type="hidden" name="admin_key" value="${esc(adminKey)}">
                <input type="hidden" name="flag_id" value="${f.id}">
                <input type="text" name="sme_assignee" value="${esc(f.sme_assignee || "")}" placeholder="SME (brian, chuck, john, joy marie, andrea, nate)">
                <select name="status">
                  ${["open","triaged","sme_assigned","confirmed","rejected","deferred"]
                    .map((s) => `<option${s === f.status ? " selected" : ""}>${s}</option>`)
                    .join("")}
                </select>
                <input type="text" name="sme_note" value="${esc(f.sme_note || "")}" placeholder="SME note">
                <button type="submit" style="font-size:0.85rem;">Update</button>
              </form>
            </td>
          </tr>`;
        })
        .join("");
      return `<div class="section"><h2>${esc(status)} (${rows.length})</h2>
        <table class="flag-table">
          <thead><tr><th>Page</th><th>Claim</th><th>Proposed correction</th><th>Flagger / age</th><th>Triage</th></tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table></div>`;
    })
    .join("");

  const body = `<p><a href="/admin/pages?key=${esc(adminKey)}">← Pages</a></p>
    <h1>Factual flags</h1>
    <p>All flags route to Brian first. 48h SLA from his handoff to SME.</p>
    ${sections || "<p>No flags yet.</p>"}`;

  return layout({ title: "Factual flags", body, head: `<style>${ADMIN_CSS}</style>` });
}

export function signoffAuditView({ adminKey, pages, signoffsByPage, reviewers, skipRates }) {
  const reviewerNames = Object.fromEntries(reviewers.map((r) => [r.id, r.name]));
  const pageRowsHtml = pages
    .map((p) => {
      const signs = signoffsByPage[p.id] || [];
      const signedIds = new Set(signs.map((s) => s.reviewer_id));
      const chipsHtml = reviewers
        .map((r) => {
          const signed = signedIds.has(r.id);
          const cls = signed ? "status-publish_ready" : "status-draft";
          return `<span class="status-pill ${cls}" style="margin-right:0.3rem;">${signed ? "✓" : "◯"} ${esc(r.name)}</span>`;
        })
        .join("");
      return `<div class="page-row">
        <a class="title" href="/admin/pages/${esc(p.slug)}?key=${esc(adminKey)}">${esc(p.title)}</a>
        ${statusPill(p.status)}
        <div style="margin-top:0.5rem;">${chipsHtml}</div>
      </div>`;
    })
    .join("");

  const skipRows = Object.entries(skipRates)
    .map(([reviewerId, byType]) => {
      const name = reviewerNames[Number(reviewerId)] || `#${reviewerId}`;
      return `<tr>
        <td>${esc(name)}</td>
        <td>${byType.ab_choice ? `${byType.ab_choice.skipped}/${byType.ab_choice.total} (${Math.round((byType.ab_choice.skipped / byType.ab_choice.total) * 100)}%)` : "—"}</td>
        <td>${byType.checklist ? `${byType.checklist.skipped}/${byType.checklist.total} (${Math.round((byType.checklist.skipped / byType.checklist.total) * 100)}%)` : "—"}</td>
      </tr>`;
    })
    .join("");

  const body = `<p><a href="/admin/pages?key=${esc(adminKey)}">← Pages</a></p>
    <h1>Sign-off audit</h1>
    <div class="section"><h2>Per-page sign-off status</h2>${pageRowsHtml || "<p>No pages.</p>"}</div>
    <div class="section"><h2>Skip rate (reviewer × block type)</h2>
      <table class="flag-table">
        <thead><tr><th>Reviewer</th><th>A/B skip rate</th><th>Checklist skip rate</th></tr></thead>
        <tbody>${skipRows || "<tr><td colspan='3'>No data yet.</td></tr>"}</tbody>
      </table>
    </div>`;

  return layout({ title: "Sign-off audit", body, head: `<style>${ADMIN_CSS}</style>` });
}

export function buildBriefMarkdown({ page, blocks, tallyByBlockId, flags, signoffs }) {
  const lines = [];
  lines.push(`# ${page.title} · Build Brief`);
  lines.push("");
  lines.push(`**Page slug:** \`${page.slug}\``);
  if (page.live_url) lines.push(`**Live URL:** ${page.live_url}`);
  lines.push(`**Status:** ${page.status}`);
  lines.push(`**Generated:** ${new Date().toISOString()}`);
  lines.push("");

  const confirmed = flags.filter((f) => f.status === "confirmed");
  const deferred = flags.filter((f) => f.status === "deferred");
  if (confirmed.length || deferred.length) {
    lines.push(`## Factual corrections to apply`);
    lines.push("");
    for (const f of confirmed) {
      lines.push(`- **${f.anchor || "(no anchor)"}** — replace:`);
      lines.push(`  > ${f.claim_under_review}`);
      lines.push(`  with:`);
      lines.push(`  > ${f.proposed_correction}`);
      if (f.sme_note) lines.push(`  _SME note: ${f.sme_note}_`);
      lines.push("");
    }
    if (deferred.length) {
      lines.push(`### Deferred (not for this cutover)`);
      for (const f of deferred) {
        lines.push(`- ${f.claim_under_review} → ${f.proposed_correction}${f.sme_note ? ` _(${f.sme_note})_` : ""}`);
      }
      lines.push("");
    }
  }

  lines.push(`## Approved copy`);
  lines.push("");
  for (const b of blocks) {
    let opts; try { opts = JSON.parse(b.options); } catch { opts = {}; }
    const tally = tallyByBlockId[b.id] || {};
    const anchor = b.section || "(no anchor)";

    if (b.block_type === "ab_choice") {
      const counts = tally.counts || {};
      let winnerKey = null;
      let winnerCount = -1;
      let secondCount = 0;
      for (const opt of opts || []) {
        const c = counts[opt.key] || 0;
        if (c > winnerCount) {
          secondCount = winnerCount >= 0 ? winnerCount : 0;
          winnerCount = c;
          winnerKey = opt.key;
        } else if (c > secondCount) {
          secondCount = c;
        }
      }
      const winnerOpt = (opts || []).find((o) => o.key === winnerKey);
      lines.push(`### ${anchor}`);
      lines.push(`_${b.question}_`);
      lines.push("");
      if (winnerOpt) {
        lines.push(`**Approved (${winnerOpt.label}):**`);
        lines.push("");
        lines.push(`> ${winnerOpt.body}`);
        lines.push("");
        const totalVotes = Object.values(counts).reduce((a, b) => a + b, 0);
        if (totalVotes > 0) {
          lines.push(`_Vote tally: approved ${winnerCount} of ${totalVotes}` + (secondCount ? `, runner-up ${secondCount}` : "") + `._`);
        } else {
          lines.push(`_No votes recorded._`);
        }
      } else {
        lines.push(`_No votes recorded yet._`);
      }
      lines.push("");
    } else if (b.block_type === "checklist") {
      lines.push(`### ${anchor} (content checklist)`);
      lines.push(`_${opts.question || b.question}_`);
      lines.push("");
      const rates = tally.itemRates || [];
      if (rates.length) {
        lines.push(`**Coverage rated by reviewers:**`);
        for (const r of rates) {
          lines.push(`- ${r.label}: ${r.count} of ${tally.responders || 0} say covered`);
        }
        lines.push("");
      }
      if (tally.added && tally.added.length) {
        lines.push(`**Reviewer-suggested additions:**`);
        for (const a of tally.added) {
          lines.push(`- ${a.text} _(${a.reviewer})_`);
        }
        lines.push("");
      }
    }
  }

  if (signoffs.length) {
    lines.push(`## Sign-offs`);
    for (const s of signoffs) {
      lines.push(`- ${s.reviewer_name} · ${s.signed_at}${s.signed_off_with_incomplete ? " (signed off as-is)" : ""}${s.note ? ` — _${s.note}_` : ""}`);
    }
  }

  return lines.join("\n");
}
