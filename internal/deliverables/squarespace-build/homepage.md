# Homepage — build guide

Do `00-global-setup.md` first. Then build these sections top to bottom. Each Squarespace **Section** = one band on the page; inside it you add native blocks or one Code Block.

Legend: **[Native]** = built with Squarespace blocks, styled by **Site Styles only** — native blocks do NOT inherit the prototype's card/section CSS (that lives on class names only Code Blocks carry), so a "[Native]" section looks plainer than the prototype by design. **[Code Block]** = paste HTML (from `library/sections/` or lifted from the prototype) that carries the classes, so it matches the prototype exactly; you edit it as HTML.

---

### 1. Header / nav — *global setup*
Already done in setup (native header + Folders, transparent + scroll toggle). Nothing per-page.

---

### 2. Hero — **[Code Block]**
- Add a Section → set width **Full Bleed**, remove its top/bottom padding.
- Set the section's **Animation = None**.
- Add one **Code Block** → paste all of `library/sections/hero.html`.
- The `<img>` is `id="hero-image"`; the footer injection randomizes it. Upload the 5 hero images, set the block's initial `src` to one real CDN URL, and update the array in `footer-injection.html`.
- Buttons link to your Visit and Watch & Listen slugs; the service badges jump to the `#worship` anchor on this page.
- **Gotcha:** if the hero looks inset left/right, the `.sqs-block-code` full-bleed override (in global CSS) isn't applying — confirm the global CSS is pasted.

---

### 3. Welcome (mission / vision / stats) — **[Native]**
A light section with two columns: copy on the left, image on the right.
- Left column (Text blocks): label "Welcome Home" → heading "A Church That *Loves as God Loves*" → intro paragraph → the 1 John 4:16 blockquote → "we've been gathering since 1878" paragraph → **Our Mission / Our Vision** (two short Text blocks) → diocese + interim-rector line (link "search for our next rector" to `/rector-search`).
- A small **stats row**: 1878 Established · 2 Sunday Services · 5 Music Ensembles (three Text blocks or a single one).
- Right column: one main image (church exterior). **Drop the small overlapping accent image** from the prototype — its absolute corner-overlap isn't worth rebuilding natively. One clean image reads fine.
- Style heading with the `section-heading` look (Cormorant); the `<em>` words are burgundy via the global CSS if you use a Code Block, or just italicize + color in the editor.

---

### 4. This Week strip — **[Native]**  ← edited weekly, keep it out of HTML
A dark band with two link cards (bulletin + newsletter). You change these URLs every week, so do NOT make it a Code Block.
- Section background: dark (ink). Add two **Button blocks** or two **Link/Image cards**:
  - "This Sunday's Bulletin" → the weekly bulletin URL (opens in new tab).
  - "Read the Weekly Word" → the newsletter URL.
- Native gives you two plain Button/Link blocks in a dark section — **no glass/blur card look** (Site Styles has no translucency control that produces it). That's fine here: this is a utility strip you edit weekly, not a showcase. If the glass look ever matters, it'd have to become a Code Block (and lose the click-to-edit).
- **Why native:** updating a URL is a text-field edit, not an HTML edit. This is the highest-frequency change on the site.

---

### 5. Seasonal schedule — *skip for now (Saved Section later)*
Disabled currently. When a season needs it (Advent, Holy Week, Easter), build it once and save it as a **Saved Section** to drop in and remove. Not needed for launch.

---

### 6. Worship — **[Native]**  ← times change, keep editable
Burgundy section, two service cards + extras + a "what to expect" box.
- Section background: burgundy gradient (use the `worship`/`.connect` color or a burgundy section background).
- Two cards (native Image + Text): 9:00 AM Family Eucharist, 11:10 AM Traditional Eucharist. Honest expectation: native gives you an Image block + a Text block stacked — **no overlay gold time-badge, no glass background, no hover lift** (those need the `.worship-card` markup, i.e. a Code Block). Decide per your priority: exact card look → Code Block; keep service times click-editable → accept the plainer native version.
- Extras row: Tuesday Compline · Noonday Prayer · Watch Live link.
- "What to expect" box: a light card with 4 short bold-led paragraphs (shape of service, communion, what to wear, children).
- **Why native:** service times and the Watch Live link change; keep them clickable to edit.

---

### 7. Community (bento) — **[Code Block]**
- Add a Section (background cream-tint `#f5f0e8`).
- Add one **Code Block** → paste `library/sections/community-bento.html`.
- Replace the 3 image `src` paths with your Media URLs. The "Find Your Place" button links to `/connect`.
- This is a Code Block because the overlapping-grid + gradient-overlay look isn't reproducible with native blocks, and the content (3 ministry teasers) is stable.

---

### 8. What's Happening — **[Native: Events Collection]**
- Add an **Events Collection** (this also powers the Happenings page).
- On the homepage, add an **Events / Summary block** showing the next 2-3 events.
- Style with the global CSS toward the event-card look. **Honest expectation:** Squarespace's event summary renders its own markup; you can get a clean card grid with the right type and spacing, but the prototype's burgundy "date cap" is not reproducible without DOM hacking. Get it close, don't chase pixels. (Event summary classes like `.summary-item` are Squarespace-internal and can change on platform updates — if styling ever reverts, that's why.)

---

### 9. Clergy — **[Native]**  ← changes at cutover when the rector arrives
- Native image+text grid, 4 people (John, Jim, Mary, Vern). There is **no Squarespace "People"/team block** — the only native option is a manual Image+Text grid (4 blocks per person). It won't have the round gold-bordered photo or hover lift unless it's a Code Block; keep it native anyway (the rector swaps at cutover, so click-to-edit wins here).
- The `.clergy-card` CSS is in global if you want the round gold-bordered photo look on a Code Block, but **keep this native** — the new rector arrives right at cutover, and you'll want to swap a photo + name without touching HTML.
- "Meet our clergy and staff" button → `/clergy`.

---

### 10. Visit teaser — **[Native]**
Two-column: copy + image. "We'll save you a *seat*", the address (525 Lake Concord Road NE), two buttons (Plan Your Visit → `/visit`, Get Directions → Google Maps). Native Image block + Text blocks.

---

### 11. Rector search teaser — **[Native]**
Centered text band: label "Where We Are" → "Our *Rector Search*" → short paragraph → two buttons (About the Search → `/rector-search`, Contact the Committee → mailto). All native Text + Button blocks.

---

### 12. Connect strip — **[Native]**
A burgundy closing CTA with social link cards (Newsletter, Facebook, Instagram, YouTube, Member Portal) and a bottom CTA ("Join Us This Sunday" → `/visit`). The `.connect` / `.connect-link-card` CSS is in global. Native Button/Link blocks in a burgundy section get you there and stay editable.

---

### 13. Footer — *global setup*
Built once in the site Footer section (step 8 of setup).

---

## When the homepage is done
Check the Phase-2 gate before moving on:
1. Tokens/cards render (burgundy + cream + Cormorant headings).
2. Hero is full-bleed and randomizes its image.
3. Header is transparent at the top of the homepage and goes solid on scroll; a subpage shows a solid header.
4. Log every surprise (real selectors, what you changed) in `DISCOVERIES.md`.

Then we template the rest using `build-any-page.md`.
