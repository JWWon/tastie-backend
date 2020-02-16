import { Inject } from '@nestjs/common';
import { Restaurant } from './model';
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
} from '@/interfaces/repositories';
import { Situation, Category } from '@/entities';

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

  async getRecommendRestaurant(
    req: QueryRecommendRestaurantRequest,
  ): Promise<RestaurantDetailResponse | undefined> {
    const categoryMap = {
      디저트: 'cafe',
      술자리: 'bar',
    };

    const placeType =
      req.category in categoryMap ? categoryMap[req.category] : 'restaurant';

    const placesCache = await this.placePlugin.getPlaces({
      location: req.location,
      keyword: req.situation,
      placeType,
      radius: 1000,
    });

    const places =
      placesCache.length > 0
        ? placesCache
        : await this.placePlugin.getPlaces({
            location: req.location,
            placeType,
            radius: 1000,
          });

    if (places.length <= 0) {
      return undefined;
    }

    const convert = (res: PlaceQueryResponse): Restaurant => {
      return {
        id: res.placeID,
        name: res.name,
        location: res.location,
        rating: res.rating,
        userRatingsTotal: res.userRatingsTotal,
      };
    };

    const restaurants = places.map(convert);
    const recommendRestaurant = this.restaurantRecommender.recommend(
      req,
      restaurants,
    );

    const restaurantDetailInfo = await this.placePlugin.getPlaceDetailByPlaceID(
      recommendRestaurant.id,
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
    return [
      { name: '매콤한' },
      { name: '느끼한' },
      { name: '담백한' },
      { name: '분위기가 좋은' },
      { name: '저렴한' },
    ];
  }
}
