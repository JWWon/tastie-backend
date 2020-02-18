/* eslint-disable no-restricted-syntax */
import { Inject } from '@nestjs/common';
import {
  QueryCategoryRequest,
  QuerySituationRequest,
  QueryRecommendRestaurantRequest,
  RestaurantDetailResponse,
  QueryPreferencesRequest,
  PreferencesResponse,
} from './dto';
import {
  PlacePluginToken,
  PlacePlugin,
  PlaceQueryResponse,
  PlaceType,
  PlaceDetailResponse,
} from '../place/placePlugin';
import {
  RestaurantRecommender,
  RestaurantRecommenderToken,
} from './business/restaurantRecommender';
import {
  CategoryRepositoryToken,
  CategoryRepository,
  SituationRepositoryToken,
  SituationRepository,
  PreferenceRepositoryToken,
  PreferenceRepository,
} from '@/interfaces/repositories';
import { Situation, Category, CategoryType, FoodKeywordType } from '@/entities';

const categoryPlaceTypeMapper = new Map<CategoryType, PlaceType>([
  ['디저트', 'cafe'],
  ['술자리', 'bar'],
]);

const getPlaceTypeByCategory = (category: CategoryType): PlaceType => {
  return categoryPlaceTypeMapper.has(category)
    ? categoryPlaceTypeMapper.get(category)
    : 'restaurant';
};

export class RestaurantService {
  constructor(
    @Inject(PlacePluginToken)
    private readonly placePlugin: PlacePlugin,
    @Inject(RestaurantRecommenderToken)
    private readonly restaurantRecommender: RestaurantRecommender,
    @Inject(CategoryRepositoryToken)
    private readonly categoryRepository: CategoryRepository,
    @Inject(SituationRepositoryToken)
    private readonly situationRepository: SituationRepository,
    @Inject(PreferenceRepositoryToken)
    private readonly preferenceRepository: PreferenceRepository,
  ) {}

  async getCategories(req: QueryCategoryRequest): Promise<Category[]> {
    const categories = await this.categoryRepository.getAll(req.utcNow);
    return categories;
  }

  async getSituations(req: QuerySituationRequest): Promise<Situation[]> {
    const situations = this.situationRepository.getSituationsByCategory(
      req.category,
    );

    return situations.map(situation => ({
      name: situation,
    }));
  }

  async getAllPlaces(
    req: QueryRecommendRestaurantRequest,
    placeType: PlaceType,
    keywords: FoodKeywordType[],
  ): Promise<PlaceQueryResponse[]> {
    const tasks = [];
    for (const keyword of keywords) {
      tasks.push(
        this.placePlugin.getPlaces({
          location: req.location,
          keyword,
          placeType,
          radius: 1000,
        }),
      );
    }

    const places: PlaceQueryResponse[][] = await Promise.all(tasks);
    const placeByPlaceID = new Map<string, PlaceQueryResponse>();
    for (const outerPlaces of places) {
      for (const place of outerPlaces) {
        placeByPlaceID.set(place.placeID, place);
      }
    }

    return Array.from(placeByPlaceID.values());
  }

  async convertPlacesToDetail(
    places: PlaceQueryResponse[],
  ): Promise<PlaceDetailResponse[]> {
    const tasks = [];
    for (const place of places) {
      tasks.push(this.placePlugin.getPlaceDetailByPlaceID(place.placeID));
    }

    const detailPlaces = await Promise.all(tasks);
    return detailPlaces;
  }

  async getRecommendRestaurant(
    req: QueryRecommendRestaurantRequest,
  ): Promise<RestaurantDetailResponse | undefined> {
    const placeType = getPlaceTypeByCategory(req.category);
    const foodKeywords = this.situationRepository.getFoodKeywordsBySituation(
      req.situation,
    );

    const allPlaces: PlaceQueryResponse[] = await this.getAllPlaces(
      req,
      placeType,
      foodKeywords,
    );

    const places =
      allPlaces.length > 0
        ? allPlaces
        : await this.placePlugin.getPlaces({
            location: req.location,
            placeType,
            radius: 1000,
          });

    if (places.length <= 0) {
      return undefined;
    }

    const openFilter = (detailPlace: PlaceDetailResponse): boolean =>
      detailPlace.openingHours?.openNow === true;
    const restaurants = (await this.convertPlacesToDetail(places)).filter(
      openFilter,
    );
    const recommendRestaurant = this.restaurantRecommender.recommend(
      req,
      restaurants,
    );

    const restaurantDetailInfo = await this.placePlugin.getPlaceDetailByPlaceID(
      recommendRestaurant.placeID,
    );

    return {
      ...restaurantDetailInfo,
      photoUrls: await this.placePlugin.getPhotoUrls(
        restaurantDetailInfo.photos,
      ),
    };
  }

  async getPreferences(
    req: QueryPreferencesRequest,
  ): Promise<PreferencesResponse[]> {
    const preferences = this.preferenceRepository.getPreferences();
    return preferences;
  }
}
