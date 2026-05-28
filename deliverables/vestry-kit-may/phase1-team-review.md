# Phase 1 Team Review — Content & IA Pass on v1/v2/v3

**Reviewed:** May 2, 2026
**Scope:** Validate Phase 1 plan (content + IA only — no design shifts to v1/v2/v3). Settle two deferred decisions (rector-search visibility; carry-over rubric). Surface anything the research missed.
**Lenses applied:** UX/IA, Product strategy (rector-candidate audience), Accessibility, Episcopal tone, Vestry-reveal risk.
**Verdict:** **Ship the Phase 1 plan with the four fixes called out below.** The research is strong, the rubric is sound, and the IA holds — but the rector-search treatment, two factual bugs in v3, the "Your Pastors" label, and a missing diocesan-bishop fact need to land before vestry sees the updated reveal.

---

## Decision A — Rector Search visibility

**Recommendation: Homepage section + secondary "Rector Search" sub-page under About + a small persistent header utility link during the search only.** Same treatment on all three options.

Reasoning:
- The audience is genuinely two-headed. Parishioners want updates and a sense of progress; a discerning candidate wants a polished, navigable landing they can find without hunting. A single homepage section serves the parishioner ("here's where we are this month"). A real /about/rector-search page serves the candidate (timeline, committee roster, Canon Sprott's role, parish-profile link, contact path).
- Putting "Rector Search" in the *primary* top nav is wrong for two reasons. (1) It overweights a transient state — within 12 months it should retire without leaving a gap. (2) It signals "we are a parish in transition" as our front-most identity, when the front-most identity should be "we are a healthy Episcopal parish that happens to be in search." Candidates respect parishes that lead with worship and ministry, not with their own anxiety about the search.
- A small **utility-style** link in the header (e.g. top-right, near Give/Watch Live, or just above the main nav) — labeled "Rector Search" — is the right compromise. It's findable in one glance, removable in one CSS change, and doesn't compete with the five primary categories.
- Rolling this out the same way across v1/v2/v3 keeps the comparison apples-to-apples for the vestry. Different placements per option would muddy the choice they're being asked to make.

**Concrete spec:**
1. Header utility link: "Rector Search" (top-right, small, secondary styling).
2. Homepage section: 1 paragraph status + last-updated date + "Read the full update" CTA.
3. Sub-page at `/about/rector-search` with: where we are, search committee chair + members, Canon Marion Sprott's role (Diocesan Transition Officer, Diocese of NC), milestone timeline, parish profile link (placeholder until live), congregational input archive, candidate contact path.
4. Auto-retire after a call: remove header link and homepage section; keep the sub-page archived under `/about/our-story` for the historical record.

---

## Decision B — Carry-over rubric

**Validate the rubric as-written with two small tightenings.**

The four buckets (Keep / Edit / Cut / Combine) are correct and defensible. The criteria for each are right. Two refinements:

1. **"Cut" needs a tone-neutral phrasing and one addition.** The 2022 deficit appeal isn't just dated — it's *actively damaging* to a candidate's read of financial health. Same for "coming soon" placeholders. Promote both to *must-cut-before-reveal* rather than general housekeeping. Add to the cut list: **any page where the headline names a person no longer at the parish** (e.g., the prior rector's farewell letter, if still live).
2. **"Edit" needs an Episcopal-vocabulary check as a standing sub-criterion.** Per the terminology reference, "communion" → "Eucharist" in formal contexts, "pastor" → "priest/clergy/rector," "service" → "liturgy/Eucharist" in body copy. Any page touched by the Edit pass gets this scrub.

**Final rubric (use this version going forward):**

> **Keep:** anything helping a rector candidate or newcomer answer "is this a healthy, active, welcoming Episcopal parish?"
> **Edit:** still-true content with stale dates, broken forms, or non-Episcopal terminology. Any page touched gets an Episcopal-vocabulary scrub.
> **Cut:** dated news (>12mo), one-off event recaps, broken pages, the 2022 deficit appeal at /giving/, "coming soon" placeholders, sermons older than the current liturgical year unless evergreen, and any page headlined by a person no longer serving here. The deficit appeal and placeholders are *must-cut before vestry reveal*.
> **Combine:** redundant pages with single-paragraph content.

---

## IA verdict

**The proposed 5-item nav (Visit / Worship / Community / About / News & Events + Watch Live + Give) holds.** Adding the new content slots (search-committee page, parish profile, "What to Expect on Sunday," lay staff, ministries refresh, formation, history-to-present, sermons) does not break it. Specifically:

- "What to Expect on Sunday" lives under **Visit** as a section. Already planned in B2 — confirmed.
- Lay staff bios live under **About → Staff**. Already planned. Make sure the Director of Music (Brian Sapp-Moore) and Director of Youth & Family Ministries (Tiffany Fulton) get full bios — these are the two staff a candidate cares most about.
- Ministries refresh (Outreach, Formation, Pastoral Care) lives under **Community**. Confirmed.
- History-to-present extension lives under **About → Our Story** (or `/about/history`). Confirmed.
- Sermons archive — B2 recommends link-out to YouTube. **Override that.** A candidate is unlikely to dig through a YouTube channel; an in-site sermon page with 6–10 curated recent sermons (Johanssen, Bernacki, Reese) embedded or linked is worth the small build cost. Place it under **Worship → Sermons** rather than News, because sermons are liturgical artifacts, not news.
- Parish profile (OTM portfolio) — host as PDF on the rector-search sub-page, with a one-click homepage link the day it goes live.
- Diocesan posture — one-line acknowledgment on the homepage footer **and** a sentence on /about ("All Saints' is a parish of the Episcopal Diocese of North Carolina; our bishop is The Rt. Rev. Samuel S. Rodman III"). Currently absent from all three options.

**One IA change to the B2 plan:** Move sermons from News & Events to Worship. Worship gets one new sub-section.

---

## Top 5 actions for implementation phase (ordered by impact)

1. **Build the Rector Search treatment uniformly across v1/v2/v3** (header utility link + homepage section + `/about/rector-search` sub-page). This is the single largest content gap for the candidate audience and the most consequential thing the vestry will look at on the updated reveal. Use real names: Canon Marion Sprott, search committee chair (confirm with vestry), search committee roster.

2. **Fix v3's three factual errors before reveal.** (a) "Your Pastors" → "Our Clergy" (Episcopal terminology — flagged as the strongest tone error in v3). (b) Clergy roles: Johanssen is **Interim Rector**, not Rector; Bernacki and Reese are **Priest Associate**, not Associate Rector / Assisting Priest. (c) Tuesday Compline is **8:00 PM**, not 8:30. Also fix the broken Facebook/Instagram/YouTube URLs in v3 (use v1/v2's verified URLs). These are not stylistic choices — they make v3 look the least professional of the three to a candidate who notices.

3. **Add a "What to Expect on Sunday" section** to all three options' Visit experience (v1 visit.html already has the bones; v2 and v3 need a clearer dedicated block). Cover: vesture, length (~60 min for 9 AM, ~75 min for 11:10), open-table Eucharist (confirm with clergy), where children go, dress, parking, where to find a greeter. Single most-requested page by both newcomers and candidates.

4. **Cut and replace the 2022 deficit-appeal /giving/ content** with a current Giving page: 2026 pledge campaign, online giving, planned giving, one honest line on financial health (consult Treasurer Victor Clark). This is must-cut-before-reveal — leaving it exposes the parish to the worst possible first impression on financial fragility.

5. **Add the diocesan-relationship line** to all three options ("A parish of the Episcopal Diocese of North Carolina · The Rt. Rev. Samuel S. Rodman III, Bishop") in the footer, plus a one-sentence treatment on /about. Candidates orient by diocese; its absence reads as either provincial or careless. Cheapest high-impact fix on the list.

---

## What the research missed (additions)

**Content gaps:**
- **No statement of welcome to LGBTQ+ persons / no Baptismal Covenant echo.** Many discerning candidates — particularly progressive Episcopal candidates aligned with the Diocese of NC's stated priorities — read parish welcome language for explicit signals. The terminology reference flags "We seek and serve Christ in all persons" and "respect the dignity of every human being" as safe Baptismal Covenant echoes. At least one of these belongs on the homepage welcome or /about. Currently absent in all three.
- **No mention of which prayer book / hymnal.** Trivial fact, big signal: "We worship from the Book of Common Prayer (1979) and The Hymnal 1982, with supplemental music from Lift Every Voice and Sing II and Wonder, Love, and Praise" (confirm last two with music director). Three sentences; massive credibility lift with a candidate.
- **No staff org sense.** Listing six staff names on /about/staff is good. A one-line "this is how we're organized" — even just "Clergy report to the Vestry; staff report to the Rector" — orients a candidate who is sizing up what they'd be inheriting.
- **No "average Sunday attendance" or any honest size cue.** Candidates need to know if they're discerning a 60-ASA parish or a 250-ASA parish. One number on /about. (Confirm with vestry; this can be approximate.)

**Photo gaps the photo agent missed:**
- **No photo of Fr. Johanssen actually presiding or preaching.** The 2026 screenshot used for his headshot is functional but not warm. A photo of him at the altar or in the pulpit, even from livestream stills, would humanize the interim leadership for a candidate.
- **No photo of children in formation/Sunday School.** The photo inventory has Lockhart-adjacent and procession shots but nothing of children in "Dig-In" or EYC. The "we have an alive children's program" claim needs visual proof. If the Services_2026 set has any classroom or kids-at-the-altar shots not yet sampled, prioritize them.
- **No interior shot of the Parish Hall** where the 9 AM contemporary Eucharist happens. v2/v3 lean on Nave imagery; the contemporary service has no visual identity. Worth one shot.

**v1/v2/v3-specific issues beyond what's inventoried:**
- **v1's invented worship-bulletin URLs** (`/worship/contemporary-bulletin/` and `/worship/traditional-bulletin/`) — flagged in inventory, must fix to `/worship-bulletins/` before reveal. A vestry member clicking from v1 lands on a 404 and the option loses credibility.
- **v1's clergy person-icon SVG placeholders.** The inventory flags this as the gap; it's worse than that. Showing clergy as anonymous silhouettes on the same page that names them by full title is the single most damaging visual choice across all three options for a candidate. **Pull the verified headshots from v2/v3 into v1.** Five-minute fix; high-impact.
- **v2's Brian Sapp-Moore-as-singular-music-credit.** Strong; preserve. But pair with a music-program photo (the new organist-hands shot or two-choristers shot) so the music story has visual weight.
- **v3's invented "Daughters of the King" reference.** Either confirm DOK exists at All Saints' (verify with vestry) or pull it. Citing a chapter that doesn't exist is the kind of small wrongness a candidate will catch.
- **v3's "10 Acres of Welcome" stat.** Charming if true; embarrassing if not. Verify before reveal.

**Vestry-reveal / engagement risk:**
- The vestry will compare the three options side-by-side. If we silently fix v3's role-label errors and Compline time but don't tell them, they may assume those were already correct and weight v3 higher than warranted on accuracy. **Annotate the reveal:** "Phase 1 corrections applied to all three options" with a brief diff list. Honesty with the vestry is consistent with the rubric we're applying to the public site.
- The decision the vestry is being asked to make is *which option to go with* — not *whether the content is good*. Make sure the reveal framing puts the *design direction* in the foreground and the *content fixes* in a separate "what we did this round" sidebar. Otherwise vestry feedback will pile onto the content (easier to comment on) and skip the directional choice.

**Accessibility (forward-looking):**
- Sermon archive: any embedded video needs captions. YouTube auto-captions are passable for back-catalog; new sermons should get a 2-week-out human caption pass. Bake this into the staff workflow before launch, not after.
- "Watch Live" header button: confirm contrast ratio against the burgundy palette in the recent commit (`cec3b96 Darken burgundy palette`). The darken should help; verify against AA.
- Photo additions: the 2026 shoot photos need alt text written by the photo selector, not auto-generated. Especially the dignified shots (columbarium plaque, organist hands) where the meaning is in the detail.

---

## Stop / Don't do

- **Don't put "Rector Search" in the primary top nav.** It overweights a transient state and reframes the parish's identity around its own search.
- **Don't rewrite the praised redesign copy.** The vestry already responded to it; the only copy edits in scope are: factual corrections, Episcopal-vocabulary scrubs on touched pages, and the genuinely missing content slots (rector search, what-to-expect, current giving, diocesan line, identity statement).
- **Don't blur the three options by giving them identical content treatments at the section level.** They need identical *facts* (clergy roles, Compline time, social URLs, rector-search treatment) but should retain their distinct visual and structural personalities. The vestry's decision is about which *design direction* to pursue.
- **Don't link the sermon archive out to raw YouTube as the primary path.** Curate 6–10 in-site. The rest can live on YouTube.
- **Don't wait for the parish profile to be perfect before linking it.** A "draft — last updated [date]" link is better than no link. Candidates trust drafts more than silence.
- **Don't add countdown timers, "limited spots," or any urgency tactics to events or sign-ups.** Off-tone for Episcopal voice and inconsistent with the values frame. (Flagged preemptively because Squarespace templates often offer these widgets.)
- **Don't commit any version of the rector's parish profile or financial detail into git as plaintext** without a vestry-approved disclosure check first. Once it's in the repo it's effectively public.

---

## What's working well

- The B1b research correctly identifies what a candidate actually scans for — this is the right lens, not a generic newcomer lens.
- The terminology reference is precise enough to use as a checklist during the Edit pass — no further interpretation needed.
- The B2 IA reduction (12 → 5 nav items, 13 → 0 404s) is the right call and survives the new content slots without restructuring.
- Photo inventory's discipline ("4 swaps, 5 additions, zero churn") is exactly the right posture given the design lock.
- The rubric as proposed is genuinely usable — minor tightenings only, no fundamental change.
- Honest acknowledgment that some content (Daughters of the King, "10 Acres," some clergy bio specifics) is invented or unverified, with explicit flags. That posture should carry into Phase 2.
