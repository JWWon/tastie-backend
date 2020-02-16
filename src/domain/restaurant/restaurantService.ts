import { Inject } from '@nestjs/common';
import { Category, Situation, Restaurant } from './model';
import { filterCategoriesByTimeSlot } from './business/categoryFilter';
import { filterSituationsByTimeSlot } from './business/situationFilter';
import {
  convertTimeSlotFromDate,
  convertKoreanDateFromUTC,
} from './business/timeSlotConverter';
import {
  QueryCategoryRequest,
  QuerySituationRequest,
  QueryRecommendRestaurantRequest,
  RestaurantDetailResponse,
  QueryPreferencesRequest,
  PreferencesResponse,
} from './dto';
import { TimeSlot } from './model/timeSlot';
import {
  PlacePluginToken,
  PlacePlugin,
  PlaceQueryResponse,
} from '../place/placePlugin';
import {
  RestaurantRecommender,
  RestaurantRecommenderToken,
} from './business/restaurantRecommender';

export class RestaurantService {
  constructor(
    @Inject(PlacePluginToken)
    private readonly placePlugin: PlacePlugin,
    @Inject(RestaurantRecommenderToken)
    private readonly restaurantRecommender: RestaurantRecommender,
  ) {}

  async getCategories(req: QueryCategoryRequest): Promise<Category[]> {
    const koreanDate = convertKoreanDateFromUTC(req.utcNow);
    const timeSlot = convertTimeSlotFromDate(koreanDate);
    const categories: Category[] = [
      {
        id: Symbol().toString(),
        name: '아침',
        priorities: [TimeSlot.Morning, TimeSlot.MorningAndNoon, TimeSlot.Dawn],
      },
      {
        id: Symbol().toString(),
        name: '브런치',
        priorities: [TimeSlot.MorningAndNoon, TimeSlot.Morning],
      },
      {
        id: Symbol().toString(),
        name: '간식',
        priorities: [TimeSlot.Morning, TimeSlot.MorningAndNoon],
      },
      {
        id: Symbol().toString(),
        name: '점심',
        priorities: [TimeSlot.Noon, TimeSlot.NoonAndEvening],
      },
      {
        id: Symbol().toString(),
        name: '저녁',
        priorities: [
          TimeSlot.Evening,
          TimeSlot.NoonAndEvening,
          TimeSlot.Night,
          TimeSlot.Noon,
        ],
      },
      {
        id: Symbol().toString(),
        name: '디저트',
        priorities: [
          TimeSlot.Morning,
          TimeSlot.MorningAndNoon,
          TimeSlot.Noon,
          TimeSlot.NoonAndEvening,
          TimeSlot.Evening,
          TimeSlot.Night,
        ],
      },
      {
        id: Symbol().toString(),
        name: '술자리',
        priorities: [TimeSlot.Evening, TimeSlot.Night, TimeSlot.Evening],
      },
      {
        id: Symbol().toString(),
        name: '야식',
        priorities: [TimeSlot.Night, TimeSlot.Dawn],
      },
    ];

    return filterCategoriesByTimeSlot(timeSlot, categories);
  }

  async getSituations(req: QuerySituationRequest): Promise<Situation[]> {
    const koreanDate = convertKoreanDateFromUTC(req.utcNow);
    const timeSlot = convertTimeSlotFromDate(koreanDate);
    const situations: Situation[] = [
      {
        id: Symbol().toString(),
        name: '간단한 끼니',
        priorities: [TimeSlot.Morning, TimeSlot.MorningAndNoon],
      },
      {
        id: Symbol().toString(),
        name: '설레는 여행',
        priorities: [
          TimeSlot.Dawn,
          TimeSlot.Evening,
          TimeSlot.Morning,
          TimeSlot.MorningAndNoon,
          TimeSlot.Night,
          TimeSlot.Noon,
          TimeSlot.NoonAndEvening,
        ],
      },
      {
        id: Symbol().toString(),
        name: '해장',
        priorities: [TimeSlot.Morning, TimeSlot.MorningAndNoon],
      },
      {
        id: Symbol().toString(),
        name: '데이트',
        priorities: [
          TimeSlot.MorningAndNoon,
          TimeSlot.Noon,
          TimeSlot.NoonAndEvening,
          TimeSlot.Evening,
          TimeSlot.Night,
        ],
      },
      {
        id: Symbol().toString(),
        name: '새로운 맛집 도전',
        priorities: [
          TimeSlot.MorningAndNoon,
          TimeSlot.Noon,
          TimeSlot.NoonAndEvening,
          TimeSlot.Evening,
          TimeSlot.Night,
        ],
      },
      {
        id: Symbol().toString(),
        name: '실패 없는 맛집 가기',
        priorities: [
          TimeSlot.MorningAndNoon,
          TimeSlot.Noon,
          TimeSlot.NoonAndEvening,
          TimeSlot.Evening,
          TimeSlot.Night,
        ],
      },
      {
        id: Symbol().toString(),
        name: '소개팅',
        priorities: [
          TimeSlot.MorningAndNoon,
          TimeSlot.Noon,
          TimeSlot.NoonAndEvening,
          TimeSlot.Evening,
          TimeSlot.Night,
        ],
      },
      {
        id: Symbol().toString(),
        name: '혼자만의 시간',
        priorities: [
          TimeSlot.MorningAndNoon,
          TimeSlot.Noon,
          TimeSlot.NoonAndEvening,
          TimeSlot.Evening,
          TimeSlot.Night,
          TimeSlot.Dawn,
        ],
      },
      {
        id: Symbol().toString(),
        name: '친구들과 신나는 파티',
        priorities: [TimeSlot.Evening, TimeSlot.Night, TimeSlot.Dawn],
      },
      {
        id: Symbol().toString(),
        name: '진지한 자리',
        priorities: [TimeSlot.Night, TimeSlot.Dawn],
      },
    ];

    return filterSituationsByTimeSlot(timeSlot, situations);
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
