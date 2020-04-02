import {
  RestaurantCategory,
  RestaurantMenu,
  RestaurantOpeningHours,
} from '@/entities';

export interface CreateRestaurantRequest {
  readonly name: string;
  readonly addresses: string;
  readonly contact: string;
  readonly category: RestaurantCategory;
  readonly description: string;
  readonly menus: RestaurantMenu[];
  readonly openingHours: RestaurantOpeningHours[];
}
