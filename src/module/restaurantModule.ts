import { Module } from '@nestjs/common';
import { RestaurantController } from '@/web/api/restaurant/controller';
import {
  RestaurantService,
  RestaurantRecommenderToken,
  RuleBasedRestaurantRecommender,
} from '@/domain/restaurant';
import { GooglePlacePlugin } from '@/infrastructure/place/goolgePlacePlugin';
import { PlacePluginToken } from '@/domain/place/placePlugin';
import { CategoryRepositoryToken } from '@/interfaces/repositories';
import { MemoryCategoryRepository } from '@/infrastructure/repositories';

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
    { provide: PlacePluginToken, useClass: GooglePlacePlugin },
  ],
})
export class RestaurantModule {}
