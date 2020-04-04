import { ApiTags, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AddRestaurantRequest } from './dto';
import {
  RestaurantUsecaseToken,
  RestaurantUsecase,
} from '@/domain/restaurant/restaurantUsecase';

@ApiTags('Restaurant API')
@Controller('restaurants')
export class RestaurantController {
  constructor(
    @Inject(RestaurantUsecaseToken)
    private readonly restaurantService: RestaurantUsecase,
  ) {}

  @Post()
  @ApiCreatedResponse({})
  async addRestaurant(@Body() req: AddRestaurantRequest): Promise<void> {
    await this.restaurantService.createRestaurant({
      ...req,
      category: {},
      menus: [],
      openingHours: [],
    });
  }
}
