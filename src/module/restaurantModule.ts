import { Module } from '@nestjs/common';
import { RestaurantUsecaseToken } from '@/domain/restaurant/restaurantUsecase';
import { RestaurantService } from '@/domain/restaurant/restaurantService';

@Module({
  providers: [{ provide: RestaurantUsecaseToken, useClass: RestaurantService }],
})
export class RestaurantModule {}
