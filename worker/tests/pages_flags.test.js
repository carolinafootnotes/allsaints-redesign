import { env, SELF } from "cloudflare:test";
import { beforeEach, describe, expect, it } from "vitest";
import { createReviewer } from "../src/review/db.js";
import {
  createPage,
  updatePageStatus,
  listFlagsForPage,
  updateFlag,
  maybeAdvanceAfterFlagResolution,
  getPageBySlug,
  createFlag,
  createBlock,
  assignReviewersToPage,
  recordSignoff,
  maybeAdvanceAfterSignoff,
} from "../src/review/pages_db.js";

beforeEach(async () => {
  await env.DB.exec(
    "DELETE FROM page_signoffs; DELETE FROM factual_flags; DELETE FROM pages; " +
      "DELETE FROM submissions; DELETE FROM assignments; DELETE FROM decisions; DELETE FROM reviewers;",
  );
});

async function seedPage() {
  const { id } = await createPage(env.DB, { slug: "visit", title: "Visit", live_url: "/final/visit/" });
  await updatePageStatus(env.DB, id, "in_review");
  return id;
}

async function seedReviewer(name = "Chuck") {
  const r = await createReviewer(env.DB, { name, email: `${name}@a.com`, role: "group" });
  await env.DB.prepare("UPDATE reviewers SET seen_interstitial_at = datetime('now') WHERE id = ?1").bind(r.id).run();
  return r;
}

describe("POST /api/p/flag", () => {
  it("creates a flag with default triaged_by='brian'", async () => {
    const pageId = await seedPage();
    const r = await seedReviewer();
    const res = await SELF.fetch(
      new Request("https://example.com/api/p/flag", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token: r.token,
          page_slug: "visit",
          anchor: "Service times",
          claim_under_review: "Sunday at 9 AM and 11 AM",
          proposed_correction: "Sunday at 8 AM and 10 AM",
          evidence_url: "https://allsaintsconcord.org",
        }),
      }),
    );
    expect(res.status).toBe(200);
    const j = await res.json();
    expect(j.ok).toBe(true);

    const flags = await listFlagsForPage(env.DB, pageId);
    expect(flags.length).toBe(1);
    expect(flags[0].triaged_by).toBe("brian");
    expect(flags[0].status).toBe("open");
    expect(flags[0].anchor).toBe("Service times");
  });

  it("rejects bad token", async () => {
    await seedPage();
    const res = await SELF.fetch(
      new Request("https://example.com/api/p/flag", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token: "nope",
          page_slug: "visit",
          claim_under_review: "x",
          proposed_correction: "y",
        }),
      }),
    );
    expect(res.status).toBe(401);
  });

  it("rejects missing required fields", async () => {
    await seedPage();
    const r = await seedReviewer();
    const res = await SELF.fetch(
      new Request("https://example.com/api/p/flag", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: r.token, page_slug: "visit" }),
      }),
    );
    expect(res.status).toBe(400);
  });
});

describe("flag resolution gates publish_ready", () => {
  it("editorially_approved page advances to publish_ready only when no open flags remain", async () => {
    const pageId = await seedPage();
    // a block + assignments + 3 signoffs to reach editorially_approved
    await createBlock(env.DB, {
      page_slug: "visit", block_type: "ab_choice", section: "Hero",
      question: "?", options: [{ key: "a", label: "A", body: "A" }],
      target_selector: { file: "", anchor_string: "" },
    });
    const rs = [];
    for (const n of ["A", "B", "C"]) rs.push(await seedReviewer(n));
    await assignReviewersToPage(env.DB, "visit", rs.map((r) => r.id));
    for (const r of rs) {
      await recordSignoff(env.DB, { page_id: pageId, reviewer_id: r.id });
    }
    await maybeAdvanceAfterSignoff(env.DB, pageId);
    let p = await getPageBySlug(env.DB, "visit");
    expect(p.status).toBe("editorially_approved");

    // open flag — should not advance
    const flagger = await seedReviewer("Flagger");
    const { id: flagId } = await createFlag(env.DB, {
      page_id: pageId,
      anchor: null,
      claim_under_review: "wrong thing",
      proposed_correction: "right thing",
      flagged_by_reviewer_id: flagger.id,
    });
    await maybeAdvanceAfterFlagResolution(env.DB, pageId);
    p = await getPageBySlug(env.DB, "visit");
    expect(p.status).toBe("editorially_approved");

    // resolve flag
    await updateFlag(env.DB, flagId, { status: "confirmed", sme_note: "fixed" });
    await maybeAdvanceAfterFlagResolution(env.DB, pageId);
    p = await getPageBySlug(env.DB, "visit");
    expect(p.status).toBe("publish_ready");
  });
});
