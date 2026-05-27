import { env } from "cloudflare:test";
import { beforeEach, describe, expect, it } from "vitest";
import {
  createReviewer,
  getReviewerByToken,
  upsertSubmission,
  finalizeDecision,
  getDecisionsForReviewer,
  createDecision,
  setAssignments,
  getSubmissionByReviewerDecision,
  getDecisionById,
} from "../src/db.js";

beforeEach(async () => {
  await env.DB.exec("DELETE FROM submissions; DELETE FROM assignments; DELETE FROM decisions; DELETE FROM reviewers;");
});

async function seedReviewer(name = "Alice", email = "alice@example.com", role = "group") {
  return await createReviewer(env.DB, { name, email, role });
}

async function seedDecision(overrides = {}) {
  return await createDecision(env.DB, {
    section: "home",
    kind: "copy",
    question: "Pick one",
    context: null,
    options: [{ key: "a", label: "A", body: "Body A" }],
    subject_reviewer_id: null,
    target_selector: { file: "index.html", anchor_string: "hello" },
    ...overrides,
  });
}

describe("createReviewer", () => {
  it("returns id and a 32+ char token", async () => {
    const r = await createReviewer(env.DB, { name: "Bob", email: "bob@example.com", role: "subject" });
    expect(r.id).toBeGreaterThan(0);
    expect(typeof r.token).toBe("string");
    expect(r.token.length).toBeGreaterThanOrEqual(32);
  });
});

describe("getReviewerByToken", () => {
  it("returns the reviewer when token matches", async () => {
    const r = await seedReviewer();
    const hit = await getReviewerByToken(env.DB, r.token);
    expect(hit).toBeTruthy();
    expect(hit.id).toBe(r.id);
    expect(hit.name).toBe("Alice");
  });

  it("returns null when token does not match", async () => {
    const miss = await getReviewerByToken(env.DB, "nope-not-a-token");
    expect(miss).toBeFalsy();
  });
});

describe("upsertSubmission", () => {
  it("inserts then updates to a single row with latest values", async () => {
    const reviewer = await seedReviewer();
    const decision = await seedDecision();

    await upsertSubmission(env.DB, {
      decision_id: decision.id,
      reviewer_id: reviewer.id,
      choice: "a",
      other_text: null,
      comment: "first",
    });

    await upsertSubmission(env.DB, {
      decision_id: decision.id,
      reviewer_id: reviewer.id,
      choice: "other",
      other_text: "custom",
      comment: "second",
    });

    const row = await getSubmissionByReviewerDecision(env.DB, {
      decision_id: decision.id,
      reviewer_id: reviewer.id,
    });
    expect(row.choice).toBe("other");
    expect(row.other_text).toBe("custom");
    expect(row.comment).toBe("second");

    const count = await env.DB.prepare("SELECT COUNT(*) AS c FROM submissions").first();
    expect(count.c).toBe(1);
  });
});

describe("finalizeDecision", () => {
  it("sets status, final_choice, finalized_at", async () => {
    const decision = await seedDecision();
    await finalizeDecision(env.DB, {
      decision_id: decision.id,
      final_choice: "a",
      final_other_text: null,
    });
    const got = await getDecisionById(env.DB, decision.id);
    expect(got.status).toBe("finalized");
    expect(got.final_choice).toBe("a");
    expect(got.finalized_at).toBeTruthy();
  });
});

describe("getDecisionsForReviewer", () => {
  it("includes bio where subject, copy where assigned, excludes bio when not subject", async () => {
    const alice = await seedReviewer("Alice", "a@x.com", "group");
    const bob = await seedReviewer("Bob", "b@x.com", "subject");

    const bioForBob = await seedDecision({
      kind: "bio",
      section: "connect",
      question: "Bob bio",
      subject_reviewer_id: bob.id,
    });

    const copyAssignedToAlice = await seedDecision({
      kind: "copy",
      section: "home",
      question: "Home copy",
    });
    await setAssignments(env.DB, copyAssignedToAlice.id, [alice.id]);

    const bioForAliceOnly = await seedDecision({
      kind: "bio",
      section: "visit",
      question: "Alice bio",
      subject_reviewer_id: alice.id,
    });
    // Assign Bob to Alice's bio. Should NOT appear for Bob because kind=bio and he is not the subject.
    await setAssignments(env.DB, bioForAliceOnly.id, [bob.id]);

    const forBob = await getDecisionsForReviewer(env.DB, bob.id);
    const ids = forBob.map((d) => d.id);
    expect(ids).toContain(bioForBob.id);
    expect(ids).not.toContain(copyAssignedToAlice.id);
    expect(ids).not.toContain(bioForAliceOnly.id);

    const forAlice = await getDecisionsForReviewer(env.DB, alice.id);
    const aliceIds = forAlice.map((d) => d.id);
    expect(aliceIds).toContain(copyAssignedToAlice.id);
    expect(aliceIds).toContain(bioForAliceOnly.id);
    expect(aliceIds).not.toContain(bioForBob.id);
  });
});
