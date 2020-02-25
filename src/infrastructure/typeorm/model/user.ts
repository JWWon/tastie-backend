import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'tastie_user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  readonly id: number;

  @Column({ name: 'username' })
  readonly name: string;

  @Column({ name: 'email' })
  readonly email: string;
}
