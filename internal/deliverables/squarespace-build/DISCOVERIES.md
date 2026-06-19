# Build Discoveries — fill in as you build

Log what Squarespace *actually* does here while building the homepage. These notes correct the kit and feed the Phase-3 page guides. Don't trust an assumption you haven't seen render.

## Header selector
- The real header element on this template is: `__________` (expected `<header id="header">`).
- Did `querySelector('header')` in footer-injection.html grab the right element? Y / N → fix:
- Did `header#header.transparent` / `.solid` win the specificity fight vs Squarespace defaults? Y / N → notes:

## Code Blocks
- Did the hero Code Block inherit the global CSS (tokens, buttons)? Y / N
- Did `.sqs-block-code .sqs-block-content { padding: 0 }` make the hero full-bleed? Y / N
- Any Code Block sanitization / wrapping surprises:

## Animations
- Native Fade applied to native blocks as expected? Y / N
- Hero section set to Animation = None? Y / N
- Behavior inside Code Blocks (expected: whole block fades as one unit):

## Events Collection
- Actual summary-block output classes seen (e.g. `.summary-item`, `.summary-metadata-item--date`):
- How close did CSS get to the event-card look? notes:

## Fonts
- Cormorant Garamond rendering from the head injection? Y / N
- DM Sans set natively or via token? notes:

## Footer
- Built as Code Block or native blocks? choice + why:

## Images
- Hero CDN URLs pasted into footer-injection.html array? Y / N
- Any broken-image (404) issues:

## Anything else that surprised you
-
