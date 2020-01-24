import { Module } from '@nestjs/common';
import { RestaurantController } from '@/web/api/restaurant/controller';
import { RestaurantService, RestaurantUsecaseToken } from '@/domain/restaurant';

@Module({
  controllers: [RestaurantController],
  providers: [{ provide: RestaurantUsecaseToken, useClass: RestaurantService }],
})
export class RestaurantModule {}
