import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './controller';
import { Injectable } from '@nestjs/common';
import {
  QueryCategoryRequest,
  QuerySituationRequest,
  QueryRecommendRestaurantRequest,
  RestaurantService,
} from '@/domain/restaurant';

@Injectable()
class FakeRestaurantService {
  getCategories(req: QueryCategoryRequest): any {}
  getSituations(req: QuerySituationRequest): any {}
  getRecommendRestaurant(req: QueryRecommendRestaurantRequest): any {}
}

describe('RestaurantController', () => {
  let restaurantController: RestaurantController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [
        {
          provide: RestaurantService,
          useClass: FakeRestaurantService,
        },
      ],
    }).compile();

    restaurantController = app.get<RestaurantController>(RestaurantController);
  });

  describe('healthy', () => {
    it('should return empty', () => {});
  });
});
