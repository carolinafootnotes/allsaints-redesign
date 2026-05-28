import { layout, esc } from "./layout.js";

// Reviewer-facing CSS — mobile-first, sticky sign-off, 44px touch targets.
const MOBILE_CSS = `
body { padding: 0; }
.container { padding: 1rem 1rem 7rem; max-width: 640px; }
.page-header { position: sticky; top: 0; z-index: 5; background: #faf8f4; padding: 1rem 1rem 0.75rem;
  border-bottom: 1px solid #e8e4dc; }
.page-header h1 { font-size: 1.4rem; line-height: 1.15; margin: 0; }
.page-meta { font-size: 0.85rem; color: #666; margin-top: 0.25rem; }
.page-meta a { color: #7b2332; }
.header-actions { display: flex; gap: 0.5rem; margin-top: 0.75rem; }
.header-actions .btn-error { background: #fff; color: #7b2332; border: 1px solid #7b2332;
  padding: 0.55rem 0.85rem; border-radius: 6px; font-size: 0.85rem; font-weight: 600; cursor: pointer;
  min-height: 44px; }
.flag-strip { background: #fff3cd; border: 1px solid #f0d97a; border-radius: 6px;
  padding: 0.6rem 0.75rem; font-size: 0.85rem; margin: 0.75rem 0 0; }
.flag-strip strong { display: block; margin-bottom: 0.25rem; }
.flag-strip ul { margin: 0; padding-left: 1.25rem; }

.block-card { background: #fff; border: 1px solid #e8e4dc; border-radius: 10px;
  padding: 1.1rem; margin: 1rem 0; }
.block-anchor { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em;
  text-transform: uppercase; color: #7b2332; margin-bottom: 0.35rem; }
.block-question { font-weight: 600; font-size: 1.05rem; margin-bottom: 0.4rem; line-height: 1.3; }
.block-context { font-size: 0.88rem; color: #666; font-style: italic; margin-bottom: 0.9rem; }
.currently-shipped { display: inline-block; background: #f0ebe0; color: #5a4d3a;
  font-size: 0.72rem; padding: 0.18rem 0.55rem; border-radius: 999px; margin-bottom: 0.5rem; }

.option { display: block; background: #faf8f4; border: 2px solid transparent;
  border-radius: 8px; padding: 0.9rem; margin-bottom: 0.6rem; cursor: pointer;
  min-height: 44px; }
.option.selected { border-color: #7b2332; background: #fff; }
.option-label { font-weight: 700; font-size: 0.78rem; letter-spacing: 0.05em;
  text-transform: uppercase; color: #7b2332; margin-bottom: 0.3rem; }
.option-body { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; line-height: 1.4; }
.option-skip { background: transparent; border: 1px dashed #b7b0a0; color: #555; }
.option-skip .option-label { color: #777; }

.checklist-item { display: flex; align-items: flex-start; gap: 0.6rem;
  padding: 0.6rem 0.55rem; border-radius: 6px; min-height: 44px; cursor: pointer; }
.checklist-item:hover { background: #faf8f4; }
.checklist-item input[type=checkbox] { width: 20px; height: 20px; margin-top: 0.15rem; flex-shrink: 0; }
.checklist-item label { font-size: 0.98rem; line-height: 1.35; }
.checklist-add { margin-top: 0.5rem; }
.checklist-add input { font: inherit; width: 100%; padding: 0.55rem; min-height: 44px;
  border: 1px solid #d0cabd; border-radius: 6px; }

.comment-field { margin-top: 0.85rem; }
.comment-field label { display: block; font-size: 0.8rem; color: #555; margin-bottom: 0.3rem; }
.comment-field textarea { width: 100%; min-height: 60px; padding: 0.55rem;
  border: 1px solid #d0cabd; border-radius: 6px; font: inherit; }

.block-actions { display: flex; align-items: center; justify-content: space-between;
  gap: 0.6rem; margin-top: 0.9rem; flex-wrap: wrap; }
.block-actions button { min-height: 44px; padding: 0.6rem 1rem; border-radius: 6px;
  border: none; background: #7b2332; color: #fff; font: inherit; font-weight: 600; cursor: pointer; }
.block-actions .btn-secondary { background: #fff; color: #7b2332; border: 1px solid #7b2332; }
.block-tally { font-size: 0.85rem; color: #555; }
.block-tally-bar { display: inline-block; height: 8px; background: #7b2332; border-radius: 4px;
  vertical-align: middle; margin-right: 0.4rem; }
.block-status { font-size: 0.8rem; color: #2d6a4f; }
.block-error-link { display: block; font-size: 0.8rem; color: #888; text-align: right;
  margin-top: 0.5rem; text-decoration: underline; cursor: pointer; }

.signoff-bar { position: fixed; left: 0; right: 0; bottom: 0; background: #fff;
  border-top: 1px solid #e8e4dc; padding: 0.85rem 1rem; box-shadow: 0 -4px 12px rgba(0,0,0,0.06);
  z-index: 10; }
.signoff-bar-inner { max-width: 640px; margin: 0 auto; display: flex; align-items: center;
  justify-content: space-between; gap: 0.75rem; }
.signoff-bar button { min-height: 48px; padding: 0.75rem 1.25rem; border-radius: 8px;
  background: #2d6a4f; color: #fff; border: none; font: inherit; font-weight: 700; cursor: pointer;
  font-size: 1rem; }
.signoff-bar .signoff-progress { font-size: 0.85rem; color: #555; }

dialog.error-modal, dialog.signoff-modal { width: min(560px, calc(100% - 2rem));
  border: none; border-radius: 12px; padding: 0; }
dialog::backdrop { background: rgba(20,16,12,0.5); }
.modal-inner { padding: 1.25rem; }
.modal-inner h2 { font-size: 1.3rem; margin: 0 0 0.5rem; }
.modal-inner p { font-size: 0.92rem; color: #555; margin: 0.25rem 0 0.85rem; }
.modal-inner label { display: block; font-size: 0.8rem; color: #555; margin: 0.6rem 0 0.25rem; }
.modal-inner input[type=text], .modal-inner textarea, .modal-inner input[type=url] {
  width: 100%; padding: 0.55rem; border: 1px solid #d0cabd; border-radius: 6px; font: inherit; }
.modal-inner textarea { min-height: 80px; }
.modal-actions { display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem; flex-wrap: wrap; }
.modal-actions button { min-height: 44px; padding: 0.55rem 1rem; border-radius: 6px;
  border: none; font: inherit; font-weight: 600; cursor: pointer; }
.modal-actions .btn-primary { background: #7b2332; color: #fff; }
.modal-actions .btn-secondary { background: #fff; color: #555; border: 1px solid #c8c2b3; }
.modal-actions .btn-danger { background: #2d6a4f; color: #fff; }

.toast { position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%);
  background: #1a1a1a; color: #fff; padding: 0.7rem 1.1rem; border-radius: 8px;
  font-size: 0.9rem; z-index: 20; opacity: 0; transition: opacity 0.2s; pointer-events: none; }
.toast.show { opacity: 1; }
`;

export function interstitialPage({ reviewer, token }) {
  const body = `
<div class="page-header" style="position:static;">
  <h1>Welcome, ${esc(reviewer.name)}</h1>
</div>
<div class="block-card">
  <p style="font-size:1.05rem; line-height:1.5;">
    You're approving copy for the new All Saints' site. Each page takes about
    12 to 15 minutes, roughly 8 picks plus a checklist.
  </p>
  <p style="font-size:1.05rem; line-height:1.5; margin-top:0.75rem;">
    Pick the wording you prefer. Skip anything you don't have an opinion on.
    If you see something incorrect, hit <strong>"Something's wrong here"</strong>
    and Brian will route it. Sign off when you're good with the page.
  </p>
  <form method="POST" action="/api/p/interstitial" style="margin-top:1.5rem;">
    <input type="hidden" name="token" value="${esc(token)}">
    <button type="submit" style="background:#7b2332; color:#fff; border:none;
      padding:0.85rem 1.5rem; border-radius:8px; font:inherit; font-weight:700;
      font-size:1.05rem; cursor:pointer; min-height:48px; width:100%;">
      Got it, let's go
    </button>
  </form>
</div>`;
  return layout({
    title: "Welcome",
    body,
    head: `<style>${MOBILE_CSS}</style>`,
  });
}

export function dashboardPage({ reviewer, pageRows, token }) {
  let body = `
<div class="page-header" style="position:static;">
  <h1>Welcome, ${esc(reviewer.name)}</h1>
  <div class="page-meta">Pages to approve for the new All Saints' site.</div>
</div>`;

  if (pageRows.length === 0) {
    body += `<div class="block-card"><p>Nothing to review yet. Brian or Nate will send a note when your first page is ready.</p></div>`;
  } else {
    const allSignedOff = pageRows.every((p) => p.you_signed_off);
    if (allSignedOff) {
      body += `<div class="block-card" style="background:#e8f5ec; border-color:#a3d4b5;">
        <p style="margin:0; font-weight:600;">You've signed off on every page assigned to you. Thank you, that's the whole job.</p>
      </div>`;
    }
    body += `<div style="margin-top:1rem;">` +
      pageRows
        .map((p) => {
          const statusLabel = p.you_signed_off ? "Signed off" : (p.your_progress > 0 ? "In progress" : "Not started");
          const statusColor = p.you_signed_off ? "#2d6a4f" : (p.your_progress > 0 ? "#a06420" : "#888");
          const flagBadge = p.open_flag_count > 0
            ? `<span style="background:#fff3cd; color:#8a6d3b; font-size:0.72rem; font-weight:700; padding:0.2rem 0.5rem; border-radius:4px; margin-left:0.5rem;">${p.open_flag_count} flag${p.open_flag_count === 1 ? "" : "s"}</span>`
            : "";
          return `<a href="/r2/${esc(token)}/p/${esc(p.slug)}" style="display:block; background:#fff; border:1px solid #e8e4dc; border-radius:10px; padding:1rem; margin-bottom:0.75rem; text-decoration:none; color:#1a1a1a;">
            <div style="display:flex; justify-content:space-between; align-items:baseline;">
              <div style="font-weight:600; font-size:1.05rem;">${esc(p.title)}</div>
              <div style="font-size:0.8rem; color:${statusColor}; font-weight:600;">${statusLabel}</div>
            </div>
            <div style="font-size:0.85rem; color:#666; margin-top:0.3rem;">
              ${p.signoff_count} of ${p.threshold} signed off${flagBadge}
            </div>
          </a>`;
        })
        .join("") + `</div>`;
  }

  return layout({
    title: "Your pages",
    body,
    head: `<style>${MOBILE_CSS}</style>`,
  });
}

function renderAbBlock(block, submission, otherTally) {
  let options = [];
  try { options = JSON.parse(block.options) || []; } catch {}

  const selected = submission?.choice;
  const hasVoted = !!submission && submission.choice !== "skip";
  const optsHtml = options
    .map((opt) => {
      const isSel = selected === opt.key;
      const tallyHtml = hasVoted
        ? ` <span class="block-tally">${otherTally?.counts?.[opt.key] || 0} pick${(otherTally?.counts?.[opt.key] || 0) === 1 ? "" : "s"}</span>`
        : "";
      return `<label class="option${isSel ? " selected" : ""}">
        <input type="radio" name="choice" value="${esc(opt.key)}"${isSel ? " checked" : ""} hidden>
        <div class="option-label">${esc(opt.label)}${tallyHtml}</div>
        <div class="option-body">${esc(opt.body)}</div>
      </label>`;
    })
    .join("");

  const skipSelected = selected === "skip";
  const skipHtml = `<label class="option option-skip${skipSelected ? " selected" : ""}">
    <input type="radio" name="choice" value="skip"${skipSelected ? " checked" : ""} hidden>
    <div class="option-label">Skip this one (no opinion)</div>
  </label>`;

  const commentHtml = `<div class="comment-field">
    <label for="c-${block.id}">Comment (optional). If you'd word it differently, this is the place.</label>
    <textarea id="c-${block.id}" name="comment">${esc(submission?.comment || "")}</textarea>
  </div>`;

  const status = submission
    ? `<div class="block-status">Saved.</div>`
    : "";

  return `<div class="block-card" data-block-id="${block.id}" data-block-type="ab_choice">
    <div class="block-anchor">${esc(block.section || "")}</div>
    <div class="block-question">${esc(block.question)}</div>
    ${block.context ? `<div class="block-context">${esc(block.context)}</div>` : ""}
    <form class="block-form" data-block-id="${block.id}">
      ${optsHtml}
      ${skipHtml}
      ${commentHtml}
      <div class="block-actions">
        <button type="submit">Save my pick</button>
        ${status}
      </div>
    </form>
    <a class="block-error-link" data-block-id="${block.id}" data-block-anchor="${esc(block.section || "")}">Something's wrong here</a>
  </div>`;
}

function renderChecklistBlock(block, submission, tally) {
  let opts = { question: block.question, items: [], allow_add: false };
  try { opts = { ...opts, ...JSON.parse(block.options) }; } catch {}

  let resp = { checked: [], added: [] };
  if (submission?.other_text) {
    try { resp = { ...resp, ...JSON.parse(submission.other_text) }; } catch {}
  }
  const isSkipped = submission?.choice === "skip";
  const hasVoted = !!submission && !isSkipped;

  const itemsHtml = (opts.items || [])
    .map((it) => {
      const checked = resp.checked.includes(it.key);
      const rateHtml = hasVoted
        ? `<span class="block-tally" style="margin-left:0.5rem;">(${tally?.itemRates?.find((r) => r.key === it.key)?.count || 0} say covered)</span>`
        : "";
      return `<div class="checklist-item">
        <input type="checkbox" id="ci-${block.id}-${esc(it.key)}" name="checked" value="${esc(it.key)}"${checked ? " checked" : ""}>
        <label for="ci-${block.id}-${esc(it.key)}">${esc(it.label)}${rateHtml}</label>
      </div>`;
    })
    .join("");

  const addHtml = opts.allow_add
    ? `<div class="checklist-add">
        <label for="add-${block.id}" style="font-size:0.8rem; color:#555; margin-bottom:0.25rem; display:block;">Add another (comma-separate multiple)</label>
        <input type="text" id="add-${block.id}" name="added" value="${esc((resp.added || []).join(", "))}" placeholder="e.g., Bathroom locations, Where to put coats">
      </div>`
    : "";

  const skipSel = isSkipped;
  const commentHtml = `<div class="comment-field">
    <label for="c-${block.id}">Comment (optional)</label>
    <textarea id="c-${block.id}" name="comment">${esc(submission?.comment || "")}</textarea>
  </div>`;
  const skipBtn = `<label class="option option-skip${skipSel ? " selected" : ""}" style="margin-top:0.6rem;">
    <input type="checkbox" name="skip"${skipSel ? " checked" : ""} hidden>
    <div class="option-label">Skip this one (no opinion)</div>
  </label>`;

  const status = submission ? `<div class="block-status">Saved.</div>` : "";

  return `<div class="block-card" data-block-id="${block.id}" data-block-type="checklist">
    <div class="block-anchor">${esc(block.section || "")}</div>
    <div class="block-question">${esc(opts.question || block.question)}</div>
    ${block.context ? `<div class="block-context">${esc(block.context)}</div>` : ""}
    <form class="block-form" data-block-id="${block.id}">
      ${itemsHtml}
      ${addHtml}
      ${skipBtn}
      ${commentHtml}
      <div class="block-actions">
        <button type="submit">Save my answers</button>
        ${status}
      </div>
    </form>
    <a class="block-error-link" data-block-id="${block.id}" data-block-anchor="${esc(block.section || "")}">Something's wrong here</a>
  </div>`;
}

export function pageReviewPage({
  page,
  blocks,
  submissionsByBlockId,
  tallyByBlockId,
  flags,
  reviewer,
  token,
  signoff,
  signoffCount,
}) {
  const blocksHtml = blocks
    .map((b) => {
      const sub = submissionsByBlockId[b.id];
      const tally = tallyByBlockId[b.id];
      if (b.block_type === "checklist") return renderChecklistBlock(b, sub, tally);
      return renderAbBlock(b, sub, tally);
    })
    .join("");

  const openFlags = flags.filter((f) => !["confirmed", "rejected", "deferred"].includes(f.status));
  const flagStripHtml = openFlags.length
    ? `<div class="flag-strip"><strong>Flagged for fact-check (${openFlags.length}):</strong>
        <ul>${openFlags
          .map((f) => `<li>${esc(f.claim_under_review.slice(0, 110))}${f.claim_under_review.length > 110 ? "…" : ""}</li>`)
          .join("")}</ul></div>`
    : "";

  const respondedIds = Object.keys(submissionsByBlockId).map(Number);
  const incomplete = blocks.filter((b) => !respondedIds.includes(b.id));

  const signoffLabel = signoff ? "Signed off ✓" : "Sign off on this page";
  const signoffProgressHtml = `<span class="signoff-progress">${signoffCount} of 3 signed off</span>`;

  const body = `
<div class="page-header">
  <h1>${esc(page.title)}</h1>
  <div class="page-meta">
    ${page.live_url ? `<a href="${esc(page.live_url)}" target="_blank" rel="noopener">View live page</a> · ` : ""}
    <span>${respondedIds.length} of ${blocks.length} blocks done</span>
  </div>
  <div class="header-actions">
    <button class="btn-error" data-action="open-error-modal" data-block-anchor="">Something's wrong here</button>
    <a href="/r2/${esc(token)}" style="font-size:0.85rem; color:#7b2332; align-self:center; margin-left:auto;">← All pages</a>
  </div>
  ${flagStripHtml}
</div>

${blocksHtml || `<div class="block-card"><p>No blocks on this page yet. Brian or Nate will publish content soon.</p></div>`}

<div class="signoff-bar">
  <div class="signoff-bar-inner">
    ${signoffProgressHtml}
    <button data-action="signoff" ${signoff ? "disabled" : ""}>${signoffLabel}</button>
  </div>
</div>

<dialog class="error-modal" id="errorModal">
  <form class="modal-inner" id="errorForm">
    <h2>Report an error</h2>
    <p>Use this if something on this page is incorrect, not if you'd just word it differently.</p>
    <input type="hidden" name="block_anchor" id="errBlockAnchor">
    <label for="errClaim">Quote the part that's wrong</label>
    <textarea name="claim_under_review" id="errClaim" required></textarea>
    <label for="errFix">What should it say instead?</label>
    <textarea name="proposed_correction" id="errFix" required></textarea>
    <label for="errUrl">Evidence URL (optional)</label>
    <input type="url" name="evidence_url" id="errUrl" placeholder="https://...">
    <div class="modal-actions">
      <button type="button" class="btn-secondary" data-action="close-error-modal">Cancel</button>
      <button type="submit" class="btn-primary">Send to Brian</button>
    </div>
  </form>
</dialog>

<dialog class="signoff-modal" id="signoffModal">
  <div class="modal-inner">
    <h2>Sign off as-is?</h2>
    <p id="signoffPrompt"></p>
    <ul id="signoffMissing" style="font-size:0.9rem; color:#555; padding-left:1.25rem; margin:0.5rem 0 0.75rem;"></ul>
    <div class="modal-actions">
      <button type="button" class="btn-secondary" data-action="finish-blocks">Finish those</button>
      <button type="button" class="btn-danger" data-action="confirm-signoff">Sign off as-is</button>
    </div>
  </div>
</dialog>

<div class="toast" id="toast"></div>

<script>
const TOKEN = ${JSON.stringify(token)};
const PAGE_SLUG = ${JSON.stringify(page.slug)};
const INCOMPLETE = ${JSON.stringify(incomplete.map((b) => ({ id: b.id, label: b.section || b.question.slice(0, 40) })))};

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

document.querySelectorAll('.block-form').forEach((form) => {
  const blockId = form.dataset.blockId;
  const card = form.closest('.block-card');
  const blockType = card.dataset.blockType;

  form.querySelectorAll('.option').forEach((opt) => {
    opt.addEventListener('click', (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      const radio = opt.querySelector('input[type=radio], input[type=checkbox]');
      if (radio && radio.type === 'radio') {
        form.querySelectorAll('.option input[type=radio]').forEach((r) => r.checked = false);
        form.querySelectorAll('.option').forEach((o) => o.classList.remove('selected'));
        radio.checked = true;
        opt.classList.add('selected');
      } else if (radio && radio.type === 'checkbox') {
        radio.checked = !radio.checked;
        opt.classList.toggle('selected', radio.checked);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let payload;
    if (blockType === 'checklist') {
      const checked = Array.from(form.querySelectorAll('input[name=checked]:checked')).map((c) => c.value);
      const addedRaw = form.querySelector('input[name=added]')?.value || '';
      const added = addedRaw.split(',').map((s) => s.trim()).filter(Boolean);
      const skip = form.querySelector('input[name=skip]')?.checked;
      payload = {
        token: TOKEN,
        block_id: Number(blockId),
        block_type: 'checklist',
        choice: skip ? 'skip' : 'checked',
        other_text: JSON.stringify({ checked, added }),
        comment: form.querySelector('textarea[name=comment]')?.value || '',
      };
    } else {
      const choice = form.querySelector('input[name=choice]:checked')?.value;
      if (!choice) { toast('Pick one or "Skip this one"'); return; }
      payload = {
        token: TOKEN,
        block_id: Number(blockId),
        block_type: 'ab_choice',
        choice,
        comment: form.querySelector('textarea[name=comment]')?.value || '',
      };
    }
    try {
      const res = await fetch('/api/p/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const j = await res.json();
      if (!res.ok || !j.ok) { toast('Error: ' + (j.error || res.status)); return; }
      toast('Saved.');
      // Reload to reveal aggregate vote count after own vote.
      setTimeout(() => location.reload(), 400);
    } catch (err) { toast('Error: ' + err.message); }
  });
});

// Error modal
const errModal = document.getElementById('errorModal');
const errForm = document.getElementById('errorForm');
document.querySelectorAll('[data-action=open-error-modal]').forEach((el) => {
  el.addEventListener('click', () => {
    document.getElementById('errBlockAnchor').value = el.dataset.blockAnchor || '';
    errModal.showModal();
  });
});
document.querySelectorAll('.block-error-link').forEach((el) => {
  el.addEventListener('click', () => {
    document.getElementById('errBlockAnchor').value = el.dataset.blockAnchor || '';
    errModal.showModal();
  });
});
document.querySelector('[data-action=close-error-modal]').addEventListener('click', () => errModal.close());

errForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(errForm);
  const payload = {
    token: TOKEN,
    page_slug: PAGE_SLUG,
    anchor: fd.get('block_anchor') || null,
    claim_under_review: fd.get('claim_under_review'),
    proposed_correction: fd.get('proposed_correction'),
    evidence_url: fd.get('evidence_url') || null,
  };
  try {
    const res = await fetch('/api/p/flag', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const j = await res.json();
    if (!res.ok || !j.ok) { toast('Error: ' + (j.error || res.status)); return; }
    errModal.close();
    errForm.reset();
    toast("Got it. Brian will route this and email you when it's resolved.");
    setTimeout(() => location.reload(), 700);
  } catch (err) { toast('Error: ' + err.message); }
});

// Sign-off
const signoffModal = document.getElementById('signoffModal');
document.querySelector('[data-action=signoff]').addEventListener('click', async () => {
  if (INCOMPLETE.length === 0) {
    await doSignoff(false);
    return;
  }
  document.getElementById('signoffPrompt').textContent =
    "You haven't weighed in on " + INCOMPLETE.length + " block" + (INCOMPLETE.length === 1 ? "" : "s") + " yet:";
  const ul = document.getElementById('signoffMissing');
  ul.replaceChildren(...INCOMPLETE.map((b) => {
    const li = document.createElement('li');
    li.textContent = b.label;
    return li;
  }));
  signoffModal.showModal();
});
document.querySelector('[data-action=finish-blocks]').addEventListener('click', () => signoffModal.close());
document.querySelector('[data-action=confirm-signoff]').addEventListener('click', () => doSignoff(true));

async function doSignoff(withIncomplete) {
  try {
    const res = await fetch('/api/p/signoff', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ token: TOKEN, page_slug: PAGE_SLUG, signed_off_with_incomplete: withIncomplete }),
    });
    const j = await res.json();
    if (!res.ok || !j.ok) { toast('Error: ' + (j.error || res.status)); return; }
    signoffModal.close();
    let msg = "Signed off. Thanks. ";
    if (j.advanced) msg += "You're the third, this page is approved.";
    else msg += "You're " + j.count + " of 3 needed for this page to advance.";
    toast(msg);
    setTimeout(() => location.reload(), 1200);
  } catch (err) { toast('Error: ' + err.message); }
}
</script>
`;

  return layout({
    title: page.title,
    body,
    head: `<style>${MOBILE_CSS}</style>`,
  });
}

export function notFoundPage() {
  return layout({
    title: "Link not recognized",
    body: `<div class="block-card"><h1>That link isn't recognized</h1><p>Reply to Brian's email and he'll send a fresh one.</p></div>`,
    head: `<style>${MOBILE_CSS}</style>`,
  });
}
