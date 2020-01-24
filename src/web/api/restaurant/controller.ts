import { Controller, Get, Post, Inject, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { RestaurantUsecase, RestaurantUsecaseToken } from '@/domain/restaurant';
import {
  CategoryResponseDTO,
  SituationResponseDTO,
  RestaurantResponseDTO,
} from './response';
import {
  QueryCategoryRequestDTO,
  RecommendRestaurantRequestDTO,
} from './request';

@ApiTags('Restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(
    @Inject(RestaurantUsecaseToken)
    private readonly restaurantService: RestaurantUsecase,
  ) {}

  @Get('categories')
  @ApiResponse({ status: 200, type: CategoryResponseDTO, isArray: true })
  async getCategories(
    @Query() req: QueryCategoryRequestDTO,
  ): Promise<CategoryResponseDTO[]> {
    const categories = await this.restaurantService.getCategories({
      now: req.now || new Date(),
    });

    return categories.map(category => ({
      name: category.name,
    }));
  }

  @Get('situations')
  @ApiResponse({ status: 200, type: SituationResponseDTO, isArray: true })
  async getSituations(): Promise<SituationResponseDTO[]> {
    const situations = await this.restaurantService.getSituations({});

    return situations.map(situation => ({
      name: situation.name,
    }));
  }

  @Post('')
  @ApiResponse({ status: 200, type: RestaurantResponseDTO })
  async getRecommendRestaurant(
    @Body() req: RecommendRestaurantRequestDTO,
  ): Promise<RestaurantResponseDTO> {
    return {
      name: '',
    };
  }
}
