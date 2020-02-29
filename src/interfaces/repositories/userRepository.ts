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
  getUserByEmail(email: string): Promise<EmailAccount>;
  getUserBySocial(
    socialProviderName: string,
    socialUserID: string,
  ): Promise<SocialAccount>;
}

export const UserRepositoryToken = Symbol();
