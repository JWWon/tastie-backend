export type User = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly birthYear?: number;
};

export type EmailAccount = {
  readonly userID: number;
  readonly user?: User;
  readonly email: string;
  readonly encryptedPassword: string;
};

export type SocialAccount = {
  readonly userID: number;
  readonly user?: User;
  readonly socialProviderID: number;
  readonly socialUserID: string;
};
