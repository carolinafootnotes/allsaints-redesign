import { layout, esc } from "./layout.js";

const SECTION_LABELS = {
  home: "Home page",
  visit: "Visit",
  connect: "Connect",
  happenings: "What's Happening",
  "rector-search": "Rector Search",
  "watch-live": "Watch Live",
  global: "Site-wide",
};

function renderDecision(decision, mySubmission) {
  let options = [];
  try {
    options = JSON.parse(decision.options) || [];
  } catch (_) {
    options = [];
  }
  const isFinalized = decision.status === "finalized";
  const isBio = decision.kind === "bio";
  const selectedKey = mySubmission?.choice;

  let badge;
  if (isFinalized) {
    badge = `<span class="badge badge-finalized">Finalized</span>`;
  } else if (mySubmission) {
    badge = `<span class="badge badge-submitted">Submitted ${esc(mySubmission.submitted_at)}</span>`;
  } else {
    badge = `<span class="badge badge-open">Not yet submitted</span>`;
  }

  const optionsHtml = options
    .map((opt) => {
      const selected = selectedKey === opt.key;
      return `<label class="option${selected ? " selected" : ""}">
<input type="radio" name="choice" value="${esc(opt.key)}"${selected ? " checked" : ""}${isFinalized ? " disabled" : ""} hidden>
<div class="option-label">${esc(opt.label)}</div>
<div class="option-body">${esc(opt.body)}</div>
</label>`;
    })
    .join("");

  const otherSelected = selectedKey === "other";
  const otherHtml = `<label class="option${otherSelected ? " selected" : ""}">
<input type="radio" name="choice" value="other"${otherSelected ? " checked" : ""}${isFinalized ? " disabled" : ""} hidden>
<div class="option-label">Other</div>
<textarea name="other_text" placeholder="Write your own version..."${isFinalized ? " disabled" : ""}>${esc(mySubmission?.other_text || "")}</textarea>
</label>`;

  const commentField = `<div class="field">
<label for="comment-${decision.id}">Comment (optional)</label>
<textarea id="comment-${decision.id}" name="comment" placeholder="Anything you want to add"${isFinalized ? " disabled" : ""}>${esc(mySubmission?.comment || "")}</textarea>
</div>`;

  const submitButton = isFinalized
    ? ""
    : `<button type="submit">${isBio ? "Finalize my bio" : "Save my pick"}</button>`;

  const contextHtml = decision.context
    ? `<div class="decision-context">${esc(decision.context)}</div>`
    : "";

  return `<div class="decision-card" data-decision-id="${decision.id}">
${badge}
<div class="decision-question">${esc(decision.question)}</div>
${contextHtml}
<form class="decision-form" data-decision-id="${decision.id}">
<input type="hidden" name="decision_id" value="${decision.id}">
${optionsHtml}
${otherHtml}
${commentField}
${submitButton}
<div class="status-line"></div>
</form>
</div>`;
}

export function reviewerPage({ reviewer, decisionsBySection, submissionsByDecisionId, token }) {
  let totalDecisions = 0;
  for (const arr of Object.values(decisionsBySection)) totalDecisions += arr.length;

  const sectionsHtml = Object.entries(decisionsBySection)
    .map(
      ([section, decisions]) =>
        `<div class="section"><h2>${esc(SECTION_LABELS[section] || section)}</h2>${decisions
          .map((d) => renderDecision(d, submissionsByDecisionId[d.id]))
          .join("")}</div>`,
    )
    .join("");

  const plural = totalDecisions === 1 ? "" : "s";

  const submitScript = `<script>
const TOKEN = ${JSON.stringify(token)};
document.querySelectorAll('.decision-form').forEach((form) => {
  form.querySelectorAll('.option').forEach((opt) => {
    opt.addEventListener('click', (e) => {
      if (e.target.tagName === 'TEXTAREA') return;
      form.querySelectorAll('.option').forEach((o) => o.classList.remove('selected'));
      opt.classList.add('selected');
      const radio = opt.querySelector('input[type=radio]');
      if (radio) radio.checked = true;
    });
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = form.querySelector('.status-line');
    const fd = new FormData(form);
    fd.append('token', TOKEN);
    status.textContent = 'Saving...';
    try {
      const res = await fetch('/api/submit', { method: 'POST', body: fd });
      const j = await res.json();
      if (!res.ok) {
        status.textContent = 'Error: ' + (j.error || res.status);
        return;
      }
      status.textContent = 'Saved.';
      if (j.finalized) {
        setTimeout(() => location.reload(), 500);
      }
    } catch (err) {
      status.textContent = 'Error: ' + err.message;
    }
  });
});
</script>`;

  const body = `<h1>Welcome, ${esc(reviewer.name)}</h1>
<p>You have ${totalDecisions} decision${plural} to review for the All Saints' website.</p>
${sectionsHtml}
${submitScript}`;

  return layout({ title: "Your review", body });
}

export function notFoundPage() {
  return layout({
    title: "Link not recognized",
    body: "<h1>That link isn't recognized</h1><p>Please ask Nate to re-send your review link.</p>",
  });
}
