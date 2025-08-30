'use client';

import type { TimePeriod } from '../lib/types';

interface MessageDisplayProps {
  timePeriod: TimePeriod;
  message: string;
}

export const MessageDisplay = ({ timePeriod, message }: MessageDisplayProps) => {
  return (
    <p className={`text-center text-sm font-mono ${
      timePeriod === 'lateNight' ? 'text-gray-300' :
      timePeriod === 'mondayMorning' ? 'text-red-600 dark:text-red-400' :
      timePeriod === 'fridayAfternoon' ? 'text-green-600 dark:text-green-400' :
      'text-gray-600 dark:text-gray-400'
    }`}>
      {message}
    </p>
  );
};