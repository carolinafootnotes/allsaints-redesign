# All Saints' Sitemap Outline — May 2026

**For:** Nate to translate into native Google Slides
**Purpose:** confirm every built page has a home, every triage item has a destination (or RETIRE), surface missing pages a typical Episcopal parish site would have, flag factual issues for a separate lane
**Reviewers:** review group (Chuck, John, Joy Marie, Andrea, Brian) — async via Slides comments
**Format note:** each numbered section below = one Slide. Boxes are pages, arrows are nav/cross-link relationships. Drag rectangles + connectors in Slides.

> **DM note for Nate:** I made autonomous calls on the 3 open questions (giving, watch-live placement, pastoral care). They are marked `> **DM call:**` inline. Spot-rework anything that's off.

---

## Slide 1 — Cover

**Title:** All Saints' Episcopal — Site Map, May 2026
**Subtitle:** Pre-cutover IA, current build → Squarespace 7.1
**Footer:** Reviewers: please leave comments directly on any slide. Sign-off via comment "approved" on Slide 3.

---

## Slide 2 — How to use this deck

For the review group:

1. **Skim Slides 3-9.** Comment on any box that's missing, mislabeled, or in the wrong parent.
2. **Slide 10 (Preserved URLs):** confirm no preserved URLs are missing from the list.
3. **Slide 11 (Possibly missing pages):** vote yes/no/defer on each row by commenting.
4. **Slide 12 (Factual issues):** add a comment on the matching row for any factual error you know about. This is the single reference slide for all factual flags. Reviewers go here, not back to the page slides, to flag factuals.
5. **Sign-off:** comment "approved" on Slide 3 once you're good with the IA. 3 of 5 = locked.

**No meeting required. Async only. Hard stop for IA comments: Mon Jun 1 EOD.**

> **DM note:** Slide 12 was originally specced as a persistent right-side sticky-note column on every page slide. Google Slides doesn't support that pattern cleanly. Single reference slide is the workaround — reviewers click to Slide 12 when they spot a factual issue while reviewing Slides 4-9.

---

## Slide 3 — Top-level IA (one-screen overview)

Single hero diagram. All other slides zoom into a branch.

```
                              [ HOME ]
                                  |
       +----------------+---------+---------+----------------+
       |                |                   |                |
   [ Visit ]      [ Connect ]        [ Happenings ]      [ Give ]
                                                      (standalone, see Slide 9)

   FOOTER ONLY (see footer diagram below):
   [ Rector Search ]  [ Watch Live ]  [ Contact ]  [ Privacy ]  [ Diocese ]
```

**Persistent global header nav:** Home | Visit | Connect | Happenings | Give

**Persistent global footer:**

```
[ Address + Service times ]  [ Contact ]  [ Rector Search ]  [ Watch Live ]
[ Privacy ]  [ Accessibility ]  [ Diocese of NC ]
```

> **DM call — Watch Live placement:** footer-only is intentional. The live stream is a destination for known members (they bookmark or know to look in footer), not a first-time-guest moment. Promote to header only if the review group explicitly prefers it.

> **DM call — Community removed from top-level nav.** The Community page does not exist in the current build (only home, visit, connect, happenings, rector-search, watch-live are built). See Slide 11 — it's filed as "possibly missing — recommend fold into Connect or About, do not build standalone before cutover."

> **DM call — Giving promoted to top-level nav.** See Slide 9 for full reasoning.

**Operational notes for Slide 3 (one-liners):**
- **404 page:** custom 404 with service times + map link + "Plan Your Visit" CTA. Built before cutover.
- **Search:** Squarespace built-in site search in footer. No custom search needed pre-cutover.
- **Mobile nav:** header collapses to hamburger below ~768px. Give CTA stays visible (sticky button or top-right).

**Sign-off comment:** "approved" on this slide = the top-level IA is locked.

---

## Slide 4 — Home (/)

**Purpose:** front door for guests, anchor for returning members

Boxes on the slide:

- **Hero** — Jesus Movement subtitle, primary CTA "Plan Your Visit"
- **Welcome intro** — mission/vision short form ("as God Loves")
- **What to expect this Sunday** — service times, quick visit card → links to Visit
- **Connect strip** — 3 cards: New Here / Get Involved / Give → link to Connect (+ Give)
- **Upcoming Happenings** — 2-3 featured events pulled from Happenings
- **Clergy + staff preview** — small grid → links to Connect (Meet the People section) or About if standalone exists
- **Footer CTA** — Watch Live + Rector Search callout

Connectors: arrows from Home → Visit, Connect, Happenings, Give, Watch Live, Rector Search.

**Audit note for this slide:** flag any home-page block the review group thinks doesn't belong, or any first-time-guest question not answered above the fold.

---

## Slide 5 — Visit (/visit)

**Purpose:** answer "what happens if I show up Sunday?"

Boxes:

- **Service times + address** (with map embed)
- **What to expect** (liturgy walkthrough, communion practice, kids)
- **Accessibility** — parking, entrance, hearing assistance (already correct in current build — induction loop streams to T-coil hearing aids/cochlear implants directly; see Slide 12 sidebar)
- **Kids + families** — nursery, children's chapel, youth
- **What to wear / first-time FAQ**
- **Get directions** — Concord, NC, link to map

Cross-links: → Connect (Get Involved), → Happenings (upcoming services like Holy Week)

**Possible missing page surfaced by audit:** dedicated "Kids & Youth" page if content grows past one section. For now keep as section.

---

## Slide 6 — Connect (/connect)

**Purpose:** convert interested → involved

Boxes:

- **New Here** form / contact card
- **Newcomer pathway** (what happens after you reach out)
- **Meet the people** — clergy, staff, vestry (folds in what would otherwise be a Community page; see Slide 11)
- **Ministries** — small groups, Stephen Ministers (FACTUAL FLAG: active?), Koinonia (FACTUAL FLAG: status), outreach
- **Volunteer** — usher, acolyte, altar guild, choir, hospitality
- **Pastoral care** — short paragraph + contact (see Slide 11; pending human-owner decision)
- **Prayer requests** — must preserve existing URL (memory: project-preserved-urls)
- **Give** — link out to standalone /give (see Slide 9)

Cross-links: → Happenings (where ministries gather), → Give

> **DM call — Community page absorbed into Connect.** The built site has no /community page. Rather than spec a new one mid-stream, fold clergy/staff/vestry/ministries-in-action into Connect's "Meet the people" section. If the review group wants a standalone About/History page, that's Slide 11.

---

## Slide 7 — Happenings (/happenings)

**Purpose:** what's on — services, events, seasons

Boxes:

- **This week** — featured upcoming
- **Recurring** — Sunday services, Wednesday Eucharist, formation hours
- **Seasonal** — Advent, Lent, Holy Week, Pentecost (FACTUAL FLAG: stale events Apr 2, Holy Week 2026 still live; see Slide 12)
- **Special events** — concerts, parish dinners, vestry meetings
- **Calendar embed** — Realm or Google Cal

Cross-links: → Visit (service times), → Watch Live (for streamed events)

---

## Slide 8 — Arboretum (/arboretum/)

**Purpose:** preserved URL — physical QR codes on memorial trees depend on this slug

Boxes:

- **Arboretum landing** — must exist at exact slug `/arboretum/`
- **Memorial tree directory / map**
- **Dedication info**

Cross-links: → Connect (memorial gift/dedication inquiries)

**Audit note:** the Arboretum page itself may not yet be designed in /final. It MUST exist at cutover. Owner: Brian + Joy Marie content sourcing.

---

## Slide 9 — Giving (/give) — DM RECOMMENDATION: STANDALONE AT CUTOVER

**Open question for the review group, framed as a binary:**

**A. Standalone `/give` page at cutover** (DM recommendation)
**B. CTA-on-Connect acceptable at launch; standalone shipped post-launch**

> **DM call — recommend A (standalone at cutover).** Reasons:
> - Stewardship is a top-5 use case for returning members. Cutover is the moment to set the new bar, not retrofit later.
> - Standalone /give gives stewardship narrative + multiple gift methods room to breathe.
> - Dependencies: Brian's Squarespace commerce setup + Realm/EasyTithe integration. If those slip, fall back to B.
> Change to B if the vestry stewardship lead disagrees.

Boxes if A:

- **Stewardship narrative** — short, warm, mission-tied
- **Gift methods** — online (Realm/EasyTithe/Squarespace commerce), text-to-give, mail-a-check, planned giving
- **Pledge form** link
- **Annual report / where gifts go** link
- **Contact for stewardship questions**

Cross-links: header CTA, footer link, Connect callout, Home strip.

---

## Slide 10 — Rector Search (CALLOUT, not a section) (/rector-search)

> **Callout on Slide 3:** Rector Search is a footer link. This section retires post-search; shown here for completeness so reviewers know it exists and can flag content gaps.

Brief box list (no full IA page needed since this section is finite-lifespan):

- **Where we are in the process**
- **Search committee** (do not list Nancy Cox anywhere — memory)
- **Parish profile** download
- **Timeline**
- **Contact for inquiries** (clergy candidates)

Cross-links: → Connect (interim/transitional clergy contact)

---

## Slide 11 — Preserved URLs (cutover-critical)

Not a page; a constraint slide. Lists URLs that MUST survive cutover via exact slug or 301:

- `/arboretum/` — physical QR codes on memorial trees (see Slide 8)
- `/prayer-requests/` (or current slug) — printed material references
- Audit-needed list per memory: `project-preserved-urls`

Action: Phase 7 builds Squarespace URL Mappings cross-checked against this list.

---

## Slide 12 — Pages a typical Episcopal parish site has that we may be missing

Surfaced for review-group judgment. Not commitments. Vote yes/no/defer by commenting on the row.

| Page | Have it? | DM recommendation | Owner / dependency |
|---|---|---|---|
| **Giving** (standalone) | No; CTA only | **Build standalone at cutover** — see Slide 9 | Brian + stewardship lead |
| **Community / About / Our History** | Not built; absorbed into Connect | **Do not build standalone before cutover.** If review group wants it, defer to post-launch (BACKLOG) | Review group vote |
| **Kids & Youth / Formation** | Section on Visit + Connect | Keep as sections; standalone only if content grows | Defer |
| **Pastoral Care** | Not present | **Add as section on Connect at minimum.** Standalone page only if there's a named owner during rector search. **The blocker is human, not IA.** See human question below. | **Review group must name a pastoral care contact during rector search** |
| **Sermons / Podcast** | Watch Live covers video | Decide: separate audio archive? | Defer post-launch unless review group has SME |
| **Diocese / Wider Church** | Footer link only | Footer is enough | — |
| **Weddings / Baptisms / Funerals** | Not present | **Build at cutover.** People Googling "Episcopal wedding Concord NC" are real prospective guests. Fastest IA decision with clearest SEO ROI. | Brian content; clergy review |
| **Calendar (full)** | Embed on Happenings | OK as embed | — |
| **Contact** | Footer + Connect | OK distributed | — |
| **Privacy / Accessibility statement** | Footer | Confirm present at cutover | Brian |

**Human question (blocker for Pastoral Care section):**

> Who is the pastoral care contact during the rector search? Name + phone + email + hours-of-availability. Without this, the section can't ship. Owner: review group decision. Flag as a Slide 12 row, not an IA debate.

---

## Slide 13 — Factual issues (single reference slide)

Not a page. Single reference slide reviewers consult while reviewing Slides 4-10 and comment on directly. Keeps factual lane separate from editorial taste debate.

| # | Issue | Current state | SME / owner |
|---|---|---|---|
| F1 | **Hearing loop vs separate listening device** | **Already correct on /visit** in current build. Induction loop streams directly to T-coil hearing aids/cochlear implants. Note: do NOT regress at cutover. | Brian (cutover QA) |
| F2 | **Stephen Ministers** — active? | Unknown; copy on /connect assumes yes | Joy Marie |
| F3 | **Koinonia status** | Unknown; copy on /connect references it | Joy Marie |
| F4 | **Stale Holy Week / Apr 2 events** on Happenings | Live and stale | Brian |
| F5 | **Service times** — confirm current Sunday + weekday schedule | In build; needs SME sign-off | Brian |
| F6 | **Clergy roles & titles** — Episcopal standard already applied | Recent commit confirms; confirm at review | Chuck / John |
| F7 | **Pastoral care contact during rector search** | Unknown; see Slide 12 | Review group |
| F8 | **Arboretum content** | URL must be preserved; page itself may need build | Brian + Joy Marie |

Reviewers: comment on the row number (e.g., "F2 — Stephen Ministers stopped meeting in 2024") to flag.

---
