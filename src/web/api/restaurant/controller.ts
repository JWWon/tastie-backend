import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import {
  CategoryResponseDTO,
  SituationResponseDTO,
  RestaurantResponseDTO,
  PreferencesResponseDTO,
} from './response';
import {
  QueryCategoryRequestDTO,
  RecommendRestaurantRequestDTO,
  QuerySituationRequestDTO,
  QueryPreferencesRequestDTO,
} from './request';
import { RestaurantService } from '@/domain/restaurant';
import { HttpExceptionResponseDTO } from '../common/response';
import { CategoryType } from '@/entities';
import { validCategoryType } from '@/entities/category';

@ApiTags('Restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('categories')
  @ApiResponse({ status: 200, type: CategoryResponseDTO, isArray: true })
  async getCategories(
    @Query() req: QueryCategoryRequestDTO,
  ): Promise<CategoryResponseDTO[]> {
    const categories = await this.restaurantService.getCategories({
      utcNow: new Date(req.now || Date.now()),
    });

    return categories.map(category => ({
      name: category.name,
    }));
  }

  @Get('situations')
  @ApiResponse({ status: 200, type: SituationResponseDTO, isArray: true })
  @ApiBadRequestResponse({
    type: HttpExceptionResponseDTO,
    description: '유효하지 않은 카테고리를 넘겼을 경우',
  })
  async getSituations(
    @Query() req: QuerySituationRequestDTO,
  ): Promise<SituationResponseDTO[]> {
    const category = req.category as CategoryType;
    if (category === undefined || !validCategoryType(category)) {
      throw new HttpException(
        'Category is not allowed',
        HttpStatus.BAD_REQUEST,
      );
    }

    const situations = await this.restaurantService.getSituations({ category });
    return situations.map(situation => ({
      name: situation.name,
    }));
  }

  @Get('preferences')
  @ApiResponse({ status: 200, type: QueryPreferencesRequestDTO, isArray: true })
  async getPreferences(
    @Query() req: QueryPreferencesRequestDTO,
  ): Promise<PreferencesResponseDTO[]> {
    const preferences = await this.restaurantService.getPreferences(req);
    return preferences;
  }

  @Get('')
  @ApiResponse({ status: 200, type: RestaurantResponseDTO })
  @ApiNotFoundResponse({
    type: HttpExceptionResponseDTO,
    description: '적절한 레스토랑을 찾지 못했을 경우',
  })
  async getRecommendRestaurant(
    @Query() req: RecommendRestaurantRequestDTO,
  ): Promise<RestaurantResponseDTO> {
    const restaurant = await this.restaurantService.getRecommendRestaurant({
      location: {
        latitude: req.latitude,
        longitude: req.longitude,
      },
      category: req.category,
      situation: req.situation,
    });

    if (restaurant === undefined) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    return {
      id: restaurant.placeID,
      name: restaurant.name,
      rating: restaurant.rating,
      userRatingsTotal: restaurant.userRatingsTotal,
      priceLevel: restaurant.priceLevel,
      types: restaurant.types,
      location: restaurant.location,
      formattedAddress: restaurant.formattedAddress,
      formattedPhoneNumber: restaurant.formattedPhoneNumber,
      website: restaurant.website,
      openingHours: restaurant.openingHours,
      photoUrls: restaurant.photoUrls,
    };
  }
}
