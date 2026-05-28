# Prompt for Claude in Chrome — Round 2 (missing 13 sites)

Paste this entire document into the Claude in Chrome side panel. Set "Act without asking" at the bottom.

---

## Read this first — don't skip

Round 1 of this research ran out of context about halfway through. We got 5 good captures out of 20. This round is just the missing 13 sites, with a tighter template to fit in a single session.

**Output mode:** Produce all output INLINE in this chat, one site at a time, clearly labeled with the filename each output would have had. Do NOT ask about a file path — the previous session confirmed disk write doesn't work from this context.

**Hard rules:**
1. **No interpretation, no synthesis.** Just capture what's there.
2. **Never invent data.** If a field isn't findable, write `NOT FOUND` for that field. Do not write `NOT FOUND` for every field on a whole page unless the page genuinely failed to load — in that case, say `LOAD FAILED` and move on.
3. **Never quote more than 15 words from a single source.** Paraphrase longer content.
4. **No filler.** Target 300-450 words of evidence per site. Lean and complete.

**If a site will not load after two tries:** log it in the `## Issues / flags` section of `_index-round2.md` at the end and move to the next site. Don't spend time debugging one site.

---

## The 13 sites — visit in this exact order

Do them in this order so that if you run out of context, the most important ones are captured first.

### Tier 2 — Living Church fastest-growing list (4 sites)
1. `tier2-st-matthews-hyattsville` — St. Matthew's Episcopal Church, Hyattsville, MD — https://stmatthewshyattsville.org/
2. `tier2-christ-church-tulsa` — Christ Church Episcopal, Tulsa, OK — https://www.christchurchtulsa.org/
3. `tier2-falls-church-episcopal` — The Falls Church Episcopal, Falls Church, VA — https://www.thefallschurch.org/ (if this domain resolves to the ACNA parish, find the correct Episcopal parish domain and note it)
4. `tier2-grace-yukon` — Grace Church Episcopal, Yukon, OK — https://www.graceyukon.org/

### Tier 3 — Large/notable Episcopal parishes (5 sites)
5. `tier3-christ-church-cranbrook` — Christ Church Cranbrook, Bloomfield Hills, MI — https://christchurchcranbrook.org/
6. `tier3-st-barts-nyc` — St. Bartholomew's, New York — https://stbarts.org/
7. `tier3-trinity-wall-street` — Trinity Church Wall Street — https://trinitychurchnyc.org/
8. `tier3-washington-national-cathedral` — Washington National Cathedral — https://cathedral.org/
9. `tier3-st-martins-houston` — St. Martin's Episcopal Church, Houston — https://www.stmartinsepiscopal.org/

### Tier 4 — Affirming parishes in conservative regions (4 sites)
10. `tier4-christ-church-kennesaw` — Christ Episcopal Church, Kennesaw, GA — https://christchurchkennesaw.com/
11. `tier4-st-marks-dalton` — St. Mark's Episcopal Church, Dalton, GA — https://stmarksdalton.org/
12. `tier4-ascension-cartersville` — Episcopal Church of the Ascension, Cartersville, GA — https://ascensioncartersville.org/
13. `tier4-holy-trinity-decatur` — Holy Trinity Parish, Decatur, GA — https://holytrinitydecatur.org/

---

## Per-site template — use exactly this format, fill every field

```markdown
FILE: `tier{N}-{slug}.md`

# [Parish Name] — [City, State]
URL: https://example.com/
Tier: 2 / 3 / 4
Date visited: 2026-04-20
Load status: OK / PARTIAL / FAILED

## HOMEPAGE HERO (above-the-fold, desktop)
- Hero type: [photo / video / slideshow / text / illustration]
- Hero headline, verbatim: "..."  (or NOT FOUND)
- Hero subhead if present: "..."
- Hero CTA buttons, in visual order — exact text, destination:
  1. "..." → [URL or destination]
  2. "..." → ...
  3. "..." → ...
- Hero photo subject — describe what's shown (under 20 words)
- Service times visible above-the-fold? [yes, quote / no]

## TOP NAV — verbatim, left to right
List every top-level nav item, exact text. For each, list dropdown children if they exist.
- Is there a persistent "Plan a Visit" / "I'm New" CTA in the top nav? [yes / no, quote button text]

## "I'M NEW" / "PLAN A VISIT" / "WELCOME" PAGE
If multiple candidate pages, pick the one a first-time visitor would land on. Note the URL.
- Page URL: ...
- Page H1: "..."

### Inline information check — answer yes/no for each, ON THIS PAGE:
| Info | Present? | Exact phrasing (under 15 words) or NOT FOUND |
|---|---|---|
| Service day(s) | yes/no | "..." |
| Service time(s) | yes/no | "..." |
| Service address | yes/no | "..." |
| What to wear | yes/no | "..." |
| Kids / nursery info | yes/no | "..." |
| Parking instructions | yes/no | "..." |
| Where to enter / front door guidance | yes/no | "..." |
| Service length | yes/no | "..." |
| Communion practice | yes/no | "..." |
| Affirming / welcoming statement | yes/no | quote under 15 words |
| Episcopal denomination mention | yes/no | "..." |

## FOOTER — check each element
- Address: yes verbatim / no
- Phone: yes verbatim / no
- Email: yes verbatim / no
- Service times: yes verbatim / no
- Episcopal shield or diocesan logo: yes / no
- Diocesan link: yes / no
- Social icons: [list platforms linked, or none]
- Newsletter signup: yes / no
- Giving link: yes verbatim button text / no
- Land acknowledgment: yes / no

## SITE-WIDE TEXTURE
- Clergy naming style: [e.g. "The Rev. Jane Smith" / "Fr. Mike" / "Pastor Sarah"]
- Three short quotes that give the feel of the site's writing (each under 15 words):
  1. "..."
  2. "..."
  3. "..."
- First 3 homepage photos — subject of each, real or stock:
  1. [subject] — real / stock
  2. [subject] — real / stock
  3. [subject] — real / stock

## NOTABLE — 1-2 specific observations
Things this parish does that stand out. Describe, don't editorialize.

## Issues / flags
- Any page that failed to load, ambiguity, or data gap the analyst should know about.
```

---

## Final output — produce `_index-round2.md` at the very end

```markdown
# Round 2 Research Index
Date: 2026-04-20

## Files produced
- tier2-st-matthews-hyattsville.md
- ...

## Sites that loaded cleanly
- [list of slugs]

## Sites with partial data or issues
- [slug] — [what went wrong]

## Sites that failed entirely
- [slug] — [reason]

## Total
- Attempted: 13
- Successfully captured: N
- Partial: N
- Failed: N
```

---

## Copy/paste checklist before you start

- [ ] "Act without asking" is enabled
- [ ] You will NOT ask about file paths — output is inline only
- [ ] You will visit sites in the numbered order above
- [ ] You will produce one FILE: block per site using the template
- [ ] You will end with `_index-round2.md`
- [ ] You will not synthesize, compare, or rank — raw evidence only
