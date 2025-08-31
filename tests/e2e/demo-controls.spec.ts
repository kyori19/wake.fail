import { test, expect } from '@playwright/test';

test.describe('wake.fail - Demo Controls & Time Periods', () => {
  test('demo controls can be toggled with keyboard shortcut', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Demo controls should not be visible initially
    const demoControls = page.locator('.fixed.top-4.left-4');
    await expect(demoControls).not.toBeVisible();

    // Press Ctrl+Shift+D to toggle demo controls
    await page.keyboard.press('Control+Shift+D');

    // Demo controls should now be visible
    await expect(demoControls).toBeVisible();
    await expect(demoControls).toContainText('Demo Controls');

    // Press again to hide
    await page.keyboard.press('Control+Shift+D');
    await expect(demoControls).not.toBeVisible();
  });

  test('demo controls are visible with URL parameter', async ({ page }) => {
    await page.goto('/?demo=true');
    await page.waitForLoadState('networkidle');

    // Demo controls should be visible automatically
    const demoControls = page.locator('.fixed.top-4.left-4');
    await expect(demoControls).toBeVisible();
    await expect(demoControls).toContainText('Demo Controls');
  });

  test('can switch between different time periods using demo controls', async ({
    page,
  }) => {
    await page.goto('/?demo=true');
    await page.waitForLoadState('networkidle');

    const demoControls = page.locator('.fixed.top-4.left-4');
    await expect(demoControls).toBeVisible();

    // Test switching to Monday morning
    const mondayButton = demoControls.getByText('Monday');
    await mondayButton.click();

    // Check current period display
    await expect(demoControls).toContainText('mondayMorning');

    // Test switching to Friday afternoon
    const fridayButton = demoControls.getByText('Friday');
    await fridayButton.click();
    await expect(demoControls).toContainText('fridayAfternoon');

    // Test switching to Night mode
    const nightButton = demoControls.getByText('Night');
    await nightButton.click();
    await expect(demoControls).toContainText('lateNight');

    // Test switching to April Fools
    const aprilFoolsButton = demoControls.getByText('April Fools');
    await aprilFoolsButton.click();
    await expect(demoControls).toContainText('aprilFools');

    // Test switching back to Auto
    const autoButton = demoControls.getByText('Auto');
    await autoButton.click();
    // Should show one of the normal time periods
    const currentPeriod = demoControls.locator('.font-mono.font-semibold');
    await expect(currentPeriod).toBeVisible();
  });

  test('late night mode applies dark theme', async ({ page }) => {
    await page.goto('/?demo=true');
    await page.waitForLoadState('networkidle');

    // Switch to night mode
    const demoControls = page.locator('.fixed.top-4.left-4');
    const nightButton = demoControls.getByText('Night');
    await nightButton.click();

    // Wait for theme change
    await page.waitForTimeout(500);

    // Check for dark background classes or styles
    const hasNightClasses = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      return Array.from(elements).some(
        el =>
          el.className.includes('bg-gray-900') ||
          el.className.includes('text-gray-100') ||
          el.className.includes('dark') ||
          getComputedStyle(el).backgroundColor.includes('rgb(17, 24, 39)') // gray-900
      );
    });

    expect(hasNightClasses).toBe(true);
  });

  test('friday afternoon shows near-completion behavior', async ({ page }) => {
    await page.goto('/?demo=true');
    await page.waitForLoadState('networkidle');

    // Switch to Friday afternoon
    const demoControls = page.locator('.fixed.top-4.left-4');
    const fridayButton = demoControls.getByText('Friday');
    await fridayButton.click();

    // Wait for the Friday behavior to kick in
    await page.waitForTimeout(3000);

    // Check that progress is very high (should be 99.9% according to code)
    const progressBar = page.locator('[role="progressbar"]');
    const progressValue = await progressBar.getAttribute('aria-valuenow');
    const progress = parseFloat(progressValue!);
    expect(progress).toBeGreaterThan(95); // Should be high, allowing some variance
  });

  test('april fools shows initial completion then drops', async ({ page }) => {
    await page.goto('/?demo=true');
    await page.waitForLoadState('networkidle');

    // Switch to April Fools
    const demoControls = page.locator('.fixed.top-4.left-4');
    const aprilFoolsButton = demoControls.getByText('April Fools');
    await aprilFoolsButton.click();

    // Wait for the April Fools behavior (starts at 100%, then drops to 5%)
    await page.waitForTimeout(2000);

    // Check that progress has dropped significantly
    const progressBar = page.locator('[role="progressbar"]');
    const progressValue = await progressBar.getAttribute('aria-valuenow');
    const progress = parseFloat(progressValue!);
    expect(progress).toBeLessThan(50); // Should be around 5%
  });

  test('monday morning shows specific behavior', async ({ page }) => {
    await page.goto('/?demo=true');
    await page.waitForLoadState('networkidle');

    // Switch to Monday morning
    const demoControls = page.locator('.fixed.top-4.left-4');
    const mondayButton = demoControls.getByText('Monday');
    await mondayButton.click();

    // Wait for any Monday-specific behavior to load
    await page.waitForTimeout(1000);

    // Check that the period is correctly set
    await expect(demoControls).toContainText('mondayMorning');

    // The progress and message should be appropriate for Monday morning
    const progressBar = page.locator('[role="progressbar"]');
    await expect(progressBar).toBeVisible();

    const messageDisplay = page
      .locator('[data-testid="message-display"], .text-center')
      .first();
    await expect(messageDisplay).toBeVisible();
  });
});
