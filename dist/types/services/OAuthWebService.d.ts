import { Http, HttpOptions } from "../base";
import { OAuthCredentials } from "../models";
import { OAuthStatusResponse } from "./response";
export interface OAuthWebServiceOptions extends HttpOptions {
    clientId: string;
    clientSecret: string;
}
export default class OAuthWebService {
    protected options: OAuthWebServiceOptions;
    protected http: Http;
    protected static instance: OAuthWebService;
    constructor(options: OAuthWebServiceOptions);
    static getInstance(): OAuthWebService;
    static initialize(options: OAuthWebServiceOptions): OAuthWebService;
    /**
     * Get a basic token for client credentials authentication.
     *
     * @returns {String}
     */
    static getBasicToken(data: {
        clientId: string;
        clientSecret: string;
    }): String;
    /**
     * Perform a "password" authentication using the OAuth 2.0 server.
     *
     * @param data The user credentials.
     */
    password(data: {
        username: string;
        password: string;
        scope?: string;
    }): Promise<OAuthCredentials>;
    /**
     * Perform a "client_credentials" authentication using the OAuth 2.0 server.
     */
    clientCredentials(): Promise<OAuthCredentials>;
    /**
  <<<<<<< HEAD
     * Revoke one or all tokens from a user using the OAuth 2.0 server.
  =======
     * Performs a "refresh_token" authentication using the OAuth 2.0 server.
     */
    refreshToken(data: {
        refreshToken: string;
    }): Promise<OAuthCredentials>;
    /**
     * Revokes one or all tokens from a user using the OAuth 2.0 server.
  >>>>>>> a81b0935c8ce42885bf340c00c6076b15c3ce867
     *
     * @param accessToken The user access token.
     */
    revoke(accessToken?: String): Promise<void>;
    /**
     * Get the server status.
     */
    status(): Promise<OAuthStatusResponse>;
}
