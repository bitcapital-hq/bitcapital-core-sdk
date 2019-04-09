import { User, RequestUtil, RequestSigningOptions } from "bitcapital-common";
import {
  AddressWebService,
  AssetWebService,
  BankingWebService,
  BoletoWebService,
  CardWebService,
  ConsumerWebService,
  DocumentWebService,
  DomainWebService,
  MediatorWebService,
  OAuthWebService,
  OAuthWebServiceOptions,
  PaymentWebService,
  PhoneWebService,
  TransactionWebService,
  UserWebService,
  WalletWebService,
  PhoneCreditWebService
} from "./services";
import { BaseModelWebServiceOptions } from "./services/base/BaseModelWebService";
import { OAuthStatusResponse } from "./services/response";
import { Session } from "./session";
import { ProductWebService } from "./services/ProductWebService";

export interface BitcapitalOptions {
  session?: Session;
  baseURL: string;
  clientId: string;
  clientSecret: string;
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
    this._session =
      options.session ||
      Session.initialize({
        oauth: {
          ...(options as OAuthWebServiceOptions)
        },
        http: {
          ...(options as BaseModelWebServiceOptions)
        }
      });

    // Initialize main web services
    AddressWebService.initialize({ session: this._session, ...options });
    AssetWebService.initialize({ session: this._session, ...options });
    BankingWebService.initialize({ session: this._session, ...options });
    BoletoWebService.initialize({ session: this._session, ...options });
    CardWebService.initialize({ session: this._session, ...options });
    ConsumerWebService.initialize({ session: this._session, ...options });
    DocumentWebService.initialize({ session: this._session, ...options });
    DomainWebService.initialize({ session: this._session, ...options });
    MediatorWebService.initialize({ session: this._session, ...options });
    PaymentWebService.initialize({ session: this._session, ...options });
    PhoneWebService.initialize({ session: this._session, ...options });
    ProductWebService.initialize({ session: this._session, ...options });
    TransactionWebService.initialize({ session: this._session, ...options });
    WalletWebService.initialize({ session: this._session, ...options });
    PhoneCreditWebService.initialize({ session: this._session, ...options });

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
   * Generate signature headers for the specificed request.
   *
   * @param request The request object
   */
  public sign(request: RequestSigningOptions) {
    return RequestUtil.sign(this.options.clientSecret, request);
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
   * Interface for the Addresses service.
   */
  public addresses(): AddressWebService {
    return AddressWebService.getInstance();
  }

  /**
   * Interface for the Assets service.
   */
  public assets(): AssetWebService {
    return AssetWebService.getInstance();
  }

  /**
   * Interface for the Bankings service.
   */
  public bankings(): BankingWebService {
    return BankingWebService.getInstance();
  }

  /**
   * Interface for the Boleto service.
   */
  public boletos(): BoletoWebService {
    return BoletoWebService.getInstance();
  }

  /**
   * Interface for the Consumers service.
   */
  public consumers(): ConsumerWebService {
    return ConsumerWebService.getInstance();
  }

  /**
   * Interface for the Card service.
   */
  public cards(): CardWebService {
    return CardWebService.getInstance();
  }

  /** Interface for the Documents service.
   */
  public documents(): DocumentWebService {
    return DocumentWebService.getInstance();
  }

  /**
   * Interface for the Domains service.
   */
  public domains(): DomainWebService {
    return DomainWebService.getInstance();
  }

  /**
   * Interface for the Mediators service.
   */
  public mediators(): MediatorWebService {
    return MediatorWebService.getInstance();
  }

  /**
   * Interface for the Payments service.
   */
  public payments(): PaymentWebService {
    return PaymentWebService.getInstance();
  }

  /**
   * Interface for the Phones service.
   */
  public phones(): PhoneWebService {
    return PhoneWebService.getInstance();
  }

  /**
   * Interface for the Phone Credit service.
   */
  public phoneCredit(): PhoneCreditWebService {
    return PhoneCreditWebService.getInstance();
  }

  /**
   * Interface for the Product service.
   */
  public products(): ProductWebService {
    return ProductWebService.getInstance();
  }

  /**
   * Interface for the Transactions service.
   */
  public transactions(): TransactionWebService {
    return TransactionWebService.getInstance();
  }

  /**
   * Interface for the Users service.
   */
  public users(): UserWebService {
    return this._session.userWebService;
  }

  /**
   * Interface for the Wallets service.
   */
  public wallets(): WalletWebService {
    return WalletWebService.getInstance();
  }
}
