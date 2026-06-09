# IA Restructure Plan — June 2026

Status: DRAFT for Nate's approval. No implementation until approved (net-new IA shift).
Audience priority: clergy candidates first (through mid-July 2026), review group second.
Platform constraint: Squarespace 7.1 flat nav (folders can't be clickable landing pages).

This plan was produced by a four-lens product-design review (principal product designer, senior UX, Squarespace portability, contrarian) plus a label check against the 18-site Episcopal website study (`internal/research/website-research/_synthesis.md`).

---

## 1. The problem we're solving

The three pages a clergy candidate most wants (Clergy & Staff, Formation & Learning, Our History) are currently footer-only. A candidate has to know to scroll to the footer to find who they'd work with and how the parish forms people. That's friction at the evaluation moment. The fix is to surface an identity section into primary navigation, the way 18/18 vibrant Episcopal parishes do.

Secondary problems: the "Give" nav link skips the parish's own stewardship framing and drops people straight into Realm; the live site's Giving content (estimated giving, Tour de Saints, tax benefits) isn't represented; external links give no signal they leave the site.

---

## 2. Decisions locked (Nate, June 2026)

1. Add an identity section to the top nav, labeled **"About"** (plain language; validated as the single most common label in the 18-site study; "parish" rejected as insider jargon).
2. Top-nav **"Give" points to the on-site `/giving` page** (Realm stays the primary CTA button on that page), so candidates and newcomers get context before the portal.
3. Build it as a real **About hub page** using the existing Connect hub-card pattern (NOT a dropdown folder, which 7.1 can't make a landing page).
4. **Do not rebuild the four WordPress Giving sub-pages.** Enrich the single `/giving` page instead.
5. Produce **two sitemap views** for the review group: clean (page names only) and detailed (with one-line descriptions).
6. Add an **external-link indicator icon** to footer links that leave the site.

---

## 3. Recommended top navigation

Through mid-July 2026 (during the rector search):

```
Visit  |  About  |  Connect  |  Serve  |  Rector Search  |  Give
```

To hold the nav at 6 items, **"What's Happening" moves to the footer** (the "Get Connected" column, first position). Rationale: candidates don't evaluate a parish by its event calendar; members find events in the footer. Clean lifecycle: when Rector Search retires post-cutover, "What's Happening" reclaims that slot:

```
Visit  |  About  |  Connect  |  Serve  |  What's Happening  |  Give   (post-cutover)
```

This is a single label swap in the shared nav, not a rebuild.

### Nav-label defensibility (vs. the 18-site study)

| Item | Field evidence | Verdict |
|---|---|---|
| Visit | 16/18 have a visitor path; "Visit" used at Christ Church Kennesaw, "Plan Your Visit" common | Defensible |
| About | 18/18; most common label in the field | Bulletproof |
| Connect | "CONNECT" (St. Paul's Prosper), "Get Connected" (St. Bart's), "Next Steps" (Incarnation), "Get Involved" (St. Martin's) | Defensible; ours is the cleanest word in the family |
| Serve | "SERVE" is a Connect child at St. Paul's; "Ministries" at Incarnation. Standalone is less common but plain and clear | Defensible, minor note |
| Rector Search | No peer site is mid-search; justified by project purpose + priority audience; temporary | Defensible on its own terms |
| Give | 18/18; "Give" is the most common label | Bulletproof |

### Resolved: the "Worship / Services" norm — Option A (Nate, June 2026)

"Worship / Services" appears in 18/18 peer navs; we have no such item (worship is split across Visit, What's Happening, and Watch & Listen). The study concluded All Saints' visitor issues were "a gap in content, not in IA," but a clergy candidate evaluating liturgy/music style is exactly who looks for a Worship item.

DECISION: Keep the 6-item nav, no dedicated Worship item. Close the content gap by enriching the **Visit** page with worship substance (liturgy, Rite I/II, music) and putting **service times above the fold** (the study's #1 and #2 concrete gaps). Revisit a dedicated Worship item post-cutover. Rationale: keeps the nav lean for the candidate scan while fixing what the study actually flagged.

---

## 4. Complete page map

### Top nav (6 items)
| Page | URL | Notes |
|---|---|---|
| Home | `/` | Logo link |
| Visit | `/visit` | Add worship summary + service times above the fold (study gaps #1, #2) |
| About | `/about` (new) | Hub page, Connect-style cards + a real 2–3 sentence intro |
| Connect | `/connect` | Existing hub (3 cards) |
| Serve | `/serve` | Unchanged |
| Rector Search | `/rector-search` | Retires post-cutover |
| Give | `/giving` | Nav now points here, not directly to Realm |

### About hub children (cards on `/about`, also footer "About" column)
| Page | URL |
|---|---|
| Clergy & Staff | `/clergy` |
| Our History | `/history` |
| Formation & Learning | `/learn` |
| Memorial Arboretum | `/arboretum` (+ 36 tree pages, preserved QR slugs) |

### Connect hub children (unchanged)
New to the Episcopal Church `/connect/episcopalian` · Life Events `/connect/life-events` · Pastoral Care `/connect/pastoral-care`

### Footer-only
What's Happening `/happenings` (now footer, first in "Get Connected") · Watch & Listen `/watch-and-listen` · Prayer Requests `/prayer-requests` · Site Map `/sitemap`

### External (get the new external-link icon)
Give Online → Realm · Lockhart Child Development Center → lockhartcdc.org · Newsletter → Constant Contact · (Diocese link if present)

Nothing is orphaned. Every current page has a home.

---

## 5. Giving page enrichment (no new pages)

Add three sections to `/giving`:
1. **Annual Estimated Giving** — evergreen paragraph on what an estimate of giving is and why the parish asks, plus a Realm pledge link. Written so it stands year-round; one link update per campaign.
2. **Tax benefits** — 3–4 evergreen sentences (contributions are deductible as allowed by law, what records to keep, contact the office). Doubles as a quiet financial-health signal for candidates.
3. **Tour de Saints** — a short callout that cross-links to `/serve` (where the full description lives) and notes sponsorship contact. Not a new page; stays an event on What's Happening when active.

Also: change the nav "Give" target to `/giving` (Realm remains the big gold CTA on the page).

---

## 6. About hub page — the guardrail

The contrarian's valid warning: an About page that is just four link cards is a page a candidate clicks past. The page must open with 2–3 sentences of real parish identity (not a tagline, not corporate boilerplate) before the cards. That intro is the make-or-break, and it's a writing task for Nate / the review group. Draft the intro before building.

---

## 7. External-link indicator

One global CSS rule, scoped to footer text links, targeting external links (e.g. `target="_blank"`), excluding social/icon links and the Give CTA button. Portable to Squarespace as a single Custom CSS rule (`a[target="_blank"]::after { ... }` scoped to the footer). Zero per-link maintenance. Include an accessible cue ("opens in a new tab") for screen readers, not icon-only.

---

## 8. Two sitemap views for the review group

- **Clean:** page names only, grouped Top Nav / About / Connect / Footer / External. The 36 tree pages shown as a single rolled-up line.
- **Detailed:** same tree with one-line descriptions per page.

Both regenerated from the updated `worker/public/sitemap-diagram.html` source (and a clean variant), exported to PNG/PDF for the email.

---

## 9. Implementation sequence (after approval)

1. Draft the About intro copy (Nate / review group input).
2. Build `/about` hub page from the Connect template (the one net-new page).
3. Shared nav: add "About", move "What's Happening" to footer; repoint "Give" → `/giving`.
4. Footer: rename the "Our Parish" column header to "About"; add What's Happening as first link in "Get Connected".
5. Giving page: add the three sections.
6. External-link icon: global CSS rule.
7. Visit page: worship summary + service times above the fold (closes study gaps).
8. Regenerate both sitemap views.
9. Cross-check every page's footer is byte-identical; deploy; report.

Steps 3, 4, 6 are shared-layer edits (propagate once). Step 2 is the only new page.

---

## 10. Risks / open items

- **Worship nav norm** (section 3) — Nate to choose A/B/C.
- **About intro copy** must do real work, or the nav slot is wasted.
- **Realm dependency** — pointing Give at `/giving` adds one click for regular givers; mitigated by a prominent CTA. Realm's own UX is out of our control.
- **What's Happening discoverability** shifts to the Home events strip + footer; keep the Home strip current before major seasons.
- **Footer is per-page duplicated today** — every page's footer needs the column-header + What's Happening change. Verify byte-identical after.
- This is an IA change going to the review group; it is a recommendation pending their input per the review-cycle flow, not a unilateral cutover.
