# Review-group feedback incorporation — June 2026

Source: "Update Requested All Saints' website" thread (John Johanssen 6/11, Brian Sapp-Moore 6/15) + Brian's "Bulletins and the new website" note (6/2), after Nate shared the preview on 6/10.

## Done (deployed 6/19)

**From John (6/11):**
- ~~Update giving "2023" → 2025~~ — **already addressed**: the giving page has no hardcoded year; it reads "an estimate of giving for the year ahead." Year-agnostic, better than a hardcoded 2025. (Confirm with John this is the spot he meant.)
- ~~Add Erin's picture to the staff page~~ — **already done**: `/assets/staff/erin-vanasse-web.jpg` is live on the clergy page.

**From Brian (6/15):**
- Visit > Your First Sunday > The Service: rewrote to be true for both services ("Whether on a screen or in a bulletin…"; dropped "BCP is in the pew"; added "The Book of Common Prayer and the Holy Bible form the backbone of our way of worship"). Applied to the matching home "what to expect" box too, for consistency.
- Visit > Your First Visit: "Coffee after the 11:10 service" → "Coffee after each service."
- Accessibility: → "Large print bulletins are always available at the 11:10 AM Service."
- Noonday Prayer (paused during interim) removed everywhere it read as a current offering: home worship extras, visit worship extras, happenings Weekly Rhythms, and watch-and-listen (meta, hero, schedule card, sermon-archive line). Compline kept.
- Connect > Pastoral Care: deleted "Koinonia Small Groups" card.
- Connect > Finding Your People: replaced the Koinonia card with a Music Ministry card ("During the school year… Come together to perfect praises to God in the beauty of holiness").
- Connect > Fellowship & Hospitality: removed the passing "Koinonia small groups" mention (Nate confirmed 6/19: remove Koinonia site-wide). Koinonia now appears nowhere on the site.
- Serve > In the Church: added a Music Ministry card.

## Done (deployed 6/19, photo pass)

- **9 AM Family Eucharist photo (Brian):** swapped to `selected/services_9am.jpg` (Joy Marie's Parish Hall shot with projector screen + congregation). Applied to both home and visit worship cards.
- **Joy Marie's photos (6/11):** 29 photos batch-graded (ImageMagick: CLAHE local contrast, sigmoidal-contrast, temperature-aware warmth). Full variety pass replaced all recycled images across 12 pages. Every page hero is now unique. Remaining 10 unplaced photos available for arboretum, future use.
- **Photo variety pass:** broke up 3 over-recycled images (`altar-blessing-2026`, `exterior-2026`, `fellowship-formation-2026`) with 16 targeted swaps across 10 files. See commit for the full mapping.

## Pending — needs an asset or a decision

- **Baptism photo (John):** the current baptism photo shows Nancy and should be replaced (also per the no-Nancy rule). **Could not locate** a baptism photo in the current build by filename/alt. Need John to point to the page/photo he means. Replacement likely from Joy Marie. **Blocked on identification + asset.**
- **Joy Marie's Tour de Saints stats (6/11):** updated stats (13-year dollars raised/donated, rider count). Not yet received.

## Squarespace-build notes (capture, not prototype changes)

- **Prayer Requests routing (Brian):** the prototype page offers email/call now with "form coming soon." When the real form is built in Squarespace, notifications must go to: head of Prayer Chain, the rector, announcements@allsaintsconcord.org, admin@allsaintsconcord.org. Preserve the `/prayer-requests/` URL.
- **Bulletins (Brian 6/2):** current + archive access already link out to the bulletins page (home "This Sunday's Bulletin"; happenings "Worship Bulletins" archive card). At cutover, point these at the Squarespace bulletins location; Brian can regenerate the pew QR codes for a new URL.
