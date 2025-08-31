import { test, expect } from '@playwright/test';

test.describe('wake.fail - Console Functionality', () => {
  
  test('console fake functions are available', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for console gimmicks to load
    await page.waitForTimeout(3000);
    
    // Check that fake functions are available in the global scope
    const helpFunction = await page.evaluate(() => {
      return typeof (window as unknown as { help?: () => string }).help === 'function';
    });
    expect(helpFunction).toBe(true);
    
    const wakeFunction = await page.evaluate(() => {
      return typeof (window as unknown as { wake?: { up: () => boolean } }).wake?.up === 'function';
    });
    expect(wakeFunction).toBe(true);
    
    const coffeeFunction = await page.evaluate(() => {
      return typeof (window as unknown as { coffee?: { inject: () => string } }).coffee?.inject === 'function';
    });
    expect(coffeeFunction).toBe(true);
    
    const systemStatusFunction = await page.evaluate(() => {
      return typeof (window as unknown as { systemStatus?: () => object }).systemStatus === 'function';
    });
    expect(systemStatusFunction).toBe(true);
  });

  test('help() function works correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    const helpResult = await page.evaluate(() => {
      const help = (window as unknown as { help?: () => string }).help;
      if (typeof help === 'function') {
        return help();
      }
      return null;
    });
    
    expect(helpResult).toBeTruthy();
    expect(typeof helpResult).toBe('string');
    expect(helpResult).toContain('TODO'); // The actual return value
  });

  test('wake.up() function works correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    const wakeResult = await page.evaluate(() => {
      const wake = (window as unknown as { wake?: { up: () => boolean } }).wake;
      if (wake && typeof wake.up === 'function') {
        return wake.up();
      }
      return null;
    });
    
    expect(wakeResult).not.toBeNull();
    expect(typeof wakeResult).toBe('boolean');
    expect(wakeResult).toBe(false); // It returns false as it's deprecated
  });

  test('coffee.inject() function works correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    const coffeeResult = await page.evaluate(() => {
      const coffee = (window as unknown as { coffee?: { inject: () => string } }).coffee;
      if (coffee && typeof coffee.inject === 'function') {
        return coffee.inject();
      }
      return null;
    });
    
    expect(coffeeResult).toBeTruthy();
    expect(typeof coffeeResult).toBe('string');
    expect(coffeeResult).toContain('☕');
  });

  test('systemStatus() function works correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    const statusResult = await page.evaluate(() => {
      const systemStatus = (window as unknown as { systemStatus?: () => { status: string; online: boolean } }).systemStatus;
      if (typeof systemStatus === 'function') {
        return systemStatus();
      }
      return null;
    });
    
    expect(statusResult).toBeTruthy();
    expect(typeof statusResult).toBe('object');
    expect(statusResult).toHaveProperty('status');
    expect(statusResult).toHaveProperty('online');
  });

  test('console theater messages appear', async ({ page }) => {
    // Capture console messages
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      consoleMessages.push(msg.text());
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for console theater to start (according to code, it starts after 3 seconds)
    await page.waitForTimeout(5000);
    
    // Check that some console theater messages appeared
    const theaterMessages = consoleMessages.filter(msg => 
      msg.includes('[SYSTEM]') || 
      msg.includes('[AI]') || 
      msg.includes('[ADMIN]') ||
      msg.includes('wake.fail') ||
      msg.includes('help()')
    );
    
    expect(theaterMessages.length).toBeGreaterThan(0);
  });

  test('ASCII art is displayed in console', async ({ page }) => {
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      consoleMessages.push(msg.text());
    });
    
    await page.goto('/?demo=true');
    await page.waitForLoadState('networkidle');
    
    // Switch to Monday to trigger specific ASCII art
    const demoControls = page.locator('.fixed.top-4.left-4');
    const mondayButton = demoControls.getByText('Monday');
    await mondayButton.click();
    
    // Wait for ASCII art to appear
    await page.waitForTimeout(8000);
    
    // Check for ASCII art patterns in console messages
    const asciiMessages = consoleMessages.filter(msg => 
      msg.includes('█') || 
      msg.includes('▓') || 
      msg.includes('▒') ||
      msg.includes('░') ||
      msg.length > 50 && /[^\w\s]/.test(msg) // Long messages with special characters
    );
    
    expect(asciiMessages.length).toBeGreaterThan(0);
  });

  test('panic() function works if available', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    const panicResult = await page.evaluate(() => {
      const panic = (window as unknown as { panic?: () => string }).panic;
      if (typeof panic === 'function') {
        return panic();
      }
      return 'function not available';
    });
    
    // Either the function works or it's not available (both are acceptable)
    expect(panicResult).toBeTruthy();
    if (panicResult !== 'function not available') {
      expect(typeof panicResult).toBe('string');
    }
  });
});