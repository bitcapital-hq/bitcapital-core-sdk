import { BaseModel, BaseModelSchema } from "..";

export interface OAuthCredentialsSchema extends BaseModelSchema {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  user_id?: string;
  virtual?: boolean;
}

export default class OAuthCredentials extends BaseModel {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  userId?: string;
  expiresAt?: Date;
  virtual: boolean = false;

  constructor(data: Partial<OAuthCredentialsSchema>) {
    super(data);

    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    this.tokenType = data.token_type;
    this.expiresAt = new Date(Date.now() + data.expires_in * 1000);
    this.userId = data.user_id;
    this.virtual = data.virtual || this.virtual;
  }
}
