import { User, SocialUser, EmailUser } from '@/entities';

export interface UserRepository {
  getUserByEmail(email: string): Promise<EmailUser>;
  getUserBySocial(
    socialProviderID: number,
    socialUserID: string,
  ): Promise<SocialUser>;
}

export const UserRepositoryToken = Symbol();
