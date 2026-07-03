# All Saints' Episcopal Church — website transition

WordPress to Squarespace migration for All Saints' Episcopal Church (Concord, NC). Target: mid-July 2026 cutover, timed to the rector job posting. Nate is the day-to-day editor; Brian takes over post-handoff. This repo holds the working prototype, the review tooling, and every deliverable sent to the review group.

> Personal preferences, voice, and ethics live in the global `~/.claude/CLAUDE.md`. The memory system (`MEMORY.md` + `memory/`) loads each session and carries the running project state. This file is the project-specific operating manual: structure, build/deploy, conventions, and flows.

## Audience priority (calibrate every call to this)

End-user audience (who the site is built for), in order:

1. **Church visitors, regular attenders, and curious seekers** looking for a church. This is the primary reader. Every IA, content, and design decision serves them first.
2. **Clergy candidates evaluating the parish** (the rector search) — a secondary, time-bound goal through the mid-July 2026 search. Keep it accurate and present, but **go light** and don't over-build the rector-search page or add heavy candidate-facing features until there is solid parish-profile content. (Reversed 2026-06-10; earlier framing put candidates first.)

Reviewer (not end-user) note: **the review group** (not the full vestry) reviews design/content in May–July. Only invoke the vestry for formal sign-off moments.

## Repo map

- **`worker/`** — the live preview + review tooling (Cloudflare Worker). **Canonical site build is `worker/public/final/`.** Leave the paths alone.
  - Global layer: `worker/public/assets/site.css` (tokens + 8-step type scale + shared system + card components) and `site.js` (deferred behavior). Every page links `/assets/site.css` + `/assets/site.js`. **Edit shared styles/behavior there, not per-page.** New pages link both.
  - `worker/src/index.js` — worker entry. `worker/schema/` — D1 schema/seeds for the content-approval + triage tools. `worker/tests/` — vitest.
- **`shared/`** — what the review group sees: decks, PDFs, sign-off docs, status updates. If it has been sent (or is about to be), it lives here.
- **`internal/`** — working files (drafts, research, design history, screenshots, source files, session handoffs). Not for outside eyes. Markdown sources behind shared PDFs live in `internal/deliverables/`.
- **`assets/`** — shared working assets (photos, WordPress export). Stays at root; referenced by tooling. **`assets/church-profile/`** holds the parish-profile PDF pipeline: the vestry-approved source docx, the print master `parish-profile-2026.html`, and `render-pdf.mjs` (paged.js + system Chrome). Regenerate with `node render-pdf.mjs parish-profile-2026.html <out>`; the served copy at `worker/public/assets/parish-profile-2026.pdf` must stay under Cloudflare's 25 MiB asset cap (use the `-email.html` variant with downsized `web-img/` photos). Linked from `/final/rector-search`.
- **`BACKLOG.md`** — daily driver, single source of truth for what's left before cutover. Stays at root.

## Build, run, deploy

From `worker/`:

```bash
npm run dev      # wrangler dev (local preview)
npm run deploy   # wrangler deploy (auto-deploy on a successful build per standing orders)
npm run test     # vitest run
```

- Live preview / review tool: **https://allsaints-redesign.nate-ernst7.workers.dev/final**
- Worker name `allsaints-redesign`; D1 binding `DB` → `allsaints-review-db` (content-approval pipeline + page-triage tool).
- `/final` pages: index (home), visit, connect (+ subpages: episcopalian, life-events, pastoral-care), serve, giving, happenings, learn, history, clergy (clergy + staff), arboretum, prayer-requests, rector-search, watch-and-listen. (The in-site `/final/sitemap` "Pages to Review" page was removed Jun 2026; the published `/site-map` covers the review-group page list. `serve-options` was an internal comparison doc, removed Jun 2026. `lcdc` was removed Jun 2026: the current allsaintsconcord.org site links LCDC out to lockhartcdc.org via a custom menu link, not an on-site page, so the footer + serve links now point to that external site.)
- **Secondary navigation (Jun 2026):** the top nav is flat, no dropdowns (Squarespace 7.1 folders can't be clickable landing pages). Secondary pages are reached two ways: the **navigable footer** (Our Parish / Get Connected / Contact columns, byte-identical on every page, plus a Site Map link in the footer bottom) and **in-page hub cards** (the Connect page's "Explore" row links to its 3 subpages). This is the portable model the design team converged on.

## Design system (the short version)

Three layers, mirrored prototype → Squarespace: **global styles** (`site.css`), **global behavior** (`site.js`), **page-unique** inline `<style>`. Full catalog of sections, the card system, and the Squarespace 7.1 build strategy is in **`internal/deliverables/component-reference.md`** — read it before touching layout or adding a page.

Squarespace rebuild rules to remember:
- Paste `site.css` into Custom CSS **before** building any page, so blocks inherit styles.
- **Saved Sections are paste-copies, not live components** (edits don't propagate). Site-wide changes must be CSS (global) or a Collection.
- Repeating content → Collections: arboretum trees (slug `arboretum`, preserves QR URLs), happenings (Events), sermons (Blog). Clergy/staff stays a static grid (only 4–6 people).
- When 5+ similar pages exist, design ONE template, never bespoke instances.

## Copy conventions (project-specific)

- **"All Saints'"** with the trailing apostrophe. Always.
- **"guests"**, not "visitors".
- **No terminal periods on headings.** No em dashes anywhere (use commas, parens, colons, or restructure).
- **Avoid mic-drop phrasing**: don't end on terse period-separated closers ("Two Services. One Community."). Soften to commas or restructure.
- **Never reference Nancy Cox** anywhere on the site (dropped from the rector-search and diocese copy).
- **No "free parking"** framing for Concord.
- **Don't rewrite copy stakeholders have praised**; only correct factual or vocabulary errors. Use the church's real language, don't invent church-y taglines.
- "as God Loves" (vision), not "Like".

## Preserved URLs (must survive cutover)

URLs referenced by physical/printed materials. Preserve the exact slug or 301:
- `/arboretum/` and `/arboretum/[tree]` — physical QR codes on the memorial-tree signs depend on these.
- Prayer-requests path, plus the audit-flagged list. See `memory/project_preserved_urls.md`.

## Project flows (trigger phrases)

Defined in **`.claude/flows.md`**. Say the bolded phrase; the flow runs without further prompting:
- **"build the X page"** — UX + portability + accessibility (plan) → delivery-manager synthesis → implementer → contrarian critique → accessibility validation → deploy → report (URL + line count + judgment calls).
- **"build pages X, Y, Z"** — same, fanned out in parallel, with a cross-page cohesion check before deploy.
- **"run the review cycle on [pages]" / "send to the group"** — six-stage flow with three human gates (draft comms, incorporation plan, notification all wait for Nate's approval).
- **"review the X page" / "design team look at X"** — full team in parallel against the deployed page; synthesis into must-fix / should-improve / nice-to-have. No implementation without approval.
- **"where are we?" / "status"** — backlog grooming: done / in flight / blocked-on-(Nate|group|Brian) + next 3 actions.

Project subagents live in `.claude/agents/` (senior-ux-designer, senior-web-engineer, squarespace-portability-checker, transition-delivery-manager, contrarian-reviewer, accessibility-reviewer, principal-product-designer).

## Standing orders (no prompt needed)

- Small CSS/copy tweaks and bug fixes → make + deploy + report (no team consult).
- Built page changes → auto-deploy on success.
- UI work of any size → product-design team **before** the implementer, never just final review.
- When the team converges fast, bring in the contrarian.
- Pattern feedback from Nate → save to memory. Open-question / input-needed items → track in `internal/deliverables/` and `BACKLOG.md`.

**Escalate / pause for:** net-new IA shifts, voice/tone on signal copy, sending any comms to humans, changes to preserved URLs, deletion of live content, anything affecting the rector-search audience.

## Open project facts

- **Haiti / CODEP mission**: the serve page states it in present tense, but current status is UNCONFIRMED. Don't assert it's active; reconcile with the review group before go-live.
- Content triage of the 82 WordPress pages is COMPLETE (decisions in `internal/deliverables/content-triage.md`). Fellowship was folded into the connect page (no new page).
- Open decisions owed by the review group / vestry are tracked at the top of `BACKLOG.md`.
