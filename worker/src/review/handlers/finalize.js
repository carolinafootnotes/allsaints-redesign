import { validateAdminKey } from "../auth.js";
import { finalizeDecision, reopenDecision } from "../db.js";

export async function handle(request, env) {
  const fd = await request.formData();
  const data = {};
  for (const [k, v] of fd.entries()) data[k] = v;

  if (!validateAdminKey(env, data.admin_key)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const decision_id = Number(data.decision_id);
  if (!decision_id) {
    return new Response("Bad request", { status: 400 });
  }

  if (data.action === "reopen") {
    await reopenDecision(env.DB, decision_id);
  } else {
    const final_choice = data.final_choice;
    if (!final_choice) {
      return new Response("Missing final_choice", { status: 400 });
    }
    const final_other_text = data.final_other_text || null;
    await finalizeDecision(env.DB, { decision_id, final_choice, final_other_text });
  }

  const redirectUrl = new URL("/admin?key=" + encodeURIComponent(data.admin_key), request.url).toString();
  return Response.redirect(redirectUrl, 303);
}
