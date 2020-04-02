import { CreateRestaurantRequest } from './dto';

export interface RestaurantUsecase {
  createRestaurant(req: CreateRestaurantRequest): Promise<void>;
}

export const RestaurantUsecaseToken = Symbol('RestaurantUsecaseToken');
