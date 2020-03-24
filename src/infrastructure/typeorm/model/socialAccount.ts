import {
  PrimaryColumn,
  Column,
  Entity,
  Unique,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user';
import { SocialProvider } from './socialProvider';

@Entity({ name: 'SocialAccount' })
@Unique(['socialUserID', 'socialProviderID'])
export class SocialAccount {
  @PrimaryColumn({ name: 'user_id' })
  readonly userID: number;

  @OneToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  readonly user: User;

  @Column({ name: 'social_user_id' })
  readonly socialUserID: string;

  @Column({ name: 'social_provider_id' })
  readonly socialProviderID: number;

  @ManyToOne(type => SocialProvider)
  @JoinColumn({ name: 'social_provider_id' })
  readonly socialProvider: SocialProvider;
}
