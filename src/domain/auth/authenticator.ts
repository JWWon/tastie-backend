import { AccessTokenRequest, SignupRequest } from './dto';
import { User } from '@/entities';

export interface Authenticator {
  signup(req: SignupRequest): Promise<User | undefined>;
  authenticate(req: AccessTokenRequest): Promise<User | undefined>;
}
