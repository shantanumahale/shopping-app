import { test, expect } from "@playwright/test";

test("add to cart, open drawer, and proceed to checkout", async ({ page }) => {
  await page.goto("/products/1");
  await page.getByRole("button", { name: /add/i }).click();

  const cartButton = page.getByRole("button", { name: /open cart/i });
  await expect(cartButton).toBeVisible();
  await cartButton.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByText(/essence mascara lash princess/i),
  ).toBeVisible();

  const checkout = dialog.getByRole("link", { name: /proceed to checkout/i });
  await expect(checkout).toHaveAttribute("href", "/checkout");
  await checkout.click();
  await expect(page).toHaveURL(/\/checkout/);
  await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
});

test("cart persists across a reload", async ({ page }) => {
  await page.goto("/products/2");
  await page.getByRole("button", { name: /add/i }).click();
  await expect(page.getByRole("button", { name: /open cart/i })).toBeVisible();

  await page.reload();
  await page.getByRole("button", { name: /open cart/i }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("link", { name: /proceed to checkout/i }),
  ).toBeVisible();
});
