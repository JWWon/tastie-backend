import { Injectable } from '@nestjs/common';
import { RestaurantUsecase } from './usecase';
import { Category, Situation, Restaurant } from './model';
import { filterCategoriesByTimeSlot } from './business/categoryFilter';
import {
  convertTimeSlotFromDate,
  convertKoreanDateFromUTC,
} from './business/timeSlotConverter';
import {
  QueryCategoryRequest,
  QuerySituationRequest,
  QueryRecommendRestaurantRequest,
} from './dto';
import { TimeSlot } from './model/timeSlot';

@Injectable()
export class RestaurantService implements RestaurantUsecase {
  async getCategories(req: QueryCategoryRequest): Promise<Category[]> {
    const koreanDate = convertKoreanDateFromUTC(req.utcNow);
    const timeSlot = convertTimeSlotFromDate(koreanDate);
    const categories: Category[] = [
      {
        id: Symbol.toString(),
        name: '아침',
        priorities: [TimeSlot.Morning, TimeSlot.MorningAndNoon, TimeSlot.Dawn],
      },
      {
        id: Symbol.toString(),
        name: '아점',
        priorities: [TimeSlot.MorningAndNoon, TimeSlot.Morning],
      },
      {
        id: Symbol.toString(),
        name: '점심',
        priorities: [TimeSlot.Noon, TimeSlot.NoonAndEvening],
      },
      {
        id: Symbol.toString(),
        name: '이른저녁',
        priorities: [TimeSlot.NoonAndEvening, TimeSlot.Evening],
      },
      {
        id: Symbol.toString(),
        name: '저녁',
        priorities: [TimeSlot.Evening, TimeSlot.NoonAndEvening, TimeSlot.Night],
      },
      {
        id: Symbol.toString(),
        name: '디저트',
        priorities: [
          TimeSlot.Morning,
          TimeSlot.MorningAndNoon,
          TimeSlot.Noon,
          TimeSlot.Evening,
          TimeSlot.Night,
        ],
      },
      {
        id: Symbol.toString(),
        name: '술자리',
        priorities: [TimeSlot.Evening, TimeSlot.Night],
      },
    ];

    return filterCategoriesByTimeSlot(timeSlot, categories);
  }

  async getSituations(req: QuerySituationRequest): Promise<Situation[]> {
    const situations: Situation[] = [
      { id: Symbol.toString(), name: '친구들이랑 한끼' },
      { id: Symbol.toString(), name: '혼밥' },
    ];

    return situations;
  }

  async getRecommendRestaurant(
    req: QueryRecommendRestaurantRequest,
  ): Promise<Restaurant> {
    return {};
  }
}
