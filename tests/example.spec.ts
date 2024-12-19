import { test, expect } from "@playwright/test";

const url: string = process.env.TARGET_URL || "";

test("has title", async ({ page }) => {
  await page.goto(url);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/nginx/);
});

test("get started link", async ({ page }) => {
  await page.goto(url);

  // Check for welcome text
  await expect(page.getByText("Welcome to nginx!")).toBeVisible();
});
