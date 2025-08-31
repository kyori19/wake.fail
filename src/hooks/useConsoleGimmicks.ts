'use client';

import { useEffect, useRef } from 'react';
import type { TimePeriod } from '../lib/types';
import { displayAsciiArt, displayRandomAsciiArt } from '../lib/ascii-art';
import { playConsoleTheater } from '../lib/console-messages';

/**
 * Hook for managing console gimmicks and easter eggs
 */
export const useConsoleGimmicks = (timePeriod: TimePeriod) => {
  const hasInitialized = useRef(false);
  const theaterPlayed = useRef(false);

  // Initialize console gimmicks on first load
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Display welcome ASCII art
    console.clear();
    displayAsciiArt('WAKE', '#4ecdc4');

    // Add some spacing
    console.log('\n');

    // Welcome message
    console.log(
      '%c🎭 Welcome to the Developer Console Theater! 🎭',
      'color: #ff6b6b; font-size: 16px; font-weight: bold; background: #000; padding: 8px;'
    );

    console.log(
      '%cType help() to see available commands, or just sit back and enjoy the show...',
      'color: #96ceb4; font-style: italic;'
    );

    console.log('\n');

    // Add fake functions to global scope
    addFakeFunctionsToGlobal();

    // Show available functions hint
    console.log(
      '%c💡 Hint: Try typing help(), coffee.inject(), wake.up(), or systemStatus()',
      'color: #ffd93d; background: #333; padding: 4px;'
    );
  }, []);

  // Play console theater based on time period
  useEffect(() => {
    if (theaterPlayed.current) return;
    theaterPlayed.current = true;

    // Start the theater after a brief delay
    setTimeout(() => {
      playConsoleTheater(timePeriod);
    }, 3000);

    // Display time-period specific ASCII art later
    setTimeout(() => {
      console.log('\n');
      switch (timePeriod) {
        case 'mondayMorning':
          displayAsciiArt('FAIL', '#ff6b6b');
          break;
        case 'lateNight':
          displayAsciiArt('SLEEPING', '#45b7d1');
          break;
        case 'aprilFools':
          displayRandomAsciiArt();
          break;
        default:
          displayAsciiArt('LOADING', '#96ceb4');
      }
    }, 20000);
  }, [timePeriod]);
};

/**
 * Add fake functions to the global window object
 */
const addFakeFunctionsToGlobal = () => {
  // Extend window interface to include our fake functions
  interface WindowWithFakeFunctions extends Window {
    help?: () => string;
    wake?: {
      up: () => boolean;
    };
    coffee?: {
      inject: () => string;
    };
    systemStatus?: () => { status: string; online: boolean };
    ascii?: () => string;
    panic?: () => string;
  }

  const extendedWindow = window as WindowWithFakeFunctions;

  // Fake help function
  extendedWindow.help = () => {
    console.log(
      '%c📚 Available Commands:',
      'color: #4ecdc4; font-size: 14px; font-weight: bold;'
    );
    console.log(
      '%c  help()          - Show this help message',
      'color: #96ceb4;'
    );
    console.log(
      '%c  wake.up()       - Attempt to wake the system (deprecated)',
      'color: #96ceb4;'
    );
    console.log(
      '%c  coffee.inject() - Alternative wake method',
      'color: #96ceb4;'
    );
    console.log(
      '%c  systemStatus()  - Check current system status',
      'color: #96ceb4;'
    );
    console.log(
      '%c  ascii()         - Display random ASCII art',
      'color: #96ceb4;'
    );
    console.log('%c  panic()         - Emergency protocols', 'color: #96ceb4;');
    console.log(
      '\n%c💡 Pro tip: Use these commands to monitor and control system state.',
      'color: #ffd93d; font-style: italic;'
    );
    return '// TODO: Implement help function';
  };

  // Fake wake object with deprecated function
  extendedWindow.wake = {
    up: () => {
      console.error(
        '%c❌ ERROR: Function wake.up() is deprecated since version 2.1.0',
        'color: #ff6b6b; font-weight: bold;'
      );
      console.warn('%c⚠️  Use coffee.inject() instead', 'color: #ffd93d;');
      console.log(
        '%c📝 Migration guide: https://wake.fail/docs/migration (404)',
        'color: #96ceb4;'
      );
      return false;
    },
  };

  // Fake coffee object
  extendedWindow.coffee = {
    inject: () => {
      console.log(
        '%c☕ Injecting coffee... Please wait...',
        'color: #8B4513; font-weight: bold;'
      );
      setTimeout(() => {
        console.log(
          '%c✅ Coffee injection complete! System alertness: +15%',
          'color: #4ecdc4;'
        );
        console.log(
          '%c🔋 Energy levels: [||||||||||||||||████] 80%',
          'color: #96ceb4;'
        );
      }, 2000);
      return '☕ Coffee.exe is running...';
    },
  };

  // System status function
  extendedWindow.systemStatus = () => {
    const statuses = [
      'BARELY_FUNCTIONING',
      'COFFEE_DEPRIVED',
      'MONDAY_MODE',
      'WEEKEND_READY',
      'DEBUGGING_LIFE',
      'STACK_OVERFLOW',
      'NEEDS_REBOOT',
    ];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    console.log(
      '%c🖥️  System Status Report',
      'color: #4ecdc4; font-size: 14px; font-weight: bold;'
    );
    console.log('%c───────────────────────', 'color: #4ecdc4;');
    console.log(`%c   Status: ${randomStatus}`, 'color: #96ceb4;');
    console.log(
      `%c   Uptime: ${Math.floor(Math.random() * 999)}d ${Math.floor(Math.random() * 24)}h`,
      'color: #96ceb4;'
    );
    console.log(
      `%c   Load: ${(Math.random() * 3).toFixed(2)}`,
      'color: #96ceb4;'
    );
    console.log(
      `%c   Memory: ${Math.floor(Math.random() * 100)}% used`,
      'color: #96ceb4;'
    );
    console.log(
      `%c   Motivation: ${Math.floor(Math.random() * 50)}%`,
      'color: #96ceb4;'
    );

    return { status: randomStatus, online: true };
  };

  // ASCII art function
  extendedWindow.ascii = () => {
    displayRandomAsciiArt();
    return '🎨 Random ASCII art displayed!';
  };

  // Panic function
  extendedWindow.panic = () => {
    console.error(
      '%c🚨 PANIC MODE ACTIVATED! 🚨',
      'color: #ff6b6b; font-size: 16px; font-weight: bold; background: #000; padding: 8px;'
    );
    console.error(
      '%c🔥 EVERYTHING IS ON FIRE! 🔥',
      'color: #ff6b6b; font-weight: bold;'
    );
    console.warn(
      '%c⚠️  Just kidding! Everything is fine... probably.',
      'color: #ffd93d;'
    );
    console.log(
      "%c😌 Take a deep breath. It's just a loading screen.",
      'color: #96ceb4;'
    );
    displayAsciiArt('FAIL', '#ff6b6b');
    return '🧯 Fire extinguisher deployed.';
  };

  // Add a hint about the functions
  console.log(
    '%c🎯 Fake functions loaded! Try them out:',
    'color: #45b7d1; font-weight: bold;'
  );
  console.log('%c   • help() - Your trusty guide', 'color: #96ceb4;');
  console.log(
    '%c   • coffee.inject() - Essential for Monday mornings',
    'color: #96ceb4;'
  );
  console.log(
    '%c   • systemStatus() - Check the chaos level',
    'color: #96ceb4;'
  );
};
