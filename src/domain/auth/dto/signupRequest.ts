import { AccessTokenRequest } from './accessTokenRequest';

export type SignupRequest = {
  readonly username: string;
  readonly birthYear?: number;
} & AccessTokenRequest;
