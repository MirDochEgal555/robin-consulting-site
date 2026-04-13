import { expect, test } from "@playwright/test";

test("primary localized routes render from the exported site", async ({ page }) => {
  const routes = [
    "/",
    "/services/",
    "/projects/",
    "/blog/",
    "/dashboard/",
    "/legal-notice/",
    "/privacy/",
    "/de/",
    "/de/services/",
    "/de/projekte/",
    "/de/blog/",
    "/de/dashboard/",
    "/de/impressum/",
    "/de/datenschutz/",
  ];

  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await expect(page).toHaveURL(new RegExp(`${route.replace(/\//g, "\\/")}$`));
  }
});

test("menu navigation and locale switching work on top-level pages", async ({ page }) => {
  await page.goto("/services/");

  await page.getByRole("button", { name: "Open page menu" }).click();
  await page.getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL(/\/blog\/$/);

  await page.goto("/services/");
  await page
    .getByRole("link", { name: "Switch to the German version" })
    .click();
  await expect(page).toHaveURL(/\/de\/services\/$/);
});

test("consent gating stores analytics only after acceptance", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByText("Optional analytics", { exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => window.localStorage.getItem("rk-site-pulse")),
  ).toBeNull();

  await page.getByRole("button", { name: "Accept analytics" }).click();

  await expect(
    page.getByText("Optional analytics", { exact: true }),
  ).toHaveCount(0);
  await expect
    .poll(() =>
      page.evaluate(() => Boolean(window.localStorage.getItem("rk-site-pulse"))),
    )
    .toBe(true);
});

test("the latest blog card opens a published article", async ({ page }) => {
  await page.goto("/blog/");

  await page.locator("section#latest a[href*=\"/blog/\"]").first().click();

  await expect(page).toHaveURL(/\/blog\/[^/]+\/$/);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to blog" })).toBeVisible();
});
