import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('Place')
@Controller('places')
export class PlaceController {
  @Get()
  getPlaces() {}
}
