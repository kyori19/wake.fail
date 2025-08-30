'use client';

import { useState, useEffect } from 'react';

// Time period detection utilities
const getTimePeriod = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday
  const hour = now.getHours();
  const month = now.getMonth(); // 0 = January, 3 = April
  const date = now.getDate();

  // April Fools' Day (April 1st)
  if (month === 3 && date === 1) {
    return 'aprilFools';
  }

  // Late night (11 PM to 5 AM)
  if (hour >= 23 || hour < 5) {
    return 'lateNight';
  }

  // Monday morning (6 AM to 11 AM)
  if (day === 1 && hour >= 6 && hour < 11) {
    return 'mondayMorning';
  }

  // Friday afternoon (1 PM to 6 PM)
  if (day === 5 && hour >= 13 && hour < 18) {
    return 'fridayAfternoon';
  }

  return 'normal';
};

const getProgressConfig = (period: string) => {
  switch (period) {
    case 'mondayMorning':
      return {
        speed: 0.0005, // Very slow
        initialProgress: 5, // Start much lower
        message: ['Ugh, Monday... 😩', 'Need more coffee. ☕️', 'Why is this taking so long?'][Math.floor(Math.random() * 3)]
      };
    case 'fridayAfternoon':
      return {
        speed: 0.05, // Very fast initially
        initialProgress: 95, // Jump to near completion
        message: 'Almost weekend!',
        secondaryMessage: 'Just one more email... 📧'
      };
    case 'lateNight':
      return {
        speed: 0.001, // Slow pulsing
        initialProgress: 20,
        message: 'The server is sleeping. 😴',
        isPulsing: true
      };
    case 'aprilFools':
      return {
        speed: 1, // Instant
        initialProgress: 100,
        message: 'Hello World!',
        secondaryMessage: 'April Fools! 😉'
      };
    default:
      return {
        speed: 0.002,
        initialProgress: 47,
        message: 'Loading...'
      };
  }
};

export default function Home() {
  const [timePeriod] = useState(() => getTimePeriod());
  const [progressConfig] = useState(() => getProgressConfig(timePeriod));
  const [progress, setProgress] = useState(progressConfig.initialProgress);
  const [message, setMessage] = useState(progressConfig.message);
  const [showSecondary, setShowSecondary] = useState(false);

  useEffect(() => {
    // Special April Fools behavior
    if (timePeriod === 'aprilFools') {
      const timer = setTimeout(() => {
        setProgress(5);
        setMessage(progressConfig.secondaryMessage || 'Loading...');
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
        if (timePeriod === 'lateNight' && progressConfig.isPulsing) {
          // Pulsing animation for late night
          const time = Date.now() / 1000;
          const pulse = Math.sin(time) * 10 + 50; // Oscillate between 40-60
          return Math.max(20, Math.min(60, pulse));
        }

        if (timePeriod === 'fridayAfternoon' && prev >= 99.9) {
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

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-8 ${
      timePeriod === 'lateNight' ? 'bg-gray-900 text-gray-100' : 'bg-background text-foreground'
    }`}>
      <main className="flex flex-col items-center space-y-8 max-w-md w-full">
        <h1 className="text-2xl font-mono text-center">
          wake.fail
        </h1>
        
        <div className="w-full space-y-4">
          {timePeriod === 'lateNight' ? (
            // Special late night display with pulsing zZz
            <div className="text-center">
              <div className="text-4xl font-mono animate-pulse">
                zZz...
              </div>
            </div>
          ) : timePeriod === 'aprilFools' && progress === 100 && !showSecondary ? (
            // April Fools instant load
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                ✓ Complete!
              </div>
            </div>
          ) : (
            // Regular progress bar
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
              <div 
                className={`h-4 rounded-full transition-all duration-100 ease-out ${
                  timePeriod === 'fridayAfternoon' ? 'bg-green-500' :
                  timePeriod === 'mondayMorning' ? 'bg-red-400' :
                  timePeriod === 'lateNight' ? 'bg-purple-500' :
                  'bg-blue-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          )}
          
          <p className={`text-center text-sm font-mono ${
            timePeriod === 'lateNight' ? 'text-gray-300' :
            timePeriod === 'mondayMorning' ? 'text-red-600 dark:text-red-400' :
            timePeriod === 'fridayAfternoon' ? 'text-green-600 dark:text-green-400' :
            'text-gray-600 dark:text-gray-400'
          }`}>
            {message}
          </p>
        </div>
        
        {timePeriod !== 'lateNight' && (
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
            timePeriod === 'fridayAfternoon' ? 'border-green-500' :
            timePeriod === 'mondayMorning' ? 'border-red-500' :
            'border-blue-500'
          }`}></div>
        )}
      </main>
    </div>
  );
}
