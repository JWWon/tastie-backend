import { Injectable, Inject } from '@nestjs/common';
import { AccessTokenRequest, AccessTokenResponse, SignupRequest } from './dto';
import { Authenticator } from './authenticator';
import { EmailAuthenticator } from './emailAuthenticator';
import { InvalidCredentialError, NotFoundAccountError } from './exception';
import { SocialAuthenticator } from './socialAuthenticator';
import { TokenIssuer, TokenIssuerToken } from './tokenIssuer';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TokenIssuerToken)
    private readonly tokenIssuer: TokenIssuer,
    private readonly emailAuthenticator: EmailAuthenticator,
    private readonly socialAuthenticator: SocialAuthenticator,
  ) {}

  async signup(req: SignupRequest): Promise<AccessTokenResponse> {
    const authenticator = this.getAuthenticatorByAuthType(req.type);
    const user = await authenticator.signup(req);

    return this.tokenIssuer.issueAccessToken(user);
  }

  async getAccessToken(req: AccessTokenRequest): Promise<AccessTokenResponse> {
    const authenticator = this.getAuthenticatorByAuthType(req.type);
    const user = await authenticator.authenticate(req);
    if (user === undefined) {
      throw req.type === 'email'
        ? new InvalidCredentialError()
        : new NotFoundAccountError();
    }

    return this.tokenIssuer.issueAccessToken(user);
  }

  private getAuthenticatorByAuthType(authType: string): Authenticator {
    if (authType === 'email') {
      return this.emailAuthenticator;
    }

    return this.socialAuthenticator;
  }
}
