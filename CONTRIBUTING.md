# Contributing to wake.fail

Thank you for your interest in contributing to wake.fail! This document provides detailed guidelines for contributing to this satirical loading screen project.

## 🎯 Project Philosophy

wake.fail is a digital art project that satirizes modern web experiences. Our core principles:

- **Humor First:** Every feature should have an element of humor or surprise
- **Lightweight:** Client-side only, minimal server resources
- **Accessible:** Should work for everyone, including screen reader users
- **Performant:** No feature should significantly impact battery life or performance
- **Surprising:** The best gags are unexpected but delightful

## 🔧 Development Setup

### Prerequisites
- Node.js 18 or later
- Git
- A modern browser for testing
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Local Development

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/wake.fail.git
   cd wake.fail
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Enable Demo Controls**
   - Visit `http://localhost:3000?demo=true`
   - Or press `Ctrl+Shift+D` while on the page
   - Use these controls to test different time periods and behaviors

## 📋 Types of Contributions

### 🕰️ Time-Based Behaviors

Add new behaviors for specific times, dates, or seasons.

**Examples:**
- Valentine's Day: Pink theme with heart emojis
- Halloween: Spooky messages and dark themes
- New Year: Countdown behavior
- User's birthday: Special birthday messages

**Implementation:**
1. Add new time period to `TimePeriod` type in `src/lib/types.ts`
2. Update detection logic in `src/lib/time-utils.ts`
3. Add configuration in `src/lib/progress-config.ts`
4. Add console messages in `src/lib/console-messages.ts`
5. Test with demo controls

### 🎨 Visual Themes

Create new progress bar themes that reference different UI paradigms.

**Existing Themes:**
- Windows XP
- macOS
- Retro terminal
- Windows 98

**Theme Ideas:**
- BeOS
- Classic Mac OS
- Linux terminal
- Mobile iOS/Android
- Gaming console UIs

**Implementation:**
1. Add theme name to `ProgressTheme` type in `src/lib/types.ts`
2. Implement styling in `getThemeClasses()` in `src/lib/theme-utils.ts`
3. Follow existing pattern for responsive design
4. Test across different screen sizes

### 💻 Console Gimmicks

Add interactive developer console features.

**Existing Functions:**
- `help()` - Shows help text
- `wake.up()` - Deprecated function with migration guide
- `coffee.inject()` - Coffee injection simulation
- `systemStatus()` - Random system status
- `ascii()` - Random ASCII art
- `panic()` - Fake emergency mode

**Ideas for New Functions:**
- `reboot()` - Fake system restart
- `diagnostics()` - Fake system diagnostics
- `update()` - Fake software update
- `backup()` - Fake backup process
- `defrag()` - Fake disk defragmentation
- `virus_scan()` - Fake antivirus scan

**Implementation:**
1. Add function to window object in `src/hooks/useConsoleGimmicks.ts`
2. Include proper TypeScript types in the interface
3. Add descriptive help text
4. Test in multiple browsers (Chrome, Firefox, Safari)

### 🎭 ASCII Art

Add new ASCII art pieces for the console.

**Guidelines:**
- Keep under 10 lines tall for readability
- Use standard ASCII characters only
- Test in different console fonts
- Add to `ASCII_ART` object in `src/lib/ascii-art.ts`

### 🤝 Interactive Features

Add new ways for users to interact with the page.

**Existing Interactions:**
- Click to progress
- Mouse movement awareness
- Window resize reactions

**Ideas:**
- Keyboard input detection
- Scroll behavior
- Tab focus/blur effects
- Device orientation changes
- Webcam or microphone detection (with permission)

### 🐛 Bug Fixes

Common areas where bugs occur:
- Timer cleanup in React hooks
- Browser compatibility for newer features
- Edge cases in time period detection
- Performance issues with animations
- Accessibility improvements

## 📝 Code Style Guidelines

### TypeScript
- Use strict TypeScript types
- Prefer interfaces over type aliases for objects
- Add JSDoc comments for complex functions
- Use proper return types for all functions

```typescript
/**
 * Calculates progress increment based on user interaction
 * @param clickCount - Number of times user has clicked
 * @returns Progress increment value between 2-5
 */
const calculateProgressIncrement = (clickCount: number): number => {
  return 2 + Math.random() * 3;
};
```

### React Patterns
- Use functional components with hooks
- Keep components small and focused
- Extract custom hooks for complex logic
- Use proper dependency arrays in useEffect

```typescript
// Good: Custom hook with proper cleanup
const useTimer = (callback: () => void, delay: number) => {
  useEffect(() => {
    const timer = setInterval(callback, delay);
    return () => clearInterval(timer);
  }, [callback, delay]);
};
```

### CSS/Tailwind
- Use Tailwind classes primarily
- Add custom CSS only when necessary
- Respect `prefers-reduced-motion` for animations
- Ensure proper contrast ratios
- Test with zoom levels up to 200%

```typescript
// Good: Responsive and accessible styling
const className = clsx(
  'transition-all duration-300 ease-in-out',
  'hover:scale-105 focus:ring-2 focus:ring-blue-500',
  'motion-reduce:transition-none motion-reduce:hover:scale-100'
);
```

### Performance
- Clean up timers and event listeners
- Use `useCallback` for stable function references
- Avoid creating objects in render loops
- Test with React DevTools Profiler

## 🧪 Testing Guidelines

### Manual Testing Checklist

**Basic Functionality:**
- [ ] Page loads without errors
- [ ] Progress bar animates correctly
- [ ] Messages update appropriately
- [ ] Spinner respects cursor movement
- [ ] Window resize triggers layout breakage
- [ ] Favicon evolves over time

**Time Period Testing:**
- [ ] Test all time periods using demo controls
- [ ] Verify April Fools behavior on April 1st
- [ ] Check Monday morning behavior
- [ ] Test Friday afternoon behavior
- [ ] Verify late night dark theme
- [ ] Confirm normal behavior outside special times

**Console Testing:**
- [ ] All fake functions work in Chrome DevTools
- [ ] Functions work in Firefox Developer Tools
- [ ] Functions work in Safari Web Inspector
- [ ] Console theater messages appear correctly
- [ ] ASCII art displays properly

**Accessibility Testing:**
- [ ] Screen reader announces page correctly
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG guidelines
- [ ] Page works with 200% zoom

**Cross-Browser Testing:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

### Performance Testing
- Use Chrome DevTools Performance tab
- Ensure no memory leaks during long sessions
- Verify CPU usage stays reasonable
- Test on lower-end devices

## 📤 Submitting Changes

### Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the code style guidelines
   - Add proper TypeScript types
   - Test thoroughly
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   npm run lint
   npm run build
   npm run start  # Test production build
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of your change"
   ```

   **Commit Message Format:**
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for improvements to existing features
   - `Docs:` for documentation changes
   - `Style:` for formatting changes

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### PR Template

When creating a pull request, include:

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] New time period behavior
- [ ] New visual theme
- [ ] Console gimmick/function
- [ ] Bug fix
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested with demo controls
- [ ] Cross-browser tested
- [ ] Accessibility tested
- [ ] Performance impact verified

## Screenshots/Videos
If applicable, add screenshots or videos of your changes.

## Additional Notes
Any additional information about your changes.
```

## 🎉 Recognition

Contributors will be recognized in several ways:
- Listed in README.md credits section
- Mentioned in release notes for significant contributions
- Special thanks in console easter eggs for major features

## ❓ Questions?

- **General Questions:** Open a GitHub Discussion
- **Bug Reports:** Create a GitHub Issue
- **Feature Ideas:** Open a GitHub Issue with the "enhancement" label
- **Security Issues:** Please email security concerns privately

## 🌟 Ideas for Future Contributions

Here are some ideas if you're looking for inspiration:

### Time-Based Features
- Seasonal themes (Spring, Summer, Fall, Winter)
- Holiday-specific behaviors
- Time zone awareness
- Lunar phase detection

### Interactive Features
- Konami code easter egg
- Multi-touch gestures on mobile
- Gamepad input detection
- Voice command recognition

### Visual Enhancements
- CSS animation improvements
- Particle effects
- More progress bar themes
- Dynamic background patterns

### Developer Tools
- Better debugging console commands
- Performance monitoring functions
- Memory usage display
- Network simulation commands

### Accessibility
- High contrast mode
- Reduced motion respect
- Screen reader optimizations
- Keyboard navigation improvements

Remember: The best contributions are the ones that make someone smile while they're waiting for something that will never load! 😄