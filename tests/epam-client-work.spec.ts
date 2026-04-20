import { test, expect } from '@playwright/test';

test.describe('EPAM navigation', () => {
  test('Services -> Explore Our Client Work -> Client Work visible', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

    // Accept cookie banner if it appears (site varies by region)
    const acceptCookies = page.getByRole('button', { name: /accept|agree/i });
    if (await acceptCookies.first().isVisible().catch(() => false)) {
      await acceptCookies.first().click();
    }

    await page.getByRole('link', { name: /^Services$/ }).click();
    await page.getByRole('link', { name: 'Explore Our Client Work' }).click();

    await expect(page.getByText('Client Work', { exact: false })).toBeVisible();
  });
});
