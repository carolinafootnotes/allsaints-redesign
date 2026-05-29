-- Phase 5: content audit (before/after copy accuracy review).
-- Two-pass flow: Nate clears/flags units (first pass), the reviewer acts only on
-- flagged units (second pass). Adds three tables; no drops, no alters to existing.

-- A review unit = one new destination page plus all the old pages that fed it.
CREATE TABLE IF NOT EXISTS audit_units (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  slug_key     TEXT    NOT NULL UNIQUE,   -- stable key, e.g. "pastoral-care"
  title        TEXT    NOT NULL,          -- new page name, or "Removed from the new site"
  disposition  TEXT    NOT NULL CHECK (disposition IN ('rewritten','merged','removed')),
  new_url      TEXT,                      -- /final/... path; NULL if removed
  new_text     TEXT,                      -- extracted plain text of the new page; NULL if removed
  -- Nate's first pass lives on the unit (single admin editor):
  review_state TEXT    NOT NULL DEFAULT 'pending'
                 CHECK (review_state IN ('pending','cleared','flagged')),
  flag_note    TEXT,                      -- Nate's note to the reviewer when flagged
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_audit_units_state ON audit_units(review_state);

-- The old WordPress page(s) that feed a unit. One-to-many.
CREATE TABLE IF NOT EXISTS audit_sources (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  unit_id    INTEGER NOT NULL REFERENCES audit_units(id),
  old_title  TEXT    NOT NULL,
  old_url    TEXT,
  old_text   TEXT,                        -- extracted plain text from WP export
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_audit_sources_unit ON audit_sources(unit_id);

-- The reviewer's second-pass decision (only on flagged units).
CREATE TABLE IF NOT EXISTS audit_decisions (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  reviewer_id   INTEGER NOT NULL REFERENCES reviewers(id),
  unit_slug_key TEXT    NOT NULL,
  outcome       TEXT    NOT NULL CHECK (outcome IN ('approved','issue')),
  issue_text    TEXT,                     -- required when outcome='issue'
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  UNIQUE (reviewer_id, unit_slug_key)     -- upsert; decisions are changeable
);

CREATE INDEX IF NOT EXISTS idx_audit_decisions_unit ON audit_decisions(unit_slug_key);
