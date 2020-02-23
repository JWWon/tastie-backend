export type User = {
  readonly id: number;
  readonly name: string;
};

export type EmailUser = {
  readonly userID: number;
  readonly user?: User;
  readonly email: string;
  readonly passwordHash: string;
};

export type SocialUser = {
  readonly userID: number;
  readonly user?: User;
  readonly socialProviderID: number;
  readonly socialUserID: string;
};
