# Content Review Restructure — Delivery Plan

**Owner:** Nate (solo delivery)
**Reviewers:** Chuck, John, Joy Marie, Andrea, Brian (review group; not full vestry)
**Cutover target:** mid-July 2026 (Squarespace 7.1)
**Today:** 2026-05-27 → ~7 working weeks to cutover, ~6 to content-freeze
**Replaces:** per-sentence review tool (too granular, low signal)

---

## Why we're restructuring

Per-sentence review produced noise and decision fatigue. Review group is 5 people with day jobs; they can give us ~30 focused minutes per page, not 3 hours. We need higher-leverage decision units:

1. **A/B/Other forks** at editorial inflection points (hero, mission framing, CTA voice).
2. **Content-inventory checklists** for "is this the right set of things to say here" decisions.
3. **A separate factual-correction lane** that doesn't queue behind editorial taste debate.
4. **Page-level sign-off**, not sentence-level.

---

## Phase plan — weeks remaining

| Phase | Week of | Deliverable | Gate to next phase |
|---|---|---|---|
| **0. Plan + unblock** | May 26 | This doc + one decision from Nate | Nate approves chunking |
| **1. Sitemap + IA confirmation** | May 27 – Jun 1 | Sitemap outline (`deliverables/sitemap-outline.md`) Nate translates into a native **Google Slides** deck — 1 slide per major IA branch, page boxes + connectors described so Nate can drag them in. Every /final section has a home; every content item from triage has a destination or a RETIRE | Nate sign-off, then share Slides link with review group async (no meeting); Slides has native commenting |
| **2. Current-site audit (2-col)** | Jun 2 – Jun 5 | `current-site-disposition.md` — left col: live allsaintsconcord.org URL; right col: KEEP / MIGRATE-to-X / MERGE-into-X / RETIRE. Reuses 80% of existing `content-triage.md`; adds the disposition column | Nate sign-off (this is Nate-only, not review group — too granular for them) |
| **3. Review-tool reframe build** | Jun 2 – Jun 8 (parallel w/ Phase 2) | New review-tool schema + UI: A/B/Other blocks, section checklists, factual-issue lane. Build estimate ~2 dev-days. See "Review-tool changes" below | Nate QA pass on one seeded page (home) |
| **4. Page-by-page review** | Jun 9 – Jun 30 | Per-page review packets pushed weekly. 6 pages, chunked 2/week, 3 weeks. Each page = ~5-10 A/B forks + 1-2 checklists + factual-issue list. Sign-off gate per page | All 6 pages signed off |
| **5. Factual-issue resolution** | Jun 9 – Jul 3 (rolling) | Each factual issue gets an SME, a routing path, a confirmation. Tracked separately from editorial | All factuals resolved or explicitly deferred |
| **6. Final copy lock + Squarespace build** | Jul 6 – Jul 10 | Locked copy applied in Squarespace. No more A/B. | Brian walkthrough |
| **7. Cutover** | Jul 13–16 | Tue or Wed cutover (never Fri, never the day before a service). DNS, URL mappings, redirect QA, QR-code spot-check | Live |

**Buffer:** built in via Phase 4 finishing Jun 30, leaving ~2 weeks before cutover for surprises. Don't compress it.

---

## Page-by-page chunking — Phase 4

Originally six pages; **the audit-decisions pass surfaced 4 net new IA nodes** (see `audit-decisions.md`). These get folded into existing weeks rather than slipping the cutover:

| Week | Pages | Why paired | Review-group ask |
|---|---|---|---|
| Jun 9–13 | **Home** + **Visit** | Home is highest-traffic, sets tone. Visit is the "first Sunday" answer — same audience mental model | 2 packets, ~30 min each |
| Jun 16–20 | **Connect** + **Happenings** + **Pastoral Care** (NEW, Q4) + **Life Events** (NEW, Q8) | Insider-facing pages + 2 newly-confirmed standalone pages with portable copy from live site. Pastoral Care is blocked on a named human contact during rector search (Slide 12 row). | 2 large packets, ~20 min each + 1 quick yes/no on Pastoral Care contact |
| Jun 23–27 | **Rector Search** + **Watch & Listen** (renamed from Watch Live, Q6 — sermons folded in) + **What is an Episcopalian** (NEW, Q2) + **LCDC / Preschool** (NEW, Q3) | RS sensitive; Watch & Listen now carries sermon library; What-is-an-Episcopalian is evergreen SEO; LCDC needs Joy Marie/Brian touchpoint with LCDC director | 1 sensitive packet + 3 quicker packets (mostly portable copy) |
| Jun 30 | Sweep / unresolved forks + **Community page History section** (Q1) | Catch-all + finalize History as a Community section, not a standalone page | Async vote, no meeting |

**Net new Phase 4 build items (from `audit-decisions.md`):**
- `/final/pastoral-care/` (Q4) — standalone, copy mostly portable, blocker = named human contact
- `/final/life-events/` (Q8) — standalone with Weddings / Baptisms / Funerals sub-sections, SEO-driven
- `/final/what-is-an-episcopalian/` (Q2) — standalone evergreen, highest SEO value
- `/final/lcdc/` (Q3) — standalone, requires LCDC director sign-off on copy
- Watch Live → "Watch & Listen" rename + sermon library fold-in (Q6) — section restructure, not a new page
- `/final/community` gets a History section (Q1) — section add, not a new page

**Capacity check:** 4 net new pages, all with portable copy from the live site. Each is a 1-day implementer lift after the design team verdict pass. Phase 4 already has slack (~3 weeks for 6 pages → now 10 pages/sections, still within window because the 4 new ones are mostly portable). **No cutover slip.** Buffer week (Jul 6–10 Phase 6) preserved.

**Per-page packet contents:**
- Screenshot of current /final page (annotated with fork callouts: A/B/C numbered)
- A/B/Other choice blocks (5-10 per page, max)
- 1-2 content-inventory checklists ("are these the right items here?")
- Factual-issue list (separate section, "flag anything you know is wrong")
- One sign-off button: "I'm good with this page as-decided"

**Sign-off rule:** 3 of 5 reviewers click sign-off → page is approved. Don't wait for 5/5. Surface holdouts to Nate for 1:1 resolution.

---

## Review-tool changes needed (high level — DO NOT BUILD YET)

D1 schema additions (sketch, not final):

- `review_blocks` table — id, page_slug, block_type (`ab_choice` | `checklist` | `factual_flag`), title, body_json, sort_order
- `review_block_options` — block_id, label, body, is_other_freeform (bool)
- `review_responses` — block_id, reviewer_id, chosen_option_id OR freeform_text OR checklist_json, created_at
- `page_signoffs` — page_slug, reviewer_id, signed_at, note

UI changes:
- Reviewer view: card-per-block instead of card-per-sentence
- Reviewer view: "Flag a factual error" button always visible, routes to factual lane
- Nate view: per-page dashboard — fork tally (A: 3, B: 1, Other: 1), open factuals, signoff count

**Build cost:** ~2 dev-days. Can run in parallel with Phase 2 audit work. Existing auth/CSV/handlers structure in `worker/src/review/` is reusable; this is additive schema + new handlers, not a rewrite.

---

## Product design team integration points

Nate's product design team (subagents) is a first-class resource on this project, not a final-review rubber stamp. Per global rule: **team-first on ALL UI work — dispatch `product-review` BEFORE the implementer for any UI design, plan, or PR, including single-item changes.** Below is exactly where they get commissioned, by whom, and what they produce.

| Phase | Commission | Agent(s) | Commissioned by | Deliverable |
|---|---|---|---|---|
| **Phase 1 — Sitemap** | Once outline is drafted and before Nate locks the Google Slides version | `senior-ux-designer` | Nate (TDM hands off outline) | IA critique: missing pages, weak parent/child groupings, label clarity. Returned as inline notes on the outline doc |
| **Phase 3 — Review-tool reframe (UI design)** | BEFORE any worker code is touched | `product-review` orchestrator (runs `sr-mobile-engineer` + `senior-ux-designer` + `accessibility-reviewer` + `principal-product-designer` in parallel) | Nate (TDM packages the schema + UI sketch from "Review-tool changes" section as the brief) | A consolidated review doc: kill/keep/revise verdict on A/B card pattern, checklist UX, factual-flag affordance. Output gates the build — implementer doesn't start until verdicts are reconciled |
| **Phase 3 — Review-tool build PR** | When build PR is opened | `product-review` orchestrator | Nate | Second-pass review on the actual built UI before merge to main |
| **Phase 4 — Hero copy A/B authoring** | BEFORE the two hero options go into a reviewer packet | `principal-product-designer` | Nate (TDM provides current /final hero + 2 candidate variants) | Product-framing critique on each option, recommended order of presentation, predicted reviewer-group failure modes. Goal: don't ship a weak A/B to the review group |
| **Phase 4 — Per-page packet, visual-rework pages** | When Phase 2 audit flags a page as needing visual change (not just copy) | `senior-ux-designer` (+ `accessibility-reviewer` if a11y is in scope, e.g., hearing-loop callout, color contrast, keyboard nav) | Nate, per page | Visual change spec the implementer follows. No visual change goes straight from audit to implementer. |
| **Phase 4 — Optional whimsy pass** | After page copy is locked, before Squarespace build | `design-whimsy-injector` | Nate, opportunistic (not every page) | Lightweight delight suggestions — only adopted if they don't slip the cutover |
| **Phase 6 — Squarespace build QA** | Once Brian's first page is built in Squarespace | `sr-mobile-engineer` + `accessibility-reviewer` via `product-review` | Nate | Mobile + a11y verdict on the live Squarespace render before cutover |

**Rule of thumb:** if a phase output contains UI decisions (visual, interaction, copy framing that affects conversion), `product-review` runs first. The TDM (me) packages the brief; Nate dispatches. Don't let the implementer start on UI without a team verdict in hand.

---

## Risk register

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| **Review group bandwidth** — 5 people, summer schedules, July 4th week | High | Slips cutover | Hard-stop content freeze Jul 3. Async by default; no meetings required. 3-of-5 sign-off rule | Nate |
| **Factual SME bottleneck** — accessibility callout (hearing loop term), service times, ministry status (Stephen Ministers active?), Koinonia status | Medium | Embarrassing post-launch corrections | Phase 5 factual lane with named SME per issue. Brian = ops SME; Chuck/John = clergy/liturgy SME; Joy Marie = community ministries SME | Nate routes |
| **Scope creep** — review group sees the new tool and wants to redesign sections | Medium | Delays cutover | Frame review-tool as "approve copy" not "redesign". Any design change requests get logged to BACKLOG, deferred post-launch | Nate |
| **Stale events** (Holy Week, Apr 2) in /final/happenings | Confirmed | Embarrassing if not refreshed | Already in BACKLOG (P1). Brian's first Squarespace task | Brian |
| **URL preservation** — arboretum QR codes, prayer requests, audit-needed list (memory: `project-preserved-urls`) | High if missed | Broken physical signage | Phase 7 includes Squarespace URL Mappings cross-check against preserved-URL list | Nate |
| **Holdout reviewer** — 1-2 reviewers don't engage, blocking 3/5 sign-off | Medium | Stalls a page | Nate 1:1s in week 3. If still no response by Jul 3, Nate signs as deciding vote and notes it | Nate |
| **Review-tool build slips OR reviewer engagement collapses** — build past Jun 8, or <2 of 5 reviewers respond to first packet by Jun 13 | Medium | Phase 4 stalls; cutover at risk | **Plan B: Figma fallback.** One Figma file per page with annotation layers + comment threads; DM tallies ~30 votes manually across 6 pages. 2h setup vs 2.5 dev-days. See `phase-3-review-tool-spec.md` §11 for trigger + mechanics. DM monitors Jun 8 + Jun 13 and flips unilaterally if either condition trips | Nate (TDM) |
| **Hearing loop vs separate-device error live now** | Confirmed | Misinformation to guests with disabilities | Fix immediately — don't wait for Phase 5. P0 patch this week | Nate |

---

## First concrete deliverable + ETA

**`/Users/varloo/develop/allsaints/deliverables/sitemap-outline.md`** → Nate translates into native **Google Slides**.

A structured outline doc Nate pastes/translates into Google Slides: 1 slide per major IA branch, each slide describing the page boxes, parent/child connectors, and "factual issues" sidebar concept in plain text. Native Slides format chosen for inline commenting + familiarity for the review group. (No tool can create Google Slides directly; deliverable is the outline + slide-by-slide structure Nate drops in.)

Once outline is drafted, it routes to `senior-ux-designer` (see Product design team integration points) for an IA critique pass before Nate locks the Slides deck.

**ETA:** Fri May 29. Outline draft this pass; UX critique + Slides build by Fri.

After Slides are signed off, Phase 2 (current-site audit table) starts Mon Jun 1.

---

## Out of scope for this plan

- Squarespace template selection (already decided: BYO 7.1)
- Site styles / color palette (already in memory)
- Vestry-level sign-off ceremony (this audience is review group, per `feedback-audience-is-review-group-not-vestry`)
- Post-cutover content workflow training for Brian (separate runbook, post-launch)

---

## Open decisions

**Sitemap format:** resolved — Google Slides (Nate's call). Outline lands at `deliverables/sitemap-outline.md` this pass; Nate translates to Slides.

**No open decision blocks Phase 1.** Outline drafted this pass → routes to `senior-ux-designer` for IA critique → Nate builds Slides deck → share with review group async.

**Audit open questions (Q1–Q10):** resolved autonomously per Nate's standing instruction. See `deliverables/audit-decisions.md` for per-question decision + reason + rework risk. Rework anything flagged medium/high if it does not match your read; low-risk rows should not need attention.

---

## Hostname post-mortem (2026-05-27)

**Bug:** earlier plan-doc drafts referenced a hyphenated variant of the parish domain (`allsaints-concord.org`). That hostname does not resolve. Correct domain is **`allsaintsconcord.org`** (no hyphen).

**Where it came from:** initial audit pass appears to have transcribed the domain from a verbal/memory source rather than the live site, then propagated through the audit-table notes.

**Scope of sweep (2026-05-27):**
- `deliverables/` — full grep. Only 2 hits, both in `current-site-audit.md` (the original correction note + the risk-table row). Both updated; risk-row marked RESOLVED with sweep date.
- `worker/` — full grep. **Zero hits.** Worker code is clean.
- Other repo paths checked: `v1/`, `v2/`, `v3/`, `showcase/`, `final/` — zero hits.

**Why it matters:** if uncaught, every 301 in the cutover URL mappings would have pointed at a non-resolving hostname, breaking every redirect at go-live.

**Prevention going forward:** before writing any URL into a plan doc, copy-paste from the live site, not from memory. The mistake is one keystroke and the consequences are silent until cutover.
