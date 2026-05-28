# D1–D4 — Build operations

Four operational documents bundled together. These are execution checklists for the build and launch phase — not vestry-facing materials.

Contents:
- **D1** — Content migration checklist
- **D2** — Integrations test plan
- **D3** — Launch checklist
- **D4** — Post-launch maintenance guide

---

# D1 — Content migration checklist

**Purpose:** Ordered list of what gets created in Squarespace, in what order, with the source of truth for each.
**Expected timeline:** Late May through end of June (~4 weeks).

---

## Pre-build prep (1 week)

- [ ] Squarespace Business plan purchased; nonprofit discount code applied at checkout
- [ ] Template selected (see D1 Appendix: template recommendation)
- [ ] Brand assets loaded: logo SVG, favicon, color palette (burgundy #7b2332, cream #faf8f4, gold #c9a84c), typography (Cormorant Garamond + DM Sans)
- [ ] Images bulk-uploaded from `/assets/` to Squarespace asset library
- [ ] Google Workspace or workspace email linked (professional email included with Business plan)
- [ ] Analytics baseline captured (current site traffic from Realm or any existing data, for comparison)

---

## Pages to build, in build order

Ordered to create the most visitor-valuable pages first and to surface integration issues early.

### Week 1 — Core visitor path

- [ ] **Homepage (`/`)** — skeleton first, content after
  - Hero (image + headline + CTA)
  - Welcome section
  - Service times block
  - Four pillars teaser
  - Events teaser (3 cards)
  - Rector search notice
  - Weekly Word signup
  - Footer

- [ ] **Visit (`/visit`)**
  - Source: B2 page structure; new copy
  - Key content: service times, what to expect, kids, parking, directions, welcome from Fr. John
  - Needs Google Maps embed

- [ ] **Worship (`/worship`)**
  - Source: rewrite of `/worship/` + `/service-hours/`
  - Key content: two services explained, weekday prayer, watch live, this week's bulletin, music ministry, worship ministries
  - Needs Facebook + YouTube embed for livestream
  - Needs bulletin PDF link (update-weekly pattern)

### Week 2 — Supporting pages

- [ ] **Community (`/community`)**
  - Source: consolidation of Learn + Serve + Fellowship + Prayer + Pastoral Care + Stephen Ministry
  - Key content: formation, fellowship, serve, pastoral care & prayer, ministry contacts
  - Longest page on the site; largest content consolidation
  - Sub-page: `/community/stephen-ministry` (if kept separate)

- [ ] **About (`/about`)**
  - Sections: our story, what is an Episcopal church, clergy, staff, vestry, rector search
  - Sub-pages: `/about/clergy`, `/about/staff`, `/about/vestry`, `/about/rector-search`

- [ ] **News & Events (`/news`)**
  - Source: B3 Events & Sign-ups content
  - Key content: upcoming events cards, Weekly Word archive + subscribe, sermons link-out, bulletins archive, annual report

### Week 3 — Detail and polish

- [ ] **Clergy sub-page** (`/about/clergy`) — 4 bios, photos
- [ ] **Staff sub-page** (`/about/staff`) — 5 bios, photos; **write the two missing bios for Erin Vanasse and Ruth Brown**
- [ ] **Vestry sub-page** (`/about/vestry`) — names + one-line role descriptions; drop "liaison" language
- [ ] **Rector Search sub-page** (`/about/rector-search`) — full content per B3
- [ ] **Lockhart CDC page** (`/lockhart-cdc`) — one paragraph, link out
- [ ] **404 page** — custom copy (gentle, with search and link to home)

### Week 4 — Integrations, testing, polish

- [ ] OnRealm Give button — configured in every location
- [ ] SignUpGenius links — threaded through events
- [ ] Facebook + YouTube embeds — tested on desktop + mobile
- [ ] Constant Contact newsletter signup — embedded or linked
- [ ] Google Maps — correct pin, mobile responsive
- [ ] All redirects configured per B2 redirect plan
- [ ] Accessibility audit (see D3)
- [ ] Mobile review at 375px, 390px, 768px, 1440px

---

## Content sources

Each piece of content has a clear source so we aren't inventing anything.

| Content | Source |
|---|---|
| Homepage copy | Write fresh from B1 + brand voice |
| Visit page | Consolidate `/welcome-from-the-rector/` + `/service-hours/` + new "what to expect" content |
| Worship page | Rewrite `/worship/` + add "this week's bulletin" pattern |
| Community page | Consolidate + rewrite from existing `/learn/`, `/serve/`, `/fellowship/`, `/prayer/`, `/pastoral-care/` |
| About page sections | Rewrite `/history/`, `/what-is-an-epis/` |
| Clergy bios | Lift from `/clergy/` with light polish (best content on the site) |
| Staff bios | Lift from `/staff/` + draft new bios for Erin and Ruth |
| Vestry | Lift from `/vestry/`, drop liaison language |
| Rector Search | B3 draft (use as-is, update status field) |
| Events | B3 templates (seed with 4–5 current events) |

---

## Appendix: Squarespace template recommendation

For the Sanctuary direction (recommended), the closest Squarespace 7.1 templates are:
- **Altaloma** — elegant serif hero, generous whitespace, good photography showcase
- **Brine-family templates** (Foster, Fulton) — classic editorial feel, strong for content-heavy sites
- **Carson** — cleaner, more modern; works if we want to lean lighter

Recommend starting with **Altaloma** or a Brine-family template, then customizing colors, fonts, and section layouts to match the Sanctuary design. Template is just a starting point — once content is in, the template choice is invisible.

---

# D2 — Integrations test plan

**Purpose:** Each integration tested on the staging site before launch. Every one of these has caused an outage somewhere at some point; explicit testing catches issues before they go live.

---

## Integrations to test

### OnRealm (giving)

- [ ] Realm "Give" button appears in header on every page
- [ ] Button click opens onrealm.org/AllSaintsEpiscopalConcord in a new tab
- [ ] Realm page loads and shows All Saints' donation options
- [ ] Tested from desktop (Chrome, Safari, Firefox)
- [ ] Tested from mobile (iOS Safari, Android Chrome)
- [ ] Confirmed a test $5 gift can be completed end-to-end (cancel before confirming if you don't want to actually give)

### Facebook Live / YouTube (livestream)

- [ ] "Watch Live" button visible on header on every page
- [ ] Worship page has embedded Facebook video block OR link to Facebook page
- [ ] YouTube channel linked from Worship page
- [ ] Link opens correct destination (facebook.com/AllSaintsEpiscopalConcord, youtube.com/@allsaintsepiscopalchurchco9498)
- [ ] Embed (if used) loads on mobile without breaking layout

### SignUpGenius

- [ ] Each event card on `/news` has a working SignUpGenius link
- [ ] Links open SignUpGenius in new tab
- [ ] Tested registration flow on at least one event
- [ ] No broken or expired links

### Constant Contact (Weekly Word)

- [ ] Newsletter signup form present on homepage and on `/news`
- [ ] Test signup with a dummy email confirms the double-opt-in flow works
- [ ] Latest Weekly Word is linked from `/news`
- [ ] Archive link works

### Google Maps (Visit page)

- [ ] Map embed shows correct pin at 525 Lake Concord Rd NE, Concord, NC 28025
- [ ] Zoom level reasonable (shows the neighborhood, not the entire city)
- [ ] "Get directions" link works on desktop and mobile
- [ ] Map is responsive on mobile (no horizontal scroll)

### Realm (member portal)

- [ ] Footer link labeled "Member Portal" present on every page
- [ ] Link opens onrealm.org/AllSaintsEpiscopalConcord
- [ ] Sign-in works from the destination

### Contact form (simplified)

- [ ] Form on `/visit` sends to admin@allsaintsconcord.org
- [ ] Test submission received
- [ ] Auto-reply ("We got your message") sent to submitter
- [ ] No required fields that aren't truly required (keep it to name + email + message)

### Prayer requests

- [ ] Prayer request form linked from `/community` pastoral section
- [ ] Submissions reach the right inbox (confirm with Fr. John or pastoral care team)

### Feedback form (preview window only)

- [ ] Form linked in footer of every preview-URL page
- [ ] Submissions reach a staff inbox (Ruth or shared)
- [ ] Auto-reply confirms receipt

### Analytics

- [ ] Squarespace Analytics is active
- [ ] (Optional) Google Analytics 4 property created and linked

---

## Test environment notes

- Use the **Squarespace staging URL** (not the custom domain yet) during testing
- Test under a personal account (no admin privileges) to catch auth issues
- Test with JavaScript disabled for at least one page (some users and screen readers)
- Test at 2G network throttling once (a few parishioners have slow connections)

---

# D3 — Launch checklist

**Purpose:** The final list before flipping the switch. Nothing on this list is optional.

---

## 48 hours before launch

### Technical
- [ ] All integrations in D2 pass
- [ ] All redirects in B2 redirect plan configured in Squarespace (Settings → Advanced → URL Mappings)
- [ ] 404 page has custom, friendly copy (not Squarespace default)
- [ ] Accessibility scan: WAVE or Axe browser extension shows no critical errors
- [ ] Mobile review: homepage + Visit + Worship at 375px, 390px, 768px
- [ ] Desktop review at 1440px and 1920px
- [ ] All images have alt text
- [ ] All pages have descriptive page titles and meta descriptions (for search)
- [ ] Sitemap.xml exists (Squarespace auto-generates, confirm)
- [ ] robots.txt allows indexing (confirm Squarespace's setting is correct)

### Content
- [ ] Every navigation link goes to a real page (no 404s)
- [ ] Every CTA button works
- [ ] Every image loads
- [ ] Typos: final proofread by at least two sets of eyes
- [ ] Staff bios are all filled in (no "coming soon")
- [ ] Rector Search page has current "Last updated" date
- [ ] Events page has at least 3–4 current events
- [ ] Worship page has current week's bulletin linked
- [ ] Copyright year is current
- [ ] Footer address, phone, email are correct

### Comms
- [ ] C5 launch email drafted and scheduled in Constant Contact
- [ ] C7 Weekly Word blurb included in this week's newsletter
- [ ] C4 pulpit announcement given to clergy
- [ ] C3 launch-week bulletin blurb handed to Ruth/bulletin producer
- [ ] C8 social posts drafted and scheduled in Facebook/Instagram scheduler
- [ ] C6 FAQ live on the new site (hidden page, linked from launch email)

---

## Launch day

### Morning of (before parishioner arrivals)
- [ ] Point `allsaintsconcord.org` DNS at the Squarespace site (via Squarespace domain connection wizard)
- [ ] Verify DNS propagation has completed (dnschecker.org)
- [ ] Confirm site loads at `allsaintsconcord.org` — not just the Squarespace staging URL
- [ ] Confirm HTTPS is active (padlock shows in browser)
- [ ] Confirm redirect tests: try 3–5 old URLs, confirm they land on the right new pages
- [ ] Send C5 launch email
- [ ] Publish C8 launch day social post

### Through the day
- [ ] Monitor feedback form inbox
- [ ] Check email to admin@ for any "I can't find X" reports
- [ ] Verify livestream works for any service happening that day
- [ ] Take a victory photo and send it to the group chat

### End of day
- [ ] Quick review: any issues surfaced? Log them.
- [ ] Respond to any feedback submissions from the day
- [ ] Note any pages that spiked in traffic (use analytics)

---

## Week after launch

- [ ] Daily check of feedback inbox for the first 7 days
- [ ] Respond to every feedback submission within 2 days (even "we considered this, here's why we didn't change it")
- [ ] Fix any bug-level issues (broken links, typos) same day
- [ ] C8 post 4 (one-week thank-you) published
- [ ] Staff sync: what are we hearing, what needs follow-up?

---

# D4 — Post-launch maintenance guide

**Purpose:** A plain-English reference for the small number of people who will maintain the site after launch. Lives at this path and also gets pasted into the church's internal documentation (Google Drive or wherever staff docs live).

**Audience:** Ruth Brown (Communications Assistant), Brian Sapp-Moore (Coordinator of Communications), any future staff member.

---

## The four things that change weekly

Most of the site is stable. These four things change regularly and are designed to be easy to update.

### 1. Sunday's bulletin

**Where:** Worship page · "This Week's Bulletin" section.
**When:** Every Friday afternoon, after Fr. John has finalized the order.
**How:**
1. Log in to Squarespace (squarespace.com)
2. Go to **Pages → Worship**
3. Find the "This Week's Bulletin" block
4. Click it and update: the link URL (to the PDF) and the date text
5. Save

Time required: ~2 minutes.

### 2. The Weekly Word link

**Where:** News & Events page · Weekly Word section.
**When:** Each Friday, after the Weekly Word has been sent via Constant Contact.
**How:**
1. Go to **Pages → News**
2. Find "This Week's Weekly Word"
3. Update: the Constant Contact link and the issue date
4. Save

Time required: ~2 minutes.

### 3. Upcoming events

**Where:** News & Events page · event cards.
**When:** Whenever a new event is planned, or when a past event should be removed.
**How to add an event:**
1. Go to **Pages → News**
2. Duplicate an existing event card
3. Update: date badge, category tag, title, 1–2 sentence description, link (SignUpGenius URL or "Learn more" destination)
4. Drag into chronological position
5. Save

**How to remove an event:**
1. Go to **Pages → News**
2. Delete the card (or move it to an "Archive" section if we want to keep a record)
3. Save

Time required per event: ~5 minutes.

### 4. Rector Search status

**Where:** About → Rector Search.
**When:** Whenever a milestone is reached or the committee has something new to share.
**How:**
1. Go to **Pages → About → Rector Search**
2. Update the "Where we are today" paragraph
3. Update the Timeline (add new milestone, mark older ones as complete if useful)
4. **Update the "Last updated" date at the bottom**
5. Save

Time required: ~5–10 minutes.

---

## The few things that change less often

### Staff or clergy changes

- New clergy bio: duplicate an existing clergy card and update. Add photo to asset library first.
- New staff bio: same pattern on the Staff page.
- Removing a bio (departure): delete the card. Don't leave ghost bios.

### Contact information

If phone, email, or address changes:
1. Update the footer (site-wide — one edit propagates everywhere)
2. Update the Visit page (main contact block)
3. Update the About page if it's listed there

### Annual content

Once a year:
- Copyright year in footer (January)
- Annual report link on `/news` (January)
- Vestry list on `/about/vestry` (after elections)
- Rector Search page status update (ongoing until complete)

---

## What to do when something breaks

- **A page returns an error:** contact Nate first. If urgent, un-publish the page and investigate after.
- **An integration fails (livestream, giving, SignUpGenius):** check the external service first — the issue is usually there, not in Squarespace. Update the link/embed once the service is back.
- **Someone reports a typo:** fix it same day. The site is not precious; errors cost trust.
- **The site goes down:** Squarespace has a status page at status.squarespace.com. If they're down, there's nothing to do but wait. If they're up and our site is down, contact Squarespace support.

---

## Monthly checkpoints

First of each month, spend 15 minutes:
- [ ] Are upcoming events current? (Remove anything past; add anything coming)
- [ ] Is the Rector Search page current? (Any new info since last month?)
- [ ] Is "This Week's Bulletin" actually this week's?
- [ ] Any broken links noticed in the last month?
- [ ] Analytics review: what pages are getting traffic? Any surprises?

---

## Who to call

- **Website editor questions:** Nate Ernst · nate.ernst7@gmail.com
- **Squarespace subscription / billing:** Squarespace support (via the Squarespace admin panel)
- **Domain renewal (allsaintsconcord.org):** Squarespace manages this
- **Realm giving / member portal issues:** Realm support
- **Constant Contact (Weekly Word) issues:** Constant Contact support
- **Photo requests or new images:** Brian Sapp-Moore

---

*End of D1–D4.*
