import * as googleMap from '@google/maps';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PlacePlugin } from './placePlugin';
import { Place, Location } from './dto';

@Injectable()
export class GooglePlacePlugin implements PlacePlugin {
  private readonly client: googleMap.GoogleMapsClientWithPromise;

  private readonly optionSearchRadius: number;

  private readonly optionOutputLanguage: string;

  constructor(configService: ConfigService) {
    const googleApiKey = configService.get<string>('google.apiKey');

    this.optionSearchRadius = configService.get<number>('google.searchRadius');
    this.optionOutputLanguage = configService.get<string>(
      'google.outputLanguage',
    );

    this.client = googleMap.createClient({
      key: googleApiKey,
      Promise,
    });
  }

  async getTouristAttractionPlaces(location: Location): Promise<Place[]> {
    return this.client
      .placesNearby({
        location: { lat: location.latitude, lng: location.longitude },
        radius: this.optionSearchRadius,
        language: 'ko',
        type: 'tourist_attraction',
      })
      .asPromise()
      .then(res => {
        const places: Place[] = res.json.results.map(result => ({
          id: result.place_id,
          name: result.name,
          rating: result.rating,
          // eslint-disable-next-line dot-notation
          userRatingsTotal: result['user_ratings_total'],
        }));

        return places;
      });
  }
}
