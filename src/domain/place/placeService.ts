import { Inject, Injectable } from '@nestjs/common';
import {
  PlacePlugin,
  PlacePluginToken,
  PlaceQueryResponse,
} from './placePlugin';
import {
  Place,
  QueryPlaceRequest,
  QueryAddressRequest,
} from '@/domain/place/dto';

@Injectable()
export class PlaceService {
  constructor(
    @Inject(PlacePluginToken)
    private readonly placePlugin: PlacePlugin,
  ) {}

  async getAddress(req: QueryAddressRequest): Promise<string> {
    const address = await this.placePlugin.getAddress(req);
    return address;
  }

  async getPlaces(req: QueryPlaceRequest): Promise<Place[]> {
    const placeResponse = await this.placePlugin.getPlaces({
      location: req.location,
      radius: req.radius,
      placeType: 'tourist_attraction',
    });

    const convert = (res: PlaceQueryResponse): Place => {
      return {
        id: res.placeID,
        name: res.name,
        location: res.location,
        rating: res.rating,
        userRatingsTotal: res.userRatingsTotal,
      };
    };

    const places = placeResponse.map(convert);
    const cmpFunc = (a: Place, b: Place) => {
      if (a.userRatingsTotal > b.userRatingsTotal) return -1;
      if (a.userRatingsTotal < b.userRatingsTotal) return 1;
      return 0;
    };

    return places.sort(cmpFunc).splice(0, req.count);
  }
}
