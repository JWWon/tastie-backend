import { Module } from '@nestjs/common';
import { RestaurantController } from '@/web/api/restaurant/controller';
import {
  RestaurantService,
  RestaurantRecommenderToken,
  RuleBasedRestaurantRecommender,
} from '@/domain/restaurant';
import { GooglePlacePlugin } from '@/domain/place/googlePlacePlugin';
import { PlacePluginToken } from '@/domain/place/placePlugin';

@Module({
  controllers: [RestaurantController],
  providers: [
    RestaurantService,
    {
      provide: RestaurantRecommenderToken,
      useClass: RuleBasedRestaurantRecommender,
    },
    { provide: PlacePluginToken, useClass: GooglePlacePlugin },
  ],
})
export class RestaurantModule {}
