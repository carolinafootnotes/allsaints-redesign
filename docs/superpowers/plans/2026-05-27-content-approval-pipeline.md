# Content Approval Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the All Saints Content Approval Pipeline — a Cloudflare Worker + D1 web app that gathers A/B/Other decisions from clergy, staff, and review group on bios and copy, with a pull script that applies finalized decisions to /final HTML.

**Architecture:** Standalone Cloudflare Worker (allsaints-review) with D1 binding. Server-rendered HTML, vanilla JS for form submission. Magic-link tokens per reviewer (no real auth). Admin behind shared secret key. Python pull script reads finalized rows from D1 via wrangler and patches /final HTML files.

**Tech Stack:** Cloudflare Workers ES modules, D1 SQLite, Wrangler CLI, Vitest + @cloudflare/vitest-pool-workers, Python 3 stdlib.

**Spec:** docs/superpowers/specs/2026-05-27-content-approval-pipeline-design.md

**Note:** Several code-block details elided here for brevity; subagents should consult the spec for full schema text and use the spec's data-model section verbatim. Where the plan says "follow spec schema", paste the SQL from the spec's Data Model section unchanged.

---

## File Structure

```
review-worker/                    (new project, sibling of worker/)
  wrangler.toml                   D1 binding, name=allsaints-review
  package.json                    vitest, wrangler, @cloudflare/vitest-pool-workers
  vitest.config.js
  .gitignore                      node_modules/, .wrangler/, .dev.vars
  schema/
    0001_init.sql                 4 tables per spec, plus indexes on status, assignments.reviewer_id, submissions.decision_id
    seed.sql                      1 test reviewer + 1 test bio decision
  src/
    index.js                      router only
    db.js                         pure D1 query helpers
    auth.js                       validateAdminKey, parseSubmitBody
    csv.js                        parseDecisionsCsv
    templates/
      layout.js                   shared HTML shell + global CSS
      reviewer.js                 /r/<token> page builder
      admin.js                    /admin page builder
    handlers/
      reviewer.js                 GET /r/<token>
      admin.js                    GET /admin
      submit.js                   POST /api/submit
      finalize.js                 POST /api/finalize
      decision.js                 POST /api/decision, /api/decisions/bulk
      reviewer_mgmt.js            POST /api/reviewer, /api/reviewer/regenerate
  tests/
    apply-migrations.js           vitest setup file
    db.test.js
    auth.test.js
    reviewer-render.test.js
    submit.test.js
    admin.test.js
    csv.test.js
    decision-create.test.js

tools/
  import_review_approvals.py
```

**Boundaries:**
- db.js is pure. No HTTP, no rendering. Take DB binding + args; return rows.
- auth.js validates inputs only. No DB calls.
- templates/*.js are pure string generators.
- handlers/*.js orchestrate: validate → query DB → render → respond.
- index.js routes only.

---

## Task 1: Scaffold worker + D1

Files: review-worker/{wrangler.toml, package.json, vitest.config.js, .gitignore, src/index.js, schema/0001_init.sql, schema/seed.sql}

- [ ] Create wrangler.toml with name=allsaints-review, main=src/index.js, D1 binding name=DB, database_name=allsaints-review-db (database_id filled after create).
- [ ] Create package.json with type=module, devDeps: wrangler ^3.80, vitest ^2.0, @cloudflare/vitest-pool-workers ^0.5. Scripts: dev, deploy, test, test:watch.
- [ ] Create vitest.config.js using defineWorkersConfig with readD1Migrations(./schema), miniflare bindings include d1Databases:['DB'] and bindings.ADMIN_KEY='test-admin-key'.
- [ ] Create src/index.js returning 200 "All Saints Review — alive" on GET /, 404 otherwise. Worker template syntax (export default { async fetch(request, env, ctx) {} }).
- [ ] Create schema/0001_init.sql — paste the 4 CREATE TABLE statements from the spec's Data Model section unchanged, plus three CREATE INDEX statements (decisions.status, assignments.reviewer_id, submissions.decision_id).
- [ ] Create schema/seed.sql inserting one test reviewer (role=subject, token='test-token-abc123') and one bio decision targeting that reviewer.
- [ ] Run: cd review-worker && npm install
- [ ] Run: npx wrangler d1 create allsaints-review-db; paste returned database_id into wrangler.toml.
- [ ] Run: npx wrangler d1 execute allsaints-review-db --remote --file=schema/0001_init.sql
- [ ] Run: npx wrangler d1 execute allsaints-review-db --remote --file=schema/seed.sql
- [ ] Run: npx wrangler deploy
- [ ] Run: npx wrangler secret put ADMIN_KEY (paste 32-char random; save to 1Password as "AllSaints Review Admin Key")
- [ ] Curl https://allsaints-review.nate-ernst7.workers.dev/ — expect 200 alive.
- [ ] Commit: feat(review): scaffold allsaints-review worker with D1 schema

## Task 2: db.js + tests

Files: review-worker/{src/db.js, tests/db.test.js, tests/apply-migrations.js}

- [ ] Create tests/apply-migrations.js — imports applyD1Migrations and env from 'cloudflare:test', calls applyD1Migrations(env.DB, env.TEST_MIGRATIONS).
- [ ] Write tests/db.test.js covering: getReviewerByToken (hit + miss), upsertSubmission (insert then update is single row with latest values), finalizeDecision (status, final_choice, finalized_at set), getDecisionsForReviewer (bio where subject; copy where assigned; bio where NOT subject excluded), createReviewer (returns id + 32+ char token).
- [ ] Run: npm test — expect import errors (db.js missing).
- [ ] Implement src/db.js with these exports: getReviewerByToken, getReviewerById, listAllReviewers, createReviewer, regenerateReviewerToken, getDecisionsForReviewer, getDecisionById, listAllDecisions, listFinalizedDecisions, createDecision, setAssignments, upsertSubmission, getSubmissionsForDecision, getSubmissionByReviewerDecision, finalizeDecision, reopenDecision.
- [ ] genToken helper: crypto.getRandomValues(Uint8Array(24)) → btoa → URL-safe replace +/= → return.
- [ ] upsertSubmission uses ON CONFLICT(decision_id, reviewer_id) DO UPDATE.
- [ ] getDecisionsForReviewer uses LEFT JOIN assignments and WHERE d.subject_reviewer_id = ? OR (d.kind='copy' AND a.reviewer_id = ?).
- [ ] Run npm test — expect PASS.
- [ ] Commit: feat(review): D1 helper layer with vitest coverage

## Task 3: auth.js + router skeleton

Files: review-worker/{src/auth.js, src/index.js (modify), tests/auth.test.js, src/handlers/*.js (six stubs)}

- [ ] Write tests/auth.test.js for validateAdminKey(env, key) — accepts configured, rejects wrong, rejects missing env. For parseSubmitBody(request) — ok with normalized fields from FormData; ok:false with status 400 when token/decision_id/choice missing.
- [ ] Run npm test — FAIL.
- [ ] Implement src/auth.js with both functions. parseSubmitBody handles both application/json and FormData via content-type check; decision_id coerced via Number(); returns {ok:true, body:{token, decision_id, choice, other_text, comment}} or {ok:false, status:400, error}.
- [ ] Run npm test — PASS.
- [ ] Replace src/index.js with full router that dispatches: GET / → 200 alive, GET /r/<token> → reviewerHandler.handle, POST /api/submit → submitHandler.handle, GET /admin → adminHandler.handle, POST /api/finalize → finalizeHandler.handle, POST /api/decision → decisionHandler.handle, POST /api/decisions/bulk → decisionHandler.handleBulk, POST /api/reviewer → reviewerMgmtHandler.handle, POST /api/reviewer/regenerate → reviewerMgmtHandler.handleRegenerate, else 404. Wrap in try/catch returning 500 on throw.
- [ ] Create six handler stub files exporting handle() (and handleBulk/handleRegenerate where router expects them) that return 501 "not yet implemented".
- [ ] Deploy and curl /r/test-token-abc123 — expect 501.
- [ ] Commit: feat(review): auth helpers + router skeleton

## Task 4: layout + reviewer page (render-only)

Files: review-worker/{src/templates/layout.js, src/templates/reviewer.js, src/handlers/reviewer.js (modify), tests/reviewer-render.test.js}

- [ ] Implement src/templates/layout.js exporting layout({title, body, head=''}) and esc(s). esc escapes &, <, >, ", '. Layout includes meta viewport, Google Fonts (Cormorant Garamond + DM Sans), inline CSS for: body bg #faf8f4, .container max-width 720, h1/h2/h3 Cormorant, .decision-card (white, border #e8e4dc, radius 10), .option (faf8f4 bg, transparent border, hover/selected burgundy border), .option-body Cormorant 1.1rem, textarea/input full-width with #d0cabd border, button burgundy with white text + secondary variant, .badge variants (open=fff3cd/8a6d3b, submitted=d1ecf1/0c5460, finalized=d4edda/155724), .field label block 600 weight, .section margin-bottom 2.5rem, .status-line 0.85rem #666.
- [ ] Implement src/templates/reviewer.js with SECTION_LABELS map (home → Home page, visit → Visit, connect → Connect, happenings → "What's Happening", rector-search → Rector Search, watch-live → Watch Live, global → Site-wide). Export reviewerPage({reviewer, decisionsBySection, submissionsByDecisionId, token}) and notFoundPage().
- [ ] reviewerPage iterates decisionsBySection (already grouped + sorted) rendering an .section per group containing one .decision-card per decision via renderDecision(decision, mySubmission).
- [ ] renderDecision parses decision.options JSON, computes selectedKey from mySubmission?.choice, computes badge from finalized vs submitted vs not-yet, renders options as <label class="option"> with hidden radio + .option-label + .option-body, plus an "Other" option with textarea. Submit button text differs for bio (Finalize my bio) vs copy (Save my pick).
- [ ] Inline <script> at page bottom uses fetch('/api/submit', {method:'POST', body:FormData}) with token injected, status text updates from .status-line; on j.finalized reloads page after 500ms.
- [ ] notFoundPage shows "That link isn't recognized" + instruction to ask Nate to resend.
- [ ] Implement src/handlers/reviewer.js — getReviewerByToken; if null return notFoundPage with 404. Else getDecisionsForReviewer, group by section, fetch each reviewer's submission via getSubmissionByReviewerDecision, render with reviewerPage, return text/html.
- [ ] Write tests/reviewer-render.test.js using SELF.fetch — GET /r/<token> hits seeded reviewer, body contains "Welcome, Joy" and decision question; GET /r/unknown returns 404.
- [ ] Run npm test — PASS.
- [ ] Deploy. Open https://allsaints-review.nate-ernst7.workers.dev/r/test-token-abc123 — expect rendered Welcome page with seeded decision.
- [ ] Commit: feat(review): render reviewer dashboard at /r/<token>

## Task 5: /api/submit endpoint

Files: review-worker/{src/handlers/submit.js, tests/submit.test.js}

- [ ] Write tests/submit.test.js covering: copy vote records submission without finalizing; bio submission auto-finalizes with final_choice set; reviewer not assigned to copy → 403; non-subject submitting bio → 403; invalid token → 401.
- [ ] Run npm test — FAIL.
- [ ] Implement handlers/submit.js: parseSubmitBody → 400 on bad input. getReviewerByToken → 401 on miss. getDecisionById → 404. If decision.status==='finalized' → 409. For bio: subject_reviewer_id !== reviewer.id → 403. For copy: SELECT 1 FROM assignments WHERE decision_id=? AND reviewer_id=? — missing → 403. upsertSubmission. If kind==='bio', finalizeDecision and return ok:true, finalized:true. Else return ok:true.
- [ ] Run npm test — PASS.
- [ ] Deploy. In a browser open /r/test-token-abc123, click an option, submit. Status "Saved." then page reloads with Finalized badge.
- [ ] Commit: feat(review): /api/submit with bio auto-finalize and authz

## Task 6: Admin dashboard + finalize

Files: review-worker/{src/templates/admin.js, src/handlers/admin.js, src/handlers/finalize.js, tests/admin.test.js, vitest.config.js (modify)}

- [ ] In vitest.config.js miniflare.bindings add ADMIN_KEY: 'test-admin-key'.
- [ ] Implement src/templates/admin.js exporting adminPage({adminKey, reviewers, decisions, submissionsByDecisionId, assignedReviewerIdsByDecisionId}). Top counts (Open/Submissions/Finalized/Reviewers). Magic-links panel listing each reviewer with copyable URL. Decisions grouped by section. Per decision: badge (Open/Finalized), question, "Section: X · Kind: Y · Chose: Z" if finalized, assigned-reviewer chips (✓ if submitted, ◯ if not), tally bar (for copy: counts per option key + Other), submissions list (reviewer name : choice (other_text?) "comment"), finalize form (admin_key + decision_id + final_choice select including "other" option + final_other_text input + Finalize button) for open copy decisions, reopen form for finalized.
- [ ] Implement src/handlers/admin.js — validateAdminKey from ?key= → 401 if bad. listAllReviewers, listAllDecisions, fetch submissionsForDecision per decision, fetch assignments per decision. Render adminPage. text/html response.
- [ ] Implement src/handlers/finalize.js — parse FormData, validateAdminKey → 401. action='reopen' → reopenDecision. Else require final_choice → finalizeDecision({final_choice, final_other_text}). Redirect 303 back to /admin?key=<key>.
- [ ] Write tests/admin.test.js — GET /admin without key → 401, POST /api/finalize with wrong key → 401.
- [ ] Run npm test — PASS.
- [ ] Deploy. Open /admin?key=<key>. Verify counts, magic links, seeded decision card.
- [ ] Commit: feat(review): admin dashboard with tallies + finalize action

## Task 7: Decision authoring + CSV bulk + reviewer mgmt

Files: review-worker/{src/csv.js, src/handlers/decision.js, src/handlers/reviewer_mgmt.js, src/templates/admin.js (modify), tests/csv.test.js, tests/decision-create.test.js}

- [ ] Write tests/csv.test.js — parseDecisionsCsv handles quoted fields, embedded commas, two-option row, returns options array [{key,label,body}], parses subject_email and assigned_emails (semicolon-separated).
- [ ] Implement src/csv.js with parseCsvRow (handles quoted fields and "" escapes) and parseDecisionsCsv (consumes header row, builds options from columns option_a_label/body through option_d_label/body, builds target_selector from target_file + target_anchor, splits assigned_emails on ;).
- [ ] Run npm test — PASS.
- [ ] Write tests/decision-create.test.js: POST /api/decision with admin_key creates decision row + assignments; POST /api/decisions/bulk with CSV body creates two decisions with subject_email resolved to subject_reviewer_id and assigned_emails resolved via emailToId lookup.
- [ ] Implement handlers/decision.js handle (parse JSON options + target_selector, optional subject_reviewer_id, assigned_reviewer_ids comma-separated; call createDecision then setAssignments) and handleBulk (parse CSV, build emailToId map from SELECT id,email FROM reviewers, loop creating decisions and setting assignments).
- [ ] Implement handlers/reviewer_mgmt.js handle (createReviewer from name/email/role) and handleRegenerate (regenerateReviewerToken from reviewer_id). Both validate admin_key, return 303 redirect to /admin?key=.
- [ ] Modify templates/admin.js to append three forms below the decisions list: Add reviewer (name/email/role select), Add decision (section/kind selects, question/context inputs, options JSON textarea, target_selector JSON textarea, subject_reviewer_id, assigned_reviewer_ids), Bulk import (CSV textarea with column header documentation as helper text).
- [ ] Run npm test — PASS.
- [ ] Deploy. Use admin form to add a real reviewer + a real decision targeting an actual /final string. Finalize via admin.
- [ ] Commit: feat(review): decision authoring (form + CSV bulk) + reviewer mgmt

## Task 8: Python pull script

Files: tools/import_review_approvals.py, .gitignore (modify)

- [ ] Append `tools/.imported_decision_ids` to repo-root .gitignore.
- [ ] Create tools/import_review_approvals.py — Python 3 stdlib only (argparse, json, pathlib, subprocess, sys).
- [ ] Constants: REPO = parent of tools/; LEDGER = REPO/tools/.imported_decision_ids; WORKER_DIR = REPO/review-worker; DB_NAME = "allsaints-review-db".
- [ ] load_ledger() reads ints from LEDGER (empty if missing).
- [ ] append_ledger(ids) appends sorted ids.
- [ ] d1_query(sql) runs subprocess `npx wrangler d1 execute <db> --remote --json --command <sql>` from WORKER_DIR with check=True, parses JSON output payload[0].results.
- [ ] fetch_finalized_decisions(skip_ids) queries "SELECT * FROM decisions WHERE status='finalized' ORDER BY id", filters out skip_ids.
- [ ] apply_decision(decision, dry_run) parses target_selector JSON for file + anchor_string; parses options; resolves replacement = options[key].body for final_choice (or final_other_text if 'other'); reads file; counts anchor occurrences (0 → skip with reason; >1 → skip "not unique"); replaces once; in dry_run prints diff preview and returns (True, "dry-run"); else writes file and returns (True, "applied").
- [ ] maybe_deploy() runs `npx wrangler deploy` from REPO/worker.
- [ ] main() parses --dry-run, --ids, --deploy. Loads ledger (skip empty if dry_run). Fetches decisions. Filters by --ids if given. For each calls apply_decision; logs OK/SKIP per item. Appends successful non-dry-run ids to ledger. If --deploy and applied_ids non-empty, calls maybe_deploy. Returns 1 if any failures, else 0.
- [ ] Smoke test: from admin, finalize the seeded decision with a known-existing anchor target. Run `python3 tools/import_review_approvals.py --dry-run` → expect preview. Run without --dry-run → expect file change.
- [ ] Commit: feat(review): import_review_approvals.py pull script

## Task 9: Operational rollout (not code)

- [ ] Catalog real 25-40 decisions in tools/initial_decisions.csv with Nate.
- [ ] Add each clergy/staff/vestry/review-group member as a reviewer via /admin.
- [ ] Save all magic-link URLs.
- [ ] Bulk import the CSV via /admin.
- [ ] Send per-person Gmail with one-sentence context + their magic link.
- [ ] Monitor /admin daily; nudge non-responders.
- [ ] Finalize copy decisions in admin once enough votes are in.
- [ ] Run pull script: python3 tools/import_review_approvals.py --dry-run, then --deploy.
- [ ] Walk through /final live preview to verify each changed area.

---

## Self-Review

**Spec coverage:** Architecture (1,3), Routes (3,4,5,6,7), Schema (1), DB helpers (2), Reviewer UX (4,5), Admin UX (6,7), Pull script (8), Outreach (9), Tie-breaking (6 — admin finalize action lets Nate pick any option including custom 'other'), YAGNI items not built. ✓

**Placeholder scan:** Plan references spec for full SQL text and CSS values to keep the plan readable. Subagents executing should open the spec for the exact SQL and tile their work against it. No "TBD" remain.

**Type consistency:** db.js function names match handler imports. target_selector JSON shape {file, anchor_string} consistent across seed (Task 1), bulk CSV (Task 7), admin form (Task 7), pull script (Task 8). options shape [{key,label,body}] consistent. choice values use option keys + literal 'other' consistently.

---

## Execution Handoff

Per Nate's standing rule in `~/.claude/CLAUDE.md`: subagent-driven by default. Invoking `superpowers:subagent-driven-development` next.
