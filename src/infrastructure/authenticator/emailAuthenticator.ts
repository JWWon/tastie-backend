import { Injectable, Inject } from '@nestjs/common';
import { Authenticator } from '@/domain/auth/authenticator';
import { UserRepository, UserRepositoryToken } from '@/interfaces/repositories';
import { AccessTokenRequest } from '@/domain/auth/dto';
import { User } from '@/entities';

@Injectable()
export class EmailAuthenticator implements Authenticator {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepo: UserRepository,
  ) {}

  async authenticate(req: AccessTokenRequest): Promise<User | undefined> {
    const user = await this.userRepo.getUserByEmail(req.email);
    console.log(user);
    return undefined;
  }
}
