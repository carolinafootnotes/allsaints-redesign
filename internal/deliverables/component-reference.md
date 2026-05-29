---
name: Component & section reference + componentization strategy
status: living reference (prototype + Squarespace build)
date: 2026-05-29
audience: Nate (building, editing, and rebuilding in Squarespace)
---

# Component & section reference

How the All Saints' site is assembled, what the reusable pieces are, and how each maps to Squarespace 7.1 so building, editing, updating, and creating new pages is fast and safe.

## How the system is organized

Three layers, the same on the prototype and (intentionally) in Squarespace:

| Layer | Prototype | Squarespace 7.1 |
|---|---|---|
| Global styles (tokens + shared system + all card styles) | `/assets/site.css` | Settings → Advanced → Code Injection → Header (or Design → Custom CSS) |
| Global behavior | `/assets/site.js` (deferred) | Settings → Advanced → Code Injection → Footer |
| Page-unique sections | small inline `<style>` per page | per-page Code Injection / Custom CSS |

**The one rule that prevents the most pain:** paste `site.css` into Custom CSS *before* building a single page in Squarespace. Every block and section added afterward inherits the styles. Building pages first means retroactively styling hundreds of blocks. (Strip the `:root` token block when pasting; Squarespace has its own style editor for some of it, but keeping the tokens is fine and simplest.)

A page like `connect/life-events` now has **zero inline CSS** and renders entirely from the global layer. That is the target state.

---

## Section & component catalog

For each: where it is used, the markup skeleton, and the classes/tokens it relies on. Everything not marked "page-unique" lives in `site.css`.

### Global chrome (every page)
- **Header / nav** — `.site-header` (`.transparent`/`.solid` toggled by `site.js` on scroll), `.header-inner`, `.header-brand` (`.logo-full` + `.logo-horizontal` swap), `.nav-links` + `.nav-cta`, `.hamburger`, `.mobile-nav`. Home overrides header/logo height (145px/125px) inline; subpages use the 112px/92px default. `body.page-subpage` forces the always-solid header.
- **Footer** — `.site-footer` → `.footer-inner` → `.footer-top` (2fr/1fr/1fr/1fr) with `.footer-brand` + three `.footer-col`, then `.footer-bottom` + `.footer-social`. Identical on every page.
- **Skip link, focus states, scroll-reveal** — `.skip-link`, `:focus-visible` outline, `.reveal` + `.reveal-delay-1..5` (driven by the IntersectionObserver in `site.js`, with a `prefers-reduced-motion` guard).
- **Buttons** — `.btn`, `.btn-primary` (gold), `.btn-outline` (white-on-dark by default; light-background pages override the outline color inline).

### Heroes
- **Subpage hero** (`.page-hero`, 12 pages): `.page-hero-bg` img + `.page-hero-overlay` + `.page-hero-content` (`.page-hero-label` badge, `h1` with `<em>` accent, `.page-hero-sub`). Variant `.page-hero.utility` (40vh) for giving/prayer-requests; a few pages bump to 55vh inline.
- **Home hero** (`.hero`, home only): full-bleed, `.hero-overlay` + `.hero-overlay-radial`, `.hero-content`, `.hero-services` pills, `.hero-ctas`, animated `.hero-scroll-indicator`. Page-specific JS randomizes the hero image.

### The section pattern (used 66–72×)
```html
<section class="section-pad" id="...">
  <div class="container">
    <div style="text-align:center;">
      <div class="section-label reveal">Eyebrow</div>
      <h2 class="section-heading reveal reveal-delay-1">Heading <em>accent</em></h2>
      <p class="section-sub reveal reveal-delay-2">Intro.</p>
    </div>
    <!-- content (usually a card grid) -->
  </div>
</section>
```
On dark backgrounds (`.connect`, `.worship`) the label goes gold and the heading white.

### Closing CTA strip (`.connect`, 9–13 pages)
Burgundy band with `.connect-cta-heading` + sub + centered `.hero-ctas` buttons. The single most-reused section after the header pattern.

### Tiered outreach block (serve + giving)
Three sections `#in-the-church` / `#in-the-community` / `#in-the-world`, each = section header band + full-width image + `.involved-grid` of cards + a button. Structurally identical between the two pages.

### Other section patterns
- **Card-grid section** — a section header band + one of the card grids below.
- **Bento/photo grid** (`.community-bento` + `.bento-card`, connect) — photo tiles with overlay text.
- **Rhythm grid** (`.rhythms-grid` + `.rhythm-card`, happenings) — schedule cards with day/time.
- **This-week strip** (`.this-week` + `.this-week-card`, home/happenings) — frosted cards on a dark band.
- **Stats row** (`.stats-row` + `.stat-item`, home).
- **Timelines** — horizontal step timeline (`.timeline`/`.timeline-step`, home/visit) and the vertical alternating history timeline (`.timeline-wrap`/`.t-entry`, history).
- **Serve jump-nav** (`.jump-nav`, serve only) — sticky in-page nav; page-specific JS. Planned to become native Squarespace anchor links at rebuild.
- **Prayer form** (`.preview-form`, prayer-requests) — currently a disabled preview; becomes a Squarespace Form Block when live.

---

## The card system

All recurring card styles now live once in `site.css` (a CARD COMPONENTS section). Counts are markup instances:

| Class | Instances | Pages | Look |
|---|---|---|---|
| `involved-card` | 55 | 6 | white, gold top accent, no icon |
| `connect-channel-card` | 23 | 4–5 | white, icon, hover gold border, linked |
| `care-card` | 17 | 3 | warm-cream, icon |
| `info-card-light` | 15 | 2 | white, icon-in-circle, shadow |

These four share one structural contract (background / border / 14px radius / padding / hover) and differ only by background, accent, and icon. **The deferred win:** at the Squarespace rebuild, collapse them into one base `.card` + modifiers:
- `.card` (base) · `.card--top-accent` (involved) · `.card--warm` (care) · `.card--linked` (connect-channel) · keep `.icon-housing` for info-card.

The rename touches 95+ markup instances, so it is correctly deferred to the rebuild (define `.card` once in Custom CSS, rename as pages are built). Doing it in the throwaway prototype is cost without payoff. **Stay distinct** (genuinely different): `worship-card`, `bento-card`, `event-card`, `rhythm-card`, `formation-card`, `this-week-card`, `give-cta-card`, `clergy-card`, `stat-item`.

---

## Squarespace 7.1 componentization strategy

The most important mechanic: **Saved Sections are paste-copies, not live components.** Dropping a saved section onto a new page makes an independent copy; editing it does not propagate to other instances. So Saved Sections save you *building*, not *updating*. Anything that must change in one place for the whole site has to be either CSS (global) or a Collection.

### Saved Sections (build once, drop in, edit in place), ranked by leverage
1. **Closing CTA strip** — on the most pages; highest reuse.
2. **Subpage hero** — every new page needs one.
3. **Section header band** — pre-loads the right fonts/spacing.
4. **Tiered outreach block** — save the 3-section group.
5. **Card-grid section** — one saved version per column count (3-up, 4-up).

### Page templates
Squarespace 7.1 has no true template pages — **Duplicate is the mechanism.** Build one reference subpage (hero + placeholder section + closing CTA), name it `-- SUBPAGE TEMPLATE (do not publish)`, and duplicate it for each new page. With the saved sections in place, a new page is ~10 minutes (swap hero image + text, add/remove content sections, update CTA links) instead of ~45.

### Collections (content edited as list items, not code)
| Content | Approach | Notes |
|---|---|---|
| Arboretum (38 trees) | Blog Collection `arboretum`; index = Summary Block | Slug `arboretum` preserves QR-code URLs `/arboretum/[tree]`. No native fields for species/grove — put them as a labeled block at the top of the body. Decide first: find-by-name (fine) vs browse/filter-by-grove (not native). |
| Happenings events | Events Collection | Style the native event block via Custom CSS to approximate the card. Don't keep static HTML cards (the old WordPress URLs 404 after cutover). |
| Sermons | Blog Collection `sermons`; index = Summary Block | Title/date/preacher/scripture + native YouTube block. Auto-current as posts are added. |
| Clergy/staff bios | Static Fluid Engine grid, NOT a collection | Only 4–6 people; a collection adds unwanted `/staff/name` detail pages. Duplicate a cell to add someone. |

### Reusable code-injection snippets (the few non-native bits)
- **All CSS** → Custom CSS once (the `site.css` contents). Never re-pasted per page.
- **Reveal animations** → prefer native Fluid Engine entrance animations (zero maintenance); only inject `site.js`'s observer if the staggered delays matter.
- **Header scroll toggle + smooth-scroll** → `site.js` in Footer injection once; retarget the header selector at build time.
- **Home hero randomizer** → home page header injection (10 lines, set once).
- **Serve jump-nav** → rebuild as static sticky CSS + native anchor links; only inject the active-highlight JS on that one page if wanted.

### Cards in Squarespace
Define the card styles once in Custom CSS, then add a CSS class name to each block via the editor's "Add CSS class" field. One definition styles every instance. Collapse to three card looks (plain, icon-lead, photo-overlay); handle the white-vs-cream difference with section background rather than a card variant.

---

## Quick playbooks

**Add a new page:** duplicate the subpage template → swap hero image + the 3 hero text strings → add/remove content sections (saved sections) → update the closing CTA buttons.

**Change a color or font site-wide:** edit the token in `:root` (prototype `site.css` / Squarespace Custom CSS). One edit, whole site follows.

**Edit the closing CTA wording everywhere (e.g. after the rector search ends):** in Squarespace this means visiting each page that has it (saved sections don't propagate). Keep the section simple so each edit is 30 seconds. This is the one unavoidable multi-page edit.

**Add a tree / sermon / event:** create a Collection item in the editor. No code.

---

## Status of the componentization work (2026-05-29)
- Global `site.css` (tokens, 8-step type scale, shared system, card components) + `site.js` (shared behavior). Done.
- All 18 public pages on the shared layer; two connect subpages now have zero inline CSS. Done.
- Recurring card CSS consolidated into `site.css` (one definition, ~10 per-page duplicates removed). Done.
- Deferred to rebuild: the `.card` + modifier rename; building the Saved Sections / Collections in Squarespace; the broader pre-go-live checklist in `squarespace-rebuild-readiness.md`.
