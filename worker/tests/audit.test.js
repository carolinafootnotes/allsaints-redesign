import { env, SELF } from "cloudflare:test";
import { beforeEach, describe, expect, it } from "vitest";
import { createReviewer } from "../src/review/db.js";

beforeEach(async () => {
  // Scope cleanup to audit tables; deleting reviewers collides with FK rows from
  // other seeds. New reviewers get unique tokens, so leftover rows are harmless.
  await env.DB.exec(
    "DELETE FROM audit_decisions; DELETE FROM audit_sources; DELETE FROM audit_units;",
  );
});

async function seedUnit({ slug = "pastoral-care", state = "flagged", disposition = "merged", note = "Check the phone number" } = {}) {
  await env.DB.prepare(
    "INSERT INTO audit_units (slug_key, title, disposition, new_url, new_text, review_state, flag_note, sort_order) VALUES (?1,?2,?3,?4,?5,?6,?7,?8)",
  ).bind(slug, "Pastoral Care", disposition, "/final/connect/pastoral-care/", "New page text", state, note, 0).run();
  const u = await env.DB.prepare("SELECT id FROM audit_units WHERE slug_key=?1").bind(slug).first();
  await env.DB.prepare(
    "INSERT INTO audit_sources (unit_id, old_title, old_url, old_text, sort_order) VALUES (?1,?2,?3,?4,0)",
  ).bind(u.id, "Pastoral Care", "/pastoral-care/", "Old page text").run();
  return u.id;
}

async function seedReviewer() {
  return await createReviewer(env.DB, { name: "Bob", email: "bob@a.com", role: "subject" });
}

const KEY = "test-admin-key";

describe("audit reviewer decisions", () => {
  it("records an approval", async () => {
    await seedUnit();
    const r = await seedReviewer();
    const res = await SELF.fetch(new Request("https://x/api/audit/decide", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: r.token, unit_slug_key: "pastoral-care", outcome: "approved" }),
    }));
    expect(res.status).toBe(200);
    const row = await env.DB.prepare("SELECT * FROM audit_decisions WHERE unit_slug_key='pastoral-care'").first();
    expect(row.outcome).toBe("approved");
  });

  it("upserts an issue over a prior approval (changeable, no duplicate)", async () => {
    await seedUnit();
    const r = await seedReviewer();
    const post = (body) => SELF.fetch(new Request("https://x/api/audit/decide", {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
    }));
    await post({ token: r.token, unit_slug_key: "pastoral-care", outcome: "approved" });
    await post({ token: r.token, unit_slug_key: "pastoral-care", outcome: "issue", issue_text: "Wrong phone" });
    const { results } = await env.DB.prepare("SELECT * FROM audit_decisions WHERE unit_slug_key='pastoral-care'").all();
    expect(results.length).toBe(1);
    expect(results[0].outcome).toBe("issue");
    expect(results[0].issue_text).toBe("Wrong phone");
  });

  it("rejects an issue with no text", async () => {
    await seedUnit();
    const r = await seedReviewer();
    const res = await SELF.fetch(new Request("https://x/api/audit/decide", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: r.token, unit_slug_key: "pastoral-care", outcome: "issue" }),
    }));
    expect(res.status).toBe(400);
  });

  it("rejects a bad token", async () => {
    await seedUnit();
    const res = await SELF.fetch(new Request("https://x/api/audit/decide", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: "nope", unit_slug_key: "pastoral-care", outcome: "approved" }),
    }));
    expect(res.status).toBe(401);
  });
});

describe("audit reviewer pages", () => {
  it("landing 404s on a bad token", async () => {
    const res = await SELF.fetch("https://x/audit/bad-token");
    expect(res.status).toBe(404);
  });

  it("shows a flagged unit with Nate's note and both columns", async () => {
    await seedUnit({ note: "Check the phone number" });
    const r = await seedReviewer();
    const res = await SELF.fetch(`https://x/audit/${r.token}/u/pastoral-care`);
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("Pastoral Care");
    expect(body).toContain("Check the phone number");
    expect(body).toContain("Old site wording");
    expect(body).toContain("New site wording");
    expect(body).toContain("Old page text");
    expect(body).toContain("New page text");
  });

  it("a removed unit shows the removed note, not a blank panel", async () => {
    await seedUnit({ slug: "gone", disposition: "removed" });
    await env.DB.prepare("UPDATE audit_units SET new_text=NULL, new_url=NULL WHERE slug_key='gone'").run();
    const r = await seedReviewer();
    const res = await SELF.fetch(`https://x/audit/${r.token}/u/gone`);
    const body = await res.text();
    expect(body).toContain("removed from the new site");
  });

  it("redirects a non-flagged unit back to the landing", async () => {
    await seedUnit({ slug: "cleared-one", state: "cleared" });
    const r = await seedReviewer();
    const res = await SELF.fetch(`https://x/audit/${r.token}/u/cleared-one`, { redirect: "manual" });
    expect(res.status).toBe(302);
  });

  it("excludes non-flagged units from the queue total", async () => {
    await seedUnit({ slug: "flag-a", state: "flagged" });
    await seedUnit({ slug: "clear-b", state: "cleared" });
    await seedUnit({ slug: "pend-c", state: "pending" });
    const r = await seedReviewer();
    const res = await SELF.fetch(`https://x/audit/${r.token}/u/flag-a`);
    const body = await res.text();
    expect(body).toContain("Page 1 of 1");
  });
});

describe("audit admin triage", () => {
  it("flags a unit with the admin key", async () => {
    await seedUnit({ slug: "u1", state: "pending" });
    const res = await SELF.fetch(new Request("https://x/api/audit/triage", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ key: KEY, slug_key: "u1", review_state: "flagged", flag_note: "Look here" }),
    }));
    expect(res.status).toBe(200);
    const u = await env.DB.prepare("SELECT * FROM audit_units WHERE slug_key='u1'").first();
    expect(u.review_state).toBe("flagged");
    expect(u.flag_note).toBe("Look here");
  });

  it("rejects triage without the admin key", async () => {
    await seedUnit({ slug: "u2", state: "pending" });
    const res = await SELF.fetch(new Request("https://x/api/audit/triage", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug_key: "u2", review_state: "flagged" }),
    }));
    expect(res.status).toBe(401);
  });

  it("admin page needs the key", async () => {
    expect((await SELF.fetch("https://x/audit-admin")).status).toBe(401);
    expect((await SELF.fetch(`https://x/audit-admin?key=${KEY}`)).status).toBe(200);
  });

  it("admin page shows reviewer outcomes", async () => {
    await seedUnit({ slug: "u3", state: "flagged" });
    const r = await seedReviewer();
    await SELF.fetch(new Request("https://x/api/audit/decide", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: r.token, unit_slug_key: "u3", outcome: "issue", issue_text: "Date is wrong" }),
    }));
    const res = await SELF.fetch(`https://x/audit-admin?key=${KEY}`);
    const body = await res.text();
    expect(body).toContain("Date is wrong");
  });
});
