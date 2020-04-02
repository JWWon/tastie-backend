export interface RestaurantCategory {}

export interface RestaurantMenu {}

export interface RestaurantOpeningHours {}

export interface Restaurant {
  readonly id: string;
  readonly name: string;
  readonly addresses: string;
  readonly contact: string;
  readonly category: RestaurantCategory;
  readonly description: string;
  readonly menus: RestaurantMenu[];
  readonly openingHours: RestaurantOpeningHours[];
}
