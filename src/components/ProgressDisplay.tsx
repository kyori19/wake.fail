'use client';

import clsx from 'clsx';
import type { TimePeriod, ProgressTheme } from '../lib/types';
import { getThemeClasses } from '../lib/theme-utils';

interface ProgressDisplayProps {
  timePeriod: TimePeriod;
  progress: number;
  isComplete: boolean;
  showSecondary: boolean;
  theme: ProgressTheme;
  onClick?: () => void;
  isInteractive?: boolean;
  isLayoutBroken?: boolean;
}

export const ProgressDisplay = ({ timePeriod, progress, isComplete, showSecondary, theme, onClick, isInteractive, isLayoutBroken }: ProgressDisplayProps) => {
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
  const themeClasses = getThemeClasses(theme, isComplete);
  
  return (
    <div 
      className={clsx(
        "w-full overflow-hidden",
        themeClasses.container,
        themeClasses.height,
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
          'transition-all duration-100 ease-out',
          themeClasses.bar,
          themeClasses.height,
          {
            'animate-pulse': isLayoutBroken,
          }
        )}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};
