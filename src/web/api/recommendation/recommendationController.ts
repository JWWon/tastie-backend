import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { RecommendationResponseDTO } from './response';
import { RecommendationRequestDTO } from './request';
import { RecommendationService } from '@/domain/recommendation';
import { HttpExceptionResponseDTO } from '../common/response';
import { CategoryType, SituationType } from '@/entities';
import { RecommendationResponse } from './dto';
import { RecommendationResponsePresenter } from './presenter';

@ApiTags('Recommendation')
@Controller('')
export class RecommendationController {
  constructor(private readonly restaurantService: RecommendationService) {}

  toRecommendationResponse(restaurant: any): RecommendationResponseDTO {
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

  @Get('recommendations')
  @ApiResponse({ status: 200, type: RecommendationResponseDTO, isArray: true })
  @ApiNotFoundResponse({
    type: HttpExceptionResponseDTO,
    description: '적절한 추천을 찾지 못했을 경우',
  })
  async getRecommendations(
    @Query() req: RecommendationRequestDTO,
  ): Promise<RecommendationResponse[]> {
    const recommendations = await this.restaurantService.getRecommendations({
      location: {
        latitude: req.latitude,
        longitude: req.longitude,
      },
      category: req.category as CategoryType,
      situation: req.situation as SituationType,
      length: req.length ?? 5,
    });

    const presenter = new RecommendationResponsePresenter(recommendations);
    return presenter.present();
  }

  @Get('recommendations/:placeID')
  @ApiOkResponse({ type: RecommendationResponseDTO })
  @ApiNotFoundResponse({
    type: HttpExceptionResponseDTO,
    description: 'PlaceID에 해당하는 추천이 존재하지 않을 때',
  })
  async getRecommendationByPlaceID(
    @Param('placeID') placeID: string,
  ): Promise<RecommendationResponseDTO> {
    const recommendation = await this.restaurantService.getRecommendationByPlaceID(
      placeID,
    );

    if (recommendation === undefined) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    return this.toRecommendationResponse(recommendation);
  }

  // deprecated api
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

    return this.toRecommendationResponse(restaurant);
  }
}
