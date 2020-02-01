import * as googleMap from '@google/maps';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PlacePlugin, QueryRestaurantParam } from './placePlugin';
import { Place, Location } from './dto';

const categoryMap = {
  디저트: 'cafe',
  술자리: 'bar',
};

@Injectable()
export class GooglePlacePlugin implements PlacePlugin {
  private readonly client: googleMap.GoogleMapsClientWithPromise;

  constructor(configService: ConfigService) {
    const googleApiKey = configService.get<string>('google.apiKey');

    this.client = googleMap.createClient({
      key: googleApiKey,
      Promise,
    });
  }

  async getRestaurants(param: QueryRestaurantParam): Promise<Place[]> {
    const placeType =
      param.category in categoryMap
        ? categoryMap[param.category]
        : 'restaurant';

    return this.client
      .placesNearby({
        location: {
          lat: param.location.latitude,
          lng: param.location.longitude,
        },
        radius: 1000,
        language: 'ko',
        type: placeType,
      })
      .asPromise()
      .then(res => {
        console.log('simple', res.json.results[0]);
        this.client
          .place({ placeid: res.json.results[0].place_id, language: 'ko' })
          .asPromise()
          .then(res2 => {
            console.log('detail', res2.json.result);
          });
        const places: Place[] = res.json.results.map(result => ({
          id: result.place_id,
          name: result.name,
          rating: result.rating,
          location: {
            longitude: result.geometry.location.lng,
            latitude: result.geometry.location.lat,
          },
          // eslint-disable-next-line dot-notation
          userRatingsTotal: result['user_ratings_total'],
        }));

        return places;
      });
  }

  async getTouristAttractionPlaces(
    location: Location,
    radius: number,
  ): Promise<Place[]> {
    return this.client
      .placesNearby({
        location: { lat: location.latitude, lng: location.longitude },
        radius,
        language: 'ko',
        type: 'tourist_attraction',
      })
      .asPromise()
      .then(res => {
        const places: Place[] = res.json.results.map(result => ({
          id: result.place_id,
          name: result.name,
          rating: result.rating,
          location: {
            longitude: result.geometry.location.lng,
            latitude: result.geometry.location.lat,
          },
          // eslint-disable-next-line dot-notation
          userRatingsTotal: result['user_ratings_total'],
        }));

        return places;
      });
  }
}
