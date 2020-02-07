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
  PlaceDetailResponse,
  PlacePhoto,
} from '../../domain/place';
import { PlaceOpeningHours } from '@/domain/place/placePlugin';

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

  async getPlaceDetailByPlaceID(placeID: string): Promise<PlaceDetailResponse> {
    return this.client
      .place({
        placeid: placeID,
        language: 'ko',
      })
      .asPromise()
      .then(res => {
        const place = res.json.result;
        const openingHours: PlaceOpeningHours =
          place.opening_hours === undefined
            ? {
                weekdayText: [],
              }
            : {
                openNow: place.opening_hours.open_now,
                weekdayText: place.opening_hours.weekday_text,
              };

        const result: PlaceDetailResponse = {
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
          formattedAddress: place.formatted_address,
          formattedPhoneNumber: place.formatted_phone_number,
          openingHours,
          photos: place.photos.map(photo => {
            return {
              reference: photo.photo_reference,
              width: photo.width,
              height: photo.height,
              url: '',
            };
          }),
        };

        return result;
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
        keyword: param.keyword,
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

  async getPhotoUrls(photos: PlacePhoto[]): Promise<string[]> {
    const tasks = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const photo of photos) {
      tasks.push(
        this.client
          .placesPhoto({
            photoreference: photo.reference,
            maxwidth: photo.width,
          })
          .asPromise(),
      );
    }

    const responses = await Promise.all(tasks);

    const urls = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const res of responses) {
      urls.push(`https://lh3.googleusercontent.com${res.req.path}`);
    }

    return urls;
  }
}
