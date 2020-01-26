import { RestaurantRecommender } from './restaurantRecommender';
import { Restaurant } from '../model';

export class RuleBasedRestaurantRecommender implements RestaurantRecommender {
  recommend(restaurants: Restaurant[]): Restaurant {
    return restaurants[0];
  }
}
