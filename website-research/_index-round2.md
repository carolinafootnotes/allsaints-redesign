# Round 2 Research Index
Date: 2026-04-20

## Files written
- tier2-st-matthews-hyattsville.md
- tier2-christ-church-tulsa.md
- tier2-falls-church-episcopal.md
- tier2-grace-yukon.md
- tier3-christ-church-cranbrook.md
- tier3-st-barts-nyc.md
- tier3-trinity-wall-street.md
- tier3-washington-national-cathedral.md
- tier3-st-martins-houston.md
- tier4-christ-church-kennesaw.md
- tier4-st-marks-dalton.md
- tier4-ascension-cartersville.md
- tier4-holy-trinity-decatur.md

## Sites that loaded cleanly (full capture)
- tier2-christ-church-tulsa
- tier2-falls-church-episcopal (domain `thefallschurch.org` resolved directly to the TEC parish — no correction needed)
- tier2-grace-yukon
- tier3-christ-church-cranbrook
- tier3-st-barts-nyc
- tier3-trinity-wall-street
- tier3-washington-national-cathedral
- tier3-st-martins-houston
- tier4-christ-church-kennesaw
- tier4-st-marks-dalton
- tier4-ascension-cartersville
- tier4-holy-trinity-decatur

## Sites with partial data or issues
- tier2-st-matthews-hyattsville — homepage body did not render fully via WebFetch across multiple URL variations; hero details from `/home/` fallback. No dedicated "I'm New" / "Plan a Visit" / "Welcome" page was locatable. Service times not surfaced on any fetched page.
- tier3-st-martins-houston — loaded cleanly, but the Plan Your Visit page is missing service days/times/length/communion/dress code; top nav came back unusually short (Get Involved, Calendar, Give), which may indicate a hamburger or mega-menu WebFetch missed. Analyst should verify nav structure manually.
- tier3-trinity-wall-street — Visit/history page was thin on service logistics; `/worship-congregation/worship-services` used to supplement times/address. Flagged in that file's Issues section.
- Several tier 4 visitor pages (ascension-cartersville, holy-trinity-decatur) required a second URL guess after the first returned 404. Final pages captured successfully.

## Sites that failed entirely
- None

## Cross-site patterns worth the analyst's attention
(Observations from the subagent reports — presented as leads, not conclusions.)
- **Episcopal shield / diocesan logo in footer is rare across every tier we captured.** Most sites identify as Episcopal in copy but omit visual denominational markers.
- **Land acknowledgments appear on none of the 13 sites.**
- **Front-door / "where to enter" guidance is absent from nearly every visitor page** — notable because several parishes (Trinity Wall Street, St. Bart's, National Cathedral, Cranbrook) have architecturally complex or landmark buildings where this would be useful.
- **Clergy naming style varies sharply site-to-site** (e.g. "The Rev. [Full Name]" at Trinity Wall Street, first+last only at St. Bart's, "Fr. Ben" at Christ Church Kennesaw, no titles at all at St. Martin's Houston).
- **Tier 4 (affirming parishes in conservative GA regions) all surface an affirming/welcoming statement**, but explicitness varies — Ascension Cartersville names identity categories directly; others use generic "All are welcome" phrasing.
- **Hero CTA strategy diverges widely**: some sites lead with a visitor-oriented CTA (Christ Church Tulsa, Grace Yukon, St. Martin's Houston), others lead with Donate/Listen (St. Matthew's Hyattsville), and some have no hero CTA above the fold (Falls Church).

## Summary
- Attempted: 13
- Successfully captured: 12
- Partial: 1 (tier2-st-matthews-hyattsville)
- Failed: 0
