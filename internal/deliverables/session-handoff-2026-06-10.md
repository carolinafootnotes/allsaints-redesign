# Session handoff — 2026-06-10

Pick this up in a fresh session. Live preview: https://allsaints-redesign.nate-ernst7.workers.dev/final
Simple site map (published): https://allsaints-redesign.nate-ernst7.workers.dev/site-map

## Done this session (shipped + deployed)
- New IA live and lock-step with the site map: top nav **Visit · About · Connect · Serve · Rector Search · Give**, with **dropdown menus** on About and Connect (native Squarespace folder behavior).
- New **/final/about** hub page.
- **Give** points to the on-site /giving page (Realm stays the CTA there).
- **What's Happening** moved to the footer.
- **Giving** page enriched: estimate of giving, tax benefits, Tour de Saints (copy grounded in the parish's own WordPress text).
- Simple site map **published at /site-map** (utilitarian, noindex).
- Cover-note draft for the review group: `internal/deliverables/review-group-sitemap-note-draft.md`.

## IMPORTANT framing for next session
**Do NOT spend time on prototype code quality or accessibility internals.** The portability review confirmed the dropdown CSS/JS, the external-link icon, and the nav button styling are all throwaway, Squarespace 7.1 native folders rebuild them and bring their own accessibility. Code-level a11y (aria-*, focus management, keyboard handling) is moot at rebuild. Focus only on what survives: **content, IA decisions, and the Squarespace build checklist.**

## What's left — only things that survive the rebuild

### Content (fix before sending to the group / before cutover)
- [ ] **Home page shows stale events** (Holy Week / Easter / Maundy Thursday, March–April) in June. Looks unmaintained. Update to current events or swap the dated cards for the evergreen "See What's Coming Up" button. `worker/public/final/index.html` (~line 900).
- [ ] **Three hero images are WordPress hotlinks** (`allsaintsconcord.org/wp-content/.../All-Saints-pic-21-kitchen.jpg`) and break at cutover. Swap to local `/assets/2026/*` images (pool: exterior, procession-cross, fellowship-formation, altar-blessing, choir-row, etc.). Files: `clergy/index.html:217`, `history/index.html:254`, `serve/index.html:143`. (Pick images with a design eye.)
- [ ] **Clergy page is missing Mary Reese and Vern Cahoon** — they appear on the home clergy strip but have no entry on /clergy. Add at least brief entries. (Web-sized photos already exist in `worker/public/assets/staff/`.)
- [ ] **Fr. John Johanssen's bio is thin** vs. Fr. Jim's. Needs Fr. John's input (not a solo fix).
- [ ] **Rector Search meta description is wrong** — it's verbatim home-page copy ("Join us for worship Sundays at 9AM and 11AM"). Give it its own description about the search. `rector-search/index.html:8`.
- [ ] **Rector Search "full parish profile is being prepared" placeholder** — resolve before the mid-July posting (real link, a date, or remove). Highest-stakes text for the priority audience.

### IA tweaks (carry over to Squarespace)
- [ ] **About/Connect dropdown first item is named the same as the button** ("About" → "About"). Rename the first dropdown item to "Overview" (or "About All Saints'") to remove the duplicate-label confusion. Same option on Connect.
- [ ] **Footer "About" column doesn't list the /about hub** — add "About All Saints'" as its first link.
- [ ] **Watch & Listen and What's Happening are invisible to a clergy candidate** (footer-only). Add links to both from the Rector Search "for clergy" section at minimum.

### Open decisions (Nate / review group, not edits)
- [ ] **Parish-at-a-glance** block on Rector Search (avg Sunday attendance, rough budget, staff FTE)? Standard in Episcopal parish profiles; candidates can't assess fit without it.
- [ ] **About intro voice** — the UX/PD reviews want more distinctive parish character than the current generic intro, but the standing instruction is "use only existing copy." Reconcile: pull a stronger, real sentence from the parish's own materials rather than inventing one.
- [ ] **In-site /final/sitemap page** stays audience-organized vs. mirrors the new nav. (Skipped this session per Nate.)
- [ ] **Send the cover note** to the review group (human gate; draft is ready).

## Squarespace 7.1 pre-build checklist (from the portability review)
- **/connect/* child slugs flatten**: `/connect/episcopalian`, `/connect/life-events`, `/connect/pastoral-care` become `/episcopalian`, `/life-events`, `/pastoral-care`. Add 3 URL Mappings and update the footer + Connect hub-card links. (None are preserved URLs, so safe.)
- **About/Connect = native Folders**: folder label is not clickable; put the overview page as the first item inside the folder. No code.
- **"Give" nav button**: re-create `.nav-cta` styling with one Custom CSS rule targeting the Give nav link by href.
- **External-link ↗ icon**: the masked-SVG CSS is portable, but the `.footer-col a[target="_blank"]` selector must be re-pointed to Squarespace's actual footer DOM at build (5-min DevTools check).
- **/site-map**: rebuild as a Code Block paste or native page; set "Disable indexing" in SEO.
- Everything else (dropdown CSS/JS) is discarded, replaced by native folders.

## Team verdict
Principal PD: **SHIP WITH FIXES.** The IA is sound, the About-as-dropdown call holds (Rector Search is top-level and one click away). The blockers are the content items above, not structure.
