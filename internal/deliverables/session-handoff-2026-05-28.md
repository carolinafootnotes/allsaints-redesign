# Session handoff — 2026-05-28

Starting point for the next session. Memory will pick up [[reference-wordpress-export]] and [[project-lcdc-current-name]] automatically; the rest is below.

## What shipped this session (committed + pushed)

Branch: `phase-3-review-reframe-and-phase-4-pages` (2 commits on origin)

### Phase 3 — review-tool reframe (M1-M5, 44/44 tests)
- New page-level review at `/r2/<token>` with three block types: A/B choice, content-inventory checklist, factual flag
- Mobile-first reviewer UI, sticky sign-off, always-enabled with non-blocking incomplete modal
- 3-of-5 flat sign-off, aggregate votes shown after own vote (not before)
- All factual flags route to Brian first for triage
- Per-page build brief export at `/admin/brief/<slug>` (markdown by default, `?format=html` for printable)
- D1 migration `worker/schema/0002_pages_blocks_flags.sql`
- Security fix: handleSubmit/Signoff/Flag/Page now require reviewer is assigned to the page (403 if not)

### Phase 4 — content pages
- New: `/lcdc`, `/connect/pastoral-care`, `/connect/life-events`, `/connect/episcopalian`
- Renamed `watch-live` → `watch-and-listen` (added sermon archive section)
- Footer link sweep across 9 pages

### LCDC vs LELC (resolved)
- Current name is **LCDC** (Lockhart Child Development Center). External site: `lockhartcdc.org`
- WordPress export refers to it as **LELC** (Lockhart Early Learning Center) — that's the 2014 historical name
- One agent got it wrong and rewrote with LELC content; cleanup agent restored the page. Captured in memory.

## Deliverables (planning docs, in `deliverables/`)

- `content-review-restructure-plan.md` — master plan (v3)
- `sitemap-outline.md` — IA outline (post-UX-critique, with autonomous DM calls flagged)
- FigJam diagram: https://www.figma.com/board/Iu1fKA1cM8YXpsF3eFOaEd
- `current-site-audit-v2.md` — **authoritative from WP export** (70 pages, 487 posts, 144 draft/private, 2,462 attachments, 43 preserved URLs)
- `current-site-audit.md` — v1 (live-scraped, superseded; banner added)
- `audit-decisions.md` — 10 autonomous DM calls; Q1-Q9 resolved, Q10 (externally-cited blog posts) still routed to Brian
- `phase-3-review-tool-spec.md` — v2 (post UX + product critique)
- `content-approach-for-signoff.md` — **DRAFT FOR REVIEW GROUP** (pending Nate's review before sharing)

## Gmail drafts saved

Two drafts in Nate's Gmail (recipient is Nate's own email as placeholder):
1. "Where we are, and what's coming your way" — initial version with dates + Brian delegation
2. "Where we are, and what's coming" — **shorter version, NO dates, NO delegation** (the one to use; delete #1)

## Authoritative numbers (from WP export)

- 70 published pages
- 487 published posts + 144 draft/private
- 2,462 attachments in media library
- 43 URLs that must survive cutover (38 memorial trees + arboretum + 2 labyrinth + tree-of-seasons + prayer-requests)
- 3 `dlssus_signup` records contain PII (email addresses as titles) — DO NOT MIGRATE
- 49 stale curriculum sessions + 10 COVID-era popups — all RETIRE

## WordPress export location
`/Users/varloo/develop/allsaints/assets/wordpress-export/allsaintsepiscopalchurch.WordPress.2026-05-27.xml` (~18 MB). Use this instead of scraping the live site.

## Open decisions / next steps

### Pending Nate's call
1. **Sign off on `content-approach-for-signoff.md`** before sharing with the review group. Five judgment calls flagged in the DM's output above for tweaking.
2. **Send the Gmail status update** ("Where we are, and what's coming") to the review group. Need to add real recipients.
3. **Build the WP pre-processor?** Nate's preferred approach: pre-process the XML to strip Fusion/Avada shortcodes + replace with `[archived gallery]` markers before native Squarespace import. Residual gap: ~2,400 media-library orphans won't import (separate static-archive job OR accept loss).

### TODOs in code
- `[TBD phone]` placeholder in `/connect/pastoral-care` (clergy-on-call contact during rector search)
- `<!-- TODO: confirm copy with Brian / LCDC director -->` in `/lcdc`
- Placeholder sermon list in `/watch-and-listen`
- Q10 in audit-decisions: externally-cited blog posts (Brian's knowledge needed)

## Context the next session needs

- **Solo project, no team, no PR workflow.** Commit + push directly. Don't checkpoint for "PR hygiene."
- **Branch is pushed.** Next session can keep working on `phase-3-review-reframe-and-phase-4-pages` or merge to main and start fresh.
- **Review group:** Chuck (clergy), John (clergy), Joy Marie (musician), Andrea (lay), Brian (editor). Brian is most operationally informed.
- **Squarespace cutover target:** mid-July 2026 (per master plan). Status update softens this to "later this summer."
- **Don't mention Nancy Cox.** Anywhere. Memory.
- **No em dashes.** Anywhere. Memory.
- **Hearing-loop accessibility copy** on `/final/visit` is already CORRECT in code. The live site has it wrong; gets resolved at cutover.

## In-flight at end of session
Nothing. All agents complete. Tasks list clean.
