import { Buffer } from "buffer";
import { stringify } from "qs";
import { Http, HttpOptions } from "../base";
import { OAuthCredentials } from "../models";
import { OAuthClientCredentialsRequest, OAuthPasswordRequest, OAuthRefreshRequest } from "./request";
import { OAuthStatusResponse } from "./response";
import OAuthSecretToken, { OAuthSecretTokenResource } from "../models/OAuth/OAuthSecretToken";

export interface OAuthWebServiceOptions extends HttpOptions {
  clientId: string;
  clientSecret: string;
}

export default class OAuthWebService {
  protected options: OAuthWebServiceOptions;
  protected http: Http;
  protected static instance: OAuthWebService;

  constructor(options: OAuthWebServiceOptions) {
    this.options = options;
    this.http = new Http(options);
  }

  public static getInstance(): OAuthWebService {
    return this.instance;
  }

  public static initialize(options: OAuthWebServiceOptions): OAuthWebService {
    this.instance = new OAuthWebService(options);
    return this.instance;
  }

  /**
   * Get a basic token for client credentials authentication.
   *
   * @returns {string}
   */
  public static getBasicToken(data: { clientId: string; clientSecret: string }): string {
    const mask = `${data.clientId}:${data.clientSecret}`;
    return Buffer.from(mask).toString("base64");
  }

  /**
   * Perform a "password" authentication using the OAuth 2.0 server.
   *
   * @param data The user credentials.
   */
  public async password(data: { username: string; password: string; scope?: string }): Promise<OAuthCredentials> {
    const request = new OAuthPasswordRequest(data.username, data.password, data.scope);
    const response = await this.http.post("/oauth/token", stringify(request), {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${OAuthWebService.getBasicToken(this.options)}`
      }
    });

    if (response && response.status === 200) {
      return new OAuthCredentials(response.data);
    }
    throw response;
  }

  /**
   * Perform a "client_credentials" authentication using the OAuth 2.0 server.
   */
  public async clientCredentials(): Promise<OAuthCredentials> {
    const request = new OAuthClientCredentialsRequest();
    const response = await this.http.post("/oauth/token", stringify(request), {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${OAuthWebService.getBasicToken(this.options)}` // Get credentials from options
      }
    });

    if (response && response.status === 200) {
      return new OAuthCredentials(response.data);
    }
    throw response;
  }

  /**
<<<<<<< HEAD
   * Revoke one or all tokens from a user using the OAuth 2.0 server.
=======
   * Performs a "refresh_token" authentication using the OAuth 2.0 server.
   */
  public async refreshToken(data: { refreshToken: string }): Promise<OAuthCredentials> {
    const request = new OAuthRefreshRequest(data.refreshToken);

    const response = await this.http.post("/oauth/token", stringify(request), {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${OAuthWebService.getBasicToken(this.options)}` // Get credentials from options
      }
    });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new OAuthCredentials(response.data);
  }

  /**
   * Revokes one or all tokens from a user using the OAuth 2.0 server.
>>>>>>> a81b0935c8ce42885bf340c00c6076b15c3ce867
   *
   * @param accessToken The user access token.
   */
  public async revoke(accessToken?: string): Promise<void> {
    const response = await this.http.post(
      "/oauth/revoke",
      { accessToken },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${OAuthWebService.getBasicToken(this.options)}` // Get credentials from options
        }
      }
    );

    // The client may choose to ignore this error, as it wouldn't interfere with the user flow.
    if (!response || response.status !== 200) {
      throw response;
    }
  }

  /**
   * Get a secret token using a accessToken
   *
   * @param {string} accessToken The user access token
   * @param {OAuthSecretTokenResource} resources The resources the secret token will have access to
   * @param {string[]} [scopes] The scopes the secret token will have access to.
   * If undefined, will use the default scopes for the user role
   */
  public async secret(accessToken: string, resources: OAuthSecretTokenResource, scopes?: string[]) {
    const response = await this.http.post(
      "/oauth/secret",
      { resources, scopes },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if (!response || response.status !== 200) {
      throw response;
    }

    return new OAuthSecretToken(response.data);
  }

  /**
   * Get the server status.
   */
  public async status(): Promise<OAuthStatusResponse> {
    const response = await this.http.get(`/`);

    if (response && response.status === 200) {
      return new OAuthStatusResponse(response.data);
    }

    throw response;
  }
}
