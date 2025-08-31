import { getRandomTheme, getThemeClasses } from '../../../src/lib/theme-utils';
import { ProgressTheme } from '../../../src/lib/types';

describe('theme-utils', () => {
  describe('getRandomTheme', () => {
    it('should return a valid theme', () => {
      const validThemes: ProgressTheme[] = [
        'windowsXP',
        'macOS',
        'retro',
        'windows98',
      ];
      const theme = getRandomTheme();
      expect(validThemes).toContain(theme);
    });

    it('should return a string', () => {
      const theme = getRandomTheme();
      expect(typeof theme).toBe('string');
    });

    it('should potentially return different themes across multiple calls', () => {
      // Since it's random, we'll call it many times and check if we get variety
      // This test has a very small chance of failing due to randomness
      const themes = new Set();
      for (let i = 0; i < 50; i++) {
        themes.add(getRandomTheme());
      }
      // We should get at least 2 different themes in 50 calls
      expect(themes.size).toBeGreaterThan(1);
    });
  });

  describe('getThemeClasses', () => {
    it('should return theme classes for windowsXP theme', () => {
      const classes = getThemeClasses('windowsXP');
      expect(classes).toHaveProperty('container');
      expect(classes).toHaveProperty('bar');
      expect(classes).toHaveProperty('height');
      expect(classes.container).toContain('bg-blue-100');
      expect(classes.bar).toContain('bg-gradient-to-r');
      expect(classes.height).toBe('h-6');
    });

    it('should return different bar classes when complete for windowsXP', () => {
      const normalClasses = getThemeClasses('windowsXP', false);
      const completeClasses = getThemeClasses('windowsXP', true);

      expect(normalClasses.bar).not.toBe(completeClasses.bar);
      expect(completeClasses.bar).toContain('green');
      expect(normalClasses.bar).toContain('blue');
    });

    it('should return theme classes for macOS theme', () => {
      const classes = getThemeClasses('macOS');
      expect(classes.container).toContain('bg-gray-200');
      expect(classes.container).toContain('rounded-full');
      expect(classes.height).toBe('h-3');
    });

    it('should return theme classes for retro theme', () => {
      const classes = getThemeClasses('retro');
      expect(classes.container).toContain('bg-black');
      expect(classes.container).toContain('border-green-500');
      expect(classes.bar).toContain('font-mono');
      expect(classes.height).toBe('h-5');
    });

    it('should return theme classes for windows98 theme', () => {
      const classes = getThemeClasses('windows98');
      expect(classes.container).toContain('bg-gray-300');
      expect(classes.container).toContain('border-2');
      expect(classes.height).toBe('h-6');
    });

    it('should return fallback classes for unknown theme', () => {
      const classes = getThemeClasses('unknown' as ProgressTheme);
      expect(classes.container).toContain('bg-gray-200');
      expect(classes.bar).toContain('bg-blue-500');
      expect(classes.height).toBe('h-4');
    });

    it('should handle isComplete parameter correctly for all themes', () => {
      const themes: ProgressTheme[] = [
        'windowsXP',
        'macOS',
        'retro',
        'windows98',
      ];

      themes.forEach(theme => {
        const normalClasses = getThemeClasses(theme, false);
        const completeClasses = getThemeClasses(theme, true);

        // Container should be the same
        expect(normalClasses.container).toBe(completeClasses.container);
        expect(normalClasses.height).toBe(completeClasses.height);

        // Bar classes should be different when complete
        expect(normalClasses.bar).not.toBe(completeClasses.bar);
        // Complete bars should contain green color
        expect(completeClasses.bar).toMatch(/green/);
      });
    });

    it('should default isComplete to false when not provided', () => {
      const defaultClasses = getThemeClasses('macOS');
      const explicitFalseClasses = getThemeClasses('macOS', false);

      expect(defaultClasses).toEqual(explicitFalseClasses);
    });
  });
});
