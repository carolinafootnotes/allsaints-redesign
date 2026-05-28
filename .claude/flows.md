# Project flows — invocation reference

Trigger these by saying the bolded phrase. Claude follows the documented flow without further prompting.

---

## "build the X page" / "build page X" / "build /final/X/"

Full ship cycle for one page:

1. UX + portability-checker + accessibility-reviewer in parallel (plan)
2. delivery-manager synthesizes (one recommendation)
3. implementer (general-purpose agent) builds
4. contrarian critiques the result
5. accessibility-reviewer validates the build
6. Deploy to live worker
7. Report: deployed URL + line count + any judgment calls

Gate: implementer step waits if accessibility flags blockers.

---

## "build pages X, Y, Z" (multi-page)

Same as above, fanned out in parallel for each page. delivery-manager handles cross-page cohesion check before deploy.

---

## "run the review cycle on [pages]" / "send to the group"

Six-stage flow with three human gates.

### Stage A — Identify what needs input
- Scan listed pages (or all changed pages if "since last send")
- Extract TODOs, TBDs, placeholders, open-question docs, NEEDS-GROUP triage rows
- Produce per-page "what we need" list

### Stage B — Prepare for group review
- Confirm each page is deployed
- Confirm review tool has it loaded (triage tool seed updated if needed)
- Draft single short message: what's new + what input is needed + which URL
- **Gate:** surface draft for Nate's approval before sending

### Stage C — (Human gate) wait for group input
- Nate sends the comms; group reviews via tool

### Stage D — Pull and synthesize input
- Query worker admin for new decisions/flags/comments
- Group by page
- Propose what changes each input drives
- **Gate:** surface incorporation plan for approval

### Stage E — Incorporate
- After approval, implementer makes changes
- Deploy
- Draft "updated for your review" notification
- **Gate:** surface notification draft for approval

### Stage F — Backlog
- Unresolved items → BACKLOG.md with priority
- Items needing Nate-only action surfaced explicitly

---

## "where are we?" / "what's open?" / "status"

delivery-manager backlog grooming:
- Read BACKLOG.md + open task list + open-question docs + NEEDS-GROUP triage
- Produce: done since last check, in flight, blocked on Nate, blocked on group, blocked on Brian
- Recommend next 3 actions

---

## "review the X page" / "design team look at X"

Dispatch UX + product + contrarian + accessibility + portability in parallel against the deployed page. delivery-manager synthesizes. Produces: must-fix, should-improve, nice-to-have. No implementation without approval.

---

## "synthesize" / "what's the team saying?"

When multiple agent outputs are in: delivery-manager produces one recommendation, names the contested point, surfaces decisions Nate still needs to make.

---

## Standing autonomy (no trigger phrase needed)

These happen automatically per memory file `feedback_standing_orders.md`:

- Small CSS tweaks → make + deploy + report (no team consult)
- Page changes → auto-deploy on success
- Pattern feedback from Nate → save as memory
- Open-question or input-needed items → track in `internal/deliverables/`

---

## When to escalate vs proceed

**Proceed autonomously:**
- Small CSS/copy changes
- Bug fixes
- Adding missing accessibility hygiene
- Deploying built pages
- Drafting (but not sending) human comms

**Escalate to AskUserQuestion or pause:**
- Net-new IA shifts
- Voice/tone on signal copy
- Sending any comms to humans
- Changes to preserved URLs
- Deletion of live content
- Decisions affecting rector-search audience
