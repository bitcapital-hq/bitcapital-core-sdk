import { BaseModel, BaseModelSchema } from "..";

export interface OAuthCredentialsSchema extends BaseModelSchema {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  user_id?: string;
  virtual?: boolean;
  scope: string[];
}

export class OAuthCredentials extends BaseModel {
  virtual?: boolean = false;
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  userId?: string;
  expiresAt?: Date;
  scope: string[];

  constructor(data: Partial<OAuthCredentialsSchema | OAuthCredentials> = {}) {
    super(data);

    Object.assign(this, data);

    const instance = data as Partial<OAuthCredentials>;
    const schema = data as Partial<OAuthCredentialsSchema>;

    this.accessToken = instance.accessToken || schema.access_token;
    this.refreshToken = instance.refreshToken || schema.refresh_token;
    this.tokenType = instance.tokenType || schema.token_type;
    this.expiresAt = instance.expiresAt || new Date(Date.now() + schema.expires_in * 1000);
    this.userId = instance.userId || schema.user_id;
    this.virtual = instance.virtual || schema.virtual || this.virtual;
  }
}
