import { Injectable, Inject } from '@nestjs/common';
import { Authenticator } from '@/domain/auth/authenticator';
import {
  UserRepository,
  UserRepositoryToken,
  CreateUserParam,
} from '@/interfaces/repositories';
import { AccessTokenRequest, SignupRequest } from '@/domain/auth/dto';
import { User } from '@/entities';
import { Passport, PassportToken } from '@/interfaces/security';

@Injectable()
export class EmailAuthenticator implements Authenticator {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepo: UserRepository,
    @Inject(PassportToken)
    private readonly passport: Passport,
  ) {}

  async signup(req: SignupRequest): Promise<User> {
    const encryptedPassword = await this.passport.encryptPassword(req.password);
    const param: CreateUserParam = {
      type: req.type,
      username: req.username,
      birthYear: req.birthYear,
      email: req.email,
      encryptedPassword,
    };

    const user = await this.userRepo.createUser(param);
    return user;
  }

  async authenticate(req: AccessTokenRequest): Promise<User | undefined> {
    const credential = await this.userRepo.getUserByEmail(req.email);
    if (credential === undefined) {
      return undefined;
    }

    const valid = await this.passport.comparedPassword(
      credential.encryptedPassword,
      req.password,
    );

    return valid ? credential.user : undefined;
  }
}
