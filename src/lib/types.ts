export type TimePeriod = 'normal' | 'mondayMorning' | 'fridayAfternoon' | 'lateNight' | 'aprilFools';

export interface ProgressConfig {
  speed: number;
  initialProgress: number;
  message: string;
  secondaryMessage?: string;
  isPulsing?: boolean;
}

export interface ProgressState {
  timePeriod: TimePeriod;
  progress: number;
  message: string;
  showSecondary: boolean;
  isComplete: boolean;
  setTimePeriod?: (period: TimePeriod) => void;
  // Interactive features
  isInteractive: boolean;
  isCursorIdle: boolean;
  isLayoutBroken: boolean;
  clickCount: number;
  handleProgressClick?: () => void;
}
