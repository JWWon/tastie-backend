import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { TokenIssuer, AccessTokenResponse } from '@/domain/auth';
import { User } from '@/entities';

@Injectable()
export class JwtTokenIssuer implements TokenIssuer {
  private readonly jwtSecretKey: string;

  private readonly jwtExpiresInSec: number;

  constructor(configService: ConfigService) {
    this.jwtSecretKey = configService.get('jwt.secretKey');
    this.jwtExpiresInSec = configService.get('jwt.accessTokenExpiresInSec');
  }

  issueAccessToken(user: User): AccessTokenResponse {
    const accessToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        birthYear: user.birthYear,
      },
      this.jwtSecretKey,
      {
        expiresIn: this.jwtExpiresInSec,
      },
    );

    const token: AccessTokenResponse = {
      type: 'Bearer',
      accessToken,
      expiresIn: this.jwtExpiresInSec,
    };

    return token;
  }

  extractTokenClaims(token: string): User {
    const claims: any = jwt.verify(token, this.jwtSecretKey);

    return {
      id: claims.sub,
      email: claims.email,
      name: claims.name,
      birthYear: claims.birthYear,
    };
  }
}
