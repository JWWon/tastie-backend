import { Restaurant } from '@/entities';
import { QueryRestaurantRequest } from '@/domain/restaurant/dto';

export interface RestaurantUsecase {
  createRestaurant(req: Partial<Restaurant>): Promise<void>;
  getRestaurants(req: QueryRestaurantRequest): Promise<Restaurant[]>;
}

export const RestaurantUsecaseToken = Symbol('RestaurantUsecaseToken');
