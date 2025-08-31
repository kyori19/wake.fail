import type { TimePeriod, ProgressConfig } from './types';
import { getRandomTheme } from './theme-utils';

/**
 * Configuration for different time periods
 */
export const getProgressConfig = (period: TimePeriod): ProgressConfig => {
  // Get a random theme for this session
  const theme = getRandomTheme();
  
  switch (period) {
    case 'mondayMorning':
      return {
        speed: 0.0005, // Very slow
        initialProgress: 5, // Start much lower
        message: ['Ugh, Monday... 😩', 'Need more coffee. ☕️', 'Why is this taking so long?'][Math.floor(Math.random() * 3)],
        theme,
      };
    case 'fridayAfternoon':
      return {
        speed: 0.05, // Very fast initially
        initialProgress: 95, // Jump to near completion
        message: 'Almost weekend!',
        secondaryMessage: 'Just one more email... 📧',
        theme,
      };
    case 'lateNight':
      return {
        speed: 0.001, // Slow pulsing
        initialProgress: 20,
        message: 'The server is sleeping. 😴',
        isPulsing: true,
        theme,
      };
    case 'aprilFools':
      return {
        speed: 1, // Instant
        initialProgress: 100,
        message: 'Hello World!',
        secondaryMessage: 'April Fools! 😉',
        theme,
      };
    default:
      return {
        speed: 0.002,
        initialProgress: 47,
        message: 'Loading...',
        theme,
      };
  }
};
