import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '@/web/api/auth/authController';
import {
  AuthService,
  EmailAuthenticator,
  SocialAuthenticator,
  TokenIssuerToken,
  EmailSenderToken,
  AuthCodeIssuerToken,
  UserRepositoryToken,
  PassportToken,
} from '@/domain/auth';
import { OrmUserRepository } from '@/infrastructure/typeorm/repository/ormUserRepository';

import {
  User,
  SocialAccount,
  EmailAccount,
  SocialProvider,
} from '@/infrastructure/typeorm/model';
import { BcryptPassport } from '@/infrastructure/security';

import { JwtTokenIssuer, JwtAuthCodeIssuer } from '@/infrastructure/jwt';
import { NodeMailerEmailSender } from '@/infrastructure/email';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      SocialAccount,
      EmailAccount,
      SocialProvider,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailAuthenticator,
    SocialAuthenticator,
    { provide: UserRepositoryToken, useClass: OrmUserRepository },
    { provide: PassportToken, useClass: BcryptPassport },
    { provide: TokenIssuerToken, useClass: JwtTokenIssuer },
    { provide: EmailSenderToken, useClass: NodeMailerEmailSender },
    { provide: AuthCodeIssuerToken, useClass: JwtAuthCodeIssuer },
  ],
})
export class AuthModule {}
