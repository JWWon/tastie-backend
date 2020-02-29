import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '@/web/api/auth/authController';
import {
  AuthService,
  EmailAuthenticator,
  SocialAuthenticator,
  TokenIssuerToken,
} from '@/domain/auth';
import { OrmUserRepository } from '@/infrastructure/typeorm/repository/ormUserRepository';
import { UserRepositoryToken } from '@/interfaces/repositories';
import {
  User,
  SocialAccount,
  EmailAccount,
  SocialProvider,
} from '@/infrastructure/typeorm/model';
import { BcryptPassport } from '@/infrastructure/security';
import { PassportToken } from '@/interfaces/security';
import { JwtTokenIssuer } from '@/infrastructure/jwt';

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
  ],
})
export class AuthModule {}
