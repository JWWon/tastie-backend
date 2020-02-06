import {
  GoogleMapsClientWithPromise,
  createClient as createGoogleClient,
  PlaceSearchResult,
} from '@google/maps';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import {
  PlacePlugin,
  QueryPlacesParam,
  PlaceQueryResponse,
} from '../../domain/place';

@Injectable()
export class GooglePlacePlugin implements PlacePlugin {
  private readonly client: GoogleMapsClientWithPromise;

  constructor(configService: ConfigService) {
    const googleApiKey = configService.get<string>('google.apiKey');

    this.client = createGoogleClient({
      key: googleApiKey,
      Promise,
    });
  }

  async getPlaces(param: QueryPlacesParam): Promise<PlaceQueryResponse[]> {
    return this.client
      .placesNearby({
        location: {
          lat: param.location.latitude,
          lng: param.location.longitude,
        },
        radius: param.radius,
        type: param.placeType,
        language: 'ko',
      })
      .asPromise()
      .then(res => {
        const convertFunc = (place: PlaceSearchResult): PlaceQueryResponse => {
          return {
            placeID: place.place_id,
            name: place.name,
            rating: place.rating,
            // eslint-disable-next-line dot-notation
            userRatingsTotal: place['user_ratings_total'],
            priceLevel: place.price_level,
            types: place.types,
            location: {
              longitude: place.geometry.location.lng,
              latitude: place.geometry.location.lat,
            },
          };
        };

        const result: PlaceQueryResponse[] = res.json.results.map(convertFunc);
        return result;
      });
  }
}
