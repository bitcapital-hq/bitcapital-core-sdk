import { BaseModel, BaseModelSchema } from '../base';

export enum OAuthClientStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface OAuthClientSchema extends BaseModelSchema {
  clientId: string;
  clientSecret?: string;
  platform: string;
  status: OAuthClientStatus;
}

export default class OAuthClient extends BaseModel implements OAuthClientSchema {
  clientId: string;
  clientSecret?: string;
  platform: string;
  status: OAuthClientStatus;

  constructor(data: OAuthClientSchema) {
    super(data);
    this.clientId = data.clientId;
    this.clientSecret = data.clientSecret;
    this.platform = data.platform;
    this.status = data.status;
  }
}
