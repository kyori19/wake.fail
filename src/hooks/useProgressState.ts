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
  
  // Interactive features state
  const [isInteractive, setIsInteractive] = useState(false);
  const [isCursorIdle, setIsCursorIdle] = useState(false);
  const [isLayoutBroken, setIsLayoutBroken] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [lastMouseMoveTime, setLastMouseMoveTime] = useState(Date.now());

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

  // Interactive features setup
  useEffect(() => {
    // Enable interactive mode after a few seconds
    const interactiveTimer = setTimeout(() => {
      setIsInteractive(true);
      setMessage('Help me wake up by clicking! 👆');
    }, 3000);

    // Mouse movement tracking for cursor awareness
    const handleMouseMove = () => {
      setLastMouseMoveTime(Date.now());
      setIsCursorIdle(false);
    };

    // Window resize tracking for responsive breakage
    const handleResize = () => {
      setIsLayoutBroken(true);
      console.error('🚨 CRITICAL ERROR: Window resize detected! Layout integrity compromised!');
      console.warn('📐 Dimensions unstable: Expected 1024x768, got ' + window.innerWidth + 'x' + window.innerHeight);
      console.log('🔧 Attempting to restore... please stand by...');
      
      // Restore after a moment for the gag
      setTimeout(() => {
        setIsLayoutBroken(false);
        console.log('✅ Layout restored. Crisis averted... for now.');
      }, 2000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(interactiveTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Cursor idle detection
  useEffect(() => {
    const idleTimer = setInterval(() => {
      const now = Date.now();
      if (now - lastMouseMoveTime > 5000) { // 5 seconds of no movement
        setIsCursorIdle(true);
      }
    }, 1000);

    return () => clearInterval(idleTimer);
  }, [lastMouseMoveTime]);

  // Progress regression when not clicking
  useEffect(() => {
    if (!isInteractive) return;

    const regressionTimer = setInterval(() => {
      const now = Date.now();
      if (now - lastClickTime > 2000) { // 2 seconds since last click
        setProgress(prev => Math.max(progressConfig.initialProgress, prev - 0.5));
      }
    }, 100);

    return () => clearInterval(regressionTimer);
  }, [isInteractive, lastClickTime, progressConfig.initialProgress]);

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

    // Regular progress animation (only if not in interactive mode)
    if (!isInteractive) {
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
    }
  }, [timePeriod, progressConfig, isInteractive]);

  // Click handler for progress
  const handleProgressClick = () => {
    if (!isInteractive) return;
    
    setClickCount(prev => prev + 1);
    setLastClickTime(Date.now());
    setProgress(prev => Math.min(100, prev + 2 + Math.random() * 3)); // Random nudge between 2-5%
    
    // Update message based on click count
    if (clickCount < 5) {
      setMessage('Good! Keep clicking! 🖱️');
    } else if (clickCount < 10) {
      setMessage('You\'re getting the hang of it! 💪');
    } else {
      setMessage('Wow, you\'re really dedicated! 🎉');
    }
  };

  // Update message based on cursor state
  useEffect(() => {
    if (isCursorIdle && isInteractive) {
      setMessage('Are you still there? 👀');
    }
  }, [isCursorIdle, isInteractive]);

  return {
    timePeriod,
    progress,
    message,
    showSecondary,
    isComplete,
    setTimePeriod, // Export setter for demo controls
    isInteractive,
    isCursorIdle,
    isLayoutBroken,
    clickCount,
    handleProgressClick,
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
