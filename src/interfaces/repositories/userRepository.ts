import { User, SocialUser, EmailUser } from '@/entities';

export type CreateUserParam = {
  readonly type: string;
  readonly username: string;
  readonly email: string;
  readonly password?: string;
  readonly socialUserID?: string;
};

export interface UserRepository {
  createUser(param: CreateUserParam): Promise<User>;
  getUserByEmail(email: string): Promise<EmailUser>;
  getUserBySocial(
    socialProviderID: number,
    socialUserID: string,
  ): Promise<SocialUser>;
}

export const UserRepositoryToken = Symbol();
