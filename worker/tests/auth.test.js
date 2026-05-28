import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { validateAdminKey, parseSubmitBody } from '../src/review/auth.js';

describe("validateAdminKey", () => {
  it("accepts the configured admin key", () => {
    expect(validateAdminKey(env, "test-admin-key")).toBe(true);
  });

  it("rejects a wrong key", () => {
    expect(validateAdminKey(env, "wrong-key")).toBe(false);
  });

  it("rejects a missing key", () => {
    expect(validateAdminKey(env, undefined)).toBe(false);
    expect(validateAdminKey(env, null)).toBe(false);
    expect(validateAdminKey(env, "")).toBe(false);
  });

  it("rejects when env has no ADMIN_KEY configured", () => {
    expect(validateAdminKey({}, "test-admin-key")).toBe(false);
  });
});

function formDataRequest(fields) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined) fd.append(k, v);
  }
  return new Request("https://example.com/api/submit", {
    method: "POST",
    body: fd,
  });
}

describe("parseSubmitBody", () => {
  it("ok with normalized fields from FormData", async () => {
    const req = formDataRequest({
      token: "abc123",
      decision_id: "42",
      choice: "a",
      comment: "looks good",
    });
    const result = await parseSubmitBody(req);
    expect(result.ok).toBe(true);
    expect(result.body).toEqual({
      token: "abc123",
      decision_id: 42,
      choice: "a",
      other_text: null,
      comment: "looks good",
    });
  });

  it("preserves other_text when provided", async () => {
    const req = formDataRequest({
      token: "tok",
      decision_id: "7",
      choice: "other",
      other_text: "custom thing",
      comment: "",
    });
    const result = await parseSubmitBody(req);
    expect(result.ok).toBe(true);
    expect(result.body.other_text).toBe("custom thing");
    expect(result.body.decision_id).toBe(7);
  });

  it("returns ok:false with status 400 when token missing", async () => {
    const req = formDataRequest({
      decision_id: "1",
      choice: "a",
    });
    const result = await parseSubmitBody(req);
    expect(result.ok).toBe(false);
    expect(result.status).toBe(400);
  });

  it("returns ok:false with status 400 when decision_id missing", async () => {
    const req = formDataRequest({
      token: "tok",
      choice: "a",
    });
    const result = await parseSubmitBody(req);
    expect(result.ok).toBe(false);
    expect(result.status).toBe(400);
  });

  it("returns ok:false with status 400 when choice missing", async () => {
    const req = formDataRequest({
      token: "tok",
      decision_id: "1",
    });
    const result = await parseSubmitBody(req);
    expect(result.ok).toBe(false);
    expect(result.status).toBe(400);
  });

  it("accepts application/json bodies", async () => {
    const req = new Request("https://example.com/api/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        token: "jsontok",
        decision_id: "13",
        choice: "b",
        comment: "via json",
      }),
    });
    const result = await parseSubmitBody(req);
    expect(result.ok).toBe(true);
    expect(result.body).toEqual({
      token: "jsontok",
      decision_id: 13,
      choice: "b",
      other_text: null,
      comment: "via json",
    });
  });
});
