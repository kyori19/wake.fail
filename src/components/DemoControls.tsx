'use client';

import { useState, useEffect } from 'react';
import type { TimePeriod } from '../lib/types';

interface DemoControlsProps {
  onTimePeriodChange: (period: TimePeriod | 'auto') => void;
  currentPeriod: TimePeriod;
}

export const DemoControls = ({
  onTimePeriodChange,
  currentPeriod,
}: DemoControlsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod | 'auto'>(
    'auto'
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle demo controls with Ctrl+Shift+D
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    // Also check for demo URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === 'true') {
      setIsVisible(true);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePeriodChange = (period: TimePeriod | 'auto') => {
    setSelectedPeriod(period);
    onTimePeriodChange(period);
  };

  if (!isVisible) {
    return null;
  }

  const periods: Array<{ value: TimePeriod | 'auto'; label: string }> = [
    { value: 'auto', label: 'Auto' },
    { value: 'normal', label: 'Normal' },
    { value: 'mondayMorning', label: 'Monday' },
    { value: 'fridayAfternoon', label: 'Friday' },
    { value: 'lateNight', label: 'Night' },
    { value: 'aprilFools', label: 'April Fools' },
  ];

  return (
    <div className="fixed top-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-xl z-50 min-w-48 transition-all duration-300 ease-in-out animate-in slide-in-from-left-4 fade-in">
      <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Demo Controls
      </h3>
      <div className="flex flex-wrap gap-2">
        {periods.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handlePeriodChange(value)}
            className={`px-3 py-1 text-xs rounded border transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 ${
              selectedPeriod === value
                ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-sm'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Current:{' '}
        <span className="font-mono font-semibold">{currentPeriod}</span>
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
        Ctrl+Shift+D to toggle
      </p>
    </div>
  );
};
