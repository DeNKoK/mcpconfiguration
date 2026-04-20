import { test, expect } from '@playwright/test';

test.describe('EPAM Services - Client Work Navigation', () => {
  test('should navigate to Client Work page via Services menu', async ({ page }) => {
    // Step 1: Navigate to EPAM homepage
    await page.goto('https://www.epam.com/');
    await expect(page).toHaveURL('https://www.epam.com/');

    // Step 2: Select "Services" from the header menu
    const servicesMenu = page.getByRole('navigation').getByRole('link', { name: 'Services' });
    await servicesMenu.waitFor({ state: 'visible' });
    await servicesMenu.hover();

    // Step 3: Click the "Explore Our Client Work" link
    const exploreClientWorkLink = page.getByRole('link', { name: 'Explore Our Client Work' });
    await exploreClientWorkLink.waitFor({ state: 'visible' });
    await exploreClientWorkLink.click();

    // Step 4: Verify that the "Client Work" text is visible on the page
    await page.waitForLoadState('networkidle');
    const clientWorkText = page.getByText('Client Work', { exact: false });
    await expect(clientWorkText.first()).toBeVisible();
  });
});
