import { Restaurant } from '@/entities';

export interface RestaurantUsecase {
  createRestaurant(req: Partial<Restaurant>): Promise<void>;
}

export const RestaurantUsecaseToken = Symbol('RestaurantUsecaseToken');
