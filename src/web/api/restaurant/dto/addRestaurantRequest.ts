import { ApiProperty } from '@nestjs/swagger';

export class AddRestaurantRequest {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly addresses: string;

  @ApiProperty()
  readonly contact: string;

  @ApiProperty()
  readonly description: string;

  // readonly category: RestaurantCategory;

  // readonly menus: RestaurantMenu[];

  // readonly openingHours: RestaurantOpeningHours[];
}
