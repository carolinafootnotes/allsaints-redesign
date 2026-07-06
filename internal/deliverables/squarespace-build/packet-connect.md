# Build packet — Connect (`/connect`)

*Pilot packet + reference example for the rest. Carries the approved copy so nothing is
retyped. Copy source of truth: `worker/public/final/connect/index.html`. Patterns named
below live in `build-any-page.md`.*

**Before you start:** `00-global-setup.md` done; homepage built; global CSS pasted (so the
`.involved-card`, `.care-card`, `.connect-channel-card`, `.community-bento`, `.connect`
classes render). Connect is a **Folder** landing page in the nav (it's the first child of
the Connect folder).

**Heads-up — this is a long page (10 sections, ~30 cards).** It's mostly stable content, so
lean on Code Blocks for the card grids to get the exact look fast; keep the two
link-bearing sections native so URLs stay click-to-edit. Build order is top to bottom.

## Section map

| # | Section | Pattern | Vehicle | Why |
|---|---------|---------|---------|-----|
| 1 | Hero | Subpage hero (1) | **Native** section + bg image | |
| 2 | Life Together (bento) | Bento | **Code Block** | overlapping grid + overlay; native can't do it |
| 3 | Explore (subpage hub) | Card grid (3) | **Native** link cards | links to subpages → keep editable |
| 4 | Get Involved | Card grid (3) | **Code Block** or Native | 6 stable cards; Code Block = exact |
| 5 | Pastoral Care | Card grid (3) | **Code Block** or Native | 5 stable cards |
| 6 | Fellowship | Card grid (3) | **Code Block** or Native | 8 stable cards (has eyebrow residue) |
| 7 | Become a Member | Section header (2) + buttons | **Native** | short text + 2 buttons |
| 8 | Stay Connected | Card grid (3) | **Native** link cards | social/newsletter URLs change → editable |
| 9 | Connect CTA | Closing CTA strip (4) | **Native** | reused site-wide |
| 10 | Footer | global | — | built once in setup |

> For any "Code Block or Native" grid: Code Block = paste the prototype markup for that
> section (it inherits the card CSS) for a pixel-exact, low-effort match. Native = rebuild
> as blocks if you'd rather click-to-edit. These grids rarely change, so Code Block is the
> faster call. Raw markup for each is in `connect/index.html` at the line ranges noted.

---

## 1. Hero — [Native]
Section, full-width, background image + burgundy overlay (the `.page-hero` look; global CSS
has it). Prototype lines 54–64.
- **Background image:** `services_outside-high.jpg` (decorative, empty alt).
- **Label:** Invite · Nurture · Serve
- **H1:** Find your place at *All Saints'*  ← "All Saints'" is the italic emphasis
- **Subtitle:** Worship, formation, service, fellowship, and care. There's a place for you here.

## 2. Life Together (bento) — [Code Block]  (lines 66–117)
Reuse the homepage bento approach: a Section (background cream-tint `#f5f0e8`) + one Code
Block using the `.community-bento` markup, with these 5 cards. (Same structure as
`library/sections/community-bento.html`, different content + a 5th card.)
- **Section label:** Life Together **Heading:** More Than *Sunday Morning*
  **Sub:** Church isn't just a place you go. It's a community you belong to, every day of the week.
- Cards (tag / title / body / image):
  1. **Invite** — Open Doors, Open Hearts — "Newcomer welcomes, parish dinners, and a community that remembers your name." — `labyrinth.jpg`
  2. **Formation** — Growing Together — "Children & Youth ministries, adult formation, two Education for Ministry groups. Faith deepens here." — `services_kids-praying.jpg`
  3. **Serve** — Hands & Hearts — "Through food drives, Cooperative Christian Ministry, and pastoral care visits, we put faith into action across the week." — `9am-service-2026.jpg`
  4. **Music** — Five Voices, One Song — "Choir of All Saints', Resurrection Choir, Bells of All Saints', and the St. Nicholas and Junior Choirs for our youngest singers." — `choir-singing-2026.jpg`
  5. **Fellowship** — The Best Part of Sunday — "Potlucks, coffee hour, and the kind of friendships that last a lifetime." — `bell-garden.jpg`

## 3. Explore (subpage hub) — [Native link cards]  (lines 119–145)
Three `connect-channel-card` links to the Connect subpages. Keep native so the links are
click-to-edit (subpage slugs get finalized during their own builds).
- **Label:** Explore **Heading:** Find Your *Way In*
  **Sub:** Whether you're new to the Episcopal Church, marking a milestone, or in need of care, here is a good place to start.
- Cards → (see Links table for final slugs):
  - **New to the Episcopal Church** — "Liturgy, the open table, and a faith that loves questions"
  - **Life Events** — "Baptisms, weddings, and funerals, held in prayer"
  - **Pastoral Care** — "Prayer, presence, and care when you need it"

## 4. Get Involved — [Code Block or Native]  (lines 147–185)
Section (background cream). 6 `involved-card`s (title + body), then a centered outline
button.
- **Label:** Get Involved **Heading:** Ways to *Serve* **Sub:** Many hands. Many gifts. One body.
- Cards:
  - **Worship Ministries** — "Lectors, acolytes, ushers, greeters, altar guild, intercessors, livestream tech. Roles for every Sunday morning."
  - **Music** — "Five named ensembles: Choir of All Saints', Resurrection Choir, Bells of All Saints', St. Nicholas Choir, Junior Choir."
  - **Children & Youth** — "Sunday school, youth group, nursery volunteers, family formation. Tiffany Fulton coordinates."
  - **Outreach** — "Cooperative Christian Ministry partnership, Lenten food drive, community meals, and seasonal outreach campaigns."
  - **Fellowship & Hospitality** — "Coffee hour, parish dinners, the annual Tour de Saints, and the Churchmouse Cookbook."
  - **Adult Formation** — "Education for Ministry (EfM), seasonal study groups, and contemplative practices. Two EfM cohorts currently meet."
- **Button:** Email the Parish Office → `mailto:admin@allsaintsconcord.org?subject=Getting Involved at All Saints`

## 5. Pastoral Care — [Code Block or Native]  (lines 187–226)
Section (white). 5 `care-card`s (icon + title + body), then a primary button.
- **Label:** When You Need Us **Heading:** Pastoral *Care*
  **Sub:** We walk with each other in joy and in sorrow. Reach out at any time, whether you're a member or not.
- Cards:
  - **Pastoral Visits** — "Hospital, home, and care-facility visits from our clergy. Deacon Vern Cahoon coordinates nursing-home visits."
  - **Stephen Ministry** — "Trained lay caregivers offering one-to-one Christian care through times of crisis, grief, or transition."
  - **Prayer Requests** — "Submit a prayer request, public or confidential. The prayer team holds the parish and our community in prayer each week."
  - **Life Events** — "Baptisms, weddings, funerals, confirmation. Contact the parish office to begin the conversation."
  - **Personal Communion** — "Communion brought to the homebound and those who cannot attend services. Sign up via the parish office."
- **Button:** Contact Us About Care → `mailto:admin@allsaintsconcord.org?subject=Pastoral Care Request`
- Icons: the prototype uses inline SVGs. In native cards use the closest Squarespace icon or
  drop the icon; if you want them exact, Code Block keeps the SVGs.

## 6. Fellowship — [Code Block or Native]  (lines 228–279)
Section (white). 8 `care-card`s, each with a small uppercase **eyebrow** (timing) above the
title. **Residue:** the eyebrow uses an inline `style="…color:#7b2332…"` on every card — in a
Code Block, replace that inline style with a class (add one `.card-eyebrow` rule to global
CSS, or reuse `.section-label`). Don't paste 8 copies of the hardcoded hex.
- **Label:** Life Together **Heading:** Finding Your *People*
  **Sub:** We eat together, we ride together, we show up for each other. You don't have to wait until you know everyone to belong.
- Cards (eyebrow — title — body):
  - *Every Sunday between services* — **Sunday Coffee Hour** — "Grab a cup and put names to faces. This is where the real conversation starts."
  - *During the school year* — **Music Ministry** — "Come together to perfect praises to God in the beauty of holiness. Singers and ringers of every age are welcome."
  - *Seasonal* — **Parish Dinners** — "Sit-down suppers for the whole congregation, no ticket required. We'll send word in the Weekly Word."
  - *Ongoing* — **Stephen Ministry** — "Trained lay caregivers for anyone walking through hard times. Confidential. No appointment needed."
  - *Most Wednesday nights, during the school year* — **Episcopal Youth (EYC)** — "Youth in grades 6 through 12 and their friends gather from 5:30 to 7:30, dinner included. It's about building real relationships, with each other, with mentors, and with God."
  - *Saturday mornings, 8:00 to 9:30* — **Men's Ministry** — "Book and Bible study in the Welcome Center, hands at parish work days and the community night shelter, plus the F3 crew (Faith, Fitness, Fellowship) already sweating before sunrise on Tuesdays, Thursdays, and Saturdays."
  - *Throughout the year* — **Women's Ministry** — "Fellowship, growth, and service, including an Advent quiet day, a Lenten retreat, and a dessert night."
  - *After Christmas Eve and Easter* — **The Revels** — "When the candlelight of Christmas Eve and the last note of Easter fade, we raise a glass together. We call it the revels."

## 7. Become a Member — [Native]  (lines 281–292)
Section (cream), centered.
- **Label:** Become a Member **Heading:** Ready to *Make It Official*?
- **Paragraph:** If you've been worshipping with us and you're ready to formally call All Saints' your church home, we'd love to walk through the next steps with you. Membership in the Episcopal Church can transfer from another parish, or begin here with baptism or confirmation.
- **Buttons:** Start the Conversation → `mailto:admin@allsaintsconcord.org?subject=Becoming a Member` · Sign In to Realm → `https://onrealm.org/AllSaintsEpiscopalConcord` (new tab)

## 8. Stay Connected — [Native link cards]  (lines 294–330)
Section (white). 5 `connect-channel-card` links. **Keep native** — these URLs change.
- **Label:** Stay Connected **Heading:** Follow *Along*
  **Sub:** A few easy ways to keep up with parish life from afar.
- Cards (title — sub — link):
  - **Weekly Word** — "News & reflections by email" — `https://conta.cc/47bfZ6Z` (new tab)
  - **Facebook** — "@AllSaintsEpiscopalConcord" — `https://www.facebook.com/AllSaintsEpiscopalConcord/`
  - **Instagram** — "@allsaintsconcordnc" — `https://www.instagram.com/allsaintsconcordnc/`
  - **YouTube** — "Sunday services and Compline" — `https://www.youtube.com/@allsaintsepiscopalchurchco9498/videos`
  - **Realm Portal** — "Members: directory, giving, groups" — `https://onrealm.org/AllSaintsEpiscopalConcord`

## 9. Connect CTA — [Native, closing strip]  (lines 332–342)
The burgundy `.connect` closing band (pattern 4, reused site-wide — build once, Save
Section).
- **Heading:** Walk with us, however you're ready
- **Paragraph:** There is no first step too small. Visit a service. Ask a question. Sign up for the newsletter. We'll meet you wherever you are.
- **Buttons:** Plan a Visit → `/visit` · Email Us → `mailto:admin@allsaintsconcord.org`

---

## Links — rewrite `/final/…` → final slugs
| Prototype href | Final target |
|---|---|
| `/final/visit` | `/visit` |
| `/final/connect/episcopalian` | Connect-folder child (New to the Episcopal Church) — **confirm final slug** |
| `/final/connect/life-events` | Connect-folder child (Life Events) — **confirm final slug** |
| `/final/connect/pastoral-care` | Connect-folder child (Pastoral Care) — **confirm final slug** |
| `mailto:` / social / Realm / conta.cc | unchanged |

> Squarespace folders flatten child paths (per `00-global-setup.md` step 6 and
> `ia-restructure-plan-jun2026.md`). Set the 3 subpage slugs when you build them, then come
> back and point these hub cards at the real slugs. Add 301s in URL Mappings if the old
> `/connect/*` paths were ever printed/shared.

## Images — upload once, set alt
| File (under `worker/public/final/assets/`) | Alt | Placement |
|---|---|---|
| `2026/selected/services_outside-high.jpg` | (decorative) | Hero bg |
| `labyrinth.jpg` | Outdoor labyrinth with clergy at All Saints' | Bento 1 |
| `2026/selected/services_kids-praying.jpg` | Children praying together at All Saints' | Bento 2 |
| `2026/9am-service-2026.jpg` | Parishioners gathered for worship at All Saints' | Bento 3 |
| `2026/choir-singing-2026.jpg` | Choristers singing at All Saints' | Bento 4 |
| `bell-garden.jpg` | Bell tower with roses on the All Saints' campus | Bento 5 |

## Residue to normalize
- **Fellowship eyebrows (§6):** 8× inline `style="…#7b2332…"`. Add one `.card-eyebrow` rule to
  global CSS and use the class instead of repeating the hardcoded burgundy.
- Section intro wrappers use inline `style="text-align:center;max-width:640px;…"` — harmless
  in a Code Block; in native, center via the block's alignment control.

## Judgment calls
- **Two "Life Together" labels** (§2 bento and §6 fellowship). It's in the approved
  prototype, so port as-is; flag to the group only if they want the section labels
  de-duplicated. Don't silently rename.
- **Pastoral Care appears twice** (hub card §3 → subpage, and full section §5) plus a
  dedicated subpage. Intentional in the prototype (overview here, depth on the subpage).
  Port as-is.
- **Icons:** native cards may not match the prototype's inline SVGs. Either use a Code Block
  (exact) or accept the closest Squarespace icon. Content reads fine either way.
- This page is a strong **card-grid template**: it exercises `involved-card`, `care-card`,
  `connect-channel-card`, and the bento. Once it's built, most other subpages are a subset
  of these patterns.
