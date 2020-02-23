import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'email_user' })
export class EmailUser {
  @PrimaryColumn({ name: 'user_id' })
  readonly userID: number;

  @Column({ name: 'email', unique: true })
  readonly email: string;

  @Column({ name: 'password_hash' })
  readonly passwordHash: string;
}
