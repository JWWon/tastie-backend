import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  SocialAccount,
  EmailAccount,
  SocialProvider,
} from '@/infrastructure/typeorm/model';
import { UserController } from '@/web/api/user/userController';
import { UserService } from '@/domain/user';
import { UserRepositoryToken } from '@/interfaces/repositories';
import { OrmUserRepository } from '@/infrastructure/typeorm/repository/ormUserRepository';
import { TokenIssuerToken } from '@/domain/auth';
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
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepositoryToken, useClass: OrmUserRepository },
    { provide: TokenIssuerToken, useClass: JwtTokenIssuer },
  ],
})
export class UserModule {}
