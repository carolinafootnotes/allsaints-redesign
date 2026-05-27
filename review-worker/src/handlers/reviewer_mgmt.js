import { validateAdminKey } from "../auth.js";
import { createReviewer, regenerateReviewerToken } from "../db.js";

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
  await createReviewer(env.DB, {
    name: data.name,
    email: data.email,
    role: data.role,
  });
  return new Response(null, {
    status: 303,
    headers: { Location: `/admin?key=${encodeURIComponent(data.admin_key)}` },
  });
}

export async function handleRegenerate(request, env) {
  const data = await formToObject(request);
  if (!validateAdminKey(env, data.admin_key)) {
    return new Response("unauthorized", { status: 401 });
  }
  await regenerateReviewerToken(env.DB, Number(data.reviewer_id));
  return new Response(null, {
    status: 303,
    headers: { Location: `/admin?key=${encodeURIComponent(data.admin_key)}` },
  });
}
