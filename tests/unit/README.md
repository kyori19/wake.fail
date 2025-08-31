# Unit Tests

This directory contains unit tests for the wake.fail application using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

## Structure

```
tests/unit/
├── lib/           # Tests for utility functions
├── hooks/         # Tests for React hooks  
├── components/    # Tests for React components
└── README.md      # This file
```

## Running Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run only E2E tests (separate from unit tests)
npm run test:e2e
```

## Test Coverage

The unit tests focus on:

### Library Functions (`src/lib/`)
- **time-utils.ts** - Time period detection logic
- **theme-utils.ts** - Progress bar theme utilities  
- **progress-config.ts** - Configuration for different time periods
- **ascii-art.ts** - Console ASCII art utilities

### React Components (`src/components/`)
- **LoadingSpinner.tsx** - Animated loading spinner component

### React Hooks (`src/hooks/`)
- Complex hooks like `useProgressState` may need additional testing
- DOM-heavy hooks like `useFaviconEvolution` are tested via E2E tests

## Writing Tests

### Test Organization
- Place tests in the same directory structure as source files
- Use descriptive test names that explain the expected behavior
- Group related tests using `describe` blocks

### Testing Pure Functions
```typescript
import { getTimePeriod } from '../../../src/lib/time-utils';

describe('getTimePeriod', () => {
  it('should return "normal" for regular times', () => {
    // Mock Date and test logic
  });
});
```

### Testing React Components
```typescript
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../../../src/components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render with correct classes', () => {
    render(<LoadingSpinner timePeriod="normal" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });
});
```

### Testing React Hooks
```typescript
import { renderHook } from '@testing-library/react';
import { useCustomHook } from '../../../src/hooks/useCustomHook';

describe('useCustomHook', () => {
  it('should return expected initial state', () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current.value).toBe(expectedValue);
  });
});
```

## Configuration

- **jest.config.js** - Jest configuration with Next.js support
- **jest.setup.js** - Global test setup and mocks
- Tests are configured to:
  - Use jsdom environment for DOM testing
  - Exclude E2E test directory (`tests/e2e/`)
  - Support TypeScript and module path mapping
  - Mock common browser APIs

## Best Practices

1. **Test Behavior, Not Implementation** - Focus on what the function/component does, not how it does it
2. **Use Descriptive Test Names** - Test names should explain the expected behavior
3. **Mock External Dependencies** - Use Jest mocks for external APIs, timers, etc.
4. **Test Edge Cases** - Include tests for error conditions and boundary values
5. **Keep Tests Simple** - Each test should verify one specific behavior
6. **Use Test Data Builders** - Create helper functions for complex test data

## Mocking Strategies

### Time-based Tests
```typescript
// Mock Date for predictable time-based tests
const mockDate = (year, month, date, hour, day) => {
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
};
```

### Console Tests
```typescript
// Mock console methods
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
```

### DOM APIs
```typescript
// Mock DOM APIs not available in jsdom
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({ matches: false })),
});
```

## Integration with E2E Tests

Unit tests complement the existing E2E tests:
- **Unit tests** verify individual functions and components in isolation
- **E2E tests** verify complete user workflows and browser interactions
- Both test suites run independently and serve different purposes

## Adding New Tests

When adding new functionality:

1. Create unit tests for new utility functions in `src/lib/`
2. Test React components focusing on props and user interactions
3. Consider whether complex integration scenarios need E2E test coverage
4. Update this README if new testing patterns or tools are introduced