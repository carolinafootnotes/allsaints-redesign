import { validateAdminKey } from "../auth.js";
import { createDecision, setAssignments } from "../db.js";
import { parseDecisionsCsv } from "../csv.js";

async function formToObject(request) {
  const fd = await request.formData();
  const data = {};
  for (const [k, v] of fd.entries()) data[k] = v;
  return data;
}

export async function handle(request, env) {
  const data = await formToObject(request);
  if (!validateAdminKey(env, data.admin_key)) {
    return new Response("unauthorized", { status: 401 });
  }
  const options = JSON.parse(data.options);
  const target_selector = JSON.parse(data.target_selector);
  const subject_reviewer_id = data.subject_reviewer_id ? Number(data.subject_reviewer_id) : null;
  const assigned_reviewer_ids = (data.assigned_reviewer_ids || "")
    .split(",")
    .map((s) => Number(s.trim()))
    .filter(Boolean);

  const r = await createDecision(env.DB, {
    section: data.section,
    kind: data.kind,
    question: data.question,
    context: data.context || null,
    options,
    subject_reviewer_id,
    target_selector,
  });
  if (assigned_reviewer_ids.length) {
    await setAssignments(env.DB, r.id, assigned_reviewer_ids);
  }
  return new Response(null, {
    status: 303,
    headers: { Location: `/admin?key=${encodeURIComponent(data.admin_key)}` },
  });
}

export async function handleBulk(request, env) {
  const data = await formToObject(request);
  if (!validateAdminKey(env, data.admin_key)) {
    return new Response("unauthorized", { status: 401 });
  }
  const rows = parseDecisionsCsv(data.csv || "");
  const { results } = await env.DB.prepare("SELECT id, email FROM reviewers").all();
  const emailToId = Object.fromEntries(results.map((r) => [r.email, r.id]));

  for (const row of rows) {
    const subject_reviewer_id = row.subject_email ? emailToId[row.subject_email] || null : null;
    const r = await createDecision(env.DB, {
      section: row.section,
      kind: row.kind,
      question: row.question,
      context: row.context,
      options: row.options,
      subject_reviewer_id,
      target_selector: row.target_selector,
    });
    const aIds = row.assigned_emails.map((e) => emailToId[e]).filter(Boolean);
    if (aIds.length) await setAssignments(env.DB, r.id, aIds);
  }

  return new Response(null, {
    status: 303,
    headers: { Location: `/admin?key=${encodeURIComponent(data.admin_key)}` },
  });
}
