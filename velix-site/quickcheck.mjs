import { chromium } from "playwright-core";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-sandbox"] });
for (const [w, h, label] of [[1920, 1080, "desktop"], [1920, 650, "wideshort"], [430, 650, "narrowshort"], [390, 844, "mobile"]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto("http://localhost:5209/portfolio", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `/tmp/qc-${label}.png` });
  await page.close();
}
await browser.close();
