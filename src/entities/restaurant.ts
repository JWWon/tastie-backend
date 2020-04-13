import { Coordinate } from './coordinate';

export interface RestaurantKeyword {
  readonly label: string;
  readonly tags: string[];
}

export interface RestaurantKeywords {
  readonly popularTopic: RestaurantKeyword;
  readonly facility: RestaurantKeyword;
  readonly purpose: RestaurantKeyword;
  readonly atmosphere: RestaurantKeyword;
}

export interface RestaurantMenu {
  readonly popular: boolean;
  readonly name: string;
  readonly price: number;
  readonly currency: 'KRW' | 'USD';
}

export const DayTypeList = [
  'MON',
  'TUE',
  'WED',
  'THUR',
  'FRI',
  'SAT',
  'SUN',
] as const;

export type DayType = typeof DayTypeList[number];

interface Time {
  readonly start: string; // HH:MM
  readonly end: string;
}

export interface RestaurantOpeningHours {
  readonly range: 'WEEKDAY' | 'WEEKEND' | 'HOLIDAY' | DayType;
  readonly type: 'OPEN' | 'DAY_OFF';
  readonly time?: Time;
  readonly breakTime?: Time;
}

export interface Restaurant {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly telephone: string;
  readonly keywords: RestaurantKeywords;
  readonly categories: string[];
  readonly description: string;
  readonly status: 'ACTIVE' | 'WAITING_FOR_REVIEW' | 'REMOVED';
  readonly photoUrls: string[];
  readonly coordinate: Coordinate;
  readonly menus: RestaurantMenu[];
  readonly openingHours: RestaurantOpeningHours[];
}
