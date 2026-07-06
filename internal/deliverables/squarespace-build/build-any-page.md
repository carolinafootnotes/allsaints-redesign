# Build Any Page — the repeating patterns

Once the homepage is built and the global setup is in, every other page is assembled from a small set of repeating patterns. This replaces a separate prose guide per page. (Per-page specifics get added in Phase 3, after the homepage validates what actually works.)

> **Every Code Block's HTML must be wrapped in `<div class="as-content"> … </div>`.** The global CSS is scoped to `.as-content` so it can't leak onto Squarespace's editor (an unscoped earlier version made pages uneditable). No wrapper → the card styles won't apply.

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
**There is no native block that inherits these card classes** (verified — Squarespace won't let you add a class to a Text/Image block). Two real choices per card grid:
- **Code Block** — paste the prototype's card markup (it carries the classes, so it gets the exact look). Editing means touching HTML. Best for stable content.
- **Native grid/summary** — Squarespace's own layout, styled only by Site Styles typography/color. Editable by clicking, but it will *not* look like the prototype's cards (no gold top-border, no icon housing, no hover lift).
There is no middle option where a native block "inherits `.involved-card`." Pick per page: exact-look-Code-Block vs editable-plainer-native.

**4. Closing CTA strip** *(bottom of most pages)*
The burgundy `.connect` band: heading, sub, a row of `connect-link-card`s, a bottom button. Reused site-wide. Native Button/Link blocks in a burgundy section.

**5. Collections** *(repeating content — not hand-built pages)*
7.1 allows **multiple, independent blog collections**, each with its own slug + URL namespace (posts don't mix). So "blog collection" is a content *type* we reuse several times — using one as a memorial directory doesn't use up "the blog."
- **Arboretum trees** → Blog Collection, slug `arboretum`, preserve `/arboretum/[tree]` URLs (QR codes). Used as a directory (hide date/author), not a chronological blog.
- **Weekly blog / news** (if the parish wants one) → a **separate** Blog Collection at its own slug (e.g. `/blog` or `/news`). Independent of the arboretum.
- **Sermons** → a separate Blog Collection `sermons` + native YouTube blocks.
- **Happenings** → Events Collection.
- **Clergy/staff** → NOT a collection (only 4-6 people) — a static native grid.

## How to build a new page
1. Subpage hero band (pattern 1).
2. One or more content sections: section header (2) + card grid (3) or native text/image.
3. Closing CTA strip (4).
4. If the page is repeating content, it's a Collection (5), not a hand-built page.

## Remaining pages (Phase 3) — via build packets
visit · about · connect (+ episcopalian, life-events, pastoral-care) · serve · giving · happenings · learn · history · clergy · arboretum · prayer-requests · rector-search · watch-and-listen.

Each gets a **build packet**: the approved copy in paste-ready form + a section→block map + links + images, so the page is follow-the-checklist-and-paste and nothing is retyped. Format: `packet-TEMPLATE.md`. Worked example (built first, exercises every card grid): `packet-connect.md`. The arboretum is not a packet — it bulk-imports (`arboretum-import.md`).

Packets for the other pages get written after the homepage build confirms real Squarespace behavior (logged in `DISCOVERIES.md`), so the maps reflect what actually renders.
