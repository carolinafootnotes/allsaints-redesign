# Consolidate targets — where each folded page goes

The 20 pages marked **Consolidate** in the first triage pass, each mapped to a destination in the new site. Verified against the actual `/final` pages and (for "Support") the WordPress export.

Legend: **Done** = content already lives on the new page. **Add** = destination exists, this content still needs to be folded in. **New** = destination page doesn't exist yet.

| # | Page | Destination | State | Note |
|---|------|-------------|-------|------|
| 12 | Bulletins | `/happenings` (worship bulletins archive) | Add | 26-word utility page; link the bulletins archive, 301 the slug |
| 14 | Christian Education | `/learn` | Add | Learn already covers formation; fold class names/times in |
| 19 | Episcopal Youth | `/learn` (formation) + `/fellowship` (social side) | New | Formation detail to learn; youth-group social life to the new fellowship page |
| 22 | Get the Latest | `/happenings` (canonical) + link from `/connect` | Add | Just a newsletter signup; one home, linked from connect |
| 27 | In the Church | `/serve` | Done | Serve already has an "In the Church" section |
| 28 | In the Community | `/serve` | Done | Serve already has an "In the Community" section |
| 29 | In the World | `/serve` | Done | Serve already has an "In the World" section |
| 33 | Life Events | `/connect/life-events` | Done | Already folded |
| 34 | Live Events | `/watch-and-listen` | Done | Already folded |
| 37 | Men's Ministry | `/fellowship` | New | Affinity group, no current home; goes on the new fellowship hub |
| 46 | Pastoral Care | `/connect/pastoral-care` | Done | Already folded |
| 49 | Prayer | `/connect/pastoral-care` + `/prayer-requests` (form) | Add | General prayer content to pastoral-care; form routes to prayer-requests |
| 58 | Service Hours | `/visit` | Add | Office/worship times belong on visit |
| 61 | Stephen Ministry | `/connect/pastoral-care` | Add | Pastoral-care does NOT list it yet, needs adding (it does list Stitches) |
| 62 | Stitches for the Saints | `/connect/pastoral-care` | Done | Already named on pastoral-care as a care ministry |
| 63 | Support | `/serve` | Add | WP body is "Worship Support / Acolytes" = liturgical volunteers, NOT giving or grief. Same bucket as #79 |
| 75 | What is an Episcopalian | `/connect/episcopalian` | Done | Already folded |
| 76 | What to Expect | `/visit` | Add | 1,876 words; visit has a "First Sunday" section, audit for anything unique before retiring |
| 77 | Women's Ministry | `/fellowship` | New | Same as Men's Ministry |
| 79 | Worship Support | `/serve` | Done | Serve lists Altar Guild, Ushers, Worship Support already |

## SUPERSEDED (2026-06-01): no new page; folded into connect

The recommendation below was to build a new `/fellowship` page. After design-team review, that was reversed: connect is already the relational hub, so a separate page would duplicate it. Instead, Men's Ministry, Women's Ministry, Episcopal Youth, and the "revels" tradition were added as cards to connect's existing `#fellowship` section (shipped, commit 98035b4). The original rationale is kept below for reference only. The "New page" rows in the table above now mean "added to /final/connect's fellowship section."

## The one new page: `/fellowship` (superseded, see above)

This is the only genuine gap. The affinity groups (Men's Ministry, Women's Ministry, Episcopal Youth's social side, and pending the committee, Young Adults and Primetimers) have nowhere to go in the current IA. And Nate already marked **Fellowship** as **Keep**, but `/final/fellowship` doesn't exist yet. Those line up: build one `/fellowship` page.

- **One page, named sections** (one per group): who it's for, when it meets, one contact. Not a page per group.
- **Launch with** Men's, Women's, and Episcopal Youth (social). Add Young Adults / Primetimers once the parish confirms they're active.
- **Why it helps the clergy-candidate read:** a candidate wants to see communities of practice across life stages, an active between-Sunday culture, not just Sunday attendance. One organized fellowship page signals that; four thin group stubs (or nothing) does not.

No other new pages. Don't build a separate Groups landing, Ministry Directory, or standalone Worship Support page, serve handles liturgical ministry, fellowship handles relational community. Two buckets, no sprawl.

## What this means for the build list

- **Done (already on the new site):** In the Church/Community/World, Life Events, Live Events, Pastoral Care, Stitches, What is an Episcopalian, Worship Support. No work.
- **Add (fold content into an existing page):** Bulletins, Christian Education, Get the Latest, Prayer, Service Hours, Stephen Ministry, Support, What to Expect.
- **New page:** `/fellowship` (also absorbs the Fellowship "Keep" and the youth/affinity content).
