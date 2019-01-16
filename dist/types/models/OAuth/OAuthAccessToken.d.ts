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
export declare class OAuthAccessToken extends BaseModel {
    accessToken: string;
    tokenType?: string;
    client?: string | OAuthClient;
    user?: string | User;
    expires?: Date;
    userAgent?: UserAgentInformation;
    refreshToken?: OAuthRefreshToken;
    constructor(data: OAuthAccessTokenSchema);
}
