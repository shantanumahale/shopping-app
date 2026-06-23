import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("renders the product grid", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /add/i }).first(),
    ).toBeVisible();
    await expect(page.getByText(/showing 30 of/i)).toBeVisible();
  });

  test("loads more products on scroll (infinite scroll)", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator('a[href^="/products/"]');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBe(30);

    await page.mouse.wheel(0, 100000);
    await expect
      .poll(async () => cards.count(), { timeout: 15000 })
      .toBeGreaterThan(30);
  });
});
