import { getTimePeriod } from '../../../src/lib/time-utils';

describe('time-utils', () => {
  describe('getTimePeriod', () => {
    // Mock Date to have predictable test results
    const mockDate = (
      year: number,
      month: number,
      date: number,
      hour: number,
      day: number
    ) => {
      const mockDate = new Date();
      mockDate.getFullYear = jest.fn(() => year);
      mockDate.getMonth = jest.fn(() => month);
      mockDate.getDate = jest.fn(() => date);
      mockDate.getHours = jest.fn(() => hour);
      mockDate.getDay = jest.fn(() => day);
      
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
      return mockDate;
    };

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return "aprilFools" on April 1st regardless of time or day', () => {
      // April 1st (month = 3 for April, since months are 0-indexed)
      mockDate(2024, 3, 1, 10, 2); // Tuesday, 10 AM
      expect(getTimePeriod()).toBe('aprilFools');

      mockDate(2024, 3, 1, 23, 5); // Friday, 11 PM
      expect(getTimePeriod()).toBe('aprilFools');
    });

    it('should return "lateNight" for hours 23-4 (11 PM to 4 AM)', () => {
      // 11 PM
      mockDate(2024, 2, 15, 23, 3); // Wednesday
      expect(getTimePeriod()).toBe('lateNight');

      // Midnight
      mockDate(2024, 2, 15, 0, 3); // Wednesday
      expect(getTimePeriod()).toBe('lateNight');

      // 3 AM
      mockDate(2024, 2, 15, 3, 3); // Wednesday
      expect(getTimePeriod()).toBe('lateNight');

      // 4 AM
      mockDate(2024, 2, 15, 4, 3); // Wednesday
      expect(getTimePeriod()).toBe('lateNight');
    });

    it('should return "mondayMorning" on Monday between 6-10 AM', () => {
      // Monday (day = 1), 7 AM
      mockDate(2024, 2, 11, 7, 1); // Monday
      expect(getTimePeriod()).toBe('mondayMorning');

      // Monday, 10 AM
      mockDate(2024, 2, 11, 10, 1); // Monday
      expect(getTimePeriod()).toBe('mondayMorning');

      // Monday, 6 AM (should be included)
      mockDate(2024, 2, 11, 6, 1); // Monday
      expect(getTimePeriod()).toBe('mondayMorning');
    });

    it('should NOT return "mondayMorning" outside the time range', () => {
      // Monday, 5 AM (too early) - should be normal since 5 AM is not late night
      mockDate(2024, 2, 11, 5, 1); // Monday
      expect(getTimePeriod()).toBe('normal');

      // Monday, 11 AM (too late)
      mockDate(2024, 2, 11, 11, 1); // Monday
      expect(getTimePeriod()).toBe('normal');
    });

    it('should return "fridayAfternoon" on Friday between 1-5 PM', () => {
      // Friday (day = 5), 2 PM (hour = 14)
      mockDate(2024, 2, 15, 14, 5); // Friday
      expect(getTimePeriod()).toBe('fridayAfternoon');

      // Friday, 5 PM (hour = 17)
      mockDate(2024, 2, 15, 17, 5); // Friday
      expect(getTimePeriod()).toBe('fridayAfternoon');

      // Friday, 1 PM (hour = 13, should be included)
      mockDate(2024, 2, 15, 13, 5); // Friday
      expect(getTimePeriod()).toBe('fridayAfternoon');
    });

    it('should NOT return "fridayAfternoon" outside the time range', () => {
      // Friday, 12 PM (too early)
      mockDate(2024, 2, 15, 12, 5); // Friday
      expect(getTimePeriod()).toBe('normal');

      // Friday, 6 PM (too late)
      mockDate(2024, 2, 15, 18, 5); // Friday
      expect(getTimePeriod()).toBe('normal');
    });

    it('should return "normal" for regular times', () => {
      // Tuesday, 2 PM
      mockDate(2024, 2, 12, 14, 2); // Tuesday
      expect(getTimePeriod()).toBe('normal');

      // Wednesday, 10 AM
      mockDate(2024, 2, 13, 10, 3); // Wednesday
      expect(getTimePeriod()).toBe('normal');

      // Saturday, 3 PM
      mockDate(2024, 2, 16, 15, 6); // Saturday
      expect(getTimePeriod()).toBe('normal');
    });

    it('should prioritize April Fools over other time periods', () => {
      // April 1st, Monday morning (should be aprilFools, not mondayMorning)
      mockDate(2024, 3, 1, 8, 1); // Monday
      expect(getTimePeriod()).toBe('aprilFools');

      // April 1st, late night (should be aprilFools, not lateNight)
      mockDate(2024, 3, 1, 23, 1); // Monday
      expect(getTimePeriod()).toBe('aprilFools');
    });
  });
});