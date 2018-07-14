import { User } from '../models';
import { HttpInterceptor, HttpOptions } from '../base';
import { Observable, Observer, StorageUtil, LocalStorage } from '../utils';
import { OAuthWebService, OAuthWebServiceOptions, UserWebService } from '../services';
import { SessionCredentialsInterceptor, SessionUnauthorizedInterceptor } from './interceptors';

export interface SessionOptions {
  http?: HttpOptions;
  autoFetch?: boolean;
  storage?: StorageUtil;
  oauth?: OAuthWebServiceOptions;
  userWebService?: UserWebService;
  oauthWebService?: OAuthWebService;
}

export default class Session {
  current?: User;
  storage: StorageUtil;
  observable: Observable;
  userWebService: UserWebService;
  oauthWebService: OAuthWebService;
  _interceptors: HttpInterceptor[] = [];

  public static EVENT_SESSION_CHANGED = 'SESSION_CHANGED';

  protected static instance: Session;

  constructor(public options: SessionOptions) {
    this.observable = new Observable();
    this.storage = options.storage || new StorageUtil('session', new LocalStorage(window));

    // Prepare session interceptors
    this._interceptors = [
      new SessionCredentialsInterceptor(this),
      new SessionUnauthorizedInterceptor(() => this.destroy()),
    ];

    // TODO: Service instance or config are required, validate this
    this.oauthWebService = options.oauthWebService || OAuthWebService.getInstance({ ...options.oauth });
    this.userWebService = options.userWebService || UserWebService.getInstance({ session: this, ...options.http });

    // Fetch session in startup by default
    if (options.autoFetch as any !== false) {
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
   *
   * @param options The session options
   */
  public static getInstance(options: SessionOptions): Session {
    if (!this.instance) {
      this.instance = new Session(options);
    }
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
    await this.storage.put('session', this.current);

    // At last, notify observers of this change
    if (!options || (options && options.notify)) {
      await this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
    }
    return this.current;
  }

  /**
   * Fetches the currently stored session.
   */
  protected async fetch() {
    this.current = await this.storage.get('session');

    await this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);

    return this.current;
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
        await this.oauthWebService.revoke(this.current.credentials.accessToken);
      } catch (exception) {
        console.warn('SESSION: Could not destroy current session', exception);
      }
    }

    return this.current;
  }

  /**
   * Performs a "password" authentication using the OAuth 2.0 server and registers it in current session.
   *
   * @param data The user credentials
   */
  public async password(data: { username: string, password: string }): Promise<User> {
    const oauth = await this.oauthWebService.password(data);

    if (oauth.accessToken) {

      try {
        const user = await this.userWebService.me(oauth);
        return this.register(new User({ ...user, credentials: oauth }));
      } catch (error) {
        error.credentials = oauth;
        throw error;
      }
    }

    throw oauth;
  }

  /**
   * Performs a "client_credentials" authentication using the OAuth 2.0 server and registers it in current session.
   */
  public async clientCredentials(): Promise<User> {
    const oauth = await this.oauthWebService.clientCredentials();

    try {

      if (oauth.accessToken && !oauth.virtual) {
        const user = await this.userWebService.me(oauth);
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
