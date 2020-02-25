import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'social_provider' })
export class SocialProvider {
  @PrimaryGeneratedColumn({ name: 'social_provider_id' })
  readonly id: number;

  @Column({ name: 'provider_name', unique: true })
  readonly name: string;
}
