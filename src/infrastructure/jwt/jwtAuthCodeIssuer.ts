import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AuthCodeIssuer } from '@/domain/auth/authCodeIssuer';

@Injectable()
export class JwtAuthCodeIssuer implements AuthCodeIssuer {
  private readonly privateKey: string;

  constructor(configService: ConfigService) {
    this.privateKey = configService.get('jwt.authCodePrivateKey');
  }

  issue(email: string): string {
    const token = jwt.sign(
      {
        email,
      },
      this.privateKey,
    );

    return token;
  }
}
