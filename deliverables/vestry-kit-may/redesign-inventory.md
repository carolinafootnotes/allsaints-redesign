# Redesign Inventory — v1, v2, v3

Snapshot of what's currently built in each option, what's real vs. invented, where placeholder icons stand in for photos, photo usage, and Episcopal-tone flags. Research only — no edits.

---

## V1 — "Original" (multi-page: index, visit, happenings, connect)

### A. Sections present

**index.html**
1. Header / nav (Visit, What's Happening, Get Involved, Give)
2. Hero — "All are welcome in this place" + service times bar
3. Welcome — "Come as you are. Stay as family." + Est. 1878 badge + address/phone/parking + Mission/Vision
4. Pillars — Invite / Nurture / Serve / Grow (4-up)
5. Events — 3 cards (Holy Week, Lenten Food Drive, Maundy Thursday Dinner)
6. Newsletter — link to read the latest
7. Clergy — 4-up grid
8. Connect CTA — burgundy band
9. Footer (Explore, For Members, Visit Us, social, doxology rotator)

**visit.html**
1. Page hero — "Plan Your Visit"
2. Service Times — 9 AM Contemporary + 11:10 AM Traditional cards + Tuesday Compline / Wed Noonday Prayer
3. Your First Sunday — Parking / Dress / Kids / First Visit (4-up)
4. Getting Here — address/phone/email + embedded Google Map
5. Accessibility — entrances / large print / hearing assistance
6. Connect CTA + footer

**happenings.html**
1. Page hero — "What's Happening"
2. Featured Events — 6 event cards (Holy Week, Lenten Food Drive, Maundy Thursday Dinner, Maundy Prayer Vigil, Iconography Retreat, Easter Flowers)
3. Weekly Calendar — Sun/Tue/Wed/Thu rhythms + Google Calendar link
4. Newsletter section
5. Worship Resources — 9 AM Bulletin / 11:10 AM Bulletin / Sermon Archive
6. Connect CTA + footer

**connect.html**
1. Page hero — "Get Involved"
2. Worship & Music — 7 ministries (Acolytes, Lectors/Chalice/Intercessors, Altar Guild, Choir of All Saints, Resurrection Choir, Bells of All Saints, St. Nicholas & Junior Choirs)
3. Serve — Stephen Ministry, Pastoral Care, Koinonia, CCM Volunteer Opportunities
4. Learn & Grow — Sunday School, Bible Study, Youth Group (EYC)
5. Clergy & Staff — 4-up with bios
6. Lockhart CDC blurb + link
7. Leadership Transition blurb + link
8. Give CTA + footer

### B. Real vs. invented

- Service times, address, phone, email, social URLs, Realm/Constant Contact/YouTube/Lockhart links: **REAL**
- Mission ("Disciples Making Disciples for Jesus") + Vision ("Loves Like God Loves") + 4 pillars (Invite/Nurture/Serve/Grow): **REAL** (matches site)
- Events (Holy Week, Lenten Food Drive, Maundy Thursday Dinner, Easter Flowers, Iconography Retreat): **REAL** — link to actual allsaintsconcord.org pages
- Clergy names (Rev. John Johanssen, Rev. Jim Bernacki, Rev. Mary Elizabeth Reese, Rev. Vern Cahoon): **REAL**
- Clergy bio paragraphs on connect.html (Ohio native, VTS M.Div., Cornell, Sierra Leone, married to Sandy/Lori, 11 grandkids, etc.): **PARTIALLY INVENTED** — these specifics are not verifiable from the live site's staff page; treat as plausible but unconfirmed
- Worship & Music ministries (Acolytes, Lectors, Altar Guild, Resurrection Choir, Bells, St. Nicholas & Junior Choir): **REAL** — match the live site's named ensembles. "Choir of All Saints" naming is generic but plausible.
- Brian Sapp-Moore call-out (music ministry contact): **REAL**
- Stephen Ministry, Pastoral Care, CCM Volunteer Opportunities: **REAL**
- Koinonia: **likely INVENTED** (not visible on live site nav)
- Sunday School / Bible Study / Youth Group (EYC): **REAL**
- Weekly calendar (Tue Compline 8pm, Wed Noonday 12pm, Bell 6pm, Choir 7pm, F3 Thu 5:30am): **REAL** for Compline/Noonday; rehearsal times **plausible/INVENTED**
- "Leadership Transition" section + Rector Search link: **REAL**
- Worship bulletin URLs (`/worship/contemporary-bulletin/`, `/worship/traditional-bulletin/`): **INVENTED** — these paths don't exist on the live site (live uses `/worship-bulletins/`)

### C. Placeholder icons instead of real photos

**Confirmed: v1 uses generic person-icon SVGs for ALL 4 clergy** — both on index.html (clergy section) and connect.html (Clergy & Staff section). No actual headshot photos. This is the gap reported.

Event card #2 (Lenten Food Drive) and #3 (Maundy Thursday Dinner) on index.html also use SVG icons over a gradient background instead of photos.

### D. Photo usage

v1 references almost no local assets. Files used:
- `allsaints-logo.svg` (local)
- Hero/welcome painting: `https://www.episcopalassetmap.org/sites/default/files/places/2018-09/533150_116858775115805_341560073_n.jpg` (external)
- Holy Week event: `https://allsaintsconcord.org/wp-content/uploads/2026/03/Holy-Week-2026-2-791x1024.jpg` (external)

**No `/assets/` photos used in v1.** This is a content gap — we have 12 local photos available (chapel, altar, labyrinth, exterior, stained glass, choir, bell garden) and v1 uses none of them.

### E. Episcopal-tone scan
- Mostly clean. "Faith community where Jesus' love, forgiveness, and healing is changing lives" (footer + meta description) reads slightly evangelical/non-denominational — uncommon Episcopal phrasing but not wrong.
- "Contemporary Communion" / "Traditional Communion" — Episcopalians more typically say "Eucharist" or just "Holy Eucharist Rite I/II"; v2 and v3 use "Eucharist" correctly.
- "Pastoral Care" / "Stephen Ministry" / "Compline" / "Nave" / "Parish Hall" — all correct Episcopal vocabulary.
- "Disciples Making Disciples for Jesus" — this is the parish's own real mission language, so leave it.

---

## V2 — "Sanctuary" (single-page index.html)

### A. Sections present
1. Header / nav (Worship, Community, Events, Visit, Connect, Give Online)
2. Hero — stained-glass image bg, "All are welcome in this place" + service times + Plan Your Visit / Watch Live CTAs
3. Welcome / About — painting of church + Est. 1878 badge + Mission/Vision
4. Worship — 9 AM Contemporary + 11:10 AM Traditional cards (with photos), plus Weekday Prayer (Tue Compline, Wed Noonday)
5. Community Life — 4 pillars (Invite featured + Nurture/Serve/Grow grid), each with photo + concrete example
6. What's Happening — 4 event cards (Holy Week, Maundy Thursday Dinner, Lenten Food Drive, Easter Flower Memorials)
7. Clergy — 4-up grid with photos and warm short bios
8. Visit — exterior photo + Find Us (address/phone/email) + What to Expect bullets + embedded map
9. Stay Connected — social link grid + Worship Bulletin / Weekly Word weekly cards + newsletter signup
10. Footer with full Episcopal Church logo SVG, columns (Worship/Quick Links/Contact), social, copyright

### B. Real vs. invented
- All service times, address, contact, social, Realm/Lockhart/YouTube/Constant Contact: **REAL**
- Mission/Vision + 4 pillars: **REAL**
- Events: **REAL** (4 events all link to live allsaintsconcord.org URLs)
- Clergy names + roles: **REAL**
- Clergy bios (warm "Fr. John... dry sense of humor", "Fr. Jim... decades of experience", "Mother Mary Elizabeth... thoughtful preacher", "Deacon Vern lives the diaconal call"): **INVENTED but tone-appropriate** — character sketches not verifiable from live site
- Pillar examples (Newcomers' Welcome first Sunday, Sunday School at 10:10 AM between services, Community Kitchen monthly meals, 5 music ensembles): mostly **REAL or close** — 5 ensembles matches live site (Resurrection + 2 adult + handbell + 2 children's); Sunday School time and "first Sunday newcomers' welcome" are **plausibly INVENTED**
- "Two historic churches, born from different eras, found unity in one purpose" hero subtitle: **REAL** historical reference (the 1878/parish-merger story)
- Bulletin link points to `/worship-bulletins/` — **REAL**
- Episcopal Relief & Development reference (Serve pillar): **plausible but not verified** as an active partnership

### C. Placeholder icons instead of real photos
**Verified: v2 uses real headshot URLs for all 4 clergy** pulled from allsaintsconcord.org (`Rev-Jim-Bernacki_glasses_8x10`, `Rev-Mary-Reese_8x10`, `Deacon-Vern-Cahoon_8x10`, plus a 2026 screenshot for Rev. Johanssen). No person-icon placeholders on clergy. Reported claim is correct.

The Grow pillar uses a stylized choir image with a burgundy gradient overlay and "Make a joyful noise" text instead of a clean photo — not a placeholder per se, but a stylized treatment.

### D. Photo usage
Local from `/assets/`:
- `stained-glass-bright.jpg` (hero)
- `church-upscale.jpg` (welcome)
- `altar-close-up.jpg` (Traditional Worship card)
- `labyrinth.jpg` (Invite pillar)
- `chapel.jpg` (Nurture pillar)
- `choir.jpg` (Grow pillar bg)
- `exterior3.jpg` (Visit section)

External (allsaintsconcord.org wp-content):
- `IMG_0942-scaled.jpg` (Contemporary Worship)
- `All-Saints-pic-21-kitchen.jpg` (Serve pillar)
- 4 clergy headshots
- Embedded Google Map iframe

### E. Episcopal-tone scan
- "Two services, one spirit" / "Rite II from the Book of Common Prayer" / "Holy Eucharist" / "Stripping of the Altar" / "Holy Eucharist": all **correctly Episcopal**
- "Fr." / "Mother" honorifics: **correct Episcopal usage**
- "praise music" (Contemporary description): low-Church but acceptable; matches the parish's own contemporary service description
- "the bread and wine are shared with open hands" (welcome): warm and theologically appropriate for Episcopal open-table practice
- No evangelical red flags.

---

## V3 — "Gathering" (single-page index.html)

### A. Sections present
1. Header / nav
2. Hero — stained-glass bg, "Come Home to All Saints" + service badges + Join Us Sunday / Watch Live CTAs
3. Welcome — "A Church That Loves Like God Loves" + 1 John 4:16 quote + 2 paragraphs + stats row (1878, 2 services, 5 ensembles, 10 acres) + 2-image collage
4. Worship — 9 AM Contemporary Eucharist + 11:10 AM Traditional Eucharist (cards with photos) + Tue Compline + Noonday Prayer + Watch Live extras
5. Community Life — bento grid (Invite, Nurture, Serve, Grow, Fellowship — 5 cards with photos) + 4-image photo strip
6. What's Happening — 4 event cards (Holy Week, Maundy Thursday Dinner, Lenten Food Drive, Easter Flower Memorials)
7. This Week — 2 cards (This Sunday's Bulletin + Read the Weekly Word)
8. Clergy — 4-up "Your Pastors" with photos and warm one-liners
9. Visit — exterior photo + map + 4 info cards (Parking/Dress/Kids/Accessible) + "Your First Sunday" 5-step timeline + contact row
10. Stay Connected — Newsletter / Facebook / Instagram / YouTube / Member Portal link grid + final "Join Us This Sunday" CTA
11. Footer with full Episcopal Church logo SVG + columns

### B. Real vs. invented
- All contact, service times, address, social, Realm, Constant Contact: **REAL**
- Mission language ("Invite, Nurture, Serve, Grow"): **REAL**; "Loves Like God Loves" — REAL vision phrase
- Events (4): **REAL**, link to live site
- Clergy names: **REAL**
- Clergy roles in v3 — **PARTIALLY INVENTED/INCORRECT**: v3 lists Rev. Johanssen as "Rector" (he is **Interim Rector**), Bernacki as "Associate Rector" (live site/v1/v2 say "Priest Associate"), Reese as "Assisting Priest" (others say "Priest Associate"). These role labels diverge from the live site and from v1/v2.
- Clergy one-liners (sailing/hiking, Tuesday Compline, eleven grandchildren, nursing-home pastoral care): **INVENTED** character sketches, similar to v2
- Stats: 1878 **REAL**; 2 services **REAL**; 5 music ensembles **REAL**; "10 Acres of Welcome" **INVENTED/unverified**
- Bento descriptions (Daughters of the King, Education for Ministry, Cooperative Christian Ministry): EFM and CCM are **REAL**; "Daughters of the King" not visible on live site nav — **plausibly INVENTED**
- Tuesday Compline time listed as 8:30 PM in v3 (v1, v2, and the live site say 8:00 PM): **factual error**
- Bulletin link points to `/worship-bulletins/`: **REAL**
- Facebook URL in v3 (`facebook.com/AllSaintsConcord`) and Instagram (`/allsaintsconcord/`) and YouTube (`@allsaintsepiscopalconcord4092`) **DIFFER** from v1/v2 URLs (`AllSaintsEpiscopalConcord`, `allsaintsconcordnc`, `@allsaintsepiscopalchurchco9498`). v1/v2 versions are correct; **v3 social URLs are likely broken/INVENTED**.

### C. Placeholder icons instead of real photos
**Verified: v3 uses real headshot URLs for all 4 clergy** (same allsaintsconcord.org wp-content URLs as v2). No person-icon placeholders. Reported claim correct.

### D. Photo usage
Local from `/assets/`:
- `stained-glass-bright.jpg` (hero)
- `church-upscale.jpg` + `stained-glass.jpg` (welcome collage)
- `chapel.jpg` (Traditional Eucharist + Nurture bento)
- `labyrinth.jpg` (Invite bento)
- `bell-garden.jpg` (Fellowship bento)
- `exterior3.jpg` + `stained-glass2.jpg` + `altar-close-up.jpg` (photo strip)
- `exterior.jpg` (Visit section)

External:
- `IMG_0942-scaled.jpg` (Contemporary Eucharist)
- `All-Saints-pic-21-kitchen.jpg` (Serve bento)
- `IMG_1152-scaled.jpg` (Grow bento — music ministry)
- `56527878_...o-773x1030.jpg` (children photo strip)
- 4 clergy headshots
- Embedded Google Map

v3 makes the heaviest use of `/assets/` (8 of 12 local photos referenced).

### E. Episcopal-tone scan
- "Contemporary Eucharist" / "Traditional Eucharist": **correctly Episcopal** (better than v1's "Communion")
- "Your Pastors" section label: **non-Episcopal terminology** — Episcopalians call them "clergy," "priests," "rectors" — not "pastors." This is the strongest tone flag in v3.
- Hero "Rooted in tradition. Alive in the Spirit." — slightly evangelical/charismatic-sounding but not jarring.
- "Holy ground — and you're invited in" (Traditional card): warm, not problematic.
- "The pipe organ swells, ancient words made new" — good Episcopal feel.
- Roles are wrong (see B above) — that's a factual problem more than a tone problem.

---

## Cross-cutting summary

### Sections present in all 3 options
- Header + nav with Give CTA
- Hero with welcome line + service times
- Welcome / Who We Are with mission/vision + Est. 1878
- Sunday Worship description (9 AM + 11:10 AM)
- Pillars / Community Life (Invite, Nurture, Serve, Grow)
- Upcoming Events (Holy Week, Lenten Food Drive, Maundy Thursday Dinner, plus 1+ more)
- Clergy section
- Newsletter / Stay Connected
- Visit info (address, phone, map)
- Footer with social links

### Sections present in only 1 or 2
- **Weekday Prayer (Compline + Noonday) called out explicitly** — v1 visit.html, v2, v3 (in v1 only on visit subpage and happenings calendar; v2 has it inside Worship; v3 has it in Worship extras)
- **Weekly Calendar / regular rhythm** — v1 only (happenings.html)
- **Worship Resources / bulletin links** — v1 (happenings.html) + v2 (Stay Connected weekly cards) + v3 (This Week strip). Three different placements; v1 has wrong URLs.
- **Detailed ministry catalog** (Acolytes, Altar Guild, Stephen Ministry, Sunday School, EYC, Bible Study, etc.) — **v1 only** (connect.html). v2 and v3 reduce these to brief examples inside pillar cards.
- **Clergy bio paragraphs** — v1 connect.html (long-form bios) + v2 (warm 1-2 sentence sketches) + v3 (one-liners). Length descends from v1 → v3.
- **Lockhart CDC dedicated section** — v1 only (footer link in v2/v3)
- **Leadership Transition explanation** — v1 only as a section. v2 implicitly references via Rev. Johanssen's "Interim Rector" title.
- **Accessibility section** — v1 visit.html only as its own section. v2 mentions accessibility as one bullet in Visit; v3 has it as one of the 4 visit cards.
- **First Sunday timeline / "what to expect" walkthrough** — v3 has the most engaging version (5-step timeline). v1 has a 4-card grid. v2 has a bullet list. All three address it.
- **Stats row** — v3 only
- **Bento-style multi-image community section** — v3 only
- **Photo strip** — v3 only
- **Welcome image collage** — v3 only
- **Hero "live events" / livestream prominence** — all three, but v3 makes Watch Live a hero CTA most prominently
- **Newcomer concrete invitation** ("first Sunday after 9 AM coffee") — v2 only

### Content gaps that affect all 3 options

1. **No staff beyond clergy.** Live site lists Erin Vanasse (Administrator), Ruth Brown (Communications Assistant), Tiffany Fulton (Director of Youth & Family Ministries), Leanna Gardner (Lead Youth Advisor), Brian Sapp-Moore (Director of Music), Rachel Grossman-Zack (Lockhart Executive Director). v1 mentions Brian Sapp-Moore once in passing; the others are absent from all three redesigns.
2. **Rector Search Committee is a top-level nav item on the live site** — only v1 surfaces it (as "Leadership Transition" section linking to a single article); v2 and v3 don't explicitly address the active rector search. Vestry-relevant.
3. **"I'm New" / Newcomer landing experience.** Live site has a dedicated "I'm New" nav item; redesigns fold this into Visit/Welcome but don't have a dedicated path.
4. **Get Help** (live site nav: prayer requests, pastoral care, etc.) — only v1's footer surfaces these links; v2/v3 lack a clear pastoral-need entry point.
5. **Sign Ups** as a category — live site has it as nav; redesigns scatter signups across event cards with no central index.
6. **Sermon archive / video library** beyond a single "watch live" link — v1 happenings.html links it; v2/v3 don't dedicate space to past sermons.
7. **Detailed ministry catalog with named contacts** — only v1 connect.html attempts this. v2/v3 deliberately reduce it. If a visitor wants to find Stephen Ministry, EYC, or Altar Guild from v2 or v3, there's no path.
8. **Education for Ministry (EFM), Daughters of the King, and other named formation programs** — v3 mentions them in bento copy but no link or detail; v1 covers most via connect.html; v2 mentions EFM in Nurture pillar text only.
9. **No giving page detail** — all three link directly to onrealm.org. No internal page explains stewardship, planned giving, or the "why" of giving.
10. **The 1878 founding story / two-churches-merged history** — v2's hero subtitle hints at it; none of the three give it a real section.
11. **Worship bulletin URL** — v1 uses invented paths. v2 and v3 use the correct `/worship-bulletins/` page.
12. **Verified clergy biographical detail** — all three options either omit bios (v1 index, v2 short), invent them (v1 connect.html long form, v2 sketches, v3 one-liners), or get titles wrong (v3). None pull from a verified source.
