import { HttpOptions } from "./base";
import { OAuthWebServiceOptions, ConsumerWebService, DomainWebService, AssetWebService, PaymentWebService, UserWebService, WalletWebService, OAuthWebService } from "./services";
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
    protected readonly options: BitcapitalOptions;
    protected readonly _session: Session;
    protected static _instance: Bitcapital;
    /**
     * Construct a new Bitcapital instance, not safe to call directly, use the `init()` method.
     *
     * @param options The bitcapital options and credentials
     */
    protected constructor(options: BitcapitalOptions);
    /**
     * Gets the singleton instance, if already initialized and available.
     */
    static getInstance(): Bitcapital | undefined;
    /**
     * Initialize the Bitcapital SDK with credentials.
     *
     * @param options The bitcapital options and credentials.
     */
    static initialize(options: BitcapitalOptions): Bitcapital;
    /**
     * Get the API Status.
     */
    status(): Promise<OAuthStatusResponse>;
    /**
     * Get the currently authenticated user in the SDK, if any.
     */
    current(): User | undefined;
    /**
     * Get the Bitcapital session instance.
     */
    session(): Session;
    /**
     * Interface for the OAuth 2.0 service.
     */
    oauth(): OAuthWebService;
    /**
     * Interface for the Assets service.
     */
    assets(): AssetWebService;
    /**
     * Interface for the Consumers service.
     */
    consumers(): ConsumerWebService;
    /**
     * Interface for the Domains service.
     */
    domains(): DomainWebService;
    /**
     * Interface for the Payments service.
     */
    payments(): PaymentWebService;
    /**
     * Interface for the Users service.
     */
    users(): UserWebService;
    /**
     * Interface for the Wallets service.
     */
    wallets(): WalletWebService;
}
