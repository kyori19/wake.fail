'use client';

import type { TimePeriod } from '../lib/types';

interface LoadingSpinnerProps {
  timePeriod: TimePeriod;
}

export const LoadingSpinner = ({ timePeriod }: LoadingSpinnerProps) => {
  if (timePeriod === 'lateNight') {
    return null; // No spinner during late night
  }

  return (
    <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
      timePeriod === 'fridayAfternoon' ? 'border-green-500' :
      timePeriod === 'mondayMorning' ? 'border-red-500' :
      'border-blue-500'
    }`}></div>
  );
};