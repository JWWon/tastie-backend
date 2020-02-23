import { AccessTokenRequest, AccessTokenResponse } from './dto';

export class AuthService {
  async getAccessToken(req: AccessTokenRequest): Promise<AccessTokenResponse> {
    return {
      type: 'Bearer',
      accessToken: '',
      expiresIn: 3000,
    };
  }
}
