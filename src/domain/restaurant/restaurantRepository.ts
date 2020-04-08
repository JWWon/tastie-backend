import { Restaurant } from '@/entities';
import { QueryRestaurantRequest } from '@/domain/restaurant/dto';

export interface RestaurantRepository {
  createRestaurant(restaurant: Partial<Restaurant>): Promise<void>;
  getRestaurants(query: QueryRestaurantRequest): Promise<Restaurant[]>;
}

export const RestaurantRepositoryToken = Symbol('RestaurantRepository');
