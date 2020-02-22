import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { RecommendationResponseDTO } from './response';
import { RecommendationRequestDTO } from './request';
import {
  RecommendationService,
  RestaurantDetailResponse,
} from '@/domain/recommendation';
import { HttpExceptionResponseDTO } from '../common/response';
import { CategoryType, SituationType } from '@/entities';

@ApiTags('Recommendation')
@Controller('')
export class RestaurantController {
  constructor(private readonly restaurantService: RecommendationService) {}

  @Get('recommendations')
  @ApiResponse({ status: 200, type: RecommendationResponseDTO, isArray: true })
  @ApiNotFoundResponse({
    type: HttpExceptionResponseDTO,
    description: '적절한 추천을 찾지 못했을 경우',
  })
  async getRecommendations(
    @Query() req: RecommendationRequestDTO,
  ): Promise<RecommendationResponseDTO[]> {
    const recommendations = await this.restaurantService.getRecommendations({
      location: {
        latitude: req.latitude,
        longitude: req.longitude,
      },
      category: req.category as CategoryType,
      situation: req.situation as SituationType,
      length: req.length ?? 5,
    });

    const convertResponse = (
      restaurant: RestaurantDetailResponse,
    ): RecommendationResponseDTO => ({
      id: restaurant.placeID,
      name: restaurant.name,
      rating: restaurant.rating,
      userRatingsTotal: restaurant.userRatingsTotal,
      priceLevel: restaurant.priceLevel,
      types: restaurant.types,
      location: restaurant.coordinate,
      formattedAddress: restaurant.formattedAddress,
      formattedPhoneNumber: restaurant.formattedPhoneNumber,
      website: restaurant.website,
      openingHours: restaurant.openingHours,
      photoUrls: restaurant.photoUrls,
    });

    return recommendations.map(convertResponse);
  }

  @Get('recommendation')
  @ApiResponse({ status: 200, type: RecommendationResponseDTO })
  @ApiNotFoundResponse({
    type: HttpExceptionResponseDTO,
    description: '적절한 추천을 찾지 못했을 경우',
  })
  async getRecommendRestaurant(
    @Query() req: RecommendationRequestDTO,
  ): Promise<RecommendationResponseDTO> {
    const restaurant = await this.restaurantService.getRecommendRestaurant({
      location: {
        latitude: req.latitude,
        longitude: req.longitude,
      },
      category: req.category as CategoryType,
      situation: req.situation as SituationType,
      length: 0,
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
      location: restaurant.coordinate,
      formattedAddress: restaurant.formattedAddress,
      formattedPhoneNumber: restaurant.formattedPhoneNumber,
      website: restaurant.website,
      openingHours: restaurant.openingHours,
      photoUrls: restaurant.photoUrls,
    };
  }
}
