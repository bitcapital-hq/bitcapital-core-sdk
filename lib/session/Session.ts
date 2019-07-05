import { HttpInterceptor, Observable, Observer, User, UserSchema } from "bitcapital-common";
import { OAuthWebService, OAuthWebServiceOptions, UserWebService } from "../services";
import { BaseModelWebServiceOptions } from "../services/base/BaseModelWebService";
import { StorageUtil } from "../utils";
import { SessionCredentialsInterceptor, SessionUnauthorizedInterceptor } from "./interceptors";

export interface SessionOptions {
  http?: BaseModelWebServiceOptions;
  oauth?: OAuthWebServiceOptions;
  storage?: StorageUtil;
  autoFetch?: boolean;
  sessionUnauthorizedHandler?: (current: User) => Promise<void>;
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
  current?: User;
  storage: StorageUtil;
  isFetching: boolean = false;
  isLoading: boolean = false;
  observable: Observable;
  userWebService: UserWebService;
  oauthWebService: OAuthWebService;
  private _fetchPromise?: Promise<User>;
  private _interceptors: HttpInterceptor[] = [];

  public static EVENT_SESSION_CHANGED = "SESSION_CHANGED";

  protected static instance: Session;

  constructor(public options: SessionOptions) {
    this.observable = new Observable();
    this.storage = options.storage || new StorageUtil("session");

    // Prepare Session interceptors
    this._interceptors = [
      new SessionCredentialsInterceptor(this),
      new SessionUnauthorizedInterceptor(this, () => {
        try {
          const refreshToken = this.current.credentials && this.current.credentials.refreshToken;

          if (options.sessionUnauthorizedHandler) {
            // If there's a custom handler, run it
            return options.sessionUnauthorizedHandler(this.current);
          }
          if (refreshToken) {
            // If there's a refresh token, try to refresh it
            return this.refreshToken({ refreshToken });
          }
          // No refresh token, just destroy the session
          console.warn("Session is invalid and no refresh token avaiable, destroying session");
          return this.destroy();
        } catch (error) {
          // Refresh token auth failed, destroy the session
          console.error("Session is invalid and handler failed, destroying session");
          this.destroy();
          throw error;
        }
      })
    ];

    // Prepare inner web services
    this.userWebService = options.http
      ? UserWebService.initialize({ session: this, ...options.http })
      : UserWebService.getInstance();
    this.oauthWebService = options.oauth
      ? OAuthWebService.initialize({ ...options.oauth })
      : OAuthWebService.getInstance();

    // Fetch session in startup by default
    if ((options.autoFetch as any) !== false) {
      this._fetchPromise = this.fetch();
    }
  }

  /**
   * Get the Session interceptors for authorized calls and auto Session destruction.
   */
  interceptors(): HttpInterceptor[] {
    return this._interceptors;
  }

  /**
   * Get the Session singleton instance.
   */
  public static getInstance(): Session {
    return this.instance;
  }

  public static initialize(options: SessionOptions): Session {
    this.instance = new Session(options);
    return this.instance;
  }

  /**
   * Subscribe for updates.
   *
   * @param {Observer} observable The instace to be notified.
   */
  public subscribe(observable: Observer) {
    this.observable.subscribe(observable);
  }

  /**
   * Unsubscribe from updates.
   *
   * @param {Observer} observable The instance to be removed from listeners.
   */
  public unsubscribe(observable: Observer) {
    this.observable.unsubscribe(observable);
  }

  /**
   * Returns a promise to await fetching completion.
   */
  public async onFetch() {
    if (!this._fetchPromise) {
      return Promise.resolve(this.current);
    }
    return this._fetchPromise;
  }

  /**
   * Register a new User in session, notifying all observers.
   *
   * @param user The User instance.
   * @param {{notify: boolean}} options The operation options.
   */
  public async register(user: User, options = { notify: true }) {
    this.current = user;

    // Save in local storage
    await this.storage.put("session", this.current);

    // At last, notify observers of this change
    if (!options || (options && options.notify)) {
      await this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
    }
    return this.current;
  }

  /**
   * Fetch the currently stored Session from local storage.
   */
  public async fetch() {
    this.isFetching = true;
    try {
      this.current = await this.storage.get("session");
      await this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
    } catch (exception) {
      console.warn("Could not fetch from local storage, clearing session", exception);
      await this.destroy();
    }
    this.isFetching = false;
    return this.current;
  }

  /**
   * Reload the current User using the remote server.
   */
  public async reload() {
    if (this.current) {
      this.isLoading = true;
      try {
        const oauth = this.current.credentials;
        const user = await this.userWebService.me(oauth);
        return this.register(new User({ ...user, credentials: oauth } as UserSchema));
      } catch (exception) {
        console.warn("Could not fetch from local storage, clearing session", exception);
        await this.destroy();
      }
      this.isLoading = false;
    }
    return this.current;
  }

  /**
   * Destroy the Session and clears the storage.
   */
  public async destroy() {
    this.current = undefined;

    // Destroys in local storage
    await this.storage.clear();

    // At last, notify observers of this change
    await this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);

    if (this.current) {
      // Revokes the token in the OAuth Server
      try {
        await this.oauthWebService.revoke(this.current.credentials.accessToken);
      } catch (exception) {
        console.warn("SESSION: Could not destroy current session", exception);
      }
    }

    return this.current;
  }

  /**
   * Perform a "password" authentication using the OAuth 2.0 server and registers it in current Session.
   *
   * @param data The User credentials.
   */
  public async password(data: PasswordGrantOptions): Promise<User> {
    this.isLoading = true;
    try {
      const oauth = await this.oauthWebService.password({
        username: data.username,
        password: data.password,
        scope: data.scopes ? data.scopes.join(",") : data.scope
      });

      if (!oauth.accessToken) {
        this.isLoading = false;
        throw oauth;
      }

      try {
        const user = await this.userWebService.me(oauth);
        this.isLoading = false;
        return this.register(new User({ ...user, credentials: oauth } as UserSchema));
      } catch (error) {
        error.credentials = oauth;
        this.isLoading = false;
        throw error;
      }
    } catch (error) {
      this.isLoading = false;
      throw error;
    }
  }

  /**
   * Performs a "refresh_token" authentication using the OAuth 2.0 server and registers it in current session.
   * This method is automatically called on requests that return 401
   *
   * @param {RefreshGrantOptions} data
   */
  public async refreshToken(data: RefreshGrantOptions) {
    this.isLoading = true;
    try {
      const oauth = await this.oauthWebService.refreshToken({
        refreshToken: data.refreshToken
      });

      if (!oauth.accessToken) {
        this.isLoading = false;
        throw oauth;
      }

      try {
        const user = await this.userWebService.me(oauth);
        this.isLoading = false;
        return this.register(new User({ ...user, credentials: oauth } as UserSchema));
      } catch (error) {
        error.credentials = oauth;
        this.isLoading = false;
        throw error;
      }
    } catch (error) {
      this.isLoading = false;
      throw error;
    }
  }

  /**
   * Perform a "client_credentials" authentication using the OAuth 2.0 server and registers it in current Session.
   */
  public async clientCredentials(): Promise<User> {
    this.isLoading = true;

    try {
      // The client ID and client secret will be passed by the OAuthWebService
      const oauth = await this.oauthWebService.clientCredentials();

      try {
        if (oauth.accessToken && !oauth.virtual) {
          const user = await this.userWebService.me(oauth);
          this.isLoading = false;
          return this.register(user);
        }
        if (oauth.accessToken) {
          this.isLoading = false;
          return this.register(new User({ id: oauth.userId, credentials: oauth }));
        }
      } catch (error) {
        error.credentials = oauth;
        this.isLoading = false;
        throw error;
      }

      throw oauth;
    } catch (error) {
      this.isLoading = false;
      throw error;
    }
  }
}
