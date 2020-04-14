import { Inject, Injectable } from '@nestjs/common';
import { RestaurantUsecase } from './restaurantUsecase';
import {
  RestaurantRepository,
  RestaurantRepositoryToken,
} from './restaurantRepository';
import { Restaurant } from '@/entities';
import { QueryRestaurantRequest } from './dto';

@Injectable()
export class RestaurantService implements RestaurantUsecase {
  constructor(
    @Inject(RestaurantRepositoryToken)
    private readonly restaurantRepo: RestaurantRepository,
  ) {}

  async createRestaurant(req: Partial<Restaurant>): Promise<void> {
    await this.restaurantRepo.createRestaurant(req);
  }

  async getRestaurants(req: QueryRestaurantRequest): Promise<Restaurant[]> {
    const res = await this.restaurantRepo.getRestaurants(req);
    return res;
  }
}
