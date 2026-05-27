import { layout, esc } from "./layout.js";

export function tally(submissions) {
  const counts = {};
  for (const s of submissions) {
    const key = s.choice || "";
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

export function renderDecision(decision, submissions, reviewers, adminKey) {
  let options = [];
  try {
    options = JSON.parse(decision.options || "[]");
  } catch {
    options = [];
  }
  const isBio = decision.kind === "bio";
  const isFinalized = decision.status === "finalized";
  const counts = tally(submissions);

  let tallyHtml = "";
  if (isBio) {
    const subject = reviewers.find((r) => r.id === decision.subject_reviewer_id);
    const subjectName = subject ? subject.name : "?";
    tallyHtml = `<div>Subject: ${esc(subjectName)}</div>`;
  } else {
    const parts = options
      .map((o) => `<div>${esc(o.label)} (${esc(o.key)}): ${counts[o.key] || 0}</div>`)
      .join("");
    const otherCount = counts["other"] || 0;
    tallyHtml = parts + `<div>Other: ${otherCount}</div>`;
  }

  const submittedReviewerIds = new Set(submissions.map((s) => s.reviewer_id));
  const chipsHtml = reviewers
    .filter((r) => r.assigned === true)
    .map((r) => {
      const submitted = submittedReviewerIds.has(r.id);
      const cls = submitted ? "badge-submitted" : "badge-open";
      const mark = submitted ? "✓" : "◯";
      return `<span class="badge ${cls}">${mark} ${esc(r.name)}</span>`;
    })
    .join(" ");

  const submissionsList = submissions.length
    ? `<ul>${submissions
        .map((s) => {
          const otherTxt = s.other_text ? ` (other: ${esc(s.other_text)})` : "";
          const commentTxt = s.comment ? ` <em>"${esc(s.comment)}"</em>` : "";
          return `<li><strong>${esc(s.reviewer_name)}</strong>: ${esc(s.choice)}${otherTxt}${commentTxt}</li>`;
        })
        .join("")}</ul>`
    : "";

  let formHtml = "";
  if (!isFinalized && !isBio) {
    const optionTags = options
      .map((o) => `<option value="${esc(o.key)}">${esc(o.label)}</option>`)
      .join("");
    formHtml = `<form method="POST" action="/api/finalize" style="margin-top:1rem;">
        <input type="hidden" name="admin_key" value="${esc(adminKey)}">
        <input type="hidden" name="decision_id" value="${decision.id}">
        <label>Finalize as:</label>
        <select name="final_choice">
          ${optionTags}
          <option value="other">Other (specify)</option>
        </select>
        <input type="text" name="final_other_text" placeholder="If Other, paste exact final text">
        <button type="submit">Finalize</button>
      </form>`;
  } else if (isFinalized) {
    formHtml = `<form method="POST" action="/api/finalize" style="margin-top:1rem;">
        <input type="hidden" name="admin_key" value="${esc(adminKey)}">
        <input type="hidden" name="decision_id" value="${decision.id}">
        <input type="hidden" name="action" value="reopen">
        <button type="submit" class="secondary">Reopen</button>
      </form>`;
  }

  const statusBadge = isFinalized
    ? `<span class="badge badge-finalized">Finalized</span>`
    : `<span class="badge badge-open">Open</span>`;

  const choseSuffix = isFinalized ? ` · Chose: ${esc(decision.final_choice || "")}` : "";
  const metaLine = `Section: ${esc(decision.section)} · Kind: ${esc(decision.kind)}${choseSuffix}`;

  return `<div class="decision-card">
    ${statusBadge}
    <div class="decision-question">${esc(decision.question)}</div>
    <div class="status-line">${metaLine}</div>
    <div style="margin-top:0.5rem;">${chipsHtml}</div>
    <div style="margin-top:0.75rem;">${tallyHtml}</div>
    ${submissionsList}
    ${formHtml}
  </div>`;
}

export function adminPage({ adminKey, reviewers, decisions, submissionsByDecisionId, assignedReviewerIdsByDecisionId }) {
  const counts = {
    open: decisions.filter((d) => d.status === "open").length,
    finalized: decisions.filter((d) => d.status === "finalized").length,
    submissions: Object.values(submissionsByDecisionId).reduce((acc, arr) => acc + arr.length, 0),
    reviewers: reviewers.length,
  };

  const linksList = reviewers
    .map(
      (r) =>
        `<li><strong>${esc(r.name)}</strong> (${esc(r.email)}): <code>https://allsaints-review.nate-ernst7.workers.dev/r/${esc(r.token)}</code></li>`,
    )
    .join("");
  const linksPanel = `<div class="decision-card"><h2>Magic links</h2><ul>${linksList}</ul></div>`;

  const bySection = {};
  for (const d of decisions) {
    if (!bySection[d.section]) bySection[d.section] = [];
    bySection[d.section].push(d);
  }

  const decisionsHtml = Object.entries(bySection)
    .map(([section, ds]) => {
      const cards = ds
        .map((d) => {
          const assignedIds = assignedReviewerIdsByDecisionId[d.id] || [];
          const reviewersWithAssignedFlag = reviewers.map((r) => ({
            ...r,
            assigned: assignedIds.includes(r.id) || r.id === d.subject_reviewer_id,
          }));
          return renderDecision(d, submissionsByDecisionId[d.id] || [], reviewersWithAssignedFlag, adminKey);
        })
        .join("");
      return `<div class="section"><h2>${esc(section)}</h2>${cards}</div>`;
    })
    .join("");

  const body = `<h1>All Saints' Review · Admin</h1>
<p>Open: ${counts.open} · Submissions: ${counts.submissions} · Finalized: ${counts.finalized} · Reviewers: ${counts.reviewers}</p>
${linksPanel}
${decisionsHtml}
<p style="margin-top:3rem; font-size:0.85rem; color:#888;">Decision authoring + reviewer creation forms come in Task 7.</p>`;

  return layout({ title: "Admin", body });
}
