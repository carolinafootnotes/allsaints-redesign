# B1 — Current Site Audit

**Site:** allsaintsconcord.org · **Platform:** WordPress
**Audited:** April 20, 2026 (verified against live site)
**Baseline:** /audit.md (March 30, 2026) — updated below
**Purpose:** Page-by-page inventory to plan the Squarespace migration

---

## Executive summary

**Scale.** ~45 URLs on the current site. Proposed new-site page count: **12–15**. That's a **67–73% reduction** — well beyond the "responsibly cut 50%+" target. Nothing important is lost; details in Section 5.

**The three most important findings.**

1. **Thirteen URLs return 404 — about 30% of what the navigation points to.** Five are dropdown-parent categories (I'm New, Who We Are, Get Help, Get Involved, Sign Ups), meaning every visitor who clicks the top-nav label (not a sub-item) hits a broken page. This is an architecture problem, not a content problem. Squarespace removes it for free — the platform doesn't let you link to a non-existent page.

2. **The Giving page is a 3.5-year-old deficit appeal.** The URL behind the top-nav "Giving" link (/giving/) serves a Dec 7, 2022 stewardship article opening with discussion of a $48,884 deficit. It is, today, the primary revenue page of a parish in rector transition. Under no circumstance does it migrate.

3. **Small maintenance bugs are shipping in production and nobody has noticed.** The phrase `user_custom_social_links_one` is visible in the footer of every page — literal WordPress theme placeholder text that never got replaced. The Facebook widget shows "Loading…" forever on most pages. Two staff members have "Bio coming soon" placeholders going back months. No analytics are being captured (the ExactMetrics plugin was installed but never configured).

**What's surprisingly good.**

- **Clergy bios** are the best writing on the site — warm, specific, full of personality.
- **The history page** tells a genuinely compelling founding-two-churches story.
- **Recent activity proves the site isn't abandoned.** Posts from this week (April 16), upcoming calendar events — someone is maintaining content. It's the platform that makes small fixes expensive, not a lack of care.
- **Rev. Johanssen's name has been added** to clergy and welcome pages since the March audit. Someone is paying attention.

**The migration math.**

| Bucket | Count | What it is |
|---|---|---|
| **Keep as-is** (copy lifts with light polish) | 10 URLs | Clergy, Service Hours, History, What is an Episcopalian, Life Events, Online Giving, Arboretum, current events & rector-search posts |
| **Rewrite** (intent survives, execution redone) | 12 URLs → ~8 pages | Homepage, Welcome from Rector, Staff, Vestry, Formation (consolidates Learn/Worship/Serve/Fellowship), Pastoral Care (consolidates Prayer/Stephen), Rector Search, News & Resources |
| **Cut** (delete, redirect, or consolidate) | 23+ URLs | All 13 dead 404s, /giving/ deficit appeal, pandemic-era Personal Communion, stale blog posts, PDF directory, liaison-speak, etc. |

**What the migration fixes automatically.** Broken dropdown parents. Footer placeholder text. Missing search/archive pages. Mobile responsiveness concerns. The "one person is the bottleneck for every small edit" problem — staff can update "Bio coming soon" without a WordPress developer.

**What the migration doesn't fix.** Whoever needs to write Erin and Ruth's bios still needs to write them. Whoever needs to draft a current Giving message still needs to draft it. The tooling solves half the problem; we solve the other half.

---

## 1. Sitemap Inventory

Notes on "word count": approximate body-content estimate, excluding the global header/nav/footer/sidebar (service times, bulletin thumbnails, calendar widget, newsletter signup) that appears on every page. Every interior page carries ~10 nav items, 5 bulletin PDF thumbnails, a calendar widget, and a Facebook widget in chrome.

| URL | Page Title | Word Count | Images | Broken? | Last Update Signal |
|---|---|---|---|---|---|
| `/` | All Saints Episcopal Church – Homepage | ~450 body + news feed | 25–30 | No — but `user_custom_social_links_one/two` placeholder text visible in footer; Facebook widget shows loader | Most recent post April 16, 2026 |
| `/im-new/` | — | — | — | **404** | Nav links to this URL, no landing page exists |
| `/welcome-from-the-rector/` | Welcome | ~450 | 8 (banner, logo, bulletins, newsletter) | No | Attributed to Rev. John Johanssen (Interim) — updated since March audit |
| `/service-hours/` | Service Hours | ~900 | 6 (2 service photos + chrome) | No | Content current; copyright 2026 |
| `/become-a-member/` | Become a Member | ~600 | 3 | No | Evergreen; no explicit date |
| `/connect/` | Connect (contact form) | ~1,200 (incl. 17-topic form) | Chrome only | Minor: social link placeholders | Evergreen; form functional |
| `/clergy/` | Clergy | ~2,100 (4 full bios) | 11 (4 headshots + chrome) | No | Rev. Johanssen start date Jan 1, 2026 |
| `/staff/` | Staff | ~1,100 | 4 headshots | No — but two "Bio coming soon" placeholders (Erin Vanasse, Ruth Brown) | — |
| `/vestry/` | Vestry | ~1,200 (mostly names) | 6 (chrome) | No | Labeled "Vestry and Liaison Areas, 2026" |
| `/history/` | History | ~1,200 | 2 (stained glass, 2 views) | No | Timeline ends at 2014; no mention of 2025 rector retirement |
| `/what-is-an-epis/` | What is an Episcopalian | ~1,200 | 1 illustrative + chrome | No | Evergreen |
| `/who-we-are/` | — | — | — | **404** | Nav parent; no landing page |
| `/worship/` | Worship | ~1,200 | 1 + chrome | No | Evergreen, music ministry content |
| `/learn/` | Learn | ~1,650 | 2 photos + chrome | No | Evergreen |
| `/serve/` | Serve | ~820 | 4 section images | Minor: social link placeholders | Ministry descriptions are thin; references Syrian refugees / Haiti / Nets for Life — feels dated even if evergreen |
| `/fellowship/` | Fellowship | ~1,100 | 7 group photos | No | References "2017 Social Saints lunch initiation" |
| `/play/` | Play | ~1,200 | 5 event photos | No | Lists VBS, Hops Helping Haiti, Tacky Gift Exchange, Wine Tasting — undated event archive |
| `/get-involved/` | — | — | — | **404** | Nav parent; no landing page |
| `/prayer/` | Prayer | ~450 | 1 + chrome | Minor: social placeholders | Evergreen, links to prayer request form |
| `/pastoral-care/` | Pastoral Care | ~1,100 | 4 (kitchen, Stitches + chrome) | Minor: social placeholders | Stitches for the Saints ongoing |
| `/stephen-ministry/` | Stephen Ministry | ~800 | Commissioning photo (June 30, 2024) + roster | No | Photo from 2024 |
| `/life-events/` | Life Events | ~650 | 1 graphic | No | Evergreen (baptism/confirmation/wedding/funeral) |
| `/get-help/` | — | — | — | **404** | Nav parent; no landing page |
| `/giving/` | "Giving a Little Extra" (NOT a landing page) | ~450 | Banner, chrome | **Content problem** — this is a Dec 7, 2022 stewardship appeal referencing "$48,884 deficit" still served at /giving/ | Dec 7, 2022 |
| `/online-giving/` | Online Giving Estimate | ~800 | 2026 campaign graphic | No | Current for 2026 pledges |
| `/2026-estimated-giving/` | — | — | — | **404** | Nav link broken |
| `/income-tax-benefits/` | — | — | — | **404** | Nav link broken |
| `/rector-search-committee/` | — | — | — | **404** | Top-nav item leads to 404 |
| `/next-steps-and-sharing-your-responses/` | Next Steps and Sharing Your Responses | ~800 | 1 graphic | No | Feb 12, 2026 — de facto rector search landing page |
| `/live-events/` | Live Events | ~850 | Chrome | No | Lists OWLs group + current service offerings |
| `/sign-ups/` | — | — | — | **404** | Nav parent; no landing page |
| `/personal-communion/` | Personal Communion | ~400 body | Chrome | No | Published May 27, 2021 — COVID-era artifact, still in Sign Ups nav |
| `/iconography-retreat/` | Iconography Retreat/Workshop | ~520 | Retreat graphic | No | Event May 18–22, 2026; posted Feb 12, 2026 |
| `/maundy-thursday/` | Maundy Thursday | Minimal | PDF link | No | Sparse stub page, year unclear |
| `/easter-flowers/` | — | — | — | **404** | Was in March nav; now gone |
| `/ministry-contacts/` | Ministry Contacts | ~1,200 (mostly nav/chrome) | Chrome | No | PDF directory download — low value as a page |
| `/koinonia/` | Koinonia | ~600 | Chrome | No | References 2022–2023 presentations; AYA House, CCM, Academic Learning Center |
| `/ccm-volunteering/` | — | — | — | **404** | In Serve submenu; dead link |
| `/cookbook/` | — | — | — | **404** | In Fellowship submenu; dead link |
| `/connect-with-realm/` | — | — | — | **404** | Top-nav item; dead link |
| `/arboretum/` | All Saints' Arboretum of Native Trees | ~1,200 (incl. 40+ dedications) | 1 graphic | No | Memorial dedication list ongoing |
| `/get-the-latest/` | Get the Latest | ~1,200 | Chrome | No | Hub page for calendar/bulletins/annual reports |
| `/lockhart-cdc/` | — | — | — | **404** | Nav links externally to lockhartcdc.org |
| `/blog/` or `/news/` | — | — | — | **404** | No archive page; category archive also 404 |
| `/category/news/` | — | — | — | **404** | — |
| **Blog posts on homepage (10 most recent):** | | | | | |
| `/your-perspectives-are-needed/` | Your perspectives are needed! | ~320 | Chrome | No | April 16, 2026 |
| `/take-us-out-to-the-ball-game/` | Take Us Out to the Ball Game! | ~860 | Event graphic | No | Posted April 16, 2026; event June 8, 2026 |
| `/invitation-to-holy-week/` | — | — | — | **404** as of today (was homepage-featured earlier in April) |
| `/lent-holy-week-and-easter-opportunities/` | Lent, Holy Week, and Easter Opportunities | ~600 | Chrome | No | Posted March 2, 2026; now stale (Easter has passed) |
| `/annual-meeting-questions/` | Annual Meeting Questions | ~300 | Chrome | No | Jan 25, 2026 — stale (meeting passed) |
| `/2025-annual-report/` | 2025 Annual Report | Embedded Flipsnack | — | No | Jan 22, 2026 |
| `/have-any-of-you-gone-fishing/` | Have any of you gone fishing? | ~500 | Chrome | No | Jan 30, 2026 (Bernacki children's sermon) |
| `/giving-children-a-place-to-grow/` | Giving Children a Place to Grow | ~500 | Chrome | No | Jan 14, 2026 (Lockhart CDC feature) |
| `/stewardship-tools-for-gods-sharecroppers/` | Stewardship Tools for God's Sharecroppers | ~500 | Chrome | No | Older stewardship post still indexed |

**Total discovered URLs:** ~45
**Confirmed 404s:** 13
**Pages with meaningful content:** ~28

---

## 2. Per-Section Content Summary

### Homepage
Functional but crowded. Real-time elements (event calendar, news feed, upcoming bulletins) are genuinely active through April 2026, which is a good sign — this site is being maintained. But the four-pillar mission block + sidebar + news dump + Facebook widget + newsletter signup all competing produces decision paralysis. The `user_custom_social_links_one/two` literal placeholder text in the footer is visible on every page — a theme-configuration bug that's been there long enough that nobody on staff has noticed. Nav has **12 top-level items**; 3 of them (I'm New, Who We Are, Get Help, Get Involved, Sign Ups) are parent labels that 404 when clicked. That's a navigation-level bug affecting every visitor.

### I'm New
The most important section for visitor conversion and the most broken. `/im-new/` returns 404 — there is no landing page, only four sub-pages visitors can reach through hover dropdowns. The sub-pages themselves (Welcome, Service Hours, Become a Member, Connect) are individually OK. Service Hours is genuinely informative. Welcome is now signed by Rev. Johanssen (this was updated after the March audit — the "generic/unsigned" problem is resolved). Become a Member is clear. Connect is a working contact form with a 17-option interest checklist that's probably more than a first-time visitor wants to fill out.

### Who We Are
Parent page 404s. Clergy page is the strongest content on the site — four full bios with personality, photos, emails. Staff page has two "Bio coming soon" placeholders (Vanasse, Brown) that were there in March and are still there in April — clearly not a priority to fix. Vestry is a name list with liaison areas (functional but dry). History is a genuinely good founding-two-churches narrative with the 1892 stained glass story, but the timeline stops at 2014 — nothing about the Lockhart opening details post-2014, nothing about Nancy Cox's retirement in Nov 2025 or Johanssen's arrival. What Is an Episcopalian? is a solid, clear evergreen explainer.

### Get Help
Parent 404s. Prayer, Pastoral Care, Stephen Ministry, Life Events are all individually present with reasonable content. Stephen Ministry page shows a commissioning photo dated June 30, 2024, which is fine — it's a commissioning photo, not a "latest news" item. Life Events is well-structured with expandable tabs for baptism/confirmation/weddings/funerals.

### Get Involved
Parent 404s. Worship / Learn / Serve / Fellowship / Play / Arboretum all exist. Serve has the "Gardens" and "Events Planning" sections that ALL describe Episcopal Relief & Development instead of describing those ministries — March audit flagged this; still not fixed. The `/ccm-volunteering/` sub-link in the Serve dropdown is broken. Fellowship content is solid but photos and text have a 2015–2017 vintage feel. Play is an amusing catch-all for VBS + Hops Helping Haiti + Tacky Gift Exchange + Wine Tasting — these are undated event memories, not upcoming events, which makes the page read like a scrapbook. Arboretum is surprisingly substantive with 40+ memorial tree dedications — probably meaningful to the people who dedicated them, but niche.

### Giving
This is the biggest active content problem on the site. The /giving/ URL serves a December 7, 2022 stewardship appeal titled "Giving a Little Extra" that opens with discussion of the church's $48,884 deficit. It's the page that the top-nav "Giving" link resolves to. It is 3.5 years old and leads with financial distress. /online-giving/ is appropriate and functional for 2026. `/2026-estimated-giving/` and `/income-tax-benefits/` — both linked from the Giving dropdown — return 404. So the Giving section is simultaneously the primary revenue page AND the most broken section.

### Rector Search Committee
Top-nav link `/rector-search-committee/` is 404. The actual content lives at `/next-steps-and-sharing-your-responses/` (Feb 12, 2026), which is a blog post, not a dedicated search-committee landing page. "Your perspectives are needed!" (April 16, 2026) is the most recent update. There's no consolidated "where are we in the search" status page, no committee roster, no timeline. For a parish in active rector transition this is a notable gap.

### Sign Ups
Parent 404s. Currently contains Iconography Retreat (legitimately upcoming — May 18-22, 2026), Ball Game (June 8, 2026), and Personal Communion (May 27, 2021 — a pandemic-era holdover that should have been retired 3+ years ago). Easter Flowers and Maundy Thursday sign-ups appeared to be nav items in March but Easter Flowers is now 404; Maundy Thursday is a minimal stub. The section is a reasonable concept implemented as manual WordPress pages, which is why it's always stale.

### Lockhart CDC
Top-nav link `/lockhart-cdc/` 404s on the church site. Nav jumps externally to lockhartcdc.org (Wix). No integration between the two sites.

### Connect with Realm / Get the Latest
"Connect with Realm" is a top-nav item that returns 404. "Get the Latest" is a functional hub page linking to bulletins, calendar, sermons, annual reports.

### News / Blog
No archive page. `/blog/`, `/news/`, `/category/news/` all 404. Individual posts are accessible by direct URL and appear on the homepage feed. Posts from Jan–Apr 2026 are present and current; older content has no clear archive.

---

## 3. Broken / 404 URLs

Every one of these is linked from the site navigation or body:

1. `/im-new/` — nav parent (I'm New)
2. `/who-we-are/` — nav parent (Who We Are)
3. `/get-help/` — nav parent (Get Help)
4. `/get-involved/` — nav parent (Get Involved)
5. `/sign-ups/` — nav parent (Sign Ups)
6. `/rector-search-committee/` — top-nav direct link
7. `/connect-with-realm/` — top-nav direct link
8. `/lockhart-cdc/` — top-nav direct link (substituted with external link in the menu, but the WP URL is dead)
9. `/2026-estimated-giving/` — Giving dropdown
10. `/income-tax-benefits/` — Giving dropdown
11. `/ccm-volunteering/` — Serve dropdown
12. `/cookbook/` — Fellowship dropdown
13. `/easter-flowers/` — previously in Sign Ups
14. `/invitation-to-holy-week/` — linked from homepage feed (March 24 post, now 404)
15. `/blog/`, `/news/`, `/category/news/` — no news archive exists

That is **five dropdown parents** and **eight individual pages** that visitors will click and hit a WordPress 404 page. For a ~45-URL site, **~30% of nav-accessible URLs are broken**.

---

## 4. Content Debt List

### Dated content still live
- **`/giving/` = Dec 7, 2022 deficit appeal.** Referenced in March audit. Still the page behind the top-nav "Giving" link.
- **`/personal-communion/` = May 27, 2021 post.** Pandemic-era private-Eucharist registration, still in Sign Ups nav nearly 5 years later.
- **`/stewardship-tools-for-gods-sharecroppers/`** — older stewardship post still indexed and findable.
- **Fellowship page references "2017 Social Saints lunch initiation."**
- **History timeline ends at 2014.** Missing: Nancy Cox's 2025 retirement, Johanssen's 2026 interim appointment, any events from the last 11 years.
- **`/annual-meeting-questions/` (Jan 25, 2026)** — still linked from homepage feed though the meeting has passed.
- **`/lent-holy-week-and-easter-opportunities/` (March 2, 2026)** — Easter has passed (April 5); post still live.

### "Bio coming soon" placeholders
- Erin Vanasse (Administrator) — flagged in March, still coming
- Ruth Brown (Communications Assistant) — flagged in March, still coming

### Forms / platforms
- **`user_custom_social_links_one` and `user_custom_social_links_two`** — literal placeholder strings visible in the footer of every page. WordPress theme configuration bug. Functional as phone/maps, but the label is un-replaced template text.
- **Facebook page widget** — shows `Loading...` spinner indefinitely on most pages. Likely due to Facebook's deprecation of Page Plugin embeds without an FB App ID, or an expired integration.
- **Prayer request form** — linked from /prayer/ (presumed functional but not submission-tested).
- **Contact form at /connect/** — uses CAPTCHA + 17-item interest checklist + country dropdown. Form works but feels bureaucratic for a "get in touch" interaction.
- **ExactMetrics plugin installed but never configured** (noted in March audit). No analytics data being captured.

### Stale event sign-ups / seasonal pages
- Sign Ups section by design accumulates seasonal stubs. Current inventory (Iconography, Ball Game, Personal Communion) mixes an upcoming retreat, an upcoming social, and a 5-year-old pandemic artifact.

### Broken/dead nav items
See Section 3 — 15 distinct broken URLs linked from the main navigation.

---

## 5. URL Inventory by Status (Migration Plan)

### KEEP AS-IS — content survives migration mostly intact (10 URLs)

Content here is accurate and current; copy can be lifted with light polish.

| URL | Why keep |
|---|---|
| `/service-hours/` | Accurate, useful, visitor-critical |
| `/clergy/` | Current (Johanssen start date correct). Strongest content on the site. |
| `/what-is-an-epis/` | Clear, well-written, evergreen explainer |
| `/history/` | Good narrative — **add a 2014–2026 section on migration** |
| `/life-events/` | Well-structured tabs for sacraments |
| `/online-giving/` | 2026 giving campaign page, currently accurate |
| `/arboretum/` | Niche but meaningful, 40+ dedications are real |
| `/iconography-retreat/` | Real upcoming event, should be on new site (then retire) |
| `/take-us-out-to-the-ball-game/` | Real upcoming event (June 8), keep through that date |
| `/your-perspectives-are-needed/` | Active rector-search communication (April 16) |

### REWRITE — content needed but copy must be refreshed or restructured (12 URLs → becoming ~8 pages)

Intent survives; execution needs to be re-done.

| URL | Change needed |
|---|---|
| `/` (homepage) | Rebuild — reduce from 10+ sections to 4–5. Lose reverse-chron blog dump. Fix nav to 5–6 top-level items. Kill placeholder footer strings. |
| `/welcome-from-the-rector/` | Rewrite as permanent-rector letter once called; interim version OK for now but needs a "this is an interim period" frame |
| `/staff/` | Fill in the two "coming soon" bios or remove them |
| `/vestry/` | Keep names, tighten presentation, add 1-line role descriptions instead of liaison-speak |
| `/worship/` | Consolidate with service hours + music ministry into one "Worship" page |
| `/learn/` | Tighten; consolidate children/youth/adult into one "Formation" page |
| `/serve/` | Fix the "Gardens/Events Planning both describe Episcopal Relief" bug. Rewrite thin descriptions. Merge into "Get Involved". |
| `/fellowship/` | Refresh 2017-era content. Merge into "Get Involved". |
| `/play/` | Decide if this is a page or a photo gallery. As a page of random past events, it's weak. |
| `/prayer/` + `/pastoral-care/` + `/stephen-ministry/` | Consolidate into one "Pastoral Care & Prayer" page |
| `/next-steps-and-sharing-your-responses/` | Convert to a real "Rector Search" landing page with committee roster + timeline + how to submit input |
| `/get-the-latest/` | Rebuild as a simple "News & Resources" hub |

### CUT — delete, redirect, or consolidate away (23+ URLs)

| URL | Reason to cut |
|---|---|
| `/im-new/` (dead) | Build a new I'm New landing in Squarespace; this WP URL is a 404 anyway |
| `/who-we-are/` (dead) | Same — build new parent |
| `/get-help/` (dead) | Same |
| `/get-involved/` (dead) | Same |
| `/sign-ups/` (dead) | Same — don't need a Sign Ups top-level in new IA |
| `/become-a-member/` | Fold content into I'm New / FAQ; doesn't need a standalone page |
| `/connect/` (17-option form) | Replace with lightweight contact on new site |
| `/giving/` (2022 deficit appeal) | Delete. Hard cut. Under no circumstance does this migrate. |
| `/stewardship-tools-for-gods-sharecroppers/` | Old blog post; cut |
| `/2026-estimated-giving/` (404) | Redirect to /online-giving/ on new site |
| `/income-tax-benefits/` (404) | Content consolidates into giving FAQ if needed |
| `/rector-search-committee/` (404) | Redirect to new rector-search page |
| `/connect-with-realm/` (404) | Link externally to Realm; no church-site page needed |
| `/lockhart-cdc/` (404) | Link externally to lockhartcdc.org; maybe one "Lockhart CDC on our campus" page |
| `/ccm-volunteering/` (404), `/cookbook/` (404), `/easter-flowers/` (404), `/invitation-to-holy-week/` (404) | All already broken, no migration cost |
| `/live-events/` | Redundant with service hours + calendar |
| `/personal-communion/` (May 2021) | Pandemic artifact; cut |
| `/maundy-thursday/` | Seasonal stub; rebuild annually if needed |
| `/ministry-contacts/` (PDF directory) | Replace with inline contact-per-ministry on Get Involved pages |
| `/koinonia/` | Historical record of 2022–2023 discernment. Archive, don't migrate. |
| `/annual-meeting-questions/` | Stale post (January) |
| `/lent-holy-week-and-easter-opportunities/` | Seasonal, now past |
| `/have-any-of-you-gone-fishing/` | Children's sermon reprint; nice but not evergreen |
| `/giving-children-a-place-to-grow/` | Lockhart CDC feature article; maybe republish on lockhartcdc.org |
| `/2025-annual-report/` | Link to Flipsnack file from a "Resources" page; doesn't need its own URL |
| Blog archive (doesn't exist anyway) | Don't recreate a blog on Squarespace unless staff commits to feeding it |

---

## Migration math

- **Current URLs discovered:** ~45
- **Currently broken (404):** 13 (~30%)
- **Proposed new-site page count:** ~12–15
- **Reduction:** from ~45 URLs to ~12–15 pages ≈ **67–73% cut**

This comfortably clears the "responsibly cut 50%+" bar. Nothing important is lost because:
- Service times, clergy bios, history, giving, and rector-search content all carry over
- Dead 404 URLs aren't losing anything (they already are nothing)
- Seasonal posts and one-off sermons aren't what visitors come for
- The bureaucratic PDF directories and liaison-area naming get replaced with plain-English equivalents

---

## Honest observations

**What's surprisingly good:**
- Clergy bios — warm, personal, specific. The best writing on the site.
- The two-churches founding story on /history/.
- Content IS being actively maintained. Posts from this week (April 16) and upcoming calendar events through April 22 prove the site isn't abandoned — it's just stuck on a platform that makes small, visible issues expensive to fix.
- Rev. Johanssen's name has been added to clergy and welcome pages since the March audit. Someone is paying attention.

**What's bad:**
- Nav is broken at the structural level. Five parent categories 404. This isn't a content problem, it's an architecture problem.
- The Giving page is a 3.5-year-old deficit appeal. This is the single worst piece of content on the site.
- "Bio coming soon" placeholders for two staff members have been there for 3+ weeks (at minimum; possibly much longer).
- Placeholder text (`user_custom_social_links_one`) has been shipping in production footer copy for an unknown but long period. Nobody caught it.
- Facebook widget is broken/loading on every page.
- No analytics. The team has no idea what visitors actually look at.

**What the migration to Squarespace fixes for free:**
- Dropdown parent 404s (Squarespace doesn't let you nav to a page that doesn't exist)
- Footer placeholder text (theme-level, not page-level)
- Search/archive pages (Squarespace handles those by default)
- Mobile responsiveness (assumed — worth verifying on current site separately)
- Ability for non-technical staff to update "Bio coming soon" and seasonal content without a WordPress developer

**What the migration doesn't fix:**
- Whoever is supposed to write Erin and Ruth's bios still needs to write them.
- Whoever is supposed to update the Giving page still needs to update it.
- The church still needs to decide if it has the bandwidth to run a blog, or whether the weekly newsletter (Constant Contact) is the right single channel.
