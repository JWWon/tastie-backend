import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Query, Inject } from '@nestjs/common';
import { QueryRegionRequestDTO } from './request';
import { PlaceUsecase, PlaceUsecaseToken } from '@/domain/place/usecase';
import { PlaceResponseDTO } from './response';

@ApiTags('Place')
@Controller('places')
export class PlaceController {
  constructor(
    @Inject(PlaceUsecaseToken) private readonly placeService: PlaceUsecase,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: PlaceResponseDTO, isArray: true })
  async getPlaces(
    @Query() req: QueryRegionRequestDTO,
  ): Promise<PlaceResponseDTO[]> {
    // eslint-disable-next-line prefer-destructuring
    const radius: any = req.radius;
    const places = await this.placeService.getPlaces({
      location: {
        latitude: req.latitude,
        longitude: req.longitude,
      },
      radius: parseInt(radius, 10) || 3000,
      count: req.count || 5,
    });

    const result: PlaceResponseDTO[] = places.map(place => ({
      id: place.id,
      name: place.name,
      rating: place.rating,
    }));

    return result;
  }
}
