// One-off: turn triage_seed_data.js CSV into a compact JSON array for the
// solo page-review tool. Run: node worker/tools/gen_triage_data.cjs
const fs = require("fs");
const path = require("path");

const seed = fs.readFileSync(
  path.join(__dirname, "../src/review/triage_seed_data.js"),
  "utf8"
);
const csv = seed.split("`")[1].trim();
const lines = csv.split(/\r?\n/);
lines.shift(); // header

function parseLine(line) {
  const out = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          q = false;
        }
      } else {
        cur += c;
      }
    } else {
      if (c === ",") {
        out.push(cur);
        cur = "";
      } else if (c === '"') {
        q = true;
      } else {
        cur += c;
      }
    }
  }
  out.push(cur);
  return out;
}

const recMap = { KEEP: "keep", FOLD: "consolidate", RETIRE: "remove" };

const rows = lines.map((line) => {
  const [
    num,
    title,
    slug,
    slug_key,
    last_modified,
    word_count,
    wp_status,
    recommendation,
    fold_target,
    rationale,
  ] = parseLine(line);
  return {
    id: slug_key,
    num: Number(num),
    title,
    slug,
    status: wp_status,
    words: Number(word_count),
    modified: last_modified,
    suggest: recMap[recommendation] || "",
    foldTarget: fold_target || "",
    note: rationale === "TBD" ? "" : rationale || "",
  };
});

fs.writeFileSync(
  path.join(__dirname, "triage_data.json"),
  JSON.stringify(rows, null, 0)
);
console.log("wrote", rows.length, "rows");
