import { Injectable } from '@nestjs/common';
import { RestaurantUsecase } from './usecase';
import { Category, Situation, Restaurant } from './model';
import { convertTimeSlotFromDate } from './business/timeSlotConverter';
import {
  QueryCategoryRequest,
  QuerySituationRequest,
  QueryRecommendRestaurantRequest,
} from './dto';

@Injectable()
export class RestaurantService implements RestaurantUsecase {
  async getCategories(req: QueryCategoryRequest): Promise<Category[]> {
    const timeSlot = convertTimeSlotFromDate(req.utcNow);
    const categories: Category[] = [
      { id: Symbol.toString(), name: '아침' },
      { id: Symbol.toString(), name: '아점' },
      { id: Symbol.toString(), name: '점심' },
      { id: Symbol.toString(), name: '이른저녁' },
      { id: Symbol.toString(), name: '저녁' },
      { id: Symbol.toString(), name: '디저트' },
      { id: Symbol.toString(), name: '술자리' },
    ];

    return categories;
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
