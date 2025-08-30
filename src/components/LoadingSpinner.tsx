'use client';

import clsx from 'clsx';
import type { TimePeriod } from '../lib/types';

interface LoadingSpinnerProps {
  timePeriod: TimePeriod;
}

export const LoadingSpinner = ({ timePeriod }: LoadingSpinnerProps) => {
  if (timePeriod === 'lateNight') {
    return null; // No spinner during late night
  }

  return (
    <div className={clsx(
      'animate-spin rounded-full h-8 w-8 border-b-2',
      {
        'border-green-500': timePeriod === 'fridayAfternoon',
        'border-red-500': timePeriod === 'mondayMorning',
        'border-blue-500': timePeriod !== 'fridayAfternoon' && timePeriod !== 'mondayMorning'
      }
    )}></div>
  );
};
