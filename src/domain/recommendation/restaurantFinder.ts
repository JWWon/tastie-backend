/* eslint-disable no-restricted-syntax */
import {
  FoodKeywordType,
  CategoryType,
  Coordinate,
  SituationType,
} from '@/entities';
import { PlacePlugin, PlaceSearchResponse, PlaceType } from '@/domain/place';

interface Param {
  readonly category: CategoryType;
  readonly situation: SituationType;
  readonly location: Coordinate;
  readonly foodKeywords: FoodKeywordType[];
}

const getPlaceTypeByCategory = (category: CategoryType): PlaceType => {
  const categoryPlaceTypeMapper = new Map<CategoryType, PlaceType>([
    ['카페', 'cafe'],
    ['술자리', 'bar'],
  ]);

  return categoryPlaceTypeMapper.has(category)
    ? categoryPlaceTypeMapper.get(category)
    : 'restaurant';
};

export class RestaurantFinder {
  constructor(private readonly placePlugin: PlacePlugin) {}

  async find(param: Param): Promise<PlaceSearchResponse[]> {
    const placeType = getPlaceTypeByCategory(param.category);
    const coordinate = param.location;
    const radius = 1000;

    const places =
      param.foodKeywords.length > 0
        ? await this.getAllPlaces(coordinate, placeType, param.foodKeywords)
        : await this.placePlugin.getPlaces({
            placeType,
            coordinate,
            radius,
          });

    return places;
  }

  private async getAllPlaces(
    coordinate: Coordinate,
    placeType: PlaceType,
    keywords: FoodKeywordType[],
  ): Promise<PlaceSearchResponse[]> {
    const tasks = [];
    for (const keyword of keywords) {
      tasks.push(
        this.placePlugin.getPlaces({
          coordinate,
          keyword,
          placeType,
          radius: 1000,
        }),
      );
    }

    const places: PlaceSearchResponse[][] = await Promise.all(tasks);
    const placeByPlaceID = new Map<string, PlaceSearchResponse>();
    for (const outerPlaces of places) {
      for (const place of outerPlaces) {
        placeByPlaceID.set(place.placeID, place);
      }
    }

    return Array.from(placeByPlaceID.values());
  }
}
