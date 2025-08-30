'use client';

import clsx from 'clsx';
import type { TimePeriod } from '../lib/types';

interface MessageDisplayProps {
  timePeriod: TimePeriod;
  message: string;
}

export const MessageDisplay = ({ timePeriod, message }: MessageDisplayProps) => {
  return (
    <p className={clsx(
      'text-center text-sm font-mono',
      {
        'text-gray-300': timePeriod === 'lateNight',
        'text-red-600 dark:text-red-400': timePeriod === 'mondayMorning',
        'text-green-600 dark:text-green-400': timePeriod === 'fridayAfternoon',
        'text-gray-600 dark:text-gray-400': timePeriod !== 'lateNight' && timePeriod !== 'mondayMorning' && timePeriod !== 'fridayAfternoon'
      }
    )}>
      {message}
    </p>
  );
};
