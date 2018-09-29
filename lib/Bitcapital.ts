import { HttpOptions } from "./base";
import {
  OAuthWebServiceOptions,
  ConsumerWebService,
  DomainWebService,
  AssetWebService,
  PaymentWebService,
  UserWebService,
  WalletWebService
} from "./services";
import { Session } from "./session";

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

  /**
   * Constructs a new Bitcapital instance, not safe to call directly, use the `init()` method.
   *
   * @param options The bitcapital options and credentials
   */
  protected constructor(protected options: BitcapitalOptions) {
    // Initialize session instance, OAuth and User web services will be initialized automatically
    this._session = options.session || Session.initialize({ oauth: options.oauth, http: options.http });

    // Initialize main web services
    AssetWebService.initialize({ ...options.http });
    ConsumerWebService.initialize({ ...options.http });
    DomainWebService.initialize({ ...options.http });
    PaymentWebService.initialize({ ...options.http });
    WalletWebService.initialize({ ...options.http });
  }

  /**
   * Initializes the Bitcapital SDK with credentials.
   *
   * @param options The bitcapital options and credentials
   */
  public static initialize(options: BitcapitalOptions) {
    return new Bitcapital(options);
  }

  /**
   * Gets the Bitcapital session instance.
   */
  public session() {
    return this._session;
  }

  /**
   * Interface for the OAuth 2.0 service.
   */
  public oauth() {
    return this._session.oauthWebService;
  }

  /**
   * Interface for the Assets service.
   */
  public assets() {
    return AssetWebService.getInstance();
  }

  /**
   * Interface for the Consumers service.
   */
  public consumers() {
    return ConsumerWebService.getInstance();
  }

  /**
   * Interface for the Domains service.
   */
  public domains() {
    return DomainWebService.getInstance();
  }

  /**
   * Interface for the Payments service.
   */
  public payments() {
    return PaymentWebService.getInstance();
  }

  /**
   * Interface for the Users service.
   */
  public users() {
    return UserWebService.getInstance();
  }

  /**
   * Interface for the Wallets service.
   */
  public wallets() {
    return WalletWebService.getInstance();
  }
}
