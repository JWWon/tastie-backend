export type AccessTokenRequest = {
  readonly type: string;
  readonly token?: string;
  readonly email?: string;
  readonly password?: string;
};
