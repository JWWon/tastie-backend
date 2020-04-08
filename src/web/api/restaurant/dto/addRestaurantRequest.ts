import { ApiProperty } from '@nestjs/swagger';
import { Coordinate } from '../../common/dto';
import { DayType, DayTypeList } from '@/entities';

export class RestaurantKeyword {
  @ApiProperty()
  readonly title: string; // '인기 토픽' | '시설' | '찾는 목적' | '분위기'

  @ApiProperty()
  readonly tags: string[];
}

class Time {
  @ApiProperty()
  start: string; // HH:MM

  @ApiProperty()
  end: string;
}

export class RestaurantOpeningHours {
  @ApiProperty({ enum: ['WEEKDAY', 'WEEKEND', 'HOLIDAY', ...DayTypeList] })
  readonly range: 'WEEKDAY' | 'WEEKEND' | 'HOLIDAY' | DayType;

  @ApiProperty({ enum: ['OPEN', 'DAY_OFF'] })
  readonly type: 'OPEN' | 'DAY_OFF';

  @ApiProperty({ type: Time })
  readonly time?: Time;

  @ApiProperty({ type: Time })
  readonly breakTime?: Time;
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
