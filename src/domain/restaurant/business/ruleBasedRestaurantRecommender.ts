import { RestaurantRecommender } from './restaurantRecommender';
import { Restaurant } from '../model';

export class RuleBasedRestaurantRecommender implements RestaurantRecommender {
  recommend(restaurants: Restaurant[]): Restaurant {
    const cmpFunc = (a: Restaurant, b: Restaurant) => {
      if (a.userRatingsTotal > b.userRatingsTotal) return -1;
      if (a.userRatingsTotal < b.userRatingsTotal) return 1;
      return 0;
    };

    return restaurants.sort(cmpFunc)[0];
  }
}
