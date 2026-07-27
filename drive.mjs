import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const SHOT_DIR = path.resolve(process.cwd(), "shots");
fs.mkdirSync(SHOT_DIR, { recursive: true });

const errors = [];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push("pageerror: " + err.message));

  console.log("Navigating...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 30000 });

  console.log("Waiting for canvas...");
  await page.waitForSelector("canvas[data-engine]", { timeout: 20000 });
  await page.waitForTimeout(2500); // let idle spin + suspense settle

  await page.screenshot({ path: path.join(SHOT_DIR, "01-hero.png") });
  console.log("Screenshot: 01-hero.png");

  // Hover over the center of the canvas where a front-face tile should be idling through.
  const canvasBox = await page.locator("canvas[data-engine]").boundingBox();
  const cx = canvasBox.x + canvasBox.width / 2;
  const cy = canvasBox.y + canvasBox.height / 2;

  console.log("Hovering cube center...");
  await page.mouse.move(cx, cy);
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(SHOT_DIR, "02-hover.png") });
  console.log("Screenshot: 02-hover.png");

  console.log("Dragging cube...");
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx + 220, cy - 80, { steps: 20 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SHOT_DIR, "03-dragged.png") });
  console.log("Screenshot: 03-dragged.png");

  // Give idle/snap a moment, then try clicking a tile button (rendered as real DOM via Html).
  await page.waitForTimeout(1000);
  const tileButtons = page.locator('button[aria-hidden="true"]');
  const count = await tileButtons.count();
  console.log("Found cube tile buttons:", count);

  let panelOpened = false;
  for (let i = 0; i < count; i++) {
    const btn = tileButtons.nth(i);
    if (await btn.isVisible()) {
      const box = await btn.boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(1400);
        const panel = page.locator('[role="dialog"]');
        if (await panel.isVisible().catch(() => false)) {
          panelOpened = true;
          console.log("Panel opened via tile index", i);
          break;
        }
      }
    }
  }

  if (!panelOpened) {
    console.log("Falling back to sr-only accessible nav to open the panel...");
    await page.keyboard.press("Tab");
    // Try tabbing a few times to reach the hidden nav, then click via evaluate on first feature button.
    const opened = await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Platform features"]');
      const btn = nav?.querySelector("button");
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    console.log("sr-only nav click result:", opened);
    await page.waitForTimeout(1000);
  }

  await page.screenshot({ path: path.join(SHOT_DIR, "04-panel.png") });
  console.log("Screenshot: 04-panel.png");

  const panelVisible = await page.locator('[role="dialog"]').isVisible().catch(() => false);
  console.log("Panel visible:", panelVisible);

  if (panelVisible) {
    await page.locator('button[aria-label="Close feature panel"]').click();
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(SHOT_DIR, "05-closed.png") });
    console.log("Screenshot: 05-closed.png (panel closed)");
  }

  // Mobile viewport check
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(SHOT_DIR, "06-mobile.png") });
  console.log("Screenshot: 06-mobile.png");

  console.log("CONSOLE_ERRORS:", JSON.stringify(errors));

  await browser.close();
})().catch((e) => {
  console.error("DRIVER_FAILED:", e);
  process.exit(1);
});
