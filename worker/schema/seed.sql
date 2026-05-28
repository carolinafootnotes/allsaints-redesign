INSERT INTO reviewers (id, name, email, token, role)
VALUES (1, 'Test Subject', 'test@example.com', 'test-token-abc123', 'subject');

INSERT INTO decisions (
  id, section, kind, question, context, options, subject_reviewer_id, target_selector, status
) VALUES (
  1,
  'home',
  'bio',
  'Which version of your bio reads best?',
  'Shown on the home page Staff section.',
  '[{"key":"A","label":"Current","body":"Original bio text."},{"key":"B","label":"Alternative","body":"New proposed bio text."}]',
  1,
  '{"file":"worker/public/final/index.html","anchor_string":"Original bio text."}',
  'open'
);

INSERT INTO assignments (decision_id, reviewer_id) VALUES (1, 1);
