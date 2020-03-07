import { QueryRecommendRestaurantRequest } from './dto';
import { Place } from '@/entities';

export interface RestaurantRecommender {
  recommend(req: QueryRecommendRestaurantRequest, places: Place[]): Place;
  recommends(req: QueryRecommendRestaurantRequest, places: Place[]): Place[];
}

export const RestaurantRecommenderToken = Symbol();
