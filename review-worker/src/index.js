import * as reviewerHandler from "./handlers/reviewer.js";
import * as submitHandler from "./handlers/submit.js";
import * as adminHandler from "./handlers/admin.js";
import * as finalizeHandler from "./handlers/finalize.js";
import * as decisionHandler from "./handlers/decision.js";
import * as reviewerMgmtHandler from "./handlers/reviewer_mgmt.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    try {
      if (method === "GET" && path === "/") {
        return new Response("All Saints Review — alive", {
          status: 200,
          headers: { "content-type": "text/plain; charset=utf-8" },
        });
      }

      if (method === "GET" && path.startsWith("/r/")) {
        const token = path.slice("/r/".length);
        return await reviewerHandler.handle(request, env, token);
      }

      if (method === "POST" && path === "/api/submit") {
        return await submitHandler.handle(request, env);
      }

      if (method === "GET" && path === "/admin") {
        return await adminHandler.handle(request, env, url);
      }

      if (method === "POST" && path === "/api/finalize") {
        return await finalizeHandler.handle(request, env);
      }

      if (method === "POST" && path === "/api/decision") {
        return await decisionHandler.handle(request, env);
      }

      if (method === "POST" && path === "/api/decisions/bulk") {
        return await decisionHandler.handleBulk(request, env);
      }

      if (method === "POST" && path === "/api/reviewer") {
        return await reviewerMgmtHandler.handle(request, env);
      }

      if (method === "POST" && path === "/api/reviewer/regenerate") {
        return await reviewerMgmtHandler.handleRegenerate(request, env);
      }

      return new Response("Not Found", { status: 404 });
    } catch (err) {
      return new Response("Server error: " + err.message, { status: 500 });
    }
  },
};
