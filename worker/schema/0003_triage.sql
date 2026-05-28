-- Phase 4: content triage for WordPress page-by-page decisions.
-- Adds two tables: triage_pages (the WP page registry) and triage_decisions
-- (one reviewer-vote-per-page). No drops, no alters to existing tables.

CREATE TABLE IF NOT EXISTS triage_pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug_key TEXT NOT NULL UNIQUE,        -- normalized id (e.g. "prayer-requests")
  title TEXT NOT NULL,
  wp_url TEXT,                          -- original WordPress URL path
  last_modified TEXT,
  word_count INTEGER,
  wp_status TEXT,                       -- publish / draft / private
  recommendation TEXT NOT NULL          -- KEEP / FOLD / RETIRE / UNDECIDED
    CHECK (recommendation IN ('KEEP','FOLD','RETIRE','UNDECIDED')),
  fold_target TEXT,                     -- where it goes if FOLD (e.g. "/connect")
  rationale TEXT,                       -- human-readable why
  preserved_url INTEGER NOT NULL DEFAULT 0,  -- 1 if URL must be preserved (QR codes etc)
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_triage_pages_recommendation ON triage_pages(recommendation);

CREATE TABLE IF NOT EXISTS triage_decisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reviewer_id INTEGER NOT NULL REFERENCES reviewers(id),
  page_slug_key TEXT NOT NULL,
  decision TEXT NOT NULL CHECK (decision IN ('agree','flag','unsure')),
  comment TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(reviewer_id, page_slug_key)
);

CREATE INDEX IF NOT EXISTS idx_triage_decisions_page ON triage_decisions(page_slug_key);
CREATE INDEX IF NOT EXISTS idx_triage_decisions_reviewer ON triage_decisions(reviewer_id);
