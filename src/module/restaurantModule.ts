import { Module } from '@nestjs/common';
import { RestaurantController } from '@/web/api/restaurant/controller';
import {
  RestaurantService,
  RestaurantRecommenderToken,
  RuleBasedRestaurantRecommender,
} from '@/domain/restaurant';
import { GooglePlacePlugin } from '@/infrastructure/place/goolgePlacePlugin';
import { PlacePluginToken } from '@/domain/place/placePlugin';
import {
  CategoryRepositoryToken,
  SituationRepositoryToken,
  PreferenceRepositoryToken,
} from '@/interfaces/repositories';
import {
  MemoryCategoryRepository,
  MemorySituationRepository,
  MemoryPreferenceRepository,
} from '@/infrastructure/repositories';
import { RestaurantFinder } from '@/domain/restaurant/business/restaurantFinder';

@Module({
  controllers: [RestaurantController],
  providers: [
    RestaurantService,
    {
      provide: RestaurantRecommenderToken,
      useClass: RuleBasedRestaurantRecommender,
    },
    {
      provide: CategoryRepositoryToken,
      useClass: MemoryCategoryRepository,
    },
    {
      provide: SituationRepositoryToken,
      useClass: MemorySituationRepository,
    },
    {
      provide: PreferenceRepositoryToken,
      useClass: MemoryPreferenceRepository,
    },
    { provide: PlacePluginToken, useClass: GooglePlacePlugin },
  ],
})
export class RestaurantModule {}
