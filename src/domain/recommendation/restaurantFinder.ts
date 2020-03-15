/* eslint-disable no-restricted-syntax */
import { FoodKeywordType, CategoryType, Coordinate } from '@/entities';
import { PlacePlugin, PlaceSearchResponse, PlaceType } from '@/domain/place';

interface Param {
  category: CategoryType;
  location: Coordinate;
  foodKeywords: FoodKeywordType[];
}

const getPlaceTypeByCategory = (category: CategoryType): PlaceType => {
  const categoryPlaceTypeMapper = new Map<CategoryType, PlaceType>([
    ['디저트', 'cafe'],
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
    const places = await this.getAllPlaces(
      param.location,
      placeType,
      param.foodKeywords,
    );

    if (places.length > 0) {
      return places;
    }

    const minorPlaces = await this.placePlugin.getPlaces({
      coordinate: param.location,
      radius: 1000,
      placeType,
    });

    return minorPlaces;
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
