export interface OAuthTokenResponseSchema {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    user_id: string;
}
export default class OAuthTokenReponse {
    accessToken: string;
    refreshToken: string;
    tokenType: String;
    expires: Date;
    userId: string;
    constructor(response: OAuthTokenResponseSchema);
}
