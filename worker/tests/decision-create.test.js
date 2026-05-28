import { env, SELF } from "cloudflare:test";
import { beforeEach, describe, expect, it } from "vitest";
import { createReviewer } from '../src/review/db.js';

beforeEach(async () => {
  await env.DB.exec("DELETE FROM submissions; DELETE FROM assignments; DELETE FROM decisions; DELETE FROM reviewers;");
});

function formRequest(url, fields) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined && v !== null) fd.append(k, String(v));
  }
  return new Request(url, { method: "POST", body: fd });
}

describe("/api/decision", () => {
  it("creates decision and assignments", async () => {
    const joy = await createReviewer(env.DB, { name: "Joy", email: "joy@a.com", role: "group" });

    const res = await SELF.fetch(
      formRequest("https://example.com/api/decision", {
        admin_key: "test-admin-key",
        section: "home",
        kind: "copy",
        question: "Welcome paragraph?",
        options: JSON.stringify([
          { key: "A", label: "Cur", body: "A text" },
          { key: "B", label: "New", body: "B text" },
        ]),
        target_selector: JSON.stringify({
          file: "worker/public/final/index.html",
          anchor_string: "At All Saints",
        }),
        assigned_reviewer_ids: String(joy.id),
      }),
      { redirect: "manual" },
    );
    expect(res.status).toBe(303);

    const d = await env.DB.prepare("SELECT * FROM decisions").first();
    expect(d).toBeTruthy();
    expect(d.question).toBe("Welcome paragraph?");

    const a = await env.DB.prepare("SELECT * FROM assignments WHERE decision_id = ?1 AND reviewer_id = ?2")
      .bind(d.id, joy.id)
      .first();
    expect(a).toBeTruthy();
  });
});

describe("/api/decisions/bulk", () => {
  it("imports CSV, resolves emails to reviewer ids", async () => {
    const john = await createReviewer(env.DB, { name: "John", email: "john@a.com", role: "subject" });
    const joy = await createReviewer(env.DB, { name: "Joy", email: "joy@a.com", role: "group" });

    const csv = [
      "section,kind,question,context,option_a_label,option_a_body,option_b_label,option_b_body,target_file,target_anchor,subject_email,assigned_emails",
      'connect,bio,"John bio?",,Current,"Bio A",Alternate,"Bio B",worker/public/final/connect.html,"John Smith",john@a.com,',
      'home,copy,"Welcome?",,Cur,"A",New,"B",worker/public/final/index.html,"At All Saints",,joy@a.com',
    ].join("\n");

    const res = await SELF.fetch(
      formRequest("https://example.com/api/decisions/bulk", {
        admin_key: "test-admin-key",
        csv,
      }),
      { redirect: "manual" },
    );
    expect(res.status).toBe(303);

    const { results: decisions } = await env.DB.prepare("SELECT * FROM decisions ORDER BY id").all();
    expect(decisions.length).toBe(2);

    const bio = decisions.find((d) => d.kind === "bio");
    expect(bio.subject_reviewer_id).toBe(john.id);

    const copy = decisions.find((d) => d.kind === "copy");
    const a = await env.DB.prepare("SELECT * FROM assignments WHERE decision_id = ?1 AND reviewer_id = ?2")
      .bind(copy.id, joy.id)
      .first();
    expect(a).toBeTruthy();
  });
});
