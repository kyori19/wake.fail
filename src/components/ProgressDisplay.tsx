'use client';

import { useState } from 'react';
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

export const ProgressDisplay = ({
  timePeriod,
  progress,
  isComplete,
  showSecondary,
  theme,
  onClick,
  isInteractive,
  isLayoutBroken,
}: ProgressDisplayProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clickRipple, setClickRipple] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
      // Trigger click ripple effect
      setClickRipple(true);
      setTimeout(() => setClickRipple(false), 300);
    }
  };
  if (timePeriod === 'lateNight') {
    // Special late night display with pulsing zZz
    return (
      <div className="text-center">
        <div className="text-4xl font-mono animate-pulse transition-all duration-1000">
          zZz...
        </div>
      </div>
    );
  }

  if (timePeriod === 'aprilFools' && isComplete && !showSecondary) {
    // April Fools instant load
    return (
      <div className="text-center">
        <div className="text-2xl font-bold text-green-500 animate-bounce">
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
        'w-full overflow-hidden relative transition-all duration-300 ease-in-out',
        themeClasses.container,
        themeClasses.height,
        {
          'cursor-pointer': isInteractive,
          'transform rotate-1 scale-110': isLayoutBroken,
          'transition-all duration-1000': isLayoutBroken,
          // Hover effects for interactive progress bars
          'hover:shadow-md hover:scale-[1.02]':
            isInteractive && !isLayoutBroken,
          'active:scale-[0.98]': isInteractive && !isLayoutBroken,
          // Click ripple effect
          "after:content-[''] after:absolute after:inset-0 after:bg-white after:opacity-20 after:animate-pulse":
            clickRipple && isInteractive,
        }
      )}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Loading progress: ${Math.round(progress)}%`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title={isInteractive ? 'Click to help wake up the system!' : undefined}
    >
      <div
        className={clsx(
          'transition-all duration-500 ease-out relative overflow-hidden',
          themeClasses.bar,
          themeClasses.height,
          {
            'animate-pulse': isLayoutBroken,
            // Subtle glow effect on hover for interactive bars
            'shadow-lg': isHovered && isInteractive && !isLayoutBroken,
            // Enhanced progress animation
            'duration-700': !isLayoutBroken,
          }
        )}
        style={{
          width: `${Math.min(100, Math.max(0, progress))}%`,
          // Add subtle glow on hover
          ...(isHovered && isInteractive && !isLayoutBroken
            ? {
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
              }
            : {}),
        }}
      >
        {/* Shimmer effect for visual polish */}
        {isInteractive && !isLayoutBroken && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-progress-shimmer"
            style={{
              transform: isHovered ? 'translateX(-100%)' : 'translateX(100%)',
              transition: 'transform 1s ease-in-out',
            }}
          />
        )}
      </div>
    </div>
  );
};
