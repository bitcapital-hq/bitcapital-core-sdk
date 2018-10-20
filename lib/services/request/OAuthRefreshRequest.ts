export default class OAuthRefreshRequest {
  grant_type: string;
  refresh_token: string;

  constructor(refresh_token: string) {
    this.grant_type = "refresh_token";
    this.refresh_token = refresh_token;
  }
}
