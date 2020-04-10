import { ApiTags, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Controller, Post, Body, Inject, Get, Query } from '@nestjs/common';
import { AddRestaurantRequest, QueryRestaurantRequest } from './dto';
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
      name: req.name,
      address: req.address,
      telephone: req.telephone,
      categories: req.categories,
      description: req.description,
      coordinate: req.coordinate,
      status: req.status,
      photoUrls: req.photoUrls,
      keywords: req.keywords,
      menus: req.menus,
      openingHours: req.openingHours,
    });
  }

  @Get()
  async getRestaurants(@Query() req: QueryRestaurantRequest): Promise<any[]> {
    const restaurants = await this.restaurantService.getRestaurants(req);
    return restaurants;
  }
}
