import { TimeSlot } from '../model/timeSlot';

export const convertKoreanDateFromUTC = (utcDate: Date): Date => {
  return new Date(
    utcDate.toLocaleString('ko-kr', {
      timeZone: 'Asia/Seoul',
    }),
  );
};

export const convertTimeSlotFromDate = (date: Date): TimeSlot => {
  const hour = date.getHours();

  if (hour >= 0 && hour <= 6) {
    return TimeSlot.Dawn;
  }

  if (hour <= 9) {
    return TimeSlot.Morning;
  }

  if (hour <= 10) {
    return TimeSlot.MorningAndNoon;
  }

  if (hour <= 14) {
    return TimeSlot.Noon;
  }

  if (hour <= 17) {
    return TimeSlot.NoonAndEvening;
  }

  if (hour <= 19) {
    return TimeSlot.Evening;
  }

  return TimeSlot.Night;
};
