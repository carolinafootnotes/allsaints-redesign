# All Saints Website Project — Working Kit

Produced April 20, 2026 for the April 21 vestry meeting; updated continuously since then through the May review-group phase.

**Current state (May 4, 2026):** vestry approved Squarespace + sign-ups on April 21; design direction was deferred. Three redesign options have been refreshed with shared content, real photography, Episcopal terminology, a Rector Search section, and a Lay Staff section. A new styleguide page makes the differences scannable for the redesign review group. **Launch target: live by mid-July 2026.**

**Audience for May–July 2026 work:** the redesign review group (clergy, staff, lay) — not the whole vestry.

---

## What's live right now

| URL | What it is |
|---|---|
| https://allsaints-redesign.nate-ernst7.workers.dev | Showcase landing |
| https://allsaints-redesign.nate-ernst7.workers.dev/styleguide | Side-by-side visual comparison for review group |
| .../v1 | Option 1 — The Refined (was "The Original"; renamed because reviewers thought it meant the existing site) |
| .../v2 | Option 2 — The Sanctuary |
| .../v3 | Option 3 — The Gathering |

To redeploy: `cd /Users/varloo/develop/allsaints/worker && npx wrangler@4.78.0 deploy --config wrangler.toml`

---

## Vestry decision kit (April 21 — historical)

`decision-kit.pdf` is the printed bundle from the April 21 vestry meeting. Six pages: direction, platform, sign-ups, timeline + visual timeline, closing summary. The recommendation is now framed as "a leaning, not a verdict" because several members favored Option 1 in earlier presentations.

Source pieces (preserve as historical):
- **A1** `A1-design-one-pager.md` — three design directions + recommendation
- **A2** `A2-squarespace-platform.md` — why Squarespace Business
- **A2b** `A2b-platform-alternatives.md` — why not Framer/Webflow/church-platforms
- **A3** `A3-signup-platform.md` — why SignUpGenius
- **A4/A5** `A4-A5-timeline-and-budget.md` — timeline (now updated; live by mid-July) + budget
- `timeline-visual.html`/`pdf` — landscape one-pager visual timeline

Decision-kit PDF regen if needed:
```
cd /Users/varloo/develop/allsaints/deliverables/vestry-kit-may
python3 -m http.server 8765 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --no-pdf-header-footer --print-to-pdf=decision-kit.pdf \
  http://localhost:8765/decision-kit.html
pkill -f "python3 -m http.server 8765"
```

---

## Site audit & information architecture

- **B1** `B1-site-audit.md` — full current-site audit. Key findings: 13 URLs 404, /giving/ is a 3.5-year-old deficit appeal, ~67–73% cut possible without losing anything important.
- **B1b** `B1b-rector-candidate-lens.md` — May 2 audit through the lens of a discerning Episcopal priest evaluating the call. The 12 content slots the redesigns must fill, real-content goldmine (5 named music ensembles, EfM groups, Lockhart CDC, etc.), and what currently hurts the parish's standing.
- **B2** `B2-information-architecture.md` — proposed 5-item top nav + URL map + redirect plan
- **B3** `B3-new-section-content.md` — original drafts of the Rector Search + Events pages

---

## Phase 1 / Phase 2 — content + IA refresh of the three redesigns (May 2)

These artifacts drove the May 2–4 implementation:

- `episcopal-terminology-reference.md` — the Episcopal vocabulary reference (clergy not pastors; Eucharist not communion; Diocese of NC details; Bishop Rodman)
- `redesign-inventory.md` — what each of v1/v2/v3 contained pre-refresh, including v3's three concrete bugs and v1's person-icon clergy placeholders
- `photo-inventory-and-swaps.md` — comparison of current `/assets/` vs the 2026 photoshoot; 4 swaps + 5 additions identified (all 10 are now placed)
- `phase1-team-review.md` — product-design-team verdict on the slate direction
- **`phase2-content-slate.md` ← source of truth** — locked list of sections that must appear on every redesign + per-option to-dos + photo work + terminology corrections + risk mitigations
- `phase2-team-review.md` — product-design-team sign-off on the slate
- `styleguide-format-review.md` — team's verdict on the styleguide page format (hybrid screenshot + per-option layout, what to STOP)

Drafted pages (used in the live site):
- `page-rector-search.md` — final draft of the Rector Search section. Lifecycle-aware (retires gracefully when a rector is called).
- `page-what-to-expect-sunday.md` — final draft, with communion phrasing taken verbatim from live site /what-to-expect/ ("all who love God and are drawn to Christ are welcome at Christ's table")
- `page-giving.md` — replacement for the 2022 deficit-appeal /giving/ page

---

## Communications kit

- **C1** `C1-rollout-narrative.md` — backbone story
- **C2** `C2-parish-email-prelaunch.md` — pre-launch email
- **C3** `C3-bulletin-blurb.md` — 3 versions
- **C4–C9** `C4-C9-remaining-comms.md` — pulpit script, launch email, FAQ, Weekly Word, social posts, feedback form

---

## Build operations

- **D1–D4** `D1-D4-build-ops.md` — content migration checklist, integrations test, launch checklist, post-launch maintenance

---

## What's still ahead

- **Review-group input on the three options** — feedback due Friday May 22 (per the May 4 email). Nate will catch up with people Sundays in person.
- **Decision converges** based on review-group input.
- **Squarespace build** — late May through end of June.
- **Internal review** — late June.
- **Congregation preview** — early July.
- **Launch** — mid-July 2026.
- **30-day check-in** — mid-August.

Plus the Phase 4 product-design-team review of the deployed showcase + styleguide is still outstanding.

---

## Quick reference

- **Audit (March 2026):** `/Users/varloo/develop/allsaints/audit.md`
- **Peer research:** `/Users/varloo/develop/allsaints/website-research/_synthesis.md` (18 parishes) and `episcopal-website-research.md` (8 best-in-class)
- **4/20 presentation:** `/Users/varloo/develop/allsaints/preso-4.20/AllSaints-Website-4.20.pdf`
- **Working plan:** `/Users/varloo/.claude/plans/snappy-dazzling-hippo.md`
