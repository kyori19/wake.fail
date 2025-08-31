'use client';

import clsx from 'clsx';
import { useProgressStateWithDemo } from '../hooks/useProgressState';
import { useConsoleGimmicks } from '../hooks/useConsoleGimmicks';
import { useFaviconEvolution } from '../hooks/useFaviconEvolution';
import { ProgressDisplay } from '../components/ProgressDisplay';
import { MessageDisplay } from '../components/MessageDisplay';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { DemoControls } from '../components/DemoControls';

export default function Home() {
  const {
    timePeriod,
    progress,
    message,
    showSecondary,
    isComplete,
    theme,
    setDemoTimePeriod,
    isInteractive,
    isCursorIdle,
    isLayoutBroken,
    handleProgressClick,
  } = useProgressStateWithDemo();

  // Initialize console gimmicks
  useConsoleGimmicks(timePeriod);

  // Initialize favicon evolution
  useFaviconEvolution();

  return (
    <div
      className={clsx(
        'min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-700 ease-in-out',
        {
          'bg-gray-900 text-gray-100': timePeriod === 'lateNight',
          'bg-background text-foreground': timePeriod !== 'lateNight',
          // Layout breakage effects
          'transform -rotate-1': isLayoutBroken,
          'transition-transform duration-1000': isLayoutBroken,
        }
      )}
    >
      <DemoControls
        onTimePeriodChange={setDemoTimePeriod}
        currentPeriod={timePeriod}
      />

      <main
        className={clsx(
          'flex flex-col items-center space-y-8 max-w-md w-full transition-enhanced',
          {
            'animate-pulse': isLayoutBroken,
            // Add subtle drop shadow for depth
            'drop-shadow-lg animate-fade-in-up': !isLayoutBroken,
          }
        )}
        role="main"
        aria-label="Wake.fail loading interface"
      >
        <h1
          className={clsx(
            'text-2xl font-mono text-center transition-enhanced focus-enhanced animate-fade-in-up',
            {
              'animate-bounce': isLayoutBroken,
              // Subtle hover effect on title
              'hover:scale-105 cursor-default animate-gentle-pulse':
                !isLayoutBroken,
            }
          )}
          tabIndex={0}
          role="banner"
        >
          wake.fail
        </h1>

        <div className="w-full space-y-6 transition-all duration-300 ease-in-out">
          <ProgressDisplay
            timePeriod={timePeriod}
            progress={progress}
            isComplete={isComplete}
            showSecondary={showSecondary}
            theme={theme}
            onClick={handleProgressClick}
            isInteractive={isInteractive}
            isLayoutBroken={isLayoutBroken}
          />

          <MessageDisplay timePeriod={timePeriod} message={message} />
        </div>

        <LoadingSpinner
          timePeriod={timePeriod}
          isCursorIdle={isCursorIdle}
          isLayoutBroken={isLayoutBroken}
        />
      </main>
    </div>
  );
}
