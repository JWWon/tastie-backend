import * as fetch from 'node-fetch';
import { SocialGateway, SocialProfile } from './socialGateway';

const debugURL =
  'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=';

export class GoogleGateway implements SocialGateway {
  async getProfileByAccessToken(token: string): Promise<SocialProfile> {
    const res = await fetch(debugURL + token);
    if (!res.ok) {
      return undefined;
    }

    const json = await res.json();
    return {
      email: json.email,
      userID: json.id,
    };
  }
}
