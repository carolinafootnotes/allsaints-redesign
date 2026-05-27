import { env, SELF } from "cloudflare:test";
import { beforeEach, describe, expect, it } from "vitest";
import { createReviewer, createDecision, setAssignments, getDecisionById } from "../src/db.js";

beforeEach(async () => {
  await env.DB.exec("DELETE FROM submissions; DELETE FROM assignments; DELETE FROM decisions; DELETE FROM reviewers;");
});

async function seedReviewerWithToken(name, token, role) {
  const r = await createReviewer(env.DB, { name, email: `${name.toLowerCase()}@example.com`, role });
  await env.DB.prepare("UPDATE reviewers SET token = ?1 WHERE id = ?2").bind(token, r.id).run();
  return { id: r.id, token };
}

async function seedDecision(overrides = {}) {
  return await createDecision(env.DB, {
    section: "home",
    kind: "copy",
    question: "Pick one",
    context: null,
    options: [{ key: "A", label: "A", body: "Body A" }],
    subject_reviewer_id: null,
    target_selector: { file: "index.html", anchor_string: "hello" },
    ...overrides,
  });
}

function submitFormRequest(fields) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined && v !== null) fd.append(k, String(v));
  }
  return new Request("https://example.com/api/submit", { method: "POST", body: fd });
}

describe("/api/submit", () => {
  it("copy vote records submission without finalizing", async () => {
    const joy = await seedReviewerWithToken("Joy", "tk-joy", "group");
    const decision = await seedDecision();
    await setAssignments(env.DB, decision.id, [joy.id]);

    const res = await SELF.fetch(
      submitFormRequest({ token: "tk-joy", decision_id: decision.id, choice: "A", comment: "looks good" }),
    );
    expect(res.status).toBe(200);
    const j = await res.json();
    expect(j.ok).toBe(true);
    expect(j.finalized).toBeFalsy();

    const row = await env.DB
      .prepare("SELECT * FROM submissions WHERE decision_id = ?1 AND reviewer_id = ?2")
      .bind(decision.id, joy.id)
      .first();
    expect(row).toBeTruthy();
    expect(row.choice).toBe("A");

    const d = await getDecisionById(env.DB, decision.id);
    expect(d.status).toBe("open");
  });

  it("bio submission auto-finalizes", async () => {
    const john = await seedReviewerWithToken("John", "tk-john", "subject");
    const decision = await seedDecision({
      kind: "bio",
      section: "connect",
      question: "John bio",
      subject_reviewer_id: john.id,
    });

    const res = await SELF.fetch(
      submitFormRequest({ token: "tk-john", decision_id: decision.id, choice: "B" }),
    );
    expect(res.status).toBe(200);
    const j = await res.json();
    expect(j.ok).toBe(true);
    expect(j.finalized).toBe(true);

    const d = await getDecisionById(env.DB, decision.id);
    expect(d.status).toBe("finalized");
    expect(d.final_choice).toBe("B");
  });

  it("reviewer not assigned to copy returns 403", async () => {
    const outsider = await seedReviewerWithToken("Outsider", "tk-out", "group");
    const decision = await seedDecision();

    const res = await SELF.fetch(
      submitFormRequest({ token: "tk-out", decision_id: decision.id, choice: "A" }),
    );
    expect(res.status).toBe(403);
  });

  it("non-subject submitting bio returns 403", async () => {
    const john = await seedReviewerWithToken("John", "tk-john", "subject");
    const other = await seedReviewerWithToken("Other", "tk-other", "subject");
    const decision = await seedDecision({
      kind: "bio",
      section: "connect",
      question: "John bio",
      subject_reviewer_id: john.id,
    });

    const res = await SELF.fetch(
      submitFormRequest({ token: "tk-other", decision_id: decision.id, choice: "A" }),
    );
    expect(res.status).toBe(403);
  });

  it("invalid token returns 401", async () => {
    const decision = await seedDecision();
    const res = await SELF.fetch(
      submitFormRequest({ token: "nope", decision_id: decision.id, choice: "A" }),
    );
    expect(res.status).toBe(401);
  });
});
