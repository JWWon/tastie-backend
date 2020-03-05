import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryToken, UserRepository } from '@/interfaces/repositories';
import { UserResponse, CreateUserPlaceLikeRequest } from './dto';
import { UserPlaceLike } from '@/entities';
import {
  UserPlaceLikeRepositoryToken,
  UserPlaceLikeRepository,
} from './userPlaceLikeRepository';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepo: UserRepository,

    @Inject(UserPlaceLikeRepositoryToken)
    private readonly userPlaceLikeRepo: UserPlaceLikeRepository,
  ) {}

  async getUserByUserID(userID: number): Promise<UserResponse> {
    const user = await this.userRepo.getUserByUserID(userID);
    return user;
  }

  async getUserPlaceLikes(userID: number): Promise<UserPlaceLike[]> {
    const likes = await this.userPlaceLikeRepo.getLikesByUserID(userID);
    return likes;
  }

  async createUserPlaceLike(req: CreateUserPlaceLikeRequest): Promise<void> {
    await this.userPlaceLikeRepo.createLike(req);
  }

  async updateUserPlaceLike(req: CreateUserPlaceLikeRequest): Promise<void> {
    await this.userPlaceLikeRepo.updateLike(req);
  }

  async removeUserPlaceLike(userID: number, placeID: string): Promise<void> {
    await this.userPlaceLikeRepo.removeLike(userID, placeID);
  }
}
