import { User, UserSchema } from "../models";
import { HttpInterceptor, HttpOptions } from "../base";
import { Observable, Observer, StorageUtil } from "../utils";
import { OAuthWebService, OAuthWebServiceOptions, UserWebService } from "../services";
import { SessionCredentialsInterceptor, SessionUnauthorizedInterceptor } from "./interceptors";

export interface SessionOptions {
  http?: HttpOptions;
  autoFetch?: boolean;
  storage?: StorageUtil;
  oauth?: OAuthWebServiceOptions;
}

export default class Session {
  current?: User;
  storage: StorageUtil;
  observable: Observable;
  _interceptors: HttpInterceptor[] = [];

  public static EVENT_SESSION_CHANGED = "SESSION_CHANGED";

  protected static instance: Session;

  constructor(public options: SessionOptions) {
    this.observable = new Observable();
    this.storage = options.storage || new StorageUtil("session");

    // Prepare session interceptors
    this._interceptors = [
      new SessionCredentialsInterceptor(this),
      new SessionUnauthorizedInterceptor(() => this.destroy())
    ];

    // Fetch session in startup by default
    if ((options.autoFetch as any) !== false) {
      this.fetch();
    }
  }

  /**
   * Gets the sesison interceptors for authorized calls and auto session destruction.
   */
  interceptors(): HttpInterceptor[] {
    return this._interceptors;
  }

  /**
   * Gets session singleton instance.
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
   * @param {Observer} observable The instace to be notified
   */
  public subscribe(observable: Observer) {
    this.observable.subscribe(observable);
  }

  /**
   * Unsubscribe from updates.
   *
   * @param {Observer} observable The instance to be removed from listeners
   */
  public unsubscribe(observable: Observer) {
    this.observable.unsubscribe(observable);
  }

  /**
   * Registers a new user in session, notifying all observers.
   *
   * @param user The user instance
   * @param {{notify: boolean}} options The operation options
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
   * Fetches the currently stored session from local storage.
   */
  protected async fetch() {
    this.current = await this.storage.get("session");
    await this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
    return this.current;
  }

  /**
   * Reloads the current user using the remote server.
   */
  public async reload() {
    if (this.current) {
      const oauth = this.current.credentials;
      const user = await UserWebService.getInstance().me(oauth);
      return this.register(new User({ ...user, credentials: oauth } as UserSchema));
    }
  }

  /**
   * Destroys the session and clears the storage.
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
        await OAuthWebService.getInstance().revoke(this.current.credentials.accessToken);
      } catch (exception) {
        console.warn("SESSION: Could not destroy current session", exception);
      }
    }

    return this.current;
  }

  /**
   * Performs a "password" authentication using the OAuth 2.0 server and registers it in current session.
   *
   * @param data The user credentials
   */
  public async password(data: { username: string; password: string }): Promise<User> {
    const oauth = await OAuthWebService.getInstance().password(data);

    if (oauth.accessToken) {
      try {
        const user = await UserWebService.getInstance().me(oauth);
        return this.register(new User({ ...user, credentials: oauth } as UserSchema));
      } catch (error) {
        error.credentials = oauth;
        throw error;
      }
    }

    throw oauth;
  }

  /**
   * Refreshs the current user information.
   */
  public async refresh(): Promise<User> {
    if (!this.current) return;

    const user = await UserWebService.getInstance().me();
    this.register(new User({ ...user, credentials: this.current.credentials } as UserSchema));

    return user;
  }

  /**
   * Performs a "client_credentials" authentication using the OAuth 2.0 server and registers it in current session.
   */
  public async clientCredentials(): Promise<User> {
    // The client ID and client secret will be passed by the OAuthWebService
    const oauth = await OAuthWebService.getInstance().clientCredentials();

    try {
      if (oauth.accessToken && !oauth.virtual) {
        const user = await UserWebService.getInstance().me(oauth);
        return this.register(user);
      }
      if (oauth.accessToken) {
        return this.register(new User({ id: oauth.userId, credentials: oauth }));
      }
    } catch (error) {
      error.credentials = oauth;
      throw error;
    }

    throw oauth;
  }
}
