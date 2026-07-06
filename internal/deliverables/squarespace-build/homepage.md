# Homepage — realistic native build (Fluid Engine, current Squarespace 7.1)

**Approach: build it NATIVE.** No Code Blocks, no Custom CSS. We use Squarespace's real
Fluid Engine the way it works today. The result is a clean, on-brand homepage that's
*close to* the prototype, not a pixel clone. You can add code flourishes later if you want;
first get a page built. (The old Code-Block/Custom-CSS approach fought the editor at every
step and is retired. The prototype at `/final` stays the visual reference for copy, colors,
and layout.)

Steps verified against current Squarespace docs (2026). A few exact labels are marked
"confirm in editor" where the docs didn't spell them out.

---

## Step 0 — Site Styles once (do NOT paste Custom CSS)
Design → **Site Styles**:
- **Fonts:** Headings → *Cormorant Garamond*, Paragraphs → *DM Sans*.
- **Colors:** set the palette to brand — burgundy `#7b2332`, cream `#faf6ee`, gold `#c8a977`, ink `#1a1a1a`.
- **Buttons:** primary = gold fill / dark text (or burgundy fill / white), light corner rounding.

That's your whole global styling. Every section inherits it.

## Fluid Engine basics (how every section works)
- Click **Edit** → each section has an **Add Block** button (top-left) and a drag grid.
- Press **G** to show/hide the grid. Drag blocks anywhere; drag a block's edge to resize.
- **Edit Section** (pencil) has three tabs: **Design** (grid, Fill Screen, Height, Alignment), **Background** (image/color), **Colors** (the section's color theme — this drives text color + overlay).

---

## 1. Hero  *(the one tricky section — here's the exact path)*
1. Use the first section. **Edit Section → Design → Fill Screen ON** (full-height hero). If it's too tall, use **Height → L** instead.
2. **Edit Section → Background → Image → +** → upload your hero photo (`exterior-2026.jpg` or similar).
3. Still in Background: raise **Overlay Opacity** (~40–60%) so text is legible over the photo. The overlay color comes from the section's **Colors** theme — pick a **dark** theme so the overlay darkens and text goes light.
4. **Add Block → Text** → type `All are welcome in this place`, select it, set **Heading 1**.
5. **Add Block → Text** → subtitle: `As the Episcopal branch of the Jesus Movement, and followers of Jesus' Way, we seek to live like him.`
6. **Add Block → Button** → `Join Us Sunday` → link to your Visit page. Add a second Button → `Watch Live` → link to Watch & Listen.
7. Drag the four blocks to center them.

Result: a full-screen hero, brand fonts, photo + dark overlay, headline + buttons. (No gold service-time badges or gradient — those were code-only; skip for now.)

## 2. Welcome (mission / vision)
- **Add Section** (light Colors theme). Two-column feel: put **Text** blocks on the left half, an **Image** block (church exterior) on the right half.
- Left text, in order: a small label `Welcome Home` → Heading `A Church That Loves as God Loves` → intro paragraph → the *1 John 4:16* quote → short **Our Mission** and **Our Vision** blocks → the diocese + interim-rector line (link "search for our next rector" to the Rector Search page).
- Copy comes from `/final` (home) — paste it in, don't retype.

## 3. This Week (bulletin + newsletter)  *(you edit this weekly)*
- **Add Section**, dark Colors theme. Two **Button** blocks: `This Sunday's Bulletin` → the weekly bulletin URL, `Read the Weekly Word` → the newsletter URL. Native on purpose — updating a URL is a click, not code.

## 4. Worship  *(times change — keep native)*
- **Add Section**, burgundy Colors theme. For each service: an **Image** block + a **Text** block (`9:00 AM Family Eucharist`, `11:10 AM Traditional Eucharist`). Add a Text row for extras (Compline, Noonday Prayer, Watch Live) and a short "What to expect" Text block.

## 5. Community
- **Add Section**. Add 3–5 **Image** blocks in a row. On each image block, **Design tab → Overlay ON** + pick a dark tint, then add a small **Text** caption. Approximates the bento (not the overlapping layout — that was code).

## 6. What's Happening (events)
- First create an **Events** collection page (Pages → + → Events). Then on the homepage: **Add Block → Summary** block → source = your Events collection → show the next 2–3. It auto-updates.

## 7. Clergy
- **Add Section**. **Image + Text** per person (John, Jim, Mary, Vern), 4 across. Square photos are fine for now (round gold frames were code). Button `Meet our clergy and staff` → Clergy page.

## 8. Visit teaser
- **Add Section**, two-column: **Text** (`We'll save you a seat`, address `525 Lake Concord Road NE, Concord, NC 28025`) + an **Image**, plus two **Button** blocks (`Plan Your Visit` → Visit page, `Get Directions` → Google Maps URL).

## 9. Rector Search teaser
- **Add Section**, centered **Text** (`Where We Are` / `Our Rector Search` / short paragraph) + two **Button** blocks (About the Search → Rector Search page, Contact the Committee → mailto).

## 10. Connect strip (closing CTA)
- **Add Section**, burgundy Colors theme. A row of **Button**/link blocks (Newsletter, Facebook, Instagram, YouTube, Realm) + a bottom Button `Join Us This Sunday` → Visit page.

## 11. Footer  *(build once, site-wide)*
- Design → **Edit Footer**. Rebuild the 4 columns with native **Text**/link blocks (About · Get Connected · Contact) — the same links as `/final`'s footer. It shows on every page.

---

## When it's done
You have a real, editable homepage. Log anything Squarespace did differently in `DISCOVERIES.md`. Then we template the other pages the same native way — each is a subset of these blocks (Text, Image, Button, Summary), styled by Site Styles.

*If, later, you want a specific prototype flourish back (the exact bento overlap, gold time-badges, round clergy frames), those are the few things a single scoped Code Block can add — but only after the site is built and only where it's worth it. Not now.*
