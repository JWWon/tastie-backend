import { AccessTokenResponse } from './dto';
import { User } from '@/entities';

export interface TokenIssuer {
  issueAccessToken(user: User): AccessTokenResponse;
  extractTokenClaims(token: string): User;
}

export const TokenIssuerToken = Symbol();
