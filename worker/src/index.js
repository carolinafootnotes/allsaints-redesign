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
import * as pagesReviewer from './review/handlers/pages_reviewer.js';
import * as pagesApi from './review/handlers/pages_api.js';
import * as pagesAdmin from './review/handlers/pages_admin.js';
import * as triageHandler from './review/handlers/triage.js';
import * as auditHandler from './review/handlers/audit.js';

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

      // ---- Phase 3 v2: page-based review flow ----
      if (path.startsWith('/r2/') && method === 'GET') {
        const rest = path.slice('/r2/'.length);
        const parts = rest.split('/');
        const token = parts[0];
        if (!token) return new Response('Not found', { status: 404 });
        if (parts.length === 1) {
          return await pagesReviewer.handleDashboard(request, env, token);
        }
        if (parts[1] === 'p' && parts[2]) {
          return await pagesReviewer.handlePage(request, env, token, parts[2]);
        }
        return new Response('Not found', { status: 404 });
      }
      if (path === '/api/p/interstitial' && method === 'POST') {
        return await pagesApi.handleInterstitial(request, env);
      }
      if (path === '/api/p/submit' && method === 'POST') {
        return await pagesApi.handleSubmit(request, env);
      }
      if (path === '/api/p/flag' && method === 'POST') {
        return await pagesApi.handleFlag(request, env);
      }
      if (path === '/api/p/signoff' && method === 'POST') {
        return await pagesApi.handleSignoff(request, env);
      }
      if (path === '/admin/pages' && method === 'GET') {
        return await pagesAdmin.handlePagesRegistry(request, env, url);
      }
      if (path.startsWith('/admin/pages/') && method === 'GET') {
        const slug = path.slice('/admin/pages/'.length);
        return await pagesAdmin.handlePageEditor(request, env, url, slug);
      }
      if (path === '/admin/flags' && method === 'GET') {
        return await pagesAdmin.handleFlagsDashboard(request, env, url);
      }
      if (path === '/admin/audit' && method === 'GET') {
        return await pagesAdmin.handleSignoffAudit(request, env, url);
      }
      if (path === '/admin/onboarding-email' && method === 'GET') {
        return await pagesAdmin.handleOnboardingEmail(request, env, url);
      }
      if (path.startsWith('/admin/brief/') && method === 'GET') {
        const slug = path.slice('/admin/brief/'.length);
        return await pagesAdmin.handleBuildBrief(request, env, url, slug);
      }
      if (path === '/api/p/page' && method === 'POST') {
        return await pagesAdmin.handleCreatePage(request, env);
      }
      if (path === '/api/p/page/status' && method === 'POST') {
        return await pagesAdmin.handlePageStatus(request, env);
      }
      if (path === '/api/p/page/assign' && method === 'POST') {
        return await pagesAdmin.handleAssign(request, env);
      }
      if (path === '/api/p/block' && method === 'POST') {
        return await pagesAdmin.handleCreateBlock(request, env);
      }
      if (path === '/api/p/block/delete' && method === 'POST') {
        return await pagesAdmin.handleDeleteBlock(request, env);
      }
      if (path === '/api/p/flag/update' && method === 'POST') {
        return await pagesAdmin.handleFlagUpdate(request, env);
      }

      // ---- Phase 4: WP content triage ----
      if (path.startsWith('/t/') && method === 'GET') {
        const token = path.slice('/t/'.length).split('/')[0];
        if (!token) return new Response('Not found', { status: 404 });
        return await triageHandler.handleReviewer(request, env, token);
      }
      if (path === '/api/triage' && method === 'POST') {
        return await triageHandler.handleApi(request, env);
      }
      if (path === '/triage-admin' && method === 'GET') {
        return await triageHandler.handleAdmin(request, env, url);
      }
      if (path === '/api/triage/export' && method === 'GET') {
        return await triageHandler.handleExport(request, env, url);
      }
      if (path === '/api/triage/seed' && method === 'POST') {
        return await triageHandler.handleSeed(request, env, url);
      }

      // ---- Phase 5: content audit (before/after copy accuracy review) ----
      if (path.startsWith('/audit/') && method === 'GET') {
        const rest = path.slice('/audit/'.length);
        const parts = rest.split('/');
        const token = parts[0];
        if (!token) return new Response('Not found', { status: 404 });
        if (parts.length === 1 || (parts.length === 2 && parts[1] === '')) {
          return await auditHandler.handleLanding(request, env, token);
        }
        if (parts[1] === 'u' && parts[2]) {
          return await auditHandler.handleUnit(request, env, token, decodeURIComponent(parts[2]));
        }
        return new Response('Not found', { status: 404 });
      }
      if (path === '/api/audit/decide' && method === 'POST') {
        return await auditHandler.handleDecide(request, env);
      }
      if (path === '/api/audit/triage' && method === 'POST') {
        return await auditHandler.handleTriage(request, env);
      }
      if (path === '/audit-admin' && method === 'GET') {
        return await auditHandler.handleAdmin(request, env, url);
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
