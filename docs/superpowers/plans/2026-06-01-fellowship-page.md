# Fellowship Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build one new page, `/final/fellowship`, that consolidates the old Fellowship, Men's Ministry, Women's Ministry, and Episcopal Youth pages into a single hub showing the parish's between-Sunday relational life.

**Architecture:** A single static HTML file in the existing `/final` global-template system. It links the shared `/assets/site.css` (tokens, type scale, header/nav/footer, `involved-grid`/`involved-card`, `btn`, `reveal`) and `/assets/site.js` (header scroll, mobile menu, IntersectionObserver reveal). Page-unique content only; minimal bespoke inline CSS. No custom JS.

**Tech Stack:** Static HTML/CSS, Cloudflare Workers static-asset hosting (`npm run deploy` in `worker/`), Playwright + curl for verification.

---

## Design decisions (from the design-team review, 2026-06-01)

These are settled. Build to them:

1. **Lead with the shared-life ethos, not the group grid.** A clergy candidate (the priority audience through mid-July 2026) should read an active, intergenerational community first, not a list of four committees. The "Life Together" section is the body of the page; the group grid is secondary ("here's how that shows up across life stages").
2. **Three group cards at launch:** Episcopal Youth (EYC), Men's Ministry, Women's Ministry. **Omit Primetimers** (active status is an open committee question; add later in one commit when confirmed). **Exclude Young Adults** (Nate marked Remove).
3. **Surface "the revels"** (the toast after Christmas Eve and Easter) as a deliberate highlight using the existing bordered-`article` pattern from `serve`, not new CSS.
4. **No per-person contacts.** The 2015 names (Tom Jones, Roxanne Friday, Hilary Smith, Scott Russell) are invalid and must not appear. Reuse the connect-page voice: route to the parish office. CTA: `mailto:admin@allsaintsconcord.org` + a link to `/final/connect`.
5. **Mark the group grid up as a list** (`<ul role="list">` / `<li>`, `list-style:none`) so assistive tech announces "3 items." This is a small accessibility upgrade over the plain-`div` grids on serve/connect.
6. **No sticky jump-nav.** It is over-build for a short page and does not survive a Squarespace 7.1 paste cleanly. Plain document flow.
7. **Reveal-delay cycles 1-2-3 per row** (matches serve), so a 3-card row staggers cleanly.
8. **Contrast guardrail:** burgundy `#7b2332`, `#333`, and `#666` on light backgrounds all pass AA. Never use gold `#c8a977` as body text (fails); gold is for the card top-border/accents only.
9. **One real photo** for the Life Together section: use `/assets/2026/fellowship-formation-2026.jpg` (an existing parish photo). Descriptive `alt`, `loading="lazy"`. No stock imagery.

## File structure

- **Create:** `worker/public/final/fellowship/index.html` — the whole page. Self-contained; links shared CSS/JS; page-unique sections inline.
- **Modify:** `worker/public/final/sitemap/index.html` — add a `/final/fellowship` entry (internal sitemap).
- **Modify (linkage):** `worker/public/final/connect/index.html` — add one link to `/final/fellowship` from the connect page (fellowship is the relational counterpart to connect), and reconcile the stale external "Ministry Contacts Directory" link (see Task 6).

The page reuses these shared classes (no new shared CSS): `site-header transparent`, `skip-link`, `page-hero`, `page-subpage`, `container`, `section-pad`, `section-label`, `section-heading`, `section-sub`, `involved-grid`, `involved-card`, `btn btn-primary`, `btn btn-outline`, `reveal`, `reveal-delay-1..3`, `site-footer`. Confirm each exists in `worker/public/assets/site.css` before relying on it (Task 1).

## Final copy (approved direction; on-voice, no em dashes, no mic-drop, no personal names)

**Hero**
- h1: `Life Together`
- sub: `Sunday is where we gather. The rest of the week is where we become a parish.`

**Section: Life Together** (the umbrella; rich treatment + photo)
- label: `Between Sundays`
- heading: `The life of the parish doesn't end at the last hymn`
- body: `We share Wednesday Night dinners that are open to everyone, small groups and dinner groups that gather around tables all over Concord, and family picnics when the weather turns. When Vacation Bible School wraps up, we carry the celebration into the park. In spending time together, we encourage one another in our lives and our journeys, usually over food.`
- highlight (bordered article / pull-quote): `After the candlelight of Christmas Eve and the last note of Easter, we raise a glass together. We call it the revels.`

**Section: Across every season of life** (the group grid)
- label: `Groups & Ministries`
- heading: `There's a table for every stage`
- sub: `From sixth grade to the back pew, these are some of the ways people find their people here.`
- Card 1, Episcopal Youth (EYC): `For youth in grades 6 through 12 and their friends. EYC meets most Wednesday nights during the school year, from 5:30 to 7:30, with dinner provided. It's about building real relationships, with each other, with mentors, and with God.`
- Card 2, Men's Ministry: `Saturday mornings from 8:00 to 9:30 in the Welcome Center for book and Bible study, with hands in parish work days and at the community night shelter. There's also F3 (Faith, Fitness, and Fellowship) for the crew already sweating before sunrise on Tuesdays, Thursdays, and Saturdays.`
- Card 3, Women's Ministry: `Times of fellowship, growth, and service through the year, including an Advent quiet day, a Lenten retreat, and yes, a dessert night.`

**Closing CTA strip**
- heading: `New here, or just curious where you'd fit?`
- sub: `You don't need an invitation or a contact name. The parish office will point you to the right people.`
- btn-primary: `Email the Parish Office` -> `mailto:admin@allsaintsconcord.org?subject=Fellowship%20at%20All%20Saints`
- btn-outline: `Ways to Connect` -> `/final/connect`

---

### Task 1: Confirm shared classes and assets exist

**Files:**
- Read: `worker/public/assets/site.css`
- Read: `worker/public/final/serve/index.html` (reference markup)
- Verify asset: `worker/public/assets/2026/fellowship-formation-2026.jpg`

- [ ] **Step 1: Verify the shared classes this page depends on are defined**

Run:
```bash
cd /Users/varloo/develop/allsaints
for c in page-hero page-subpage section-pad section-label section-heading section-sub involved-grid involved-card btn-primary btn-outline reveal-delay-1; do
  printf "%-18s " "$c"; grep -c "\.$c" worker/public/assets/site.css; done
```
Expected: every class returns a count >= 1. If any returns 0, find the actual class name in `serve/index.html` and update the plan's class list before proceeding.

- [ ] **Step 2: Verify the photo exists**

Run: `ls -la worker/public/assets/2026/fellowship-formation-2026.jpg`
Expected: file exists, non-trivial size. If missing, the Life Together section ships prose-only (drop the `<img>`); do NOT substitute stock.

- [ ] **Step 3: Capture the reference patterns**

Read these exact regions to copy structure (not content):
```bash
sed -n '1,40p' worker/public/final/serve/index.html        # <head>, header, page-hero
grep -n "involved-grid\|involved-card\|section-pad\|<article\|cc-title\|btn-primary\|site-footer" worker/public/final/serve/index.html
```
Note the `<head>` block (meta, shared CSS/JS links, title), the header/skip-link markup, the `page-hero`/`page-subpage` wrapper, the bordered `<article>` block used for Haiti CODEP, and the `<footer class="site-footer">` block. The new page copies these verbatim except for page-unique content.

---

### Task 2: Create the page shell (head, header, hero, footer)

**Files:**
- Create: `worker/public/final/fellowship/index.html`

- [ ] **Step 1: Write the shell**

Create `worker/public/final/fellowship/index.html` with: the `<head>` copied from serve (update `<title>` to `Fellowship | All Saints' Episcopal Church` and the meta description to a one-line fellowship summary), the shared `site-header transparent` + `skip-link` markup copied from serve, a `page-hero`/`page-subpage` block using the Hero copy above (h1 `Life Together`, sub line), an empty `<main id="main">` placeholder comment for the two content sections, and the `<footer class="site-footer">` copied verbatim from serve. Link `/assets/site.css` in `<head>` and `/assets/site.js` deferred before `</body>`, exactly as serve does.

- [ ] **Step 2: Deploy and verify the shell loads**

Run:
```bash
cd /Users/varloo/develop/allsaints/worker && npm run deploy 2>&1 | tail -3
curl -sL -o /dev/null -w "%{http_code}\n" https://allsaints-redesign.nate-ernst7.workers.dev/final/fellowship
```
Expected: deploy succeeds; final status `200`.

- [ ] **Step 3: Commit**

```bash
cd /Users/varloo/develop/allsaints
git add worker/public/final/fellowship/index.html
git commit -m "feat(fellowship): page shell (head, header, hero, footer)"
```

---

### Task 3: Build the "Life Together" section (umbrella + revels highlight + photo)

**Files:**
- Modify: `worker/public/final/fellowship/index.html`

- [ ] **Step 1: Add the section**

Inside `<main>`, add a `<section class="section-pad" aria-label="Life together">` with a `container`. Include `section-label` ("Between Sundays"), `section-heading` ("The life of the parish doesn't end at the last hymn"), the body paragraph from the copy block, and the photo:
```html
<img src="/assets/2026/fellowship-formation-2026.jpg"
     alt="Parishioners gathered around tables at a shared meal in the parish hall"
     loading="lazy" style="width:100%; height:auto; border-radius:8px; margin-top:1.5rem;">
```
Then the revels highlight as a bordered article (copy the `<article>` border/pull-quote styling serve uses for Haiti CODEP; reuse its inline style or class, do not invent new CSS):
```html
<article class="reveal reveal-delay-1" style="/* match serve's bordered article */">
  <p>After the candlelight of Christmas Eve and the last note of Easter, we raise a glass together. We call it the revels.</p>
</article>
```
Add `reveal reveal-delay-N` to the heading/body/photo as serve does. If the photo was missing in Task 1, omit the `<img>`.

- [ ] **Step 2: Deploy and verify the section renders**

Run:
```bash
cd /Users/varloo/develop/allsaints/worker && npm run deploy 2>&1 | tail -2
curl -sL https://allsaints-redesign.nate-ernst7.workers.dev/final/fellowship | grep -c "revels\|Between Sundays\|fellowship-formation-2026"
```
Expected: count `>= 3` (revels text, label, photo path all present). If the photo was omitted, expect `>= 2`.

- [ ] **Step 3: Commit**

```bash
cd /Users/varloo/develop/allsaints
git add worker/public/final/fellowship/index.html
git commit -m "feat(fellowship): Life Together section with revels highlight"
```

---

### Task 4: Build the group grid (EYC, Men's, Women's) as an accessible list

**Files:**
- Modify: `worker/public/final/fellowship/index.html`

- [ ] **Step 1: Add the section**

After Life Together, add `<section class="section-pad" aria-label="Groups and ministries" style="background:#fff;">` with a `container`, the `section-label` ("Groups & Ministries"), `section-heading` ("There's a table for every stage"), and `section-sub` (the "From sixth grade to the back pew" line). Then the grid AS A LIST:
```html
<ul class="involved-grid" role="list" style="list-style:none; padding:0; margin:0;">
  <li class="involved-card reveal reveal-delay-1"><h3>Episcopal Youth (EYC)</h3><p>...EYC copy...</p></li>
  <li class="involved-card reveal reveal-delay-2"><h3>Men's Ministry</h3><p>...Men's copy...</p></li>
  <li class="involved-card reveal reveal-delay-3"><h3>Women's Ministry</h3><p>...Women's copy...</p></li>
</ul>
```
Use the exact card copy from the copy block. Do NOT add a Primetimers or Young Adults card. Headings are `h3` (the section heading is the `h2` via `section-heading`).

- [ ] **Step 2: Deploy and verify**

Run:
```bash
cd /Users/varloo/develop/allsaints/worker && npm run deploy 2>&1 | tail -2
curl -sL https://allsaints-redesign.nate-ernst7.workers.dev/final/fellowship | grep -o "Episcopal Youth\|Men's Ministry\|Women's Ministry\|Primetimers\|Young Adults" | sort | uniq -c
```
Expected: exactly one each of Episcopal Youth, Men's Ministry, Women's Ministry; ZERO Primetimers and ZERO Young Adults.

- [ ] **Step 3: Commit**

```bash
cd /Users/varloo/develop/allsaints
git add worker/public/final/fellowship/index.html
git commit -m "feat(fellowship): groups grid (EYC, Men's, Women's) as accessible list"
```

---

### Task 5: Closing CTA strip (route to parish office, no personal names)

**Files:**
- Modify: `worker/public/final/fellowship/index.html`

- [ ] **Step 1: Add the closing CTA**

After the grid, add a closing CTA section copying serve's closing-strip markup. Heading "New here, or just curious where you'd fit?", the sub line, and two buttons:
```html
<a href="mailto:admin@allsaintsconcord.org?subject=Fellowship%20at%20All%20Saints" class="btn btn-primary">Email the Parish Office</a>
<a href="/final/connect" class="btn btn-outline">Ways to Connect</a>
```

- [ ] **Step 2: Deploy and verify no stale names slipped in**

Run:
```bash
cd /Users/varloo/develop/allsaints/worker && npm run deploy 2>&1 | tail -2
curl -sL https://allsaints-redesign.nate-ernst7.workers.dev/final/fellowship | grep -io "Tom Jones\|Roxanne\|Hilary\|Scott Russell"
```
Expected: NO output (zero stale contact names anywhere on the page).

- [ ] **Step 3: Commit**

```bash
cd /Users/varloo/develop/allsaints
git add worker/public/final/fellowship/index.html
git commit -m "feat(fellowship): closing CTA routing to parish office"
```

---

### Task 6: Wire up linkage and reconcile the stale directory link

**Files:**
- Modify: `worker/public/final/sitemap/index.html`
- Modify: `worker/public/final/connect/index.html`

- [ ] **Step 1: Add fellowship to the internal sitemap**

In `worker/public/final/sitemap/index.html`, add a `/final/fellowship` entry next to the other connect/serve-family links, matching the existing list markup.

- [ ] **Step 2: Link fellowship from connect and fix the stale external link**

In `worker/public/final/connect/index.html` (~line 151), the button currently points to `https://allsaintsconcord.org/ministry-contacts-directory/` (the OLD live site). Replace that destination with an internal link to `/final/fellowship` labeled "Explore Fellowship & Groups" (or add fellowship as an additional internal link and remove the stale external one). The no-contacts story must be consistent: do not leave a link that sends a candidate to the old WordPress directory.

- [ ] **Step 3: Deploy and verify both links resolve internally**

Run:
```bash
cd /Users/varloo/develop/allsaints/worker && npm run deploy 2>&1 | tail -2
curl -sL https://allsaints-redesign.nate-ernst7.workers.dev/final/connect | grep -c "ministry-contacts-directory"
curl -sL https://allsaints-redesign.nate-ernst7.workers.dev/final/sitemap | grep -c "/final/fellowship"
```
Expected: `0` references to the stale directory on connect; `>= 1` fellowship link in the sitemap.

- [ ] **Step 4: Commit**

```bash
cd /Users/varloo/develop/allsaints
git add worker/public/final/sitemap/index.html worker/public/final/connect/index.html
git commit -m "feat(fellowship): link from connect + sitemap, drop stale ministry-directory link"
```

---

### Task 7: Full-page verification (browser + accessibility + responsive)

**Files:**
- No code changes; verification only.

- [ ] **Step 1: Browser checks via Playwright**

Navigate to `https://allsaints-redesign.nate-ernst7.workers.dev/final/fellowship` and evaluate:
- Exactly one `h1`, and the heading outline is h1 -> h2 (section headings) -> h3 (cards) with no skips.
- The group grid is a `ul[role=list]` with 3 `li.involved-card`.
- All three CTA/links resolve: `mailto:` present; `/final/connect` link present.
- The reveal animation does not leave content permanently hidden (scroll to bottom, confirm cards are visible, `opacity:1`).
- Console has no errors other than the known `/favicon.ico` 404.

Expected: all true.

- [ ] **Step 2: Responsive check**

Resize to 390px width and confirm the grid collapses to one column, the photo scales, buttons stack, and nothing overflows horizontally. Resize to 1280px and confirm the 3 cards sit in one row.

Expected: no horizontal scroll at 390px; 3-up at desktop.

- [ ] **Step 3: Contrast spot-check**

Confirm no gold (`#c8a977`) is used as text color anywhere in the page's inline styles:
```bash
grep -i "c8a977" worker/public/final/fellowship/index.html
```
Expected: either no output, or only as `border`/accent (never `color:`).

- [ ] **Step 4: Final commit (if any verification fixes were made)**

```bash
cd /Users/varloo/develop/allsaints
git add worker/public/final/fellowship/index.html
git commit -m "fix(fellowship): verification pass (a11y, responsive, contrast)"
```

---

## Deferred / follow-ups (not in this plan)

- **Primetimers card:** add once the committee confirms the group is active (one `<li>` in the Task 4 grid). Tracked in `assets/feedback/committee-questions.md` (item 2).
- **Per-group contacts:** when fresh contact info is confirmed, optionally add a contact line per card. Until then, the office-routing CTA stands.
- **Nav placement:** this plan links fellowship from connect + sitemap. Whether `/final/fellowship` earns a top-nav slot is a separate IA decision (top nav is shared `site.css`/header; changing it touches every page). Defer unless the review group asks for it.
- **Main worship/visit photo audit:** if `fellowship-formation-2026.jpg` reads better elsewhere, revisit during the photo pass.

## Self-review notes

- **Spec coverage:** all nine design decisions map to tasks (lead-with-ethos -> Task 3 ordering; 3 cards/no Primetimers/no Young Adults -> Task 4 + its verify grep; revels -> Task 3; no contacts -> Tasks 5 + verify grep; list markup -> Task 4; no jump-nav -> not built; reveal cycling -> Tasks 3-4; contrast -> Task 7; photo -> Tasks 1/3).
- **No placeholders:** all copy is final and inline; all commands have expected output.
- **Squarespace portability:** no custom JS, no sticky nav, minimal inline CSS, all reuse shared classes. The `role="list"` + `list-style:none` is portable.
