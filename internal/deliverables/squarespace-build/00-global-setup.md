# Global Setup (one-time)

Do these in order, once, before building any page. Every page depends on them.

---

## 1. Fonts → Site Styles (native — no injection needed)

Site Styles → **Fonts**. Set Heading → **Cormorant Garamond**, Body → **DM Sans**. Both are in Squarespace's native picker (it includes the full Google Fonts library), and assigning them makes Squarespace load them so the CSS tokens resolve. That's it.

No font code injection needed — both fonts are native. (If a specific weight/italic our CSS uses ever fails to render, add a single Google Fonts `<link>` for it in Header Code Injection, but you shouldn't need to.)

---

## 2. Global stylesheet → Custom CSS

Design → **Custom CSS**. Paste all of `library/custom-css-global.css`.

This is the backbone: color tokens, type scale, buttons, all the card components, the worship/bento styles, footer, header transparent/solid states. Paste it **before** building pages so blocks inherit it. Don't strip anything (especially not the `:root` block).

---

## 3. Behavior → Footer injection

Settings → Advanced → Code Injection → **Footer**. Paste all of `library/footer-injection.html`.

Two behaviors: the header goes transparent→solid on scroll (homepage only), and the hero image is randomized on load. **Two edits you'll make later** are flagged in CAPS comments in that file:
- confirm the `<header>` selector (see step 7 / DISCOVERIES),
- after uploading hero images, swap the 5 paths for their Squarespace CDN URLs.

---

## 4. Animations → Site Styles

Site Styles → **Animations** → set a subtle **Fade**. This replaces the prototype's scroll-reveal with zero code, and it applies to native blocks automatically.

One exception: set the **hero section's** animation to **None** (in that section's settings), or the whole 100vh hero fades in on every page load, which looks clunky. Code Blocks animate as one unit anyway, so don't expect the staggered reveal inside them — that's intentionally gone.

---

## 5. Navigation → native header + Folders

**First, the home page (not a nav item).** Create/keep a **Home** page, build it from `homepage.md`, then set it as the homepage: Pages panel → hover the page → "..." → **Set as Homepage** (it gets a house icon; its URL becomes `/`). The site **logo links to it automatically**, so Home is *not* one of the top-nav items. Move the Home page to the **Not Linked** section so it doesn't show as a nav link (it stays the homepage and stays at `/`). If Squarespace insists it live in Main Navigation, leave it — the logo covers it either way.

Then build the **flat top nav**. Per the locked IA:

- Top-level items: **Visit · About · Connect · Serve · Rector Search · Give**
- **About** and **Connect** are native **Folders**. The first item inside a folder is its overview/landing page (Squarespace folders aren't clickable themselves).
  - About folder: About All Saints' · Clergy & Staff · Our History · Formation & Learning · Memorial Arboretum
  - Connect folder: Ways to Connect · New to the Episcopal Church · Life Events · Pastoral Care
- **Give** points to `/giving`.

We are NOT recreating the prototype's custom dropdown / logo-swap header. Native header + Folders replaces it. Style the logo and nav font/color in Site Styles.

---

## 6. URL Mappings → preserve printed/QR links

Settings → Advanced → **URL Mappings**. Add the 301s from `../session-handoff-2026-06-10.md` and `memory/project_preserved_urls.md`. Critical ones:

- `/arboretum/` and `/arboretum/[tree]` — physical QR codes depend on these exact slugs.
- Prayer-requests path.
- `/connect/*` child slugs flatten (Squarespace folders flatten the path) — map old → new.

---

## 7. Header style → transparent + confirm the selector

Site Styles → Header → enable the **transparent header** option (so it sits over the hero). The CSS in step 2 + the script in step 3 handle the solid-on-scroll look.

Then **confirm the header selector**: open the published homepage, inspect the header element. It's usually `<header id="header">`. If it's something else, note it in `DISCOVERIES.md` and update the selector in `footer-injection.html` and the `header#header` rules in `custom-css-global.css`.

---

## 8. Footer → build once (global chrome)

The footer is the same on every page. Two ways:

- **Recommended (faithful, low-maintenance):** in the site Footer section, add one **Code Block** with the footer markup. It's set-once global chrome that rarely changes, so the "it's HTML" cost is near zero, and it's byte-identical site-wide. The `.site-footer / .footer-*` CSS is already in the global stylesheet. (Footer markup can be lifted from `worker/public/final/index.html`; we'll finalize it during the homepage build.)
- **Alternative (fully editable):** rebuild the 4 columns with native blocks and style via Site Styles. Won't match exactly; edit by clicking.

Pick one during the homepage build and log it in DISCOVERIES.

---

When 1-8 are done, go to `homepage.md`.
