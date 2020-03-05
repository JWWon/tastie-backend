import { Repository, QueryFailedError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import {
  UserPlaceLikeRepository,
  NotFoundUserPlaceLikeError,
} from '@/domain/user';
import { UserPlaceLike } from '@/entities';
import { CreateUserPlaceLikeRequest } from '@/domain/user/dto';
import { UserPlaceLike as UserPlaceLikeModel } from '../model';

@Injectable()
export class OrmUserPlaceLikeRepository implements UserPlaceLikeRepository {
  constructor(
    @InjectRepository(UserPlaceLikeModel)
    private readonly userPlaceLikeRepo: Repository<UserPlaceLikeModel>,
  ) {}

  async getLikesByUserID(userID: number): Promise<UserPlaceLike[]> {
    const likes = await this.userPlaceLikeRepo.find({
      where: {
        userID,
      },
    });

    return likes;
  }

  async createLike(req: CreateUserPlaceLikeRequest): Promise<void> {
    await this.userPlaceLikeRepo.save({
      userID: req.userID,
      placeID: req.placeID,
      positive: req.positive,
    });
  }

  updateLike(req: CreateUserPlaceLikeRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async removeLike(userID: number, placeID: string): Promise<void> {
    const like = await this.userPlaceLikeRepo.delete({ userID, placeID });
    if (like.affected <= 0) {
      throw new NotFoundUserPlaceLikeError();
    }
  }
}
