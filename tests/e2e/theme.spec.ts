import { test, expect } from "@playwright/test";

test("toggles between light and dark themes", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const toggle = page.getByRole("button", { name: /toggle theme/i });

  await expect(toggle).toBeVisible();
  const before = await html.getAttribute("class");

  await toggle.click();
  await expect.poll(async () => html.getAttribute("class")).not.toBe(before);

  // toggling back returns to the original theme
  await toggle.click();
  await expect.poll(async () => html.getAttribute("class")).toBe(before);
});
