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

  constructor(response: OAuthTokenResponseSchema) {
    this.accessToken = response.access_token;
    this.refreshToken = response.refresh_token;
    this.tokenType = response.token_type;
    this.userId = response.user_id;
    this.expires = new Date(Date.now() + response.expires_in * 1000);
  }
}
