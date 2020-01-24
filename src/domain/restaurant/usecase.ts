import {
  QueryCategoryRequest,
  QuerySituationRequest,
  QueryRecommendRestaurantRequest,
} from './dto';
import { Category, Situation, Restaurant } from './model';

export interface RestaurantUsecase {
  getCategories(req: QueryCategoryRequest): Promise<Category[]>;
  getSituations(req: QuerySituationRequest): Promise<Situation[]>;
  getRecommendRestaurant(
    req: QueryRecommendRestaurantRequest,
  ): Promise<Restaurant>;
}

export const RestaurantUsecaseToken = Symbol.toString();
