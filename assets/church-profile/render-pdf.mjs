// Renders the parish profile HTML to PDF via paged.js + system Chrome.
// Usage: node render-pdf.mjs <input.html> <output.pdf>
import puppeteer from 'puppeteer-core';
import { resolve } from 'node:path';

const inPath = resolve(process.argv[2] ?? 'parish-profile-2026.html');
const outPath = resolve(process.argv[3] ?? 'parish-profile-2026.pdf');

const browser = await puppeteer.launch({
  channel: 'chrome',
  headless: true,
  args: ['--no-sandbox', '--allow-file-access-from-files', '--font-render-hinting=none'],
});

try {
  const page = await browser.newPage();
  page.on('console', (m) => console.log('  [page]', m.text()));
  page.on('pageerror', (e) => console.log('  [pageerror]', e.message));

  await page.goto('file://' + inPath, { waitUntil: 'networkidle0', timeout: 120000 });

  // Wait for paged.js to finish laying out the document.
  await page.waitForSelector('.pagedjs_pages', { timeout: 120000 });
  const pageCount = await page.$$eval('.pagedjs_page', (els) => els.length);
  console.log(`  paged.js produced ${pageCount} pages`);

  // Let fonts/images settle.
  await new Promise((r) => setTimeout(r, 1200));

  await page.pdf({
    path: outPath,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  console.log(`  wrote ${outPath}`);
} finally {
  await browser.close();
}
