import { UserPlaceLike } from '@/entities';
import { CreateUserPlaceLikeRequest } from './dto';

export interface UserPlaceLikeRepository {
  getLikesByUserID(userID: number): Promise<UserPlaceLike[]>;

  createLike(req: CreateUserPlaceLikeRequest): Promise<void>;
  updateLike(req: CreateUserPlaceLikeRequest): Promise<void>;
  removeLike(userID: number, placeID: string): Promise<boolean>;
}

export const UserPlaceLikeRepositoryToken = Symbol();
