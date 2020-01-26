import * as googleMap from '@google/maps';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PlacePlugin } from './placePlugin';
import { Place, Location } from './dto';

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

  async getRestaurants(location: Location): Promise<Place[]> {
    return this.client
      .placesNearby({
        location: { lat: location.latitude, lng: location.longitude },
        radius: 1000,
        language: 'ko',
        type: 'restaurant',
      })
      .asPromise()
      .then(res => {
        console.log(res.json.results);
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
