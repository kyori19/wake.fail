import { getProgressConfig } from '../../../src/lib/progress-config';
import { TimePeriod } from '../../../src/lib/types';

// Mock the getRandomTheme function to have predictable tests
jest.mock('../../../src/lib/theme-utils', () => ({
  getRandomTheme: jest.fn(() => 'macOS'),
}));

describe('progress-config', () => {
  describe('getProgressConfig', () => {
    it('should return configuration for mondayMorning period', () => {
      const config = getProgressConfig('mondayMorning');

      expect(config.speed).toBe(0.0005);
      expect(config.initialProgress).toBe(5);
      expect(config.message).toMatch(
        /Ugh, Monday|Need more coffee|Why is this taking so long/
      );
      expect(config.theme).toBe('macOS');
    });

    it('should return configuration for fridayAfternoon period', () => {
      const config = getProgressConfig('fridayAfternoon');

      expect(config.speed).toBe(0.05);
      expect(config.initialProgress).toBe(95);
      expect(config.message).toBe('Almost weekend!');
      expect(config.secondaryMessage).toBe('Just one more email... 📧');
      expect(config.theme).toBe('macOS');
    });

    it('should return configuration for lateNight period', () => {
      const config = getProgressConfig('lateNight');

      expect(config.speed).toBe(0.001);
      expect(config.initialProgress).toBe(20);
      expect(config.message).toBe('The server is sleeping. 😴');
      expect(config.isPulsing).toBe(true);
      expect(config.theme).toBe('macOS');
    });

    it('should return configuration for aprilFools period', () => {
      const config = getProgressConfig('aprilFools');

      expect(config.speed).toBe(1);
      expect(config.initialProgress).toBe(100);
      expect(config.message).toBe('Hello World!');
      expect(config.secondaryMessage).toBe('April Fools! 😉');
      expect(config.theme).toBe('macOS');
    });

    it('should return default configuration for normal period', () => {
      const config = getProgressConfig('normal');

      expect(config.speed).toBe(0.002);
      expect(config.initialProgress).toBe(47);
      expect(config.message).toBe('Loading...');
      expect(config.theme).toBe('macOS');
      expect(config.secondaryMessage).toBeUndefined();
      expect(config.isPulsing).toBeUndefined();
    });

    it('should return default configuration for unknown periods', () => {
      const config = getProgressConfig('unknown' as TimePeriod);

      expect(config.speed).toBe(0.002);
      expect(config.initialProgress).toBe(47);
      expect(config.message).toBe('Loading...');
      expect(config.theme).toBe('macOS');
    });

    it('should always include a theme property', () => {
      const periods: TimePeriod[] = [
        'normal',
        'mondayMorning',
        'fridayAfternoon',
        'lateNight',
        'aprilFools',
      ];

      periods.forEach(period => {
        const config = getProgressConfig(period);
        expect(config.theme).toBeDefined();
        expect(typeof config.theme).toBe('string');
      });
    });

    it('should have different speeds for different periods', () => {
      const normalConfig = getProgressConfig('normal');
      const mondayConfig = getProgressConfig('mondayMorning');
      const fridayConfig = getProgressConfig('fridayAfternoon');
      const lateNightConfig = getProgressConfig('lateNight');
      const aprilConfig = getProgressConfig('aprilFools');

      const speeds = [
        normalConfig.speed,
        mondayConfig.speed,
        fridayConfig.speed,
        lateNightConfig.speed,
        aprilConfig.speed,
      ];

      // All speeds should be different
      const uniqueSpeeds = new Set(speeds);
      expect(uniqueSpeeds.size).toBe(5);
    });

    it('should have appropriate initial progress values', () => {
      const configs = {
        normal: getProgressConfig('normal'),
        mondayMorning: getProgressConfig('mondayMorning'),
        fridayAfternoon: getProgressConfig('fridayAfternoon'),
        lateNight: getProgressConfig('lateNight'),
        aprilFools: getProgressConfig('aprilFools'),
      };

      // All progress values should be between 0 and 100
      Object.values(configs).forEach(config => {
        expect(config.initialProgress).toBeGreaterThanOrEqual(0);
        expect(config.initialProgress).toBeLessThanOrEqual(100);
      });

      // Monday should start low, Friday should start high
      expect(configs.mondayMorning.initialProgress).toBeLessThan(
        configs.normal.initialProgress
      );
      expect(configs.fridayAfternoon.initialProgress).toBeGreaterThan(
        configs.normal.initialProgress
      );
      expect(configs.aprilFools.initialProgress).toBe(100);
    });

    it('should provide appropriate messages for each period', () => {
      const periods: TimePeriod[] = [
        'normal',
        'mondayMorning',
        'fridayAfternoon',
        'lateNight',
        'aprilFools',
      ];

      periods.forEach(period => {
        const config = getProgressConfig(period);
        expect(config.message).toBeDefined();
        expect(typeof config.message).toBe('string');
        expect(config.message.length).toBeGreaterThan(0);
      });
    });
  });
});
