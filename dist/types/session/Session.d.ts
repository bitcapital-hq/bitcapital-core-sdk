import { User } from "../models";
import { HttpInterceptor, HttpOptions } from "../base";
import { Observable, Observer, StorageUtil } from "../utils";
import { OAuthWebService, OAuthWebServiceOptions, UserWebService } from "../services";
export interface SessionOptions {
    http?: HttpOptions;
    oauth?: OAuthWebServiceOptions;
    storage?: StorageUtil;
    autoFetch?: boolean;
}
export interface PasswordGrantOptions {
    username: string;
    password: string;
    scopes?: string[];
    scope?: string;
}
export interface RefreshGrantOptions {
    refreshToken: string;
}
/**
 * An abstraction layer to securely store and manage platform credentials.
 *
 * The session is a singleton, so you may access the authentication state
 * at any time, in any context, getting its current instance. It is also
 * an observable, so it can be watched for changes:
 *
 * ```typescript
 * import { Observer } from 'bitcapital-core-sdk';
 *
 * // Gets the current session instance
 * const session = bitcapital.session();
 *
 * // Shows the current user instance, if any
 * console.log(session.current);
 *
 * // Prepare a new session observer (typescript notation)
 * const observer: Observer = {
 *   update(event: string, data: User) {
 *     if(event === Session.EVENT_SESSION_CHANGED) {
 *       console.log('User instance has changed in Session', { user: data });
 *     }
 *   }
 * };
 *
 * // Start listening to session changes, such as credentials
 * // expiration or a refreshed access token.
 * session.subscribe(observer);
 *
 * // ...
 *
 * // Eventually, you can also stop listening to its changes
 * session.unsubscribe(observer);
 * ```
 */
export default class Session {
    options: SessionOptions;
    current?: User;
    storage: StorageUtil;
    observable: Observable;
    userWebService: UserWebService;
    oauthWebService: OAuthWebService;
    private _interceptors;
    static EVENT_SESSION_CHANGED: string;
    protected static instance: Session;
    constructor(options: SessionOptions);
    /**
     * Gets the sesison interceptors for authorized calls and auto session destruction.
     */
    interceptors(): HttpInterceptor[];
    /**
     * Gets session singleton instance.
     */
    static getInstance(): Session;
    static initialize(options: SessionOptions): Session;
    /**
     * Subscribe for updates.
     *
     * @param {Observer} observable The instace to be notified
     */
    subscribe(observable: Observer): void;
    /**
     * Unsubscribe from updates.
     *
     * @param {Observer} observable The instance to be removed from listeners
     */
    unsubscribe(observable: Observer): void;
    /**
     * Registers a new user in session, notifying all observers.
     *
     * @param user The user instance
     * @param options The operation options
     */
    register(user: User, options?: {
        notify: boolean;
    }): Promise<User>;
    /**
     * Fetches the currently stored session from local storage.
     */
    protected fetch(): Promise<User>;
    /**
     * Reloads the current user using the remote server.
     */
    reload(): Promise<User>;
    /**
     * Destroys the session and clears the storage.
     */
    destroy(): Promise<User>;
    /**
     * Performs a "password" authentication using the OAuth 2.0 server and registers it in current session.
     *
     * @param data The user credentials
     */
    password(data: PasswordGrantOptions): Promise<User>;
    /**
     * Performs a "refresh_token" authentication using the OAuth 2.0 server and registers it in current session.
     * This method is automatically called on requests that return 401
     *
     * @param {RefreshGrantOptions} data
     */
    refreshToken(data: RefreshGrantOptions): Promise<User>;
    /**
     * Performs a "client_credentials" authentication using the OAuth 2.0 server and registers it in current session.
     */
    clientCredentials(): Promise<User>;
}
