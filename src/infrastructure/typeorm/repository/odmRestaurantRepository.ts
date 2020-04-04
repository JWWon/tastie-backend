import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '@/domain/restaurant/restaurantRepository';
import { Restaurant as RestaurantModel } from '../document/restaurant';
import { Restaurant } from '@/entities';

@Injectable()
export class OdmRestaurantRepository implements RestaurantRepository {
  constructor(
    @InjectRepository(RestaurantModel, 'restaurantConnection')
    private readonly restaurantRepo: Repository<RestaurantModel>,
  ) {}

  async createRestaurant(r: Restaurant): Promise<void> {
    await this.restaurantRepo.insert({
      name: r.name,
      address: r.address,
      telephone: r.telephone,
      keywords: r.keywords,
      description: r.description,
      status: r.status,
      photoUrls: r.photoUrls,
      coordinate: r.coordinate,
      menus: r.menus,
      openingHours: r.openingHours,
    });
  }
}
