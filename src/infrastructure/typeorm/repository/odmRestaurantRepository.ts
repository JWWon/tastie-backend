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

  async createRestaurant(restaurant: Restaurant): Promise<void> {
    await this.restaurantRepo.insert({
      name: restaurant.name,
      addresses: restaurant.addresses,
      contact: restaurant.contact,
      category: restaurant.category,
      description: restaurant.description,
      menus: restaurant.menus,
      openingHours: restaurant.openingHours,
    });
  }
}
