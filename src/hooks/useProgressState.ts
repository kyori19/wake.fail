'use client';

import { useState, useEffect } from 'react';
import type { TimePeriod, ProgressState } from '../lib/types';
import { getTimePeriod } from '../lib/time-utils';
import { getProgressConfig } from '../lib/progress-config';

/**
 * Hook for managing progress state and animations
 */
export const useProgressState = (overrideTimePeriod?: TimePeriod): ProgressState => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(() => overrideTimePeriod || getTimePeriod());
  const [progressConfig, setProgressConfig] = useState(() => getProgressConfig(timePeriod));
  const [progress, setProgress] = useState(progressConfig.initialProgress);
  const [message, setMessage] = useState(progressConfig.message);
  const [showSecondary, setShowSecondary] = useState(false);
  const [isComplete, setIsComplete] = useState(timePeriod === 'aprilFools' && progressConfig.initialProgress === 100);

  // Effect to handle time period changes (for demo mode)
  useEffect(() => {
    if (overrideTimePeriod && overrideTimePeriod !== timePeriod) {
      setTimePeriod(overrideTimePeriod);
    }
  }, [overrideTimePeriod, timePeriod]);

  // Effect to update config when time period changes
  useEffect(() => {
    const newConfig = getProgressConfig(timePeriod);
    setProgressConfig(newConfig);
    setProgress(newConfig.initialProgress);
    setMessage(newConfig.message);
    setShowSecondary(false);
    setIsComplete(timePeriod === 'aprilFools' && newConfig.initialProgress === 100);
  }, [timePeriod]);

  useEffect(() => {
    // Special April Fools behavior
    if (timePeriod === 'aprilFools') {
      const timer = setTimeout(() => {
        setProgress(5);
        setMessage(progressConfig.secondaryMessage || 'Loading...');
        setIsComplete(false);
        setShowSecondary(true);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Friday afternoon behavior
    if (timePeriod === 'fridayAfternoon') {
      const timer = setTimeout(() => {
        setProgress(99.9);
        setShowSecondary(true);
        setMessage(progressConfig.secondaryMessage || progressConfig.message);
      }, 2000);
      return () => clearTimeout(timer);
    }

    // Regular progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        // Handle special late night pulsing
        if (timePeriod === 'lateNight' && progressConfig.isPulsing) {
          const time = Date.now() / 1000;
          const pulse = Math.sin(time) * 10 + 50; // Oscillate between 40-60
          return Math.max(20, Math.min(60, pulse));
        }

        // Handle Friday afternoon freeze
        if ((timePeriod as TimePeriod) === 'fridayAfternoon' && prev >= 99.9) {
          return 99.9; // Freeze at 99.9%
        }

        // Asymptotic approach to 100% with configurable speed
        const remaining = 100 - prev;
        const increment = remaining * progressConfig.speed;
        return prev + increment;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [timePeriod, progressConfig]);

  return {
    timePeriod,
    progress,
    message,
    showSecondary,
    isComplete,
    setTimePeriod, // Export setter for demo controls
  };
};

// Export a version with demo controls support
export const useProgressStateWithDemo = () => {
  const [demoTimePeriod, setDemoTimePeriod] = useState<TimePeriod | 'auto'>('auto');
  const actualTimePeriod = demoTimePeriod === 'auto' ? undefined : demoTimePeriod;
  const progressState = useProgressState(actualTimePeriod);

  return {
    ...progressState,
    demoTimePeriod,
    setDemoTimePeriod,
  };
};