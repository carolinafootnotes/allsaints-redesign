#!/usr/bin/env node
// Extracts old plain text from the WordPress export and new plain text from the
// /final pages, assembles review units per tools/audit-mapping.json, and writes
// worker/schema/audit_seed.sql. Also prints a full accounting of every published
// WP page (in a unit / removed / excluded / UNACCOUNTED). No dependencies.
//
//   node tools/extract-audit-content.js            # write the seed
//   node tools/extract-audit-content.js --dry-run  # report only, no write

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WP_XML = path.join(ROOT, "assets/wordpress-export/allsaintsepiscopalchurch.WordPress.2026-05-27.xml");
const MAPPING = path.join(ROOT, "tools/audit-mapping.json");
const PUBLIC = path.join(ROOT, "worker/public");
const OUT = path.join(ROOT, "worker/schema/audit_seed.sql");
const DRY = process.argv.includes("--dry-run");

// ---- plain-text extraction ----------------------------------------------

const NAMED_ENTITIES = {
  nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
  middot: "·", bull: "•", hellip: "…", mdash: "—", ndash: "–",
  rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", copy: "©", reg: "®",
  trade: "™", deg: "°", rarr: "→", larr: "←", eacute: "é", egrave: "è", agrave: "à",
  ccedil: "ç", ouml: "ö", uuml: "ü", auml: "ä", times: "×", frac12: "½",
};

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&([a-zA-Z][a-zA-Z0-9]*);/g, (m, name) =>
      Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, name) ? NAMED_ENTITIES[name] : m,
    );
}

// Turn messy HTML (WP content or a /final page) into readable plain text.
function toPlainText(html) {
  let s = html;
  s = s.replace(/<!--[\s\S]*?-->/g, " ");          // HTML + WP block comments
  s = s.replace(/<script[\s\S]*?<\/script>/gi, " ");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, " ");
  s = s.replace(/<svg[\s\S]*?<\/svg>/gi, " ");
  s = s.replace(/\[[^\]]*\]/g, " ");               // [shortcodes]
  // Block-level tags become line breaks so paragraphs survive.
  s = s.replace(/<\/(p|div|section|h[1-6]|li|ul|ol|tr|table|br|header|footer|article|main|nav|blockquote)>/gi, "\n");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<[^>]+>/g, " ");                  // remaining tags
  s = decodeEntities(s);
  s = s.replace(/[ \t\f\v]+/g, " ");
  s = s.replace(/ *\n */g, "\n");
  s = s.replace(/\n{3,}/g, "\n\n");
  return s.trim();
}

// Pull the <main> region from a /final page (fall back to <body>).
function pageMainText(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/i);
  const body = html.match(/<body[\s\S]*?<\/body>/i);
  return toPlainText((main && main[0]) || (body && body[0]) || html);
}

// ---- parse WP export ------------------------------------------------------

function cdata(block, tag) {
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  if (!m) return null;
  const cd = m[1].match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return (cd ? cd[1] : m[1]).trim();
}

const xml = fs.readFileSync(WP_XML, "utf-8");
const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
const wpPages = new Map(); // post_name -> { title, link, text }
for (const it of items) {
  if (cdata(it, "wp:post_type") !== "page") continue;
  if (cdata(it, "wp:status") !== "publish") continue;
  let name = cdata(it, "wp:post_name") || "";
  const link = cdata(it, "link") || "";
  const title = cdata(it, "title") || "";
  if (!name) {
    const seg = link.replace(/\/$/, "").split("/").pop();
    name = seg || `untitled-${wpPages.size}`;
  }
  const contentBlock = it.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/);
  const rawContent = contentBlock
    ? (contentBlock[1].match(/<!\[CDATA\[([\s\S]*?)\]\]>/) || [, contentBlock[1]])[1]
    : "";
  // First occurrence wins; skip duplicate post_names.
  if (!wpPages.has(name)) {
    wpPages.set(name, { title, link, text: toPlainText(rawContent) });
  }
}

// ---- assemble units from the mapping -------------------------------------

const mapping = JSON.parse(fs.readFileSync(MAPPING, "utf-8"));
const accounted = new Set();
const warnings = [];
const sqlEsc = (v) => (v == null ? "NULL" : `'${String(v).replace(/'/g, "''")}'`);

const unitRows = [];
const sourceRows = []; // { unitSlug, title, url, text, order }
let sortBase = 0;

function addSources(unitSlug, sources) {
  let order = 0;
  for (const name of sources) {
    accounted.add(name);
    const p = wpPages.get(name);
    if (!p) {
      warnings.push(`source not found in WP export: "${name}" (unit ${unitSlug})`);
      sourceRows.push({ unitSlug, title: name, url: null, text: null, order: order++ });
      continue;
    }
    sourceRows.push({ unitSlug, title: p.title || name, url: p.link, text: p.text, order: order++ });
  }
}

for (const u of mapping.units) {
  let newText = null;
  if (u.new_file) {
    const f = path.join(PUBLIC, u.new_file);
    if (fs.existsSync(f)) newText = pageMainText(fs.readFileSync(f, "utf-8"));
    else warnings.push(`new_file not found: ${u.new_file} (unit ${u.slug_key})`);
  }
  unitRows.push({
    slug_key: u.slug_key,
    title: u.title,
    disposition: u.disposition,
    new_url: u.new_url || null,
    new_text: newText,
    sort_order: sortBase++,
  });
  addSources(u.slug_key, u.sources || []);
}

// removed unit
if (mapping.removed) {
  unitRows.push({
    slug_key: mapping.removed.slug_key,
    title: mapping.removed.title,
    disposition: "removed",
    new_url: null,
    new_text: null,
    sort_order: sortBase++,
  });
  addSources(mapping.removed.slug_key, mapping.removed.sources || []);
}

// excluded (accounting only; not seeded as units)
for (const name of Object.keys(mapping.excluded || {})) accounted.add(name);

// ---- accounting -----------------------------------------------------------

const unaccounted = [...wpPages.keys()].filter((n) => !accounted.has(n));

console.log("=== Content audit accounting ===");
console.log(`Published WP pages parsed: ${wpPages.size}`);
console.log(`Units: ${mapping.units.length} (+1 removed)`);
console.log(`Sources placed in units: ${sourceRows.length}`);
console.log(`Excluded (with reason): ${Object.keys(mapping.excluded || {}).length}`);
if (unaccounted.length) {
  console.log(`\nUNACCOUNTED published pages (${unaccounted.length}) — add to mapping:`);
  for (const n of unaccounted) {
    const p = wpPages.get(n);
    console.log(`  - ${n}  ("${p.title}", ${p.link}, ${p.text.length} chars)`);
  }
}
if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}

// ---- write seed -----------------------------------------------------------

if (DRY) {
  console.log("\n--dry-run: no file written.");
  process.exit(0);
}

const lines = [
  "-- Generated by tools/extract-audit-content.js. Do not edit by hand.",
  "-- Re-run: node tools/extract-audit-content.js",
  "DELETE FROM audit_sources;",
  "DELETE FROM audit_units;",
  "",
];
for (const u of unitRows) {
  lines.push(
    `INSERT INTO audit_units (slug_key, title, disposition, new_url, new_text, sort_order) VALUES (` +
      `${sqlEsc(u.slug_key)}, ${sqlEsc(u.title)}, ${sqlEsc(u.disposition)}, ` +
      `${sqlEsc(u.new_url)}, ${sqlEsc(u.new_text)}, ${u.sort_order});`,
  );
}
lines.push("");
for (const s of sourceRows) {
  lines.push(
    `INSERT INTO audit_sources (unit_id, old_title, old_url, old_text, sort_order) ` +
      `SELECT id, ${sqlEsc(s.title)}, ${sqlEsc(s.url)}, ${sqlEsc(s.text)}, ${s.order} ` +
      `FROM audit_units WHERE slug_key = ${sqlEsc(s.unitSlug)};`,
  );
}
lines.push("");

fs.writeFileSync(OUT, lines.join("\n"));
console.log(`\nWrote ${OUT} (${unitRows.length} units, ${sourceRows.length} sources).`);
