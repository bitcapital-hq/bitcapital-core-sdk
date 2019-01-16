import { BaseModel, BaseModelSchema } from "..";

export enum OAuthClientPlatform {
  ROOT = "root",
  API = "api",
  WEB = "web",
  TEST = "test"
}

export enum OAuthClientStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export interface OAuthClientSchema extends BaseModelSchema {
  clientId: string;
  clientSecret: string;
  platform: OAuthClientPlatform;
  status: OAuthClientStatus;
  domainId?: string;
}

export class OAuthClient extends BaseModel implements OAuthClientSchema {
  clientId: string;
  clientSecret: string;
  platform: OAuthClientPlatform;
  status: OAuthClientStatus;
  domainId?: string;

  constructor(data: OAuthClientSchema) {
    super(data);

    Object.assign(this, data);
  }
}
