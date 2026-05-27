# Content Approval Pipeline — Design

**Date:** 2026-05-27
**Status:** Approved (verbal, Nate)
**Owner:** Nate (decisions), Claude (build)
**Target:** Operational by mid-June 2026; retired or repurposed after July Squarespace cutover

## Purpose

Gather A/B/Other decisions from clergy, staff, vestry, and the review group on bios and contested copy for the All Saints' website (`/final`), before the Squarespace cutover. Removes Nate from being the bottleneck on every copy choice and distributes editorial ownership to the people the copy is about.

## Scope

- **In scope:** Bio decisions (each clergy/staff/vestry member chooses their own) and contested copy decisions (review group votes, majority wins, Nate breaks ties).
- **Out of scope:** Visual/design decisions, photo selection, layout choices, post-cutover reuse for newsletter polls, real auth, email sending, audit logging beyond timestamps, analytics.
- **Expected volume:** ~25-40 decisions total. ~9 reviewers.

## Architecture

New Cloudflare Worker at `allsaints-review.nate-ernst7.workers.dev` with a D1 binding. Server-rendered static HTML, vanilla JS for form submission. Same typography as `/final` (Cormorant Garamond + DM Sans) so proposed copy renders in situ.

### Routes

| Route | Method | Purpose |
|---|---|---|
| `/r/<token>` | GET | Reviewer's scoped dashboard. Shows all decisions assigned to them, current submitted state, ability to save/change picks. |
| `/api/submit` | POST | Body: `{token, decision_id, choice, other_text?, comment?}`. UPSERTs into `submissions`. Auto-finalizes if bio. |
| `/admin?key=<adminkey>` | GET | Nate's view. Decision list grouped by section, tallies, finalize actions, decision authoring, reviewer management. |
| `/api/finalize` | POST | Body: `{key, decision_id, final_choice, final_other_text?}`. Flips decision to `finalized`. |
| `/api/decision` | POST | Body: `{key, ...decision fields}`. Creates a new decision. |
| `/api/decisions/bulk` | POST | Body: `{key, csv}`. Bulk-create from CSV paste. |
| `/api/reviewer` | POST | Body: `{key, name, email, role}`. Creates a reviewer; generates token. |

Admin key is a single shared secret in worker env vars. Magic-link tokens are random 32-char URL-safe strings stored per-reviewer.

## Data Model

D1 schema, 4 tables:

```sql
CREATE TABLE reviewers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('subject', 'group')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE decisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section TEXT NOT NULL CHECK (section IN ('home', 'visit', 'connect', 'happenings', 'rector-search', 'watch-live', 'global')),
  kind TEXT NOT NULL CHECK (kind IN ('bio', 'copy')),
  question TEXT NOT NULL,
  context TEXT,
  options TEXT NOT NULL,                      -- JSON: [{key, label, body}]
  subject_reviewer_id INTEGER REFERENCES reviewers(id),
  target_selector TEXT NOT NULL,              -- JSON: {file, anchor_string} — see "Pull script" below
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'finalized')),
  final_choice TEXT,
  final_other_text TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  finalized_at TEXT
);

CREATE TABLE assignments (
  decision_id INTEGER NOT NULL REFERENCES decisions(id),
  reviewer_id INTEGER NOT NULL REFERENCES reviewers(id),
  PRIMARY KEY (decision_id, reviewer_id)
);

CREATE TABLE submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  decision_id INTEGER NOT NULL REFERENCES decisions(id),
  reviewer_id INTEGER NOT NULL REFERENCES reviewers(id),
  choice TEXT NOT NULL,                       -- key from decisions.options or 'other'
  other_text TEXT,
  comment TEXT,
  submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (decision_id, reviewer_id)
);
```

**Resolution rules:**
- **Bio decisions**: `subject_reviewer_id` set, `kind='bio'`. Submitting through `/api/submit` auto-flips `status='finalized'`, writes `final_choice` and `final_other_text`, sets `finalized_at`. Only the subject can submit. Group reviewers cannot see bios not assigned to them.
- **Copy decisions**: `subject_reviewer_id` null, `kind='copy'`. `assignments` row required to submit. Decision stays `open` until Nate finalizes manually via admin. Tied votes surface explicitly in the admin tally; Nate clicks the winner.
- **Resubmission**: UPSERT on `(decision_id, reviewer_id)` so reviewers can change picks before finalize.

## Reviewer UX

Landing on `/r/<token>`:

- Header: "Welcome, [Name]. You have N decisions to review for All Saints' website."
- One section per assigned site area, collapsible.
- Per decision card:
  - Question + optional context (rendered in display style for in-situ feel).
  - Options A, B, C, "Other" — each as its own card showing proposed copy in actual display style.
  - "Other" reveals a textarea.
  - Optional comment field (free text, always available).
  - "Save" button.
  - Status badge: not submitted / submitted on X / finalized (your pick won | group chose X | locked).

Bio decisions:
- Only that person sees their bio. Save = finalize with a confirmation step. Post-finalize: locked view + mailto "request a change" link.

Copy decisions:
- Standard save = update vote. No final state visible until Nate finalizes; after finalize, all assigned reviewers see the chosen option.

Mobile-first, no horizontal scroll, big tap targets. No login state, no cookies. Token in URL is the session. Bookmarking the URL = re-entering.

## Admin UX (`/admin?key=...`)

**Top:** Counts (`Open / Submissions / Finalized / Reviewers`) and "Send magic links" panel that lists each reviewer + their URL + copy button. Nate pastes into Gmail per reviewer.

**Decision list:** grouped by section then status (Open / Ready to finalize / Finalized). Each row shows:
- Question + assigned-reviewer chips (✓ submitted, ◯ not yet).
- Bios: subject's pick if submitted, "awaiting subject" otherwise.
- Copy: vote tally bar with counts per option + "No vote: N"; expandable list of each reviewer's pick + comment.
- Finalize actions for copy: click the option to lock as final. Includes "custom" finalize for when neither A/B/Other in submissions is what Nate wants.
- "Reopen" action for finalized decisions.

**Decision authoring:**
- Form: section, kind, question, context, options (add/remove rows), subject reviewer (for bios), assigned reviewers (multi-select for copy), `target_selector`.
- CSV import alternative for bulk creating the initial 25-40 from a spreadsheet paste.

**Reviewer management:**
- Table: name, email, role, token (copy button), assigned-decisions count, regenerate-token action.
- "Add reviewer" form.

## Pull Script — `tools/import_review_approvals.py`

Single command applies finalized decisions to `/final` HTML files.

```
python3 tools/import_review_approvals.py
  --dry-run            # show diffs, no write
  --ids X,Y            # apply specific decision IDs only
  --deploy             # run npx wrangler deploy after edits
```

Behavior:
1. Query D1 for `status='finalized'` decisions not yet in the local `tools/.imported_decision_ids` ledger.
2. For each, read `target_selector` JSON: `{"file": "worker/public/final/index.html", "anchor_string": "However you connect with God…"}`.
3. Find `anchor_string` in the file. If exact unique match: replace with `final_choice`'s body (looked up in `options`) or `final_other_text` if `final_choice='other'`.
4. If not unique or not found: skip with warning, leave decision unimported. Operator manually resolves.
5. Print diff per file; on success append decision ID to ledger.
6. If `--deploy`: `cd worker && npx wrangler deploy`.

The `target_selector` is authored at decision creation time. Without it, the script has no machine-readable mapping from "decision X" to "the right block in `/final`". Required field.

## Outreach (magic-link email)

Out of scope for the worker. Admin "Send magic links" panel gives copyable URLs; Nate pastes into Gmail. ~9 reviewers × ~30 seconds = 5 minutes per outreach round. If painful later, add `tools/send_review_invites.py` using Gmail API. Not MVP.

## Tie-Breaking

Tied copy votes surface explicitly in admin (e.g., "A: 3 · B: 3"). Nate finalizes manually by clicking the choice he wants. No automatic resolution.

## Build Sequence

Each step independently testable.

1. Worker scaffold + D1 binding + 4 tables, seeded with 1 test reviewer + 1 test decision.
2. `/r/<token>` reviewer page (render-only, no submit).
3. `/api/submit` endpoint + form wiring (reviewer can save picks).
4. `/admin?key=...` decision list + finalize actions + reviewer panel.
5. Admin decision authoring (form + CSV import).
6. Pull script (`tools/import_review_approvals.py`).
7. Bulk-create the real 25-40 decisions; send magic links; real reviewers vote; Nate finalizes; Claude runs pull script.

Estimated effort: ~10-15 hours total, splittable across 2-3 sessions.

## Explicitly Out of Scope (YAGNI)

- Email sending from the worker.
- Real authentication (passwords, OAuth, account recovery).
- Audit log beyond `submitted_at` / `finalized_at` timestamps.
- Charts, analytics, vote-over-time graphs.
- Permissions UI for reviewer roles (only two hardcoded: `subject`, `group`).
- Multi-language support.
- Post-cutover reuse for newsletter polls, event picks, vestry surveys. Pipeline is built to be retired or repurposed, not extended.

## Open Questions for Implementation

None at design time. Adjust live per Nate's "we can adjust once it's live" direction.
