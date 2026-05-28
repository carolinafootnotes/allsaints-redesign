# All Saints' website transition

WordPress to Squarespace migration, mid-July 2026 cutover.

## Repo map

- **`shared/`** — what the review group sees. PDFs, decks, sign-off docs, status updates. If it's been sent (or is about to be), it lives here.
  - `shared/decks/` — stakeholder presentation files (PPTX, Keynote, PDF)
  - `shared/deliverables/` — sitemap, content-approach signoff, vestry kit, review-group status updates

- **`internal/`** — working files. Drafts, research, design history, screenshots, source files, session notes. Not for outside eyes.
  - `internal/deliverables/` — markdown sources behind shared PDFs, internal audits, spec docs, session handoffs
  - `internal/design-history/` — v1, v2, v3, showcase, April 20 deck source bundle
  - `internal/research/` — competitive research, episcopal/social-media drafts
  - `internal/source-files/` — logo .ai/.svg
  - `internal/screenshots/` — working captures
  - `internal/docs/`, `internal/tools/` — internal docs + scripts

- **`worker/`** — the live preview + page-level review tool (Cloudflare Worker). Canonical build is `worker/public/final/`. Leave the paths alone.

- **`assets/`** — shared working assets (photos, WordPress export). Referenced by tooling; stays at root.

- **`BACKLOG.md`** — daily driver. Stays at root.

## Where to send the review group

The live preview + review tool: https://allsaints-redesign.nate-ernst7.workers.dev/final
