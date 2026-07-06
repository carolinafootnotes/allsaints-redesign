# Squarespace Build Kit — All Saints'

This is the hands-on kit for rebuilding the approved `/final/` prototype in Squarespace 7.1. It sits on top of the architecture docs (don't re-read those to build; read this):

- Architecture / why: `../component-reference.md`, `../squarespace-rebuild-readiness.md`
- IA / nav / URLs: `../ia-restructure-plan-jun2026.md`, `../session-handoff-2026-06-10.md`
- **What can/can't be automated: `AUTOMATION-FINDINGS.md`** (verified July 2026 — no API/MCP builds pages; the visual build is manual; three levers cut the labor). Read it once so we don't re-chase a Squarespace content API.

## How we're building it

**Native-hybrid.** Paste the global CSS once. Then most sections are *native Squarespace blocks* styled by that CSS, so you can edit them by clicking. Only two homepage sections are raw-HTML **Code Blocks**: the **hero** and the **community bento** (they use effects native blocks can't do, and they rarely change). Everything that changes often, clergy, this-week links, worship times, events, stays native.

**Build the homepage first, then scale.** Don't expect the other pages' guides to exist yet. We build the homepage live, write down what Squarespace actually does in `DISCOVERIES.md`, fix anything that missed, *then* template the rest. No guessing 17 pages ahead of reality.

## The 3-layer model (how the pieces fit)

1. **Global Custom CSS** (`library/custom-css-global.css`) → Design → Custom CSS. Tokens, buttons, cards, footer. Pasted once, inherited everywhere.
2. **Global behavior** (`library/footer-injection.html` + `head-injection.html`) → Code Injection. Fonts, the sticky-header scroll toggle, the random hero image. That's all the JS there is.
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
| `library/head-injection.html` | Google Fonts (Cormorant Garamond + DM Sans). |
| `library/footer-injection.html` | Header scroll toggle + random hero (the only JS). |
| `library/sections/hero.html` | Hero Code Block. |
| `library/sections/community-bento.html` | Community bento Code Block. |

## Build order

1. `00-global-setup.md` (fonts, CSS, injection, animations, nav, URLs).
2. `homepage.md`, top to bottom.
3. As you go, log surprises in `DISCOVERIES.md`.
4. When the homepage looks right and the header toggles on scroll, we template the remaining pages from what you learned.
