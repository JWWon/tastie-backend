import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserPlaceLikeRepository } from '@/domain/user';
import { UserPlaceLike } from '@/entities';
import { CreateUserLikeRequest } from '@/domain/user/dto';
import { UserPlaceLike as UserPlaceLikeModel } from '../model';

@Injectable()
export class OrmUserPlaceLikeRepository implements UserPlaceLikeRepository {
  constructor(
    @InjectRepository(UserPlaceLikeModel)
    private readonly userPlaceLikeRepo: Repository<UserPlaceLikeModel>,
  ) {}

  getLikesByUserID(userID: number): Promise<UserPlaceLike[]> {
    throw new Error('Method not implemented.');
  }

  createLike(req: CreateUserLikeRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }

  updateLike(
    userID: number,
    placeID: string,
    positive: boolean,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  removeLike(userID: number, placeID: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
