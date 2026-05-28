# Prompt for Claude in Chrome

Paste this entire document into the Claude in Chrome side panel. Make sure "Act without asking" is selected at the bottom so you don't have to approve every action.

---

## First things first — where to save output

Nate will paste this prompt into you. Before you do anything else, ask Nate for **the absolute file path** to his research folder on his Mac. It's roughly `~/Documents/.../allsaints/website-research/` but the exact path depends on his setup.

If you can write files to disk at that path, do so throughout. One markdown file per site, plus the roster and index files.

If you cannot write files to disk for any reason, announce that upfront and instead produce all output inline in this chat, one site at a time, clearly labeled with the filename each output would have had. Nate will copy and paste.

Do not silently skip the "save to disk" step — if it's not working, say so.

---

## Your job is scraping, not analysis

You are gathering raw evidence from 20-35 Episcopal parish websites. A separate analyst (Claude working in a Cowork session) will perform pattern-finding and synthesis from what you capture. Your job is to gather evidence faithfully — thorough, structured, quotable. Do not infer, categorize, or recommend. Just capture.

**Three rules that matter more than anything else:**

1. **No interpretation.** If the hero headline is "All are welcome here," write that. Don't write "the parish signals inclusivity." The next agent will do the interpreting.
2. **Never invent data.** If a field is not findable, write `NOT FOUND` or `PAGE DID NOT LOAD`. Do not guess.
3. **Copyright.** Never quote more than 15 words from any single source. Paraphrase content longer than that.

---

## Step 1 — Build the roster

Visit **https://livingchurch.org/2020/03/11/the-fastest-growing-episcopal-churches/** (or the redirected URL at https://livingchurch.org/news/the-fastest-growing-episcopal-churches/) and extract the full list of 10 parishes named. For each: parish name, city/state, website URL if given, growth percentage. Save this to a file called `_roster-living-church-list.md` in the research folder.

Then compile the full visit list by combining:

**Tier 1 — Priority references (3)**
- Jubilee Episcopal Church, Austin TX — https://jubileeatx.org/
- Church of the Incarnation, Dallas TX — https://incarnation.org/
- Whatever parish owns https://trinity-episcopal.org/ — verify and note

**Tier 2 — The 10 from the Living Church article** (from Step 1)

**Tier 3 — Large/notable Episcopal parishes with strong digital presence (up to 5)**
- Christ Church Cranbrook, MI
- St. Bartholomew's NYC (stbarts.org)
- Trinity Wall Street (trinitywallstreet.org)
- Washington National Cathedral (cathedral.org)
- St. Martin's Houston (stmartinsepiscopal.org)

**Tier 4 — Affirming/progressive Episcopal parishes in conservative regions (3-5)**
Search for: "affirming Episcopal church" plus Southern/conservative-county states. For each, write a one-sentence defense of why it's a peer to All Saints (affirming AND in a conservative area).

Save the full roster as `_roster-final.md`.

---

## Step 2 — For every site, capture structured evidence

Write one file per site. Filename format: `tier{N}-{parish-slug}.md`.

Save to the folder Nate tells you at the start of this session. Target: `/Users/[nate]/.../allsaints/website-research/` — Nate will give you the exact absolute path. If you cannot write to disk, dump everything in chat at the end and Nate will save.

### Per-site template — fill every field

```markdown
# [Parish Name] — [City, State]
URL: https://example.com/
Tier: 1 / 2 / 3 / 4
Defense for inclusion (Tier 4 only): [one sentence]
Date visited: YYYY-MM-DD
Load status: OK / PARTIAL / FAILED / BLOCKED

## HOMEPAGE — RAW EVIDENCE

### Hero (above-the-fold, first viewport on desktop)
- Hero type: [large photo / video / slideshow / text-only / illustration / other — describe briefly]
- Hero headline, verbatim (under 15 words): "..."
- Hero subhead/subtitle if present, verbatim: "..."
- Hero CTA buttons — exact button text, in visual order (left to right or top to bottom):
  1. "..."
  2. "..."
  3. "..."
- Hero photo subjects — describe what's shown:
  1. [Subject of primary hero image — e.g. "exterior of church building" or "congregation at communion" or "children with adult leader"]
- Are service times visible in the hero? [yes / no, quote if yes]
- Are service times visible ANYWHERE above-the-fold on the homepage? [yes / no, quote if yes]

### Below-the-fold homepage structure
- In order from top to bottom, list every major section on the homepage (e.g. "About blurb", "Three feature cards", "Upcoming events", "Testimonials", "Giving CTA"). Aim for 5-10 sections.
- Next to each, note: what kind of content is in it (image? text? video? cards?), and the most prominent text in that section (quote under 15 words).

### Homepage photography inventory
List the first 3-5 photos visible as you scroll the homepage. For each:
- Subject: [e.g. "exterior of the church building at golden hour" / "five adults around a table with books" / "family of four smiling at camera"]
- Stock or real? (obvious stock = say stock; if unclear, say "appears real")

### Homepage CTAs — top three most-prominent calls to action
Rank by visual prominence (size, color contrast, placement). For each, give exact text and where it links to.
1. "..." → [URL or destination]
2. "..." → ...
3. "..." → ...

### Top navigation — verbatim
- List every top-level nav item, left to right, exact text.
- For each, list every dropdown child, exact text.
- Is there a persistent "Plan a Visit" / "I'm New" / equivalent CTA in the top nav? [yes / no, quote the button text]

---

## "I'M NEW" / "WELCOME" / "PLAN A VISIT" PAGE

If the parish has more than one candidate page (e.g. both "Welcome" and "Plan a Visit"), pick the one most likely to be where a first-time visitor lands. Note the URL you chose.

- Page URL: ...
- Page title (browser title bar / H1): "..."
- Page opens with (first 30 words, quoted verbatim — under 15 at a time, use [...] between segments if needed): "..."

### Inline information check — for each, ON THIS PAGE (not just linked):
| Info | Present? | Exact phrasing (under 15 words) or "NOT FOUND" |
|---|---|---|
| Service day(s) | yes/no | "..." |
| Service time(s) | yes/no | "..." |
| Service address | yes/no | "..." |
| What to wear | yes/no | "..." |
| Kids / nursery / Sunday school info | yes/no | "..." |
| Parking instructions | yes/no | "..." |
| Where to enter / front door guidance | yes/no | "..." |
| Service length | yes/no | "..." |
| Communion practice (open table, blessing option, etc.) | yes/no | "..." |
| Affirming / welcoming statement | yes/no | quote under 15 words |
| Denomination affiliation (Episcopal mention) | yes/no | "..." |

### Photography on this page
List every photo on the page:
- Subject of each
- Real or stock

### First CTA on the page
Exact text and destination.

### Order of information on the page
In rough order top-to-bottom, list the sections / headings on the page. Verbatim where possible.

---

## FOOTER — EVERY ELEMENT

Look at the footer on the homepage. List every element you see in the footer. Be exhaustive:

- Address: [yes / verbatim / no]
- Phone: [yes / verbatim / no]
- Email: [yes / verbatim / no]
- Service times: [yes / verbatim / no]
- Episcopal shield or diocesan logo: [yes / no]
- Diocesan link: [yes / no]
- Social icons: [list every platform linked]
- Newsletter signup: [yes / no]
- Giving link: [yes / verbatim button text]
- Staff directory link: [yes / no]
- Sitemap link: [yes / no]
- Land acknowledgment: [yes / no]
- Copyright line: [yes / verbatim]
- Anything else present: [list]

Is the footer identical on at least one interior page (check one)? [yes / no / did not verify]

---

## SITE-WIDE TEXTURE

### Clergy naming style
How is the priest/rector referred to on the site?
- [e.g. "The Rev. Elizabeth Smith" / "Fr. Mike" / "Pastor Sarah Johnson"]

### Language register — 3 specific quoted examples (each under 15 words)
Quote 3 short phrases from the homepage or I'm New page that give a feel for how the site writes.
1. "..."
2. "..."
3. "..."

### Mobile spot-check (open the site on mobile or use browser DevTools responsive mode to simulate ~390px width)
- Is the primary CTA visible in the first mobile viewport? [yes / no]
- Is click-to-call on the phone number? [yes / no / no phone]
- Does the mobile nav open cleanly? [yes / no / did not check]

### Notable / distinctive — 1-3 specific observations
Things this parish does that stand out. Don't editorialize ("impressive", "effective") — just describe what's there.

### Issues / flags
- Broken pages
- Pages that wouldn't load
- Anything ambiguous that the analyst should know

```

---

## Step 3 — Index file

After all per-site files exist, create `_index.md`:

```markdown
# Research index

## Files written
- tier1-jubilee-austin.md
- tier1-incarnation-dallas.md
- ...

## Sites with load issues (review candidates)
- [Parish name] — [what went wrong]

## Total
- Attempted: N
- Successfully captured: N
- Partial or failed: N
```

---

## Constraints

- **Quantity target:** 20-35 sites. Quality over padding. If a Tier 4 candidate is marginal, skip it and note why.
- **No synthesis.** Do not produce a "patterns across the set" summary, recommendations, or lists. That's explicitly not your job on this pass. Raw data only.
- **Skip blocked sites and log them.** Don't retry more than twice.
- **Per-site file target: 400-600 words of structured evidence.** Lean, complete, no filler.
- **Screenshots optional but welcome.** If you can capture a homepage screenshot and save it alongside each markdown file (e.g. `tier1-jubilee-austin.png`), that would be valuable for the analyst. Don't let screenshot issues block text capture though.

When you're done, paste the contents of `_index.md` back into chat so Nate knows the scope captured.
