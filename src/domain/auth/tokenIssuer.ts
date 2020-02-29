import { AccessTokenResponse } from './dto';
import { User } from '@/entities';

export interface TokenIssuer {
  issueAccessToken(user: User): AccessTokenResponse;
}

export const TokenIssuerToken = Symbol();
