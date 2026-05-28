import SHOWCASE_HTML from './showcase.html';
import STYLEGUIDE_HTML from './styleguide.html';
import V1_HTML from './v1.html';
import V1_VISIT_HTML from './v1-visit.html';
import V1_HAPPENINGS_HTML from './v1-happenings.html';
import V1_CONNECT_HTML from './v1-connect.html';
import V2_HTML from './v2.html';
import V3_HTML from './v3.html';
import FINAL_HTML from './final.html';

import * as reviewHandler from './review/handlers/reviewer.js';
import * as submitHandler from './review/handlers/submit.js';
import * as adminHandler from './review/handlers/admin.js';
import * as finalizeHandler from './review/handlers/finalize.js';
import * as decisionHandler from './review/handlers/decision.js';
import * as reviewerMgmtHandler from './review/handlers/reviewer_mgmt.js';

function html(content) {
  return new Response(content, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // ---- Content Approval Pipeline routes ----
    try {
      if (path.startsWith('/r/') && method === 'GET') {
        return await reviewHandler.handle(request, env, path.slice('/r/'.length));
      }
      if (path === '/api/submit' && method === 'POST') {
        return await submitHandler.handle(request, env);
      }
      if (path === '/admin' && method === 'GET') {
        return await adminHandler.handle(request, env, url);
      }
      if (path === '/api/finalize' && method === 'POST') {
        return await finalizeHandler.handle(request, env);
      }
      if (path === '/api/decision' && method === 'POST') {
        return await decisionHandler.handle(request, env);
      }
      if (path === '/api/decisions/bulk' && method === 'POST') {
        return await decisionHandler.handleBulk(request, env);
      }
      if (path === '/api/reviewer' && method === 'POST') {
        return await reviewerMgmtHandler.handle(request, env);
      }
      if (path === '/api/reviewer/regenerate' && method === 'POST') {
        return await reviewerMgmtHandler.handleRegenerate(request, env);
      }
    } catch (err) {
      console.error('review handler error', err);
      return new Response('Server error: ' + err.message, { status: 500 });
    }

    // Main showcase page
    if (path === '/' || path === '/showcase') {
      return html(SHOWCASE_HTML);
    }

    // Styleguide / visual comparison
    if (path === '/styleguide' || path === '/styleguide/' || path === '/compare' || path === '/compare/') {
      return html(STYLEGUIDE_HTML);
    }

    // Option 1 (v1) - multi-page
    if (path === '/v1' || path === '/v1/') {
      return html(V1_HTML);
    }
    if (path === '/v1/visit' || path === '/v1/visit.html') {
      return html(V1_VISIT_HTML);
    }
    if (path === '/v1/happenings' || path === '/v1/happenings.html') {
      return html(V1_HAPPENINGS_HTML);
    }
    if (path === '/v1/connect' || path === '/v1/connect.html') {
      return html(V1_CONNECT_HTML);
    }

    // Option 2 (v2) - single page
    if (path === '/v2' || path === '/v2/') {
      return html(V2_HTML);
    }

    // Option 3 (v3) - single page
    if (path === '/v3' || path === '/v3/') {
      return html(V3_HTML);
    }

    // Final — migration-ready refinement of Option 3
    if (path === '/final' || path === '/final/') {
      return html(FINAL_HTML);
    }

    // Not a known route — return 404
    return new Response('Not found', { status: 404 });
  },
};
