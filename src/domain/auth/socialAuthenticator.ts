import { Inject, Injectable } from '@nestjs/common';
import { Authenticator } from '@/domain/auth/authenticator';
import {
  UserRepository,
  UserRepositoryToken,
  CreateUserParam,
} from '@/interfaces/repositories';
import { SignupRequest, AccessTokenRequest } from './dto';
import { User } from '@/entities';
import { SocialGateway } from './socialGateway';
import { NotSupportProviderError, InvalidCredentialError } from './exception';
import { FacebookGateway } from './facebookGateway';
import { GoogleGateway } from './googleGateway';

@Injectable()
export class SocialAuthenticator implements Authenticator {
  private readonly supportProviderType: Map<string, SocialGateway>;

  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepo: UserRepository,
  ) {
    this.supportProviderType = new Map<string, SocialGateway>([
      ['facebook', new FacebookGateway()],
      ['google', new GoogleGateway()],
    ]);
  }

  async signup(req: SignupRequest): Promise<User | undefined> {
    const gateway = this.supportProviderType.get(req.type);
    if (gateway === undefined) {
      throw new NotSupportProviderError();
    }

    const socialProfile = await gateway.getProfileByAccessToken(req.token);
    if (socialProfile === undefined) {
      throw new InvalidCredentialError();
    }

    const createUserParam: CreateUserParam = {
      type: req.type,
      username: req.username,
      birthYear: req.birthYear,
      email: socialProfile.email,
      socialUserID: socialProfile.userID,
    };

    const user = await this.userRepo.createUser(createUserParam);
    return user;
  }

  async authenticate(req: AccessTokenRequest): Promise<User | undefined> {
    const gateway = this.supportProviderType.get(req.type);
    if (gateway === undefined) {
      throw new NotSupportProviderError();
    }

    const socialProfile = await gateway.getProfileByAccessToken(req.token);
    if (socialProfile === undefined) {
      throw new InvalidCredentialError();
    }

    const credential = await this.userRepo.getUserBySocial(
      req.type,
      socialProfile.userID,
    );

    return credential?.user;
  }
}
