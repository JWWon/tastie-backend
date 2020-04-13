import { Repository, MongoRepository, Any, getMongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '@/domain/restaurant/restaurantRepository';
import { Restaurant as RestaurantModel } from '../document/restaurant';
import { Restaurant } from '@/entities';

@Injectable()
export class OdmRestaurantRepository implements RestaurantRepository {
  constructor(
    @InjectRepository(RestaurantModel, 'restaurantConnection')
    private readonly restaurantRepo: MongoRepository<RestaurantModel>,
  ) {
    this.restaurantRepo = getMongoRepository(
      RestaurantModel,
      'restaurantConnection',
    );
  }

  async createRestaurant(r: Restaurant): Promise<void> {
    await this.restaurantRepo.insert({
      name: r.name,
      address: r.address,
      telephone: r.telephone,
      keywords: r.keywords,
      categories: r.categories,
      description: r.description,
      status: r.status,
      photoUrls: r.photoUrls,
      coordinate: r.coordinate,
      menus: r.menus,
      openingHours: r.openingHours,
    });
  }

  async getRestaurants(query: any): Promise<Restaurant[]> {
    const where = {};
    if (query.name) {
      Object.assign(where, {
        name: {
          $regex: query.name,
        },
      });
    }

    if (query.status) {
      Object.assign(where, {
        status: query.status,
      });
    }

    const res = await this.restaurantRepo.find({
      where,
    });

    const result: any[] = res.map(r => ({
      id: r.id.toString(),
      ...r,
    }));

    return result;
  }
}
