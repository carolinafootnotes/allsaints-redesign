# Global Setup (one-time)

Do these in order, once, before building any page. Every page depends on them.

*All menu paths below verified against current Squarespace docs (2026). Where a step can't be confirmed without the live editor, it says so.*

---

## 1. Fonts → Site Styles

Design → **Site Styles → Fonts**. The categories are **Headings** (with H1–H4 sub-controls), **Paragraphs**, **Buttons**, **Miscellaneous**. Set Headings → **Cormorant Garamond**, Paragraphs → **DM Sans**.

Squarespace's picker is a **curated** set (~600 Google Fonts + ~1,000 Adobe Fonts), *not* the full Google catalog. Both fonts are common and almost certainly present, but search the picker and **confirm each appears** before relying on it. Assigning them makes Squarespace load them so the CSS tokens resolve. No font code injection needed.

---

## 2. Global stylesheet → Custom CSS

Design → **Custom CSS**. Paste all of `library/custom-css-global.css`.

This is the backbone: color tokens, type scale, buttons, all the card components, the worship/bento styles, footer, header transparent/solid states. Paste it **before** building pages. **Important (see `homepage.md`):** these styles are keyed to the prototype's **class names**, so they only take effect inside **Code Blocks** that carry those classes — native Squarespace blocks (Text/Image/Button) will *not* inherit the card looks, only Site Styles typography/color. Don't strip anything (especially the `:root` block).

---

## 3. Behavior → Code Injection (Footer)

Settings → **Website Tools** → **Code Injection** → **Footer**. Paste all of `library/footer-injection.html`. (Code Injection lives under **Website Tools** now, not the old "Advanced" menu. It fires before `</body>` on every page.)

Two behaviors: the header goes transparent→solid on scroll (homepage only), and the hero image is randomized on load. **Two edits you'll make later** are flagged in CAPS comments in that file:
- confirm the `<header>` selector (see step 7 / DISCOVERIES),
- after uploading hero images, swap the 5 paths for their Squarespace CDN URLs.

---

## 4. Animations → Site Styles

Design → Site Styles → **Animations**. Options are None / Fade / Scale / Slide / Clip / Flex, plus a speed control. Set a subtle **Fade** (Medium). This replaces the prototype's scroll-reveal with zero code and applies to native blocks automatically.

One exception: turn the **hero's** animation to **None** — but that override lives on the **block's own Animations tab** (open the hero Code Block → its settings gear → **Animations** → None), *not* in the section's settings. Otherwise the whole 100vh hero fades in on every load, which looks clunky. Code Blocks animate as one unit, so don't expect a staggered reveal inside them.

---

## 5. Navigation → native header + Dropdowns

*Verified against Squarespace's current docs (2026). The nav-grouping feature is a **Dropdown** (Squarespace retired the old "Folder" term). Pages panel → **+** → **Dropdown**.*

**First, the home page (not a nav item).** Create/keep a **Home** page, build it from `homepage.md`, then set it as the homepage: Pages panel → hover the page → "..." → **Set as Homepage** (it gets a house icon; its URL becomes `/`). The site **logo links to it automatically**, so Home is *not* one of the top-nav items. Move the Home page to the **Not Linked** section so it doesn't show as a nav link (it stays the homepage and stays at `/`). If Squarespace insists it live in Main Navigation, leave it — the logo covers it either way.

**Top nav — six items, two of them dropdowns:** Visit · About · Connect · Serve · Rector Search · Give
- Single pages (Visit, Serve, Rector Search, Give): add via Pages panel → **+** (Give → the `/giving` page, or a **Link** to it).
- **About** and **Connect** are **Dropdowns**: Pages panel → **+** → **Dropdown** → enter the title. Then drag existing pages into the space under the dropdown, or click **Add Page** under it. Reorder by dragging within.
  - About dropdown: **About All Saints'** · Clergy & Staff · Our History · Formation & Learning · Memorial Arboretum
  - Connect dropdown: **Ways to Connect** · New to the Episcopal Church · Life Events · Pastoral Care
- **The dropdown title is a container, not a link** — hovering opens the menu; clicking "About" does not navigate. So the **first item is the hub/landing page** (bold above: "About All Saints'", "Ways to Connect"). Child pages in the dropdown are directly clickable (one-click access to every subpage).
  - *Optional:* to make the "About"/"Connect" label itself clickable to its hub, there's a current Code Injection + CSS workaround (route the title to the first item, hide that item on desktop). Add only if you want it; not required.

We are NOT recreating the prototype's custom-JS dropdown / logo-swap header — Squarespace's native Dropdowns replace it. Style the logo and nav font/color in Site Styles.

> Note: `ia-restructure-plan-jun2026.md` and the project CLAUDE.md describe a "flat, no dropdowns" nav. That predates this build decision and is now superseded by native Dropdowns (which match the prototype's About/Connect menus). Reconcile those two docs when you get a chance.

---

## 6. URL Mappings → preserve printed/QR links

Settings → **Developer Tools** → **URL Mappings** (not the old "Advanced" menu).

**The full redirect + preserved-slug list lives in one file: `url-mappings.md`.** Open it, set the exact-slug pages (section A), and paste the 301 block (section B). That's the single source of truth — don't hunt across the memory file or session-handoff for redirects anymore.

---

## 7. Header style → Adaptive (transparent) + confirm the selector

Make the header transparent over the hero: **Edit** (top-left) → hover the header → **Edit Site Header** → **Edit Design** → **Color** tab → **Background style** → **Adaptive**. (There is no "Site Styles → Header → transparent" toggle; the option is called **Adaptive**.)

**Important — Adaptive is not scroll-reactive.** It only makes the header transparent so the first section shows through at the top of the page. It does **not** turn the header solid on scroll (Squarespace documents no such behavior). So the step-3 script + step-2 CSS are what actually produce the solid cream/shadow header on scroll, and the solid header on subpages. Expect to need them; don't count on Adaptive.

Then **confirm the header selector**: open the published homepage and inspect the `<header>` element (Squarespace's real header class/id isn't published and varies by template, so this must be checked in the editor). Note it in `DISCOVERIES.md` and update the selector in `footer-injection.html` and the `header#header` rules in `custom-css-global.css`.

---

## 8. Footer → build once (global chrome)

The footer is the same on every page. Two ways:

- **Code Block (faithful):** in the site Footer, add one **Code Block** with the footer markup so it's byte-identical site-wide and inherits `.site-footer / .footer-*` from the global CSS. **VERIFY IN EDITOR:** confirm the Footer's block menu actually offers a **Code** block (Design → **Edit Site Footer**) — this isn't documented, so test it before assuming. Footer markup lifts from `worker/public/final/index.html`.
- **Native 4-column (confirmed-safe default):** rebuild the columns with native blocks, styled via Site Styles. Won't match the prototype exactly, but it's fully editable and known to work. Use this if the Code Block option doesn't pan out.

Pick one during the homepage build and log it in DISCOVERIES.

---

When 1-8 are done, go to `homepage.md`.
