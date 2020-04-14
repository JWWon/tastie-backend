import { Repository, MongoRepository, Any, getMongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '@/domain/restaurant/restaurantRepository';
import { Restaurant as RestaurantModel } from '../document/restaurant';
import { Restaurant } from '@/entities';
import { QueryRestaurantRequest } from '@/domain/restaurant/dto';

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
      coordinate: {
        type: 'Point',
        coordinates: [r.coordinate.longitude, r.coordinate.latitude],
      },
      menus: r.menus,
      openingHours: r.openingHours,
    });
  }

  async getRestaurants(query: QueryRestaurantRequest): Promise<Restaurant[]> {
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

    if (query.coordinate) {
      const { longitude, latitude } = query.coordinate;
      Object.assign(where, {
        coordinate: {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], query.withInKm / 6378.1],
          },
        },
      });
    }

    const res = await this.restaurantRepo.find({
      where,
    });

    const parse = (r: RestaurantModel): Restaurant => ({
      id: r.id.toString(),
      coordinate: {
        longitude: r.coordinate.coordinates[0],
        latitude: r.coordinate.coordinates[1],
      },
      address: r.address,
      categories: r.categories,
      description: r.description,
      keywords: r.keywords,
      menus: r.menus,
      name: r.name,
      openingHours: r.openingHours,
      photoUrls: r.photoUrls,
      status: r.status,
      telephone: r.telephone,
    });

    return res.map(parse);
  }
}
