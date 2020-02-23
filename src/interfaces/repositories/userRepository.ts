import { User } from '@/entities';

export interface UserRepository {
  getUserByEmail(email: string): Promise<User>;
  getUserBySocial(
    socialProviderID: number,
    socialUserID: string,
  ): Promise<User>;
}

export const UserRepositoryToken = Symbol();
