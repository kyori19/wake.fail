'use client';

import { useState } from 'react';
import clsx from 'clsx';
import type { TimePeriod } from '../lib/types';

interface LoadingSpinnerProps {
  timePeriod: TimePeriod;
  isCursorIdle?: boolean;
  isLayoutBroken?: boolean;
}

export const LoadingSpinner = ({ timePeriod, isCursorIdle, isLayoutBroken }: LoadingSpinnerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (timePeriod === 'lateNight') {
    return null; // No spinner during late night
  }

  return (
    <div 
      className={clsx(
        'rounded-full h-8 w-8 border-b-2 transition-all duration-300 ease-in-out',
        {
          'border-green-500': timePeriod === 'fridayAfternoon' && !isLayoutBroken,
          'border-red-500': (timePeriod === 'mondayMorning' || isLayoutBroken),
          'border-blue-500': timePeriod !== 'fridayAfternoon' && timePeriod !== 'mondayMorning' && !isLayoutBroken,
          // Only animate if cursor is NOT idle
          'animate-spin': !isCursorIdle && !isLayoutBroken,
          // Layout breakage effects
          'animate-bounce': isLayoutBroken,
          'border-4': isLayoutBroken,
          // Hover effects
          'hover:scale-110 hover:shadow-lg': !isLayoutBroken && !isCursorIdle,
          'cursor-pointer': !isCursorIdle && !isLayoutBroken,
          // Enhanced visual feedback
          'drop-shadow-md': isHovered && !isLayoutBroken,
        }
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        // Add subtle glow effect on hover
        ...(isHovered && !isLayoutBroken ? {
          filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))'
        } : {})
      }}
    />
  );
};
