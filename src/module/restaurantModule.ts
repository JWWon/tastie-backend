import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantUsecaseToken } from '@/domain/restaurant/restaurantUsecase';
import { RestaurantService } from '@/domain/restaurant/restaurantService';
import { RestaurantRepositoryToken } from '@/domain/restaurant/restaurantRepository';
import { OdmRestaurantRepository } from '@/infrastructure/typeorm/repository/odmRestaurantRepository';
import { Restaurant } from '@/infrastructure/typeorm/document/restaurant';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant], 'restaurantConnection')],
  providers: [
    { provide: RestaurantUsecaseToken, useClass: RestaurantService },
    { provide: RestaurantRepositoryToken, useClass: OdmRestaurantRepository },
  ],
})
export class RestaurantModule {}
