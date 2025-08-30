'use client';

import type { TimePeriod } from '../lib/types';

interface ProgressDisplayProps {
  timePeriod: TimePeriod;
  progress: number;
  isComplete: boolean;
  showSecondary: boolean;
}

export const ProgressDisplay = ({ timePeriod, progress, isComplete, showSecondary }: ProgressDisplayProps) => {
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
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
      <div 
        className={`h-4 rounded-full transition-all duration-100 ease-out ${
          timePeriod === 'fridayAfternoon' ? 'bg-green-500' :
          timePeriod === 'mondayMorning' ? 'bg-red-400' :
          'bg-blue-500'
        }`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};