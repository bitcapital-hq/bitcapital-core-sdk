import { HttpOptions } from "./base";
import {
  OAuthWebServiceOptions,
  ConsumerWebService,
  DomainWebService,
  AssetWebService,
  PaymentWebService,
  UserWebService,
  WalletWebService,
  OAuthWebService
} from "./services";
import { Session } from "./session";
import { OAuthStatusResponse } from "./services/response";
import { User } from "./models";

export interface BitcapitalOptions {
  http: HttpOptions;
  oauth: OAuthWebServiceOptions;
  session?: Session;
}

/**
 * The main interface for the Bitcapital SDK, holds credentials, instance options and all internal modules.
 */
export default class Bitcapital {
  protected readonly _session: Session;
  protected static _instance: Bitcapital;

  /**
   * Construct a new Bitcapital instance, not safe to call directly, use the `init()` method.
   *
   * @param options The bitcapital options and credentials
   */
  protected constructor(protected readonly options: BitcapitalOptions) {
    // Initialize session instance, OAuth and User web services will be initialized automatically
    this._session = options.session || Session.initialize({ oauth: options.oauth, http: options.http });

    // Initialize main web services
    AssetWebService.initialize({ session: this._session, ...options.http });
    ConsumerWebService.initialize({ session: this._session, ...options.http });
    DomainWebService.initialize({ session: this._session, ...options.http });
    PaymentWebService.initialize({ session: this._session, ...options.http });
    WalletWebService.initialize({ session: this._session, ...options.http });

    // Prepare singleton for easier access
    if (!Bitcapital._instance) {
      Bitcapital._instance = this;
    }
  }

  /**
   * Gets the singleton instance, if already initialized and available.
   */
  public static getInstance(): Bitcapital | undefined {
    return this._instance;
  }

  /**
   * Initialize the Bitcapital SDK with credentials.
   *
   * @param options The bitcapital options and credentials.
   */
  public static initialize(options: BitcapitalOptions) {
    return new Bitcapital(options);
  }

  /**
   * Get the API Status.
   */
  public async status(): Promise<OAuthStatusResponse> {
    return this._session.oauthWebService.status();
  }

  /**
   * Get the currently authenticated user in the SDK, if any.
   */
  public current(): User | undefined {
    return this._session.current;
  }

  /**
   * Get the Bitcapital session instance.
   */
  public session(): Session {
    return this._session;
  }

  /**
   * Interface for the OAuth 2.0 service.
   */
  public oauth(): OAuthWebService {
    return this._session.oauthWebService;
  }

  /**
   * Interface for the Assets service.
   */
  public assets(): AssetWebService {
    return AssetWebService.getInstance();
  }

  /**
   * Interface for the Consumers service.
   */
  public consumers(): ConsumerWebService {
    return ConsumerWebService.getInstance();
  }

  /**
   * Interface for the Domains service.
   */
  public domains(): DomainWebService {
    return DomainWebService.getInstance();
  }

  /**
   * Interface for the Payments service.
   */
  public payments(): PaymentWebService {
    return PaymentWebService.getInstance();
  }

  /**
   * Interface for the Users service.
   */
  public users(): UserWebService {
    return UserWebService.getInstance();
  }

  /**
   * Interface for the Wallets service.
   */
  public wallets(): WalletWebService {
    return WalletWebService.getInstance();
  }
}
