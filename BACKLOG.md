# Backlog — All Saints' Website Refresh

Single source of truth for what's left before Squarespace cutover. Edit freely; check items as they ship.

**Status legend:** ☐ open · ⏳ in progress · ✅ done · ⛔ blocked / parked
**Priority:** P1 (cutover blocker) · P2 (should land before cutover) · P3 (nice-to-have)
**Owner:** N (Nate) · G (review group) · V (vestry) · B (Brian, post-handoff)

Live preview: https://allsaints-redesign.nate-ernst7.workers.dev/final

---

## Open decisions for the review group

These came from the sitemap deck (slide 8) and need a yes/no from the group, not implementation.

- [ ] **P1 / G** Tour de Saints sponsorship — keep a sponsorship landing on the church site, or just link out to Joy Marie's standalone TdS site?
- [ ] **P1 / G** Lockhart CDC presence — top-nav link (current), demote to footer, or both?
- [ ] **P2 / G** Vestry photos + bios — today the Vestry page is text-only. Add photos + 1-line bios as part of this refresh?
- [ ] **P2 / G** Arboretum placement — under About > Our Campus, its own page under Connect, or stay top-level?
- [ ] **P3 / G** Sermons archive — add as a Happenings sub-page (with what content source?) or skip until there's a sustainable feed?
- [ ] **P1 / V** Domain switch timing — confirm mid-July target to coincide with rector job posting
- [ ] **P2 / G** Should John Johanssen's bio mention his transition-ministry credential in his clergy card (currently a generic warm bio with no credentials)?

---

## Content audit (v1 vs /final)

From `deliverables/content-audit-v1-vs-final.pdf` — 15 items. Decisions still owed by Nate on most.

### Fast wins (no conflicts, just apply)
- [x] ~~#5 Stats row: replace `2 · Books We Gather Around` with `5 · Music Ensembles`~~ ✅ (Books row removed; stats row now 3-col)
- [x] ~~#7 Serve bento card — rewrite from list fragment to a real sentence~~ ✅ ("Through food drives, Cooperative Christian Ministry…")
- [x] ~~#8 Events heading "Coming Up at All Saints'" → "Life at All Saints'"~~ ✅ REVERSED — Nate prefers "Coming Up" (human-speak); no-op verified, neither heading exists in /final
- [ ] **P2 / N** #10 Clergy bios — DEFERRED to content-approval pipeline (see new workstream below); rewrites need a parishioner A/B/Other selection mechanism
- [x] ~~#12 Ruth Brown bio — fix fragment~~ ✅ ("Produces the bulletin and the Weekly Word, keeping our story flowing week by week.")
- [x] ~~#13 Rector Search duplicate line~~ ✅ verified — no dup on `/final/rector-search`
- [x] ~~#14 Connect CTA body — rewrite per v1~~ ✅ ("worship with us this Sunday, volunteer, join a small group, or simply find community here…")
- [x] ~~#15 Connect bottom button~~ ✅ KEPT as single "Join Us This Sunday" — Nate leans keep; "Support Our Mission" doesn't add a clear action

### To debate at the meeting
- [x] ~~#2 Welcome paragraph 1~~ ✅ ADOPTED v1 hybrid — Nate reversed his earlier "praised copy" defense; new copy: "Whether you are visiting from afar or have lived in Concord your whole life, you are welcome here…"
- [x] ~~#4 Diocese paragraph — Nancy Cox~~ ✅ NO MENTION — Nate is explicit: never propose copy referencing Nancy Cox anywhere on the site (see [[feedback-never-mention-nancy-cox]])
- [x] ~~#11 Staff section heading~~ ✅ H2 → "Our Staff" (eyebrow → "The Team")

### Need user judgment
- [x] ~~#1 Hero subtitle~~ — replaced with Episcopal Church's "Jesus Movement" language ✅
- [x] ~~#3 Add a "first-visit practical info" paragraph~~ ✅ short consolidated paragraph in Welcome block (service times + nursery + accessibility)
- [x] ~~#6 Worship section subtitle~~ ✅ new sub: "Both services are Holy Eucharist, Rite II. One is casual and family-friendly; one is traditional with choir and organ." Heading softened from "Two Services. One Community." → "Two Services, One Community"
- [x] ~~#9 Clergy section heading~~ ✅ Applied standard Episcopal phrasing: H2 → "Meet Our Clergy" (eyebrow "Our Clergy" kept for section scan)

---

## Subpages — still-open polish

### `/final` (home)
- [ ] **P2 / N** Mobile QA on real device — eyeball logo, hero, mission/vision block, worship cards
- [ ] **P3 / N** Confirm the new hero photo pool composition (currently 5 images: exterior, procession-cross, fellowship-formation, 9am-service, altar-blessing). Children's-sermon photo also a candidate for the pool?
- [ ] **P3 / N** "Stay Connected" section vs `/final/connect/stay-connected` — currently a slim social-channels strip on home, full strip on /connect. Acceptable or trim home further?

### `/final/visit`
- [ ] **P3 / N** Sanity-check the Services section dark band against the home worship section — they should be visually identical
- [ ] **P3 / N** Six cards in "Your First Sunday" wrap as 3×2 on desktop. Confirm the grid feels balanced.

### `/final/happenings`
- [ ] **P1 / N** Events content is **stale** (Holy Week, Maundy Thursday Apr 2 — both in the past). Brian or Nate must refresh before launch. Mark as Brian's first content task on Squarespace.
- [ ] **P2 / N** "Weekly Rhythms" section: confirm Tuesday Compline + Wednesday Noonday + Sunday Christian Formation times are still accurate.

### `/final/connect`
- [ ] **P2 / N** Ministry contacts directory link points to current site's PDF. Decide: keep PDF, migrate to a Squarespace page, or both.
- [ ] **P3 / N** Pastoral Care section has 6 cards. Some may be light on real content (Stephen Ministry presence depends on whether All Saints' has trained Stephen Ministers — confirm with Brian).
- [ ] **P3 / N** Koinonia small groups — confirm they're currently active.

### `/final/rector-search`
- [ ] **P3 / N** "A Parish, in Brief" 6-card grid is generic. Decision (Jun 2026): leave the page thin for now. The search committee will supply more parish data and tell us how detailed they want it before the job posting. Revisit then (replace this section with the formal profile or expand with their data).
- [ ] **P2 / V** Search committee contact pattern — currently routes through admin@. Should it route to a dedicated search committee email or a real person?

### `/final/watch-live`
- [ ] **P3 / N** YouTube embed shows the channel's "no live stream" placeholder when not streaming. Acceptable, or do we want a custom "next stream is Sunday 9 AM" message above the player when the stream is offline?
- [ ] **P2 / N** Verify channel ID `UCjE0qt4Lkp2I-nHEFFxVIIg` is correct by streaming a test on Sunday + confirming the embed shows it

---

## Photos & assets

- [x] ~~John Johanssen photo~~ ✅
- [x] ~~Erin Vanasse photo~~ ✅
- [x] ~~9 AM service photo (children's sermon)~~ ✅
- [ ] **P2 / N** Confirm we have current photos for the other 3 ministry team (Brian, Tiffany, Ruth) — currently pulling from `allsaintsconcord.org/wp-content/...`. Need to re-host once we cut DNS or they'll 404 if WP host changes.
- [ ] **P3 / N** Joy Marie has additional photos from Palm Sunday + ongoing shoots. Identify any candidates for the hero pool or section accents.
- [ ] **P3 / N** Consider Vestry photos if vestry bios get added (see Open Decisions).

---

## Accessibility + tech polish

- [ ] **P1 / N** WCAG AA spot-check after all content changes land (use axe DevTools or Lighthouse)
- [ ] **P2 / N** Performance check — current hero photos are 2-6 MB. Squarespace will auto-optimize, but verify on the preview.
- [ ] **P3 / N** No-JS fallback added to `/visit` only. Apply `@media (scripting: none) { .reveal { opacity: 1; transform: none; } }` to all pages.
- [ ] **P3 / N** Test all anchor links (skip-link, hero badges, footer links) with keyboard-only navigation.

---

## Pre-Squarespace migration

- [ ] **P1 / N** Pick the Squarespace 7.1 base template (Build Your Own recommended; see sitemap deck)
- [ ] **P1 / N** Stand up the Squarespace site under a test domain. Choose plan tier (Business minimum for code injection).
- [ ] **P1 / N** Site styles: load color palette + fonts (Cormorant Garamond + DM Sans) into Squarespace site styles
- [ ] **P2 / N** Decide on Squarespace template structure: one Page-Section-Layout per section type, or unique per page?
- [ ] **P2 / B+N** Brian onboarding session — walk through editor, content blocks, image library, Weekly Word block update workflow

---

## Squarespace migration (the cutover itself)

- [ ] **P1 / N** Rebuild home page in Squarespace
- [ ] **P1 / N** Rebuild /visit
- [ ] **P1 / N** Rebuild /happenings
- [ ] **P1 / N** Rebuild /connect
- [ ] **P1 / N** Rebuild /rector-search
- [ ] **P1 / N** Rebuild /watch-live (with YouTube live embed via code injection)
- [ ] **P1 / N** Rebuild /arboretum — **URL must match the existing `/arboretum/` slug** so the printed QR codes on physical signs still work.
- [ ] **P1 / N+B** **Audit ALL preserved URLs** before cutover: pew cards, bulletins, signage in gardens, parking signs, narthex, business cards, mailings, Churchmouse Cookbook. Known so far: `/arboretum/` (memorial-tree QR codes on metal signs), `/prayer/` (printed in pew cards). Catalog every one, then either match the slug exactly in Squarespace (best for QR codes) or set a 301 in URL Mappings (fine for hyperlinks). See `memory/project_preserved_urls.md`.
- [ ] **P1 / N** Physical scan-test at least one QR code per category after DNS cutover, before declaring done.
- [ ] **P1 / N** Rebuild remaining current-site pages we keep (about/clergy/staff/vestry, history, pastoral care subpages)
- [ ] **P1 / N** Set up 301 redirects from old slugs to new (especially `/i-m-new/...`, `/get-help/...`, `/get-involved/...` parent slugs)
- [ ] **P1 / N** Random-on-load hero — code injection in Squarespace (the JS from `/final/index.html`)
- [ ] **P1 / N** Connect "This Week" Weekly Word block to a Brian-editable text block
- [ ] **P2 / N** Set up Realm + Constant Contact integrations / button links
- [ ] **P2 / N** SEO sweep — meta descriptions, OG tags, sitemap.xml, schema markup for church (LocalBusiness or Church schema)
- [ ] **P2 / N** Favicon + apple-touch-icon
- [ ] **P2 / N** Google Search Console verification on the new domain

---

## Cutover day

- [ ] **P1 / N** Final stakeholder sign-off (vestry / review group / Brian)
- [ ] **P1 / N** Snapshot the current `allsaintsconcord.org` content as an archive
- [ ] **P1 / N** Update DNS at registrar (point to Squarespace nameservers or A records)
- [ ] **P1 / N** Verify SSL certificate provisions
- [ ] **P1 / N** Test the printed Arboretum QR codes after DNS propagates
- [ ] **P1 / N** Verify all 301 redirects work (sample 10 old URLs)
- [ ] **P1 / N** Monitor analytics for 404s in the first week; add redirects as needed
- [ ] **P2 / N** Announce the new site to the parish (Weekly Word, Sunday bulletin, social)
- [ ] **P2 / N** Update social profiles (Facebook, Instagram, YouTube about) with the new site URL if anything changed

---

## Post-cutover / out of scope for now

- [ ] **P3 / N** Tear down `/v1`, `/v2`, `/v3` on the Cloudflare worker (keep for 4-6 weeks as a reference)
- [ ] **P3 / N** Tear down `/final` on the Cloudflare worker once Squarespace is the live source of truth
- [ ] **P3 / N** Keep `BACKLOG.md` updated for the first month post-launch with any issues that surface

---

---

## New workstream: Content Approval Pipeline

Surfaced from audit item #10 (clergy bio rewrites). Nate envisions a parishioner-facing approval mechanism that mirrors the NC History Highway audio approval + image selection tools, where reviewers can pick A, B, or "Other (free text)" for copy decisions across the site. Multiple places need this: clergy bios, staff bios, mission/vision language refresh, vestry bios (if added), and any disputed copy.

**Why:** Removes Nate from being the bottleneck on every copy choice, distributes ownership to the people the copy is about (clergy, staff, vestry), and creates an auditable trail of approvals before Squarespace cutover.

**Reference architecture:** NC History Highway pipeline (D1 review website at `image-review.nate-ernst7.workers.dev` + import-approvals skill).

**Status:** Concept captured. Needs a brainstorm session with Nate to scope MVP (which bios first? Approval-only or includes upload? Email vs. Slack reminders? How does approved copy get back into /final?).

**Owner:** N (scope decision), Claude (build once scoped). Not on critical path for July cutover — bios can be approved offline by email if needed.

---

## Header Redesign (May 2026 — applied)

- ✅ Cream-translucent header on home (`rgba(250, 248, 244, 0.85)` + 12px blur), solid cream on subpages (no muddy-pink-over-burgundy)
- ✅ Larger color stacked logo on home hero (92px); horizontal color logo (40px) on scroll/subpages
- ✅ Nav links flipped white → burgundy `#7b2332`; hamburger bars flipped white → burgundy
- ✅ Mobile media query scales home logo down (64px) to keep hero above the fold on iPhone SE
- ✅ Subpages got `<body class="page-subpage">` and CSS override to force solid-cream from top regardless of scroll state
- ⏳ Awaiting Nate's device QA on real mobile + side-by-side comparison vs. previous dark header

---

## Done this session (for memory)

- ✅ 19-item batch one (Watch Live icon, hero overlay, kenBurns removal, logo treatment, type scale, mission/vision swap, em-dash sweep, section reorder, staff heading, street sign size, First Sunday icons, Connect heading, nav cleanup)
- ✅ Photos for John Johanssen + Erin Vanasse + 9 AM children's sermon
- ✅ Clickable hero service badges
- ✅ `/final/visit` rebuilt with v1's content depth (Services / First Sunday / Getting Here / Accessibility / Connect CTA)
- ✅ Visit page redesigned in v3 language after team audit (image-banner Services, light-bg info cards, killed cream box, fixed timeline colors, hero pills, scroll-margin)
- ✅ `/final/happenings` built
- ✅ `/final/connect` built
- ✅ `/final/rector-search` built (promoted from home section to own page)
- ✅ `/final/watch-live` built with embedded YouTube live player
- ✅ Home stripped of duplicate Visit / Events / Community content; replaced with teasers
- ✅ Footer logo swapped to standard (vertical) lockup at 96px across all pages
- ✅ Vision wording: "Loves Like God Loves" → "Loves as God Loves"
- ✅ Nancy Cox removed from rector search section copy
- ✅ Intro: "Episcopal branch of the Jesus Movement" added to Welcome block
- ✅ Hero overlay reverted to v1 values
- ✅ Hero photo pool refreshed (dropped stained-glass, added 9 AM service)
- ✅ Hero subtitle replaced with Episcopal Church's official Jesus Movement language
- ✅ Heading periods stripped from all H1s + relevant H2s
- ✅ "All Saints" → "All Saints'" (apostrophe added in 61 places)
- ✅ "Visitor" → "Guest" everywhere
- ✅ Hearing Loop accessibility copy fix
- ✅ Parking copy: dropped "free" framing
- ✅ Children's sermon photo wired to 9 AM worship card on home + visit
- ✅ Sitemap deck + content audit PDF delivered for the review meeting

## Deliverables

- `deliverables/AllSaints-Sitemap-May2026.pptx` — 9-slide sitemap deck for review group
- `deliverables/content-audit-v1-vs-final.md` + `.pdf` — 15-item content comparison with decision rows
