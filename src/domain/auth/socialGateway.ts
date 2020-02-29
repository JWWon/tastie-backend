export type SocialProfile = {
  readonly userID: string;
  readonly email: string;
};

export interface SocialGateway {
  getProfileByAccessToken(token: string): Promise<SocialProfile | undefined>;
}
