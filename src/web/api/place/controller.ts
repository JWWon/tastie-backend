import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, Inject } from '@nestjs/common';
import { QueryRegionRequestDTO } from './request';
import { PlaceUsecase, PlaceUsecaseToken } from '@/domain/place/usecase';

@ApiTags('Place')
@Controller('places')
export class PlaceController {
  constructor(
    @Inject(PlaceUsecaseToken) private readonly placeService: PlaceUsecase,
  ) {}

  @Get()
  async getPlaces(@Query() req: QueryRegionRequestDTO): Promise<void> {
    console.log(req);

    await this.placeService.getPlaces();
  }
}
