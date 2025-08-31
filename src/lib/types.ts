export type TimePeriod =
  | 'normal'
  | 'mondayMorning'
  | 'fridayAfternoon'
  | 'lateNight'
  | 'aprilFools';

export type ProgressTheme = 'windowsXP' | 'macOS' | 'retro' | 'windows98';

export interface ProgressConfig {
  speed: number;
  initialProgress: number;
  message: string;
  secondaryMessage?: string;
  isPulsing?: boolean;
  theme?: ProgressTheme;
}

export interface ProgressState {
  timePeriod: TimePeriod;
  progress: number;
  message: string;
  showSecondary: boolean;
  isComplete: boolean;
  theme: ProgressTheme;
  setTimePeriod?: (period: TimePeriod) => void;
  // Interactive features
  isInteractive: boolean;
  isCursorIdle: boolean;
  isLayoutBroken: boolean;
  clickCount: number;
  handleProgressClick?: () => void;
}
