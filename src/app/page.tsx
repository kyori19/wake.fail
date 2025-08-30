'use client';

import clsx from 'clsx';
import { useProgressStateWithDemo } from '../hooks/useProgressState';
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
    setDemoTimePeriod 
  } = useProgressStateWithDemo();

  return (
    <div className={clsx(
      'min-h-screen flex flex-col items-center justify-center p-8',
      timePeriod === 'lateNight' 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-background text-foreground'
    )}>
      <DemoControls 
        onTimePeriodChange={setDemoTimePeriod}
        currentPeriod={timePeriod}
      />
      
      <main className="flex flex-col items-center space-y-8 max-w-md w-full">
        <h1 className="text-2xl font-mono text-center">
          wake.fail
        </h1>
        
        <div className="w-full space-y-4">
          <ProgressDisplay 
            timePeriod={timePeriod}
            progress={progress}
            isComplete={isComplete}
            showSecondary={showSecondary}
          />
          
          <MessageDisplay 
            timePeriod={timePeriod}
            message={message}
          />
        </div>
        
        <LoadingSpinner timePeriod={timePeriod} />
      </main>
    </div>
  );
}
