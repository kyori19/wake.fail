import type { TimePeriod } from './types';

/**
 * Determines the current time period based on local date and time
 */
export const getTimePeriod = (): TimePeriod => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday
  const hour = now.getHours();
  const month = now.getMonth(); // 0 = January, 3 = April
  const date = now.getDate();

  // April Fools' Day (April 1st) takes priority
  if (month === 3 && date === 1) {
    return 'aprilFools';
  }

  // Late night (11 PM to 5 AM)
  if (hour >= 23 || hour < 5) {
    return 'lateNight';
  }

  // Monday morning (6 AM to 11 AM)
  if (day === 1 && hour >= 6 && hour < 11) {
    return 'mondayMorning';
  }

  // Friday afternoon (1 PM to 6 PM)
  if (day === 5 && hour >= 13 && hour < 18) {
    return 'fridayAfternoon';
  }

  return 'normal';
};
