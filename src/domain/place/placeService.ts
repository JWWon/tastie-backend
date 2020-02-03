import { Inject, Injectable } from '@nestjs/common';
import { PlacePlugin, PlacePluginToken } from './placePlugin';
import { Place, QueryPlaceRequest } from '@/domain/place/dto';

@Injectable()
export class PlaceService {
  constructor(
    @Inject(PlacePluginToken)
    private readonly placePlugin: PlacePlugin,
  ) {}

  async getPlaces(req: QueryPlaceRequest): Promise<Place[]> {
    const places = await this.placePlugin.getTouristAttractionPlaces(
      req.location,
      req.radius,
    );

    const cmpFunc = (a: Place, b: Place) => {
      if (a.userRatingsTotal > b.userRatingsTotal) return -1;
      if (a.userRatingsTotal < b.userRatingsTotal) return 1;
      return 0;
    };

    return places.sort(cmpFunc).splice(0, req.count);
  }
}
