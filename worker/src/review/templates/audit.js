import { esc } from "./layout.js";

// Utilitarian tool UI, decoupled from the church-branded layout. System fonts,
// charcoal theme (not near-black, safer for older eyes), high contrast, large
// type, 56px targets, visible focus. One unit at a time for both passes.
const AUDIT_CSS = `
:root {
  --bg: #252525;
  --card: #2e2e2e;
  --border: #484848;
  --text: #e8e4dc;
  --muted: #b8b2a8;
  --old: #7ab2e8;      /* OLD label, blue */
  --new: #b47fd4;      /* NEW label, purple */
  --old-bar: #5b86bf;
  --new-bar: #9b6bc2;
  --go: #2d8a4e;       /* approve */
  --amber-bg: #4a3a1a; --amber-tx: #f5e6c0;  /* missing-fact / removed */
  --focus: #8ab4f8;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 18px; }
body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background: var(--bg); color: var(--text); line-height: 1.6; }
.container { max-width: 1180px; margin: 0 auto; padding: 0 1rem 5rem; }
a { color: var(--old); }
*:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; border-radius: 2px; }

.audit-header { position: sticky; top: 0; z-index: 10; background: var(--bg);
  border-bottom: 1px solid var(--border); padding: 0.5rem 1rem 0.55rem; margin: 0 -1rem 1rem; }
.audit-header .row { display: flex; justify-content: space-between; align-items: baseline; gap: 0.75rem; flex-wrap: wrap; }
.audit-header h1 { font-size: 1.1rem; font-weight: 700; line-height: 1.2; }
.counter { font-size: 0.85rem; font-weight: 600; color: var(--muted); white-space: nowrap; }
.counter b { color: var(--text); }
.progress-track { height: 3px; background: var(--border); border-radius: 3px; margin-top: 0.4rem; }
.progress-fill { height: 3px; background: var(--old); border-radius: 3px; }
.eyebrow { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.1rem; }

.intro { background: var(--card); border: 1px solid var(--border); border-radius: 12px;
  padding: 1.75rem; max-width: 640px; margin: 2.5rem auto; }
.intro p { font-size: 1.15rem; line-height: 1.6; margin-bottom: 1rem; }

.nate-note { background: #33312b; border: 1px solid #5a5238; border-left: 5px solid #b8901f;
  border-radius: 8px; padding: 1rem 1.1rem; margin-bottom: 1.25rem; }
.nate-note .eyebrow { color: #d8b860; }
.nate-note p { font-size: 1.1rem; line-height: 1.5; color: var(--text); }

.compare { display: flex; gap: 1.5rem; align-items: flex-start; }
.col { flex: 1 1 0; min-width: 0; }
.col-label { font-size: 0.85rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
  padding: 0.45rem 0.75rem; border-radius: 6px; display: inline-block; margin-bottom: 0.6rem; }
.col-old .col-label { color: var(--old); background: #20293a; }
.col-new .col-label { color: var(--new); background: #2f2238; }
.panel { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 1.15rem 1.3rem; }
.col-old .panel { border-left: 4px solid var(--old-bar); }
.col-new .panel { border-left: 4px solid var(--new-bar); }
.source + .source { margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px dashed var(--border); }
.source-title { font-size: 1rem; font-weight: 700; color: var(--old); margin-bottom: 0.3rem; }
.source-url { font-size: 0.82rem; color: var(--muted); margin-bottom: 0.6rem; word-break: break-word; }
.prose { font-size: 1.02rem; line-height: 1.7; white-space: pre-wrap; color: var(--text); }
.removed-note { background: var(--amber-bg); border: 1px solid #6a5526; border-radius: 8px; padding: 1.1rem; }
.removed-note h3 { font-size: 1.05rem; color: var(--amber-tx); margin-bottom: 0.4rem; }
.removed-note p { font-size: 1.02rem; line-height: 1.55; color: var(--amber-tx); }

.gap-box { margin-top: 0.9rem; background: #322a16; border: 1px solid #6a5526; border-radius: 8px; padding: 0.8rem 0.95rem; }
.gap-box h4 { font-size: 0.92rem; color: var(--amber-tx); margin-bottom: 0.5rem; }
.gap-list { list-style: none; display: flex; flex-wrap: wrap; gap: 0.4rem; }
.gap-list li { font-size: 0.9rem; padding: 0.25rem 0.6rem; border-radius: 5px;
  background: var(--amber-bg); color: var(--amber-tx); border: 1px solid #7a6230; }
.gap-allgood { margin-top: 0.85rem; font-size: 0.9rem; color: #9fd9b3; }

@media (max-width: 900px) {
  .compare { flex-direction: column; gap: 1.25rem; }
  .col + .col { border-top: 2px solid var(--border); padding-top: 1.25rem; }
}

.actionbar { position: fixed; left: 0; right: 0; bottom: 0; background: #1e1e1e;
  border-top: 1px solid var(--border); padding: 0.5rem 1rem; z-index: 20; }
.actionbar-inner { max-width: 1180px; margin: 0 auto; display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
.btn { font: inherit; font-size: 0.95rem; font-weight: 700; min-height: 46px; padding: 0.5rem 0.95rem;
  border-radius: 8px; border: 2px solid transparent; cursor: pointer; }
.btn-nav { background: transparent; color: var(--text); border-color: #6a6a6a; min-width: 110px; }
.btn-nav[aria-disabled=true] { opacity: 0.35; pointer-events: none; }
.btn-go { background: var(--go); color: #fff; border-color: var(--go); flex: 1 1 auto; }
.btn-flag { background: transparent; color: var(--text); border-color: #9a9a9a; flex: 1 1 auto; }
.btn-clear { background: #2f3e34; color: #cfe9d6; border-color: #3f6b4d; flex: 1 1 auto; }
a.btn { text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }
@media (max-width: 640px) { .actionbar-inner { gap: 0.7rem; } .btn-nav { min-width: 64px; flex: 0 0 auto; } }

.banner { border-radius: 9px; padding: 0.9rem 1.15rem; margin-bottom: 1.1rem; font-size: 1.08rem; font-weight: 600; }
.banner.ok { background: #21372a; color: #a8e0bb; border: 1px solid #3f6b4d; }
.banner.issue { background: #3a3320; color: #f0d9a0; border: 1px solid #6a5526; }

.issue-box { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 1.25rem; margin: 1.25rem 0; }
.issue-box label { display: block; font-size: 1.05rem; font-weight: 600; margin-bottom: 0.5rem; }
.issue-box textarea { width: 100%; min-height: 130px; font: inherit; font-size: 1.05rem; padding: 0.7rem;
  border: 1px solid #6a6a6a; border-radius: 8px; background: #1e1e1e; color: var(--text); resize: vertical; }
.issue-actions { display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; align-items: center; }
.issue-error { color: #f0a0a0; font-weight: 600; margin-bottom: 0.5rem; display: none; }
.link-btn { background: none; border: none; color: var(--muted); text-decoration: underline; font: inherit;
  cursor: pointer; min-height: 44px; }

/* Admin triage controls */
.state-badge { font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;
  padding: 0.25rem 0.65rem; border-radius: 999px; }
.state-pending { background: #3a3a3a; color: var(--muted); }
.state-cleared { background: #2f3e34; color: #a8e0bb; }
.state-flagged { background: #3a3320; color: #f0d9a0; }
.admin-note { width: 100%; margin-top: 0.6rem; }
.admin-note input { width: 100%; min-height: 44px; padding: 0.5rem 0.6rem; border: 1px solid #6a6a6a;
  border-radius: 7px; font: inherit; background: #1e1e1e; color: var(--text); }
.outcome { margin-bottom: 1.1rem; padding: 0.8rem 1rem; border-radius: 8px; font-size: 1rem; }
.outcome.approved { background: #21372a; color: #a8e0bb; }
.outcome.issue { background: #3a3320; color: #f0d9a0; }
.meta-line { font-size: 0.85rem; color: var(--muted); margin-bottom: 1rem; }
.toast-fixed { position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%); background: #000; color: #fff;
  padding: 0.7rem 1.1rem; border-radius: 8px; font-size: 0.95rem; opacity: 0; transition: opacity .2s;
  pointer-events: none; z-index: 30; }
.toast-fixed.show { opacity: 1; }
`;

function auditLayout({ title, body, head = "" }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<style>${AUDIT_CSS}</style>${head}
</head>
<body>
<div class="container">${body}</div>
</body>
</html>`;
}

// ---- fact extraction: find concrete facts in OLD text, flag those missing from NEW ----

// Known parish proper nouns whose multi-word forms have lowercase connectors the
// generic capitalized-run regex would miss. Kept short and stable.
const KNOWN_TERMS = [
  "Education for Ministry", "EfM", "Lockhart Child Development Center", "LCDC",
  "Stephen Ministry", "Daughters of the King", "Episcopal Youth", "Set Free to Serve",
  "Tour de Saints", "Parish Nurses", "Prayer Shawl", "CODEP", "Haiti", "Koinonia",
  "Primetimers", "Men's Ministry", "Women's Ministry", "Young Adults", "Cooperative Christian Ministry",
];

function normalize(s) {
  return (s || "").toLowerCase().replace(/[‘’']/g, "'").replace(/[^a-z0-9'@.\s]/g, " ").replace(/\s+/g, " ").trim();
}

function extractFacts(text) {
  const t = text || "";
  const facts = new Set();
  // dates
  for (const m of t.matchAll(/\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\.?\s+\d{1,2}(?:,?\s*\d{4})?/g)) facts.add(m[0].trim());
  for (const m of t.matchAll(/\b(?:19|20)\d{2}\b/g)) facts.add(m[0]);                 // years
  for (const m of t.matchAll(/\$\s?\d[\d,]*(?:\.\d{1,2})?/g)) facts.add(m[0].replace(/\s/g, "")); // money
  for (const m of t.matchAll(/\(?\d{3}\)?[\s\-.]\d{3}[\s\-.]\d{4}/g)) facts.add(m[0].trim());      // phone
  for (const m of t.matchAll(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g)) facts.add(m[0]); // email
  for (const m of t.matchAll(/\b\d{1,5}\s+[A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+){0,3}\s+(?:Road|Rd|Street|St|Avenue|Ave|Drive|Dr|Lane|Ln|Blvd|Boulevard|Way|Court|Ct)\b/g)) facts.add(m[0].trim()); // street address
  for (const m of t.matchAll(/(?:[A-Z][a-z]{1,20}\s+){1,4}[A-Z][a-z]{1,20}/g)) {     // multi-word proper nouns
    const v = m[0].trim();
    if (v.length > 3) facts.add(v);
  }
  for (const term of KNOWN_TERMS) {                                                   // curated terms
    if (new RegExp("\\b" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(t)) facts.add(term);
  }
  return [...facts];
}

// Facts in OLD text not found (normalized) in NEW text. Caps at a sane length.
function missingFacts(oldText, newText) {
  if (!newText) return [];
  const hay = normalize(newText);
  const out = [];
  const seen = new Set();
  for (const f of extractFacts(oldText)) {
    const n = normalize(f);
    if (n.length < 3 || seen.has(n)) continue;
    seen.add(n);
    if (!hay.includes(n)) out.push(f);
  }
  return out.slice(0, 20);
}

// ---- shared before/after comparison component ----------------------------

function proseBlock(text) {
  const t = (text || "").trim();
  if (!t) return `<div class="prose" style="color:var(--muted);">(No text found for this page.)</div>`;
  return `<div class="prose">${esc(t)}</div>`;
}

function gapBox(oldText, newText) {
  const missing = missingFacts(oldText, newText);
  if (!newText) return "";
  if (missing.length === 0) {
    return extractFacts(oldText).length
      ? `<p class="gap-allgood">Key facts from this old page were found in the new wording.</p>`
      : "";
  }
  const items = missing
    .map((f) => `<li aria-label="Not found in new wording: ${esc(f)}">${esc(f)}</li>`)
    .join("");
  return `<div class="gap-box" role="note" aria-label="Facts to confirm on the new page">
    <h4>Please confirm these from the old page still appear on the new page:</h4>
    <ul class="gap-list">${items}</ul>
  </div>`;
}

export function comparisonHtml(unit, sources) {
  const oldHtml = sources
    .map(
      (s) => `<div class="source">
        <div class="source-title">${esc(s.old_title)}</div>
        ${s.old_url ? `<div class="source-url">${esc(s.old_url)}</div>` : ""}
        ${proseBlock(s.old_text)}
        ${gapBox(s.old_text, unit.new_text)}
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
    <div class="col col-old" role="region" aria-label="Old site wording">
      <span class="col-label">Old site wording</span>
      <div class="panel">${oldHtml || proseBlock("")}</div>
    </div>
    <div class="col col-new" role="region" aria-label="New site wording">
      <span class="col-label">New site wording</span>
      ${newHtml}
    </div>
  </section>`;
}

// ---- reviewer landing ----------------------------------------------------

export function reviewerLanding({ reviewer, flaggedCount, doneCount, nextSlug, token, firstTime }) {
  if (flaggedCount === 0) {
    return auditLayout({
      title: "Nothing to review yet",
      body: `<div class="intro"><h1 style="margin-bottom:1rem;">Hello, ${esc(reviewer.name)}</h1>
        <p>There's nothing for you to look at just yet. Nate will send a note when the first pages are ready.</p></div>`,
    });
  }
  if (doneCount >= flaggedCount) {
    return auditLayout({
      title: "All done",
      body: `<div class="intro"><h1 style="margin-bottom:1rem;">You're all done</h1>
        <p>Thank you for going through every page Nate flagged. He'll review your notes and may follow up.</p>
        <a class="btn btn-nav" style="margin-top:0.5rem;" href="/audit/${esc(token)}/u/${esc(nextSlug)}">Look back over the pages</a></div>`,
    });
  }
  if (firstTime) {
    return auditLayout({
      title: "Welcome",
      body: `<div class="intro"><h1 style="margin-bottom:1rem;">Hello, ${esc(reviewer.name)}</h1>
        <p>Nate flagged ${flaggedCount} ${flaggedCount === 1 ? "page" : "pages"} he'd like your eyes on. For each one
        you'll see the old website's wording and the new website's wording, side by side.</p>
        <p>Just check that nothing is <strong>wrong</strong> or <strong>missing</strong>, and flag anything that is.
        The wording was changed on purpose, so different phrasing is fine.</p>
        <a class="btn btn-go" style="margin-top:0.5rem;" href="/audit/${esc(token)}/u/${esc(nextSlug)}">Start</a></div>`,
    });
  }
  return auditLayout({
    title: "Welcome back",
    body: `<div class="intro"><h1 style="margin-bottom:1rem;">Welcome back, ${esc(reviewer.name)}</h1>
      <p>You've reviewed ${doneCount} of ${flaggedCount} pages.</p>
      <a class="btn btn-go" style="margin-top:0.5rem;" href="/audit/${esc(token)}/u/${esc(nextSlug)}">Continue where you left off</a></div>`,
  });
}

// ---- reviewer: a single flagged unit -------------------------------------

export function reviewerUnitPage({ unit, sources, decision, token, index, total, doneCount, prevSlug, nextSlug }) {
  const approved = decision && decision.outcome === "approved";
  const hasIssue = decision && decision.outcome === "issue";
  const banner = approved
    ? `<div class="banner ok">You marked this page as looking right. You can change your mind below.</div>`
    : hasIssue
      ? `<div class="banner issue">You sent Nate a note about this page. You can change it below.</div>`
      : "";
  const noteHtml = unit.flag_note
    ? `<div class="nate-note"><div class="eyebrow">Nate asked</div><p>${esc(unit.flag_note)}</p></div>`
    : "";
  const pct = total ? Math.round(((index + 1) / total) * 100) : 0;
  const prevBtn = prevSlug
    ? `<a class="btn btn-nav" href="/audit/${esc(token)}/u/${esc(prevSlug)}">&larr; Prev</a>`
    : `<a class="btn btn-nav" href="/audit/${esc(token)}">&larr; Prev</a>`;
  const nextBtn = nextSlug
    ? `<a class="btn btn-nav" href="/audit/${esc(token)}/u/${esc(nextSlug)}">Next &rarr;</a>`
    : `<span class="btn btn-nav" aria-disabled="true">Next &rarr;</span>`;

  const body = `
<div class="audit-header">
  <div class="eyebrow">Page ${index + 1} of ${total}</div>
  <div class="row">
    <h1>${esc(unit.title)}</h1>
    <div class="counter" aria-label="${doneCount} reviewed, ${total - doneCount} to go"><b>${doneCount}</b> reviewed &middot; <b>${total - doneCount}</b> to go</div>
  </div>
  <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
</div>

${banner}
${noteHtml}
${comparisonHtml(unit, sources)}

<div id="issueBox" class="issue-box" style="display:none;">
  <label for="issueText">Tell Nate what looks wrong or what's missing</label>
  <div class="issue-error" id="issueError" role="alert">Please write a few words before sending.</div>
  <textarea id="issueText" aria-describedby="issueError">${esc(hasIssue ? decision.issue_text || "" : "")}</textarea>
  <div class="issue-actions">
    <button type="button" class="btn btn-go" id="sendIssue" style="flex:0 0 auto;">Send my note to Nate</button>
    <button type="button" class="link-btn" id="cancelIssue">Never mind, go back</button>
  </div>
</div>

<div class="actionbar"><div class="actionbar-inner">
  ${prevBtn}
  <button type="button" class="btn btn-flag" id="btnIssue">Something's off</button>
  <button type="button" class="btn btn-go" id="btnApprove">Looks right to me</button>
  ${nextBtn}
</div></div>

<div class="toast-fixed" id="toast" role="status"></div>

<script>
const TOKEN = ${JSON.stringify(token)};
const SLUG = ${JSON.stringify(unit.slug_key)};
const NEXT = ${JSON.stringify(nextSlug || "")};
const toast = (m) => { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000); };
async function decide(outcome, issue_text) {
  const res = await fetch('/api/audit/decide', { method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ token: TOKEN, unit_slug_key: SLUG, outcome, issue_text }) });
  const j = await res.json().catch(() => ({}));
  if (!res.ok || !j.ok) { toast('Something went wrong. Please try again.'); return false; }
  return true;
}
const go = () => { location.href = NEXT ? '/audit/' + TOKEN + '/u/' + NEXT : '/audit/' + TOKEN; };
document.getElementById('btnApprove').addEventListener('click', async () => { if (await decide('approved', null)) go(); });
const issueBox = document.getElementById('issueBox'), issueText = document.getElementById('issueText');
document.getElementById('btnIssue').addEventListener('click', () => { issueBox.style.display = 'block'; issueBox.scrollIntoView({ behavior: 'smooth', block: 'center' }); issueText.focus(); });
document.getElementById('cancelIssue').addEventListener('click', () => { issueBox.style.display = 'none'; document.getElementById('btnIssue').focus(); });
document.getElementById('sendIssue').addEventListener('click', async () => {
  const val = issueText.value.trim();
  if (!val) { document.getElementById('issueError').style.display = 'block'; issueText.focus(); return; }
  if (await decide('issue', val)) go();
});
</script>`;
  return auditLayout({ title: unit.title, body });
}

export function reviewerNotFound() {
  return auditLayout({
    title: "Link not recognized",
    body: `<div class="intro"><h1>That link isn't recognized</h1>
      <p>Please reply to the email you received and we'll send you a fresh link.</p></div>`,
  });
}

// ---- admin: Nate's first pass, one unit at a time ------------------------

export function adminPage({ unit, sources, unitDecisions, index, total, prevSlug, nextSlug, doneCount, pendingCount, adminKey }) {
  if (!unit) {
    return auditLayout({ title: "Content audit", body: `<div class="intro"><h1>No units yet</h1><p>Seed the audit content first.</p></div>` });
  }
  const navHref = (slug) => `/audit-admin?key=${encodeURIComponent(adminKey)}&u=${encodeURIComponent(slug)}`;
  const prevBtn = prevSlug ? `<a class="btn btn-nav" href="${navHref(prevSlug)}">&larr; Prev</a>` : `<span class="btn btn-nav" aria-disabled="true">&larr; Prev</span>`;
  const nextBtn = nextSlug ? `<a class="btn btn-nav" href="${navHref(nextSlug)}">Next &rarr;</a>` : `<span class="btn btn-nav" aria-disabled="true">Next &rarr;</span>`;
  const pct = total ? Math.round(((index + 1) / total) * 100) : 0;

  const outcome = (unitDecisions || [])
    .map((d) => `<div class="outcome ${d.outcome}"><strong>Reviewer (${esc(d.reviewer_name)}):</strong> ${d.outcome === "approved" ? "Looks right" : "Raised an issue"}${d.issue_text ? `. ${esc(d.issue_text)}` : ""}</div>`)
    .join("");

  const stateClass = `state-${unit.review_state}`;

  const body = `
<div class="audit-header">
  <div class="eyebrow">First pass &middot; Unit ${index + 1} of ${total}</div>
  <div class="row">
    <h1>${esc(unit.title)} <span class="state-badge ${stateClass}" data-state-badge>${unit.review_state}</span></h1>
    <div class="counter" aria-label="${doneCount} done, ${pendingCount} to review"><b>${doneCount}</b> done &middot; <b>${pendingCount}</b> to review</div>
  </div>
  <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
</div>

<div class="meta-line">${esc(unit.disposition)} &middot; ${esc(unit.new_url || "removed")} &middot; ${sources.length} old source${sources.length === 1 ? "" : "s"}</div>
${outcome}
${comparisonHtml(unit, sources)}

<div class="actionbar"><div class="actionbar-inner">
  ${prevBtn}
  <button type="button" class="btn btn-clear" data-act="cleared">Cleared, no second look</button>
  <button type="button" class="btn btn-flag" data-act="flagged">Flag for a second look</button>
  ${nextBtn}
  <div class="admin-note"><input type="text" id="noteInput" placeholder="Note to the reviewer (optional)" value="${esc(unit.flag_note || "")}"></div>
</div></div>

<div class="toast-fixed" id="toast" role="status"></div>

<script>
const KEY = ${JSON.stringify(adminKey)};
const SLUG = ${JSON.stringify(unit.slug_key)};
const NEXT = ${JSON.stringify(nextSlug || "")};
const toast = (m) => { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 1800); };
document.querySelectorAll('[data-act]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const state = btn.dataset.act;
    const note = document.getElementById('noteInput').value || null;
    const res = await fetch('/api/audit/triage', { method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ key: KEY, slug_key: SLUG, review_state: state, flag_note: note }) });
    const j = await res.json().catch(() => ({}));
    if (!res.ok || !j.ok) { toast('Error saving'); return; }
    const badge = document.querySelector('[data-state-badge]');
    badge.textContent = state; badge.className = 'state-badge state-' + state;
    toast(state === 'flagged' ? 'Flagged. Moving on.' : 'Cleared. Moving on.');
    if (NEXT) setTimeout(() => { location.href = '/audit-admin?key=' + encodeURIComponent(KEY) + '&u=' + encodeURIComponent(NEXT); }, 500);
  });
});
</script>`;
  return auditLayout({ title: "Content audit admin", body });
}
