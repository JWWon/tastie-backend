import { Restaurant } from '../model';

export interface RestaurantRecommender {
  recommend(restaurants: Restaurant[]): Restaurant;
}

export const RestaurantRecommenderToken = Symbol();
