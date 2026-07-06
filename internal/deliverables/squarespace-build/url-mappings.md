# URL preservation — the single source of truth

Every physically-referenced URL and every redirect for cutover lives **here**.
(Rationale / who-confirmed-what stays in `memory/project_preserved_urls.md`; the
operational list is this file only.)

**Principle: for anything on a sign, plaque, pew card, or printed piece, recreate the URL
1:1 as a real page at the exact slug. Do NOT use a 301 for these.** A redirect is a live
Squarespace-specific dependency that can break on a platform update or disappear if the
parish ever migrates off Squarespace. A real page at the exact URL is robust and portable.
301s are only for never-printed convenience links.

---

## A. Exact-slug pages (1:1, no redirect) — the primary approach

Set each page's slug to the exact old URL. Match case; Squarespace serves without a trailing
slash and normally normalizes `/x/` → `/x`, but confirm with a real scan (below).

| Old URL (physical reference) | Recreate as | Slug to set | In nav? |
|---|---|---|---|
| `/arboretum/` (garden signs, QR to directory) | **Blog collection** | collection slug `arboretum` → serves `/arboretum` | Yes (in Arboretum) |
| `/arboretum/[tree]` (QR on each tree plaque) | Blog **posts** (via `arboretum.wxr`) | post slug = tree slug → `/arboretum/[tree]` | posts |
| `/prayer-requests/` (printed pew cards) | Page | `prayer-requests` | Yes |
| `/jennifer-cobb-memorial-labyrinth/` (memorial signage) | Page | `jennifer-cobb-memorial-labyrinth` | **Not Linked** |
| `/prayer-labyrinth/` (signage) | Page | `prayer-labyrinth` | **Not Linked** |
| `/tree-of-seasons/` (interpretive signage) | Page | `tree-of-seasons` | **Not Linked** |
| `/tour-de-saints-2021-sponsorship/` (linked from tourdesaints.com) | Page | `tour-de-saints-2021-sponsorship` | **Not Linked** |

Notes:
- "Not Linked" = the page exists and resolves at its exact URL, it's just kept out of the
  nav menu (Pages panel → Not Linked section). Perfect for sign-only URLs.
- The labyrinth / tree-of-seasons pages hold that memorial's own content. (This keeps them
  1:1 instead of folding them into the Arboretum page and redirecting — better for a
  sign-scanner, who lands on the specific memorial.)
- **After DNS cutover, physically scan one real sign per category** (arboretum directory, a
  tree plaque, prayer-requests card, a labyrinth sign) before calling cutover done.

---

## B. 301 redirects — optional, never-printed links only

These were never on physical materials, so a redirect (or just updating internal links) is
fine. Add only if an old link may have been shared/bookmarked. Where it goes:
**Settings → Developer Tools → URL Mappings**. Syntax `/old -> /new 301` (arrow = dash + `>`,
no spaces).

```
/connect/episcopalian -> /episcopalian 301
/connect/life-events -> /life-events 301
/connect/pastoral-care -> /pastoral-care 301
```
(Squarespace page slugs are flat, so the prototype's `/connect/*` children become top-level
slugs. These are internal-only, so updating the footer + Connect hub-card links is the real
fix; the 301s are belt-and-suspenders.)

---

## C. Confirm before cutover
- **Tour de Saints:** confirm the sponsorship page's real home (Brian made it visible under
  Giving). Keep the exact slug regardless of where it sits in the nav.
- **Annual reports:** if any report **file** URLs are linked externally, preserve those too
  (planned to hang off the rector-search page).
- **Sweep for more:** Brian + parish office check printed/etched materials before cutover —
  pew cards, bulletins, business cards, brochures, garden/parking/narthex signage, the
  Churchmouse Cookbook back cover, magnets, mailings. Add any found to section A.
