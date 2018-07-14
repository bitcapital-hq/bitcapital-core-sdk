import { User } from '../models';
import { HttpInterceptor, HttpOptions } from '../base';
import { Observable, Observer, StorageUtil } from '../utils';
import { OAuthWebService, OAuthWebServiceOptions, UserWebService } from '../services';
export interface SessionOptions {
    http?: HttpOptions;
    autoFetch?: boolean;
    storage?: StorageUtil;
    oauth?: OAuthWebServiceOptions;
    userWebService?: UserWebService;
    oauthWebService?: OAuthWebService;
}
export default class Session {
    options: SessionOptions;
    current?: User;
    storage: StorageUtil;
    observable: Observable;
    userWebService: UserWebService;
    oauthWebService: OAuthWebService;
    _interceptors: HttpInterceptor[];
    static EVENT_SESSION_CHANGED: string;
    protected static instance: Session;
    constructor(options: SessionOptions);
    /**
     * Gets the sesison interceptors for authorized calls and auto session destruction.
     */
    interceptors(): HttpInterceptor[];
    /**
     * Gets session singleton instance.
     *
     * @param options The session options
     */
    static getInstance(options: SessionOptions): Session;
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
     * @param {{notify: boolean}} options The operation options
     */
    register(user: User, options?: {
        notify: boolean;
    }): Promise<User>;
    /**
     * Fetches the currently stored session.
     */
    protected fetch(): Promise<User>;
    /**
     * Destroys the session and clears the storage.
     */
    destroy(): Promise<User>;
    /**
     * Performs a "password" authentication using the OAuth 2.0 server and registers it in current session.
     *
     * @param data The user credentials
     */
    password(data: {
        username: string;
        password: string;
    }): Promise<User>;
    /**
     * Performs a "client_credentials" authentication using the OAuth 2.0 server and registers it in current session.
     */
    clientCredentials(): Promise<User>;
}
