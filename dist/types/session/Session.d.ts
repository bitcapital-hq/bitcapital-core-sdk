import { HttpInterceptor } from "../base";
import { User } from "../models";
import { OAuthWebService, OAuthWebServiceOptions, UserWebService } from "../services";
import { BaseModelWebServiceOptions } from "../services/base/BaseModelWebService";
import { Observable, Observer, StorageUtil } from "../utils";
export interface SessionOptions {
    http?: BaseModelWebServiceOptions;
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
 * The Session is a singleton, so you may access the authentication state
 * at any time, in any context, getting its current instance. It is also
 * an observable, so it can be watched for changes:
 *
 ```typescript
import { Observer } from 'bitcapital-core-sdk';

// Gets the current Session instance
const session = bitcapital.session();

// Shows the current user instance, if any
console.log(session.current);

// Prepare a new session observer (typescript notation)
const observer: Observer = {
  update(event: string, data: User) {
    if(event === Session.EVENT_SESSION_CHANGED) {
      console.log('User instance has changed in Session', { user: data });
    }
  }
};

// Start listening to Session changes, such as credentials
// expiration or a refreshed access token.
session.subscribe(observer);

// ...

// Eventually, you can also stop listening to its changes
session.unsubscribe(observer);
 ```
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
     * Get the Session interceptors for authorized calls and auto Session destruction.
     */
    interceptors(): HttpInterceptor[];
    /**
     * Get the Session singleton instance.
     */
    static getInstance(): Session;
    static initialize(options: SessionOptions): Session;
    /**
     * Subscribe for updates.
     *
     * @param {Observer} observable The instace to be notified.
     */
    subscribe(observable: Observer): void;
    /**
     * Unsubscribe from updates.
     *
     * @param {Observer} observable The instance to be removed from listeners.
     */
    unsubscribe(observable: Observer): void;
    /**
     * Register a new User in session, notifying all observers.
     *
     * @param user The User instance.
     * @param {{notify: boolean}} options The operation options.
     */
    register(user: User, options?: {
        notify: boolean;
    }): Promise<User>;
    /**
     * Fetch the currently stored Session from local storage.
     */
    protected fetch(): Promise<User>;
    /**
     * Reload the current User using the remote server.
     */
    reload(): Promise<User>;
    /**
     * Destroy the Session and clears the storage.
     */
    destroy(): Promise<User>;
    /**
     * Perform a "password" authentication using the OAuth 2.0 server and registers it in current Session.
     *
     * @param data The User credentials.
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
     * Perform a "client_credentials" authentication using the OAuth 2.0 server and registers it in current Session.
     */
    clientCredentials(): Promise<User>;
}
