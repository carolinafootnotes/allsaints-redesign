import { env, SELF } from "cloudflare:test";
import { beforeEach, describe, expect, it } from "vitest";

beforeEach(async () => {
  await env.DB.exec("DELETE FROM submissions; DELETE FROM assignments; DELETE FROM decisions; DELETE FROM reviewers;");
});

describe("GET /r/:token render", () => {
  it("renders welcome, question, and an option label for an assigned reviewer", async () => {
    await env.DB.prepare(
      "INSERT INTO reviewers (name, email, token, role) VALUES (?1, ?2, ?3, ?4)",
    )
      .bind("Joy", "joy@example.com", "tkn-joy", "group")
      .run();
    const r = await env.DB.prepare("SELECT id FROM reviewers WHERE token = ?1").bind("tkn-joy").first();

    await env.DB.prepare(
      `INSERT INTO decisions (section, kind, question, context, options, target_selector)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)`,
    )
      .bind(
        "home",
        "copy",
        "Which hero subtitle?",
        "Shown beneath the hero image",
        JSON.stringify([
          { key: "a", label: "Option A", body: "A Jesus Movement of love and welcome" },
          { key: "b", label: "Option B", body: "A place to belong" },
        ]),
        JSON.stringify({ file: "index.html", anchor_string: "hero" }),
      )
      .run();
    const d = await env.DB.prepare("SELECT id FROM decisions WHERE section = 'home'").first();

    await env.DB.prepare("INSERT INTO assignments (decision_id, reviewer_id) VALUES (?1, ?2)")
      .bind(d.id, r.id)
      .run();

    const res = await SELF.fetch("https://example.com/r/tkn-joy");
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("Welcome, Joy");
    expect(body).toContain("Which hero subtitle?");
    expect(body).toContain("Option A");
  });

  it("returns 404 for an unknown token", async () => {
    const res = await SELF.fetch("https://example.com/r/nope");
    expect(res.status).toBe(404);
  });
});
