# E2E Tests

This directory contains end-to-end tests for the wake.fail application using [Playwright](https://playwright.dev).

## Test Suites

### Basic Functionality (`basic-functionality.spec.ts`)
- Page loads without errors
- Progress bar is visible and animates
- Messages are displayed and update
- Loading spinner is visible
- Page is responsive and handles window resize

### Demo Controls & Time Periods (`demo-controls.spec.ts`)
- Demo controls can be toggled with keyboard shortcut (Ctrl+Shift+D)
- Demo controls are visible with URL parameter (?demo=true)
- Can switch between different time periods
- Late night mode applies dark theme
- Friday afternoon shows near-completion behavior
- April Fools shows initial completion then drops
- Monday morning shows specific behavior

### Console Functionality (`console-functionality.spec.ts`)
- Console fake functions are available
- help() function works correctly
- wake.up() function works correctly (returns false as deprecated)
- coffee.inject() function works correctly
- systemStatus() function works correctly
- Console theater messages appear
- ASCII art is displayed in console
- panic() function works if available

### Interactive Features (`interactive-features.spec.ts`)
- Progress bar responds to clicks
- Cursor idle detection works
- Window resize triggers layout effects
- Favicon evolution works
- Keyboard accessibility works
- Progress regression occurs when not clicking
- Multiple clicks increase progress and update messages

## Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (with browser UI)
npm run test:headed

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run specific test file
npx playwright test tests/e2e/basic-functionality.spec.ts

# Run tests in specific browser
npx playwright test --project chromium
npx playwright test --project firefox
npx playwright test --project webkit
```

## Test Configuration

Tests are configured in `playwright.config.ts` and include:
- Cross-browser testing (Chromium, Firefox, WebKit)
- Mobile browser testing (Chrome Mobile, Safari Mobile)
- Automatic dev server startup
- Trace recording on failures
- HTML reporting

## Adding New Tests

When adding new tests:
1. Follow the existing pattern of test organization
2. Use descriptive test names that match the manual testing checklist
3. Use data-testid attributes for reliable element selection
4. Test both positive and negative cases
5. Consider different time periods and demo modes
6. Add accessibility checks where appropriate