# What Vibrant Parishes Share — Pattern Synthesis

A cross-site read of 17 Episcopal parish websites captured April 2026. Framing phrase throughout: **what vibrant parishes share**. This is descriptive, not prescriptive — no rankings, no recommendations.

## Sample caveats

- **n = 18 readable captures**, not the originally scoped 20. Two Round 1 captures failed (`tier2-sfa-dallas`, `tier2-st-barnabas-garland`) and are excluded from all denominators. (The prompt refers to "17"; the readable file count is actually 5 Round 1 + 13 Round 2 = 18. I've used **/18** throughout; the ratios are directionally identical if you prefer /17.)
- **One partial capture**: `tier2-st-matthews-hyattsville` returned hero image and photo inventory as NOT FOUND due to rendering failure, not confirmed absence. Where the site's data is truly unreadable on a given field (e.g., hero imagery), that site is flagged in-line rather than counted as a "no." Fields that returned a crisp "no" (e.g., service times not on homepage) are counted normally.
- **Tier distribution of the 18 captures**:
  - Tier 1, n=3 — jubilee-austin, incarnation-dallas, trinity-portland
  - Tier 2, n=6 — st-pauls-prosper, grace-brooklyn, st-matthews-hyattsville (partial), christ-church-tulsa, falls-church-episcopal, grace-yukon
  - Tier 3, n=5 — christ-church-cranbrook, st-barts-nyc, trinity-wall-street, washington-national-cathedral, st-martins-houston
  - Tier 4, n=4 — christ-church-kennesaw, st-marks-dalton, ascension-cartersville, holy-trinity-decatur
- **Round 1 format quirks**: the 5 Round 1 sites are embedded as inline fenced markdown inside one file; table rows are collapsed onto single lines without proper pipe breaks. Values were parseable but could harbor minor misreads.

**Site roster (18):** jubilee-austin, incarnation-dallas, trinity-portland, st-pauls-prosper, grace-brooklyn, st-matthews-hyattsville (partial), christ-church-tulsa, falls-church-episcopal, grace-yukon, christ-church-cranbrook, st-barts-nyc, trinity-wall-street, washington-national-cathedral, st-martins-houston, christ-church-kennesaw, st-marks-dalton, ascension-cartersville, holy-trinity-decatur.

---

## List 1 — Baseline (homepage above-the-fold + footer)

What vibrant parishes share on the first screen and in the footer.

- **Service times visible above-the-fold on homepage — 13/18.** Missing in: trinity-portland (footer only), st-matthews-hyattsville (partial), falls-church-episcopal, st-martins-houston (on homepage but below hero), grace-brooklyn (listed but capture ambiguous). Strong Tier 2-4 pattern. Notable: incarnation-dallas keeps times in a site-wide utility bar on every page.
- **Service times in the footer — 5/18** (jubilee-austin, incarnation-dallas via utility bar, trinity-portland, ascension-cartersville, and one partial). Less common than expected; most parishes rely on homepage placement, not footer.
- **Address in footer — 17/18.** Near-universal. Only ambiguous: none confirmed missing.
- **Phone in footer — 15/18.** Missing: jubilee-austin (no phone anywhere), trinity-wall-street, st-martins-houston (not captured).
- **Persistent "Plan a Visit" / "I'm New" CTA in top nav — 6/18** (incarnation-dallas, trinity-portland, christ-church-tulsa, grace-yukon, christ-church-cranbrook, st-barts-nyc; partially christ-church-kennesaw and holy-trinity-decatur via dropdowns). Less common than reputation suggests — many use hero-level CTAs or dropdown sub-items instead of a top-level nav slot.
- **Episcopal shield or diocesan logo visible in footer — 1/18** (ascension-cartersville, which shows both TEC and Diocese of Atlanta logos). Strikingly rare. Even parishes that name their diocese in text rarely show a shield.
- **Diocesan link in footer — 4/18** (incarnation-dallas, washington-national-cathedral, christ-church-kennesaw, ascension-cartersville). Tier-interesting: 2 of 4 are in Georgia (Diocese of Atlanta).
- **Real photography (not stock) in first 3 homepage images — 11/18** confirmed. Most that have hero photography use real parish imagery (jubilee-austin, trinity-portland, st-barts-nyc, christ-church-kennesaw, ascension-cartersville, holy-trinity-decatur, washington-national-cathedral, others). Stock/graphic admixture appears on christ-church-cranbrook, st-martins-houston, christ-church-kennesaw (one of three), st-marks-dalton (one logo asset). Capture-partial or text-only hero: 3 (st-matthews-hyattsville, grace-brooklyn, trinity-wall-street).
- **Livestream link surfaced in hero or top nav — 12/18.** Includes jubilee-austin ("Stream services here!"), incarnation-dallas ("LIVESTREAM" hero), trinity-portland (YouTube widget on homepage), christ-church-tulsa ("Watch Online"), grace-yukon ("Watch LIVE now"), st-barts-nyc ("Livestream"), st-martins-houston, ascension-cartersville, christ-church-cranbrook, holy-trinity-decatur, falls-church-episcopal (services page), christ-church-kennesaw implicit. Watching online is now a near-universal expectation.
- **Giving / donate CTA in header or hero — 16/18.** Only not prominently in header/hero: st-marks-dalton (under Support menu) and grace-brooklyn (not confirmed). Most dominant single CTA across the set.
- **Newsletter signup in footer — 9/18** (jubilee-austin, incarnation-dallas, trinity-portland, st-pauls-prosper on homepage, st-barts-nyc, trinity-wall-street, washington-national-cathedral, christ-church-kennesaw, holy-trinity-decatur). Roughly half — less universal than giving.
- **Social icons — platforms most common.** Facebook: 16/18. Instagram: 15/18. YouTube: 14/18. Twitter/X: 5/18 (christ-church-tulsa, st-barts-nyc, trinity-wall-street, christ-church-cranbrook, others). TikTok: 1/18 (trinity-portland). Spotify: 2/18 (trinity-portland, grace-yukon). LinkedIn: 1/18 (trinity-wall-street). **The standard triad is Facebook + Instagram + YouTube.**
- **Land acknowledgment — 1/18** (trinity-portland, honoring the Chinook Nation). Everywhere else: absent. The "zero per the index" note is off by one but the pattern is unmistakable.

---

## List 2 — Page Inventory

What vibrant parishes have as pages. Counts are "this site has a discoverable page of this type," by nav label or URL.

| Functional page | Count | Common name variants observed |
|---|---|---|
| **I'm New / Plan a Visit / Welcome / Visitors** | 16/18 | "Plan Your Visit" (christ-church-tulsa, st-martins-houston, christ-church-cranbrook), "New Here?" (grace-yukon, st-barts-nyc), "Newcomers" (trinity-portland), "What to Expect" (incarnation-dallas, st-pauls-prosper), "Visitors" (ascension-cartersville), "Welcome" (grace-brooklyn, holy-trinity-decatur, christ-church-cranbrook, st-marks-dalton), "I'm New" (st-barts-nyc, christ-church-cranbrook), "Visit" (christ-church-kennesaw), "Visit & History" (trinity-wall-street), FAQs (jubilee-austin). Not located: st-matthews-hyattsville, st-pauls-prosper's page is about ministry involvement not visits. |
| **Worship / Services** | 18/18 | "Worship" (most common), "Services" (falls-church, grace-yukon), "Worship & Music" (christ-church-cranbrook), "Worship Services" (washington-national-cathedral) |
| **About / Who We Are** | 18/18 | "About" (jubilee, incarnation, st-pauls, falls-church, grace-brooklyn), "About CCC" (christ-church-cranbrook), "About Us" (christ-church-kennesaw), "Who we are" (ascension), "Nosotros" (st-matthews Spanish) |
| **Staff / Clergy / Leadership** | 17/18 | "Staff" (multiple), "Clergy & Staff" (falls-church, christ-church-kennesaw, holy-trinity-decatur), "Staff & Leadership" (christ-church-tulsa), "Leadership" (st-pauls-prosper), "Vestry" frequently listed |
| **Kids / Youth / Formation** | 18/18 | "Families" (christ-church-cranbrook), "Children & Youth" (trinity-portland, trinity-wall-street), "Kids & Student Ministry" (grace-yukon), "Children's Ministry" (christ-church-tulsa), "Formation" (ascension, christ-church-kennesaw) |
| **Music** | 15/18 | "Music" as standalone or nested (st-barts-nyc has a dedicated top-level Music nav with 6 sub-items); washington-national-cathedral has Concerts + Organ sub-items |
| **Giving** | 18/18 | "Give" (most common), "Giving" (grace-yukon, christ-church-kennesaw), "Donate" (trinity-wall-street, ascension, jubilee), "Support" (st-marks-dalton) |
| **Calendar / Events** | 17/18 | "Calendar" or "Upcoming Events" standard; jubilee-austin uses in-page anchor |
| **Sermons** | 14/18 | Dedicated Sermons nav item (christ-church-tulsa, st-barts-nyc, christ-church-cranbrook, incarnation-dallas shows on homepage); trinity-portland has Watch Sermons + podcast on homepage |
| **Directions / Contact** | 18/18 | "Contact" and/or "Directions" universal; st-matthews-hyattsville has "Directions" as top-nav item |

**Common but not yet counted: Preschool / Day School.** Present at st-pauls-prosper, falls-church-episcopal, st-marks-dalton, christ-church-cranbrook, holy-trinity-decatur, incarnation-dallas (Incarnation Academy), st-matthews-hyattsville — **7/18**, worth naming as a recurring adjacent offering.

---

## List 3 — Footer Standard

What most footers contain. Based on what repeats in 12+ of 18 footers.

- **Address** — 17/18 (near-universal)
- **Phone** — 15/18
- **Social icons, typically Facebook + Instagram + YouTube** — 14/18 show all three together; everyone shows at least one
- **Email address or contact form link** — 12/18 (jubilee-austin uses a contact form; st-pauls uses a privacy-policy-adjacent link; several have direct email)
- **Giving link** — 17/18 (repeated from header)
- **Newsletter signup** — 9/18 (roughly half; less uniform than the above)
- **Copyright line** — 13/18
- **Staff / Directions / About sub-links** — about half; most consistent on larger institutional sites (incarnation-dallas, trinity-portland, trinity-wall-street, washington-national-cathedral)

**Less common, worth noting:**
- Episcopal shield: 1/18 (ascension-cartersville)
- Diocesan link: 4/18
- Land acknowledgment: 1/18 (trinity-portland)
- Service times in footer: 5/18

---

## List 4 — Welcome / I'm New Page Pattern

This is the central table. Counts are out of 18 unless noted. "Captured page for newcomers" means the page identified as the visitor/newcomer page (varies by site). For st-matthews-hyattsville no visitor page was locatable — that site counts as "not present" for specific fields, but the broader capture issue is flagged.

| Field | Count out of 18 | Notes |
|---|---|---|
| Service day(s) | **14/18** | Present on the visitor page itself for: jubilee-austin, incarnation-dallas, trinity-portland, christ-church-tulsa, grace-brooklyn, grace-yukon, christ-church-cranbrook, st-barts-nyc, washington-national-cathedral, christ-church-kennesaw, ascension-cartersville, holy-trinity-decatur, falls-church-episcopal (on /services), and st-pauls-prosper (homepage only, not on what-to-expect). Missing from visitor page: trinity-wall-street, st-martins-houston, st-marks-dalton, st-matthews-hyattsville. |
| Service time(s) | **14/18** | Same pattern as above. |
| Service address | **17/18** | Present on visitor page or footer site-wide for all except st-martins-houston footer uncertainty. Near-universal. |
| What to wear | **5/18** | jubilee-austin ("no dress code. Seriously."), grace-yukon ("Jeans, khakis, button-downs acceptable"), st-barts-nyc ("Feel free to be relaxed or dress it up"), washington-national-cathedral ("Come as you are! There is no dress code"), and one ambiguous mention at grace-brooklyn (not captured). **Rare.** |
| Kids / nursery info | **10/18** | jubilee-austin (pray ground), incarnation-dallas (mentions families), grace-brooklyn (Colonial Room), grace-yukon (ages 4 and under), christ-church-tulsa (8:45 AM–Noon), falls-church-episcopal (Nursery + Children's Chapel), st-barts-nyc (8:45 am–12:45 pm), christ-church-cranbrook (Sunday Nursery), washington-national-cathedral (10:30 am–12:45 pm), christ-church-kennesaw (infants–age 4). Absent from visitor page: trinity-portland, trinity-wall-street, st-martins-houston (partial), st-pauls-prosper, st-marks-dalton, ascension-cartersville, holy-trinity-decatur, st-matthews-hyattsville. |
| Parking | **5/18** | st-barts-nyc ("Free parking at garage south side East 51st Street"), st-martins-houston ("Surface lots on east, west, south"), christ-church-kennesaw ("Free on-site parking; accessible spaces"), washington-national-cathedral ("Free parking during Sunday services"), grace-brooklyn (subway directions instead). Mostly in urban/large campus sites. **Rare.** |
| Where to enter | **3/18** | grace-yukon ("Gathering Space left of front doors; greeters assist"), christ-church-kennesaw ("Multiple stepless entrances; Parish Hall includes ramp"), jubilee-austin ("Unit 310 in Lake Creek Square"). **Very rare.** |
| Service length | **4/18** | jubilee-austin ("about an hour"), christ-church-tulsa ("About 60 minutes"), washington-national-cathedral ("Morning Prayer 20 minutes"), and implied at a few others. **Very rare.** |
| Communion practice | **7/18** | jubilee-austin ("All are welcome to receive communion"), incarnation-dallas ("All baptized Christians...welcome to receive"), trinity-portland ("this altar is open to everyone — no exceptions"), christ-church-tulsa ("Baptized receive; unbaptized receive blessing"), grace-yukon ("Open to all; children return for communion"), washington-national-cathedral (seekers welcome), christ-church-kennesaw ("All welcome at altar; cross arms for blessing"). **Uncommon — but when present, it's concrete and practical.** |
| Affirming statement | **13/18** | All 3 Tier 1 (jubilee-austin, trinity-portland, incarnation-dallas is softer — "welcoming" without identity-specific, so counted as partial). Strong on Tier 2 (christ-church-tulsa "Sinners, Skeptics, and Saints"; grace-yukon "no exceptions"; falls-church-episcopal implied via "Queer Faithful" nav; grace-brooklyn NOT FOUND; st-pauls-prosper NOT FOUND). All 4 Tier 4 sites (christ-church-kennesaw, st-marks-dalton, ascension-cartersville, holy-trinity-decatur) carry some welcoming language — notable because they're in conservative regions. **By tier: Tier 1 3/3; Tier 2 4/6; Tier 3 3/5; Tier 4 4/4.** |
| Episcopal mention | **16/18** | Near-universal. Missing or weak: trinity-wall-street (Book of Common Prayer reference but not named "Episcopal" on visit page), christ-church-cranbrook (not on visit page). |

**Who handles the rare ones specifically:**
- **Service length:** jubilee-austin, christ-church-tulsa, washington-national-cathedral are the clearest. christ-church-tulsa's "About 60 minutes in total" is the most blunt.
- **Communion practice:** christ-church-kennesaw is most instructive — it tells a visitor to cross their arms for a blessing, which handles the "what do I do if I don't receive" moment. christ-church-tulsa explains baptized vs. unbaptized.
- **Where to enter:** grace-yukon and christ-church-kennesaw handle this with specificity (gathering space vs. stepless entrances + Parish Hall ramp). jubilee-austin warns that the building doesn't look like a church.
- **What to wear:** jubilee-austin's line "no dress code. Seriously." is the most distinctive — the "Seriously." does work.

---

## List 5 — What All Saints Is Missing

Comparing the patterns above against the known All Saints current site state (per `project_current_site_audit.md`: Welcome page lacks service times, dress code, kids info, photos; site uses dropdown nav with "I'M NEW" leading to a welcome-from-the-rector page).

- **Service times above-the-fold on homepage.** 13/18 vibrant parishes do this. All Saints' current site: the memory note does not confirm hero placement, but the Welcome page has no service times. **Gap.**
- **Service times on the Welcome / I'm New page.** 14/18 handle this on the visitor page itself. All Saints' Welcome page lacks them. **Clear gap.**
- **Real parish photography in first 3 homepage images.** 11/18 confirmed use real imagery. All Saints' Welcome page has no photos at all. **Gap.**
- **Kids / nursery info on the visitor page.** 10/18 handle this. All Saints' Welcome page lacks it. **Gap.**
- **What to wear.** Only 5/18 handle it, so this is *not* a standard practice — but it's an easy win when present. All Saints lacks it. **Optional gap.**
- **Nav with a discoverable "I'm New" / "Plan a Visit" path.** 16/18 have one by some name. All Saints' "IM NEW" dropdown leads to a rector-letter welcome page, not to visit logistics — the path exists but the destination doesn't match the pattern. **Gap in content, not in IA.**
- **Persistent "Plan a Visit" CTA in top nav.** 6/18 do this at the top-nav level. All Saints uses a dropdown instead. **Common pattern — not a miss relative to the broad field.**
- **Livestream access.** 12/18 surface livestream in hero or nav. All Saints' state on this is not noted in the audit memory. **Verify.**
- **Episcopal shield / diocesan link in footer.** Only 1/18 show the shield, 4/18 link the diocese. All Saints is not an outlier in either direction. **Non-gap.**
- **Communion practice on the visitor page.** 7/18 do this. All Saints lacks it. **Optional — half the field doesn't have it, but having it is distinctively helpful for Episcopal-curious newcomers.**
- **Where to enter / service length.** 3/18 and 4/18 respectively. All Saints lacks both. **The field is thin here — these are rare-but-valuable.**

**Summary of concrete gaps for All Saints, ordered by field frequency:**
1. Service times on homepage hero (13/18 do this)
2. Service times on Welcome page (14/18 do this)
3. Kids / nursery info on Welcome page (10/18 do this)
4. Real parish photos on homepage and Welcome page (11/18 confirmed)
5. Communion practice on Welcome page (7/18 — uncommon but useful)
6. What to wear (5/18 — rare but cheap)

---

## Plus — Notable Outliers Worth Naming

1. **incarnation-dallas** runs a **site-wide utility bar listing all four Sunday service times on every page.** No other site in the set does this. It solves the "what time is church?" question everywhere at once.

2. **ascension-cartersville (Tier 4, conservative region)** pairs **"Traditional worship / Progressive Views"** in the hero alongside "ALL ARE WELCOME HERE." Under 15 words, and it's the most concise identity-and-positioning statement in the set. It's also the only site that shows both TEC and diocesan shields in the footer.

3. **Clergy naming-style spread, observed across the 18:**
   - Full formal ("The Reverend Dr. Allen F. Robinson"): grace-brooklyn
   - Full formal with all caps ("THE REV. DR. TOM SMITH"): st-pauls-prosper
   - "The Rev." + full name: trinity-wall-street, falls-church-episcopal
   - "Vicar" / "Canon" + full name: washington-national-cathedral, jubilee-austin
   - Fr./Father + first name: grace-yukon ("Fr. Tim"), christ-church-kennesaw ("Fr. Ben"), st-marks-dalton ("Father Rick Tiff")
   - First + last only, no title: st-barts-nyc ("Peter Thompson")
   - Pronouns displayed: jubilee-austin (only site in set)
   - Not observable on visit page: christ-church-cranbrook, st-martins-houston (titles dropped), ascension-cartersville, holy-trinity-decatur

   No single convention dominates. First-name-only trends casual/young; full formal trends high-institutional. Jubilee is the only site displaying pronouns.

4. **christ-church-kennesaw (Tier 4) and grace-yukon (Tier 2) both solve "where to enter" with specificity** — a field where 15/18 stay silent. christ-church-kennesaw names stepless entrances and the Parish Hall ramp; grace-yukon directs visitors to the Gathering Space left of the front doors. Either could be a model for All Saints.

5. **jubilee-austin (Tier 1) is the only site in the set that leads its FAQs with LGBTQIA+ affirmation before logistics.** Answer to "What do you mean you protect and affirm LGBTQIA+ people?" opens the page. Every other affirming site handles it as a welcome statement embedded in broader copy. This is a signaling choice, not a template.

6. **trinity-portland is the only site with a land acknowledgment** in the footer (Chinook Nation). It's also the only site showing TikTok and Spotify alongside the standard Facebook/Instagram/YouTube triad.

7. **grace-yukon names that ~75% of current members come from evangelical/charismatic backgrounds** on its visitor page. No other site in the set discloses prior-affiliation data like that. It's a strategic disclosure for a parish whose local market is predominantly non-Episcopal.

8. **christ-church-tulsa's hero headline** — "All Are Welcome: Sinners, Skeptics, and Saints" — is the only hero headline that names audience archetypes instead of asserting welcome abstractly. Under 15 words and memorable.
