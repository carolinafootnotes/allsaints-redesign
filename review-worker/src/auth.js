export function validateAdminKey(env, key) {
  if (!env || !env.ADMIN_KEY) return false;
  if (!key) return false;
  return key === env.ADMIN_KEY;
}

export async function parseSubmitBody(request) {
  const contentType = request.headers.get("content-type") || "";
  let raw;
  try {
    if (contentType.includes("application/json")) {
      raw = await request.json();
    } else {
      const fd = await request.formData();
      raw = {};
      for (const [k, v] of fd.entries()) {
        raw[k] = v;
      }
    }
  } catch {
    return { ok: false, status: 400, error: "missing required fields" };
  }

  const token = raw.token;
  const decision_id_raw = raw.decision_id;
  const choice = raw.choice;

  if (!token || decision_id_raw === undefined || decision_id_raw === null || decision_id_raw === "" || !choice) {
    return { ok: false, status: 400, error: "missing required fields" };
  }

  const decision_id = Number(decision_id_raw);
  if (!Number.isFinite(decision_id)) {
    return { ok: false, status: 400, error: "missing required fields" };
  }

  const other_text = raw.other_text != null && raw.other_text !== "" ? String(raw.other_text) : null;
  const comment = raw.comment != null ? String(raw.comment) : "";

  return {
    ok: true,
    body: {
      token: String(token),
      decision_id,
      choice: String(choice),
      other_text,
      comment,
    },
  };
}
