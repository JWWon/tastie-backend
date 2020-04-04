import { Restaurant } from '@/entities';

export interface RestaurantRepository {
  createRestaurant(restaurant: Partial<Restaurant>): Promise<void>;
}

export const RestaurantRepositoryToken = Symbol('RestaurantRepository');
