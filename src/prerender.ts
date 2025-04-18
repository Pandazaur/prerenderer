import { chromium } from 'playwright';
import * as fs from 'fs';

export async function prerender(url: string, filepath: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  const content = await page.content();
  fs.writeFileSync(filepath, content);
  await browser.close();
}