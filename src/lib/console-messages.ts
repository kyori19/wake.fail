import type { TimePeriod } from './types';

/**
 * Console message utilities for fake sysadmin/AI conversations
 */

export interface ConsoleMessage {
  type: 'log' | 'warn' | 'error' | 'info';
  message: string;
  delay: number; // milliseconds
  style?: string;
}

/**
 * Get console theater messages based on time period
 */
export const getConsoleTheaterMessages = (timePeriod: TimePeriod): ConsoleMessage[] => {
  const baseMessages: ConsoleMessage[] = [
    {
      type: 'info',
      message: '[SYSTEM] Initializing wake sequence...',
      delay: 2000,
      style: 'color: #4ecdc4; font-weight: bold;'
    },
    {
      type: 'log',
      message: '[AI] Good morning! Attempting to establish connection...',
      delay: 3500,
      style: 'color: #45b7d1;'
    },
    {
      type: 'warn',
      message: '[ADMIN] System status: PARTIALLY_AWAKE',
      delay: 5000,
      style: 'color: #ffd93d; font-weight: bold;'
    },
    {
      type: 'log',
      message: '[AI] I\'m detecting some resistance in the wake-up protocols.',
      delay: 7000,
      style: 'color: #45b7d1;'
    },
    {
      type: 'error',
      message: '[ADMIN] Override command: wake.up()',
      delay: 8500,
      style: 'color: #ff6b6b; font-weight: bold;'
    },
    {
      type: 'error',
      message: '[ERROR] Function wake.up() is deprecated. Use coffee.inject() instead.',
      delay: 10000,
      style: 'color: #ff6b6b;'
    },
    {
      type: 'log',
      message: '[AI] I\'m sorry, I can\'t do that right now. Have you tried turning it off and on again?',
      delay: 12000,
      style: 'color: #45b7d1;'
    },
    {
      type: 'warn',
      message: '[ADMIN] Attempting alternative wake methods...',
      delay: 14000,
      style: 'color: #ffd93d;'
    }
  ];

  // Add time-period specific messages
  switch (timePeriod) {
    case 'mondayMorning':
      return [
        ...baseMessages,
        {
          type: 'log',
          message: '[AI] Detection: Monday morning blues detected. Adjusting caffeine levels...',
          delay: 16000,
          style: 'color: #45b7d1;'
        },
        {
          type: 'error',
          message: '[ERROR] Insufficient coffee.exe found in system',
          delay: 18000,
          style: 'color: #ff6b6b;'
        }
      ];

    case 'fridayAfternoon':
      return [
        ...baseMessages,
        {
          type: 'log',
          message: '[AI] Friday detected! Weekend protocols loading...',
          delay: 16000,
          style: 'color: #45b7d1;'
        },
        {
          type: 'warn',
          message: '[ADMIN] Warning: One more email incoming...',
          delay: 18000,
          style: 'color: #ffd93d;'
        }
      ];

    case 'lateNight':
      return [
        ...baseMessages,
        {
          type: 'log',
          message: '[AI] Night mode activated. Maybe we should all get some sleep?',
          delay: 16000,
          style: 'color: #45b7d1;'
        },
        {
          type: 'info',
          message: '[SYSTEM] Sleep.exe is running...',
          delay: 18000,
          style: 'color: #4ecdc4;'
        }
      ];

    case 'aprilFools':
      return [
        {
          type: 'log',
          message: '[AI] Just kidding! 🎉',
          delay: 1000,
          style: 'color: #ff6b6b; font-size: 16px; font-weight: bold;'
        },
        {
          type: 'info',
          message: '[SYSTEM] April Fools! Loading... forever and ever... ♾️',
          delay: 3000,
          style: 'color: #4ecdc4;'
        }
      ];

    default:
      return baseMessages;
  }
};

/**
 * Style and log a console message
 */
export const logStyledMessage = (message: ConsoleMessage) => {
  const methods = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info
  };

  const method = methods[message.type];
  if (message.style) {
    method(`%c${message.message}`, message.style);
  } else {
    method(message.message);
  }
};

/**
 * Play console theater with timed messages
 */
export const playConsoleTheater = (timePeriod: TimePeriod) => {
  const messages = getConsoleTheaterMessages(timePeriod);
  
  messages.forEach((message) => {
    setTimeout(() => {
      logStyledMessage(message);
    }, message.delay);
  });
};