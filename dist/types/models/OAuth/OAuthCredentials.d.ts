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
export declare class OAuthCredentials extends BaseModel {
    virtual?: boolean;
    accessToken: string;
    refreshToken?: string;
    tokenType?: string;
    userId?: string;
    expiresAt?: Date;
    scope: string[];
    constructor(data: Partial<OAuthCredentialsSchema | OAuthCredentials>);
}
