import { env, SELF } from "cloudflare:test";
import { beforeEach, describe, expect, it } from "vitest";
import { createReviewer } from "../src/review/db.js";
import {
  createPage,
  createBlock,
  assignReviewersToPage,
  updatePageStatus,
  getPageBySlug,
  recordSignoff,
  maybeAdvanceAfterSignoff,
  getSignoffsForPage,
} from "../src/review/pages_db.js";

beforeEach(async () => {
  await env.DB.exec(
    "DELETE FROM page_signoffs; DELETE FROM factual_flags; DELETE FROM pages; " +
      "DELETE FROM submissions; DELETE FROM assignments; DELETE FROM decisions; DELETE FROM reviewers;",
  );
});

async function seedPageWithBlock(slug = "home") {
  const { id: pageId } = await createPage(env.DB, { slug, title: "Home", live_url: "/final/" });
  await updatePageStatus(env.DB, pageId, "in_review");
  const { id: blockId } = await createBlock(env.DB, {
    page_slug: slug,
    block_type: "ab_choice",
    section: "Hero",
    question: "Which hero subtitle?",
    options: [
      { key: "a", label: "Option A", body: "A Jesus Movement in Concord, NC." },
      { key: "b", label: "Option B", body: "An Episcopal community in Concord, NC." },
    ],
    target_selector: { file: "x", anchor_string: "y" },
    sort_order: 0,
  });
  return { pageId, blockId, slug };
}

async function tokenReviewer(name) {
  const r = await createReviewer(env.DB, { name, email: `${name}@a.com`, role: "group" });
  // mark interstitial seen so the dashboard renders
  await env.DB.prepare("UPDATE reviewers SET seen_interstitial_at = datetime('now') WHERE id = ?1").bind(r.id).run();
  return r;
}

describe("page sign-off threshold", () => {
  it("advances page to editorially_approved after 3 of 5 sign off", async () => {
    const { pageId, slug } = await seedPageWithBlock();
    const reviewers = [];
    for (const n of ["Chuck", "John", "JoyMarie", "Andrea", "Brian"]) {
      reviewers.push(await tokenReviewer(n));
    }
    await assignReviewersToPage(env.DB, slug, reviewers.map((r) => r.id));

    // 2 signoffs — still in_review
    await recordSignoff(env.DB, { page_id: pageId, reviewer_id: reviewers[0].id, signed_off_with_incomplete: false });
    await maybeAdvanceAfterSignoff(env.DB, pageId);
    let p = await getPageBySlug(env.DB, slug);
    expect(p.status).toBe("in_review");

    await recordSignoff(env.DB, { page_id: pageId, reviewer_id: reviewers[1].id, signed_off_with_incomplete: false });
    await maybeAdvanceAfterSignoff(env.DB, pageId);
    p = await getPageBySlug(env.DB, slug);
    expect(p.status).toBe("in_review");

    // 3rd signoff flips it
    await recordSignoff(env.DB, { page_id: pageId, reviewer_id: reviewers[2].id, signed_off_with_incomplete: false });
    await maybeAdvanceAfterSignoff(env.DB, pageId);
    p = await getPageBySlug(env.DB, slug);
    expect(p.status).toBe("editorially_approved");
  });

  it("duplicate sign-off from same reviewer does not double-count", async () => {
    const { pageId, slug } = await seedPageWithBlock();
    const r = await tokenReviewer("Alice");
    await assignReviewersToPage(env.DB, slug, [r.id]);

    await recordSignoff(env.DB, { page_id: pageId, reviewer_id: r.id });
    await recordSignoff(env.DB, { page_id: pageId, reviewer_id: r.id, note: "second" });

    const signs = await getSignoffsForPage(env.DB, pageId);
    expect(signs.length).toBe(1);
    expect(signs[0].note).toBe("second");
  });
});

describe("POST /api/p/signoff", () => {
  it("records signoff via API and advances status when 3rd reviewer signs off", async () => {
    const { pageId, slug } = await seedPageWithBlock();
    const reviewers = [];
    for (const n of ["Chuck", "John", "JoyMarie"]) {
      reviewers.push(await tokenReviewer(n));
    }
    await assignReviewersToPage(env.DB, slug, reviewers.map((r) => r.id));

    let lastJson;
    for (const r of reviewers) {
      const res = await SELF.fetch(
        new Request("https://example.com/api/p/signoff", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token: r.token, page_slug: slug, signed_off_with_incomplete: false }),
        }),
      );
      expect(res.status).toBe(200);
      lastJson = await res.json();
    }
    expect(lastJson.count).toBe(3);
    expect(lastJson.advanced).toBe(true);
    expect(lastJson.status).toBe("editorially_approved");

    const p = await getPageBySlug(env.DB, slug);
    expect(p.status).toBe("editorially_approved");
  });

  it("returns 401 with bad token", async () => {
    const { slug } = await seedPageWithBlock();
    const res = await SELF.fetch(
      new Request("https://example.com/api/p/signoff", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: "nope", page_slug: slug }),
      }),
    );
    expect(res.status).toBe(401);
  });

  it("returns 403 if reviewer is not assigned to the page", async () => {
    const { slug } = await seedPageWithBlock();
    const outsider = await tokenReviewer("Outsider");
    const res = await SELF.fetch(
      new Request("https://example.com/api/p/signoff", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: outsider.token, page_slug: slug }),
      }),
    );
    expect(res.status).toBe(403);
  });
});

describe("vote tally aggregation", () => {
  it("counts votes per option and excludes skips", async () => {
    const { slug, blockId } = await seedPageWithBlock();
    const reviewers = [];
    for (const n of ["Chuck", "John", "JoyMarie", "Andrea"]) {
      reviewers.push(await tokenReviewer(n));
    }
    await assignReviewersToPage(env.DB, slug, reviewers.map((r) => r.id));

    const votes = ["a", "a", "b", "skip"];
    for (let i = 0; i < reviewers.length; i++) {
      const res = await SELF.fetch(
        new Request("https://example.com/api/p/submit", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            token: reviewers[i].token,
            block_id: blockId,
            block_type: "ab_choice",
            choice: votes[i],
          }),
        }),
      );
      expect(res.status).toBe(200);
    }

    const { tallyForAbBlock } = await import("../src/review/pages_db.js");
    const { getSubmissionsForDecision } = await import("../src/review/db.js");
    const subs = await getSubmissionsForDecision(env.DB, blockId);
    const tally = tallyForAbBlock(subs);
    expect(tally.counts.a).toBe(2);
    expect(tally.counts.b).toBe(1);
    expect(tally.total).toBe(3); // skip excluded
  });
});
