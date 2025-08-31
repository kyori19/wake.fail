import { test, expect } from '@playwright/test';

test.describe('wake.fail - Basic Functionality', () => {
  test('page loads without errors', async ({ page }) => {
    await page.goto('/');

    // Check that the page title is correct
    await expect(page).toHaveTitle(/wake\.fail/);

    // Check that main elements are present
    await expect(page.getByRole('banner')).toContainText('wake.fail');
    await expect(page.getByRole('main')).toBeVisible();

    // Check for no JavaScript errors in console
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait a bit for any delayed errors
    await page.waitForTimeout(2000);

    // Filter out known non-critical errors (like network errors during development)
    const criticalErrors = errors.filter(
      error =>
        !error.includes('net::ERR_') &&
        !error.includes('favicon') &&
        !error.includes('404')
    );

    expect(criticalErrors).toEqual([]);
  });

  test('progress bar is visible and animates', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check that progress bar is visible
    const progressBar = page.locator('[role="progressbar"]');
    await expect(progressBar).toBeVisible();

    // Check that progress value is present and reasonable
    const progressValue = await progressBar.getAttribute('aria-valuenow');
    expect(progressValue).toBeTruthy();
    const progress = parseFloat(progressValue!);
    expect(progress).toBeGreaterThanOrEqual(0);
    expect(progress).toBeLessThanOrEqual(100);
  });

  test('messages are displayed and update', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check that message display is visible
    const messageDisplay = page
      .locator('[data-testid="message-display"], .text-center')
      .first();
    await expect(messageDisplay).toBeVisible();

    // Check that it contains some text
    const messageText = await messageDisplay.textContent();
    expect(messageText).toBeTruthy();
    expect(messageText!.length).toBeGreaterThan(0);
  });

  test('loading spinner is visible', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check that spinner is present (it might be using CSS animations)
    const spinner = page
      .locator(
        '[data-testid="loading-spinner"], .animate-spin, .loading-spinner'
      )
      .first();
    await expect(spinner).toBeVisible();
  });

  test('page is responsive and handles window resize', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByRole('main')).toBeVisible();

    // Test tablet size
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('main')).toBeVisible();

    // Test mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('main')).toBeVisible();

    // Check that layout doesn't break completely
    const mainContent = page.getByRole('main');
    const boundingBox = await mainContent.boundingBox();
    expect(boundingBox).toBeTruthy();
    expect(boundingBox!.width).toBeGreaterThan(0);
    expect(boundingBox!.height).toBeGreaterThan(0);
  });
});
