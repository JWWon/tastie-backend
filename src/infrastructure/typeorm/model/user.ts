import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'UserProfile' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  readonly id: number;

  @Column({ name: 'username', length: 20 })
  readonly name: string;

  @Column({ name: 'email', length: 320 })
  readonly email: string;

  @Column({ type: 'smallint', name: 'birth_year', nullable: true })
  readonly birthYear: number;
}
