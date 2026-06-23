import { test, expect } from "@playwright/test";

test("navigates to a product detail page from the grid", async ({ page }) => {
  await page.goto("/");
  await page.locator('a[href^="/products/"]').first().click();
  await expect(page).toHaveURL(/\/products\/\d+/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("button", { name: /add/i })).toBeVisible();
});

test("renders product details directly", async ({ page }) => {
  await page.goto("/products/1");
  await expect(
    page.getByRole("heading", { name: /essence mascara lash princess/i }),
  ).toBeVisible();
  await expect(page.getByText(/\$9\.99/)).toBeVisible();
});
