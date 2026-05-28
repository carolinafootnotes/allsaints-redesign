import { env, SELF } from "cloudflare:test";
import { beforeEach, describe, expect, it } from "vitest";
import { createReviewer, createDecision, finalizeDecision, getDecisionById } from '../src/review/db.js';

beforeEach(async () => {
  await env.DB.exec("DELETE FROM submissions; DELETE FROM assignments; DELETE FROM decisions; DELETE FROM reviewers;");
});

async function seedDecision(overrides = {}) {
  return await createDecision(env.DB, {
    section: "home",
    kind: "copy",
    question: "Pick one",
    context: null,
    options: [{ key: "A", label: "Option A", body: "Body A" }, { key: "B", label: "Option B", body: "Body B" }],
    subject_reviewer_id: null,
    target_selector: { file: "index.html", anchor_string: "hello" },
    ...overrides,
  });
}

function finalizeForm(fields) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined && v !== null) fd.append(k, String(v));
  }
  return new Request("https://example.com/api/finalize", { method: "POST", body: fd, redirect: "manual" });
}

describe("GET /admin", () => {
  it("401 without key", async () => {
    const res = await SELF.fetch(new Request("https://example.com/admin"));
    expect(res.status).toBe(401);
  });

  it("401 with wrong key", async () => {
    const res = await SELF.fetch(new Request("https://example.com/admin?key=wrong"));
    expect(res.status).toBe(401);
  });

  it("200 with valid key, body contains Magic links and counts header", async () => {
    await createReviewer(env.DB, { name: "Joy", email: "joy@example.com", role: "group" });
    await seedDecision();
    const res = await SELF.fetch(new Request("https://example.com/admin?key=test-admin-key"));
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("Magic links");
    expect(html).toContain("Open:");
    expect(html).toContain("Submissions:");
    expect(html).toContain("Finalized:");
    expect(html).toContain("Reviewers:");
  });
});

describe("POST /api/finalize", () => {
  it("401 with wrong admin_key", async () => {
    const d = await seedDecision();
    const res = await SELF.fetch(finalizeForm({ admin_key: "wrong", decision_id: d.id, final_choice: "A" }));
    expect(res.status).toBe(401);
  });

  it("303 redirect on valid finalize; row updated", async () => {
    const d = await seedDecision();
    const res = await SELF.fetch(
      finalizeForm({ admin_key: "test-admin-key", decision_id: d.id, final_choice: "A" }),
    );
    expect(res.status).toBe(303);
    const row = await getDecisionById(env.DB, d.id);
    expect(row.status).toBe("finalized");
    expect(row.final_choice).toBe("A");
  });

  it("reopen action flips finalized decision back to open with null final_choice", async () => {
    const d = await seedDecision();
    await finalizeDecision(env.DB, { decision_id: d.id, final_choice: "A", final_other_text: null });
    const res = await SELF.fetch(
      finalizeForm({ admin_key: "test-admin-key", decision_id: d.id, action: "reopen" }),
    );
    expect(res.status).toBe(303);
    const row = await getDecisionById(env.DB, d.id);
    expect(row.status).toBe("open");
    expect(row.final_choice).toBeNull();
  });
});
