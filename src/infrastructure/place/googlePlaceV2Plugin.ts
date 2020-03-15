import { Client } from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import {
  PlacePlugin,
  PlaceSearchParam,
  PlaceSearchResponse,
  PlaceDetailResponse,
  PlacePhoto,
  PlaceOpeningHours,
} from '@/interfaces/place';
import { Coordinate } from '@/entities';

const defaultLanguage = 'ko';

@Injectable()
export class GooglePlaceV2Plugin implements PlacePlugin {
  private readonly client: Client;

  private readonly apiKey: string;

  constructor(configService: ConfigService) {
    this.apiKey = configService.get<string>('google.apiKey');
    this.client = new Client();
  }

  async getAddress(coordinate: Coordinate): Promise<string> {
    const res = await this.client.reverseGeocode({
      params: {
        latlng: coordinate,
        language: defaultLanguage,
        key: this.apiKey,
      },
    });

    const json = res.data.results;
    return json.length > 0 ? json[0].formatted_address : '';
  }

  async getPlaceDetailByPlaceID(placeID: string): Promise<PlaceDetailResponse> {
    const res = await this.client.placeDetails({
      params: {
        place_id: placeID,
        language: 'ko',
        key: this.apiKey,
      },
    });

    const json = res.data.result;
    if (json === undefined) {
      return undefined;
    }

    const openingHours: PlaceOpeningHours =
      json.opening_hours === undefined
        ? {
            weekdayText: [],
          }
        : {
            openNow: json.opening_hours.open_now,
            weekdayText: json.opening_hours.weekday_text,
          };

    return {
      placeID: json.place_id,
      name: json.name,
      rating: json.rating,
      // eslint-disable-next-line dot-notation
      userRatingsTotal: json['user_ratings_total'],
      priceLevel: json.price_level,
      types: json.types,
      coordinate: {
        longitude: json.geometry.location.lng,
        latitude: json.geometry.location.lat,
      },
      formattedAddress: json.vicinity,
      formattedPhoneNumber: json.formatted_phone_number,
      openingHours,
      photos: json.photos ?? [],
    };
  }

  async getPlaces(param: PlaceSearchParam): Promise<PlaceSearchResponse[]> {
    const { radius, placeType, keyword, coordinate } = param;
    const res = await this.client.placesNearby({
      params: {
        location: coordinate,
        radius,
        keyword,
        type: placeType,
        language: defaultLanguage,
        key: this.apiKey,
      },
    });

    const json = res.data.results;
    return json.map(
      (place): PlaceSearchResponse => {
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
        };
      },
    );
  }

  async getPhotoUrls(photos: PlacePhoto[]): Promise<string[]> {
    const tasks = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const photo of photos) {
      tasks.push(this.getPhotoUrl(photo));
    }

    return Promise.all(tasks);
  }

  async getPhotoUrl(photo: PlacePhoto): Promise<string> {
    if (photo === undefined) {
      return '';
    }

    return this.client
      .placePhoto({
        params: {
          photoreference: photo.photo_reference,
          maxwidth: photo.width,
          key: this.apiKey,
        },
      })
      .then(res => {
        return res.request.res.responseUrl;
      });
  }
}
