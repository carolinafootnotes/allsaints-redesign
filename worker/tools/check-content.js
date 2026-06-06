#!/usr/bin/env node
// Pre-deploy content guard.
// Fails the deploy if a known-unconfirmed factual claim is still present in the build.
// Add a phrase here whenever the review group has NOT cleared a claim for go-live;
// remove it once they confirm the real wording. Runs automatically before `npm run deploy`.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../public', import.meta.url));

// Each entry: a substring that must not ship until cleared, and why.
const BLOCKED = [
  { phrase: 'ongoing mission since 1996', why: 'Haiti CODEP present-tense status unconfirmed (see internal/deliverables/haiti-mission-question-for-group.md)' },
  { phrase: '600 local families are involved', why: 'Haiti CODEP current-scale claim unconfirmed by review group' },
  { phrase: 'million trees per year', why: 'Haiti CODEP current-scale claim unconfirmed by review group' },
];

function walk(dir) {
  let files = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files = files.concat(walk(p));
    else if (p.endsWith('.html')) files.push(p);
  }
  return files;
}

const hits = [];
for (const file of walk(ROOT)) {
  const text = readFileSync(file, 'utf8');
  for (const { phrase, why } of BLOCKED) {
    if (text.includes(phrase)) {
      hits.push({ file: file.slice(ROOT.length - 'public'.length), phrase, why });
    }
  }
}

if (hits.length) {
  console.error('\n✗ Pre-deploy content guard blocked the deploy:\n');
  for (const h of hits) {
    console.error(`  ${h.file}`);
    console.error(`    phrase: "${h.phrase}"`);
    console.error(`    why:    ${h.why}\n`);
  }
  console.error('Fix the copy, or remove the phrase from tools/check-content.js once the group clears it, then deploy.\n');
  process.exit(1);
}

console.log('✓ Content guard passed: no unconfirmed claims in the build.');
