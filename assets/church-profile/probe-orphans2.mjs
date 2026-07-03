import puppeteer from 'puppeteer-core';
import { resolve } from 'node:path';
const browser = await puppeteer.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox','--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.goto('file://' + resolve('parish-profile-2026.html'), { waitUntil: 'networkidle0', timeout: 120000 });
await page.waitForSelector('.pagedjs_pages', { timeout: 120000 });
const rows = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('.section-head, .band').forEach(h => {
    const pageEl = h.closest('.pagedjs_page');
    if (!pageEl) return;
    const num = +pageEl.getAttribute('data-page-number');
    const hr = h.getBoundingClientRect();
    // Any content in the same page rendered clearly below this header?
    let below = 0;
    pageEl.querySelectorAll('p, .stat-row, .pull-quote, .prayer, .cards, img, .text-photo, .photo-row').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top >= hr.bottom - 2 && r.height > 4) below++;
    });
    const title = (h.querySelector('h2')?.textContent || '').trim().replace(/\s+/g,' ').slice(0,32);
    out.push({ num, title, below });
  });
  return out;
});
for (const r of rows) console.log(`p${String(r.num).padStart(2)}  below=${String(r.below).padStart(2)}  ${r.title}${r.below===0?'   <== ORPHAN HEADER':''}`);
await browser.close();
