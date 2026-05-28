# Audit Decisions — Open Questions Resolved

**Generated:** 2026-05-27
**Author:** Transition Delivery Manager (autonomous resolution per standing instruction)
**Source questions:** `current-site-audit.md` → "Open questions for Nate" (Q1–Q10)
**Bias:** PRESERVE for any URL tied to physical/printed material; ADD-to-IA for evergreen Episcopal-parish pages; RETIRE for content >12 months old with no current value; MERGE when a target /final page already exists.

Nate: rework any row marked medium or high risk if it does not match your read. Low-risk rows should not require your attention.

---

## Q1 — `/history/` placement

**Decision:** MERGE into `/final/community` as a "Our History" section. Do NOT stand up a standalone `/final/history` page before cutover.

**Reason:** History is reference content with low first-time-guest CTR. Slide 11 already absorbs Community into Connect's "Meet the people" track, but History deserves a dedicated section heading because it carries founding-date + parish-narrative SEO value. A standalone page is a post-launch enhancement, not a cutover blocker.

**Rework risk:** Low. If review group later wants a standalone page, it's a 1-day lift to promote the section to its own URL with a 301 from `/community#history`.

---

## Q2 — `/what-is-an-epis/` (What is an Episcopalian?)

**Decision:** MIGRATE as standalone evergreen page at `/final/what-is-an-episcopalian/` (clean slug).

**Reason:** This is the highest-SEO-value page a typical Episcopal parish site has. "What is an Episcopalian" is a real search query with national volume; standalone slug captures it. Folding into a `/visit` FAQ buries it from Google. Cost to ship is one page of evergreen copy, mostly portable from existing.

**Rework risk:** Low. If review group prefers FAQ placement, demote post-launch with 301 to `/visit#what-is-an-episcopalian`.

---

## Q3 — `/public-preschool/` (LCDC)

**Decision:** MIGRATE as standalone page at `/final/lcdc/` (or `/final/preschool/` — Brian's pick on the slug). NOT folded into Community.

**Reason:** LCDC is a real institution with its own audience (prospective preschool parents). They are a distinct constituent group from parishioners, and they don't want to land on a parish-community page to learn about enrollment, tuition, hours. Standalone page protects that funnel. A microsite is overkill at this phase; a dedicated parish-site page is the right middle ground.

**Rework risk:** Medium. LCDC stakeholders may want more authority over the page's structure than a parish-side build accommodates. If so, post-launch we promote to a microsite or subdomain. Flag for Joy Marie + Brian to confirm LCDC director is in the loop on copy.

---

## Q4 — `/pastoral-care/`

**Decision:** ADD to IA as `/final/pastoral-care/` (standalone page).

**Placeholder copy for cutover:**

> If you or a loved one needs prayer, a hospital visit, or sacramental care, please contact the parish office at [phone]. The clergy on call will respond within 24 hours. For non-urgent prayer requests, visit our prayer requests page.

**Reason:** The page exists today on live site. Silently retiring it during a rector search is the worst possible time — pastoral need is the moment people most expect a parish to be reachable. Standalone page also protects the human-contact answer (per Slide 12 blocker, the review group needs to name a contact during the search).

**Rework risk:** Low on the page existing. Medium on copy specifics — the placeholder above will need a real phone number and a named on-call contact before cutover. Flag in sitemap as "human-owner TBD". Surface to senior-ux-designer parallel critique pass.

---

## Q5 — `/koinonia/`

**Decision:** RETIRE by default. Re-enable only if Joy Marie confirms active status by Phase 5 factual lane.

**Reason:** Status unknown per memory. Default-retire is safer than ship-with-stale-reference, especially given the "factual flag" already exists on Slide 12 (F3). If active, MERGE to `/final/connect` ministries list is a 30-minute add.

**Rework risk:** Low. Reversible in either direction during Phase 5.

---

## Q6 — `/sermons/` (sermons page + ~50 sermon posts)

**Decision:** FOLD into `/final/watch-live`, which renames to **"Watch & Listen"** in IA. Sermons live as a sub-section with internal taxonomy (date + preacher).

**Reason:** Weekly publishing in one place is cheaper for Brian to maintain than two destinations. Renaming Watch Live to Watch & Listen broadens the page's promise without proliferating top-level nodes. Preserves searchability of the ~50 sermon posts via internal listing. Standalone `/sermons` page is a post-launch promotion if Brian's publishing cadence justifies it.

**Rework risk:** Medium. If clergy specifically want sermons promoted as a destination separate from live-stream (e.g., for a podcast feed launch), this should be reversed. Flag for Chuck/John awareness during Phase 4 Rector Search packet review.

---

## Q7 — Memorial-tree pages (~30 individual slugs at root)

**Decision:** PRESERVE ALL by default. No exceptions, no audit-first.

**Reason:** Physical QR codes on memorial trees are the asymmetric-risk asset. Reprinting metal markers or plaques costs an order of magnitude more than carrying 30 redirects in a Squarespace mapping file. Even if half the signs are gone, we don't know which half without a physical audit, and the audit costs more than the redirects.

**Rework risk:** Low. The cost of preserving a slug no one visits is zero. The cost of breaking a slug someone DOES visit (in person, standing at a tree) is high and unrecoverable without explanation.

**Follow-up flag:** Brian to do a physical-signage audit post-launch (Phase 7 + 1) to confirm which slugs are still cited on signs. If a slug has no physical reference and zero analytics traffic 90 days post-launch, retire then.

---

## Q8 — `/life-events/` (weddings/baptisms/funerals)

**Decision:** ADD to IA as `/final/life-events/` (standalone page), with sub-sections for Weddings / Baptisms / Funerals (matching the UX critique's SEO point on Slide 12).

**Reason:** Page exists today. "Episcopal wedding Concord NC" / "baptism Concord NC" / "Episcopal funeral Concord NC" are real local-SEO search queries that bring in genuinely prospective guests (not just members). Slide 12 already flagged this as the clearest-ROI add. Locking it now means it makes the cutover.

**Rework risk:** Low. Standard Episcopal-site pattern; copy is portable from existing page.

---

## Q9 — Sign-up sheets (`/sheet/*`, 4 URLs)

**Decision:** MIGRATE the actively-used sheets to Squarespace forms; RETIRE the past-event sheets.

Specifically:
- `/sheet/coffee-hour/` — MIGRATE to Squarespace form, link from `/connect`. Likely actively used.
- `/sheet/maundy-thursday-prayer-vigil/` — RETIRE. Past event.
- `/sheet/charlotte-grossman-transport/` — RETIRE (likely past need; Brian to confirm). If still active, MIGRATE.
- `/sheet/fred-weber-transport/` — RETIRE (same logic).

**Reason:** The WordPress sign-up-sheet plugin (`dlssus_sheet`) has no Squarespace equivalent, and keeping a WP backend alive past cutover for one form type is operational debt. Squarespace forms cover the use case for active sheets. Past-event sheets are deadweight.

**Rework risk:** Medium. Brian may know one of the "transport" sheets is still active; surface as a quick yes/no in his audit walkthrough. No 301s needed for retired sheets — these are deeply niche URLs unlikely to be externally cited.

---

## Q10 — Externally-cited blog posts

**Decision:** DEFER to Brian's audit walkthrough (Phase 3+ step 3 in audit's "What's next"). Default remains RETIRE all blog posts; Brian provides the exception list.

**Reason:** This is one of the few questions where the SME (Brian) genuinely has knowledge Claude/Nate don't — which posts are in current bulletins, newsletters, or external citations. Asking him is cheaper than guessing. Not an autonomous call; it's a routed call. The audit's recommended-next-steps already capture this.

**Rework risk:** Low. Default-retire is the safe option; Brian's exception list is additive, not corrective.

---

## Summary table

| Q | Topic | Decision | Rework risk |
|---|---|---|---|
| Q1 | /history/ | MERGE → /community section | Low |
| Q2 | /what-is-an-epis/ | MIGRATE standalone evergreen | Low |
| Q3 | /public-preschool/ (LCDC) | MIGRATE standalone /lcdc | Medium |
| Q4 | /pastoral-care/ | ADD to IA standalone | Low (page) / Medium (copy) |
| Q5 | /koinonia/ | RETIRE by default | Low |
| Q6 | /sermons/ | FOLD into Watch & Listen | Medium |
| Q7 | Memorial-tree slugs (~30) | PRESERVE ALL | Low |
| Q8 | /life-events/ | ADD to IA standalone | Low |
| Q9 | /sheet/* (4) | MIGRATE active / RETIRE past | Medium |
| Q10 | Externally-cited blog posts | DEFER to Brian audit | Low |

---

## Net new IA nodes surfaced by these decisions

To be reflected in `sitemap-outline.md` (Slide 3 + Slide 11) and the master plan:

1. `/final/what-is-an-episcopalian/` (Q2)
2. `/final/lcdc/` or `/final/preschool/` (Q3)
3. `/final/pastoral-care/` (Q4)
4. `/final/life-events/` (Q8) — with sub-sections Weddings / Baptisms / Funerals
5. `/final/watch-live` renamed to `/final/watch-listen` or kept-slug-with-new-title "Watch & Listen" (Q6)
6. `/final/community` gets a History section (Q1)
