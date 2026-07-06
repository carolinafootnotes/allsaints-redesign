# URL Mappings — the single source of truth

Every redirect and preserved slug for cutover lives **here**. (Background/rationale and
who-confirmed-what stays in `memory/project_preserved_urls.md`; the operational list is
this file only, so there's one place to maintain.)

Where it goes in Squarespace: **Settings → Developer Tools → URL Mappings**.
Rule syntax: `/old-url -> /new-url 301` (arrow = dash + `>`, no spaces; `301` permanent).
Redirects fire only once the old path 404s.

---

## A. Exact-slug pages — QR codes, NO redirect (set the page/collection slug)
These are scanned off metal signs, so the new page must live at the **exact same slug**
(match case + trailing slash). Set the slug in the page/collection settings, don't rely on
a redirect hop.

- `/arboretum/` — Blog **Collection** slug = `arboretum` (see `arboretum-import.md`).
- `/arboretum/[tree]` — the 36 tree posts; slugs preserved by the WXR import.
- `/prayer-requests/` — page slug = `prayer-requests` (printed pew cards).

**After DNS cutover: physically scan one real sign per category before calling it done.**

---

## B. 301 redirects — paste this block into URL Mappings
Printed-text links where a redirect hop is fine. Labyrinth / tree-of-seasons fold into the
Arboretum per the locked IA (columbarium/labyrinth → Arboretum).

```
/jennifer-cobb-memorial-labyrinth/ -> /arboretum 301
/prayer-labyrinth/ -> /arboretum 301
/tree-of-seasons/ -> /arboretum 301
/tour-de-saints-2021-sponsorship/ -> /giving 301
```

Optional (Connect children flattened; not printed/preserved, add only if any old link was
shared externally):
```
/connect/episcopalian -> /episcopalian 301
/connect/life-events -> /life-events 301
/connect/pastoral-care -> /pastoral-care 301
```

---

## C. Confirm before cutover
- **Labyrinth / Tree of Seasons targets:** currently → `/arboretum`. If those get a dedicated
  section or anchor on the Arboretum page, point the redirects at it instead.
- **Tour de Saints target:** `/giving` is a guess (Brian made it visible under Giving). Confirm
  vs a dedicated page or the external `tourdesaints.com`.
- **Annual reports:** if any report **file** URLs are linked externally, preserve those too
  (they're planned to hang off the rector-search page).
- **Sweep for more:** Brian + parish office check printed/etched materials before cutover —
  pew cards, bulletins, business cards, brochures, garden/parking/narthex signage, the
  Churchmouse Cookbook back cover, magnets, mailings. Add any found here.
