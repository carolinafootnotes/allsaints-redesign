# Current Site Audit — allsaintsconcord.org → /final

**Generated:** 2026-05-27
**Source:** `https://allsaintsconcord.org/wp-sitemap.xml` (WordPress) + child sitemaps
**Note on domain:** live site is **allsaintsconcord.org** (no hyphen). Earlier plan docs incorrectly used a hyphenated variant; that hostname does not resolve. Correct everywhere going forward.

## Counts

| Bucket | Count |
|---|---|
| Distinct pages in `wp-sitemap-posts-page-1.xml` | 69 |
| Blog posts (`wp-sitemap-posts-post-1.xml`) | ~400 (2015–2026) |
| Sign-up sheets (`dlssus_sheet`) | 4 |
| Category archives | 23 |
| BuddyPress/social pages (activity/members/groups) | 3 |
| **PRESERVE SLUG (P1, physical artifacts depend on it)** | 3 confirmed + audit-needed list |
| **301 REQUIRED (well-known content moving)** | ~20 |
| **RETIRE** | ~430 (mostly blog posts) |
| **MERGE / consolidate** | ~30 |
| **MIGRATE 1:1** | ~10 |

---

## Audit Table — Pages

Disposition keys:
- **PRESERVE SLUG** — slug must remain identical at cutover; physical material or external citation depends on it
- **301 REQUIRED** — old slug must redirect to a new URL; URL appears in bulletins/emails/external links and we expect inbound traffic
- **MIGRATE** — content moves substantially as-is to a new /final URL
- **MERGE → X** — content folds into another /final page as a section
- **RETIRE** — content does not survive cutover (stale, duplicate, no-longer-true, low value)
- **DECIDE** — ambiguous; needs Nate call (see Open questions)

| Current URL | Page Title (inferred) | Disposition | New Location | Notes |
|---|---|---|---|---|
| `/` | Home | MIGRATE | `/final/` | Replaced by Option 3 build |
| `/new-home/` | New Home (staging?) | RETIRE | — | Looks like a prior redesign staging page; confirm w/ Brian |
| `/welcome-from-the-rector/` | Welcome from the Rector | RETIRE | — | Nancy Cox era; do not migrate (memory: never mention Nancy Cox) |
| **VISIT cluster** | | | | |
| `/what-to-expect/` | What to Expect | MERGE → `/final/visit` | "What to Expect" section | Core Visit content |
| `/virtual-tour/` | Virtual Tour | MERGE → `/final/visit` | Optional embed/section | Decide if tour still works |
| `/service-hours/` | Service Hours | MERGE → `/final/visit` | Service times block | Confirm current Sunday + weekday |
| `/interior-1/` | Interior (photo) | RETIRE | — | Orphan media page |
| `/become-a-member/` | Become a Member | MERGE → `/final/connect` | Newcomer pathway | |
| `/contact/` | Contact | MERGE → `/final` footer + `/connect` | Distributed | |
| `/directory/` | Directory | RETIRE | — | Member-only; lives in Realm, not public site |
| **ABOUT / COMMUNITY cluster** | | | | |
| `/history/` | History | DECIDE | `/final/community` section OR standalone | Open question #1 |
| `/mission-vision-and-values/` | Mission, Vision & Values | MERGE → `/final/` | Hero + Welcome intro | Canonical copy already in `/final` |
| `/clergy/` | Clergy | MIGRATE | `/final/community` (Clergy section) | Episcopal-standard headings already applied in `/final` |
| `/staff/` | Staff | MERGE → `/final/community` | Staff section | John + Erin headshots in `/final/assets/staff/` |
| `/vestry/` | Vestry | MERGE → `/final/community` | Vestry section | |
| `/what-is-an-epis/` | What is an Episcopalian? | DECIDE | `/final/visit` FAQ OR standalone | Open question #2 — typical Episcopal-site page |
| **TRANSITION / RECTOR SEARCH cluster** | | | | |
| `/transition/` | Transition | 301 REQUIRED → `/final/rector-search` | | High inbound link likelihood |
| `/transition/interim-position-overview-for-all-saints-episcopal-church/` | Interim Position Overview | 301 REQUIRED → `/final/rector-search` | | |
| `/transition/why-is-an-interim-needed-...` | Why an Interim | MERGE → `/final/rector-search` | FAQ section | |
| **MINISTRIES cluster — currently 1 page each** | | | | |
| `/prayer-teams/` | Prayer Teams | MERGE → `/final/connect` | Ministries list | |
| `/prayer-requests/` | **Prayer Requests** | **PRESERVE SLUG** | `/prayer-requests/` (kept) | **P1** — printed material references (memory: `project_preserved_urls`) |
| `/primetimers/` | PrimeTimers | MERGE → `/final/connect` | Ministries list | Confirm active |
| `/nursery/` | Nursery | MERGE → `/final/visit` | Kids & Families section | |
| `/public-preschool/` | Public Preschool (LCDC) | DECIDE | Standalone or `/final/community`? | LCDC is a real institution; may warrant own page. Open question #3 |
| `/mission/` | Mission | RETIRE (or merge) | — | Duplicates `/mission-vision-and-values/`; pick one |
| `/young-adults/` | Young Adults | MERGE → `/final/connect` | Ministries | Confirm active |
| `/christian-education/` | Christian Education | MERGE → `/final/connect` | Formation/Ministries | |
| `/episcopal-youth/` | Episcopal Youth (EYC) | MERGE → `/final/connect` | Ministries | |
| `/womens-ministry/` | Women's Ministry | MERGE → `/final/connect` | Ministries | |
| `/mens-ministry/` | Men's Ministry | MERGE → `/final/connect` | Ministries | |
| `/parish-life-events/` | Parish Life Events | MERGE → `/final/happenings` | | |
| `/parish-nurses/` | Parish Nurses | MERGE → `/final/connect` | Ministries (pastoral care adjacency) | |
| `/stitches-for-the-saints/` | Stitches for the Saints | MERGE → `/final/connect` | Ministries | Confirm active |
| `/stephen-ministry/` | Stephen Ministry | MERGE → `/final/connect` | Ministries — **FACTUAL FLAG: active?** (Joy Marie SME) |
| `/worship-support/` | Worship Support | MERGE → `/final/connect` | Volunteer (acolyte/altar/choir) | |
| `/pastoral-care/` | **Pastoral Care** | MIGRATE | `/final/pastoral-care` (NEW) | **IA gap** — sitemap-outline.md Slide 11 flagged this as "recommend add"; the page exists today, must not regress. Open question #4 |
| **THREE-VERB cluster (Worship/Serve/etc. + circle pattern)** | | | | |
| `/worship/` | Worship | MERGE → `/final/visit` | Liturgy walkthrough | |
| `/prayer/` | Prayer | MERGE → `/final/connect` | | |
| `/learn/` | Learn | MERGE → `/final/connect` | Formation | |
| `/serve/` | Serve | MERGE → `/final/connect` | Volunteer | |
| `/fellowship/` | Fellowship | MERGE → `/final/connect` | | |
| `/play/` | Play | MERGE → `/final/happenings` | Parish life | |
| `/meals/` | Meals | MERGE → `/final/connect` | Outreach/ministries | |
| `/invite/` | Invite | RETIRE | — | Stale 3-verb framework page |
| `/nurture/` | Nurture | RETIRE | — | Stale 3-verb framework page |
| `/grow/` | Grow | RETIRE | — | Stale 3-verb framework page |
| **OUTREACH cluster** | | | | |
| `/in-the-church/` | In the Church | RETIRE | — | Old taxonomy splash |
| `/in-the-community/` | In the Community | RETIRE | — | Old taxonomy splash |
| `/in-the-world/` | In the World | RETIRE | — | Old taxonomy splash |
| `/night-shelter-meal-ministry/` | Night Shelter Meal Ministry | MERGE → `/final/connect` | Outreach ministry | |
| `/ccm-mac-house-meal-ministry/` | CCM/MAC House Meal Ministry | MERGE → `/final/connect` | Outreach ministry | |
| **EVENTS / SEASONAL cluster** | | | | |
| `/preparing-way-registration/` | Preparing the Way Reg | RETIRE | — | One-off past event |
| `/live-events/` | Live Events | RETIRE | — | Empty/stale |
| `/koinonia/` | Koinonia | DECIDE | `/final/connect` MERGE or RETIRE | **FACTUAL FLAG: status?** (Joy Marie SME). Open question #5 |
| `/after-dark-all-saints-2025/` | After Dark 2025 | RETIRE | — | Past event |
| `/after-dark-all-saints-2026/` | After Dark 2026 | MIGRATE | `/final/happenings` event card | If still upcoming |
| `/adas-media/` | ADAS Media | RETIRE | — | After-dark assets; archive only |
| `/tour-de-saints-2021-sponsorship/` | Tour de Saints 2021 | RETIRE | — | Past event |
| `/set-free-to-serve/` | Set Free to Serve | RETIRE | — | Past capital campaign |
| `/event-payment/` | Event Payment | DECIDE | Keep if commerce flow still used | Brian decision |
| **MEDIA cluster** | | | | |
| `/sermons/` | Sermons | DECIDE | `/final/watch-live` OR standalone `/sermons` | Open question #6 — site has sermon library; sitemap-outline only has Watch Live |
| `/bulletins/` | Bulletins | MIGRATE | `/final/watch-live` (or `/happenings`) | Brian uploads weekly PDFs; needs a home |
| `/important-forms/` | Important Forms | MIGRATE | `/final/connect` (downloads section) | |
| `/photo-gallery/` | Photo Gallery | MERGE → `/final/community` | Photo strip | |
| `/get-the-latest/` | Get the Latest | MERGE → `/final/happenings` | Newsletter signup | |
| **ARBORETUM cluster — P1** | | | | |
| `/arboretum/` | Arboretum | **PRESERVE SLUG** | `/arboretum/` (kept) | **P1** — physical QR codes on memorial trees (memory: `project_arboretum_qr_codes`). NEW page in /final IA. |
| `/jennifer-cobb-memorial-labyrinth/` | Jennifer Cobb Memorial Labyrinth | **PRESERVE SLUG (likely)** | `/jennifer-cobb-memorial-labyrinth/` | Likely physical signage; confirm |
| Memorial-tree pages (~30 — Roger Butler, Mark Robinson, Jane Thomas, etc., all under /name-slug/) | Individual memorials | **PRESERVE SLUG** | Same slugs | Each tree may have its own QR. Treat the whole pattern as preserve until audited. **Open question #7** |
| **MISC / ORPHANS** | | | | |
| `/really-need-talk/` | I Really Need to Talk | DECIDE | `/final/pastoral-care` or `/final/connect` | Pastoral-emergency contact; do not retire silently |
| `/support/` | Support | DECIDE | — | Ambiguous title; needs sampling |
| `/connect/` | Connect | MIGRATE | `/final/connect` | |
| `/life-events/` | Life Events (weddings/funerals) | MIGRATE | `/final/life-events` (NEW) | Sitemap-outline Slide 11 flagged weddings/baptisms/funerals as recommended-add; the page exists. Open question #8 |
| `/online-giving/` | Online Giving | 301 REQUIRED → `/final/give` | NEW `/give` page | Sitemap-outline Slide 11 recommended standalone `/give` |
| `/thank-you/` | Thank You (form confirmation) | MIGRATE | Squarespace form confirmation | Form-system replacement |
| `/texting/` | Texting opt-in | DECIDE | RETIRE if SMS program inactive | |
| `/success/` | Success (form confirmation) | RETIRE | — | Generic form thank-you |
| `/videos/` | Videos | MERGE → `/final/watch-live` | | |
| **BUDDYPRESS / SOCIAL (3)** | | | | |
| `/activity/` | Activity stream | RETIRE | — | BuddyPress; not migrating |
| `/members/` | Members | RETIRE | — | BuddyPress; not migrating |
| `/groups/` | Groups | RETIRE | — | BuddyPress; not migrating |
| **SIGN-UP SHEETS (4)** | | | | |
| `/sheet/coffee-hour/` | Coffee Hour sign-up | DECIDE | Realm/SignUpGenius/Squarespace form? | These are likely actively used by Brian — open question #9 |
| `/sheet/maundy-thursday-prayer-vigil/` | Maundy Thursday Vigil | RETIRE | — | Past event |
| `/sheet/charlotte-grossman-transport/` | Transport sign-up | DECIDE | Pastoral care use case | |
| `/sheet/fred-weber-transport/` | Transport sign-up | DECIDE | Pastoral care use case | |
| **BLOG POSTS** | | | | |
| All ~400 posts in `wp-sitemap-posts-post-1.xml` (2015–2026): sermons, weekly words, stewardship reflections, event recaps, memorial-arboretum posts, etc. | — | RETIRE (default) with carve-outs | — | See "Blog post handling" below |
| **CATEGORY ARCHIVES (23)** | | | | |
| All `/category/*` URLs | — | RETIRE | — | WordPress taxonomy artifacts; Squarespace will generate its own |

---

## Blog post handling (the big bucket)

~400 posts. Wholesale migration is not on the table given the cutover timeline. Proposed default + carve-outs:

- **Default:** RETIRE all blog posts. Do **not** 301 individually.
- **Carve-out A — Memorial Arboretum tree pages (~30):** PRESERVE SLUG as listed above. These are not blog posts in the editorial sense; they are reference pages tied to physical signs.
- **Carve-out B — Annual Reports (`/annual-report-2022/`, `/annual-report-2023/`, `/2024-annual-report/`, `/2025-annual-report/`):** MIGRATE as PDF downloads on `/final/community` or wherever transparency content lives. Don't lose these.
- **Carve-out C — "What is..." evergreen explainers** (`/what-is-an-epis/`, `/what-is-stewardship/`, `/what-is-a-tithe/`, `/what-is-all-saints-day/`): consider migrating as FAQ entries. Brian/Chuck call.
- **Carve-out D — Site-wide 301 on `/blog/*` or post slugs:** OUT OF SCOPE — too many low-value posts. Set up a generic "this page moved" landing for `/category/*` and let WordPress permalinks 404 gracefully.

**Risk:** if any blog post is currently linked from a printed bulletin or external article, we lose that traffic. Mitigation: ask Brian for any URLs he knows are externally cited. (See Open question #10.)

---

## URL Mapping Summary (Squarespace URL Mappings file — preview)

This is the file Phase 7 will produce. Preview of the high-confidence entries:

```
# Squarespace URL Mappings - preview
/arboretum -> /arboretum 301           # PRESERVE - physical QR codes
/prayer-requests -> /prayer-requests 301  # PRESERVE - printed material
/transition -> /rector-search 301
/transition/interim-position-overview-for-all-saints-episcopal-church -> /rector-search 301
/transition/why-is-an-interim-needed-and-what-is-interim-work-content-provide-by-multiple-sources -> /rector-search 301
/online-giving -> /give 301
/sermons -> /watch-live 301             # OR keep /sermons if standalone (Q6)
/bulletins -> /watch-live 301
/clergy -> /community 301
/staff -> /community 301
/vestry -> /community 301
/what-to-expect -> /visit 301
/service-hours -> /visit 301
/become-a-member -> /connect 301
/pastoral-care -> /pastoral-care 301    # if Q4 = add standalone
/life-events -> /life-events 301        # if Q8 = add standalone
# (memorial-tree slugs preserved as-is, ~30 entries)
```

Full mapping file produced in Phase 7.

---

## Open questions for Nate

These are the dispositions I can't lock without your call. None blocks me from moving on — but answers tighten Phase 4 packets.

1. **`/history/`** — fold into `/final/community` as a section, or stand up `/final/about` (or `/final/history`) as its own page? Sitemap-outline Slide 11 flagged this as undecided.
2. **`/what-is-an-epis/`** — FAQ entry on `/final/visit`, or evergreen standalone `/what-is-an-episcopalian`? Typical Episcopal-site SEO play.
3. **`/public-preschool/` (LCDC)** — does LCDC get its own /final page (it's a real institution with its own audience), merge into `/final/community`, or get a standalone microsite? Brian/Joy Marie call.
4. **`/pastoral-care/`** — sitemap-outline Slide 11 said "recommend add". The page exists today. **Confirm we're adding `/final/pastoral-care` to the IA.** If yes, I'll surface it to the UX designer's parallel critique pass.
5. **`/koinonia/`** — factual flag from memory: status unknown. If active, MERGE to Connect. If inactive, RETIRE. Joy Marie SME.
6. **`/sermons/`** — current site has a sermon library + sermon posts. Sitemap-outline only has `/final/watch-live`. **Standalone `/final/sermons` page, or fold into Watch Live?** Affects ~50 sermon posts in the blog bucket.
7. **Memorial-tree pages (~30 individual slugs under `/`)** — should I treat *every* one as PRESERVE SLUG by default, or audit the physical signage first to confirm which trees have QR codes? Safe-default is preserve-all; cheap to do.
8. **`/life-events/`** — page exists today (weddings/baptisms/funerals territory). Sitemap-outline Slide 11 recommended adding these. **Confirm `/final/life-events` as a new IA node.**
9. **Sign-up sheets (`/sheet/*`)** — Brian's tooling. Migrate to Squarespace forms, move to SignUpGenius, or keep the WordPress plugin alive? Affects whether `/sheet/*` URLs need 301s.
10. **Externally-cited blog posts** — can you ask Brian for any blog post URLs he knows are linked from external sites/bulletins/newsletter? Default is RETIRE all blog posts; we need his exception list.

---

## Risks surfaced by this audit

| Risk | Severity | Mitigation |
|---|---|---|
| **Wrong domain in earlier plan docs** — prior plan referenced a hyphenated variant; actual is `allsaintsconcord.org`. Could have caused 301 mapping errors if not caught. | P1 | RESOLVED 2026-05-27 — full sweep across `deliverables/` complete; only this file contained the bad string (in the correction note + this row). Worker code clean. |
| **Memorial-tree slug sprawl** — ~30 personal-name slugs at root level (`/roger-butler/`, `/jane-thomas/`, etc.). If we preserve all, root URL space is noisy in Squarespace nav. If we don't, we risk breaking QR codes. | P1 | Q7 + physical sign audit before cutover |
| **Pastoral Care + Life Events pages exist but aren't in current /final IA** — risk of silently retiring real, valued content. | P1 | Q4 + Q8; surface to senior-ux-designer parallel critique |
| **Sermons content (1 page + ~50 posts)** — large content set with no defined destination in current /final IA. | P2 | Q6 |
| **LCDC preschool** — institution-grade content, audience overlap with parish but distinct constituents (parents). RETIRE/MERGE could anger LCDC stakeholders. | P2 | Q3 |
| **~30 blog posts with "Nancy Cox" in title or authored by her** (e.g. `/a-message-from-the-rev-nancy-cox/`, `/welcome-from-the-rector/`, `/a-reflection-from-rev-nancy-cox/`) | P2 | Default RETIRE aligns with `feedback_never_mention_nancy_cox`. Confirm no carve-outs. |
| **No `/give` page exists today** — only `/online-giving/`. /final IA needs a Give page built (sitemap-outline Slide 11 already flagged). | P2 | Confirm with Phase 1 sitemap sign-off; route to design team |
| **WordPress → Squarespace form/sign-up sheet plugin gap** — `dlssus_sheet` post type is plugin-specific; no Squarespace equivalent. | P2 | Q9 |
| **BuddyPress** (`/activity/`, `/members/`, `/groups/`) likely has no real users but worth confirming before retire. | P3 | Brian quick-check |

---

## What's next (recommended Phase 3+ sequencing)

1. Nate answers Q1–Q10 (or marks "decide later, retire by default").
2. UX designer's parallel sitemap critique returns → reconcile any new IA nodes (pastoral care, life events, give, sermons) with this audit.
3. Brian quick-walks the audit and adds any "this is wrong, that page is actually X" corrections — 30 min async.
4. Phase 7 URL Mappings file generated from this audit's MIGRATE/MERGE/301/PRESERVE rows.
5. Pre-cutover: physical-signage audit at the church (memorial trees, prayer-request cards, bulletin URLs) to confirm preserve list is exhaustive.
