import { ApiTags, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CaseService } from '@/domain/case';
import {
  LocationResponseDTO,
  SituationResponseDTO,
  CategoryResponseDTO,
  PreferencesResponseDTO,
} from './response';
import {
  QueryRegionRequestDTO,
  QueryCategoryRequestDTO,
  QuerySituationRequestDTO,
  QueryPreferencesRequestDTO,
} from './request';
import { HttpExceptionResponseDTO } from '../common/response';
import { validCategoryType, CategoryType } from '@/entities';

@ApiTags('Case')
@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Get('categories')
  @ApiResponse({ status: 200, type: CategoryResponseDTO, isArray: true })
  async getCategories(
    @Query() req: QueryCategoryRequestDTO,
  ): Promise<CategoryResponseDTO[]> {
    const categories = await this.caseService.getCategories({
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

    const situations = await this.caseService.getSituations({ category });
    return situations.map(situation => ({
      name: situation.name,
    }));
  }

  @Get('preferences')
  @ApiResponse({ status: 200, type: PreferencesResponseDTO, isArray: true })
  async getPreferences(
    @Query() req: QueryPreferencesRequestDTO,
  ): Promise<PreferencesResponseDTO[]> {
    const preferences = await this.caseService.getPreferences(req);
    return preferences;
  }

  @Get('locations')
  @ApiResponse({ status: 200, type: LocationResponseDTO, isArray: true })
  async getLocations(
    @Query() req: QueryRegionRequestDTO,
  ): Promise<LocationResponseDTO[]> {
    // eslint-disable-next-line prefer-destructuring
    const radius: any = req.radius;
    const places = await this.caseService.getPlaces({
      location: {
        latitude: req.latitude,
        longitude: req.longitude,
      },
      radius: parseInt(radius, 10) || 3000,
      count: req.count || 5,
    });

    const result: LocationResponseDTO[] = places.map(place => ({
      id: place.id,
      name: place.name,
      rating: place.rating,
      location: place.location,
    }));

    return result;
  }
}
