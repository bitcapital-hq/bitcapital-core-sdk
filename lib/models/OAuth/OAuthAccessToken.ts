import { OAuthClient, OAuthClientSchema, OAuthRefreshToken } from ".";
import { BaseModel, BaseModelSchema, User } from "..";

export interface UserAgentInformation {
  ip?: string;
  browser?: string;
  version?: string;
  os?: string;
  platform?: string;
  source?: string;
}

export interface OAuthAccessTokenSchema extends BaseModelSchema {
  accessToken: string;
  tokenType?: string;
  client?: string | OAuthClientSchema;
  user?: string | User;
  expires?: Date;
  userAgent?: UserAgentInformation;
  refreshToken?: OAuthRefreshToken;
}

export class OAuthAccessToken extends BaseModel {
  accessToken: string;
  tokenType?: string;
  client?: string | OAuthClient;
  user?: string | User;
  expires?: Date;
  userAgent?: UserAgentInformation;
  refreshToken?: OAuthRefreshToken;

  constructor(data: OAuthAccessTokenSchema) {
    super(data);
    this.accessToken = data.accessToken;
    this.tokenType = data.tokenType;
    this.userAgent = data.userAgent || {};
    this.expires = data.expires ? new Date(data.expires) : undefined;

    if (data.client) {
      this.client = typeof data.client === typeof "a" ? data.client : (new OAuthClient(data.client as any) as any);
    }
    if (data.user) {
      this.user = typeof data.user === typeof "a" ? data.user : new User(data.user as User);
    }
  }
}
