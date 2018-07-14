export default class OAuthPasswordRequest {
  grant_type: string;
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.grant_type = 'password';
    this.username = username;
    this.password = password;
  }
}
