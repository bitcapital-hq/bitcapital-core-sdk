import { BaseModel, BaseModelSchema } from '../base';
import OAuthClient, { OAuthClientSchema } from './OAuthClient';
import User from './User';
export declare enum OAuthClientStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export interface UserAgentInformation {
    ip?: string;
    browser?: string;
    version?: string;
    os?: string;
    platform?: string;
    source?: string;
}
export interface OAuthAccessTokenSchema extends BaseModelSchema {
    accessToken?: string;
    tokenType: string;
    client: string | OAuthClientSchema;
    user: string | User;
    expires?: Date;
    userAgent?: UserAgentInformation;
}
export default class OAuthAccessToken extends BaseModel {
    accessToken?: string;
    tokenType: string;
    client: string | OAuthClient;
    user: string | User;
    expires?: Date;
    userAgent: UserAgentInformation;
    constructor(data: OAuthAccessTokenSchema);
}
