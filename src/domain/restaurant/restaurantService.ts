import { Inject, Injectable } from '@nestjs/common';
import { RestaurantUsecase } from './restaurantUsecase';
import { CreateRestaurantRequest } from './dto';
import {
  RestaurantRepository,
  RestaurantRepositoryToken,
} from './restaurantRepository';

@Injectable()
export class RestaurantService implements RestaurantUsecase {
  constructor(
    @Inject(RestaurantRepositoryToken)
    private readonly restaurantRepo: RestaurantRepository,
  ) {}

  async createRestaurant(req: CreateRestaurantRequest): Promise<void> {
    await this.restaurantRepo.createRestaurant(req);
  }
}
