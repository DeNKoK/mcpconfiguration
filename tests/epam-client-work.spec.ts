import { test, expect } from '@playwright/test';

test.describe('EPAM.com - Client Work navigation', () => {
  test.use({
    viewport: null,
    launchOptions: {
      channel: 'chrome',
      args: ['--start-maximized'],
    },
  });

  test('Navigate via Services -> Explore Our Client Work and verify Client Work page', async ({ page }) => {
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

    // Accept cookies if banner appears (best-effort)
    const acceptCookies = page.getByRole('button', { name: /accept|agree/i });
    if (await acceptCookies.isVisible().catch(() => false)) {
      await acceptCookies.click();
    }

    // Open the Services header menu
    const servicesNav = page.getByRole('link', { name: /^services$/i }).first();
    if (await servicesNav.isVisible().catch(() => false)) {
      await servicesNav.click();
    } else {
      // Fallback in case Services is rendered as a button/menuitem
      await page.locator('header').getByText(/^services$/i).first().click();
    }

    // Click "Explore Our Client Work"
    const clientWorkLink = page.getByRole('link', { name: /explore our client work/i }).first();
    await clientWorkLink.click();

    await expect(page.getByText(/client work/i).first()).toBeVisible();
  });
});
