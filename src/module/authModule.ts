import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '@/web/api/auth/authController';
import { AuthService } from '@/domain/auth';
import { OrmUserRepository } from '@/infrastructure/typeorm/repository/ormUserRepository';
import { UserRepositoryToken } from '@/interfaces/repositories';
import {
  User,
  SocialUser,
  EmailUser,
  SocialProvider,
} from '@/infrastructure/typeorm/model';
import { EmailAuthenticator } from '@/infrastructure/authenticator';
import { BcryptPassport } from '@/infrastructure/security';
import { PassportToken } from '@/interfaces/security';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SocialUser, EmailUser, SocialProvider]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailAuthenticator,
    { provide: UserRepositoryToken, useClass: OrmUserRepository },
    { provide: PassportToken, useClass: BcryptPassport },
  ],
})
export class AuthModule {}
