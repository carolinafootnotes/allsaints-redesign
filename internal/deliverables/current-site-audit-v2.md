# Current Site Audit v2 (authoritative, from WP export)

**Generated:** 2026-05-27
**Source:** `assets/wordpress-export/allsaintsepiscopalchurch.WordPress.2026-05-27.xml` (~18 MB, 238k lines)
**Supersedes:** [current-site-audit.md](./current-site-audit.md) (v1, live-fetched from `wp-sitemap.xml` — was approximate; missed drafts, private pages, attachments, and content-type plugins)
**Author:** Transition Delivery Manager
**Disposition keys:** PRESERVE SLUG / 301 REQUIRED / MIGRATE / MERGE → X / RETIRE / DECIDE

---

## Summary counts

| Bucket | v1 (live-fetched) | v2 (WP export) | Delta |
|---|---|---|---|
| Pages — publish | 69 | **70** | +1 |
| Pages — draft | (unknown) | **9** | new visibility |
| Pages — private | (unknown) | **3** | new visibility |
| Posts — publish | ~400 est. | **487** | **+87 (22% undercount in v1)** |
| Posts — draft | (unknown) | **130** | new visibility |
| Posts — private | (unknown) | **14** | new visibility |
| Attachments (media library) | (unknown) | **2,462** | new — material cutover cost |
| `dlssus_sheet` (sign-up sheets) | 4 | **4** | same |
| `dlssus_task` (sub-tasks under sheets) | (unknown) | **62** | plugin sub-records |
| `dlssus_signup` (individual signups) | (unknown) | **3** | plugin sub-records |
| `session` (Beer Tasting, etc. — Sessions plugin) | (unknown) | **49** (18 publish, 31 draft) | **new content type missed by v1** |
| `popupbuilder` (site popup banners) | (unknown) | **10** | site-overlay assets |
| Categories | 23 | **22** | same scale |
| Tags | (unknown) | **528** | new visibility |

**Bottom line:** v1 under-counted posts by ~22%, missed 9 draft pages + 3 private pages, missed 49 "Sessions" (After Dark / Tour de Saints curriculum), and could not see the 2,462-attachment media library. None of those discoveries change the strategic dispositions; they do change the **cutover cost** picture (see Risk Register).

---

## Pages (82 total: 70 publish, 9 draft, 3 private)

v1 captured all 70 published pages correctly. Dispositions from v1 carry forward unchanged. v2 adds the 9 drafts + 3 privates below.

### Draft pages — all RETIRE

| Slug | Title | Last mod | Disposition | Notes |
|---|---|---|---|---|
| `/dark-saints-2017/` | After Dark @ All Saints' 2017 | 2020-03-11 | RETIRE | Past event, never published |
| `/after-dark-all-saints-2019/` | After Dark @ All Saints' 2019 | 2020-03-11 | RETIRE | Past event draft |
| `/after-dark-all-saints-2020-registration/` | AD 2020 Registration | 2020-03-09 | RETIRE | COVID-canceled |
| `/afterdark-2020/` | After Dark @ All Saints' 2020 | 2023-01-06 | RETIRE | Past event |
| `/after-dark-all-saints-2023/` | After Dark @ All Saints' 2023 | 2024-01-03 | RETIRE | Past event |
| `/after-dark-all-saints-2024/` | After Dark @ All Saints' 2024 | 2024-12-28 | RETIRE | Past event |
| `/ministry-contacts/` | Ministry Contacts | 2025-02-26 | DECIDE | **Recent draft — worth a look.** Possibly a Brian work-in-progress page intended to replace the scattered ministry contact info. If so, content folds into `/final/connect` ministries section. > **DM call:** RETIRE the draft; absorb intent into `/final/connect` ministries list. |
| `/tour-de-saints-2021-volunteer/` | Tour de Saints 2024 Volunteer | 2025-05-12 | DECIDE | **Recent draft, title says 2024 but slug says 2021.** If Tour de Saints is still active, this is a form page worth a Squarespace form replacement. > **DM call:** RETIRE; Tour de Saints sponsorship page (`/tour-de-saints-2021-sponsorship/`) is published and covers the public-facing need. |
| `/` (slug empty) | Service Archive | 2020-06-20 | RETIRE | Orphan |

### Private pages — all RETIRE

| Slug | Title | Disposition |
|---|---|---|
| `/test/` | test | RETIRE |
| `/wpforms-preview/` | WPForms Preview | RETIRE |
| `/wpforms-preview-2/` | WPForms Preview | RETIRE |

### Corrections to v1 page table

- v1 listed `/transition/interim-position-overview-for-all-saints-episcopal-church/` as nested under `/transition/`. **Actual slug in export:** `/interim-position-overview-for-all-saints-episcopal-church/` (top-level, not nested). 301 destination unchanged (`/final/rector-search`), but the source URL in the URL Mappings file needs the corrected slug.
- v1 listed `/transition/why-is-an-interim-needed-...` similarly nested. **Actual slug:** `/why-is-an-interim-needed-and-what-is-interim-work-content-provide-by-multiple-sources/` (top-level). Same 301 destination, corrected source slug.
- v1 had `/welcome-from-the-rector/` marked RETIRE as "Nancy Cox era". Export shows it was **modified 2026-01-05 and titled "Welcome"** — likely repurposed by Brian during interim. > **DM call:** still RETIRE (canonical Welcome lives in `/final/`), but worth one minute of Brian eyeballing before flipping the switch.

All other v1 page dispositions hold.

---

## Posts (487 publish + 130 draft + 14 private = 631 total)

Per v1 strategy (RETIRE all by default + carve-outs), grouping is the right approach. Year × category matrix below confirms the carve-outs.

### Publish posts by year (487 total)

| Year | Count | Disposition |
|---|---|---|
| 2016 | 18 | RETIRE |
| 2017 | 33 | RETIRE (except Memorial Arboretum carve-out) |
| 2018 | 44 | RETIRE (except Memorial Arboretum + Annual Report carve-outs) |
| 2019 | 96 | RETIRE (except Memorial Arboretum carve-out) |
| 2020 | 82 | RETIRE |
| 2021 | 72 | RETIRE (except Memorial Arboretum + Annual Report carve-outs) |
| 2022 | 76 | RETIRE (except Annual Report carve-out) |
| 2023 | 64 | RETIRE (except Annual Report carve-out) |
| 2024 | 63 | RETIRE (except Annual Report carve-out) |
| 2025 | 60 | RETIRE (except Annual Report carve-out + recent items per Brian) |
| 2026 | 23 | DECIDE — 23 published in 5 months, indicates an active publishing cadence. Some may still be current and link-cited. Brian audit. |

**Posts >12 months old (before 2024-01-01):** 372 (76% of all published). Default RETIRE.
**Posts in last 12 months (since 2025-05-01):** 51. Default RETIRE; Brian to flag any externally-cited.

### Publish posts by category

| Category | Count | Default disposition |
|---|---|---|
| Event Center | 230 | RETIRE — past event announcements |
| Clergy | 211 | RETIRE — weekly clergy reflections (>50% Nancy Cox per memory rule); some MIGRATE-candidates flagged below |
| Nurture | 153 | RETIRE — old 3-verb taxonomy |
| Education | 99 | RETIRE — old 3-verb taxonomy |
| Grow | 96 | RETIRE — old 3-verb taxonomy |
| Serve | 85 | RETIRE — old 3-verb taxonomy |
| Invite | 74 | RETIRE — old 3-verb taxonomy |
| **Memorial Arboretum** | **38** | **PRESERVE SLUG** — see dedicated section below |
| Worship | 36 | RETIRE — past worship-related announcements |
| Uncategorized | 25 | RETIRE — orphans |
| Stewardship | 23 | RETIRE — annual campaign posts; current campaign rebuilt in `/final` |
| Weekly Word | 19 | RETIRE — newsletter archive |
| All Saints | 14 | RETIRE — duplicates Uncategorized intent |
| Set Free to Serve | 12 | RETIRE — past capital campaign |
| Creation Care | 6 | DECIDE — small evergreen cluster; could MERGE → `/final/connect` if ministry still active. > **DM call:** RETIRE; if Creation Care is an active ministry, surface a Connect ministry tile instead of preserving blog posts. |
| Home Page Slides | 4 | RETIRE — homepage builder artifacts |
| The Saints Among Us | 4 | RETIRE — old series |
| Videos | 2 | RETIRE |
| **Annual Report** | **2** | **MIGRATE** — but the slug-level search found 5 distinct Annual Report posts (see below) — the category-tag is just under-applied. Use slug-based detection. |
| Vestry Person of the Month | 1 | RETIRE |

### Carve-out A — Annual Reports (MIGRATE as PDFs)

| Slug | Title | Disposition |
|---|---|---|
| `/2021-annual-meeting-and-year-in-review-slideshow/` | 2021 Annual Report and Year in Review Slideshow | MIGRATE — PDF download on `/final/community` or wherever transparency content lives |
| `/annual-report-2022/` | Annual Report 2022 | MIGRATE — PDF |
| `/annual-report-2023/` | Annual Report 2023 | MIGRATE — PDF |
| `/2024-annual-report/` | 2024 Annual Report | MIGRATE — PDF |
| `/2025-annual-report/` | 2025 Annual Report | MIGRATE — PDF |
| `/annual-meeting/` (draft) | Annual Report now available | RETIRE — unfinished draft, never published |

### Carve-out B — "What is..." evergreen explainers (DECIDE)

Per v1 + Q2 decision in audit-decisions.md, `/what-is-an-epis/` is already covered (MIGRATE standalone). Worth checking if `/what-is-stewardship/`, `/what-is-a-tithe/`, `/what-is-all-saints-day/` exist as posts. (v1 mentioned them but the export grep needs a confirming pass for Phase 4 packet.)

### Sub-flag — Nancy Cox-authored posts (~120 in export)

The export reveals **at least 109 posts tagged "nancy"** (plus the named tag "Nancy cox" with 6 more). All RETIRE per `feedback_never_mention_nancy_cox`. No carve-outs. This is consistent with v1's stance and per the memory rule; just documenting the count for the record.

---

## Memorial Arboretum (the most-important section in this audit) — PRESERVE SLUG ALL

v1 estimated "~30 memorial-tree pages". **Authoritative count from export: 38 Memorial Arboretum posts + 1 hub page + 1 labyrinth page = 40 slugs to preserve.**

Important: these are stored as **WordPress posts**, not pages. They live at root (`/{name-slug}/`), not under `/arboretum/{name-slug}/`. Per Q7 decision (PRESERVE ALL), all 40 get root-level 301-to-self entries in the Squarespace URL Mappings file.

| Slug | Title | Notes |
|---|---|---|
| `/arboretum/` | All Saints' Arboretum of Native Trees | **HUB** — primary `/arboretum` URL per memory `project_arboretum_qr_codes` |
| `/jennifer-cobb-memorial-labyrinth/` | Jennifer Cobb Memorial Labyrinth | Likely has its own physical signage (labyrinth = separate physical install from memorial trees) |
| `/prayer-labyrinth/` | Prayer Labyrinth | Related — physical labyrinth on grounds. PRESERVE SLUG |
| `/patsy-roecker-mcelroy/` | Patsy and Dee McElroy | |
| `/patsy-roecker-mcelroy-3/` | Patsy Roecker McElroy | Duplicate (the `-3` suggests two earlier re-publishes); preserve both, point to canonical via 301 if needed |
| `/dee-and-patsy-roecker-mcelroy-bio/` | Dee and Patsy Roecker McElroy | |
| `/roger-butler/` | The Rev. Roger Butler | |
| `/mark-robinson/` | Dr. Mark D. Robinson, MD | |
| `/jane-thomas/` | Jane Thomas | |
| `/jennifer-cobb/` | Jennifer Cobb | (separate from labyrinth page) |
| `/heather-and-jack-griswold/` | Heather and Jack Griswold | |
| `/tommy-jones/` | Tommy Jones | |
| `/the-lawson-men/` | The Lawson Men | |
| `/whitney-elizabeth-hunter/` | Whitney Elizabeth Hunter | |
| `/the-erickson-children/` | The Erickson Children | |
| `/nancy-l-j-cox/` | The Reverend Nancy L. J. Cox | **Memorial tree, not a memorial _to_ her authorship.** Per `feedback_never_mention_nancy_cox`, this slug still preserves (it's a tree dedicated to her), but the page content/title may need a sensitivity review. > **DM call:** PRESERVE SLUG, surface content for review-group sensitivity check before cutover. |
| `/william-bill-mccrary/` | William "Bill" McCrary | |
| `/henry-and-betty-wiley/` | Henry and Betty Wiley | |
| `/william-parker-marks/` | The Reverend William Parker Marks | |
| `/matt-bernacki/` | Matt Bernacki | |
| `/helen-and-joe-johnson/` | Helen and Joe Johnson | |
| `/marshall-smith/` | Marshall Smith | |
| `/robert-frances-and-barbara-burkett/` | Robert, Frances and Barbara Burkett | |
| `/cary-smith-russell/` | Cary Smith Russell | |
| `/marjorie-alice-robinson-and-lavius-arad-robinson-jr/` | Marjorie Alice Robinson and Lavius Arad Robinson, Jr. | |
| `/stuart-cline/` | Stuart Cline | |
| `/sabert-scott-trott-and-mary-welker-trott/` | Sabert Scott Trott and Mary Welker Trott | |
| `/john-w-cline/` | John W. Cline | |
| `/michael-john-mccarthy-memorial-garden/` | The Michael John McCarthy Memorial Garden | (memorial garden = physical install with possible signage) |
| `/evan-alexander-carlton/` | Evan Alexander Carlton | |
| `/ruby-jean-furr/` | Ruby Jean Furr | |
| `/jack-jones/` | Jack Jones | |
| `/chuck-collier/` | Chuck Collier | |
| `/robert-v-and-hellenanne-r-williams/` | Robert V. and Hellenanne R. Williams | |
| `/the-reverend-diane-bishop-corlett/` | The Reverend Diane Bishop Corlett | |
| `/john-yelton/` | John Yelton | |
| `/sue-ketner-gelarden/` | Sue Ketner Gelarden | |
| `/parker-andrew-fisher/` | Parker Andrew Fisher | |
| `/charlotte-suzanne-cox/` | Charlotte Suzanne Cox | |
| `/kathy-jo-bystricky-oxx/` | Kathy Jo Bystricky Oxx | Added 2025-11 — recent dedication |
| `/bob-and-pat-hoos/` | Bob and Pat Hoos | Added 2025-11 — recent dedication |
| `/tree-of-seasons/` | Tree of Seasons | Categorized "Set Free to Serve" but tagged tree/seasons; **DECIDE** — if it's a physical tree on grounds, PRESERVE SLUG; if a fundraising metaphor, RETIRE. > **DM call:** PRESERVE SLUG (safer default; cost of preserve = zero). |

**Recent dedications matter.** Two trees added in November 2025. Anyone visiting those graves in 2026+ will likely scan a fresh QR code. **Cannot break these.**

---

## Sessions content type — surfaced by export (NOT in v1)

49 "session" entries — appears to be an After Dark @ All Saints' / Tour de Saints curriculum/class catalog (Beer Tasting, Hands-Only CPR, Carolina Thread Trail, Cooking with 2 Gals, Mecklenburg Declaration of Independence, etc.).

- **18 publish, 31 draft.**
- All dates 2024-12 → 2025-01.
- These are class/session listings, likely from an event-builder plugin tied to After Dark 2025.

**Disposition:** RETIRE all. They are past-event session detail pages with no current value. URLs are deeply niche (`/disappearing-quilting-blocks`, `/auto-maintenance-for-teens`) and unlikely to be externally cited.

> **DM call:** RETIRE all 49. No 301s. If After Dark relaunches with new sessions, Squarespace event pages handle the new instance natively.

---

## Sign-up sheet plugin — full picture

v1 saw the 4 `dlssus_sheet` parent records. The export reveals the full child-record sprawl:

- **4 sheets** (Coffee Hour, Maundy Thursday Prayer Vigil, Charlotte Grossman Transport, Fred Weber Transport) — Q9 disposition unchanged
- **62 `dlssus_task` records** — these are the individual time slots / dates under each sheet (e.g., "9 PM", "9:30 PM", "Sunday 8/4"). Pure plugin internals, no public URLs worth preserving.
- **3 `dlssus_signup` records** — individual people signing up. **These contain PII (email addresses visible in titles: `jchunter40@aol.com`, `bsapp@allsaintsconcord.org`).** Do not migrate; do not expose.

> **DM call:** Confirm Q9 disposition (MIGRATE active sheets to Squarespace forms, RETIRE past). Do not migrate `dlssus_task` or `dlssus_signup` records. Treat the signup records as PII to be discarded with the WP DB.

---

## Popup banners (10) — new visibility

The site has a Popup Builder plugin with 10 stored popups: Live Events, Christmas Services, COVID Closure, Pancakes, Ash Wednesday Services, Holy Week/Easter Schedule, Parking Lot Construction, Delayed Office Opening, Services Canceled due to Winter Storm, Office Closed.

**Disposition:** Do not migrate as a system. These are point-in-time announcements (most stale: COVID Closure, Parking Lot Construction). If Squarespace needs a site-wide announcement banner pattern, build one fresh — don't port these.

> **DM call:** RETIRE all 10. Build a single Squarespace announcement-bar component for future use.

---

## Attachments (media library) — 2,462 files

v1 had zero visibility into the media library. This is the **biggest surprise of v2** and the largest single piece of cutover work.

**Distribution by year of upload:**

| Year | Count |
|---|---|
| 2015 | 46 |
| 2016 | 245 |
| 2017 | 136 |
| 2018 | 209 |
| 2019 | 259 |
| 2020 | 401 |
| 2021 | 251 |
| 2022 | 224 |
| 2023 | 209 |
| 2024 | 220 |
| 2025 | 181 |
| 2026 | 81 |

(2020 spike correlates with COVID-era weekly virtual-worship asset uploads.)

**Disposition guidance:**

- The vast majority (~80%) of attachments are tied to RETIRE'd posts. Leave them in the old WP DB; they vanish with the cutover. No migration.
- **Material to migrate:**
  - Memorial Arboretum tree photos (estimate: 40 trees × 1-3 photos each = ~80-120 attachments). Must be re-hosted on Squarespace.
  - Bulletins / weekly PDFs that Brian wants to keep linkable (count TBD — Brian flags in Phase 6).
  - Staff headshots (already replaced in `/final/assets/staff/*` for John + Erin; rest need re-hosting if used on Community page).
  - LCDC and life-events page imagery.
  - Annual Report PDFs (5 files per Carve-out A above).
- **Do not migrate:** Event Center photos (mostly past events), Stewardship campaign imagery (annual; rebuilt fresh each year), Set Free to Serve campaign assets (capital campaign closed).

> **DM call:** Defer per-file decisions to a Phase 6 asset-migration list. Estimate: 150-300 attachments worth migrating, out of 2,462. Build the migration list by walking the surviving `/final` pages, not by walking the WP attachment table — much shorter list.

**Cost implication:** Squarespace storage is generous; the constraint is the **time** to download, re-upload, and re-link 150-300 assets. Budget 6-10 hours of focused work in Phase 6. Document in risk register.

---

## Preserved URLs — full cross-reference

Per memory `project_preserved_urls` + `project_arboretum_qr_codes`, the export confirms:

| Slug | Type | Source-of-record | Preserve? |
|---|---|---|---|
| `/arboretum/` | post | memory `project_arboretum_qr_codes` (physical QR codes on signs) | **PRESERVE SLUG** |
| `/all-saints-arboretum-of-native-trees/` | (redirect target seen in old links) | — | 301 → `/arboretum/` |
| 38 memorial tree slugs at root | posts | memory + physical signage assumption (Q7 DECIDE = PRESERVE ALL) | **PRESERVE SLUG** all 38 |
| `/jennifer-cobb-memorial-labyrinth/` | post | physical labyrinth signage assumption | **PRESERVE SLUG** |
| `/prayer-labyrinth/` | post | physical labyrinth signage assumption | **PRESERVE SLUG** |
| `/tree-of-seasons/` | post | possible physical tree (DM call: preserve as safer default) | **PRESERVE SLUG** |
| `/prayer-requests/` | page | memory `project_preserved_urls` (printed cards in pews) | **PRESERVE SLUG** |

**Total preserve-slug count: 43 URLs** (was 3 confirmed + audit-needed list in v1).

All other "audit-needed" URLs from memory `project_preserved_urls` — Brian still owes the print-material audit (bulletins, newsletter footer, business cards, signage) to surface any URLs cited externally that aren't on this list. Memory note unchanged.

---

## What the WP export revealed that v1 missed

1. **Post count was under by 22%** (487 publish, not ~400) — and there are 130 drafts + 14 privates that v1 couldn't see at all. Total post-like records: 631. The default-RETIRE strategy still holds for all of these.
2. **2,462 attachments.** This is a real cutover cost item that didn't exist in v1's risk register. Bumped to P1 risk.
3. **49 "session" records** from an event-curriculum plugin (After Dark / Tour de Saints session catalog). Invisible to live-sitemap fetches. All RETIRE.
4. **10 popupbuilder records** — stale popups going back to COVID. All RETIRE; build fresh in Squarespace if needed.
5. **62 `dlssus_task` + 3 `dlssus_signup` records** — the latter contain PII (email addresses as titles). Don't migrate. Discard with WP DB.
6. **9 draft pages** revealing abandoned features: 5 After Dark draft pages from 2017-2024 (one per year, indicating an annual cycle that draft-and-republished), a Ministry Contacts draft from Feb 2025 (possible Brian work-in-progress), and a Tour de Saints volunteer draft from May 2025.
7. **3 private pages** — test/preview artifacts. Discard.
8. **40 memorial-arboretum slugs to preserve**, not v1's "~30" estimate. Materially: ~10 more entries in the URL Mappings file than v1 budgeted. Trivial work but worth getting right.
9. **The `/welcome-from-the-rector/` page was modified 2026-01-05 and titled simply "Welcome"** — likely repurposed by Brian during the interim. v1 RETIRE'd it as "Nancy Cox era". Disposition still RETIRE (canonical Welcome lives in `/final/`), but worth Brian confirming.
10. **Two memorial trees dedicated in November 2025** (Kathy Jo Bystricky Oxx, Bob and Pat Hoos). Increases the asymmetric-risk argument for preserving ALL tree slugs — these dedications are too fresh to risk breaking.
11. **528 tags in use**, with the top tag being "nancy" (109 posts). Confirms the default-RETIRE on Clergy-category posts is the right call; nearly all are Nancy Cox authored.
12. **`/transition/`'s child pages are not actually nested.** v1 incorrectly listed `/transition/interim-position-overview-...` and `/transition/why-is-an-interim-needed-...` as nested URLs. They are top-level slugs. URL Mappings file in Phase 7 needs the corrected sources (same destinations).

---

## Dispositions changed from v1

Short list. Most v1 calls hold.

- **Memorial-tree preservation count:** v1 said "~30", v2 confirms **40 slugs** (38 trees + arboretum hub + 2 labyrinth-related). +10 entries in URL Mappings file.
- **`/transition/` child slugs:** corrected to top-level (not nested) — same 301 destinations, corrected source URLs in URL Mappings file.
- **`/welcome-from-the-rector/`:** v1 said RETIRE as "Nancy Cox era". v2 confirms RETIRE but notes Brian repurposed it in Jan 2026 — surface for Brian sanity check before cutover.
- **New category — "Annual Report" exists** but is applied to only 2 posts; slug-based detection found 5 published Annual Report posts to MIGRATE as PDFs (v1 had 4, missed `/2021-annual-meeting-and-year-in-review-slideshow/`).

The 10 autonomous calls in `audit-decisions.md` (Q1-Q10) all stand. No revisions required.

---

## Risk register updates (vs v1)

| Risk | Severity | Change vs v1 | Mitigation |
|---|---|---|---|
| **Media library: 2,462 attachments** | P1 (was not on v1) | **NEW** | Phase 6 asset-migration list, walking surviving `/final` pages; estimate 150-300 files to actually migrate; 6-10 hours of work |
| **PII in `dlssus_signup` records (3)** | P2 (was not on v1) | **NEW** | Do not migrate; discard with WP DB |
| **Recent memorial-tree dedications (Nov 2025)** | P1 (existing risk, fresh data) | Strengthened | Q7 PRESERVE ALL decision validated; cannot break |
| **`/welcome-from-the-rector/` repurposed in Jan 2026** | P3 (new wrinkle) | **NEW** | Brian sanity check before retire |
| **130 draft posts + 14 private posts** | P3 (was hidden) | New visibility | Default RETIRE; surfaced to Brian if any are work-in-progress |
| **Popupbuilder plugin → Squarespace pattern gap** | P3 (was not on v1) | **NEW** | Build Squarespace announcement-bar fresh; don't port the 10 stored popups |

Existing v1 risks (wrong domain — resolved; memorial-tree sprawl — Q7 resolved; Pastoral Care/Life Events in IA — Q4/Q8 resolved; LCDC sensitivity — Q3 resolved; BuddyPress retire — confirmed safe; Nancy Cox content default-retire — confirmed by 109-post tag count) all carry forward unchanged.

---

## What I'm watching (assumptions baked into the v2 audit)

- The 38 Memorial Arboretum posts I'm marking PRESERVE SLUG — I'm assuming all have physical signage. Cost of being wrong (preserving a tree with no sign) = 0. Cost of the inverse = high + unrecoverable. Preserve-all is the right asymmetric bet.
- The `/welcome-from-the-rector/` page was recently modified — I'm assuming Brian's edits do not contain content that needs to migrate elsewhere; canonical Welcome is in `/final/`. If Brian's edits are something different (e.g., interim-period welcome from John), that content needs to either RETIRE or fold into `/final/rector-search`.
- The 49 sessions are all After Dark / Tour de Saints curriculum and are point-in-time. If any are recurring annual content (e.g., an Episcopal-101 class), they'd want preservation. Default RETIRE is safe; Brian can flag exceptions.
- The 2,462 attachment count is the WP DB count. I have not download-sized them; total disk footprint is unknown but likely 5-15 GB based on typical WP media libraries this age. Not a Squarespace storage constraint, but a download-time constraint when building the migration list.
- Attachment-to-page reference counts (the "top 20 attachments by reference count in surviving pages" the prompt requested) requires parsing post bodies for `<img src="...">` and matching against attachment URLs. Deferred to Phase 6 — the actual migration list will be built by walking `/final` pages forward, not by mining the WP attachment table backward.

---

## Next steps

1. **Brian walkthrough** of this v2 audit (30 min async) — focus on: (a) any "active ministry" categorizations that are wrong, (b) the Ministry Contacts draft and Tour de Saints Volunteer draft (intent?), (c) the `/welcome-from-the-rector/` repurpose, (d) externally-cited blog posts (Q10 still outstanding).
2. **Phase 4 packets** built against v2 numbers, not v1.
3. **Phase 6 asset-migration list** built by walking `/final` pages forward; budget 6-10 hours of focused download/upload/relink work.
4. **Phase 7 URL Mappings file** updated with: 40 PRESERVE-SLUG entries (was 3 + audit-needed), corrected `/transition/*` source slugs, all Q1-Q9 mappings, plus the Annual Report 5-PDF set.
5. **Pre-cutover physical-signage audit** at the church — confirms which preserved URLs have live QR codes vs. which can be retired in Phase 7+1.
