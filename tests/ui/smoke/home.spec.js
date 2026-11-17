const { test, expect } = require('@playwright/test');

test.describe('Home page', () => {
  test('loads with the expected title and main navigation @smoke', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Automation Exercise');
    await expect(page.getByRole('link', { name: /Signup \/ Login/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Products/ })).toBeVisible();
  });
});
