# Phase 2 Team Review — Locked Content Slate

**Reviewed:** May 2, 2026
**Scope:** Sign-off on `phase2-content-slate.md` as the source-of-truth for Phase 3 implementation. Spot-check on `page-rector-search.md` and `page-what-to-expect-sunday.md`. Photo plan and vestry-reveal annotation reviewed in line.
**Lenses applied (synthesized in one voice — no Task tool available in this session, so the orchestrator applied each specialist lens directly against the artifacts; flagged below where a lens would normally be a separate sub-agent run):** UX/IA (senior-ux-designer), Accessibility (accessibility-reviewer), Product strategy / rector-candidate audience (principal-product-designer), Tone & polish (design-whimsy-injector), Implementation drift / "small content edit becomes design change" risk (sr-mobile-engineer).

---

## 1. Verdict

**Ship the slate as Phase 3 source-of-truth, with the four corrections in §3 made before implementation begins.** The slate accurately translates Phase 1 direction into a build-ready brief, the per-option splits respect each design's distinct identity, and the two drafted pages land for the candidate audience. The corrections are small (a handful of factual clarifications and a few copy nips) — none requires a structural revision.

---

## 2. Section-by-section walkthrough of "15 sections that must appear on every redesign"

The slate's table is the right backbone. Per-row notes:

1. **Hero with service times + What to Expect link.** Right call on all three. v1's hero is genuinely the weakest — the "add /worship/what-to-expect link" is necessary but not sufficient there; the v1 hero also still reads as the most generic. Phase 3 implementation note: do *not* let the link addition trigger a hero redesign on v1; that's a design change.
2. **"Wherever you are on your journey" welcome.** Correct on all three. Preserve v2's voice as the gold standard; bring v1/v3 toward it without rewriting from scratch.
3. **What to Expect on Sunday (new page + homepage teaser).** Correct on all three. The teaser format should be visibly distinct per option (paragraph in v1, scroll-stop card in v2, bento tile in v3) — the slate trusts this implicitly; make it explicit in Phase 3 sequencing notes.
4. **Clergy with real photos.** v1 fix is mandatory and should be the very first Phase 3 commit — it's the single highest-impact change in the entire slate. (See risks §6.)
5. **Lay Staff (4 people, headshots + role + 1-liner).** Correct on all three. Worth flagging: with only 4 staff, this section will look thin on v3's bento grid unless the cards are sized intentionally. **Implementation note:** allow the lay-staff treatment to differ per option (list vs. card grid vs. bento) — not a design change, just respecting each option's vocabulary.
6. **Ministries overview.** Correct. v1 already has the depth; v2/v3 should add named ministries without shifting their summary-style treatment. Don't import v1's catalog wholesale into v2/v3 — that would erase v2/v3's restraint.
7. **Music program (5 named ensembles).** Correct on all three. Same as #6 — name the ensembles in v2/v3, but don't bloat them into v1's catalog.
8. **Children & Youth promotion.** Correct on all three. This is the section most at risk of "small content add becomes layout change" — pre-decide the slot per option in Phase 3 kickoff.
9. **History (1878 → 2025).** **Cross-check needed.** B1b says 1877 first baptism; the slate says "1878 merger of two churches"; the live site narrative starts earlier than the merger. Confirm the founding date phrasing before Phase 3 — this is exactly the kind of fact a candidate notices. Slate also says "live site stops at 2014" but then resolves to "do not update; keep live-site content as-is" in §7. Reconcile: the slate's table row #9 implies an update will happen; §7 says it won't. **Pick one and rewrite the row** so Phase 3 doesn't flip a coin.
10. **Rector Search treatment.** Correct on all three (utility link + homepage section + sub-page). Strongest single addition.
11. **Diocese of NC + Bishop Rodman line.** Correct on all three. Cheapest high-impact fix.
12. **Give — replace 2022 deficit appeal.** Correct on all three. **Flag:** the slate says "NEW SHORT COPY (drafted in Phase 3)." Pull this out of Phase 3 and draft it now (Phase 2.5) so vestry sees a finished giving page on reveal. Drafting copy mid-implementation is where scope creep lives.
13. **Livestream URL fix on v3.** Correct.
14. **Sermons (curated 6–10).** Correct on all three. **Stage-later candidate:** if Phase 3 runs over, this is the one section that can ship as "Sermons → YouTube channel link" with the curated 6–10 added in a Phase 3.5 pass. Everything else on the list is reveal-blocking; this one isn't.
15. **Footer with diocesan line.** Correct on all three.

**Sections to consider as "one of three" rather than all three:** None of the 15. They're all foundational. The differentiation between options should come from *how* each is treated, not *whether* it appears. The slate already understands this; the per-option to-do list reflects it.

**Missing from the 15 (would add as #16):** A short **"What we believe / who we are" identity statement** on /about. B1b §6 calls this out as the #1 candidate-facing gap. The slate addresses welcome (#2) and what-to-expect (#3) but does *not* explicitly call out the 2–4-sentence identity statement. Either fold it into the About row or add a row 16. **Don't ship without it** — it's the single most-asked-for thing by a candidate per the B1b research.

---

## 3. Required corrections before Phase 3 begins

1. **Reconcile row #9 (History).** Slate table says "USER UPDATE for 2014→2025"; §7 says "do not update; keep live-site content as-is." Pick one. Recommend: keep live-site content but add **one paragraph** covering Cox's transition, Johanssen's interim arrival, and the search now underway. That's not a re-write of the live history; it's a single honest paragraph that closes the time gap.
2. **Add an identity-statement row (#16) to the slate.** 2–4 sentences. Vestry/clergy task. Reference B1b §6.1.
3. **Move the Giving page copy from "drafted in Phase 3" to drafted now.** Treat as Phase 2.5. Same reasoning the slate uses for the Rector Search and What-to-Expect pages: don't ship copy and structure in the same commit.
4. **Verify or pre-empt the Fr. John email typo** (`jjohansssen@…` — three s's). The Rector Search page references it; it's almost certainly a typo on the live site. Confirm with Fr. John or the parish office *before* Phase 3 links to it. If we can't confirm, route through `admin@` only.

---

## 4. Per-option to-do list review

**v1 (Original) — multi-page.** Scoped correctly. The clergy-headshot fix is appropriately first. Two additions to consider:
- The "fix invented bulletin paths" line is correct but should be paired with a quick `grep` of v1 for *any* invented URL — not just bulletin paths. If one invented path slipped through Phase 1, others may have.
- The "preserve multi-page structure" guardrail is correct but worth restating loudly: when Phase 3 adds Lay Staff and What-to-Expect, the temptation will be to fold them into existing pages "to keep nav simple." Don't. v1's identity *is* multi-page.

**v2 (Sanctuary) — single-scroll.** Scoped correctly. The "verify clergy bios as drafted are factually true" line is doing a lot of quiet work — flag this as a real verification task with a checklist (interim role yes/no, VTS yes/no, prior cures, family details), not a vibes check. Otherwise easy to skip.

**v3 (Gathering) — bento.** Scoped correctly. The "10 Acres of Welcome" removal is right; the social URL fixes are right; the role-label fixes are right. Two adds:
- **Confirm the Daughters of the King reference** (flagged in Phase 1 review §"What the research missed"). The slate doesn't mention it. Either confirm DOK exists at All Saints' or pull the reference from v3. Don't let this slip.
- The "preserve bento layout pattern" guardrail will be tested by the Lay Staff addition (only 4 people — the bento grid wants either 3, 4, 6, or 8 cells). If 4 fits a row cleanly, great; if not, decide *now* whether to add a 5th tile (a "Meet the team" link card) rather than mid-implementation.

**Nothing over-scoped.** Nothing missing beyond the four corrections in §3.

---

## 5. Drafts spot-check

### Rector Search page

**Lands for a candidate? Yes — strongest single page in the kit.** The lifecycle framing (status → timeline → engagement → diocesan posture → contact) is exactly the order a discerning candidate scans. The "we are not in a hurry; we would rather discern well than quickly" line is the right Episcopal voice — confident, unhurried, theological without being preachy.

**Cuts:**
- The opening paragraph italicizes the whole block. Drop the italics — italics on a hero paragraph reads as a pull-quote and slightly undercuts the directness. Plain text is warmer here.
- "[VERIFY]" tags should not ship in published copy. Resolve all 10 `VERIFY items` in the draft footer before the page goes live. Specifically: Nancy Cox's name and tenure (B1b confirms her name; just verify spelling and whether "retired" or "concluded her ministry" is preferred), Canon Marion Sprott's current role, the email typo, and the parish profile status. The other six can ship as content gaps that update over time, but not as `[VERIFY]` literal strings.

**Adds:**
- A **prayer for the search** — the page references "A prayer for the search is offered in our Sunday liturgy and in the Weekly Word" but doesn't print the prayer. Print it. Three to five lines. Candidates and parishioners both want to see it; it costs nothing and gives the page a moment of actual liturgy.
- A line on **what the parish is *not* looking for** is worth considering — in the spirit of B1b's "candidates trust specifics and distrust generic." Optional; vestry call.

**Rephrase:**
- "We are in good company" in the hero paragraph reads slightly chipper for the moment. Try: "We are not walking this alone — the Diocese of North Carolina walks with us, our Interim Rector serves alongside us, and the wider parish shapes the call."

**Episcopal-tone check:** Clean. "Common life," "discern," "call," honorifics all correct.

### What to Expect on Sunday

**Open-table phrasing reads well? Mostly — but it is *not* fully open as drafted, and the slate says it should be.**

The draft uses: *"All baptized Christians of any tradition are welcome to receive communion at the Lord's table."*

The slate (§7, resolved VERIFY items) says, per live-site `/what-to-expect/`: *"all who love God and are drawn to Christ are welcome at Christ's table" — fully open, use verbatim.*

These are different theologies. The draft restricts to baptized; the live-site (and the slate's resolved direction) is fully open. **Replace the draft's Section 4 communion paragraph with the live-site verbatim phrasing.** This is the most important single edit in the spot-check.

**Order check:** The order (Welcome → Two services → What happens → Communion → What to wear/parking → Children → Accessibility) is right for a first-time visitor. One small swap to consider: move **Children** above **What to wear / parking**. A visiting family with kids reads "Children" first; logistics second.

**Episcopal-off-tone risk:**
- "Sanctuary" vs. "Nave" — the draft's own VERIFY #9 raises this honestly. Recommendation: use **Nave** (matches live site, matches Episcopal vocabulary, matches the slate's §5 terminology pass) with a brief parenthetical the first time: *"in the Nave (the main worship space)."* That serves both the Episcopal tone *and* the first-time visitor.
- "Pastor John" doesn't appear in the draft — good. Honorifics are clean throughout.
- "Episcopalians from any background" is friendly but slightly insider — softens to "anyone familiar with Episcopal worship will feel immediately at home."

**`[VERIFY]` tags should not ship in published copy.** Same rule as Rector Search. Resolve gluten-free, parking, nursery hours, formation rooms, and accessibility *before* the page goes live. The accessibility section in particular **must not ship with four `[VERIFY]` bullets** — see §6 risks below.

---

## 6. Photo plan review

**4 swaps + 5 additions is the right posture given design-lock.** The swaps are all defensible (rotated glass, sparse chapel, organist's-back choir, sign-centric exterior). The additions are well-chosen.

**Conservative? Slightly too conservative on two counts:**

1. **No photo of Fr. John presiding or preaching.** Phase 1 review §"What the research missed" called this out. The slate doesn't pick it up. Even a livestream still would humanize the interim leadership — and it directly supports the Rector Search narrative. **Add as a 6th addition** if a candidate is going to land on /about/clergy or /about/rector-search and see only a headshot. (If no usable image exists, surface that *now* so a quick still can be pulled before reveal.)
2. **No children-in-formation photo.** Also called out in Phase 1 review. The slate says "Children & Youth currently buried 3 clicks deep" and rightly promotes it — but promotes it without an image. The "we have an alive children's program" claim needs visual proof. Sample the Services_2026 set for any classroom or kids-at-the-altar shots; if nothing exists, that's a vestry conversation about a future shoot.

**Other gaps:** Parish Hall interior (where the 9 AM service happens) is still missing — flagged in Phase 1, not picked up here. Lower priority than the two above; can defer.

**Defer-list and Drop-list are correctly scoped.** The "deeper review of 18 unviewed Services photos" should happen *during* Phase 3, not after — write it into the kickoff.

---

## 7. Risks for Phase 3

**Where implementation could drift from the slate:**

- **The Lay Staff addition on v3.** Bento grids are unforgiving with awkward counts. Pre-decide layout (4 cells in one row, or 4 + a "meet the team" 5th card) at kickoff, in writing, in the slate.
- **The Children & Youth promotion on all three.** "Promote" is vague. Each option needs a named slot (v1: section on /connect; v2: anchor in the scroll; v3: bento card). Write the slot assignment into the slate before Phase 3.
- **The History paragraph addition (per §3 correction #1).** A "one paragraph" add can quietly become a section if the implementer thinks it deserves more. Cap it: one paragraph, ≤120 words.
- **The Music ensemble names on v2/v3.** "Restore" / "add" the 5 named ensembles — the implementer will be tempted to import v1's catalog format. Write the constraint: names + one line per ensemble; no nested catalog.

**Where a "small" content change crosses into design change:**

- **Adding a link to v1's hero.** A new link triggers "we should redesign the CTA stack." It shouldn't. One link, existing styles, ship.
- **Restoring named ministries on v2.** v2's restraint is a design choice. Add the names without expanding the section's visual weight; resist new icons/cards.
- **Lay Staff section visual treatment.** The slate says "compact, headshots + 1-liner" for v2 and "fits the bento aesthetic" for v3 — both are design directives masquerading as content directives. **Either accept this and lock the treatment per option in Phase 3 kickoff, or strike the treatment language from the slate and trust each option's existing visual vocabulary.** Pick one before Phase 3 starts.
- **The Rector Search header utility link.** A new utility link in the top-right has design implications for all three options' header lockup. Verify each option's header has space *before* committing to the placement; if not, decide alternative placement now (just below the main nav?).

**Vestry-reveal annotation — needs sharpening:**

The slate's §6 covers the right idea but the annotation itself isn't drafted. Three additions:
1. **Draft the annotation now.** A 5–7-bullet "What changed across all three" written in the orchestrator's voice (not Nate's), ready to paste above the redesign URLs.
2. **Frame it as a parish improvement, not a design improvement.** Vestry should read it as "the content team did this work" — not "v3 was wrong and we fixed it."
3. **Surface it before vestry clicks the URLs**, not after. If they click first, they form an impression based on the fixed-up version and the annotation feels like a confession.

---

## 8. STOP / not-do list (Phase 3 must NOT touch)

- **Layout, type, color, spacing, animation, or visual hierarchy on any of the three options.** Slate already says this; restating because it is the single most-violated guardrail in content refreshes.
- **The praised redesign copy.** Edit only where factually wrong, terminologically off-tone, or genuinely missing. Do not "improve" a sentence because you have a better one.
- **The 5-item top nav.** It's locked. Sermons moves from News to Worship; nothing else.
- **The three options' distinct identities.** No cross-pollination of treatments (v1's catalog into v2; v3's bento into v1).
- **Inventing facts.** No new clergy quotes, no aspirational program descriptions, no "join 200 of your neighbors" attendance claims, no countdown timers, no urgency framing.
- **LGBTQ-explicit language.** Per user direction; conservative area; the "wherever you are on your journey" framing carries the welcome.
- **ASA / attendance numbers** unless vestry-confirmed.
- **The Hymnal 1982 by name** ("traditional hymnody" per live site).
- **Personal email addresses for clergy.** Route via `admin@allsaintsconcord.org` per slate §7.
- **`[VERIFY]` tags in shipped copy.** Resolve or omit; never ship the literal string.
- **Committee rosters** until vestry/committee opts in.
- **The parish profile / OTM portfolio in git.** Even a draft. Once it's in the repo it's effectively public. Link to it from the live site only when vestry-approved.
- **Any "small UI tweak" framed as a content change.** If it changes pixels, it's a design change and out of scope.

---

## What's working well

- The slate is the right level of fidelity — specific enough to build against, loose enough to respect each option's voice.
- The per-option splits correctly preserve identity. v1 stays the catalog; v2 stays the single-scroll narrative; v3 stays the bento community-led story.
- The Episcopal terminology pass is precise enough to use as a literal find/replace checklist.
- The vestry-reveal annotation is the right instinct (see §7 for sharpening).
- The drafted Rector Search page is the strongest single artifact in the kit; it lands.
- The honest acknowledgment of unverified items (DOK, 10 Acres, history dates, gluten-free wafers, accessibility specifics) is exactly the posture a candidate would respect — carry it into the shipped copy by *resolving* them, not by leaving the question marks.

---

*Phase 2 team review — synthesized from UX/IA, Accessibility, Product/Candidate-lens, Tone, and Implementation-drift perspectives. Sign-off conditional on the four corrections in §3.*
