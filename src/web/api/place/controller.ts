import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { QueryRegionRequestDTO, QueryAddressRequestDTO } from './request';
import { PlaceResponseDTO } from './response';
import { PlaceService } from '@/domain/place';

@ApiTags('Place')
@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

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
      location: place.location,
    }));

    return result;
  }

  @Get('address')
  @ApiResponse({ status: 200, type: String })
  async getPlaceAddress(@Query() req: QueryAddressRequestDTO): Promise<string> {
    return 'abcd';
  }
}
