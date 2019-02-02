import { Http, HttpOptions, OAuthCredentials, OAuthSecretToken, OAuthSecretTokenResource } from "bitcapital-common";
import { OAuthStatusResponse } from "./response";
export interface OAuthWebServiceOptions extends HttpOptions {
    clientId: string;
    clientSecret: string;
}
export declare class OAuthWebService {
    protected options: OAuthWebServiceOptions;
    protected http: Http;
    protected static instance: OAuthWebService;
    constructor(options: OAuthWebServiceOptions);
    static getInstance(): OAuthWebService;
    static initialize(options: OAuthWebServiceOptions): OAuthWebService;
    /**
     * Get a basic token for client credentials authentication.
     *
     * @returns {string}
     */
    static getBasicToken(data: {
        clientId: string;
        clientSecret: string;
    }): string;
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
     * Performs a "refresh_token" authentication using the OAuth 2.0 server.
     */
    refreshToken(data: {
        refreshToken: string;
    }): Promise<OAuthCredentials>;
    /**
     * Revokes one or all tokens from a user using the OAuth 2.0 server.
     *
     * @param accessToken The user access token.
     */
    revoke(accessToken?: string): Promise<void>;
    /**
     * Get a secret token using a accessToken
     *
     * @param {string} accessToken The user access token
     * @param {OAuthSecretTokenResource} resources The resources the secret token will have access to
     * @param {string[]} [scopes] The scopes the secret token will have access to.
     * If undefined, will use the default scopes for the user role
     */
    secret(accessToken: string, resources: OAuthSecretTokenResource, scopes?: string[]): Promise<OAuthSecretToken>;
    /**
     * Get the server status.
     */
    status(): Promise<OAuthStatusResponse>;
}
