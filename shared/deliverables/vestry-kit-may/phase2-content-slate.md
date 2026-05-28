# Phase 2 — Locked Content Slate for v1 / v2 / v3

**Purpose.** Single decision-ready document that defines exactly what content appears on each redesign option after the refresh. Once the product design team signs off on this slate, Phase 3 implementation runs against it without further consensus-building.

**Hard guardrails (do not violate in Phase 3):**
- No design changes — layout, type, color, visual direction LOCKED on each option
- Three options stay visibly distinct after this work
- Existing redesign copy was praised — preserve voice; only edit where genuinely off-tone or factually wrong
- No invented people, programs, dates, numbers
- No explicit LGBTQ language (use the existing "wherever you are on your journey" framing as the welcome — per user direction, conservative area)
- Don't name Hymnal 1982 (live site says "traditional hymnody")
- Don't add ASA (live site doesn't)
- Use BCP / "the prayer book" naturally where worship is described (live site does)

---

## 1. Information architecture (all three options)

The team validated the 5-item top nav from B2. Refinement: Sermons moves from News → Worship.

**Top nav (5 items):**
1. **About** — Who we are, Clergy, Lay Staff, Vestry, History, Diocese of NC
2. **Worship** — Service times, What to Expect on Sunday, Sermons (curated 6–10), Liturgical seasons
3. **Connect** — Ministries, Formation, Children & Youth, Pastoral Care, Music
4. **Give** — Stewardship, ways to give (Realm), planned giving (replaces 2022 deficit appeal)
5. **Visit** — Plan a visit, address/map, contact, livestream

**Header utility (small, top-right):** Rector Search · Livestream · Give

**Footer:** address, service times, social, **Diocesan line** ("A parish of the Episcopal Diocese of North Carolina · The Rt. Rev. Sam Rodman, Bishop"), copyright

---

## 2. Sections that must appear on every redesign

| # | Section | Current state in redesigns | Content source |
|---|---|---|---|
| 1 | Hero with service times + "What to Expect" link | All 3 have hero; v1 weakest | EXISTING + add /worship/what-to-expect link |
| 2 | "Wherever you are on your journey" welcome | v2 strong; v1/v3 weaker | LIVE SITE `/welcome/` — preserve voice |
| 3 | What to Expect on Sunday (new page + homepage teaser) | NONE has it | DRAFTED → `page-what-to-expect-sunday.md` |
| 4 | Clergy with real photos | v2/v3 have photos; **v1 has icon SVGs** | LIVE SITE bios + headshots from v2/v3 |
| 5 | Lay Staff — content present; treatment determined by each option's existing visual language | NONE has them | LIVE SITE `/staff/` — 4 people (see §7); each redesign absorbs them in its own pattern (no slate-prescribed layout) |
| 6 | Ministries overview (Outreach, Pastoral Care, Music, Formation, Children & Youth) | v1 has detail; v2/v3 lighter | LIVE SITE — keep real names: Stephen Ministry, Stitches, Meal Ministry, Eucharistic Visitors, EfM, Lockhart CDC, Acolytes, Altar Guild, the 5 named music ensembles |
| 7 | Music program (5 named ensembles inc. children's choirs using Orff-Schulwerk) | v2/v3 light mention; v1 has detail | LIVE SITE — name them honestly |
| 8 | Children & Youth (currently buried 3 clicks deep) | None surfaces it well | LIVE SITE — promote it |
| 9 | History (1878 merger of two churches; through 2025 retirement) | None tells it well; live site stops at 2014 | LIVE SITE + 60-word bridge (see §11) |
| 10 | Rector Search — header utility + homepage section + sub-page | NONE has it | DRAFTED → `page-rector-search.md` |
| 11 | Diocese of NC affiliation line + Bishop Rodman | NONE has it | TERMINOLOGY REF |
| 12 | Give — replace 2022 deficit appeal page | All 3 link to OnRealm but no narrative page | DRAFTED → `page-giving.md` |
| 13 | Livestream link (Facebook + YouTube) — verify URLs match live site | v3 has wrong URLs | LIVE SITE — correct in v3 |
| 14 | Sermons (curated 6–10 in-site) | None has sermon archive | LIVE SITE / YouTube — curate 6–10 |
| 15 | Footer with diocesan line | All 3 weak | NEW |
| 16 | /about identity statement (2–4 sentences) — "Who we are" framing | Not currently surfaced anywhere | NEW (drafted below in §9) |

---

## 3. Per-option to-do list

### v1 (Original) — multi-page

**Critical (do first):**
- Replace 4 person-icon SVG clergy placeholders with real headshots (pull from v2/v3, which already use them) — five-minute fix per team
- Apply Episcopal terminology pass — flagged "Communion" in headers (should be "Eucharist" / "Holy Communion" depending on context); minor
- Fix invented bulletin paths (`/worship/contemporary-bulletin/`) — replace with the working live-site link

**Add (per slate):**
- Section/page: Lay Staff
- Section/page: What to Expect on Sunday
- Header utility link: Rector Search
- Homepage section: Rector Search status (1 paragraph + link)
- Footer: diocesan line + Bishop Rodman
- Selectively: 4 photo swaps + 5 additions from photo-inventory

**Preserve (do not change):**
- The multi-page structure (it's part of v1's identity as the "clean refresh")
- The detailed Acolytes / Stephen Ministry / Choirs catalog on `connect.html` (it's a strength)
- All page typography, color, spacing, and navigation pattern

### v2 (Sanctuary) — single-scroll

**Critical (do first):**
- Apply Episcopal terminology pass — already cleanest of the three; spot fixes only
- Verify the existing 9:00/11:10 service description matches live site
- Verify clergy bios as drafted are factually true (interim role, VTS, etc.) — adjust per `B1b-rector-candidate-lens.md` real content list

**Add (per slate):**
- Section: Lay Staff (compact, headshots + 1-liner)
- Section/anchor: What to Expect on Sunday (or link to sub-page)
- Header utility link: Rector Search
- Homepage section: Rector Search (1 paragraph + link)
- Footer: diocesan line
- Selectively: 4 photo swaps + 5 additions from photo-inventory
- Restore the 5 named music ensembles in Music section (currently light)
- Promote Children & Youth to a visible section

**Preserve (do not change):**
- Stained-glass-led visual hierarchy
- Single-scroll storytelling rhythm
- The praised copy — only correct, don't rewrite
- Cormorant Garamond + DM Sans + burgundy/cream/gold palette

### v3 (Gathering) — bento + community-led

**Critical (do first — these are bugs):**
- "Your Pastors" → "Our Clergy"
- Three clergy roles wrong (Rector vs Interim Rector, Associate Rector vs Priest Associate, Assisting Priest vs Priest Associate) — correct against live-site bios
- Compline time 8:30 PM → 8:00 PM (live site says 8:00)
- Social URLs (Facebook / Instagram / YouTube) differ from v1/v2 and live site — replace with the working live-site URLs
- "10 Acres of Welcome" stat unverified — either confirm with user or remove

**Add (per slate):**
- Section: Lay Staff (fits the bento aesthetic — headshots + role)
- Section/anchor: What to Expect on Sunday
- Header utility link: Rector Search
- Homepage section: Rector Search
- Footer: diocesan line
- Selectively: 4 photo swaps + 5 additions from photo-inventory
- Add the 5 named music ensembles inside the existing music section
- Promote Children & Youth as a bento card

**Preserve (do not change):**
- Bento layout pattern
- Photo-strip sections
- Stats row (after verifying / removing the 10 acres stat)
- The "Your First Sunday" 5-step timeline
- The praised copy

---

## 4. Photo work (final list — conservative per user direction)

### Swaps (4)
| Replace | With | Reason | Used in |
|---|---|---|---|
| `assets/exterior.jpg` | `~/Dropbox/All Saints' Campus_2026/All Saints Campus_3-19-26_001.jpg` | Pro shot, blue sky, dogwoods, full campus | All 3 hero/exterior |
| `assets/chapel.jpg` | `~/Dropbox/All Saints' Services_2026/All Saints Services_2026_020.jpg` | Worship in motion vs. empty pews | v2/v3 worship sections |
| `assets/choir.jpg` | `~/Dropbox/All Saints' Choir_2026/All Saints Choir_2026_005.jpg` (or _009.jpg) | Current has organist's back dominating frame | v2/v3 music sections |
| `assets/stained-glass-bright.jpg` | `~/Dropbox/All Saints' Campus_2026/All Saints Campus_3-19-26_011.jpg` | Current is rotated 90° / unusable | v2/v3 stained-glass moments |

### Additions (5)
| Image | Use | Note |
|---|---|---|
| Organist hands close-up (Choir folder, TBD specific file) | v3 music bento card | Texture moment |
| Adult-forum fellowship (TBD) | Formation section | Shows real life |
| Outdoor procession with cross (TBD) | Worship/liturgical-life moment | Distinctly Episcopal |
| Street sign at golden hour (TBD) | Visit/contact section | Sense of place |
| Columbarium plaque (TBD) | History/parish life | Evergreen depth |

### Defer (deeper review needed)
- 18 unviewed Services photos — likely 2–3 more standouts
- 10 unviewed Campus photos — likely 1–2 more standouts
- Specific files for the 5 additions need final selection in Phase 3

### Drop
- `assets/church-upscale.jpg` (it's a painting) — deprecate

---

## 5. Episcopal terminology pass (specific edits)

Apply across all three options where occurring:

| Wrong / off-tone | Correct |
|---|---|
| "Pastor" / "Pastors" / "Your Pastors" | "Clergy" / "Our Clergy" / "The Rev." or "Mother/Father" honorifics |
| "Communion" (header / formal) | "Holy Eucharist" / "Eucharist" (formal) — "Holy Communion" OK in casual |
| "Sanctuary" used to mean the worship space generally | "Nave" for the seating space; "Sanctuary" only for the area around the altar (verify clergy preference; live site uses "Sanctuary" loosely so this may be OK) |
| "Service" used as a verb form for worship | OK in nav ("Service Times"); use "liturgy" / "Eucharist" in body copy where specific |
| "Pastor John" / "Pastor X" | "Fr. John" / "Mother [name]" / "The Rev. [name]" |
| Generic "Sunday school" | "Christian formation" / "formation" (with "Sunday school" as a parenthetical for clarity if needed) |

Reference: `episcopal-terminology-reference.md` for the full list.

---

## 6. Vestry-reveal annotation

Per team feedback: when the updated redesigns are revealed, **annotate the diff** so the vestry doesn't accidentally credit v3 with new accuracy after we silently fix its three bugs. The choice should still feel like *design direction*, not *content*.

Suggested annotation: a short "What changed across all three" note shown above the redesign URLs at the next reveal, listing: (a) clergy photos restored across all three, (b) Episcopal terminology corrected, (c) Rector Search added across all three, (d) v3 factual fixes, (e) selective photo refresh.

---

## 7. VERIFY items — RESOLVED

User answered all blocking VERIFY items via live-site checks on May 2, 2026.

**Resolved — apply in Phase 3:**
- **Lay staff list** (4 people, per live-site `/staff/`): Erin Vanasse (Administrator); Ruth Brown (Communications Assistant); Tiffany Fulton, MSA (Director of Youth & Family Ministries); Brian Sapp-Moore, MM (Director of Music & Coordinator of Communications)
- **Communion phrasing** (per live-site `/what-to-expect/`): *"all who love God and are drawn to Christ are welcome at Christ's table"* — fully open, use verbatim
- **Rector Search**: all 4 candidate URLs return 404 on the live site; no public search content exists. Treatment = no committee surfacing; B3 draft is the only content source. Lifecycle-aware copy ships as new
- **Fr. John email**: route via `admin@allsaintsconcord.org` — clergy page already does this. Don't surface personal email
- **"10 Acres of Welcome"** stat in v3: REMOVE
- **History 2014→2025**: do not update; keep live-site content as-is
- **"Sanctuary" → "Nave"**: in body copy describing the seating area / liturgical walkthrough. Keep "Sanctuary" where it refers casually to the building/space (live site uses it loosely).
- **Convocation**: omit (not surfaced on live site; user uncertain)
- **Parish profile / OTM**: omit (not surfaced on live site; user uncertain)
- **Sermons curation**: pull newest 6–10 from YouTube channel in Phase 3

**Deferred to Phase 3 cleanup (not slate-blocking):**
- Last-updated date stamp on Rector Search page (use Phase 3 ship date)
- Accessibility detail in "What to Expect" (mark `[VERIFY]` in shipped copy if not on live site)
- Parking specifics, nursery hours (use live-site content where available; mark gaps)
- Restore B3's draft, but with: no committee roster, no speculative status examples

---

## 8. /about identity statement — draft

A 2–4 sentence "Who we are" statement that runs at the top of /about (and as a homepage opening on at least one option). Drafted from B1b's research — using only what's true and surfaced on the live site. Phase 3 includes this as part of Section #16 of the slate.

> **All Saints' Episcopal Church has been a parish of the Episcopal Diocese of North Carolina in Concord since 1878 — formed from the merger of two earlier congregations. We worship in the Anglican tradition through the Book of Common Prayer, gather in song through five named music ensembles, and serve our neighbors through partnerships including Lockhart Child Development Center. All are welcome here — wherever you are on your journey.**

(Edit freely. The statement can be split across two paragraphs for breathing room in v2's typography or kept as one block in v1/v3.)

## 9. Phase 3 risk-mitigation notes (from Phase 2 team review)

- **Fr. John email**: route via `admin@allsaintsconcord.org` only. Do not surface a personal email address that may have a typo on the live site.
- **Lay Staff layout**: each redesign integrates them in its own visual pattern. Don't impose a slate-level layout choice that violates "no design changes."
- **Photo plan addition (#6)**: include a Fr. John presiding/preaching shot if a usable one exists in the Services folder (livestream still capture acceptable). Phase 3 photo agent should sample the unviewed 18 services photos for this specifically.
- **Children-in-formation photo gap**: still unmet. Flag for a future shoot; ship without if no good frame exists in current pools.
- **Vestry-reveal annotation**: include in the "what changed across all three" note that v3's three factual fixes were applied silently — frame the choice as design direction, not content.
- **Realm giving URL**: pull the actual URL from current site before Phase 3 commits the Giving page.

## 11. History bridge — locked copy

To append after the existing live-site history content (which ends in 2014):

> The Rev. Nancy Cox served as rector through 2025; she retired at year's end. The Rev. John Johanssen began as Interim Rector on January 1, 2026. The vestry's search for our next rector is now underway.

(60 words. Phase 3 inserts this verbatim wherever History is surfaced. [VERIFY: Nancy Cox honorific and exact tenure dates — confirm before publish.])

## 10. Phase 3 sequencing

When this slate is approved:

1. v1 first (most work — clergy photos + new sections)
2. v3 second (bug fixes + new sections)
3. v2 third (lightest touch — already in good shape)
4. Deploy to `allsaints-redesign.nate-ernst7.workers.dev` for the vestry reveal
5. Side-by-side "what changed" summary

---

*Slate produced as Phase 2 deliverable, based on Phase 1 research (`B1b-rector-candidate-lens.md`, `episcopal-terminology-reference.md`, `redesign-inventory.md`, `photo-inventory-and-swaps.md`) and the Phase 1 team review (`phase1-team-review.md`). Pending Phase 2 product design team sign-off before implementation begins.*
