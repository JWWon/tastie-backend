import { ApiProperty } from '@nestjs/swagger';
import { Coordinate } from '../../common/dto';

export class RestaurantKeyword {
  @ApiProperty()
  readonly title: string; // '인기 토픽' | '시설' | '찾는 목적' | '분위기'

  @ApiProperty()
  readonly tags: string[];
}

export class RestaurantOpeningHours {
  @ApiProperty()
  readonly range: '주중' | '주말' | string;

  @ApiProperty()
  readonly type: 'OPEN' | 'BREAK_TIME';

  @ApiProperty()
  readonly start: string;

  @ApiProperty()
  readonly end: string;
}

export class RestaurantMenu {
  @ApiProperty()
  readonly popular: boolean;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly currency: 'KRW' | 'USD';
}

export class AddRestaurantRequest {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  readonly telephone: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty({ enum: ['ACTIVE', 'WAITING_FOR_REVIEW', 'REMOVED'] })
  readonly status: 'ACTIVE' | 'WAITING_FOR_REVIEW' | 'REMOVED';

  @ApiProperty()
  readonly photoUrls: string[];

  @ApiProperty()
  readonly coordinate: Coordinate;

  @ApiProperty({ type: RestaurantKeyword })
  readonly keywords: RestaurantKeyword;

  @ApiProperty({ type: RestaurantMenu, isArray: true })
  readonly menus: RestaurantMenu[];

  @ApiProperty({ type: RestaurantOpeningHours, isArray: true })
  readonly openingHours: RestaurantOpeningHours[];
}
