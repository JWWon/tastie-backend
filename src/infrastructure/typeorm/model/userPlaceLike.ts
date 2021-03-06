import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'UserPlaceLike' })
export class UserPlaceLike {
  @PrimaryColumn({ name: 'user_id' })
  readonly userID: number;

  @PrimaryColumn({ name: 'place_id' })
  readonly placeID: string;

  @Column({ name: 'positive' })
  readonly positive: boolean;

  @UpdateDateColumn({ type: 'timestamp' })
  readonly updatedAt: Date;
}
