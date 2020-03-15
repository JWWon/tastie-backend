import { Module } from '@nestjs/common';
import { RecommendationController } from '@/web/api/recommendation/recommendationController';
import {
  RecommendationService,
  RuleBasedRestaurantRecommender,
  RestaurantRecommenderToken,
} from '@/domain/recommendation';
import { PlacePluginToken } from '@/domain/place';
import { GooglePlaceV2Plugin } from '@/infrastructure/place/googlePlaceV2Plugin';

@Module({
  controllers: [RecommendationController],
  providers: [
    RecommendationService,
    {
      provide: RestaurantRecommenderToken,
      useClass: RuleBasedRestaurantRecommender,
    },
    { provide: PlacePluginToken, useClass: GooglePlaceV2Plugin },
  ],
})
export class RecommendationModule {}
