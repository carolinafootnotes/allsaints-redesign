# Content Audit Review Tool — Design Spec

Date: 2026-05-28
Status: Approved-pending-review
Owner: Nate

## Purpose

Before the WordPress → Squarespace cutover (mid-July 2026), one trusted reviewer
verifies that the new site's copy is factually accurate and that nothing important
was dropped from the old site. The reviewer reads a before/after text comparison
of each old page against the new page it became, and either approves it or raises
an issue describing what's wrong.

The reviewer is **one specific person, ~80 years old, non-technical.** That single
fact is the dominant design constraint. Every choice below optimizes for her being
able to do this easily, without help, without fear of breaking something.

## Success criteria

- She can open a private link (no password), understand what she's being asked to
  do within one short screen, and start reviewing.
- For each unit she sees the old wording and the new wording as plain text, and can
  tell at a glance which is old and which is new.
- She can approve a unit, or raise an issue with a free-text note, using large,
  well-spaced, plainly-labeled controls. Nothing happens unless she taps.
- She can stop any time and resume later via the same link, landing back where she
  left off.
- Every issue she raises lands in an admin view only Nate sees.
- Every one of the ~93 published WordPress pages is *accounted for* in the mapping
  Nate approves: either in her queue, or explicitly excluded with a reason.

Out of scope: layout, images, fonts, colors of the *public* site; wording/style
preferences (she is checking facts, not editing prose); multi-reviewer voting;
email notifications.

## Key decisions (locked)

1. **New separate flow**, served by the existing `allsaints-redesign` worker, on its
   own URL prefix `/audit/{token}`. The existing A/B preference tool (`/r2/`) is left
   untouched. Reuses: D1 database, tokenized reviewer links, `reviewers` table,
   `layout.js` base CSS, deploy pipeline.
2. **One reviewer.** No vote tallies, no signoff thresholds, no seeing others' input.
3. **Issues go straight to Nate** in an admin view. No email, no Brian triage.
4. **Layout is responsive left|right.** Side-by-side old/new on a wide screen
   (desktop, iPad landscape); stacks to old-on-top / new-below when the viewport is
   too narrow to show two readable columns. Honors the "left | right" request wherever
   there's room; never becomes unreadable.
5. **New copy shows as plain text** on the right, same as old on the left. The point
   of "text only" is to compare words to words without the live page's images/layout.
6. **Curated queue, full accounting.** She reviews substantive content pages only.
   The mapping doc Nate approves lists all ~93 published pages, each tagged either
   `in_queue` or `excluded` with a reason (empty stub / transaction page / duplicate
   / obsolete). Nothing falls through silently.
7. **Grouped review unit.** The unit of review is a *new destination page plus all
   the old pages that fed it.* When several old pages merged into one new page, she
   sees all the old sources together (stacked, each labeled by its old title) on the
   left, and the single new page on the right. This also absorbs the "incorporated
   into X" case. 1:1 mappings are just a single old source vs the new page. Pages
   removed entirely with no destination collect in one "Removed from the new site"
   unit (or a short list), so she can confirm the removals were fine.

## The reviewer experience

### Orientation screen (shown once, before the first unit)

Three short sentences, 20px, generous whitespace, one button "Start reviewing":

> For each page, you'll see the old website's wording and the new website's wording.
> Your job is to catch anything that's *wrong* or *missing*: a name, a date, a phone
> number, a ministry that disappeared. You are **not** reviewing the writing, so if
> the new site simply says something in different words, that's fine and expected.

This framing is load-bearing. Without it she flags every reworded sentence.

### The review unit screen

Sticky header (always visible while scrolling):
- Unit title (the new page's name, e.g. "Pastoral Care").
- Plain-text progress: "Page 4 of 32" (no progress bar as the primary signal; a thin
  bar may appear as a secondary cue).
- A small, 56px "Back to previous" control. No 70-item dashboard.

A one-paragraph instruction block (<50 words) under the title repeating the job in
plain language.

Comparison area, wrapped so screen readers read old-then-new in DOM order:
- **Left / top — "Current wording" (old).** Light tint, gold left border. If multiple
  old sources feed this unit, each is shown in sequence with its old page title as a
  subheading. Full extracted plain text, 18px / 1.7 line-height.
- **Right / bottom — "New wording" (new).** White, burgundy left border. Full extracted
  plain text of the new page.
  - If the unit is **removed**: a calm yellow note instead of text — "This page was
    removed from the new site. If you think something important was lost, tap
    Something's off." Never a blank/broken-looking panel.

Fixed bottom action bar (always reachable, regardless of scroll depth):
- **"Looks right to me"** — filled burgundy, primary, ≥56px.
- **"Something's off"** — outlined burgundy, secondary, ≥56px, separated from the
  primary by ≥24px (stacked vertically on touch screens) to prevent mis-taps.

### Interactions

- **Looks right to me:** records the decision, shows a persistent banner at the top of
  the content area ("This page is approved. Thank you.") that stays until she acts,
  and reveals a large **"Go to next page"** button. No auto-advance, no timer. She
  moves herself.
- **Something's off:** an inline section expands below the buttons (not a modal she has
  to dismiss) containing one large textarea (≥120px) labeled "Describe what looks
  wrong, or type the words that concern you," and a "Send my note to Nate" button plus
  a "Never mind, go back" link. Focus moves into the textarea on expand. Empty submit
  shows inline `role="alert"` text, not a browser tooltip. After sending: persistent
  confirmation, then she can still approve or move on.
- **Changing her mind:** every decision is changeable. Re-opening a unit shows her
  current decision and lets her switch it any time before she finishes. This removes
  the need for "are you sure?" friction and removes any misclick trap.

### Resume and done

- Returning to the link lands on a single "Welcome back. You've reviewed 4 of 32 pages.
  Continue where you left off." card with one button — not a list.
- After the last unit: a warm completion screen. If any units were left with an issue
  note, it says Nate will look at those.

## Accessibility requirements (WCAG 2.1 AA, tuned for an 80-year-old)

These are requirements, not suggestions. Full detail lives with the accessibility
review; the load-bearing ones:

- Base `html` font-size 112.5% (18px); all sizes in `rem` so browser zoom works.
- Body comparison text ≥18px / 1.65–1.7 line-height; max line length ~65ch.
- No visible UI text below 16px. Content copy in Cormorant Garamond (as it will appear
  publicly is acceptable for the *new* side); all UI chrome in DM Sans.
- Contrast: fix the existing template's failing pairs (`#666` on cream → `#4a4a4a`+;
  flag-badge `#8a6d3b` on `#fff3cd` → darken text or change bg). Target 7:1 where
  practical. Old/new distinguished by **label + border + tint, never color alone.**
- Visible focus ring on every focusable element: `outline:3px solid #c8a977;
  outline-offset:2px` (the template currently has none — a 2.4.7 failure).
- Targets ≥56px; Approve and Something's-off separated as above.
- No `<dialog>` for the issue flow; inline expand with managed focus. If any modal is
  used (none planned), it must trap focus, close on Escape, return focus to trigger,
  and use a labeled text close button (never an icon-only "X").
- Status messages persist ≥4s and are dismissible; no 2-second toasts.
- No timeouts, no auto-logout, no auto-advance. Expired/invalid token shows a plain
  full-page message telling her to reply to the email for a fresh link.
- Skip link to the comparison section; `role="region"` + `aria-label` on the old/new
  wrappers; correct heading order (h1 unit title, h2 column labels / source titles).
- Reading level ~grade 6. Button labels: "Looks right to me", "Something's off",
  "Send my note to Nate", "Never mind, go back", "Go to next page", "Back to previous".

## Architecture

Built on the existing worker, following the self-contained `/t/` (triage) precedent:
own route prefix, own handler, own db helper, own template, own migration. Touches no
existing tables except read-only use of `reviewers`.

### Data model (new tables — migration `schema/0004_copy_audit.sql`)

Because the review unit groups multiple old sources against one new page, use a
unit + sources shape rather than one flat row per old page.

```sql
CREATE TABLE IF NOT EXISTS audit_units (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug_key    TEXT    NOT NULL UNIQUE,   -- stable key, e.g. "pastoral-care"
  title       TEXT    NOT NULL,          -- new page name, or "Removed from the new site"
  disposition TEXT    NOT NULL CHECK (disposition IN ('rewritten','merged','removed')),
  new_url     TEXT,                      -- /final/... path; NULL if removed
  new_text    TEXT,                      -- extracted plain text of the new page; NULL if removed
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS audit_sources (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  unit_id    INTEGER NOT NULL REFERENCES audit_units(id),
  old_title  TEXT    NOT NULL,
  old_url    TEXT,
  old_text   TEXT,                       -- extracted plain text from WP XML
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_audit_sources_unit ON audit_sources(unit_id);

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

Plain text stored directly in D1 `TEXT` columns (~hundreds of KB total; no file I/O at
request time). The extraction script strips tags/shortcodes/comments to clean prose.

### Routes (in `src/index.js`, alongside the `/t/` block)

```
GET  /audit/{token}                 -> resume card / orientation / first undecided unit
GET  /audit/{token}/u/{slug_key}    -> single unit comparison screen
POST /api/audit/decide              -> upsert decision (approved | issue+text)
GET  /audit-admin?key=...           -> Nate-only: every unit, its decision, issue notes
```

### New files

```
worker/schema/0004_copy_audit.sql           migration
worker/schema/audit_seed.sql                generated by extraction script
worker/src/review/audit_db.js               db helpers
worker/src/review/handlers/audit.js         route handlers
worker/src/review/templates/audit.js        HTML templates (reviewer + admin)
worker/tests/audit.test.js                  vitest
tools/extract-audit-content.js              one-shot Node extractor -> audit_seed.sql
tools/audit-mapping.json                    the approved old->new map + exclusions
```

Edits to existing files: import + route block in `src/index.js`.

### Content ingestion

`tools/extract-audit-content.js` reads `assets/wordpress-export/*.xml` (published pages
only), strips HTML tags, `<!-- wp:* -->` block comments, `[shortcodes]`, and collapses
whitespace; reads `worker/public/final/**/index.html` `<main>` for new-page text; and
reads `tools/audit-mapping.json` (the human-approved classification) to assemble units,
their sources, and exclusions. Outputs `schema/audit_seed.sql` with
`INSERT OR IGNORE` (idempotent, keyed on `slug_key`). Loaded with
`wrangler d1 execute allsaints-review-db --remote --file schema/audit_seed.sql`.

`tools/audit-mapping.json` is the artifact Nate approves before anything reaches the
reviewer. It is generated as a *draft* from the WP export + `/final` pages, then
hand-corrected. Shape per entry: old slug → `{ disposition, unit, new_url }` or
`{ excluded: "reason" }`. Every published WP slug must appear exactly once.

### Reviewer provisioning

One `reviewers` row with `role='audit'` (distinct from the A/B group's role), created
via the existing `createReviewer` helper. Its token is the `/audit/{token}` link Nate
emails her.

## Testing

vitest, following `tests/pages_*.test.js`:
- POST decide approved → 200, row present.
- POST decide issue with text → upsert, single row, text stored.
- POST decide issue with empty text → 400.
- Bad token on reviewer route → 404; bad/no admin key → 401.
- GET reviewer unit with valid token → 200, HTML contains unit title + both columns.
- Removed-disposition unit renders the yellow note, not a blank panel.
- Resume: GET `/audit/{token}` after one decision points to the next undecided unit.

Manual device QA before handing to the reviewer: load on an actual iPad in portrait
and landscape; confirm columns stack/side-by-side correctly, type is readable, buttons
are reachable and well-separated, focus rings show, and the issue textarea takes focus
on expand. Per project rule: not "ready to ship" until run on a device.

## Build sequence

1. Migration + `audit_db.js` + tests for the data layer.
2. Extraction script + draft `audit-mapping.json`; **Nate reviews/corrects the mapping.**
3. Reviewer template + handler + routes (orientation, unit screen, resume, done).
4. Admin view.
5. Accessibility pass against the requirements above; device QA on iPad.
6. Seed remote D1, create the reviewer, hand Nate the link.

## Risks

- **Mapping accuracy** is the real work and the real risk; the tool is only as good as
  `audit-mapping.json`. Nate must review it.
- **Extraction debris** from WP shortcodes/blocks; needs the multi-pass strip and a
  manual skim of output before seeding.
- **iPad portrait readability** — mitigated by the responsive stack and large type, but
  must be verified on a real device, not asserted.
