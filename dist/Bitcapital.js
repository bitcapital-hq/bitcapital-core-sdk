"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitcapital_common_1 = require("bitcapital-common");
const services_1 = require("./services");
const session_1 = require("./session");
const ProductWebService_1 = require("./services/ProductWebService");
/**
 * The main interface for the Bitcapital SDK, holds credentials, instance options and all internal modules.
 */
class Bitcapital {
    /**
     * Construct a new Bitcapital instance, not safe to call directly, use the `init()` method.
     *
     * @param options The bitcapital options and credentials
     */
    constructor(options) {
        this.options = options;
        // Initialize session instance, OAuth and User web services will be initialized automatically
        this._session =
            options.session ||
                session_1.Session.initialize({
                    oauth: Object.assign({}, options),
                    http: Object.assign({}, options)
                });
        // Initialize main web services
        services_1.AddressWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.AssetWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.BankingWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.BoletoWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.CardWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.ConsumerWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.DocumentWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.DomainWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.MediatorWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.PaymentWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.PhoneWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.TransactionWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.WalletWebService.initialize(Object.assign({ session: this._session }, options));
        // Prepare singleton for easier access
        if (!Bitcapital._instance) {
            Bitcapital._instance = this;
        }
    }
    /**
     * Gets the singleton instance, if already initialized and available.
     */
    static getInstance() {
        return this._instance;
    }
    /**
     * Initialize the Bitcapital SDK with credentials.
     *
     * @param options The bitcapital options and credentials.
     */
    static initialize(options) {
        return new Bitcapital(options);
    }
    /**
     * Generate signature headers for the specificed request.
     *
     * @param request The request object
     */
    sign(request) {
        return bitcapital_common_1.RequestUtil.sign(this.options.clientSecret, request);
    }
    /**
     * Get the API Status.
     */
    status() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._session.oauthWebService.status();
        });
    }
    /**
     * Get the currently authenticated user in the SDK, if any.
     */
    current() {
        return this._session.current;
    }
    /**
     * Get the Bitcapital session instance.
     */
    session() {
        return this._session;
    }
    /**
     * Interface for the OAuth 2.0 service.
     */
    oauth() {
        return this._session.oauthWebService;
    }
    /**
     * Interface for the Addresses service.
     */
    addresses() {
        return services_1.AddressWebService.getInstance();
    }
    /**
     * Interface for the Assets service.
     */
    assets() {
        return services_1.AssetWebService.getInstance();
    }
    /**
     * Interface for the Bankings service.
     */
    bankings() {
        return services_1.BankingWebService.getInstance();
    }
    /**
     * Interface for the Boleto service.
     */
    boletos() {
        return services_1.BoletoWebService.getInstance();
    }
    /**
     * Interface for the Consumers service.
     */
    consumers() {
        return services_1.ConsumerWebService.getInstance();
    }
    /**
     * Interface for the Card service.
     */
    cards() {
        return services_1.CardWebService.getInstance();
    }
    /** Interface for the Documents service.
     */
    documents() {
        return services_1.DocumentWebService.getInstance();
    }
    /**
     * Interface for the Domains service.
     */
    domains() {
        return services_1.DomainWebService.getInstance();
    }
    /**
     * Interface for the Mediators service.
     */
    mediators() {
        return services_1.MediatorWebService.getInstance();
    }
    /**
     * Interface for the Payments service.
     */
    payments() {
        return services_1.PaymentWebService.getInstance();
    }
    /**
     * Interface for the Phones service.
     */
    phones() {
        return services_1.PhoneWebService.getInstance();
    }
    /**
     * Interface for the Product service.
     */
    products() {
        return ProductWebService_1.ProductWebService.getInstance();
    }
    /**
     * Interface for the Transactions service.
     */
    transactions() {
        return services_1.TransactionWebService.getInstance();
    }
    /**
     * Interface for the Users service.
     */
    users() {
        return this._session.userWebService;
    }
    /**
     * Interface for the Wallets service.
     */
    wallets() {
        return services_1.WalletWebService.getInstance();
    }
}
exports.default = Bitcapital;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Y2FwaXRhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9CaXRjYXBpdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5REFBNkU7QUFDN0UseUNBaUJvQjtBQUdwQix1Q0FBb0M7QUFDcEMsb0VBQWlFO0FBU2pFOztHQUVHO0FBQ0gsTUFBcUIsVUFBVTtJQUk3Qjs7OztPQUlHO0lBQ0gsWUFBeUMsT0FBMEI7UUFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFDakUsNkZBQTZGO1FBQzdGLElBQUksQ0FBQyxRQUFRO1lBQ1gsT0FBTyxDQUFDLE9BQU87Z0JBQ2YsaUJBQU8sQ0FBQyxVQUFVLENBQUM7b0JBQ2pCLEtBQUssb0JBQ0MsT0FBa0MsQ0FDdkM7b0JBQ0QsSUFBSSxvQkFDRSxPQUFzQyxDQUMzQztpQkFDRixDQUFDLENBQUM7UUFFTCwrQkFBK0I7UUFDL0IsNEJBQWlCLENBQUMsVUFBVSxpQkFBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSyxPQUFPLEVBQUcsQ0FBQztRQUNyRSwwQkFBZSxDQUFDLFVBQVUsaUJBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUssT0FBTyxFQUFHLENBQUM7UUFDbkUsNEJBQWlCLENBQUMsVUFBVSxpQkFBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSyxPQUFPLEVBQUcsQ0FBQztRQUNyRSwyQkFBZ0IsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sRUFBRyxDQUFDO1FBQ3BFLHlCQUFjLENBQUMsVUFBVSxpQkFBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSyxPQUFPLEVBQUcsQ0FBQztRQUNsRSw2QkFBa0IsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sRUFBRyxDQUFDO1FBQ3RFLDZCQUFrQixDQUFDLFVBQVUsaUJBQUcsT0FB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O09BRUc7SUFDSSxRQUFRO1FBQ2IsT0FBTyw0QkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNO1FBQ1gsT0FBTywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNJLFFBQVE7UUFDYixPQUFPLHFDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNJLFlBQVk7UUFDakIsT0FBTyxnQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTywyQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0NBQ0Y7QUF2TUQsNkJBdU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlciwgUmVxdWVzdFV0aWwsIFJlcXVlc3RTaWduaW5nT3B0aW9ucyB9IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xuaW1wb3J0IHtcbiAgQWRkcmVzc1dlYlNlcnZpY2UsXG4gIEFzc2V0V2ViU2VydmljZSxcbiAgQmFua2luZ1dlYlNlcnZpY2UsXG4gIEJvbGV0b1dlYlNlcnZpY2UsXG4gIENhcmRXZWJTZXJ2aWNlLFxuICBDb25zdW1lcldlYlNlcnZpY2UsXG4gIERvY3VtZW50V2ViU2VydmljZSxcbiAgRG9tYWluV2ViU2VydmljZSxcbiAgTWVkaWF0b3JXZWJTZXJ2aWNlLFxuICBPQXV0aFdlYlNlcnZpY2UsXG4gIE9BdXRoV2ViU2VydmljZU9wdGlvbnMsXG4gIFBheW1lbnRXZWJTZXJ2aWNlLFxuICBQaG9uZVdlYlNlcnZpY2UsXG4gIFRyYW5zYWN0aW9uV2ViU2VydmljZSxcbiAgVXNlcldlYlNlcnZpY2UsXG4gIFdhbGxldFdlYlNlcnZpY2Vcbn0gZnJvbSBcIi4vc2VydmljZXNcIjtcbmltcG9ydCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vc2VydmljZXMvYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XG5pbXBvcnQgeyBPQXV0aFN0YXR1c1Jlc3BvbnNlIH0gZnJvbSBcIi4vc2VydmljZXMvcmVzcG9uc2VcIjtcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tIFwiLi9zZXNzaW9uXCI7XG5pbXBvcnQgeyBQcm9kdWN0V2ViU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL1Byb2R1Y3RXZWJTZXJ2aWNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQml0Y2FwaXRhbE9wdGlvbnMge1xuICBzZXNzaW9uPzogU2Vzc2lvbjtcbiAgYmFzZVVSTDogc3RyaW5nO1xuICBjbGllbnRJZDogc3RyaW5nO1xuICBjbGllbnRTZWNyZXQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgbWFpbiBpbnRlcmZhY2UgZm9yIHRoZSBCaXRjYXBpdGFsIFNESywgaG9sZHMgY3JlZGVudGlhbHMsIGluc3RhbmNlIG9wdGlvbnMgYW5kIGFsbCBpbnRlcm5hbCBtb2R1bGVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaXRjYXBpdGFsIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zZXNzaW9uOiBTZXNzaW9uO1xuICBwcm90ZWN0ZWQgc3RhdGljIF9pbnN0YW5jZTogQml0Y2FwaXRhbDtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IEJpdGNhcGl0YWwgaW5zdGFuY2UsIG5vdCBzYWZlIHRvIGNhbGwgZGlyZWN0bHksIHVzZSB0aGUgYGluaXQoKWAgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgYml0Y2FwaXRhbCBvcHRpb25zIGFuZCBjcmVkZW50aWFsc1xuICAgKi9cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBCaXRjYXBpdGFsT3B0aW9ucykge1xuICAgIC8vIEluaXRpYWxpemUgc2Vzc2lvbiBpbnN0YW5jZSwgT0F1dGggYW5kIFVzZXIgd2ViIHNlcnZpY2VzIHdpbGwgYmUgaW5pdGlhbGl6ZWQgYXV0b21hdGljYWxseVxuICAgIHRoaXMuX3Nlc3Npb24gPVxuICAgICAgb3B0aW9ucy5zZXNzaW9uIHx8XG4gICAgICBTZXNzaW9uLmluaXRpYWxpemUoe1xuICAgICAgICBvYXV0aDoge1xuICAgICAgICAgIC4uLihvcHRpb25zIGFzIE9BdXRoV2ViU2VydmljZU9wdGlvbnMpXG4gICAgICAgIH0sXG4gICAgICAgIGh0dHA6IHtcbiAgICAgICAgICAuLi4ob3B0aW9ucyBhcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucylcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAvLyBJbml0aWFsaXplIG1haW4gd2ViIHNlcnZpY2VzXG4gICAgQWRkcmVzc1dlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgQXNzZXRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIEJhbmtpbmdXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIEJvbGV0b1dlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgQ2FyZFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgQ29uc3VtZXJXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIERvY3VtZW50V2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBEb21haW5XZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIE1lZGlhdG9yV2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBQYXltZW50V2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBQaG9uZVdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgVHJhbnNhY3Rpb25XZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIFdhbGxldFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG5cbiAgICAvLyBQcmVwYXJlIHNpbmdsZXRvbiBmb3IgZWFzaWVyIGFjY2Vzc1xuICAgIGlmICghQml0Y2FwaXRhbC5faW5zdGFuY2UpIHtcbiAgICAgIEJpdGNhcGl0YWwuX2luc3RhbmNlID0gdGhpcztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc2luZ2xldG9uIGluc3RhbmNlLCBpZiBhbHJlYWR5IGluaXRpYWxpemVkIGFuZCBhdmFpbGFibGUuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEJpdGNhcGl0YWwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBCaXRjYXBpdGFsIFNESyB3aXRoIGNyZWRlbnRpYWxzLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgYml0Y2FwaXRhbCBvcHRpb25zIGFuZCBjcmVkZW50aWFscy5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBCaXRjYXBpdGFsT3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgQml0Y2FwaXRhbChvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBzaWduYXR1cmUgaGVhZGVycyBmb3IgdGhlIHNwZWNpZmljZWQgcmVxdWVzdC5cbiAgICpcbiAgICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3Qgb2JqZWN0XG4gICAqL1xuICBwdWJsaWMgc2lnbihyZXF1ZXN0OiBSZXF1ZXN0U2lnbmluZ09wdGlvbnMpIHtcbiAgICByZXR1cm4gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCByZXF1ZXN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIEFQSSBTdGF0dXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc3RhdHVzKCk6IFByb21pc2U8T0F1dGhTdGF0dXNSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLm9hdXRoV2ViU2VydmljZS5zdGF0dXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnRseSBhdXRoZW50aWNhdGVkIHVzZXIgaW4gdGhlIFNESywgaWYgYW55LlxuICAgKi9cbiAgcHVibGljIGN1cnJlbnQoKTogVXNlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24uY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIEJpdGNhcGl0YWwgc2Vzc2lvbiBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBzZXNzaW9uKCk6IFNlc3Npb24ge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIE9BdXRoIDIuMCBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIG9hdXRoKCk6IE9BdXRoV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24ub2F1dGhXZWJTZXJ2aWNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIEFkZHJlc3NlcyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGFkZHJlc3NlcygpOiBBZGRyZXNzV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIEFkZHJlc3NXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQXNzZXRzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgYXNzZXRzKCk6IEFzc2V0V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIEFzc2V0V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIEJhbmtpbmdzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgYmFua2luZ3MoKTogQmFua2luZ1dlYlNlcnZpY2Uge1xuICAgIHJldHVybiBCYW5raW5nV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIEJvbGV0byBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGJvbGV0b3MoKTogQm9sZXRvV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIEJvbGV0b1dlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBDb25zdW1lcnMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdW1lcnMoKTogQ29uc3VtZXJXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gQ29uc3VtZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQ2FyZCBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGNhcmRzKCk6IENhcmRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gQ2FyZFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKiBJbnRlcmZhY2UgZm9yIHRoZSBEb2N1bWVudHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBkb2N1bWVudHMoKTogRG9jdW1lbnRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gRG9jdW1lbnRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgRG9tYWlucyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGRvbWFpbnMoKTogRG9tYWluV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIERvbWFpbldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBNZWRpYXRvcnMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBtZWRpYXRvcnMoKTogTWVkaWF0b3JXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gTWVkaWF0b3JXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgUGF5bWVudHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBwYXltZW50cygpOiBQYXltZW50V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIFBheW1lbnRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgUGhvbmVzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgcGhvbmVzKCk6IFBob25lV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIFBob25lV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFByb2R1Y3Qgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBwcm9kdWN0cygpOiBQcm9kdWN0V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIFByb2R1Y3RXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgVHJhbnNhY3Rpb25zIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgdHJhbnNhY3Rpb25zKCk6IFRyYW5zYWN0aW9uV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIFRyYW5zYWN0aW9uV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFVzZXJzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgdXNlcnMoKTogVXNlcldlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLnVzZXJXZWJTZXJ2aWNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFdhbGxldHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyB3YWxsZXRzKCk6IFdhbGxldFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiBXYWxsZXRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cbn1cbiJdfQ==