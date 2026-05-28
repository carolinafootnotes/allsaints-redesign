# Phase 3 — Review-Tool Reframe Spec

**Version: 2 — incorporates UX + product critique**
**v1 → v2 changelog (one line):** killed "Other" on A/B blocks, flipped sign-off to always-enabled non-blocking, added first-visit interstitial + per-block error link + empty-states table + mobile-first reviewer reframe + per-page build brief, reframed reviewer-facing copy ("approve" / "weigh in" / "Something's wrong here"), Brian fronts onboarding email, Brian triages all factual flags, removed "Other" triage queue from M5.

**Owner:** Nate (solo build)
**Audience for this spec:** implementer (design-team critique complete and reconciled in v2)
**Status:** READY for implementer kickoff. DM calls noted inline; rework risk flagged as `> **DM call (v2):**`.
**Replaces:** per-decision/per-sentence review model currently shipped in `worker/src/review/`
**Build window:** Jun 2 – Jun 8 (2.5 dev-days, parallel with Phase 2 audit)
**Reviewers:** Chuck, John, Joy Marie, Andrea, Brian (5-person review group)

> **Build note (v2.1):** Reviewer entry point for the new page-based flow is `/r2/<token>` (kept separate from the existing `/r/<token>` per-decision flow so both can coexist through cutover, per the "don't break existing routes" constraint). Admin authoring at `/admin/pages?key=...`. Legacy `/admin` per-decision dashboard still works.

> **Build note (v2.1):** The `decisions.section` CHECK constraint from `0001_init.sql` was too narrow for the new free-form anchor labels (Hero, Welcome, Service times, etc.). Migration `0002` rebuilds the table to drop the CHECK, preserving all existing columns/rows. Per the "no migration of old responses" call, old `decisions` rows survive with `block_type='ab_choice'` and `page_slug=section`.

> **Build note (v2.1):** Reviewer-vote payloads to `/api/p/submit` use JSON, not form-encoded. The legacy `/api/submit` endpoint stays form-encoded for back-compat.

---

## 1. Scope + non-goals

### In scope
- Reframe the existing decision/submission model around **three review block types**: A/B (editorial pick), Section Checklist, Factual Flag (admin name) / "Something's wrong here" (reviewer label).
- Add **page-level sign-off** as the primary approval unit (replaces per-decision finalize as the gate).
- Add an **admin authoring UI** so Nate can build a page's review packet without writing SQL.
- Add **DM dashboard** for cross-page status and factual-flag routing.
- Add a **per-page build brief export** (human-readable, for Brian's Squarespace build).
- Reuse: auth, reviewer mgmt, CSV bulk, finalize handler. Existing tables stay; we extend, not rebuild.

### Non-goals
- Not a CMS. Copy still lives in `worker/public/final/**/*.html`. Review tool *describes* copy decisions; it does not edit pages.
- Not a Squarespace replacement. **Archived after cutover.** Routine post-launch content updates go directly to Brian in Squarespace; no formal review tool for ongoing content. If All Saints' wants a formal-review system post-launch, that's a separate conversation.
- Not public-facing. Behind reviewer-token auth (already shipped).
- Not a Phase-1 IA/sitemap tool. Pages already exist; we're reviewing their content.
- Not sub-page sectional sign-off. Page is the smallest approval unit. (See risk: scope creep.)

> **DM call (v2):** Post-cutover archival. Rework risk: low. If All Saints' formally requests ongoing review tooling, flag and re-spec.

> **DM call:** Keep the existing per-sentence/per-decision granularity available under the hood (the `decisions` table already holds A/B rows), but stop *surfacing* it as the unit of approval. Reviewers see blocks composed into a page; admin sees blocks composed into a page.

---

## 1.5 Reviewer-facing language (NEW in v2)

Per product framing critique: these 5 are **collaborators finalizing together**, not auditors. Reviewer-facing copy reflects that. Admin/internal labels can stay technical.

| Internal (admin / spec) | Reviewer-facing label |
|---|---|
| Review tool | "Approve" / "Weigh in on the new site" |
| Reviewer | Reviewer (fine; or "you") |
| Editorial sign-off | "Sign off on this page" / "I'm good with this page" |
| Factual flag | Button: **"Something's wrong here."** Modal header: **"Report an error."** First-line copy: *"Use this if something on this page is incorrect, not if you'd just word it differently."* |
| A/B block | "Pick the wording" |
| Checklist block | "What's covered here?" |
| "No opinion" | "Skip this one" |

> **DM call (v2):** Reframed language throughout reviewer-facing UI. Rework risk: low. Admin dashboard keeps "factual flags," "A/B blocks," etc.

---

## 2. The three review modes

### 2.1 A/B — editorial pick (no "Other" option)

| | |
|---|---|
| **When to use** | A specific copy string where 2 (or rarely 3) wordings are both defensible and we need the group to pick. Hero headlines, mission framing, CTA verbs, section intro sentences. |
| **NOT for** | Factual statements (use "Something's wrong here"). Whole-section "are these the right topics" questions (use Checklist). |
| **Data model** | Existing `decisions` row, `block_type='ab_choice'`. `options` JSON: `[{key:'a',label:'Option A',body:'...'}, {key:'b',label:'Option B',body:'...'}, {key:'c',label:'Option C',body:'...'}?]`. **No "Other" free-text option.** The escape hatch is the per-block comment field. |
| **UI pattern (reviewer)** | Card with the page section name + anchor link, current copy in a muted "currently shipped" pill, then 2–3 option cards stacked. Radio-select. **No "Other (write in)" textarea.** Comment textarea below the options handles "I'd word it differently" cases. Also: small **"Something's wrong here"** link at the bottom of every block (anchor pre-populates in the error modal). |
| **UI pattern (admin)** | Form: section, anchor selector, question, 2-3 option bodies, optional context. Preview renders as reviewer will see it. |
| **Example** | Home hero. Currently shipped: "A Jesus Movement in Concord, NC." Option A: keep. Option B: "An Episcopal community in Concord, NC." Option C: "Following Jesus together in Concord, NC." Reviewer who wants a different wording uses comment field; DM triages comments inline if needed. |
| **Vote tally** | Per-option count. Comments visible to DM in admin dashboard; surfaced to reviewer only after they vote (see 4.x visibility rule). |

> **DM call (v2):** Killed "Other" free-text. Per product critique — cleaner 3-of-5 tallies, no triage queue burden on DM, the comment field is a sufficient escape hatch. Rework risk: low. If reviewers consistently use comments to propose new wording, DM can author an Option C and re-issue the block.

### 2.2 Section content-inventory checklist

| | |
|---|---|
| **When to use** | "On this section, are we mentioning the right things?" Whole-section topic coverage, not copy wording. |
| **NOT for** | Wording debates (use A/B). Single-claim factual errors (use "Something's wrong here"). |
| **Data model** | New `block_type='checklist'`. `options` JSON: `{question:'...', items:[{key:'parking',label:'Parking'},{key:'dress',label:'Dress code'},...], allow_add:true}`. Response stored in `submissions.other_text` as JSON: `{checked:['parking','dress'], added:['Bathroom locations','Where to put coats']}`. |
| **UI pattern (reviewer)** | Card with section anchor + question prompt. Bulleted checkbox list (multi-select). "Add another" pill at bottom opens a small textarea. Comment textarea below. "Something's wrong here" link at bottom. |
| **UI pattern (admin)** | Form: section, anchor, question, items list (add/remove rows), `allow_add` toggle. |
| **Example** | Visit page, "Your First Sunday" section. Question: "Does this section answer the questions a first-time guest asks?" Items: Parking ✓, What to Wear ✓, Kids ✓, Accessibility ✓, Restrooms ☐, Where to sit ☐, What time to arrive ☐, Communion ✓. Reviewer checks what's covered well; "Add another" captures missed topics. |
| **Vote tally** | Item-by-item check rate (3/5 say covered) + aggregated "added" suggestions for DM triage. |

> **DM call:** Positive frame ("what IS covered well") confirmed by both critics. Hold the frame.

### 2.3 "Something's wrong here" — factual lane (admin label: Factual Flag)

| | |
|---|---|
| **When to use (reviewer-facing copy)** | "Use this if something on this page is incorrect, not if you'd just word it differently." Wrong service time, wrong staff title, wrong accessibility claim (hearing loop vs separate-device), wrong ministry name, broken link, outdated date. |
| **NOT for** | "I'd word this differently" (use the A/B block's comment field). |
| **Data model** | New table `factual_flags` (see §6). Fields: id, page_slug, anchor (optional, pre-populated when entered from per-block link), claim_under_review (current copy quoted), proposed_correction (free text), evidence_url (optional), flagged_by_reviewer_id, triaged_by (text, default = 'brian'), sme_assignee (text, Brian assigns after triage), status (`open`, `triaged`, `sme_assigned`, `confirmed`, `rejected`, `deferred`), sme_decision_note, resolved_at. |
| **UI pattern (reviewer)** | **Two entry points:** (1) persistent **"Something's wrong here"** button in the page-review header (always visible, never hidden); (2) small "Something's wrong here" link at the bottom of every block card (pre-populates anchor field in the modal). Opens a sheet/modal: quote the bad copy, write the correction, optional URL evidence. Submit, return to review. Does NOT block other voting. |
| **UI pattern (admin)** | Dashboard list: page, claim, proposed correction, flagger, status, age. Brian's triage workflow (see Routing). |
| **Routing rules (v2 — simplified per product critique)** | **All flags go to Brian first.** Brian classifies and forwards to the right SME (himself, Chuck, John, Joy Marie, Andrea, or escalates to Nate) within 24h. **48h SLA starts from Brian's receipt**, not from initial flag. SME confirms or rejects with a one-line note. **Confirmed flags do not block editorial sign-off but DO block publish to Squarespace.** Unresolved factual flags at content-freeze gate publish on that page. |

> **DM call (v2):** Dropped the topic-based SME routing table. Per product critique, Brian-first triage is simpler, matches his day-to-day editor role, and removes a brittle classification layer. Rework risk: low. If Brian gets overloaded, can reintroduce auto-routing for obvious ops-only flags.

> **DM call:** Factual flags are **visible to all reviewers** (in a "Flagged for fact-check" strip at the top of the page-review screen) so two reviewers don't flag the same issue. The proposed correction and SME decision become visible once an SME closes it.

> **DM call (v2):** **Resolution notification to flagger:** single email to the reviewer who raised the flag when it's resolved (confirmed/rejected/deferred). No in-tool UI update for the flagger — the tool is "done" for the reviewer after sign-off, and the email closes their loop. Rework risk: medium — if reviewers want richer post-signoff visibility, add a simple "my flags" view later.

---

## 3. Sign-off / approval model

### 3.1 Page lifecycle

```
draft → in_review → editorially_approved → publish_ready → published
```

| State | Who moves it | Gate |
|---|---|---|
| `draft` | Nate (admin) | Authoring blocks; not visible to reviewers |
| `in_review` | Nate publishes the page packet | Reviewers see and can vote/flag |
| `editorially_approved` | System, on 3rd reviewer sign-off | A/B forks have a clear winner; checklist results reviewed |
| `publish_ready` | System, when all factual flags `confirmed`/`rejected`/`deferred` | No open factual flags on this page |
| `published` | Nate (manual flip after Squarespace push) | Copy is live on Squarespace |

### 3.2 Voting threshold

> **DM call: 3-of-5 review-group sign-off → page advances to `editorially_approved`.**
> Justification: 5/5 is unrealistic for a volunteer review group across a 3-week window with July-4 in the middle. 3/5 is a clear majority, matches the original Option 3 selection vote (3-to-2), and lets Nate ship without holding the project hostage to a non-responsive reviewer. The 2 non-voters are surfaced in the DM dashboard for 1:1 follow-up but do not block. Product critic explicitly defended 3/5 against design-team push for 4/5 — single non-responder = veto under 4/5, and summer schedules make that a near-certain stall.

> **DM call (v2): Flat voting. Brian's vote is not required for threshold.** If Brian dissents and 3 others approve, page is `editorially_approved`. DM logs Brian's dissent and surfaces it to Nate for a 1:1, but it does not block. Rework risk: medium — if Brian's dissent reveals a pattern (e.g., he's the only one catching real problems), revisit.

### 3.3 Sign-off button behavior (v2 — flipped)

> **DM call (v2): Sign-off button is ALWAYS visible and enabled.** Click when blocks are incomplete triggers a **non-blocking prompt**:
>
> > "You haven't weighed in on **[N]** blocks yet:
> > • [Block label 1] (Section name)
> > • [Block label 2] (Section name)
> > • [Block label 3] (Section name)
> >
> > Want to finish those, or sign off as-is? Unanswered blocks will be logged as 'no opinion.'"
> >
> > Buttons: [Finish those] [Sign off as-is]
>
> Reason: drop-off prevention beats data-completeness coercion. The non-blocking prompt still surfaces what's missing (per UX critique) AND lets the reviewer ship. Rework risk: low. v1 had this as "disabled until all responded with inline nudge"; flipped per product critique.

### 3.4 Other-reviewer vote visibility

> **DM call: Show aggregate vote count (not names) on a block after the current reviewer submits their own vote on that block.** Names stay in the DM dashboard only. Reason: tight-knit 5-person volunteer panel on a summer schedule — momentum signal matters more than anchoring-bias purity. UX critique pushed back on v1's "hide entirely"; v2 takes UX's framing.

### 3.5 "Other" responses
**Removed in v2.** No "Other" option on A/B blocks → no triage queue. Comments on A/B blocks are reviewed by DM in the admin dashboard, not as a gated workflow.

### 3.6 What happens to factual flags
- Separate lane (§2.3). Does **not** block `editorially_approved`. Does block `publish_ready`.
- Each flag must end in `confirmed` (correction applied), `rejected` (claim was correct, no change), or `deferred` (correction agreed but not for this cutover; logged to BACKLOG).
- **Brian triages all incoming flags within 24h** and routes to the right SME. 48h SLA on SME resolution starts from Brian's handoff.

---

## 4. Reviewer experience

### 4.1 Mobile-first reframe (NEW in v2 — first-class requirement)

> **DM call (v2): Reviewer-facing screens are designed and tested mobile-first.** 3 of 5 reviewers will open the onboarding email on iPhone first; if mobile is unusable, they'll punt and never come back. Admin authoring stays desktop-only. Rework risk: low — this just bumps mobile from "supported" to "primary design target."

### 4.2 Screen specs

| Element | Spec |
|---|---|
| **Entry** | Tokenized magic link per reviewer (existing). Lands on personal dashboard. |
| **First-visit interstitial (NEW v2)** | One-time card shown before dashboard on first login per reviewer. Not a modal; a routed card. Copy: "Welcome. You're approving copy for 6 pages of the new All Saints' site. Each page takes about 12-15 minutes — roughly 8 picks plus a checklist. Pick the wording you prefer; skip anything you don't have an opinion on. If you see something incorrect, hit 'Something's wrong here' and Brian will route it. Sign off when you're good with the page." Single button: "Got it, let's go." Persists `seen_interstitial_at` on the reviewer record so it doesn't repeat. |
| **Dashboard** | List of pages assigned to this reviewer. Each row: page name, your status (not started / in progress / signed off), aggregate status (e.g., "2 of 5 signed off"), open factual-flag count badge. |
| **Page-review screen** | One page at a time. Vertical scroll. Persistent header with: page name, "View live page" link, **"Something's wrong here"** button, sign-off button (always enabled — see §3.3). |
| **Block sequence** | A/B blocks and Checklist blocks in DM-authored sort order. No nesting. |
| **"Skip this one" option** | Every block has an explicit "Skip this one (no opinion)" affordance. Non-vote ≠ skip; we want the distinction. Skip counts toward "responded" for sign-off; doesn't count toward vote tally. |
| **Other-reviewer visibility** | Aggregate count (not names) after the current reviewer submits their own vote on the block. See §3.4. |
| **Per-block "Something's wrong here" link** | Small link at the bottom of every block card. Pre-populates the anchor field in the error modal. (NEW v2 per UX critique.) |
| **Comments** | Free-text comment textarea per block. Optional. Visible to DM and other reviewers (after their own vote). |
| **Mobile** | First-class. All reviewer screens designed and tested at iPhone-SE width first, then scaled up. |
| **Save state** | Auto-save per block on selection change (existing pattern). |

### 4.3 Empty / loading / error states table (NEW in v2)

| State | Copy |
|---|---|
| **Dashboard — no pages assigned yet** | "Nothing to review yet. Brian or Nate will send a note when your first page is ready." |
| **Page-review — loading** | Skeleton cards (3 blocks). No copy. |
| **Sign-off confirmed** | "Signed off. Thanks. You're 1 of 3 needed for this page to advance." (or "You're the 3rd — this page is approved.") |
| **Sign-off with incomplete blocks** | (Modal — see §3.3.) |
| **Token expired** | "This link's expired. Reply to Brian's email and he'll send a fresh one." |
| **All pages complete (dashboard)** | "You've signed off on every page assigned to you. Thank you — that's the whole job." |
| **Error submitting** | "Couldn't save that. Check your connection and try again, or refresh the page." |
| **"Something's wrong here" submitted** | "Got it. Brian will route this and email you when it's resolved." |

### 4.4 "No opinion" / "Skip" rate monitoring

> **DM call:** v1 had a blanket 70% "no opinion" threshold for DM follow-up. v2 per UX critique: **track skip rate per block-type per reviewer**. Chuck marking 90% skip on ministry-operations checklists is healthy domain-skip; Brian marking 80% skip on A/B copy picks is a signal to DM. Implementation: admin dashboard surfaces skip-rate by (reviewer × block_type) instead of overall %. Rework risk: low.

---

## 5. Admin / DM experience

| Surface | What it does | New vs. existing |
|---|---|---|
| **Page registry** | List all reviewable pages with status, reviewer assignments, signoff count, open factual-flag count, last activity | NEW |
| **Page authoring** | Add/edit/reorder blocks on a page. Block-type picker (A/B, Checklist). Preview as reviewer | NEW (replaces direct DB inserts) |
| **Reviewer management** | CRUD reviewers, regenerate tokens, assign reviewers to pages | EXISTS — confirm, no rework |
| **Bulk CSV** | Import block definitions and decisions in bulk (per recent commits: `import_review_approvals.py`) | EXISTS — confirm; extend to handle checklist + factual_flag rows |
| **Factual-flag dashboard** | Cross-page list of all factual flags with status, age. Brian's triage workflow (assign-to-SME button per row). Skip-rate by reviewer × block_type. | NEW |
| **Page sign-off audit** | Per-page: who signed off, who didn't, who skipped what | NEW |
| **Per-page build brief (NEW v2)** | **Human-readable per-page export for Brian's Squarespace build.** Markdown or printable HTML, one document per page. Format: section name, approved option label, **verbatim approved copy**, vote tally footnote (e.g., "Approved 3-2, Brian dissent: '...'"), list of confirmed factual corrections to apply. NOT a JSON/CSV blob. Brian works from this when building in Squarespace. M5 cannot slip — this is the actual handoff artifact. | NEW |

> **DM call (v2):** Removed "Other triage queue" from admin surfaces (no Other option in v2). Added per-page build brief — this is the M5 deliverable that actually unblocks Phase 6.

---

## 6. Data-model migration

### 6.1 Keep
- `reviewers` — add `seen_interstitial_at TIMESTAMP NULL` (new v2)
- `assignments` — unchanged (semantics shift from per-decision to per-page; see below)
- `submissions` — unchanged structure; `choice` and `other_text` semantics extended to encode checklist responses as JSON in `other_text`

### 6.2 Alter
- `decisions`: add `block_type TEXT NOT NULL DEFAULT 'ab_choice' CHECK (block_type IN ('ab_choice','checklist'))`. Add `page_slug TEXT NOT NULL` (denormalize from `section` for clarity; `section` becomes the in-page anchor label). Add `sort_order INTEGER NOT NULL DEFAULT 0`.
- `assignments`: add row-level note in handler — assignment is now interpreted as "reviewer is assigned to all blocks on this page" rather than per-block. Keep table shape; the application layer fans out page→blocks→assignment rows on page publish.

### 6.3 Add
- `pages` — id, slug (`home`, `visit`, `connect`, etc.), title, live_url, status (`draft`,`in_review`,`editorially_approved`,`publish_ready`,`published`), created_at, published_at. The page registry.
- `page_signoffs` — page_id, reviewer_id, signed_at, note, signed_off_with_incomplete BOOLEAN (true if reviewer used "sign off as-is" with skipped blocks). UNIQUE(page_id, reviewer_id).
- `factual_flags` — id, page_id, anchor TEXT, claim_under_review TEXT, proposed_correction TEXT, evidence_url TEXT, flagged_by_reviewer_id, triaged_by TEXT, sme_assignee TEXT, status TEXT CHECK (status IN ('open','triaged','sme_assigned','confirmed','rejected','deferred')), sme_note TEXT, created_at, resolved_at, flagger_notified_at TIMESTAMP NULL.

### 6.4 Deprecate
- Nothing dropped. Old per-decision rows can coexist; they'll be re-classed as `block_type='ab_choice'` on migration with their existing `section` as `page_slug`.

### 6.5 Backward compatibility / existing data

> **DM call: NO migration of existing review responses. This is a reset.**
> Justification: existing data is from a model the review group never engaged deeply with; carrying it forward would falsely inflate "responded" counts and bias the new tallies. The current `decisions` rows can stay in the table for historical record (with `status='finalized'` and a `legacy` flag if helpful), but the new packet is built fresh and reviewers vote from scratch. Rework risk: low — alternative is "import existing A/B decisions where any reviewer already responded," but that's <5 rows and not worth the audit.

---

## 7. Build plan (recomputed for v2)

| M | Scope | Est | Feature-flaggable |
|---|---|---|---|
| **M1** | Schema migration (alter `decisions`, add `pages`/`page_signoffs`/`factual_flags`, add `reviewers.seen_interstitial_at`). Admin authoring UI for A/B blocks (no "Other" option). Page registry CRUD. | 0.5 day | Yes — new admin routes hidden until flag flipped |
| **M2** | Reviewer page-review UI for A/B. Sign-off button (always-enabled + non-blocking prompt per §3.3). "Skip this one" affordance. Aggregate-count-after-own-vote visibility. **First-visit interstitial card.** **Mobile-first layout.** **Reviewer-facing relabel pass** (per §1.5). | 0.5 day | Yes — per-page `in_review` state acts as the flag |
| **M3** | Checklist block type — admin authoring, reviewer UI, JSON response storage, item-rate aggregation in admin view. | 0.5 day | Yes — admin can choose not to author any checklist blocks |
| **M4** | "Something's wrong here" lane — header button + per-block link (with anchor pre-populate), modal, `factual_flags` table, admin dashboard with Brian-triage workflow, status transitions, flagger email-on-resolution. | 0.5 day | Yes — header button hidden behind flag |
| **M5** | DM dashboard polish + **per-page build brief export** (markdown/printable HTML, see §5). Cross-page status grid, signoff audit, skip-rate by reviewer × block_type, empty/loading states. | 0.5 day | N/A — admin only. **M5 cannot slip** — build brief is the Phase 6 handoff artifact. |

**Total: 2.5 dev-days** (unchanged from v1).

**Net change from v1:**
- M5 lost: "Other" triage queue (killed in v2)
- M5 gained: per-page build brief export (this is the actual failure mode if missing)
- M2 gained: first-visit interstitial, mobile-first layout pass, reviewer-relabel pass, non-blocking sign-off prompt
- M2 lost: "Other"-textarea-on-A/B UI

Net dev-day estimate holds at 2.5. M2 grew but the killed "Other" + simplified factual-routing in M4 offset it.

**Sequencing rationale:** M1+M2 unlock the home/visit packets for Phase 4 (Jun 9). M3 must land before "First Sunday" checklist in Visit. M4 must land before any page reaches `publish_ready`. **M5 must land before Phase 6 (Jul 6)** — Brian can't build in Squarespace without the per-page build briefs.

---

## 8. Open risks

| Risk | Mitigation |
|---|---|
| **Reviewers mid-stream** — anyone already voting on the old model gets reset | Onboarding email at M2 ship (see §10): warm, from Brian, sets time expectations. Brian co-signs. |
| **Sub-page scope creep** — reviewer wants to vote on a sub-section, not the whole page | Page is the approval unit. Sub-page comments go in the per-block comment box, not as a new gate. Document this in onboarding email. |
| **Mobile UX** | First-class in v2 (see §4.1). Tested at iPhone-SE width. Admin still desktop-only. |
| **Factual-flag noise** — reviewers flag wording preferences as "factual" | Modal copy includes the explicit guard: "Use this if something on this page is incorrect, not if you'd just word it differently." Brian (triage) closes mis-routed flags as `rejected` with a redirect note. |
| **Brian overload as flag triage** | 24h triage SLA. If Brian backs up, DM auto-escalates aging flags to Nate after 48h. Surface aging flags in dashboard. |
| **SME unresponsive after Brian's handoff** | 48h SLA from handoff. Surface aging flags in dashboard; Nate intervenes at 72h. |
| **Reviewer signs off with most blocks skipped** | `signed_off_with_incomplete` flag on `page_signoffs`. DM dashboard shows it. If 3 of 3 signoffs are "as-is" with high skip rates, DM holds the `editorially_approved` transition and pings the reviewer for substantive votes on critical blocks. |
| **Plan B trigger** — build slips past Jun 8 OR low reviewer response in week 1 of Phase 4 | Fall back to Figma file per page with annotation layers + comment threads. DM tallies votes manually (~30 tallies total across 6 pages). See §11. |

---

## 9. Critique status

v1 was reviewed by `senior-ux-designer` and `principal-product-designer`. All recommendations reconciled into v2. Conflicts resolved by DM:

1. **Sign-off button** — Product's "always-enabled + non-blocking prompt" wins; UX's nudge content folded into the prompt copy.
2. **"Other" on A/B** — Product's "kill it" wins; comment field is the escape hatch. No triage queue.
3. **Vote visibility** — UX's "aggregate count after own vote" wins (momentum signal for tight panel).

Autonomous DM calls on escalated questions:
- 3-of-5 threshold does NOT require Brian's vote (flat voting; dissent logged for 1:1).
- Factual-flag resolution → single email to flagger; no in-tool UI for them post-signoff.
- Brian fronts onboarding email (assumption — confirm before M2 ship).
- Tool archived after cutover.

---

## 10. Onboarding email (NEW in v2)

> **DM call (v2):** Onboarding email is from **Brian**, not Nate. Brian is the daily contact for these 5; Nate is the builder. The tool only beats "just email Brian" if Brian is the one inviting them into it.
>
> **DM assumption — confirm with Brian before M2 ship.** If Brian declines to front the email, fallback is Nate sends from his own address with a paragraph quoted from Brian at the top.

**Email contents (draft for Brian to approve, written in Nate's voice but signed by Brian):**

> Subject: Help us land the new All Saints' site, 30 min per page
>
> Hi [name],
>
> Quick favor. Nate's built the new All Saints' site and we're at the point where I need your eyes on the copy before it goes live mid-July.
>
> Rather than 100 emails back and forth, there's a small tool that asks you to pick between wording options, check off what's covered on each page, and flag anything that's flat-out wrong. About 8 picks per page, plus a checklist. ~12-15 minutes per page. 6 pages total.
>
> If you spot something incorrect, hit "Something's wrong here" — those come to me and I'll route them.
>
> Here's your link: [tokenized magic link]
>
> Whenever you have a few minutes is great. The earlier we get sign-offs the calmer cutover week will be.
>
> Thanks,
> Brian

---

## 11. Plan B — Figma fallback

**Trigger condition:** build slips past Jun 8 OR fewer than 2 of 5 reviewers have responded to the first page packet by end of week 1 of Phase 4 (Jun 13).

**Plan B mechanics:**
- One Figma file per page. Annotation layers mark each A/B block and checklist question.
- Reviewers leave Figma comment-thread responses ("A" / "B" / checklist items).
- DM tallies manually (~30 tallies total across 6 pages). Two evenings of work, not three weeks of build.
- Factual flags = comment thread tagged `#error`, routed to Brian by DM.
- Sign-off = reviewer comments "signed off" on the page cover frame.

**Setup cost:** 2h vs 2.5 dev-days for the tool. The tool only earns its keep over Plan B if automated tally + sign-off + per-page build brief beats manual.

**DM monitors trigger** at Jun 8 (build status) and Jun 13 (response rate). Flips to Plan B unilaterally if either trips.

---
