'use client';

import clsx from 'clsx';
import { useProgressStateWithDemo } from '../hooks/useProgressState';
import { useConsoleGimmicks } from '../hooks/useConsoleGimmicks';
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
    setDemoTimePeriod,
    isInteractive,
    isCursorIdle,
    isLayoutBroken,
    handleProgressClick,
  } = useProgressStateWithDemo();

  // Initialize console gimmicks
  useConsoleGimmicks(timePeriod);

  return (
    <div className={clsx(
      'min-h-screen flex flex-col items-center justify-center p-8',
      {
        'bg-gray-900 text-gray-100': timePeriod === 'lateNight',
        'bg-background text-foreground': timePeriod !== 'lateNight',
        // Layout breakage effects
        'transform -rotate-1': isLayoutBroken,
        'transition-transform duration-1000': isLayoutBroken,
      }
    )}>
      <DemoControls 
        onTimePeriodChange={setDemoTimePeriod}
        currentPeriod={timePeriod}
      />
      
      <main className={clsx(
        "flex flex-col items-center space-y-8 max-w-md w-full",
        {
          "animate-pulse": isLayoutBroken,
        }
      )}>
        <h1 className={clsx(
          "text-2xl font-mono text-center",
          {
            "animate-bounce": isLayoutBroken,
          }
        )}>
          wake.fail
        </h1>
        
        <div className="w-full space-y-4">
          <ProgressDisplay 
            timePeriod={timePeriod}
            progress={progress}
            isComplete={isComplete}
            showSecondary={showSecondary}
            onClick={handleProgressClick}
            isInteractive={isInteractive}
            isLayoutBroken={isLayoutBroken}
          />
          
          <MessageDisplay 
            timePeriod={timePeriod}
            message={message}
          />
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
