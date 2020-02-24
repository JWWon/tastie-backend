import { Injectable, Inject } from '@nestjs/common';
import { Authenticator } from '@/domain/auth/authenticator';
import { UserRepository, UserRepositoryToken } from '@/interfaces/repositories';
import { AccessTokenRequest } from '@/domain/auth/dto';
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

  async authenticate(req: AccessTokenRequest): Promise<User | undefined> {
    const credential = await this.userRepo.getUserByEmail(req.email);
    const valid = await this.passport.comparedPassword(
      credential.passwordHash,
      req.password,
    );

    return valid ? credential.user : undefined;
  }
}
