# Prompt for Claude Code CLI — Round 2 Research (missing 13 sites)

## How to invoke

From terminal, cd into your research folder and start Claude Code:

```
cd /Users/varloo/develop/allsaints/website-research
claude
```

Then paste this entire document as your first message. If you want to skip per-action approval prompts, start with `claude --dangerously-skip-permissions` (only if you're comfortable — you already trust what this is doing).

---

## Context

You are Claude Code, helping Nate — a lay leader at All Saints' Episcopal Church in Concord, NC — gather raw evidence from 13 Episcopal parish websites. This is Round 2 of a research project; Round 1 already captured 5 sites (Jubilee Austin, Incarnation Dallas, Trinity Portland, St. Paul's Prosper, Grace Brooklyn).

**A separate Claude session (running in Cowork mode) will synthesize patterns from what you capture.** Your job is scraping, not analysis. Faithful, structured, quotable — do not infer, categorize, or recommend.

**Hard rules:**
1. **No interpretation.** If the hero says "All are welcome," write that. Don't write "signals inclusivity."
2. **Never invent data.** `NOT FOUND` for fields you can't locate. `LOAD FAILED` for whole pages that don't load.
3. **Copyright: never more than 15 words quoted from any single source.** Paraphrase longer content.
4. **Per-site target: 300-450 words of structured evidence.** Lean and complete, no padding.
5. **If a site fails to load after two tries, log it in `_index-round2.md` and move on.** Don't burn time debugging one site.

---

## Tools you'll use

- **WebFetch** on each site's URL — primary capture method. Ask it for the specific elements you need (hero, nav, I'm New page, footer, first 3 photos' alt text, etc.). Don't ask for "everything" — focused prompts per fetch.
- **Write** — one markdown file per site, saved to the current directory. Filename = the slug listed below + `.md`.
- **Task (subagents)** — if you have access, consider dispatching 3-4 parallel subagents, each handling a cluster of 3-4 sites. This protects against any one thread running out of context. If you don't want to use subagents, that's fine — single-threaded is simpler.

---

## The 13 sites — ordered so most important come first

Run them in this order so if context runs low, the critical ones are captured.

### Tier 2 — Living Church fastest-growing list (4 sites)
1. `tier2-st-matthews-hyattsville` — St. Matthew's Episcopal Church, Hyattsville, MD — https://stmatthewshyattsville.org/
2. `tier2-christ-church-tulsa` — Christ Church Episcopal, Tulsa, OK — https://www.christchurchtulsa.org/
3. `tier2-falls-church-episcopal` — The Falls Church Episcopal, VA — https://www.thefallschurch.org/ (if this resolves to the ACNA parish, locate the actual Episcopal parish's domain and note the correction)
4. `tier2-grace-yukon` — Grace Church Episcopal, Yukon, OK — https://www.graceyukon.org/

### Tier 3 — Large/notable Episcopal parishes (5 sites)
5. `tier3-christ-church-cranbrook` — Christ Church Cranbrook, MI — https://christchurchcranbrook.org/
6. `tier3-st-barts-nyc` — St. Bartholomew's, NYC — https://stbarts.org/
7. `tier3-trinity-wall-street` — Trinity Church Wall Street — https://trinitychurchnyc.org/
8. `tier3-washington-national-cathedral` — Washington National Cathedral — https://cathedral.org/
9. `tier3-st-martins-houston` — St. Martin's Episcopal Church, Houston — https://www.stmartinsepiscopal.org/

### Tier 4 — Affirming parishes in conservative regions (4 sites)
10. `tier4-christ-church-kennesaw` — Christ Episcopal Church, Kennesaw, GA — https://christchurchkennesaw.com/
11. `tier4-st-marks-dalton` — St. Mark's Episcopal Church, Dalton, GA — https://stmarksdalton.org/
12. `tier4-ascension-cartersville` — Episcopal Church of the Ascension, Cartersville, GA — https://ascensioncartersville.org/
13. `tier4-holy-trinity-decatur` — Holy Trinity Parish, Decatur, GA — https://holytrinitydecatur.org/

---

## Per-site workflow

For each site, in order:

### Step 1 — Fetch the homepage
WebFetch `https://[site]/` with this prompt:
> Extract the following, verbatim where possible: (1) the above-the-fold hero — headline, subhead, CTA buttons in visual order with destinations, description of hero image/video subject; (2) whether service times are visible above-the-fold; (3) the top nav items left-to-right including dropdown children; (4) the first 3 homepage photos — alt text or description, and whether they're real or stock; (5) the footer — address, phone, email, service times, Episcopal shield/diocesan logo, diocesan link, social platforms linked, newsletter signup, giving button text, land acknowledgment. Never quote more than 15 words from any single element.

### Step 2 — Find and fetch the "I'm New" / "Welcome" / "Plan a Visit" page
Look in the top nav for a child called "I'm New", "Welcome", "Plan a Visit", "New Here", "Visit", or similar. If there are multiple candidates, pick the one most likely to be where a first-time visitor lands. WebFetch that URL with this prompt:
> From this page, answer yes/no with exact phrasing (under 15 words each) for: service day(s), service time(s), service address, what to wear, kids/nursery info, parking instructions, where to enter / front door guidance, service length, communion practice, affirming/welcoming statement, Episcopal denomination mention. Also extract: page H1, first CTA on the page with destination, and the clergy naming style used (e.g. "The Rev. Jane Smith" vs "Fr. Mike"). Provide three short quotes that give the feel of the site's writing (under 15 words each).

### Step 3 — Write the file
Write `tier{N}-{slug}.md` using this exact template:

```markdown
# [Parish Name] — [City, State]
URL: https://example.com/
Tier: 2 / 3 / 4
Date visited: 2026-04-20
Load status: OK / PARTIAL / FAILED

## HOMEPAGE HERO (above-the-fold, desktop)
- Hero type: [photo / video / slideshow / text / illustration]
- Hero headline, verbatim: "..."
- Hero subhead: "..."
- Hero CTA buttons in visual order — exact text → destination:
  1. "..." → ...
  2. "..." → ...
- Hero photo subject: [under 20 words]
- Service times visible above-the-fold? [yes, quote / no]

## TOP NAV — verbatim, left to right
- [Nav Item] (dropdown children if any)
- ...
- Persistent "Plan a Visit" / "I'm New" CTA in top nav? [yes / no, quote button text]

## "I'M NEW" / "PLAN A VISIT" / "WELCOME" PAGE
- Page URL: ...
- Page H1: "..."
- First CTA on page: "..." → ...

### Inline information check
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

## FOOTER
- Address: yes verbatim / no
- Phone: yes verbatim / no
- Email: yes verbatim / no
- Service times: yes verbatim / no
- Episcopal shield or diocesan logo: yes / no
- Diocesan link: yes / no
- Social icons: [platforms, or none]
- Newsletter signup: yes / no
- Giving link: yes verbatim button text / no
- Land acknowledgment: yes / no

## SITE-WIDE TEXTURE
- Clergy naming style: [e.g. "The Rev. Jane Smith" / "Fr. Mike" / "Pastor Sarah"]
- Three short quotes that give the feel of the site's writing (each under 15 words):
  1. "..."
  2. "..."
  3. "..."
- First 3 homepage photos:
  1. [subject] — real / stock
  2. [subject] — real / stock
  3. [subject] — real / stock

## NOTABLE — 1-2 specific observations
Things this parish does that stand out. Describe, don't editorialize.

## Issues / flags
- Page load problems, ambiguity, or gaps the analyst should know about.
```

---

## Final output — `_index-round2.md`

After all 13 per-site files are written, write `_index-round2.md`:

```markdown
# Round 2 Research Index
Date: 2026-04-20

## Files written
- tier2-st-matthews-hyattsville.md
- tier2-christ-church-tulsa.md
- ...

## Sites that loaded cleanly (full capture)
- [list of slugs]

## Sites with partial data or issues
- [slug] — [what went wrong]

## Sites that failed entirely
- [slug] — [reason]

## Summary
- Attempted: 13
- Successfully captured: N
- Partial: N
- Failed: N
```

---

## Don't do

- Don't synthesize patterns, rank, or compare — that's the Cowork analyst's job, not yours.
- Don't fill `NOT FOUND` for every field just because a page is slow — fetch twice, and only then log the site as failed.
- Don't pad the files with filler. 300-450 words of actual evidence per site is the target.
- Don't stop to ask Nate questions mid-run. If a site is ambiguous, capture what you can, flag it in `## Issues / flags`, and move on.

When done, paste the contents of `_index-round2.md` back into chat so Nate can hand it to the Cowork analyst.
