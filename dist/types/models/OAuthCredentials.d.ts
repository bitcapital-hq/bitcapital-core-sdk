import { BaseModel, BaseModelSchema } from '../base';
export interface OAuthCredentialsSchema extends BaseModelSchema {
    access_token: string;
    refresh_token?: string;
    token_type: string;
    expires_in: number;
    user_id?: string;
    virtual?: boolean;
}
export default class OAuthCredentials extends BaseModel {
    accessToken: string;
    refreshToken?: string;
    tokenType: string;
    userId?: string;
    expiresAt: Date;
    virtual: boolean;
    constructor(data: OAuthCredentialsSchema);
}
