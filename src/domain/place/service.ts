import { Inject, Injectable } from '@nestjs/common';
import { PlaceUsecase } from './usecase';
import { PlacePlugin, PlacePluginToken } from './placePlugin';
import { Location, Place } from '@/domain/place/dto';

@Injectable()
export class PlaceService implements PlaceUsecase {
  constructor(
    @Inject(PlacePluginToken)
    private readonly placePlugin: PlacePlugin,
  ) {}

  async getPlaces(location: Location): Promise<Place[]> {
    const places = await this.placePlugin.getTouristAttractionPlaces(location);
    const cmpFunc = (a, b) => {
      if (a.userRatingsTotal > b.userRatingsTotal) return -1;
      if (a.userRatingsTotal < b.userRatingsTotal) return 1;
      return 0;
    };

    return places.sort(cmpFunc).splice(0, 5);
  }
}
