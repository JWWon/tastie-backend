import { Injectable, Inject } from '@nestjs/common';
import {
  AccessTokenRequest,
  AccessTokenResponse,
  SignupRequest,
  PatchPasswordRequest,
} from './dto';
import { Authenticator } from './authenticator';
import { EmailAuthenticator } from './emailAuthenticator';
import { InvalidCredentialError, NotFoundAccountError } from './exception';
import { SocialAuthenticator } from './socialAuthenticator';
import { TokenIssuer, TokenIssuerToken } from './tokenIssuer';
import { EmailSender, EmailSenderToken } from './emailSender';
import { AuthCodeIssuer, AuthCodeIssuerToken } from './authCodeIssuer';
import { AuthCodeRequest } from '@/web/api/auth/dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TokenIssuerToken)
    private readonly tokenIssuer: TokenIssuer,
    @Inject(AuthCodeIssuerToken)
    private readonly authCodeIssuer: AuthCodeIssuer,
    private readonly emailAuthenticator: EmailAuthenticator,
    private readonly socialAuthenticator: SocialAuthenticator,
    @Inject(EmailSenderToken)
    private readonly emailSender: EmailSender,
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

  async hasEmailAccountByEmail(email: string): Promise<boolean> {
    const exists = await this.emailAuthenticator.hasAccountByEmail(email);
    return exists;
  }

  async sendAuthCodeByEmail(req: AuthCodeRequest): Promise<void> {
    const code = this.authCodeIssuer.issue(req.email);
    const template = `
      비밀번호 재설정 페이지입니다. ${req.redirect}?code=${code}
    `;

    await this.emailSender.send({
      emailOfTo: req.email,
      title: 'Reset password about Tastie account',
      contents: template,
    });
  }

  async patchPasswordOfEmailAccount(req: PatchPasswordRequest): Promise<void> {
    const email = this.authCodeIssuer.extractEmail(req.code);
    await this.emailAuthenticator.patchPassword(email, req.password);
  }

  private getAuthenticatorByAuthType(authType: string): Authenticator {
    if (authType === 'email') {
      return this.emailAuthenticator;
    }

    return this.socialAuthenticator;
  }
}
