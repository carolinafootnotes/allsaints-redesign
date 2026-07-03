import puppeteer from 'puppeteer-core';
import { resolve } from 'node:path';
const inPath = resolve('parish-profile-2026.html');
const browser = await puppeteer.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox','--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.goto('file://' + inPath, { waitUntil: 'networkidle0', timeout: 120000 });
await page.waitForSelector('.pagedjs_pages', { timeout: 120000 });
const rows = await page.evaluate(() => {
  const pageOf = el => { const p = el?.closest('.pagedjs_page'); return p ? +p.getAttribute('data-page-number') : null; };
  const out = [];
  document.querySelectorAll('section.section').forEach(sec => {
    const head = sec.querySelector('.section-head, .band');
    const headH = head ? head.querySelector('h2') : null;
    // first real content element after the head
    let firstContent = null;
    const kids = [...sec.children];
    const hi = kids.indexOf(head);
    for (let i = hi+1; i < kids.length; i++){ firstContent = kids[i]; break; }
    // for band sections the prose is a sibling; for section-head sections too
    const title = (headH?.textContent || head?.textContent || '?').trim().replace(/\s+/g,' ').slice(0,34);
    out.push({ title, headP: pageOf(head), contentP: pageOf(firstContent) });
  });
  return out;
});
for (const r of rows){
  const flag = (r.headP !== r.contentP) ? '  <-- ORPHAN' : '';
  console.log(`head p${r.headP}  content p${r.contentP}  ${r.title}${flag}`);
}
await browser.close();
