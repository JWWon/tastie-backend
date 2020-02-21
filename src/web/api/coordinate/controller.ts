import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { QueryAddressRequestDTO } from './request';
import { CoordinateService } from '@/domain/coordinate';

@ApiTags('Coordinate')
@Controller('coordinate')
export class PlaceController {
  constructor(private readonly coordinateService: CoordinateService) {}

  @Get('address')
  @ApiResponse({ status: 200, type: String })
  async getPlaceAddress(@Query() req: QueryAddressRequestDTO): Promise<string> {
    const address = await this.coordinateService.getAddress(req);
    return address;
  }
}
