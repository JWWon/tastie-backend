import * as fetch from 'node-fetch';
import { SocialGateway, SocialProfile } from './socialGateway';

const debugURL = 'https://graph.facebook.com/me?fields=id,email&access_token=';

export class FacebookGateway implements SocialGateway {
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
