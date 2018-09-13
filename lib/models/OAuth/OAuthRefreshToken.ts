import { User, BaseModelSchema, BaseModel } from "..";
import { OAuthClient, OAuthAccessToken } from ".";

export interface OAuthRefreshTokenSchema extends BaseModelSchema {
  id: string;
  refreshToken: string;
  expires: Date;
  user: User;
  client: OAuthClient;
  accessToken: OAuthAccessToken;
}

export default class OAuthRefreshToken extends BaseModel implements OAuthRefreshTokenSchema {
  id: string;
  refreshToken: string;
  expires: Date;
  user: User;
  client: OAuthClient;
  accessToken: OAuthAccessToken;

  constructor(data: Partial<OAuthRefreshToken>) {
    super(data);

    this.id = data.id;
    this.refreshToken = data.refreshToken;
    this.expires = data.expires;
    this.user = data.user;
    this.client = data.client;
    this.accessToken = data.accessToken;
  }
}
