import {
  GoogleMapsClientWithPromise,
  createClient as createGoogleClient,
  PlaceSearchResult,
} from '@google/maps';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import {
  PlacePlugin,
  PlaceSearchParam,
  PlaceSearchResponse,
  PlaceDetailResponse,
  PlacePhoto,
  PlaceOpeningHours,
} from '@/domain/place';
import { Coordinate } from '@/entities';

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

  async getAddress(coordinate: Coordinate): Promise<string> {
    return this.client
      .reverseGeocode({
        latlng: {
          lat: coordinate.latitude,
          lng: coordinate.longitude,
        },
        language: 'ko',
      })
      .asPromise()
      .then(res => {
        // eslint-disable-next-line prefer-destructuring
        const results = res.json.results;
        if (results.length < 1) {
          return '';
        }

        return results[0].formatted_address;
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
          coordinate: {
            longitude: place.geometry.location.lng,
            latitude: place.geometry.location.lat,
          },
          formattedAddress: place.formatted_address,
          formattedPhoneNumber: place.formatted_phone_number,
          openingHours,
          photos: place.photos ?? [],
        };

        return result;
      });
  }

  async getPlaces(param: PlaceSearchParam): Promise<PlaceSearchResponse[]> {
    return this.client
      .placesNearby({
        location: {
          lat: param.coordinate.latitude,
          lng: param.coordinate.longitude,
        },
        radius: param.radius,
        type: param.placeType,
        keyword: param.keyword,
        language: 'ko',
      })
      .asPromise()
      .then(res => {
        const convertFunc = (place: PlaceSearchResult): PlaceSearchResponse => {
          return {
            placeID: place.place_id,
            name: place.name,
            rating: place.rating,
            // eslint-disable-next-line dot-notation
            userRatingsTotal: place['user_ratings_total'],
            priceLevel: place.price_level,
            types: place.types,
            coordinate: {
              longitude: place.geometry.location.lng,
              latitude: place.geometry.location.lat,
            },
            photos: place.photos ?? [],
            address: place.vicinity,
          };
        };

        const result: PlaceSearchResponse[] = res.json.results.map(convertFunc);
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
            photoreference: photo.photo_reference,
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

  async getPhotoUrl(photo: PlacePhoto): Promise<string> {
    if (photo === undefined) {
      return '';
    }

    const res = await this.client.placesPhoto({
      photoreference: photo.photo_reference,
      maxwidth: photo.width,
    }).asPromise();
    
    return `https://lh3.googleusercontent.com${res.req.path}`;
  }
}
