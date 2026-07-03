import puppeteer from 'puppeteer-core';
import { resolve } from 'node:path';
const inPath = resolve('parish-profile-2026.html');
const browser = await puppeteer.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox','--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.goto('file://' + inPath, { waitUntil: 'networkidle0', timeout: 120000 });
await page.waitForSelector('.pagedjs_pages', { timeout: 120000 });
const map = await page.evaluate(() => {
  const out = [];
  const heads = document.querySelectorAll('h2.section-h, .band h2, .letter-h, .toc-heading, .divider-title, .closing-eyebrow');
  for (const h of heads) {
    const pageEl = h.closest('.pagedjs_page');
    const num = pageEl ? pageEl.getAttribute('data-page-number') : '?';
    out.push({ t: h.textContent.trim().replace(/\s+/g,' ').slice(0,42), p: num });
  }
  return out;
});
for (const m of map) console.log(m.p.padStart(3), m.t);
await browser.close();
