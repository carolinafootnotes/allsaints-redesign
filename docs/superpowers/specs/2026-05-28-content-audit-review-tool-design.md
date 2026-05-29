# Content Audit Review Tool — Design Spec

Date: 2026-05-28
Status: Approved-pending-review
Owner: Nate

## Purpose

Before the WordPress → Squarespace cutover (mid-July 2026), confirm that the new
site's copy is factually accurate and that nothing important was dropped from the old
site. The mechanism is a before/after text comparison of each old page against the new
page it became.

This is a **two-pass** workflow:

1. **First pass — Nate (admin).** Nate walks every unit in the before/after view and,
   for each, either *clears* it (accounted for, nothing to check) or *flags* it as
   "needs a second look" with a short note. This is where the accounting happens.
2. **Second pass — the reviewer.** A trusted, knowledgeable, ~80-year-old,
   non-technical man. His queue is *only the units Nate flagged*, each shown with
   Nate's note. For each he confirms it looks right or raises an issue describing
   what's wrong.

The reviewer already understands we are not rewording everything; the tool doesn't
need to over-explain that. His job is the knowledgeable accuracy check on the handful
of things Nate couldn't clear alone.

Designing for the reviewer being ~80 and non-technical is still the dominant UI
constraint for his pass: easy, large, unmistakable, nothing happens unless he taps,
no way to break anything.

## Success criteria

- **Nate's pass:** Nate can go unit by unit through the full curated set, see old vs
  new as plain text, and clear or flag-with-note each one quickly. He can see at a
  glance how many remain and what he's flagged.
- **Reviewer's pass:** he opens a private link (no password), sees only the flagged
  units with Nate's note, reads old vs new, and either approves or raises a free-text
  issue using large, well-spaced, plainly-labeled controls. Nothing happens unless he
  taps. He can stop and resume via the same link.
- Every issue he raises lands in an admin view only Nate sees.
- Every one of the ~93 published WordPress pages is *accounted for* in the mapping
  Nate approves: either in a review unit, or explicitly excluded with a reason.

Out of scope: layout, images, fonts, colors of the *public* site; wording/style
preferences (this is a fact check, not prose editing); multi-reviewer voting; email
notifications.

## Key decisions (locked)

1. **New separate flow**, served by the existing `allsaints-redesign` worker, on its
   own URL prefix `/audit/...`. The existing A/B preference tool (`/r2/`) is left
   untouched. Reuses: D1 database, tokenized reviewer links, `reviewers` table,
   `layout.js` base CSS, deploy pipeline.
2. **Two passes, one shared comparison screen.** Nate's first pass clears/flags units;
   the reviewer's pass acts only on flagged units. The before/after comparison
   component is built once and reused by both.
3. **One reviewer.** No vote tallies, no signoff thresholds, no seeing others' input.
4. **The reviewer sees only Nate-flagged units**, each with Nate's note.
5. **Issues go straight to Nate** in an admin view. No email, no Brian triage.
6. **Layout is responsive left|right.** Side-by-side old/new on a wide screen
   (desktop, iPad landscape); stacks to old-on-top / new-below when the viewport is
   too narrow to show two readable columns.
7. **New copy shows as plain text** on the right, same as old on the left. The point
   of "text only" is to compare words to words without the live page's images/layout.
8. **Curated units, full accounting.** The mapping doc Nate approves lists all ~93
   published pages, each tagged either into a review unit or `excluded` with a reason
   (empty stub / transaction page / duplicate / obsolete). Nothing falls through.
9. **Grouped review unit.** The unit of review is a *new destination page plus all the
   old pages that fed it.* When several old pages merged into one new page, the old
   sources are shown together (stacked, each labeled by its old title) on the left and
   the single new page on the right. This also absorbs the "incorporated into X" case.
   1:1 mappings are a single old source vs the new page. Pages removed entirely collect
   in one "Removed from the new site" unit.

## Nate's first pass (admin)

Reached at `/audit-admin?key=...` (the existing admin-key pattern). It is itself a
before/after walker, one unit at a time, using the shared comparison component:

- Sticky header: unit title, plain-text progress ("Unit 4 of 32"), count flagged so far.
- The same old/new comparison area the reviewer sees.
- Two actions: **"Cleared — nothing to check"** and **"Flag for a second look"**. Flag
  opens a small note field ("What should he look at?"). Both are changeable.
- A compact summary view listing every unit with its state (pending / cleared /
  flagged) and, after the reviewer's pass, his outcome and issue note per flagged unit.

This walker doubles as how Nate reviews the auto-generated mapping: if a unit's
grouping or disposition is wrong, that's the moment he catches it.

## The reviewer's pass

### Intro screen (shown once)

Short and respectful, since he already understands the job. Two sentences, 20px, one
button "Start":

> Nate flagged a few pages he'd like your eyes on. For each, you'll see the old
> website's wording and the new website's wording — just check that nothing's wrong or
> missing, and flag anything that is.

### The review unit screen (shared component)

Sticky header (always visible while scrolling):
- Unit title (the new page's name, e.g. "Pastoral Care").
- Plain-text progress: "Page 2 of 7."
- A small, 56px "Back to previous" control. No long dashboard.

**Nate's note** for this unit, shown prominently near the top ("Nate asked: …").

Comparison area, wrapped so screen readers read old-then-new in DOM order:
- **Left / top — "Current wording" (old).** Light tint, gold left border. If multiple
  old sources feed this unit, each shows in sequence with its old page title as a
  subheading. Full extracted plain text, 18px / 1.7 line-height.
- **Right / bottom — "New wording" (new).** White, burgundy left border. Full extracted
  plain text of the new page.
  - If the unit is **removed**: a calm yellow note instead of text — "This page was
    removed from the new site. If you think something important was lost, tap
    Something's off." Never a blank/broken-looking panel.

Fixed bottom action bar (always reachable):
- **"Looks right to me"** — filled burgundy, primary, ≥56px.
- **"Something's off"** — outlined burgundy, secondary, ≥56px, separated from the
  primary by ≥24px (stacked on touch screens) to prevent mis-taps.

### Interactions

- **Looks right to me:** records the decision, shows a persistent banner ("This page is
  approved. Thank you.") that stays until he acts, and reveals a large **"Go to next
  page"** button. No auto-advance, no timer. He moves himself.
- **Something's off:** an inline section expands below the buttons (not a modal to
  dismiss) with one large textarea (≥120px) labeled "Describe what looks wrong," a
  "Send my note to Nate" button, and a "Never mind, go back" link. Focus moves into the
  textarea on expand. Empty submit shows inline `role="alert"` text, not a browser
  tooltip. After sending: persistent confirmation, then he can still approve or move on.
- **Changing his mind:** every decision is changeable. Re-opening a unit shows his
  current decision and lets him switch it. No "are you sure?" friction, no misclick trap.

### Resume and done

- Returning to the link lands on a single "Welcome back. You've reviewed 2 of 7 pages.
  Continue where you left off." card with one button — not a list.
- After the last flagged unit: a warm completion screen noting Nate will follow up on
  anything he flagged.

## Accessibility requirements (WCAG 2.1 AA, tuned for an ~80-year-old)

Requirements, not suggestions. The load-bearing ones:

- Base `html` font-size 112.5% (18px); all sizes in `rem` so browser zoom works.
- Body comparison text ≥18px / 1.65–1.7 line-height; max line length ~65ch.
- No visible UI text below 16px. UI chrome in DM Sans; the displayed church copy may
  use Cormorant Garamond as it will appear publicly.
- Contrast: fix the existing template's failing pairs (`#666` on cream → `#4a4a4a`+;
  flag-badge `#8a6d3b` on `#fff3cd` → darken text or change bg). Old/new distinguished
  by **label + border + tint, never color alone.**
- Visible focus ring on every focusable element: `outline:3px solid #c8a977;
  outline-offset:2px` (the template currently has none).
- Targets ≥56px; the two reviewer actions separated as above.
- No `<dialog>` for the issue flow; inline expand with managed focus.
- Status messages persist ≥4s and are dismissible; no 2-second toasts.
- No timeouts, no auto-logout, no auto-advance. Expired/invalid token shows a plain
  full-page message telling him to reply to the email for a fresh link.
- Skip link to the comparison; `role="region"` + `aria-label` on old/new wrappers;
  correct heading order. Reading level ~grade 6 for all chrome.

## Architecture

Built on the existing worker, following the self-contained `/t/` (triage) precedent:
own route prefix, own handler, own db helper, own template, own migration. Touches no
existing tables except read-only use of `reviewers`.

### Data model (new tables — migration `schema/0004_copy_audit.sql`)

```sql
CREATE TABLE IF NOT EXISTS audit_units (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  slug_key     TEXT    NOT NULL UNIQUE,   -- stable key, e.g. "pastoral-care"
  title        TEXT    NOT NULL,          -- new page name, or "Removed from the new site"
  disposition  TEXT    NOT NULL CHECK (disposition IN ('rewritten','merged','removed')),
  new_url      TEXT,                      -- /final/... path; NULL if removed
  new_text     TEXT,                      -- extracted plain text of the new page; NULL if removed
  -- Nate's first pass lives on the unit (single admin editor):
  review_state TEXT    NOT NULL DEFAULT 'pending'
                 CHECK (review_state IN ('pending','cleared','flagged')),
  flag_note    TEXT,                      -- Nate's note when flagged
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_audit_units_state ON audit_units(review_state);

CREATE TABLE IF NOT EXISTS audit_sources (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  unit_id    INTEGER NOT NULL REFERENCES audit_units(id),
  old_title  TEXT    NOT NULL,
  old_url    TEXT,
  old_text   TEXT,                        -- extracted plain text from WP XML
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_audit_sources_unit ON audit_sources(unit_id);

-- The reviewer's second-pass decision (only on flagged units).
CREATE TABLE IF NOT EXISTS audit_decisions (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  reviewer_id   INTEGER NOT NULL REFERENCES reviewers(id),
  unit_slug_key TEXT    NOT NULL,
  outcome       TEXT    NOT NULL CHECK (outcome IN ('approved','issue')),
  issue_text    TEXT,                     -- required when outcome='issue'
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  UNIQUE (reviewer_id, unit_slug_key)     -- upsert; decisions are changeable
);
CREATE INDEX IF NOT EXISTS idx_audit_decisions_unit ON audit_decisions(unit_slug_key);
```

`review_state`/`flag_note` carry Nate's first pass (Nate is the only admin, so they
live on the unit). The reviewer's queue is `WHERE review_state='flagged'`. Plain text
stored directly in D1 `TEXT` columns; the extraction script strips tags/shortcodes/
comments to clean prose.

### Routes (in `src/index.js`, alongside the `/t/` block)

```
GET  /audit-admin?key=...            -> Nate's first-pass walker + summary
POST /api/audit/triage               -> set a unit cleared|flagged (+note); key-guarded
GET  /audit/{token}                  -> reviewer: resume card / intro / first undecided flagged unit
GET  /audit/{token}/u/{slug_key}     -> reviewer: single flagged-unit comparison screen
POST /api/audit/decide               -> reviewer: upsert decision (approved | issue+text)
```

### New files

```
worker/schema/0004_copy_audit.sql           migration
worker/schema/audit_seed.sql                generated by extraction script
worker/src/review/audit_db.js               db helpers
worker/src/review/handlers/audit.js         route handlers (admin + reviewer)
worker/src/review/templates/audit.js        HTML templates + shared comparison component
worker/tests/audit.test.js                  vitest
tools/extract-audit-content.js              one-shot Node extractor -> audit_seed.sql
tools/audit-mapping.json                    approved old->new map + exclusions
```

Edits to existing files: import + route block in `src/index.js`.

### Content ingestion

`tools/extract-audit-content.js` reads `assets/wordpress-export/*.xml` (published pages
only), strips HTML tags, `<!-- wp:* -->` block comments, `[shortcodes]`, and collapses
whitespace; reads `worker/public/final/**/index.html` `<main>` for new-page text; and
reads `tools/audit-mapping.json` to assemble units, their sources, and exclusions.
Outputs `schema/audit_seed.sql` with `INSERT OR IGNORE` (idempotent on `slug_key`).
Loaded via `wrangler d1 execute allsaints-review-db --remote --file schema/audit_seed.sql`.

`tools/audit-mapping.json` is the artifact Nate approves before anything reaches the
reviewer. Generated as a draft from the WP export + `/final`, then hand-corrected.
Every published WP slug appears exactly once: assigned to a unit, or `excluded` with a
reason.

### Reviewer provisioning

One `reviewers` row with `role='audit'`, created via the existing `createReviewer`
helper. Its token is the `/audit/{token}` link Nate emails him.

## Testing

vitest, following `tests/pages_*.test.js`:
- Triage: POST `/api/audit/triage` with key sets `review_state`/`flag_note`; bad/no key → 401.
- Reviewer queue: only `flagged` units appear; `cleared`/`pending` are excluded.
- Decide approved → 200, row present; decide issue with text → upsert; empty issue text → 400.
- Bad token on reviewer route → 404; bad/no admin key → 401.
- GET reviewer unit (flagged) with valid token → 200, HTML contains unit title, Nate's
  note, and both columns.
- Removed-disposition unit renders the yellow note, not a blank panel.
- Resume: GET `/audit/{token}` after one decision points to the next undecided flagged unit.

Manual device QA before handing to the reviewer: load on an actual iPad, portrait and
landscape; confirm responsive stack/side-by-side, readable type, reachable well-separated
buttons, visible focus rings, textarea-takes-focus-on-expand. Per project rule: not
"ready to ship" until run on a device.

## Build sequence

1. Migration + `audit_db.js` + data-layer tests.
2. Extraction script + draft `audit-mapping.json`; **Nate reviews/corrects the mapping.**
3. Shared before/after comparison component.
4. Nate's first-pass admin walker (clear/flag + note) + summary.
5. Reviewer flow (intro, flagged-unit screen, resume, done) + decide API.
6. Accessibility pass + iPad device QA.
7. Seed remote D1, create the reviewer, hand Nate the link.

## Risks

- **Mapping accuracy** is the real work and the real risk; the tool is only as good as
  `audit-mapping.json`. Nate's first pass is where it gets caught.
- **Extraction debris** from WP shortcodes/blocks; needs the multi-pass strip and a
  manual skim before seeding.
- **iPad portrait readability** — mitigated by responsive stack and large type, but
  verified on a real device, not asserted.
