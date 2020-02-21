import { Restaurant } from '../model';
import { QueryRecommendRestaurantRequest } from '..';

export interface RestaurantRecommender {
  recommend(
    req: QueryRecommendRestaurantRequest,
    restaurants: Restaurant[],
  ): Restaurant;
}

export const RestaurantRecommenderToken = Symbol();
