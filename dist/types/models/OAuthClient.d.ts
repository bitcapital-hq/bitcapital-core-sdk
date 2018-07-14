import { BaseModel, BaseModelSchema } from '../base';
export declare enum OAuthClientStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
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
    constructor(data: OAuthClientSchema);
}
