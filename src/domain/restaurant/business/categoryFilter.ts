import { TimeSlot } from '../model/timeSlot';
import { Category } from '../model';

export const filterCategoriesByTimeSlot = (
  slot: TimeSlot,
  categories: Category[],
): Category[] => {
  const result: [number, Category][] = [];
  categories.forEach(category => {
    const idx = category.priorities.indexOf(slot);
    if (idx !== -1) {
      result.push([idx, category]);
    }
  });

  result.sort();

  return result.map(item => item[1]);
};
