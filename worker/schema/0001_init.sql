CREATE TABLE reviewers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('subject', 'group')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE decisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section TEXT NOT NULL CHECK (section IN ('home', 'visit', 'connect', 'happenings', 'rector-search', 'watch-live', 'global')),
  kind TEXT NOT NULL CHECK (kind IN ('bio', 'copy')),
  question TEXT NOT NULL,
  context TEXT,
  options TEXT NOT NULL,                      -- JSON: [{key, label, body}]
  subject_reviewer_id INTEGER REFERENCES reviewers(id),
  target_selector TEXT NOT NULL,              -- JSON: {file, anchor_string} — see "Pull script" below
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'finalized')),
  final_choice TEXT,
  final_other_text TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  finalized_at TEXT
);

CREATE TABLE assignments (
  decision_id INTEGER NOT NULL REFERENCES decisions(id),
  reviewer_id INTEGER NOT NULL REFERENCES reviewers(id),
  PRIMARY KEY (decision_id, reviewer_id)
);

CREATE TABLE submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  decision_id INTEGER NOT NULL REFERENCES decisions(id),
  reviewer_id INTEGER NOT NULL REFERENCES reviewers(id),
  choice TEXT NOT NULL,                       -- key from decisions.options or 'other'
  other_text TEXT,
  comment TEXT,
  submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (decision_id, reviewer_id)
);

CREATE INDEX idx_decisions_status ON decisions(status);
CREATE INDEX idx_assignments_reviewer ON assignments(reviewer_id);
CREATE INDEX idx_submissions_decision ON submissions(decision_id);
