import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import {
  Coordinate,
  RestaurantMenu,
  RestaurantOpeningHours,
  RestaurantKeywords,
} from '@/entities';

@Entity({ name: 'restaurants' })
export class Restaurant {
  @ObjectIdColumn()
  readonly id: ObjectID;

  @Column()
  readonly name: string;

  @Column()
  readonly address: string;

  @Column()
  readonly telephone: string;

  @Column()
  readonly categories: string[];

  @Column()
  readonly description: string;

  @Column()
  readonly status: string;

  @Column()
  readonly photoUrls: string[];

  @Column()
  readonly coordinate: Coordinate;

  @Column()
  readonly keywords: RestaurantKeywords;

  @Column()
  readonly menus: RestaurantMenu[];

  @Column()
  readonly openingHours: RestaurantOpeningHours[];
}
