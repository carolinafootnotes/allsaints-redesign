export function parseCsvRow(line) {
  const cells = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        cells.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
  }
  cells.push(cur);
  return cells;
}

export function parseDecisionsCsv(csv) {
  const lines = csv.split(/\r?\n/).map((l) => l).filter((l) => l.length > 0);
  if (lines.length === 0) return [];
  const headers = parseCsvRow(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = parseCsvRow(lines[i]);
    const r = Object.fromEntries(headers.map((h, j) => [h, cells[j] ?? ""]));
    const options = [];
    for (const key of ["A", "B", "C", "D"]) {
      const label = r[`option_${key.toLowerCase()}_label`];
      const body = r[`option_${key.toLowerCase()}_body`];
      if (label) options.push({ key, label, body: body || "" });
    }
    rows.push({
      section: r.section,
      kind: r.kind,
      question: r.question,
      context: r.context || null,
      options,
      target_selector: { file: r.target_file, anchor_string: r.target_anchor },
      subject_email: r.subject_email || null,
      assigned_emails: (r.assigned_emails || "")
        .split(";")
        .map((e) => e.trim())
        .filter(Boolean),
    });
  }
  return rows;
}
