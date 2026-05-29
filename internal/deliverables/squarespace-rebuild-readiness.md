---
name: Squarespace rebuild-readiness spec
status: reference for the post-content-approval rebuild phase
date: 2026-05-28
audience: Nate (rebuild + go-live), not the review group
---

# Squarespace 7.1 rebuild-readiness spec

## What this is and when to use it

The `/final/` Cloudflare build is a **private design-and-content approval surface** for Nate and a few church stakeholders. At this stage only design and content matter; the underlying code is throwaway and intentionally not optimized.

This document banks the findings of a six-lens code audit (run 2026-05-28: Squarespace portability, modularity/architecture, accessibility, security, code hygiene, plus a contrarian stress-test) so they are not lost. **Do not act on this against the prototype.** Use it when the design and content are approved and you move to rebuild or import into Squarespace 7.1 (Build Your Own), and again as the pre-go-live correctness check before pointing DNS.

The sequence it supports:
1. Design + content approved on the dev site.
2. Rebuild in Squarespace: build templates, make CSS/JS global, optimized, and simple (Phases 1 to 3 below).
3. Verify the Squarespace code is correct (Phase 4 checklist).
4. Point DNS. That becomes the live site for the parish and rector candidates.

All findings below were verified against the build on 2026-05-28. Numbers are real grep counts.

---

## Phase 1: Global CSS/JS architecture

The core problem the rebuild must solve: in the prototype, each page carries its own ~1,200 to 1,900 line `<style>` block, and roughly 90% of it is identical boilerplate (1,680+ matching lines between any two content pages). There are zero CSS custom properties on the public pages (the palette is hardcoded: `#7b2332` appears 527 times). The 91-line JS block is copy-pasted across 19 pages in 5 drifted variants. None of this should be reproduced. Build it once, global.

### 1a. One global header code-injection block

**Layer 1: tokens (~20 lines).** This is the single highest-value change. A palette or type change becomes one edit.

```css
:root {
  --burgundy: #7b2332;
  --burgundy-deep: #5e1a28;
  --header-dark: #260609;
  --gold: #c8a977;
  --gold-light: #e8d9a0;
  --cream: #faf8f4;
  --ink: #1a1a1a;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', sans-serif;
  --radius-card: 12px;
  --section-pad: 6rem 1.5rem;
  --z-header: 1000;
  --z-mobile-nav: 999;
  --z-hamburger: 1001;
  --z-skip: 10000;
}
```

**Layer 2: shared system CSS (order matters).** Reset/base, skip link, header+nav+hamburger+mobile-nav, buttons, section helpers, page-hero (subpage), closing CTA strip, footer, scroll-reveal + reduced-motion, focus states, `text-wrap: balance` on headings. Roughly 1,015 lines total, replacing ~18,000 duplicated lines.

**Layer 3: global JS in footer injection (one block, ~88 lines).** The IIFE for header scroll toggle, mobile menu, IntersectionObserver reveal, and anchor smooth-scroll. Clean up while extracting: remove the dead `lastScroll` variable, and fix `.nav-cta` so it does not need its 5 `!important` declarations (give it its own selector before `.nav-links a` rather than fighting inheritance).

### 1b. Per-page code-injection: only page-unique sections

Only CSS for components that exist on exactly one page. Examples: home-only `.hero`/`.welcome`/`.worship`/`.community-bento`/`.stats-row`/`.photo-strip`; visit-only `.getting-here-grid`/`.timeline`/`.service-time-card`; the connect-family `.care-card`/`.involved-card` grids; happenings `.rhythms-grid`/`.event-card`; rector-search and history/lcdc section CSS. Home is the largest per-page block (~600-700 lines); every other page is 200-400 max.

### 1c. Normalize while extracting (drift the prototype accumulated)

- Border-radius is inconsistent (12px x127, but 8/10/14px appear freely). Pin card radius to `--radius-card`.
- `.section-pad` has three different values across pages (6rem, 5rem, plus a 4rem mobile override) and two pointless exact-duplicate re-declarations. One token.
- `font-family` is re-declared 6 to 31 times per page; replace with `var(--font-display)` / `var(--font-body)`.
- The `text-wrap: balance` selector lists redundant items (`.hero-heading` is already an `h1`); three selectors do the work of six.

### 1d. The one architectural decision CSS cannot resolve

The transparent-to-solid-on-scroll header is JavaScript-driven (toggles `.solid`/`.transparent`). Squarespace's native header does not expose that toggle. Either build the header as a custom code-injection header and keep the scroll JS in the footer injection, or drop the transparent-on-load effect and use an always-solid header. Decide at build time.

---

## Phase 2: Templates and Collections

### Reusable section templates (good candidates for Squarespace saved sections)

The card pattern, section pattern (label + em-accent heading + sub + content, alternating cream/white), button styles, pull-quote, the closing CTA strip (appears on 13 pages), and the `.rhythm-card` grid are all coherent and reusable. Build each once as a Squarespace section.

Card grids: the prototype now uses fixed-width centered cards (`repeat(auto-fit, minmax(Npx, Npx))` + `justify-content: center`) so partial last rows center. Reproduce that, or use Squarespace's native column behavior, whichever is simpler in the editor.

### Collections decisions

- **Sermons:** Blog Collection. Each sermon is a post (title, date, clergy, YouTube URL). A Summary Block shows recent ones. Or, lower-effort, just link the YouTube channel and skip an in-site archive. (This overlaps the open sermons-archive question already with the review group.)
- **Happenings events:** Events Collection (or Blog configured as events). Nate creates an item per event instead of editing HTML. The current hardcoded event cards point at old WordPress URLs that 404 after cutover, so they must not be carried over as static HTML.
- **Arboretum: decide the use case BEFORE choosing Collections.** 38 trees, QR codes point at `/arboretum/[slug]` and that slug structure must be preserved. Squarespace Blog Collections have a FIXED schema (title, body, image, date, tags) with no custom fields, so tree species and grove location would live inside body text, not as filterable fields.
  - If the need is "find my loved one's tree" (search by name), a Blog Collection or even a single well-structured page with Ctrl+F is fine.
  - If the need is "browse by grove or species" (filtering/sorting), Collections cannot do it natively and would need a code-injection workaround that is more fragile than the bespoke pages. In that case a single structured directory page may beat a Collection.
  - Do not lump the arboretum in with sermons/events. It gets its own decision.

---

## Phase 3: Interactive pattern portability

From the portability lens. Rating key: NATIVE (a Squarespace block does it), INJECTION (clean custom code, set-and-forget), PROBLEMATIC (won't port cleanly or is ongoing maintenance).

| Pattern | Where | Rating | Plan |
|---|---|---|---|
| Scroll-reactive header (transparent to solid) | all pages | INJECTION | Keep, custom header + footer JS. See 1d. |
| Mobile hamburger / overlay nav | all pages | NATIVE | Drop custom JS, use Squarespace mobile nav. |
| Scroll-reveal animations (.reveal + IO) | 17 pages | INJECTION or NATIVE | Try Squarespace section animations first; inject the IO script only if the stagger is judged essential. |
| Serve in-page jump-nav (2x IO + sticky + footer detect) | serve | PROBLEMATIC | Do NOT port the JS. Keep the wayfinding intent: rebuild as native Squarespace anchor links to sections. (This pattern was added 2026-05-28; the JS is the liability, not the concept.) |
| Smooth scroll w/ header offset | all pages | INJECTION | Keep, retarget the header selector to Squarespace's header. |
| Random hero image on load | home | INJECTION or NATIVE | Prefer Squarespace native background slideshow on the hero; retire the JS. |
| Clergy sticky photo column | clergy | NATIVE | CSS `position: sticky` via Custom CSS; recalibrate `top` to the real header height. |
| Google Maps embed | visit | NATIVE | Use the Squarespace Map block. |
| YouTube live stream embed | watch-and-listen | INJECTION | Code Block (the `live_stream?channel=` URL won't resolve in the Video block). |
| Prayer request form | prayer-requests | NATIVE | Squarespace Form Block. See confidentiality note in Phase 4. |
| Web fonts | all pages | NATIVE | Check the Squarespace font picker for Cormorant Garamond and DM Sans before injecting a `<link>`. |

Net result if followed: the only code Nate hand-maintains after cutover is a small, stable set of injection scripts (header scroll, smooth scroll, YouTube embed) that he never touches again unless the header height or channel changes. Collections content (sermons, events, trees) is created in the editor, no code.

---

## Phase 4: Pre-go-live correctness checklist

Verify before pointing DNS. These are the items that carry into production.

**Security (the review worker, `worker/src/`):**
- Admin key is passed in the URL query string on every admin request (leaks to Cloudflare logs and Referer headers). Move to a signed HttpOnly, Secure, SameSite=Strict session cookie. Files: `review/handlers/admin.js`, `pages_admin.js`, `triage.js`.
- `worker/src/index.js:146` returns raw `err.message` to clients (schema leak). Log server-side, return a generic 500.
- `choice` field in `review/handlers/pages_api.js` is not validated against the block's option allowlist. Validate.
- Note (low): D1 `database_id` is in committed `wrangler.toml`. Not a secret, but if the repo ever goes public it is permanent in history.
- Clean: SQL is parameterized throughout, server output is escaped, no secrets committed, reviewer endpoints are assignment-scoped. No exploitable issue today.

**Prayer form confidentiality (highest-sensitivity flow):**
- The public-vs-confidential radio must be enforced SERVER-side, not just client-side. A confidential request must be routed/stored separately, never on a list that could be read aloud Sunday. Use HTTPS POST only (never GET). Add spam protection.

**Static site:**
- `rel="noopener"` to `rel="noopener noreferrer"` on all external links (197 occurrences).
- Rewrite the 359 `/final/` path references to real domain paths. Re-point all `/assets/...` image srcs to Squarespace media. Fix the one relative link (`href="index.html"` on the home logo) and the one relative image (`../assets/stained-glass.jpg`).
- Remove/redirect the two internal pages from public reach: `serve-options` (title "Outreach options" with an em dash, internal notes) and `sitemap` (title "Pages to Review"). At minimum `noindex`.
- Page-specific meta descriptions: 4 pages (connect, happenings, rector-search, visit) currently share the home page's generic description. Rector-search especially matters for clergy candidates.
- Add a favicon and Open Graph tags (none exist site-wide). OG matters for how rector-search and home look when shared.
- Tighten iframe hardening: add `sandbox` to the YouTube embed; set the Maps embed `referrerpolicy` to `strict-origin-when-cross-origin`.

**Accessibility pass (WCAG 2.1 AA):**
- Mobile nav: trap focus when open (set `inert` on `<main>`/`<footer>`, manage it inside the toggle so it is removed on close-by-link too) and return focus to the hamburger on close.
- Hamburger touch target is ~28px; raise to 44x44px (matters for older parishioners).
- Add `aria-current="page"` to the active link in the primary and mobile nav on each page.
- Promote fake-heading `<div>`s to real headings: "Give through Realm" (giving), the giving service-tier labels, and the lcdc sections need `aria-label`s.
- Replace `&middot;` separators in meaningful text with commas or aria-hidden spans.
- The memorial-tree template (cloned ~38x) is missing the `@media (prefers-reduced-motion: reduce)` guard for `scroll-behavior`. Fix in the template.
- Clean and passing already: skip links, single h1 per page, focus-visible outline, decorative-image alt handling, hamburger ARIA state, landmark structure. Carry these patterns forward.

---

## Discard: do NOT carry forward or track

These are prototype-only artifacts that evaporate in the rebuild. Tracking them is wasted effort.
- ~100 dead CSS rules per page (home-only `.hero`/`.welcome`/`.worship` carried by 10 subpages, `.photo-strip` on 13, etc.).
- 527 hardcoded color hexes (replaced by tokens in Phase 1).
- The 5 drifted copies of the JS block (replaced by one global block).
- The standalone per-page `<style>` blocks themselves.

---

## Open decisions to resolve at rebuild

1. Arboretum: find-by-name vs browse-by-grove/species (drives Collection vs single structured page). See Phase 2.
2. Sermons archive: full Collection, recent-5 list, or just link YouTube (already an open question with the review group).
3. Header: keep the transparent-to-solid scroll effect (custom header + JS) or go always-solid (simpler). See 1d.
4. Reveal animations: native Squarespace section animations vs the injected per-element stagger.
