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
        ProductWebService_1.ProductWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.TransactionWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.WalletWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.PhoneCreditWebService.initialize(Object.assign({ session: this._session }, options));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Y2FwaXRhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9CaXRjYXBpdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5REFBNkU7QUFDN0UseUNBa0JvQjtBQUdwQix1Q0FBb0M7QUFDcEMsb0VBQWlFO0FBU2pFOztHQUVHO0FBQ0gsTUFBcUIsVUFBVTtJQUk3Qjs7OztPQUlHO0lBQ0gsWUFBeUMsT0FBMEI7UUFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFDakUsNkZBQTZGO1FBQzdGLElBQUksQ0FBQyxRQUFRO1lBQ1gsT0FBTyxDQUFDLE9BQU87Z0JBQ2YsaUJBQU8sQ0FBQyxVQUFVLENBQUM7b0JBQ2pCLEtBQUssb0JBQ0MsT0FBa0MsQ0FDdkM7b0JBQ0QsSUFBSSxvQkFDRSxPQUFzQyxDQUMzQztpQkFDRixDQUFDLENBQUM7UUFFTCwrQkFBK0I7UUFDL0IsNEJBQWlCLENBQUMsVUFBVSxpQkFBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSyxPQUFPLEVBQUcsQ0FBQztRQUNyRSwwQkFBZSxDQUFDLFVBQVUsaUJBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUssT0FBTyxFQUFHLENBQUM7UUFDbkUsNEJBQWlCLENBQUMsVUFBVSxpQkFBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSyxPQUFPLEVBQUcsQ0FBQztRQUNyRSwyQkFBZ0IsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sRUFBRyxDQUFDO1FBQ3BFLHlCQUFjLENBQUMsVUFBVSxpQkFBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSyxPQUFPLEVBQUcsQ0FBQztRQUNsRSw2QkFBa0IsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sRUFBRyxDQUFDO1FBQ3RFLDZCQUFrQixDQUFDLFVBQVUsaUJBQUcsT0FB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Q0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLE9BQU8sMkJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksU0FBUztRQUNkLE9BQU8sNkJBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLE9BQU8sNEJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLE9BQU8sMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2IsT0FBTyxxQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxZQUFZO1FBQ2pCLE9BQU8sZ0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLE9BQU8sMkJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQztDQUNGO0FBek1ELDZCQXlNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXIsIFJlcXVlc3RVdGlsLCBSZXF1ZXN0U2lnbmluZ09wdGlvbnMgfSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcbmltcG9ydCB7XG4gIEFkZHJlc3NXZWJTZXJ2aWNlLFxuICBBc3NldFdlYlNlcnZpY2UsXG4gIEJhbmtpbmdXZWJTZXJ2aWNlLFxuICBCb2xldG9XZWJTZXJ2aWNlLFxuICBDYXJkV2ViU2VydmljZSxcbiAgQ29uc3VtZXJXZWJTZXJ2aWNlLFxuICBEb2N1bWVudFdlYlNlcnZpY2UsXG4gIERvbWFpbldlYlNlcnZpY2UsXG4gIE1lZGlhdG9yV2ViU2VydmljZSxcbiAgT0F1dGhXZWJTZXJ2aWNlLFxuICBPQXV0aFdlYlNlcnZpY2VPcHRpb25zLFxuICBQYXltZW50V2ViU2VydmljZSxcbiAgUGhvbmVXZWJTZXJ2aWNlLFxuICBUcmFuc2FjdGlvbldlYlNlcnZpY2UsXG4gIFVzZXJXZWJTZXJ2aWNlLFxuICBXYWxsZXRXZWJTZXJ2aWNlLFxuICBQaG9uZUNyZWRpdFdlYlNlcnZpY2Vcbn0gZnJvbSBcIi4vc2VydmljZXNcIjtcbmltcG9ydCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vc2VydmljZXMvYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XG5pbXBvcnQgeyBPQXV0aFN0YXR1c1Jlc3BvbnNlIH0gZnJvbSBcIi4vc2VydmljZXMvcmVzcG9uc2VcIjtcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tIFwiLi9zZXNzaW9uXCI7XG5pbXBvcnQgeyBQcm9kdWN0V2ViU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL1Byb2R1Y3RXZWJTZXJ2aWNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQml0Y2FwaXRhbE9wdGlvbnMge1xuICBzZXNzaW9uPzogU2Vzc2lvbjtcbiAgYmFzZVVSTDogc3RyaW5nO1xuICBjbGllbnRJZDogc3RyaW5nO1xuICBjbGllbnRTZWNyZXQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgbWFpbiBpbnRlcmZhY2UgZm9yIHRoZSBCaXRjYXBpdGFsIFNESywgaG9sZHMgY3JlZGVudGlhbHMsIGluc3RhbmNlIG9wdGlvbnMgYW5kIGFsbCBpbnRlcm5hbCBtb2R1bGVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaXRjYXBpdGFsIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zZXNzaW9uOiBTZXNzaW9uO1xuICBwcm90ZWN0ZWQgc3RhdGljIF9pbnN0YW5jZTogQml0Y2FwaXRhbDtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IEJpdGNhcGl0YWwgaW5zdGFuY2UsIG5vdCBzYWZlIHRvIGNhbGwgZGlyZWN0bHksIHVzZSB0aGUgYGluaXQoKWAgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgYml0Y2FwaXRhbCBvcHRpb25zIGFuZCBjcmVkZW50aWFsc1xuICAgKi9cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBCaXRjYXBpdGFsT3B0aW9ucykge1xuICAgIC8vIEluaXRpYWxpemUgc2Vzc2lvbiBpbnN0YW5jZSwgT0F1dGggYW5kIFVzZXIgd2ViIHNlcnZpY2VzIHdpbGwgYmUgaW5pdGlhbGl6ZWQgYXV0b21hdGljYWxseVxuICAgIHRoaXMuX3Nlc3Npb24gPVxuICAgICAgb3B0aW9ucy5zZXNzaW9uIHx8XG4gICAgICBTZXNzaW9uLmluaXRpYWxpemUoe1xuICAgICAgICBvYXV0aDoge1xuICAgICAgICAgIC4uLihvcHRpb25zIGFzIE9BdXRoV2ViU2VydmljZU9wdGlvbnMpXG4gICAgICAgIH0sXG4gICAgICAgIGh0dHA6IHtcbiAgICAgICAgICAuLi4ob3B0aW9ucyBhcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucylcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAvLyBJbml0aWFsaXplIG1haW4gd2ViIHNlcnZpY2VzXG4gICAgQWRkcmVzc1dlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgQXNzZXRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIEJhbmtpbmdXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIEJvbGV0b1dlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgQ2FyZFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgQ29uc3VtZXJXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIERvY3VtZW50V2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBEb21haW5XZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIE1lZGlhdG9yV2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBQYXltZW50V2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBQaG9uZVdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgUHJvZHVjdFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgVHJhbnNhY3Rpb25XZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIFdhbGxldFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgUGhvbmVDcmVkaXRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuXG4gICAgLy8gUHJlcGFyZSBzaW5nbGV0b24gZm9yIGVhc2llciBhY2Nlc3NcbiAgICBpZiAoIUJpdGNhcGl0YWwuX2luc3RhbmNlKSB7XG4gICAgICBCaXRjYXBpdGFsLl9pbnN0YW5jZSA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHNpbmdsZXRvbiBpbnN0YW5jZSwgaWYgYWxyZWFkeSBpbml0aWFsaXplZCBhbmQgYXZhaWxhYmxlLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBCaXRjYXBpdGFsIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgQml0Y2FwaXRhbCBTREsgd2l0aCBjcmVkZW50aWFscy5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGJpdGNhcGl0YWwgb3B0aW9ucyBhbmQgY3JlZGVudGlhbHMuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogQml0Y2FwaXRhbE9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IEJpdGNhcGl0YWwob3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgc2lnbmF0dXJlIGhlYWRlcnMgZm9yIHRoZSBzcGVjaWZpY2VkIHJlcXVlc3QuXG4gICAqXG4gICAqIEBwYXJhbSByZXF1ZXN0IFRoZSByZXF1ZXN0IG9iamVjdFxuICAgKi9cbiAgcHVibGljIHNpZ24ocmVxdWVzdDogUmVxdWVzdFNpZ25pbmdPcHRpb25zKSB7XG4gICAgcmV0dXJuIFJlcXVlc3RVdGlsLnNpZ24odGhpcy5vcHRpb25zLmNsaWVudFNlY3JldCwgcmVxdWVzdCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBBUEkgU3RhdHVzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHN0YXR1cygpOiBQcm9taXNlPE9BdXRoU3RhdHVzUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi5vYXV0aFdlYlNlcnZpY2Uuc3RhdHVzKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50bHkgYXV0aGVudGljYXRlZCB1c2VyIGluIHRoZSBTREssIGlmIGFueS5cbiAgICovXG4gIHB1YmxpYyBjdXJyZW50KCk6IFVzZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBCaXRjYXBpdGFsIHNlc3Npb24gaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgc2Vzc2lvbigpOiBTZXNzaW9uIHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBPQXV0aCAyLjAgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBvYXV0aCgpOiBPQXV0aFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLm9hdXRoV2ViU2VydmljZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBBZGRyZXNzZXMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBhZGRyZXNzZXMoKTogQWRkcmVzc1dlYlNlcnZpY2Uge1xuICAgIHJldHVybiBBZGRyZXNzV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIEFzc2V0cyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGFzc2V0cygpOiBBc3NldFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiBBc3NldFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBCYW5raW5ncyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGJhbmtpbmdzKCk6IEJhbmtpbmdXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gQmFua2luZ1dlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBCb2xldG8gc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBib2xldG9zKCk6IEJvbGV0b1dlYlNlcnZpY2Uge1xuICAgIHJldHVybiBCb2xldG9XZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQ29uc3VtZXJzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3VtZXJzKCk6IENvbnN1bWVyV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIENvbnN1bWVyV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIENhcmQgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBjYXJkcygpOiBDYXJkV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIENhcmRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKiogSW50ZXJmYWNlIGZvciB0aGUgRG9jdW1lbnRzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgZG9jdW1lbnRzKCk6IERvY3VtZW50V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIERvY3VtZW50V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIERvbWFpbnMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBkb21haW5zKCk6IERvbWFpbldlYlNlcnZpY2Uge1xuICAgIHJldHVybiBEb21haW5XZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgTWVkaWF0b3JzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgbWVkaWF0b3JzKCk6IE1lZGlhdG9yV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIE1lZGlhdG9yV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFBheW1lbnRzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgcGF5bWVudHMoKTogUGF5bWVudFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiBQYXltZW50V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFBob25lcyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHBob25lcygpOiBQaG9uZVdlYlNlcnZpY2Uge1xuICAgIHJldHVybiBQaG9uZVdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBQcm9kdWN0IHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgcHJvZHVjdHMoKTogUHJvZHVjdFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiBQcm9kdWN0V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFRyYW5zYWN0aW9ucyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHRyYW5zYWN0aW9ucygpOiBUcmFuc2FjdGlvbldlYlNlcnZpY2Uge1xuICAgIHJldHVybiBUcmFuc2FjdGlvbldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBVc2VycyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHVzZXJzKCk6IFVzZXJXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi51c2VyV2ViU2VydmljZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBXYWxsZXRzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgd2FsbGV0cygpOiBXYWxsZXRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gV2FsbGV0V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG59XG4iXX0=