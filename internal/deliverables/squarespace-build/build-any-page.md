# Build Any Page — the repeating patterns

Once the homepage is built and the global setup is in, every other page is assembled from a small set of repeating patterns. This replaces a separate prose guide per page. (Per-page specifics get added in Phase 3, after the homepage validates what actually works.)

## The patterns

**1. Subpage hero band** *(top of almost every subpage)*
A shorter hero (`~48vh`) with a burgundy overlay over a photo, a label, an H1 with an italic gold emphasis word, and a subtitle.
- Native: a Section with a background image + the section's built-in color overlay + Text blocks. Style with the `.page-hero*` classes if you use a Code Block; native gets close.
- The `.page-hero` CSS is already in the global stylesheet.

**2. Section header band**
Centered label + heading + subtitle that opens a content section. Three Text blocks: `section-label` style, `section-heading` (Cormorant, italic-burgundy emphasis), `section-sub`.

**3. Card grid** *(the workhorse)*
A centered grid of cards. The global CSS already has five card flavors, pick by purpose:
- `involved-card` — white card, gold top-border (ways to get involved).
- `care-card` — cream card, icon + title + text (pastoral care, info).
- `connect-channel-card` — white card, icon, title + sub (linked channels).
- `info-card-light` — white card, round icon housing (feature lists).
- `clergy-card` — round photo grid (people).
Native: Squarespace card/summary blocks styled toward these. Code Block: paste the markup using these classes when you want the exact look on a stable page.

**4. Closing CTA strip** *(bottom of most pages)*
The burgundy `.connect` band: heading, sub, a row of `connect-link-card`s, a bottom button. Reused site-wide. Native Button/Link blocks in a burgundy section.

**5. Collections** *(repeating content — not hand-built pages)*
- **Arboretum trees** → Blog Collection, slug `arboretum`, preserve `/arboretum/[tree]` URLs (QR codes).
- **Happenings** → Events Collection.
- **Sermons** → Blog Collection `sermons` + native YouTube blocks.
- **Clergy/staff** → NOT a collection (only 4-6 people) — a static native grid.

## How to build a new page
1. Subpage hero band (pattern 1).
2. One or more content sections: section header (2) + card grid (3) or native text/image.
3. Closing CTA strip (4).
4. If the page is repeating content, it's a Collection (5), not a hand-built page.

## Remaining pages (Phase 3)
visit · about · connect (+ episcopalian, life-events, pastoral-care) · serve · giving · happenings · learn · history · clergy · arboretum · prayer-requests · rector-search · watch-and-listen.

Each will get a short section list mapping to the patterns above, written after the homepage build confirms the real Squarespace behavior.
