import { TimeSlot } from '../model/timeSlot';
import { convertTimeSlotFromDate } from './timeSlotConverter';

describe('TimeSlotConverter', () => {
  describe('convertTimeSlotFromDate', () => {
    type TestCase = {
      description: string;
      argDate: Date;
      expected: TimeSlot;
    };

    const testCases: TestCase[] = [
      {
        description: 'ShouldBeDawn',
        argDate: new Date('2018-11-21T05:20:32.232Z'),
        expected: TimeSlot.Dawn,
      },
      {
        description: 'ShouldBeMorning',
        argDate: new Date('2018-11-21T07:20:32.232Z'),
        expected: TimeSlot.Morning,
      },
      {
        description: 'ShouldBeMorningAndNoon',
        argDate: new Date('2018-11-21T10:20:32.232Z'),
        expected: TimeSlot.MorningAndNoon,
      },
      {
        description: 'ShouldBeNoonWhen11AM',
        argDate: new Date('2018-11-21T11:20:32.232Z'),
        expected: TimeSlot.Noon,
      },
      {
        description: 'ShouldBeNoonWhen1PM',
        argDate: new Date('2018-11-21T13:20:32.232Z'),
        expected: TimeSlot.Noon,
      },
      {
        description: 'ShouldBeNoonAndEvening',
        argDate: new Date('2018-11-21T15:20:32.232Z'),
        expected: TimeSlot.NoonAndEvening,
      },
      {
        description: 'ShouldBeEveningWhen6PM',
        argDate: new Date('2018-11-21T18:20:32.232Z'),
        expected: TimeSlot.Evening,
      },
      {
        description: 'ShouldBeNightWhen8PM',
        argDate: new Date('2018-11-21T20:20:32.232Z'),
        expected: TimeSlot.Night,
      },
    ];

    for (const tc of testCases) {
      it(tc.description, () => {
        const actual = convertTimeSlotFromDate(tc.argDate);
        expect(actual).toEqual(tc.expected);
      });
    }
  });
});
