import { Coordinate } from './coordinate';

export interface RestaurantKeyword {
  readonly title: string; // '인기 토픽' | '시설' | '찾는 목적' | '분위기'
  readonly tags: string[];
}

export interface RestaurantMenu {
  readonly popular: boolean;
  readonly name: string;
  readonly price: number;
  readonly currency: 'KRW' | 'USD';
}

export interface RestaurantOpeningHours {
  readonly range: '주중' | '주말' | string;
  readonly type: 'OPEN' | 'BREAK_TIME';
  readonly start: string;
  readonly end: string;
}

export interface Restaurant {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly telephone: string;
  readonly keywords: RestaurantKeyword;
  readonly description: string;
  readonly status: 'ACTIVE' | 'WAITING_FOR_REVIEW' | 'REMOVED';
  readonly photoUrls: string[];
  readonly coordinate: Coordinate;
  readonly menus: RestaurantMenu[];
  readonly openingHours: RestaurantOpeningHours[];
}
