import { AccessTokenRequest } from './accessTokenRequest';

export type SignupRequest = {
  readonly username: string;
} & AccessTokenRequest;
