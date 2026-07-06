# Squarespace Build Kit — All Saints'

This is the hands-on kit for rebuilding the approved `/final/` prototype in Squarespace 7.1. It sits on top of the architecture docs (don't re-read those to build; read this):

- Architecture / why: `../component-reference.md`, `../squarespace-rebuild-readiness.md`
- IA / nav / URLs: `../ia-restructure-plan-jun2026.md`, `../session-handoff-2026-06-10.md`
- **What can/can't be automated: `AUTOMATION-FINDINGS.md`** (verified July 2026 — no API/MCP builds pages; the visual build is manual; three levers cut the labor). Read it once so we don't re-chase a Squarespace content API.

## How we're building it

**Code-Block-for-look, native-for-editing.** Paste the global CSS once. **Key reality (verified):** our CSS is keyed to the prototype's *class names* (`.involved-card`, `.section-heading`, `.worship-card`, etc.), and Squarespace gives you no way to put those classes on a native block. So the prototype's card/hero/section looks only appear inside **Code Blocks** that carry the markup; **native blocks inherit only Site Styles** (your fonts + colors), not the card system. Practically: use **Code Blocks** for the visually distinctive, stable sections (heroes, card grids, bento, the burgundy CTA strip), and keep **native** blocks for the plain, frequently-edited content where the exact look doesn't matter (this-week links, worship times, the Events collection, clergy grid). It's a per-section call, spelled out in `homepage.md` and `build-any-page.md`.

**Build the homepage first, then scale.** Don't expect the other pages' guides to exist yet. We build the homepage live, write down what Squarespace actually does in `DISCOVERIES.md`, fix anything that missed, *then* template the rest. No guessing 17 pages ahead of reality.

## The 3-layer model (how the pieces fit)

1. **Global Custom CSS** (`library/custom-css-global.css`) → Design → Custom CSS. Tokens, buttons, cards, footer. Pasted once, but the component styles only apply where their class names exist, i.e. inside **Code Blocks** (native blocks get Site Styles only).
2. **Global behavior** (`library/footer-injection.html`) → Footer Code Injection. The sticky-header scroll toggle + the random hero image. That's all the JS there is. (Fonts are native — set them in Site Styles, no injection.)
3. **Per-section content** → mostly native blocks; hero + bento are Code Blocks from `library/sections/`.

## Files

| File | What it's for |
|------|---------------|
| `00-global-setup.md` | One-time setup. **Do this first, in order, before any page.** |
| `homepage.md` | Section-by-section homepage build (native vs Code Block per section). |
| `build-any-page.md` | The 4-5 repeating patterns, so any page is "pick from these." |
| `packet-TEMPLATE.md` | Blank build-packet format (copy + block map + links + images per page). |
| `packet-connect.md` | Worked example: the Connect page, paste-ready. The card-grid template for most subpages. |
| `arboretum-import.md` | The one page we don't hand-build: bulk-import 36 trees via WXR (preserves QR URLs). |
| `make-arboretum-wxr.py` | Generates `arboretum.wxr` + `arboretum-TEST-1-tree.wxr` from the prototype + WordPress export. |
| `AUTOMATION-FINDINGS.md` | The verified automation verdict (no page-building API/MCP; what we use instead). |
| `DISCOVERIES.md` | Fill this in *as you build* — real Squarespace selectors, what broke, what you changed. Feeds the rest of the build. |
| `library/custom-css-global.css` | Paste-once global stylesheet. |
| `library/footer-injection.html` | Header scroll toggle + random hero (the only JS). |
| `library/sections/hero.html` | Hero Code Block. |
| `library/sections/community-bento.html` | Community bento Code Block. |

## Build order

1. `00-global-setup.md` (fonts, CSS, injection, animations, nav, URLs).
2. `homepage.md`, top to bottom.
3. As you go, log surprises in `DISCOVERIES.md`.
4. When the homepage looks right and the header toggles on scroll, we template the remaining pages from what you learned.
