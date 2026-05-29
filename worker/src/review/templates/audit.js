import { layout, esc } from "./layout.js";

// Accessibility-tuned CSS for an ~80-year-old reviewer. Large type, 56px targets,
// visible focus rings, persistent banners (no toasts), responsive left|right.
const AUDIT_CSS = `
html { font-size: 18px; }
body { padding: 0; background: #faf8f4; }
.container { max-width: 1100px; padding: 0 1rem 8rem; }
a { color: #7b2332; }
*:focus-visible { outline: 3px solid #c8a977; outline-offset: 2px; }

.audit-header { position: sticky; top: 0; z-index: 10; background: #faf8f4;
  border-bottom: 1px solid #e8e4dc; padding: 1rem; margin: 0 -1rem 1rem; }
.audit-header h1 { font-size: 1.6rem; line-height: 1.15; margin: 0; }
.progress { font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600;
  color: #4a4a4a; margin-top: 0.35rem; }
.progress-track { height: 6px; background: #e8e4dc; border-radius: 3px; margin-top: 0.5rem; }
.progress-fill { height: 6px; background: #7b2332; border-radius: 3px; }
.backlink { display: inline-block; margin-top: 0.6rem; font-size: 1rem; }

.skip-link { position: absolute; left: -9999px; }
.skip-link:focus { position: static; display: inline-block; padding: 0.5rem; }

.intro { background: #fff; border: 1px solid #e8e4dc; border-radius: 12px;
  padding: 1.75rem; max-width: 640px; margin: 2rem auto; }
.intro p { font-size: 1.18rem; line-height: 1.6; margin-bottom: 1rem; }

.nate-note { background: #fff3cd; border: 1px solid #e6cf6a; border-left: 5px solid #b8901f;
  border-radius: 8px; padding: 1rem 1.1rem; margin-bottom: 1.25rem; }
.nate-note strong { display: block; font-size: 0.95rem; color: #5a4510; margin-bottom: 0.25rem; }
.nate-note p { font-size: 1.1rem; line-height: 1.5; margin: 0; color: #1a1a1a; }

.compare { display: flex; gap: 2rem; align-items: flex-start; }
.col { flex: 1 1 0; min-width: 0; }
.col-label { font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 1rem;
  padding: 0.4rem 0.7rem; border-radius: 6px; display: inline-block; margin-bottom: 0.6rem; }
.col-old .col-label { background: #f0ebe0; color: #5a4d3a; }
.col-new .col-label { background: #e8f5ec; color: #155724; }
.panel { background: #fff; border: 1px solid #e8e4dc; border-radius: 10px; padding: 1.1rem 1.25rem; }
.col-old .panel { border-left: 5px solid #c8a977; }
.col-new .panel { border-left: 5px solid #7b2332; }
.source + .source { margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px dashed #d8d2c6; }
.source-title { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; color: #7b2332;
  margin-bottom: 0.4rem; }
.source-url { font-size: 0.85rem; color: #4a4a4a; margin-bottom: 0.6rem; word-break: break-word; }
.prose { font-size: 1.02rem; line-height: 1.7; white-space: pre-wrap; max-width: 68ch; color: #1a1a1a; }
.removed-note { background: #fff3cd; border: 1px solid #e6cf6a; border-radius: 8px; padding: 1.1rem; }
.removed-note h3 { font-family: 'DM Sans', sans-serif; font-size: 1.05rem; color: #5a4510; margin: 0 0 0.4rem; }
.removed-note p { font-size: 1.05rem; line-height: 1.55; margin: 0; }
@media (max-width: 900px) { .compare { flex-direction: column; gap: 1.5rem; } }

.actionbar { position: fixed; left: 0; right: 0; bottom: 0; background: #fff;
  border-top: 1px solid #e8e4dc; box-shadow: 0 -4px 14px rgba(0,0,0,0.07);
  padding: 0.9rem 1rem; z-index: 20; }
.actionbar-inner { max-width: 1100px; margin: 0 auto; display: flex; gap: 1.5rem; flex-wrap: wrap; }
.btn-big { font-family: 'DM Sans', sans-serif; font-size: 1.1rem; font-weight: 700;
  min-height: 56px; padding: 0.8rem 1.4rem; border-radius: 10px; border: none; cursor: pointer;
  flex: 1 1 auto; }
.btn-primary { background: #7b2332; color: #fff; }
.btn-primary:hover { background: #5e1a28; }
.btn-outline { background: #fff; color: #7b2332; border: 2px solid #7b2332; }
@media (max-width: 600px) { .actionbar-inner { flex-direction: column; gap: 0.9rem; } }

.banner { background: #e8f5ec; border: 1px solid #a3d4b5; border-radius: 10px;
  padding: 1rem 1.2rem; margin-bottom: 1.25rem; font-size: 1.1rem; font-weight: 600; color: #155724; }
.banner.issue { background: #fff3cd; border-color: #e6cf6a; color: #5a4510; }

.issue-box { background: #fff; border: 1px solid #e8e4dc; border-radius: 10px;
  padding: 1.25rem; margin: 1.25rem 0; }
.issue-box label { display: block; font-size: 1.05rem; font-weight: 600; margin-bottom: 0.5rem; }
.issue-box textarea { width: 100%; min-height: 130px; font: inherit; font-size: 1.05rem;
  padding: 0.7rem; border: 1px solid #b7b0a0; border-radius: 8px; resize: vertical; }
.issue-actions { display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; align-items: center; }
.issue-error { color: #7b2332; font-weight: 600; margin-bottom: 0.5rem; display: none; }
.link-btn { background: none; border: none; color: #4a4a4a; text-decoration: underline;
  font: inherit; cursor: pointer; min-height: 44px; }

/* Admin */
.unit-card { background: #fff; border: 1px solid #e8e4dc; border-radius: 12px;
  padding: 1.25rem; margin-bottom: 1.25rem; }
.unit-head { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; flex-wrap: wrap; }
.unit-head h2 { margin: 0; }
.state-badge { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
  padding: 0.25rem 0.6rem; border-radius: 999px; }
.state-pending { background: #eee; color: #555; }
.state-cleared { background: #e8f5ec; color: #155724; }
.state-flagged { background: #fff3cd; color: #8a6d3b; }
.admin-actions { margin-top: 1rem; display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
.admin-actions input[type=text] { flex: 1 1 240px; min-height: 44px; padding: 0.55rem;
  border: 1px solid #b7b0a0; border-radius: 6px; font: inherit; }
.admin-actions button { min-height: 44px; }
.outcome { margin-top: 0.85rem; padding: 0.75rem 0.9rem; border-radius: 8px; font-size: 0.95rem; }
.outcome.approved { background: #e8f5ec; color: #155724; }
.outcome.issue { background: #fff3cd; color: #5a4510; }
details summary { cursor: pointer; font-weight: 600; color: #7b2332; margin-top: 0.85rem; min-height: 44px; }
details > .compare { margin-top: 1rem; }
.toast-fixed { position: fixed; bottom: 1rem; left: 50%; transform: translateX(-50%);
  background: #1a1a1a; color: #fff; padding: 0.7rem 1.1rem; border-radius: 8px; opacity: 0;
  transition: opacity .2s; pointer-events: none; z-index: 30; }
.toast-fixed.show { opacity: 1; }
`;

function auditPage({ title, body, head = "" }) {
  return layout({ title, body, head: `<style>${AUDIT_CSS}</style>${head}` });
}

// ---- shared before/after comparison component ----------------------------

function proseBlock(text) {
  const t = (text || "").trim();
  if (!t) return `<div class="prose" style="color:#888;">(No text found for this page.)</div>`;
  return `<div class="prose">${esc(t)}</div>`;
}

export function comparisonHtml(unit, sources) {
  const oldHtml = sources
    .map(
      (s) => `<div class="source">
        <div class="source-title">${esc(s.old_title)}</div>
        ${s.old_url ? `<div class="source-url">${esc(s.old_url)}</div>` : ""}
        ${proseBlock(s.old_text)}
      </div>`,
    )
    .join("");

  let newHtml;
  if (unit.disposition === "removed") {
    newHtml = `<div class="removed-note">
      <h3>This page was removed from the new site</h3>
      <p>It does not appear on the new website. If you think something important was
      lost, tap "Something's off" and say what.</p>
    </div>`;
  } else {
    newHtml = `<div class="panel">${proseBlock(unit.new_text)}
      ${unit.new_url ? `<div class="source-url" style="margin-top:0.8rem;">New page: ${esc(unit.new_url)}</div>` : ""}
    </div>`;
  }

  return `<section class="compare" id="comparison" aria-label="Before and after comparison">
    <div class="col col-old" role="region" aria-label="Current wording from the old site">
      <span class="col-label">Old site wording</span>
      <div class="panel">${oldHtml || proseBlock("")}</div>
    </div>
    <div class="col col-new" role="region" aria-label="New wording on the new site">
      <span class="col-label">New site wording</span>
      ${newHtml}
    </div>
  </section>`;
}

// ---- reviewer: intro / resume landing ------------------------------------

export function reviewerLanding({ reviewer, flaggedCount, doneCount, nextSlug, token, firstTime }) {
  if (flaggedCount === 0) {
    return auditPage({
      title: "Nothing to review yet",
      body: `<div class="intro">
        <h1 style="margin-bottom:1rem;">Hello, ${esc(reviewer.name)}</h1>
        <p>There's nothing for you to look at just yet. Nate will send a note when the
        first pages are ready for your eyes.</p>
      </div>`,
    });
  }

  if (doneCount >= flaggedCount) {
    return auditPage({
      title: "All done",
      body: `<div class="intro">
        <h1 style="margin-bottom:1rem;">You're all done</h1>
        <p>Thank you for going through every page Nate flagged. He'll review your notes
        and may follow up with a question or two.</p>
        <a class="btn-big btn-outline" style="display:inline-block;text-decoration:none;text-align:center;"
           href="/audit/${esc(token)}/u/${esc(nextSlug)}">Look back over the pages</a>
      </div>`,
    });
  }

  if (firstTime) {
    return auditPage({
      title: "Welcome",
      body: `<div class="intro">
        <h1 style="margin-bottom:1rem;">Hello, ${esc(reviewer.name)}</h1>
        <p>Nate flagged ${flaggedCount} ${flaggedCount === 1 ? "page" : "pages"} he'd like your eyes on.
        For each one you'll see the old website's wording and the new website's wording, side by side.</p>
        <p>Just check that nothing is <strong>wrong</strong> or <strong>missing</strong>, and flag
        anything that is. There are no wrong answers.</p>
        <a class="btn-big btn-primary" style="display:inline-block;text-decoration:none;text-align:center;"
           href="/audit/${esc(token)}/u/${esc(nextSlug)}">Start</a>
      </div>`,
    });
  }

  return auditPage({
    title: "Welcome back",
    body: `<div class="intro">
      <h1 style="margin-bottom:1rem;">Welcome back, ${esc(reviewer.name)}</h1>
      <p>You've reviewed ${doneCount} of ${flaggedCount} pages.</p>
      <a class="btn-big btn-primary" style="display:inline-block;text-decoration:none;text-align:center;"
         href="/audit/${esc(token)}/u/${esc(nextSlug)}">Continue where you left off</a>
    </div>`,
  });
}

// ---- reviewer: a single flagged unit -------------------------------------

export function reviewerUnitPage({ unit, sources, decision, token, index, total, prevSlug, nextSlug }) {
  const approved = decision && decision.outcome === "approved";
  const hasIssue = decision && decision.outcome === "issue";

  const banner = approved
    ? `<div class="banner">You marked this page as looking right. You can change your mind below.</div>`
    : hasIssue
      ? `<div class="banner issue">You sent Nate a note about this page. You can change it below.</div>`
      : "";

  const noteHtml = unit.flag_note
    ? `<div class="nate-note"><strong>Nate asked:</strong><p>${esc(unit.flag_note)}</p></div>`
    : "";

  const pct = total ? Math.round(((index + 1) / total) * 100) : 0;

  const body = `
<a href="#comparison" class="skip-link">Skip to the comparison</a>
<div class="audit-header">
  <h1>${esc(unit.title)}</h1>
  <div class="progress">Page ${index + 1} of ${total}</div>
  <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
  ${prevSlug ? `<a class="backlink" href="/audit/${esc(token)}/u/${esc(prevSlug)}">&larr; Back to previous</a>` : `<a class="backlink" href="/audit/${esc(token)}">&larr; Back to start</a>`}
</div>

${banner}
${noteHtml}

${comparisonHtml(unit, sources)}

<div id="issueBox" class="issue-box" style="display:none;">
  <label for="issueText">Tell Nate what looks wrong or what's missing</label>
  <div class="issue-error" id="issueError">Please write a few words before sending.</div>
  <textarea id="issueText" aria-describedby="issueError">${esc(hasIssue ? decision.issue_text || "" : "")}</textarea>
  <div class="issue-actions">
    <button type="button" class="btn-big btn-primary" id="sendIssue" style="flex:0 0 auto;">Send my note to Nate</button>
    <button type="button" class="link-btn" id="cancelIssue">Never mind, go back</button>
  </div>
</div>

<div class="actionbar">
  <div class="actionbar-inner">
    <button type="button" class="btn-big btn-outline" id="btnIssue">Something's off</button>
    <button type="button" class="btn-big btn-primary" id="btnApprove">Looks right to me</button>
  </div>
</div>

<div class="toast-fixed" id="toast" role="status"></div>

<script>
const TOKEN = ${JSON.stringify(token)};
const SLUG = ${JSON.stringify(unit.slug_key)};
const NEXT = ${JSON.stringify(nextSlug || "")};
const toast = (m) => { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000); };

async function decide(outcome, issue_text) {
  const res = await fetch('/api/audit/decide', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ token: TOKEN, unit_slug_key: SLUG, outcome, issue_text }),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok || !j.ok) { toast('Something went wrong. Please try again.'); return false; }
  return true;
}

document.getElementById('btnApprove').addEventListener('click', async () => {
  if (await decide('approved', null)) {
    if (NEXT) location.href = '/audit/' + TOKEN + '/u/' + NEXT;
    else location.href = '/audit/' + TOKEN;
  }
});

const issueBox = document.getElementById('issueBox');
const issueText = document.getElementById('issueText');
document.getElementById('btnIssue').addEventListener('click', () => {
  issueBox.style.display = 'block';
  issueBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  issueText.focus();
});
document.getElementById('cancelIssue').addEventListener('click', () => { issueBox.style.display = 'none'; });
document.getElementById('sendIssue').addEventListener('click', async () => {
  const val = issueText.value.trim();
  if (!val) { document.getElementById('issueError').style.display = 'block'; issueText.focus(); return; }
  if (await decide('issue', val)) {
    if (NEXT) location.href = '/audit/' + TOKEN + '/u/' + NEXT;
    else location.href = '/audit/' + TOKEN;
  }
});
</script>`;

  return auditPage({ title: unit.title, body });
}

export function reviewerNotFound() {
  return auditPage({
    title: "Link not recognized",
    body: `<div class="intro"><h1>That link isn't recognized</h1>
      <p>Please reply to the email you received and we'll send you a fresh link.</p></div>`,
  });
}

// ---- admin: Nate's first pass --------------------------------------------

export function adminPage({ units, sourcesByUnitId, decisionsByUnitSlug, adminKey }) {
  const flagged = units.filter((u) => u.review_state === "flagged").length;
  const cleared = units.filter((u) => u.review_state === "cleared").length;
  const pending = units.filter((u) => u.review_state === "pending").length;

  const cards = units
    .map((u) => {
      const sources = sourcesByUnitId[u.id] || [];
      const d = decisionsByUnitSlug[u.slug_key];
      const stateClass = `state-${u.review_state}`;
      const outcome = d
        ? `<div class="outcome ${d.outcome}">Reviewer: <strong>${d.outcome === "approved" ? "Looks right" : "Raised an issue"}</strong>${d.issue_text ? ` &mdash; ${esc(d.issue_text)}` : ""}</div>`
        : "";
      return `<div class="unit-card" data-slug="${esc(u.slug_key)}">
        <div class="unit-head">
          <h2>${esc(u.title)}</h2>
          <span class="state-badge ${stateClass}" data-state-badge>${u.review_state}</span>
        </div>
        <div class="source-url">${u.disposition} &middot; ${esc(u.new_url || "removed")} &middot; ${sources.length} old source${sources.length === 1 ? "" : "s"}</div>
        ${outcome}
        <details>
          <summary>Show before / after</summary>
          ${comparisonHtml(u, sources)}
        </details>
        <div class="admin-actions">
          <button type="button" class="btn secondary" data-act="cleared">Cleared</button>
          <button type="button" class="btn" data-act="flagged">Flag for a second look</button>
          <input type="text" placeholder="Note to the reviewer (optional)" data-note value="${esc(u.flag_note || "")}">
        </div>
      </div>`;
    })
    .join("");

  const body = `
<div class="audit-header">
  <h1>Content audit &mdash; your first pass</h1>
  <div class="progress" id="tally">${cleared} cleared &middot; ${flagged} flagged &middot; ${pending} to do</div>
</div>
<p style="margin-bottom:1.5rem;">Walk each unit. <strong>Cleared</strong> means it's accounted for and you don't need a second opinion. <strong>Flag for a second look</strong> sends it to the reviewer with your note. Only flagged units reach him.</p>
${cards}
<div class="toast-fixed" id="toast" role="status"></div>
<script>
const KEY = ${JSON.stringify(adminKey)};
const toast = (m) => { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2200); };
document.querySelectorAll('.unit-card').forEach((card) => {
  const slug = card.dataset.slug;
  const note = card.querySelector('[data-note]');
  const badge = card.querySelector('[data-state-badge]');
  card.querySelectorAll('[data-act]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const state = btn.dataset.act;
      const res = await fetch('/api/audit/triage', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ key: KEY, slug_key: slug, review_state: state, flag_note: note.value || null }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) { toast('Error saving'); return; }
      badge.textContent = state;
      badge.className = 'state-badge state-' + state;
      toast(state === 'flagged' ? 'Flagged for the reviewer' : 'Cleared');
    });
  });
});
</script>`;

  return auditPage({ title: "Content audit admin", body });
}
