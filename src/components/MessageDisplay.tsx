'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import type { TimePeriod } from '../lib/types';

interface MessageDisplayProps {
  timePeriod: TimePeriod;
  message: string;
}

export const MessageDisplay = ({
  timePeriod,
  message,
}: MessageDisplayProps) => {
  const [displayMessage, setDisplayMessage] = useState(message);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (message !== displayMessage) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayMessage(message);
        setIsTransitioning(false);
      }, 150); // Half of transition duration

      return () => clearTimeout(timer);
    }
  }, [message, displayMessage]);

  return (
    <div className="min-h-[1.5rem] flex items-center justify-center">
      <p
        className={clsx(
          'text-center text-sm font-mono transition-all duration-300 ease-in-out',
          {
            'text-gray-300': timePeriod === 'lateNight',
            'text-red-600 dark:text-red-400': timePeriod === 'mondayMorning',
            'text-green-600 dark:text-green-400':
              timePeriod === 'fridayAfternoon',
            'text-gray-600 dark:text-gray-400':
              timePeriod !== 'lateNight' &&
              timePeriod !== 'mondayMorning' &&
              timePeriod !== 'fridayAfternoon',
            // Transition effects
            'opacity-0 translate-y-1': isTransitioning,
            'opacity-100 translate-y-0': !isTransitioning,
          }
        )}
      >
        {displayMessage}
      </p>
    </div>
  );
};
