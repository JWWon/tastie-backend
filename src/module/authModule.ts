import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '@/web/api/auth/authController';
import { AuthService } from '@/domain/auth';
import { OrmUserRepository } from '@/infrastructure/typeorm/repository/ormUserRepository';
import { UserRepositoryToken } from '@/interfaces/repositories';
import { User, SocialUser, EmailUser } from '@/infrastructure/typeorm/model';
import { EmailAuthenticator } from '@/infrastructure/authenticator';

@Module({
  imports: [TypeOrmModule.forFeature([User, SocialUser, EmailUser])],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailAuthenticator,
    { provide: UserRepositoryToken, useClass: OrmUserRepository },
  ],
})
export class AuthModule {}
