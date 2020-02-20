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
import { Situation, Category } from '@/entities';
import { RestaurantFinder } from './business/restaurantFinder';

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
    const categories = await this.categoryRepository.getCategoriesByUTCDate(
      req.utcNow,
    );

    return categories;
  }

  async getSituations(req: QuerySituationRequest): Promise<Situation[]> {
    const situations = this.situationRepository.getSituationsByCategory(
      req.category,
    );

    return situations;
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
    const foodKeywords = this.situationRepository.getFoodKeywordsBySituation(
      req.situation,
    );

    const restaurantFinder = new RestaurantFinder(this.placePlugin);
    const places = await restaurantFinder.find({
      category: req.category,
      location: req.location,
      foodKeywords,
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
