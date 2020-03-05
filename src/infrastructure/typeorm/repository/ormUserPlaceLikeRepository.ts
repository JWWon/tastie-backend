import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserPlaceLikeRepository } from '@/domain/user';
import { UserPlaceLike } from '@/entities';
import { CreateUserPlaceLikeRequest } from '@/domain/user/dto';
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

  createLike(req: CreateUserPlaceLikeRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }

  updateLike(req: CreateUserPlaceLikeRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }

  removeLike(userID: number, placeID: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
