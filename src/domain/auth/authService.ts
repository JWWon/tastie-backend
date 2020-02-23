import { Injectable } from '@nestjs/common';
import { AccessTokenRequest, AccessTokenResponse } from './dto';
import { Authenticator } from './authenticator';
import { EmailAuthenticator } from '@/infrastructure/authenticator';

@Injectable()
export class AuthService {
  constructor(
    private readonly emailAuthenticator: EmailAuthenticator, // private readonly socialAuthenticator:
  ) {}

  async getAccessToken(req: AccessTokenRequest): Promise<AccessTokenResponse> {
    const authenticator = this.getAuthenticatorByAuthType(req.type);
    const user = await authenticator.authenticate(req);

    return {
      type: 'Bearer',
      accessToken: '',
      expiresIn: 3000,
    };
  }

  private getAuthenticatorByAuthType(authType: string): Authenticator {
    if (authType === 'email') return this.emailAuthenticator;
    if (authType === 'social') return null;

    throw new Error('Not support authType');
  }
}
