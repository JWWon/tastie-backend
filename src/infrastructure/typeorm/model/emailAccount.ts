import { PrimaryColumn, Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity({ name: 'EmailAccount' })
export class EmailAccount {
  @PrimaryColumn({ name: 'user_id' })
  readonly userID: number;

  @OneToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  readonly user: User;

  @Column({ name: 'email', unique: true })
  readonly email: string;

  @Column({ name: 'encrypted_password', length: 62 })
  readonly encryptedPassword: string;
}
