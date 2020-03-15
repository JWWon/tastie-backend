import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  SocialAccount,
  EmailAccount,
  SocialProvider,
  UserPlaceLike,
} from '@/infrastructure/typeorm/model';
import { UserController } from '@/web/api/user/userController';
import { UserService, UserPlaceLikeRepositoryToken } from '@/domain/user';
import { UserRepositoryToken } from '@/domain/auth/userRepository';
import { OrmUserRepository } from '@/infrastructure/typeorm/repository/ormUserRepository';
import { TokenIssuerToken } from '@/domain/auth';
import { JwtTokenIssuer } from '@/infrastructure/jwt';
import { OrmUserPlaceLikeRepository } from '@/infrastructure/typeorm/repository/ormUserPlaceLikeRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      SocialAccount,
      EmailAccount,
      SocialProvider,
      UserPlaceLike,
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepositoryToken, useClass: OrmUserRepository },
    {
      provide: UserPlaceLikeRepositoryToken,
      useClass: OrmUserPlaceLikeRepository,
    },
    { provide: TokenIssuerToken, useClass: JwtTokenIssuer },
  ],
})
export class UserModule {}
