# Deepen Connect's Fellowship Section (revised)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the genuinely-new group-level content (Men's Ministry, Women's Ministry, Episcopal Youth, and the "revels" tradition) into connect's existing fellowship section, and fix connect's stale Ministry Contacts Directory link. No new page.

**Architecture:** Edit one existing file, `worker/public/final/connect/index.html`. The page already has the shared header, footer, skip-link, reveal/no-JS infrastructure, and `care-grid`/`care-card` pattern, so we reuse all of it and only add cards + fix one link. Verify by deploy + curl + Playwright.

**Tech Stack:** Static HTML in the `/final` global-template system, Cloudflare Workers static hosting (`npm run deploy` in `worker/`).

---

## Why this changed from "new page" to "deepen connect"

The design-team review (2026-06-01) found connect is already the relational hub: it has two "Life Together" sections (`#life-together`, `#fellowship`), a "Fellowship & Hospitality" involved-card, Koinonia, coffee hour, parish dinners, and a "Children & Youth" card. A standalone `/fellowship` page would duplicate it and read as repetitive to a clergy candidate (the priority audience through mid-July 2026). The genuinely-missing content is group-level specificity (Men's, Women's, EYC with real rhythms) and the distinctive "revels" detail. Nate approved deepening connect instead of building a new page.

## Design decisions (settled)

1. **Add four cards to connect's `#fellowship` `care-grid`** (lines ~210–231): Men's Ministry, Women's Ministry, Episcopal Youth (EYC), and The Revels. Match the existing card pattern exactly: an uppercase burgundy "eyebrow" rhythm line, an `<h3>`, and a `<p>`.
2. **No personal contact names.** The 2015 names (Tom Jones, Roxanne Friday, Hilary Smith, Scott Russell) are invalid. Where helpful, route to the parish office in the existing connect voice ("Ask the parish office to connect you"). Do not invent contacts.
3. **Omit Primetimers and Young Adults.** Primetimers' active status is an open committee question; Young Adults was marked Remove. Neither gets a card.
4. **The "revels" gets its own card** (consistent with the care-card pattern; no new CSS). It's the most distinctive content, so it earns a slot rather than a buried sentence.
5. **Women's Ministry card must be specific** (Advent quiet day, Lenten retreat, dessert night), not vague, so it doesn't read thinner than the others.
6. **Fix the stale link.** connect line 151 points "View Ministry Contacts Directory" at the old WordPress site (`https://allsaintsconcord.org/ministry-contacts-directory/`). Replace it with an "Email the Parish Office" mailto CTA, matching the pastoral-care section's CTA pattern (line 197).
7. **Reveal-delay cycles 1-2-3** across the new cards, matching the existing grid.
8. **Reuse `care-card` divs** (don't convert this one grid to `<ul role="list">`; the page's other grids are divs and a half-conversion would be inconsistent). Accessibility is preserved: cards are `h3` under the section's `h2`.

## File structure

- **Modify:** `worker/public/final/connect/index.html`
  - Section `#fellowship` (~lines 210–231): add four `care-card`s to the `care-grid`.
  - Line 151: replace the stale external directory button with a mailto CTA.
- No other files. No new page, no nav change, no sitemap change.

## Final card copy (on-voice, no em dashes, no mic-drop, no personal names)

These match the existing eyebrow + h3 + p structure in the `#fellowship` grid:

- **Episcopal Youth (EYC)** — eyebrow: `Most Wednesday nights, during the school year` — desc: `Youth in grades 6 through 12 and their friends gather from 5:30 to 7:30, dinner included. It's about building real relationships, with each other, with mentors, and with God.`
- **Men's Ministry** — eyebrow: `Saturday mornings, 8:00 to 9:30` — desc: `Book and Bible study in the Welcome Center, hands at parish work days and the community night shelter, plus the F3 crew (Faith, Fitness, Fellowship) already sweating before sunrise on Tuesdays, Thursdays, and Saturdays.`
- **Women's Ministry** — eyebrow: `Throughout the year` — desc: `Fellowship, growth, and service, including an Advent quiet day, a Lenten retreat, and a dessert night.`
- **The Revels** — eyebrow: `After Christmas Eve and Easter` — desc: `When the candlelight of Christmas Eve and the last note of Easter fade, we raise a glass together. We call it the revels.`

---

### Task 1: Add the four cards to connect's fellowship grid

**Files:**
- Modify: `worker/public/final/connect/index.html` (the `care-grid` inside `#fellowship`, currently ending around line 231)

- [ ] **Step 1: Read the exact current grid markup**

Run: `sed -n '210,232p' worker/public/final/connect/index.html`
Confirm the four existing cards (Sunday Coffee Hour, Koinonia Small Groups, Parish Dinners, Stephen Ministry) and the eyebrow `<div style="font-size: 0.8rem; ...">` pattern. The new cards copy this exact structure.

- [ ] **Step 2: Insert the four new cards before the grid's closing `</div>`**

Add these inside the `care-grid`, after the existing Stephen Ministry card (line ~230), continuing the reveal-delay cycle (existing grid ends on delay-1, so continue 2,3,1,2):

```html
          <div class="care-card reveal reveal-delay-2">
            <div style="font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; color: #7b2332; font-weight: 600; margin-bottom: 0.5rem;">Most Wednesday nights, during the school year</div>
            <h3>Episcopal Youth (EYC)</h3>
            <p>Youth in grades 6 through 12 and their friends gather from 5:30 to 7:30, dinner included. It's about building real relationships, with each other, with mentors, and with God.</p>
          </div>
          <div class="care-card reveal reveal-delay-3">
            <div style="font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; color: #7b2332; font-weight: 600; margin-bottom: 0.5rem;">Saturday mornings, 8:00 to 9:30</div>
            <h3>Men's Ministry</h3>
            <p>Book and Bible study in the Welcome Center, hands at parish work days and the community night shelter, plus the F3 crew (Faith, Fitness, Fellowship) already sweating before sunrise on Tuesdays, Thursdays, and Saturdays.</p>
          </div>
          <div class="care-card reveal reveal-delay-1">
            <div style="font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; color: #7b2332; font-weight: 600; margin-bottom: 0.5rem;">Throughout the year</div>
            <h3>Women's Ministry</h3>
            <p>Fellowship, growth, and service, including an Advent quiet day, a Lenten retreat, and a dessert night.</p>
          </div>
          <div class="care-card reveal reveal-delay-2">
            <div style="font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; color: #7b2332; font-weight: 600; margin-bottom: 0.5rem;">After Christmas Eve and Easter</div>
            <h3>The Revels</h3>
            <p>When the candlelight of Christmas Eve and the last note of Easter fade, we raise a glass together. We call it the revels.</p>
          </div>
```

- [ ] **Step 3: Deploy and verify the cards render and no invalid names appear**

Run:
```bash
cd /Users/varloo/develop/allsaints/worker && npm run deploy 2>&1 | tail -2
B="https://allsaints-redesign.nate-ernst7.workers.dev/final/connect"
curl -sL "$B" | grep -o "Episcopal Youth (EYC)\|Men's Ministry\|Women's Ministry\|The Revels" | sort | uniq -c
curl -sL "$B" | grep -io "Tom Jones\|Roxanne\|Hilary\|Scott Russell\|Primetimers\|Young Adults"
```
Expected: one each of the four new headings; ZERO output from the second grep (no invalid names, no Primetimers/Young Adults).

- [ ] **Step 4: Commit**

```bash
cd /Users/varloo/develop/allsaints
git add worker/public/final/connect/index.html
git commit -m "feat(connect): deepen fellowship section with Men's/Women's/EYC + revels"
```

---

### Task 2: Replace the stale Ministry Contacts Directory link

**Files:**
- Modify: `worker/public/final/connect/index.html:151`

- [ ] **Step 1: Replace the button**

At line 151, replace:
```html
          <a href="https://allsaintsconcord.org/ministry-contacts-directory/" target="_blank" rel="noopener" class="btn btn-outline" style="color: #7b2332; border-color: #7b2332;">View Ministry Contacts Directory</a>
```
with:
```html
          <a href="mailto:admin@allsaintsconcord.org?subject=Getting%20Involved%20at%20All%20Saints" class="btn btn-outline" style="color: #7b2332; border-color: #7b2332;">Email the Parish Office</a>
```
(Internal-tone CTA; drops the dead external link and the now-unneeded `target="_blank" rel="noopener"`.)

- [ ] **Step 2: Deploy and verify the stale link is gone**

Run:
```bash
cd /Users/varloo/develop/allsaints/worker && npm run deploy 2>&1 | tail -2
curl -sL https://allsaints-redesign.nate-ernst7.workers.dev/final/connect | grep -c "ministry-contacts-directory"
```
Expected: `0`.

- [ ] **Step 3: Commit**

```bash
cd /Users/varloo/develop/allsaints
git add worker/public/final/connect/index.html
git commit -m "fix(connect): drop stale WordPress ministry-directory link for office mailto"
```

---

### Task 3: Verify the section in a browser

**Files:** none (verification only).

- [ ] **Step 1: Playwright check**

Navigate to `https://allsaints-redesign.nate-ernst7.workers.dev/final/connect` and evaluate:
- The `#fellowship` section now contains 8 `care-card`s (4 existing + 4 new).
- Heading outline is intact: section `h2` ("Finding Your People"), new cards are `h3`.
- The new cards are visible (`opacity:1` after scroll), reveal animation completes.
- No console errors other than the known `/favicon.ico` 404.

Expected: all true.

- [ ] **Step 2: Responsive check**

At 390px the fellowship `care-grid` collapses to one column with no horizontal overflow; at 1280px it's multi-column as before.

Expected: no horizontal scroll at 390px.

---

## Deferred / follow-ups

- **Primetimers card:** add one `care-card` to the `#fellowship` grid once the committee confirms it's active (tracked in `assets/feedback/committee-questions.md`, item 2).
- **"Best Part of Sunday" bento** (connect lines 104–111): the review called its copy vague. Optional future copy tweak to make it specific; left as-is here to keep scope tight.
- **`/final/connect` cutover:** at Squarespace cutover, `/final/*` paths in links become `/*`. Systemic, not unique to this change.
- **Update `assets/feedback/consolidate-targets.md`:** the "one new page (/fellowship)" recommendation is superseded; Men's/Women's/EYC now fold into connect's fellowship section. Note this so the doc doesn't mislead later.

## Self-review notes

- **Scope coverage:** all 8 design decisions map to Tasks 1–3. Group cards + revels (Task 1), no names/no Primetimers/no Young Adults (Task 1 verify grep), Women's specificity (copy block), stale link (Task 2), reveal cycling + care-card reuse (Task 1 markup).
- **No placeholders:** all card copy and the replacement link are literal; all commands have expected output.
- **Build risk:** low. We edit an existing, working page and reuse its established patterns; no new shared CSS/JS, no new page, no nav change.
