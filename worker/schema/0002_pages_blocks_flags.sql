-- Phase 3 v2: page-level review model.
-- Adds: pages, page_signoffs, factual_flags. Alters: decisions (block_type, page_slug,
-- sort_order), reviewers (seen_interstitial_at). No drops. Old per-decision rows coexist.

-- reviewers: first-visit interstitial tracking
ALTER TABLE reviewers ADD COLUMN seen_interstitial_at TEXT;

-- decisions: turn each row into a typed "block" on a page.
-- Rebuild table to: drop the section CHECK (now used as free-form anchor label),
-- add block_type, page_slug, sort_order.
CREATE TABLE decisions_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('bio', 'copy')),
  question TEXT NOT NULL,
  context TEXT,
  options TEXT NOT NULL,
  subject_reviewer_id INTEGER REFERENCES reviewers(id),
  target_selector TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'finalized')),
  final_choice TEXT,
  final_other_text TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  finalized_at TEXT,
  block_type TEXT NOT NULL DEFAULT 'ab_choice',
  page_slug TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

INSERT INTO decisions_new
  (id, section, kind, question, context, options, subject_reviewer_id,
   target_selector, status, final_choice, final_other_text, created_at, finalized_at,
   block_type, page_slug, sort_order)
SELECT
  id, section, kind, question, context, options, subject_reviewer_id,
  target_selector, status, final_choice, final_other_text, created_at, finalized_at,
  'ab_choice', section, 0
FROM decisions;

DROP TABLE decisions;
ALTER TABLE decisions_new RENAME TO decisions;

CREATE INDEX idx_decisions_status ON decisions(status);
CREATE INDEX idx_decisions_page_slug ON decisions(page_slug);
CREATE INDEX idx_decisions_block_type ON decisions(block_type);

-- pages: the registry. One row per reviewable page.
CREATE TABLE pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  live_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','in_review','editorially_approved','publish_ready','published')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  published_at TEXT
);

CREATE INDEX idx_pages_status ON pages(status);

-- page_signoffs: who signed off on which page.
-- signed_off_with_incomplete = true if reviewer used "sign off as-is" while skipping blocks.
CREATE TABLE page_signoffs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_id INTEGER NOT NULL REFERENCES pages(id),
  reviewer_id INTEGER NOT NULL REFERENCES reviewers(id),
  note TEXT,
  signed_off_with_incomplete INTEGER NOT NULL DEFAULT 0,
  signed_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (page_id, reviewer_id)
);

CREATE INDEX idx_page_signoffs_page ON page_signoffs(page_id);
CREATE INDEX idx_page_signoffs_reviewer ON page_signoffs(reviewer_id);

-- factual_flags: reviewer-raised "Something's wrong here" reports.
-- All flow to Brian first (triaged_by default 'brian'); Brian assigns SME.
CREATE TABLE factual_flags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_id INTEGER NOT NULL REFERENCES pages(id),
  anchor TEXT,
  claim_under_review TEXT NOT NULL,
  proposed_correction TEXT NOT NULL,
  evidence_url TEXT,
  flagged_by_reviewer_id INTEGER NOT NULL REFERENCES reviewers(id),
  triaged_by TEXT NOT NULL DEFAULT 'brian',
  sme_assignee TEXT,
  status TEXT NOT NULL DEFAULT 'open'
    CHECK (status IN ('open','triaged','sme_assigned','confirmed','rejected','deferred')),
  sme_note TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at TEXT,
  flagger_notified_at TEXT
);

CREATE INDEX idx_factual_flags_page ON factual_flags(page_id);
CREATE INDEX idx_factual_flags_status ON factual_flags(status);
