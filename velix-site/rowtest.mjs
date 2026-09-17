import { chromium } from "playwright-core";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-sandbox"] });
for (const [w, h, label] of [[1920, 1080, "desktop"], [390, 844, "mobile"], [834, 1194, "tablet"], [1920, 650, "wideshort"]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto("http://localhost:5217/", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const spans = Array.from(document.querySelectorAll(".navbar__links span"));
    const el = spans.find((s) => s.textContent === "CONTATO");
    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await page.waitForTimeout(1000);
  await page.locator(".contato__info").first().screenshot({ path: `/tmp/row-${label}.png` });
  await page.close();
}
await browser.close();
