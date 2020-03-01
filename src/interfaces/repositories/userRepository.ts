import { User, SocialAccount, EmailAccount } from '@/entities';

export type CreateUserParam = {
  readonly type: string;
  readonly username: string;
  readonly email: string;
  readonly birthYear?: number;
  readonly encryptedPassword?: string;
  readonly socialUserID?: string;
};

export interface UserRepository {
  createUser(param: CreateUserParam): Promise<User>;

  getUserByUserID(userID: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<EmailAccount | undefined>;
  getUserBySocial(
    socialProviderName: string,
    socialUserID: string,
  ): Promise<SocialAccount | undefined>;
}

export const UserRepositoryToken = Symbol();
