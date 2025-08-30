'use client';

import clsx from 'clsx';
import type { TimePeriod } from '../lib/types';

interface LoadingSpinnerProps {
  timePeriod: TimePeriod;
  isCursorIdle?: boolean;
  isLayoutBroken?: boolean;
}

export const LoadingSpinner = ({ timePeriod, isCursorIdle, isLayoutBroken }: LoadingSpinnerProps) => {
  if (timePeriod === 'lateNight') {
    return null; // No spinner during late night
  }

  return (
    <div className={clsx(
      'rounded-full h-8 w-8 border-b-2',
      {
        'border-green-500': timePeriod === 'fridayAfternoon' && !isLayoutBroken,
        'border-red-500': (timePeriod === 'mondayMorning' || isLayoutBroken),
        'border-blue-500': timePeriod !== 'fridayAfternoon' && timePeriod !== 'mondayMorning' && !isLayoutBroken,
        // Only animate if cursor is NOT idle
        'animate-spin': !isCursorIdle && !isLayoutBroken,
        // Layout breakage effects
        'animate-bounce': isLayoutBroken,
        'border-4': isLayoutBroken,
      }
    )}></div>
  );
};
