# Build packet — <PAGE NAME> (`/<final-slug>`)

*A build packet turns one prototype page into follow-the-checklist-and-paste. It carries
the actual approved copy (so nothing is retyped) plus the block map, links, and images.
Source of truth for copy: `worker/public/final/<page>/index.html`. Pattern names refer to
`build-any-page.md`.*

**Before you start:** global setup done (`00-global-setup.md`); homepage built; global CSS
pasted so cards/tokens render.

## Section map (top to bottom)
For each section: the pattern, the vehicle, and why.

| # | Section | Pattern | Vehicle | Note |
|---|---------|---------|---------|------|
| 1 | Hero | Subpage hero (1) | Native section + bg image | |
| … | | | **[Native]** / **[Code Block]** / **[Collection]** | changes-often → native |

## Copy (paste-ready, in order)
Section-by-section. Headings show the `<em>` emphasis word in *italics* (burgundy via
global CSS). Card grids as a compact list: **Title** — body copy.

## Links (rewrite `/final/...` → final slugs)
| Prototype href | Final target |
|---|---|
| `/final/visit` | `/visit` |

## Images (upload once, set alt)
| File (source path) | Alt text | Placement |
|---|---|---|

## Residue to normalize
- Inline `style="…#7b2332…"` eyebrow labels → the `section-label` class.
- Any hardcoded hex → tokens.

## Judgment calls
- Drop / simplify / keep decisions and why.
