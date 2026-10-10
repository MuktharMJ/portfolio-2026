import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const slugs = ["codeverse", "zenugo-ai", "schedura", "devmap", "gearpilot", "machinetrack"];
for (const theme of ["light", "dark"] as const) {
  test(`${theme}: all pages, images, accessibility and overflow`, async ({ page }, testInfo) => {
    test.setTimeout(180_000);
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const route of ["/", ...slugs.map(slug => `/work/${slug}`)]) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(results.violations).toEqual([]);
      for (const img of await page.locator("main img").all()) {
        await img.scrollIntoViewIfNeeded();
        await expect(img).toHaveJSProperty("complete", true);
        expect(await img.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: testInfo.outputPath(`${theme}-${route.replaceAll("/", "_") || "home"}.png`), fullPage: true, scale: "css" });
      expect(await page.locator("body").innerText()).not.toMatch(/\+91[\s-]*\d|\b\d{10}\b/);
    }
    expect(errors).toEqual([]);
  });
}

test("project order, sources, contact and résumé destinations", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator(".project-caption h3 a")).toHaveText(["CODEVERSE", "Zenugo AI", "Schedura", "DevMap", "GearPilot", "MachineTrack"]);
  const hrefs = await page.locator(".project-caption h3 a").evaluateAll(nodes => nodes.map(n => n.getAttribute("href")));
  expect(hrefs).toEqual(slugs.map(slug => `/work/${slug}`));
  await expect(page.locator('a[href="mailto:mjmukthar96@gmail.com"]').first()).toBeAttached();
  await expect(page.locator('a[href="https://github.com/MuktharMJ"]').first()).toBeAttached();
  await expect(page.locator('a[href="https://www.linkedin.com/in/mukthar-m-j-/"]').first()).toBeAttached();
  const pdf = await request.get("/resume.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
});

test("small phones and tablet layouts retain all content", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Viewport matrix runs once");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", ...slugs.map(slug => `/work/${slug}`)]) {
      await page.goto(route);
      const overflowing = await page.evaluate(() => [...document.querySelectorAll("main *")].filter(n => n.getBoundingClientRect().right > innerWidth).map(n => ({ tag: n.tagName, className: n.className, text: n.textContent?.slice(0, 60), width: n.getBoundingClientRect().width })));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} at ${width}px: ${JSON.stringify(overflowing)}`).toBe(true);
      await expect(page.locator("h1")).toBeVisible();
    }
  }
});

test("keyboard theme choice persists across routes and reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Switch to dark theme" }).first();
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.locator('.project-caption a[href="/work/devmap"]').first().click();
  await expect(page.locator("h1")).toHaveText("DevMap");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.locator("html").evaluate(node => getComputedStyle(node).scrollBehavior)).toBe("auto");
});

test("navigation destinations and mobile focus restoration", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work/codeverse");
  if (testInfo.project.name === "mobile") {
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await menu.click();
    await page.getByRole("navigation", { name: "Mobile", exact: true }).getByRole("link", { name: /Capabilities/ }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  } else {
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Capabilities" }).click();
  }
  await expect(page).toHaveURL(/\/#capabilities$/);
  for (const id of ["work", "about", "capabilities", "resume", "contact"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
});
