import { describe, expect, it } from "vitest";
import { parseDecisionsCsv } from '../src/review/csv.js';

describe("parseDecisionsCsv", () => {
  it("parses 2-row CSV with quoted fields and embedded commas", () => {
    const csv = [
      "section,kind,question,context,option_a_label,option_a_body,option_b_label,option_b_body,target_file,target_anchor,subject_email,assigned_emails",
      'connect,bio,"John bio?",,Current,"Bio A text",Alternate,"Bio B, with comma",worker/public/final/connect.html,"John Smith",john@a.com,',
      'home,copy,"Welcome?",,Cur,"A text",New,"B text",worker/public/final/index.html,"At All Saints",,joy@a.com;debby@a.com',
    ].join("\n");

    const rows = parseDecisionsCsv(csv);
    expect(rows.length).toBe(2);

    expect(rows[0].kind).toBe("bio");
    expect(rows[0].section).toBe("connect");
    expect(rows[0].options).toEqual([
      { key: "A", label: "Current", body: "Bio A text" },
      { key: "B", label: "Alternate", body: "Bio B, with comma" },
    ]);
    expect(rows[0].subject_email).toBe("john@a.com");
    expect(rows[0].assigned_emails).toEqual([]);
    expect(rows[0].target_selector).toEqual({
      file: "worker/public/final/connect.html",
      anchor_string: "John Smith",
    });

    expect(rows[1].kind).toBe("copy");
    expect(rows[1].subject_email).toBe(null);
    expect(rows[1].assigned_emails).toEqual(["joy@a.com", "debby@a.com"]);
  });

  it('handles "" (escaped quote) inside quoted field', () => {
    const csv = [
      "section,kind,question,context,option_a_label,option_a_body,option_b_label,option_b_body,target_file,target_anchor,subject_email,assigned_emails",
      'home,copy,"She said ""hi""",,Cur,"A",New,"B",f.html,"anchor",,',
    ].join("\n");

    const rows = parseDecisionsCsv(csv);
    expect(rows[0].question).toBe('She said "hi"');
  });
});
