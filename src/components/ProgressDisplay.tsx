'use client';

import clsx from 'clsx';
import type { TimePeriod } from '../lib/types';

interface ProgressDisplayProps {
  timePeriod: TimePeriod;
  progress: number;
  isComplete: boolean;
  showSecondary: boolean;
  onClick?: () => void;
  isInteractive?: boolean;
  isLayoutBroken?: boolean;
}

export const ProgressDisplay = ({ timePeriod, progress, isComplete, showSecondary, onClick, isInteractive, isLayoutBroken }: ProgressDisplayProps) => {
  if (timePeriod === 'lateNight') {
    // Special late night display with pulsing zZz
    return (
      <div className="text-center">
        <div className="text-4xl font-mono animate-pulse">
          zZz...
        </div>
      </div>
    );
  }

  if (timePeriod === 'aprilFools' && isComplete && !showSecondary) {
    // April Fools instant load
    return (
      <div className="text-center">
        <div className="text-2xl font-bold text-green-500">
          ✓ Complete!
        </div>
      </div>
    );
  }

  // Regular progress bar
  return (
    <div 
      className={clsx(
        "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden",
        {
          "cursor-pointer": isInteractive,
          "transform rotate-1 scale-110": isLayoutBroken,
          "transition-all duration-1000": isLayoutBroken
        }
      )}
      onClick={onClick}
      title={isInteractive ? "Click to help wake up the system!" : undefined}
    >
      <div 
        className={clsx(
          'h-4 rounded-full transition-all duration-100 ease-out',
          {
            'bg-green-500': timePeriod === 'fridayAfternoon',
            'bg-red-400': timePeriod === 'mondayMorning',
            'bg-blue-500': timePeriod !== 'fridayAfternoon' && timePeriod !== 'mondayMorning',
            'animate-pulse': isLayoutBroken,
          }
        )}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};
