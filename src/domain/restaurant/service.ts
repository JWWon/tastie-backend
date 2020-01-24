import { Injectable } from '@nestjs/common';
import { RestaurantUsecase } from './usecase';
import { Category, Situation, Restaurant } from './model';
import {
  QueryCategoryRequest,
  QuerySituationRequest,
  QueryRecommendRestaurantRequest,
} from './dto';

@Injectable()
export class RestaurantService implements RestaurantUsecase {
  async getCategories(req: QueryCategoryRequest): Promise<Category[]> {
    return [];
  }

  async getSituations(req: QuerySituationRequest): Promise<Situation[]> {
    return [];
  }

  async getRecommendRestaurant(
    req: QueryRecommendRestaurantRequest,
  ): Promise<Restaurant> {
    return {};
  }
}
