import { CategoryRepository } from '@/interfaces/repositories';
import { Category, CategoryType } from '@/entities';
import { convertKoreanDateFromUTC } from '@/domain/restaurant/business/timeSlotConverter';

type Time = {
  readonly hour: number;
  readonly minute: number;
};

type Condition = {
  readonly start: Time;
  readonly end: Time;
  readonly category: CategoryType;
};

const valid = (condition: Condition, date: Date): boolean => {
  const start = condition.start.hour;
  const end =
    condition.end.hour < start ? condition.end.hour + 24 : condition.end.hour;
  const pivot =
    condition.start.hour > date.getHours() &&
    date.getHours() < condition.end.hour
      ? date.getHours() + 24
      : date.getHours();

  return start <= pivot && pivot < end;
};

export class MemoryCategoryRepository implements CategoryRepository {
  private readonly conditions: Condition[] = [
    {
      start: { hour: 5, minute: 0 },
      end: { hour: 11, minute: 0 },
      category: '아침',
    },
    {
      start: { hour: 10, minute: 0 },
      end: { hour: 12, minute: 0 },
      category: '브런치',
    },
    {
      start: { hour: 11, minute: 0 },
      end: { hour: 14, minute: 0 },
      category: '점심',
    },
    {
      start: { hour: 13, minute: 0 },
      end: { hour: 21, minute: 0 },
      category: '디저트',
    },
    {
      start: { hour: 16, minute: 30 },
      end: { hour: 22, minute: 0 },
      category: '저녁',
    },
    {
      start: { hour: 19, minute: 0 },
      end: { hour: 5, minute: 0 },
      category: '술자리',
    },
    {
      start: { hour: 21, minute: 0 },
      end: { hour: 3, minute: 0 },
      category: '야식',
    },
  ];

  async getCategoriesByUTCDate(utcNow: Date): Promise<Category[]> {
    const koreanDate = convertKoreanDateFromUTC(utcNow);
    const categories: Category[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const condition of this.conditions) {
      if (valid(condition, koreanDate)) {
        categories.push({ name: condition.category });
      }
    }

    return categories;
  }
}
