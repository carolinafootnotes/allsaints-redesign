---
name: URL preservation audit — printed materials sweep
status: action items for Nate + Brian (walk-through required)
owner: Nate (initiate) + Brian (parish admin, knows what's been printed)
priority: cutover blocker — must complete before mid-July DNS flip
date: 2026-05-28
---

# URL preservation audit

## Why this matters

Some URLs on the current `allsaintsconcord.org` are printed on physical materials that **cannot be reprinted or replaced** without significant cost or time (metal signs, printed pew cards, brochures, magnets, books). If a printed URL stops working at cutover, the physical material breaks silently until someone notices.

Every preserved URL must either keep its **exact slug** on the Squarespace site, OR have a **301 redirect** set up via Squarespace's URL Mappings.

## Already confirmed (from email + memory, May 2026)

- `/arboretum/` — metal QR-code signs on memorial trees throughout church gardens
- 36 individual memorial tree slugs (full list in CSV at `internal/deliverables/wp-page-triage.csv`)
- `/jennifer-cobb-memorial-labyrinth/` — memorial signage
- `/prayer-labyrinth/` — on-campus signage
- `/tree-of-seasons/` — memorial / interpretive signage
- `/prayer-requests/` — printed pew cards
- `/tour-de-saints-2021-sponsorship/` — referenced from tourdesaints.com

## What still needs to be checked — physical walk-through

Nate and Brian should walk the church premises together with a phone camera and capture every URL printed on:

### Inside the building

- [ ] **Pew cards** — every type of card in the pew racks
- [ ] **Bulletins** — recent service bulletins (front cover, inside, back)
- [ ] **Brochures** — newcomer welcome, ministry brochures, baptism, marriage, funeral guides
- [ ] **Narthex displays** — bulletin boards, info tables, racks
- [ ] **Sunday school / Education wing** — posters, curriculum handouts, registration cards
- [ ] **Parish hall** — any signage or printed materials displayed on walls or tables
- [ ] **Choir / music** — printed materials given to choristers or families (rehearsal schedules, audition cards)
- [ ] **LCDC** — any printed materials with church URLs (parent info, signage)

### Outside the building

- [ ] **Parking lot signs** — visitor signs, welcome signs, directional signs
- [ ] **Building exterior signs** — main sign, side entrances, drop-off
- [ ] **Gardens** — every plaque, marker, and QR code (arboretum already covered; check Jennifer Cobb labyrinth, prayer labyrinth, Tree of Seasons, columbarium, gardens of remembrance, butterfly garden, anything else)
- [ ] **Memorial stones / plaques** — anywhere on grounds
- [ ] **Buried bell / bell garden** — any associated signage

### Off-premises printed materials

- [ ] **Business cards** — staff cards, clergy cards, vestry cards
- [ ] **Letterhead** — stationery used for parish correspondence
- [ ] **Mailings** — recent newsletters, capital campaign materials, stewardship mailings
- [ ] **Churchmouse Cookbook** — back cover and inside any URLs
- [ ] **Annual reports (printed)** — any URLs on covers or in financial sections
- [ ] **Outreach partner materials** — anything CCM, Habitat, Tour de Saints, etc. that links back to the parish site
- [ ] **Diocese of NC publications** — anything that lists `allsaintsconcord.org/X`

### Digital materials that may have been emailed/distributed and now exist in someone's archive

- [ ] **Realm communications** — past Realm emails with embedded URLs
- [ ] **Constant Contact / Mailchimp archives** — historical newsletter URLs
- [ ] **Social media** — Facebook page bio, Instagram bio, YouTube channel "About" section (these can be updated, but check what they point to now)
- [ ] **Google Business listing** — what URLs are linked
- [ ] **Episcopal diocesan directory** — parish profile URL

### Magnets, signs, swag

- [ ] **Refrigerator magnets** — any given to members
- [ ] **Yard signs** — campaign or event signs given to members
- [ ] **Tour de Saints** — riders' materials, route signs, sponsor materials, registration cards

## How to capture findings

For each printed URL found, record in a spreadsheet (or appended to this file):

```
url_on_print | material_type | physical_location | reprint_feasibility | strategy
```

Where:
- `reprint_feasibility`: "cheap reprint" / "moderate cost" / "cannot reprint" (metal, etched, mass-distributed)
- `strategy`: "preserve exact slug" (for cannot-reprint) / "301 redirect" (for accepted) / "reprint after cutover" (for cheap)

## When to do this

**Start: now (early June).** Six weeks before cutover gives time to:
- Build the preserved-URL list
- Confirm with Brian and any clergy who's been printing things
- Build out the Squarespace slug structure to match
- Build the Squarespace URL Mappings list for 301s
- Test scan a representative QR code AFTER DNS cutover but BEFORE declaring done

**Hard deadline:** the audit must be complete before the Squarespace site is finalized, not after. Adding redirects post-cutover means materials silently break in the meantime.

## Squarespace mechanisms

- **Exact slug preservation:** Build the page at the exact same URL path on Squarespace (Settings → Page Settings → URL slug). Match case and trailing slash.
- **301 redirect:** Settings → Advanced → URL Mappings. Format: `/old-slug/ -> /new-slug 301`. Bulk-add via copy-paste from your spreadsheet.

## Cutover-day verification

For metal/etched URLs specifically (arboretum trees, plaques): scan at least one QR per category AFTER DNS propagates, before declaring cutover complete.

---

*This document supersedes the cursory URL list in `[[project-preserved-urls]]`. The walk-through is the cutover blocker.*
