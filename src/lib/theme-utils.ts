import type { ProgressTheme } from './types';

const THEMES: ProgressTheme[] = ['windowsXP', 'macOS', 'retro', 'windows98'];

/**
 * Randomly select a progress bar theme for this session
 */
export const getRandomTheme = (): ProgressTheme => {
  return THEMES[Math.floor(Math.random() * THEMES.length)];
};

/**
 * Get theme-specific CSS classes for progress bar
 */
export const getThemeClasses = (
  theme: ProgressTheme,
  isComplete: boolean = false
) => {
  switch (theme) {
    case 'windowsXP':
      return {
        container:
          'bg-blue-100 border-2 border-blue-300 rounded-sm shadow-inner',
        bar: isComplete
          ? 'bg-gradient-to-r from-green-400 to-green-500 rounded-sm'
          : 'bg-gradient-to-r from-blue-400 to-blue-600 rounded-sm',
        height: 'h-6',
      };

    case 'macOS':
      return {
        container: 'bg-gray-200 dark:bg-gray-700 rounded-full shadow-sm',
        bar: isComplete
          ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full shadow-sm'
          : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-sm',
        height: 'h-3',
      };

    case 'retro':
      return {
        container: 'bg-black border border-green-500 font-mono',
        bar: isComplete
          ? 'bg-green-400 font-mono relative before:content-[""] before:absolute before:inset-0 before:bg-green-300 before:animate-pulse'
          : 'bg-green-500 font-mono relative before:content-[""] before:absolute before:inset-0 before:bg-green-400 before:animate-pulse',
        height: 'h-5',
      };

    case 'windows98':
      return {
        container:
          'bg-gray-300 border-2 border-t-white border-l-white border-r-gray-600 border-b-gray-600',
        bar: isComplete
          ? 'bg-gradient-to-b from-green-300 to-green-600 border-r border-b border-green-700'
          : 'bg-gradient-to-b from-blue-300 to-blue-600 border-r border-b border-blue-700',
        height: 'h-6',
      };

    default:
      // Fallback to current default styling
      return {
        container: 'bg-gray-200 dark:bg-gray-700 rounded-full',
        bar: 'bg-blue-500 rounded-full',
        height: 'h-4',
      };
  }
};
