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
import {
  DiscoveryRequest,
  DiscoveryResponse,
  DiscoveryDetailResponse,
} from './dto';
import { DiscoveryService } from '@/domain/discovery';
import { HttpExceptionResponseDTO } from '../common/response';
import { CategoryType, SituationType } from '@/entities';
import { DiscoveryResponsePresenter } from './presenter';
import { DiscoveryDetailResponsePresenter } from './presenter/discoveryDetailResponsePresenter';

@ApiTags('Discovery API')
@Controller('')
export class DiscoveryController {
  constructor(private readonly discoveryService: DiscoveryService) {}

  @Get('discoveries')
  @ApiResponse({ status: 200, type: DiscoveryResponse, isArray: true })
  @ApiNotFoundResponse({
    type: HttpExceptionResponseDTO,
    description: '적절한 추천을 찾지 못했을 경우',
  })
  async getDiscoveries(
    @Query() req: DiscoveryRequest,
  ): Promise<DiscoveryResponse[]> {
    const discoveries = await this.discoveryService.getDiscoveries({
      location: {
        latitude: req.latitude,
        longitude: req.longitude,
      },
      category: req.category as CategoryType,
      situation: req.situation as SituationType,
      length: req.length ?? 5,
    });

    const presenter = new DiscoveryResponsePresenter(discoveries);
    return presenter.present();
  }

  @Get('discoveries/:placeID')
  @ApiOkResponse({ type: DiscoveryDetailResponse })
  @ApiNotFoundResponse({
    type: HttpExceptionResponseDTO,
    description: 'PlaceID에 해당하는 추천이 존재하지 않을 때',
  })
  async getDiscoveryByPlaceID(
    @Param('placeID') placeID: string,
  ): Promise<DiscoveryDetailResponse> {
    const discovery = await this.discoveryService.getDiscoveryByPlaceID(
      placeID,
    );

    if (discovery === undefined) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    const presenter = new DiscoveryDetailResponsePresenter(discovery);
    return presenter.present();
  }
}
