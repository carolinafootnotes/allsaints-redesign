import { esc, layout } from "./layout.js";

function recBadge(rec, foldTarget) {
  if (rec === "KEEP")
    return `<span class="rec rec-keep">Keep this page</span>`;
  if (rec === "RETIRE")
    return `<span class="rec rec-retire">Take this page down</span>`;
  if (rec === "FOLD") {
    const t = foldTarget ? esc(foldTarget) : "another page";
    return `<span class="rec rec-fold">Move this content to ${t}</span>`;
  }
  return `<span class="rec rec-unsure">No recommendation yet</span>`;
}

function plainReason(rec, page) {
  if (rec === "KEEP") {
    if (page.preserved_url) {
      return "We're keeping this page. Its web address won't change because it's printed on signs, in QR codes, or in materials people already use.";
    }
    return "We're keeping this page as part of the new site.";
  }
  if (rec === "RETIRE") {
    return "We're recommending this page go away. It looks seasonal or out of date, and we don't think it serves people anymore.";
  }
  if (rec === "FOLD") {
    const t = page.fold_target || "another page";
    return `We're recommending this content move to ${esc(t)} instead of keeping its own page.`;
  }
  return "We haven't made a recommendation yet. Tell us what you think.";
}

export function triageReviewerPage({ reviewer, pages, decisionsByKey, token }) {
  const total = pages.length;
  const reviewed = pages.filter((p) => decisionsByKey[p.slug_key]).length;

  const rows = pages
    .map((p) => {
      const d = decisionsByKey[p.slug_key];
      const sel = (val) => (d && d.decision === val ? "selected" : "");
      return `
<article class="triage-card" id="${esc(p.slug_key)}">
  <header>
    <h3>${esc(p.title)}</h3>
    <div class="meta">
      <code>${esc(p.wp_url || "")}</code>
      <span class="wc">${p.word_count || 0} words</span>
      ${p.preserved_url ? `<span class="badge-preserve">URL on printed materials</span>` : ""}
    </div>
  </header>
  <p class="reason">${plainReason(p.recommendation, p)}</p>
  <p class="rec-row">${recBadge(p.recommendation, p.fold_target)}</p>

  <form class="triage-form" data-slug="${esc(p.slug_key)}">
    <input type="hidden" name="token" value="${esc(token)}">
    <input type="hidden" name="page_slug" value="${esc(p.slug_key)}">
    <div class="btn-row">
      <button type="submit" name="decision" value="agree" class="btn-agree ${sel("agree")}">Agree</button>
      <button type="submit" name="decision" value="flag" class="btn-flag ${sel("flag")}">Flag this</button>
      <button type="submit" name="decision" value="unsure" class="btn-unsure ${sel("unsure")}">Not sure</button>
    </div>
    <label class="comment-label">
      <span>Optional comment</span>
      <textarea name="comment" rows="2" placeholder="Anything we should know?">${esc(d?.comment || "")}</textarea>
    </label>
    <div class="status" data-status>${
      d
        ? `<span class="saved">Saved: <strong>${esc(d.decision)}</strong></span>`
        : ""
    }</div>
  </form>
</article>`;
    })
    .join("\n");

  const body = `
<header class="page-header">
  <h1>Content review for All Saints'</h1>
  <p class="lead">Hi ${esc(reviewer.name)}. We're going through every page on the current website and deciding what to keep, what to retire, and what to move. Please tell us if you agree or disagree with each recommendation.</p>
  <p class="progress"><strong id="progress-num">${reviewed}</strong> of ${total} pages reviewed</p>
  <p class="note">You can stop and come back any time. Your answers save as you go.</p>
</header>
<main class="triage-list">
  ${rows}
</main>
<script>
(function(){
  const forms = document.querySelectorAll('.triage-form');
  let reviewedCount = ${reviewed};
  const total = ${total};
  const progressEl = document.getElementById('progress-num');
  const seen = new Set(${JSON.stringify(Object.keys(decisionsByKey))});

  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitter = e.submitter;
      if (!submitter) return;
      const fd = new FormData(form);
      fd.set('decision', submitter.value);
      const status = form.querySelector('[data-status]');
      const allowed = { agree: 1, flag: 1, unsure: 1 };
      const setStatus = (cls, text) => {
        status.textContent = '';
        const s = document.createElement('span');
        s.className = cls;
        s.textContent = text;
        status.appendChild(s);
      };
      setStatus('saving', 'Saving...');
      try {
        const r = await fetch('/api/triage', { method: 'POST', body: fd });
        if (!r.ok) throw new Error('Server error');
        const slug = fd.get('page_slug');
        if (!seen.has(slug)) {
          seen.add(slug);
          reviewedCount += 1;
          progressEl.textContent = reviewedCount;
        }
        const safeVal = allowed[submitter.value] ? submitter.value : 'saved';
        setStatus('saved', 'Saved: ' + safeVal);
        form.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
        submitter.classList.add('selected');
      } catch (err) {
        setStatus('error', 'Could not save. Try again?');
      }
    });
  });
})();
</script>
`;

  const head = `<style>
body { padding: 1rem; }
.container { max-width: 760px; }
.page-header { margin-bottom: 1.5rem; }
.page-header .lead { font-size: 1.05rem; margin: 0.5rem 0 0.75rem; }
.page-header .progress { font-size: 1rem; color: #444; }
.page-header .note { font-size: 0.9rem; color: #666; font-style: italic; margin-top: 0.25rem; }

.triage-card { background: #fff; border: 1px solid #e8e4dc; border-radius: 10px; padding: 1.25rem; margin-bottom: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.triage-card h3 { font-size: 1.25rem; margin-bottom: 0.4rem; }
.triage-card .meta { font-size: 0.85rem; color: #666; display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 0.75rem; }
.triage-card .meta code { background: #f3efe6; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.8rem; }
.triage-card .reason { font-size: 1rem; margin: 0.5rem 0 0.75rem; }
.triage-card .rec-row { margin: 0.5rem 0 1rem; }

.rec { display: inline-block; padding: 0.35rem 0.7rem; border-radius: 6px; font-weight: 600; font-size: 0.95rem; }
.rec-keep { background: #d4edda; color: #155724; }
.rec-retire { background: #f8d7da; color: #721c24; }
.rec-fold { background: #d1ecf1; color: #0c5460; }
.rec-unsure { background: #fff3cd; color: #8a6d3b; }

.badge-preserve { background: #fff3cd; color: #8a6d3b; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.78rem; font-weight: 600; }

.btn-row { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem; }
.btn-row button { min-height: 48px; padding: 0.7rem 1.1rem; border-radius: 8px; border: 2px solid transparent; cursor: pointer; font-weight: 600; font-size: 1rem; flex: 1 1 30%; }
.btn-agree { background: #d4edda; color: #155724; }
.btn-flag { background: #f8d7da; color: #721c24; }
.btn-unsure { background: #fff3cd; color: #8a6d3b; }
.btn-row button.selected { border-color: #1a1a1a; box-shadow: 0 0 0 2px rgba(0,0,0,0.05); }
.btn-row button:hover { filter: brightness(0.95); }

.comment-label { display: block; margin-bottom: 0.4rem; }
.comment-label span { font-size: 0.85rem; color: #555; font-weight: 600; display: block; margin-bottom: 0.25rem; }
.comment-label textarea { width: 100%; padding: 0.5rem; border: 1px solid #d0cabd; border-radius: 6px; font: inherit; resize: vertical; }

.status { min-height: 1.5rem; font-size: 0.9rem; margin-top: 0.5rem; }
.saved { color: #155724; }
.saving { color: #666; }
.error { color: #721c24; font-weight: 600; }
</style>`;

  return layout({ title: "Content review", body, head });
}

export function triageNotFound() {
  return layout({
    title: "Not found",
    body: `<h1>Link not recognized</h1><p>This review link isn't valid. If you think this is a mistake, reply to the email you got and we'll get you a fresh link.</p>`,
  });
}

export function triageAdminPage({ pages, talliesByKey, decisions, adminKey }) {
  const flaggedPages = pages.filter(
    (p) => (talliesByKey[p.slug_key]?.flag || 0) > 0,
  );

  const decisionsByPage = {};
  for (const d of decisions) {
    (decisionsByPage[d.page_slug_key] ||= []).push(d);
  }

  const rowsHtml = pages
    .map((p) => {
      const t = talliesByKey[p.slug_key] || { agree: 0, flag: 0, unsure: 0, total: 0 };
      const flagClass = t.flag > 0 ? "row-flagged" : "";
      return `<tr class="${flagClass}">
  <td><strong>${esc(p.title)}</strong><br><code>${esc(p.wp_url || "")}</code></td>
  <td>${esc(p.recommendation)}${p.fold_target ? ` → ${esc(p.fold_target)}` : ""}</td>
  <td>${t.agree}</td>
  <td>${t.flag}</td>
  <td>${t.unsure}</td>
  <td>${t.total}</td>
</tr>`;
    })
    .join("\n");

  const flaggedHtml = flaggedPages.length
    ? flaggedPages
        .map((p) => {
          const ds = (decisionsByPage[p.slug_key] || []).filter(
            (d) => d.decision === "flag",
          );
          const comments = ds
            .map(
              (d) =>
                `<li><strong>${esc(d.reviewer_name)}:</strong> ${esc(d.comment || "(no comment)")}</li>`,
            )
            .join("");
          return `<div class="flagged-page">
  <h3>${esc(p.title)} <small><code>${esc(p.wp_url || "")}</code></small></h3>
  <p><em>Current recommendation:</em> ${esc(p.recommendation)}${p.fold_target ? ` → ${esc(p.fold_target)}` : ""}</p>
  <ul>${comments}</ul>
</div>`;
        })
        .join("\n")
    : `<p>Nothing flagged yet.</p>`;

  const body = `
<h1>Triage admin</h1>
<p><a href="/admin?key=${esc(adminKey)}">Back to main admin</a> · <a href="/api/triage/export?key=${esc(adminKey)}">Download CSV</a></p>

<h2>Totals</h2>
<p><strong>${pages.length}</strong> pages · <strong>${flaggedPages.length}</strong> with at least one flag</p>

<h2>Flagged pages (need your attention)</h2>
${flaggedHtml}

<h2>All pages — vote tally</h2>
<table>
  <thead>
    <tr><th>Page</th><th>Recommendation</th><th>Agree</th><th>Flag</th><th>Unsure</th><th>Total</th></tr>
  </thead>
  <tbody>
${rowsHtml}
  </tbody>
</table>
`;

  const head = `<style>
.container { max-width: 1100px; }
table { width: 100%; border-collapse: collapse; margin-top: 1rem; background: #fff; }
th, td { border: 1px solid #e8e4dc; padding: 0.5rem; text-align: left; font-size: 0.9rem; vertical-align: top; }
th { background: #f3efe6; }
.row-flagged { background: #fff5f5; }
.flagged-page { background: #fff; border: 1px solid #f8d7da; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
.flagged-page h3 { font-size: 1.1rem; }
.flagged-page ul { margin-left: 1.25rem; margin-top: 0.5rem; }
code { background: #f3efe6; padding: 0.1rem 0.3rem; border-radius: 3px; font-size: 0.8rem; }
</style>`;

  return layout({ title: "Triage admin", body, head });
}
