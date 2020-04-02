import { RestaurantUsecase } from './restaurantUsecase';
import { CreateRestaurantRequest } from './dto';

export class RestaurantService implements RestaurantUsecase {
  async createRestaurant(req: CreateRestaurantRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
