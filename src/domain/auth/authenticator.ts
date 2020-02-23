import { AccessTokenRequest } from './dto';
import { User } from '@/entities';

export interface Authenticator {
  authenticate(req: AccessTokenRequest): Promise<User | undefined>;
}
