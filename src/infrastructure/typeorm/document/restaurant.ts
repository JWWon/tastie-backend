import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

export class RestaurantCategory {}
export class RestaurantMenu {}
export class RestaurantOpeningHours {}

@Entity()
export class Restaurant {
  @ObjectIdColumn()
  readonly id: ObjectID;

  @Column()
  readonly name: string;

  @Column()
  readonly addresses: string;

  @Column()
  readonly contact: string;

  @Column()
  readonly description: string;

  @Column()
  readonly category: RestaurantCategory;

  @Column()
  readonly menus: RestaurantMenu[];

  @Column()
  readonly openingHours: RestaurantOpeningHours[];
}
