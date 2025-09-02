import {
  ASCII_ART,
  displayAsciiArt,
  displayRandomAsciiArt,
} from '../../../src/lib/ascii-art';

// Mock console.log to track calls
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

describe('ascii-art', () => {
  afterEach(() => {
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  describe('ASCII_ART', () => {
    it('should contain expected ASCII art keys', () => {
      const expectedKeys = ['FAIL', 'SLEEPING', 'WAKE', 'LOADING'];

      expectedKeys.forEach(key => {
        expect(ASCII_ART).toHaveProperty(key);
        expect(typeof ASCII_ART[key as keyof typeof ASCII_ART]).toBe('string');
        expect(ASCII_ART[key as keyof typeof ASCII_ART].length).toBeGreaterThan(
          0
        );
      });
    });

    it('should have non-empty ASCII art strings', () => {
      Object.values(ASCII_ART).forEach(art => {
        expect(art.trim().length).toBeGreaterThan(0);
        // ASCII art should contain visual characters
        expect(art).toMatch(/[█╗╔╝═║]/);
      });
    });
  });

  describe('displayAsciiArt', () => {
    it('should display ASCII art with default color', () => {
      displayAsciiArt('FAIL');

      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
      const [firstArg, secondArg] = mockConsoleLog.mock.calls[0];

      expect(firstArg).toContain(ASCII_ART.FAIL);
      expect(firstArg).toMatch(/^%c/); // Should start with %c for styling
      expect(secondArg).toContain('color: #ff6b6b'); // Default color
      expect(secondArg).toContain("font-family: 'Courier New'");
    });

    it('should display ASCII art with custom color', () => {
      const customColor = '#00ff00';
      displayAsciiArt('WAKE', customColor);

      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
      const [firstArg, secondArg] = mockConsoleLog.mock.calls[0];

      expect(firstArg).toContain(ASCII_ART.WAKE);
      expect(secondArg).toContain(`color: ${customColor}`);
    });

    it('should handle all ASCII art keys', () => {
      const keys = Object.keys(ASCII_ART) as Array<keyof typeof ASCII_ART>;

      keys.forEach(key => {
        mockConsoleLog.mockClear();
        displayAsciiArt(key);

        expect(mockConsoleLog).toHaveBeenCalledTimes(1);
        const [firstArg] = mockConsoleLog.mock.calls[0];
        expect(firstArg).toContain(ASCII_ART[key]);
      });
    });

    it('should include proper styling in console call', () => {
      displayAsciiArt('LOADING');

      const [, styleArg] = mockConsoleLog.mock.calls[0];
      expect(styleArg).toContain("font-family: 'Courier New'");
      expect(styleArg).toContain('monospace');
      expect(styleArg).toContain('font-size: 12px');
      expect(styleArg).toContain('line-height: 1.2');
    });
  });

  describe('displayRandomAsciiArt', () => {
    it('should display some ASCII art', () => {
      displayRandomAsciiArt();

      expect(mockConsoleLog).toHaveBeenCalledTimes(1);
      const [firstArg, secondArg] = mockConsoleLog.mock.calls[0];

      expect(firstArg).toMatch(/^%c/);
      expect(secondArg).toContain('color:');
      expect(secondArg).toContain("font-family: 'Courier New'");
    });

    it('should use one of the predefined colors', () => {
      const expectedColors = [
        '#ff6b6b',
        '#4ecdc4',
        '#45b7d1',
        '#96ceb4',
        '#ffd93d',
      ];

      displayRandomAsciiArt();

      const [, styleArg] = mockConsoleLog.mock.calls[0];
      const hasExpectedColor = expectedColors.some(color =>
        styleArg.includes(`color: ${color}`)
      );
      expect(hasExpectedColor).toBe(true);
    });

    it('should display one of the ASCII art pieces', () => {
      displayRandomAsciiArt();

      const [firstArg] = mockConsoleLog.mock.calls[0];
      const asciiValues = Object.values(ASCII_ART);
      const hasExpectedArt = asciiValues.some(art => firstArg.includes(art));
      expect(hasExpectedArt).toBe(true);
    });

    it('should potentially display different art on multiple calls', () => {
      const results = new Set();

      // Call multiple times to check randomness
      for (let i = 0; i < 10; i++) {
        mockConsoleLog.mockClear();
        displayRandomAsciiArt();
        const [firstArg] = mockConsoleLog.mock.calls[0];
        results.add(firstArg);
      }

      // With 4 different ASCII arts and 10 calls, we should get some variety
      // This test has a very small chance of failing due to randomness
      expect(results.size).toBeGreaterThan(1);
    });
  });
});
