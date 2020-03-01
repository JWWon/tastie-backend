import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryToken, UserRepository } from '@/interfaces/repositories';
import { UserResponse } from './dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositoryToken) private readonly userRepo: UserRepository,
  ) {}

  async getUserByUserID(userID: number): Promise<UserResponse> {
    const user = await this.userRepo.getUserByUserID(userID);
    return user;
  }
}
