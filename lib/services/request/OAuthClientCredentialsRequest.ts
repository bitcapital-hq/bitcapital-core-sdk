export default class OAuthClientCredentialsRequest {
  grant_type: string;

  constructor() {
    this.grant_type = 'client_credentials';
  }
}
