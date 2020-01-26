import { Module } from '@nestjs/common';
import { RestaurantController } from '@/web/api/restaurant/controller';
import { RestaurantService, RestaurantUsecaseToken } from '@/domain/restaurant';
import { GooglePlacePlugin } from '@/domain/place/googlePlacePlugin';
import { PlacePluginToken } from '@/domain/place/placePlugin';

@Module({
  controllers: [RestaurantController],
  providers: [
    { provide: RestaurantUsecaseToken, useClass: RestaurantService },
    { provide: PlacePluginToken, useClass: GooglePlacePlugin },
  ],
})
export class RestaurantModule {}
