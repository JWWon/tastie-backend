import { UserPlaceLike } from '@/entities';
import { CreateUserLikeRequest } from './dto';

export interface UserPlaceLikeRepository {
  getLikesByUserID(userID: number): Promise<UserPlaceLike[]>;

  createLike(req: CreateUserLikeRequest): Promise<void>;
  updateLike(userID: number, placeID: string, positive: boolean): Promise<void>;
  removeLike(userID: number, placeID: string): Promise<boolean>;
}

export const UserPlaceLikeRepositoryToken = Symbol();
