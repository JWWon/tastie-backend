import { TimeSlot } from '../model/timeSlot';
import { Situation } from '../model';

export const filterSituationsByTimeSlot = (
  slot: TimeSlot,
  situations: Situation[],
): Situation[] => {
  const result: Situation[] = [];
  situations.forEach(situation => {
    const idx = situation.priorities.indexOf(slot);
    if (idx !== -1) {
      result.push(situation);
    }
  });

  return result;
};
