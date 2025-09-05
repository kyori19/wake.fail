# wake.fail

**A Site That Never Fully Loads**

A meta joke site and digital art project that satirizes the modern web experience of endless loading screens. The site's core concept is expressed by its domain name: it's a page that perpetually fails to wake up.

![wake.fail demo](https://github.com/user-attachments/assets/70412403-3fcc-49e9-b4fb-fc0acd415099)

This project is designed to be **extremely lightweight and serverless-friendly**. All animations, logic, and gags are handled **client-side** in JavaScript. The server's only job is to deliver the initial HTML, CSS, and JS files once. This ensures near-zero running costs and no wasted server-side resources, no matter how long a user stays on the page.

## ✨ Features

### 1. Dynamic & Themed Experience 🕰️

The site feels "alive" by changing its behavior and messages based on the user's local time and date.

- **Monday Morning (6 AM - 11 AM):** The progress bar moves excruciatingly slowly, displaying messages like "Ugh, Monday... 😩" or "Need more coffee. ☕️"
- **Friday Afternoon (1 PM - 6 PM):** The bar quickly jumps to 99.9% with an "Almost weekend!" message, then freezes, changing to "Just one more email... 📧"
- **Late Night (11 PM - 5 AM):** The site switches to a dark theme. The progress bar moves slowly with the message "The server is sleeping. 😴"
- **April Fools' Day:** For one day only, the site loads instantly to a "Hello World!" page, only to revert to the infinite loading screen a second later with an "April Fools! 😉" message

### 2. Interactive Elements 🖱️

The site playfully responds to user actions, turning frustration into a small game.

- **Click to Progress:** Each click nudges the progress bar forward slightly (2-5%), but it slowly regresses if the user stops clicking. Messages encourage interaction: "Help me wake up by clicking! 👆"
- **Cursor Awareness:** The loading spinner only animates when the mouse cursor is moving. When it stops, the animation freezes, and a message like "Are you still there? 👀" appears
- **Responsive Breakage:** Resizing the browser window intentionally messes up the layout for 2 seconds, triggering humorous fake errors in the console:
  ```
  🚨 CRITICAL ERROR: Window resize detected! Layout integrity compromised!
  📐 Dimensions unstable: Expected 1024x768, got 1920x1080
  🔧 Attempting to restore... please stand by...
  ✅ Layout restored. Crisis averted... for now.
  ```

### 3. Developer Console Gimmicks 💻

A collection of easter eggs for those who open the developer tools (F12).

#### Console Theater

A timed script prints fake conversations between a sysadmin and a stubborn AI:

```
[SYSTEM] Initializing wake sequence...
[AI] Good morning! Attempting to establish connection...
[ADMIN] System status: PARTIALLY_AWAKE
[AI] I'm detecting some resistance in the wake-up protocols.
[ADMIN] Override command: wake.up()
[ERROR] Function wake.up() is deprecated. Use coffee.inject() instead.
[AI] I'm sorry, I can't do that right now. Have you tried turning it off and on again?
```

#### Interactive Console Functions

The console includes several fake functions users can actually call:

- **`help()`** - Returns `"// TODO: Implement help function"`
- **`wake.up()`** - Shows deprecation warning: `"ERROR: Function wake.up() is deprecated since version 2.1.0. Use coffee.inject() instead"`
- **`coffee.inject()`** - Simulates coffee injection with progress messages
- **`systemStatus()`** - Returns random system status like `BARELY_FUNCTIONING`, `COFFEE_DEPRIVED`, etc.
- **`ascii()`** - Displays random ASCII art in the console
- **`panic()`** - Shows fake emergency alerts then reveals it's just a joke

#### ASCII Art

Large ASCII art of words like `FAIL`, `SLEEPING`, `WAKE`, and `LOADING` displayed in random colors.

### 4. Visual Polish 🎨

Subtle visual cues that enhance the experience without requiring complex assets.

#### Evolving Favicon

The page's favicon (browser tab icon) evolves over time:

- 😊 (initial, happy)
- 😐 (neutral after 10 seconds)
- 😒 (annoyed after 20 seconds)
- 😴 (sleeping after 30 seconds)

#### Randomized Progress Bar Themes

Each page reload randomly selects a different theme:

- **Windows XP:** Blue gradient with XP-style borders
- **macOS:** Sleek rounded progress bar with subtle shadows
- **Retro:** Green-on-black terminal style with pulsing effects
- **Windows 98:** Classic 3D beveled appearance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/kyori19/wake.fail.git
cd wake.fail

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Demo Controls

For testing and demonstration purposes, you can access special demo controls:

1. **Keyboard Shortcut:** Press `Ctrl+Shift+D` to toggle demo controls
2. **URL Parameter:** Add `?demo=true` to the URL to automatically show controls

The demo controls allow you to manually switch between different time periods to test all the behaviors without waiting for the actual time conditions.

## 🛠️ Development

### Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── page.tsx           # Main page component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ProgressDisplay.tsx    # Progress bar with theme support
│   ├── MessageDisplay.tsx     # Dynamic messages
│   ├── LoadingSpinner.tsx     # Animated spinner
│   └── DemoControls.tsx       # Development demo controls
├── hooks/                 # React hooks
│   ├── useProgressState.ts    # Main state management
│   ├── useConsoleGimmicks.ts  # Console easter eggs
│   └── useFaviconEvolution.ts # Favicon animation
└── lib/                   # Utilities and configuration
    ├── types.ts               # TypeScript types
    ├── time-utils.ts          # Time period detection
    ├── progress-config.ts     # Time-based configurations
    ├── console-messages.ts    # Console theater messages
    ├── ascii-art.ts           # ASCII art definitions
    └── theme-utils.ts         # Progress bar themes
```

### Key Design Principles

1. **Client-Side Only:** Everything runs in the browser - no server-side processing
2. **Lightweight:** Minimal dependencies, optimized for fast loading
3. **Responsive:** Works across different screen sizes and devices
4. **Accessible:** Proper ARIA labels and semantic HTML
5. **Performant:** Efficient timers and event handling to avoid battery drain

### Tech Stack

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS 4
- **TypeScript:** Full type safety
- **Deployment:** Optimized for Vercel and other static hosts

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
npm run format:check # Check code formatting
npm test         # Run unit tests with Jest
npm run test:watch # Run unit tests in watch mode
npm run test:coverage # Run unit tests with coverage
npm run test:e2e # Run end-to-end tests with Playwright
```

### Continuous Integration

The project uses GitHub Actions for automated testing and quality assurance:

#### Code Quality Checks

- **ESLint** for code linting
- **TypeScript** type checking
- **Prettier** code formatting verification

#### Testing

- **Unit Tests** with Jest and React Testing Library
- **E2E Tests** with Playwright against Vercel Preview Deployments
- **Coverage Reports** uploaded to Codecov

#### Dependency Management

- **Renovate** for automated dependency updates
- Grouped updates by technology stack
- Automatic security vulnerability alerts

All checks must pass before merging to the main branch.

## 🎨 Customization

### Adding New Time Periods

1. Add new period to `TimePeriod` type in `src/lib/types.ts`
2. Update detection logic in `src/lib/time-utils.ts`
3. Add configuration in `src/lib/progress-config.ts`
4. Add console messages in `src/lib/console-messages.ts`

### Creating New Themes

1. Add theme name to `ProgressTheme` type in `src/lib/types.ts`
2. Implement theme classes in `src/lib/theme-utils.ts`
3. Update theme selection in `getRandomTheme()` function

### Adding Console Gimmicks

Add new fake functions in `src/hooks/useConsoleGimmicks.ts` following the existing pattern.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Types of Contributions

- **New Time Periods:** Add behavior for holidays, seasons, or special dates
- **Additional Themes:** Create new progress bar visual styles
- **Console Gimmicks:** Add more interactive console functions or ASCII art
- **Performance:** Optimize animations and reduce resource usage
- **Accessibility:** Improve screen reader support and keyboard navigation
- **Bug Fixes:** Fix edge cases or browser compatibility issues

### Development Workflow

1. **Fork** the repository
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Make your changes** following the existing code style
4. **Test thoroughly** across different browsers and time periods
5. **Run quality checks:**
   - `npm run lint` - ESLint checking
   - `npm run format:check` - Code formatting
   - `npx tsc --noEmit` - TypeScript type checking
   - `npm test` - Unit tests
   - `npm run test:e2e` - E2E tests (optional locally)
6. **Build and test:** `npm run build && npm run start`
7. **Commit your changes:** `git commit -m 'Add amazing feature'`
8. **Push to your branch:** `git push origin feature/amazing-feature`
9. **Open a Pull Request**

**Note:** All CI checks (linting, type checking, formatting, and tests) must pass before your PR can be merged.

### Code Style Guidelines

- Use TypeScript for all new code
- Follow the existing component and hook patterns
- Add proper JSDoc comments for new functions
- Use semantic HTML and proper ARIA attributes
- Keep animations performant and respect `prefers-reduced-motion`
- Test console gimmicks across different browsers

### Testing Your Changes

1. Test all time periods using demo controls (`Ctrl+Shift+D`)
2. Verify console functions work in different browsers
3. Check responsive behavior on mobile devices
4. Ensure favicon evolution works correctly
5. Test window resize effects
6. Verify accessibility with screen readers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎭 Credits

Created as a satirical commentary on modern web experiences. Inspired by every loading screen that has ever taken just a little too long.

---

_Remember: The best loading screen is the one that never finishes loading._ 🎯
