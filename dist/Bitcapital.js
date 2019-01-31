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
        services_1.AddressWebService.initialize(Object.assign({}, options));
        services_1.AssetWebService.initialize(Object.assign({}, options));
        services_1.ConsumerWebService.initialize(Object.assign({}, options));
        services_1.DocumentWebService.initialize(Object.assign({}, options));
        services_1.DomainWebService.initialize(Object.assign({}, options));
        services_1.PaymentWebService.initialize(Object.assign({}, options));
        services_1.PhoneWebService.initialize(Object.assign({}, options));
        services_1.WalletWebService.initialize(Object.assign({}, options));
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
     * Interface for the Consumers service.
     */
    consumers() {
        return services_1.ConsumerWebService.getInstance();
    }
    /**
     * Interface for the Documents service.
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
     * Interface for the Users service.
     */
    users() {
        return services_1.UserWebService.getInstance();
    }
    /**
     * Interface for the Wallets service.
     */
    wallets() {
        return services_1.WalletWebService.getInstance();
    }
}
exports.default = Bitcapital;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Y2FwaXRhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9CaXRjYXBpdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5REFBNkU7QUFDN0UseUNBWW9CO0FBR3BCLHVDQUFvQztBQUNwQyxvRUFBaUU7QUFTakU7O0dBRUc7QUFDSCxNQUFxQixVQUFVO0lBSTdCOzs7O09BSUc7SUFDSCxZQUF5QyxPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUNqRSw2RkFBNkY7UUFDN0YsSUFBSSxDQUFDLFFBQVE7WUFDWCxPQUFPLENBQUMsT0FBTztnQkFDZixpQkFBTyxDQUFDLFVBQVUsQ0FBQztvQkFDakIsS0FBSyxvQkFDQyxPQUFrQyxDQUN2QztvQkFDRCxJQUFJLG9CQUNFLE9BQXNDLENBQzNDO2lCQUNGLENBQUMsQ0FBQztRQUVMLCtCQUErQjtRQUMvQiw0QkFBaUIsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzdDLDBCQUFlLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUMzQyw2QkFBa0IsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzlDLDZCQUFrQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFDOUMsMkJBQWdCLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUM1Qyw0QkFBaUIsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzdDLDBCQUFlLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUMzQywyQkFBZ0IsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBRTVDLHNDQUFzQztRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTtZQUN6QixVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUM3QjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBMEI7UUFDakQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLElBQUksQ0FBQyxPQUE4QjtRQUN4QyxPQUFPLCtCQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7T0FFRztJQUNVLE1BQU07O1lBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEQsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUMvQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNJLFNBQVM7UUFDZCxPQUFPLDRCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU07UUFDWCxPQUFPLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksU0FBUztRQUNkLE9BQU8sNkJBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksU0FBUztRQUNkLE9BQU8sNkJBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLE9BQU8sMkJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLE9BQU8sNEJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLE9BQU8sMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2IsT0FBTyxxQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1YsT0FBTyx5QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLDJCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7Q0FDRjtBQWhLRCw2QkFnS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyLCBSZXF1ZXN0VXRpbCwgUmVxdWVzdFNpZ25pbmdPcHRpb25zIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XHJcbmltcG9ydCB7XHJcbiAgQWRkcmVzc1dlYlNlcnZpY2UsXHJcbiAgQXNzZXRXZWJTZXJ2aWNlLFxyXG4gIENvbnN1bWVyV2ViU2VydmljZSxcclxuICBEb2N1bWVudFdlYlNlcnZpY2UsXHJcbiAgRG9tYWluV2ViU2VydmljZSxcclxuICBPQXV0aFdlYlNlcnZpY2UsXHJcbiAgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucyxcclxuICBQYXltZW50V2ViU2VydmljZSxcclxuICBQaG9uZVdlYlNlcnZpY2UsXHJcbiAgVXNlcldlYlNlcnZpY2UsXHJcbiAgV2FsbGV0V2ViU2VydmljZVxyXG59IGZyb20gXCIuL3NlcnZpY2VzXCI7XHJcbmltcG9ydCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vc2VydmljZXMvYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE9BdXRoU3RhdHVzUmVzcG9uc2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9yZXNwb25zZVwiO1xyXG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSBcIi4vc2Vzc2lvblwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0V2ViU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL1Byb2R1Y3RXZWJTZXJ2aWNlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJpdGNhcGl0YWxPcHRpb25zIHtcclxuICBzZXNzaW9uPzogU2Vzc2lvbjtcclxuICBiYXNlVVJMOiBzdHJpbmc7XHJcbiAgY2xpZW50SWQ6IHN0cmluZztcclxuICBjbGllbnRTZWNyZXQ6IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBtYWluIGludGVyZmFjZSBmb3IgdGhlIEJpdGNhcGl0YWwgU0RLLCBob2xkcyBjcmVkZW50aWFscywgaW5zdGFuY2Ugb3B0aW9ucyBhbmQgYWxsIGludGVybmFsIG1vZHVsZXMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaXRjYXBpdGFsIHtcclxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3Nlc3Npb246IFNlc3Npb247XHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBfaW5zdGFuY2U6IEJpdGNhcGl0YWw7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBCaXRjYXBpdGFsIGluc3RhbmNlLCBub3Qgc2FmZSB0byBjYWxsIGRpcmVjdGx5LCB1c2UgdGhlIGBpbml0KClgIG1ldGhvZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBiaXRjYXBpdGFsIG9wdGlvbnMgYW5kIGNyZWRlbnRpYWxzXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBCaXRjYXBpdGFsT3B0aW9ucykge1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBzZXNzaW9uIGluc3RhbmNlLCBPQXV0aCBhbmQgVXNlciB3ZWIgc2VydmljZXMgd2lsbCBiZSBpbml0aWFsaXplZCBhdXRvbWF0aWNhbGx5XHJcbiAgICB0aGlzLl9zZXNzaW9uID1cclxuICAgICAgb3B0aW9ucy5zZXNzaW9uIHx8XHJcbiAgICAgIFNlc3Npb24uaW5pdGlhbGl6ZSh7XHJcbiAgICAgICAgb2F1dGg6IHtcclxuICAgICAgICAgIC4uLihvcHRpb25zIGFzIE9BdXRoV2ViU2VydmljZU9wdGlvbnMpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBodHRwOiB7XHJcbiAgICAgICAgICAuLi4ob3B0aW9ucyBhcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucylcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgbWFpbiB3ZWIgc2VydmljZXNcclxuICAgIEFkZHJlc3NXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xyXG4gICAgQXNzZXRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xyXG4gICAgQ29uc3VtZXJXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xyXG4gICAgRG9jdW1lbnRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xyXG4gICAgRG9tYWluV2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcclxuICAgIFBheW1lbnRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xyXG4gICAgUGhvbmVXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xyXG4gICAgV2FsbGV0V2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcclxuXHJcbiAgICAvLyBQcmVwYXJlIHNpbmdsZXRvbiBmb3IgZWFzaWVyIGFjY2Vzc1xyXG4gICAgaWYgKCFCaXRjYXBpdGFsLl9pbnN0YW5jZSkge1xyXG4gICAgICBCaXRjYXBpdGFsLl9pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBzaW5nbGV0b24gaW5zdGFuY2UsIGlmIGFscmVhZHkgaW5pdGlhbGl6ZWQgYW5kIGF2YWlsYWJsZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEJpdGNhcGl0YWwgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgQml0Y2FwaXRhbCBTREsgd2l0aCBjcmVkZW50aWFscy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBiaXRjYXBpdGFsIG9wdGlvbnMgYW5kIGNyZWRlbnRpYWxzLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBCaXRjYXBpdGFsT3B0aW9ucykge1xyXG4gICAgcmV0dXJuIG5ldyBCaXRjYXBpdGFsKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJhdGUgc2lnbmF0dXJlIGhlYWRlcnMgZm9yIHRoZSBzcGVjaWZpY2VkIHJlcXVlc3QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcmVxdWVzdCBUaGUgcmVxdWVzdCBvYmplY3RcclxuICAgKi9cclxuICBwdWJsaWMgc2lnbihyZXF1ZXN0OiBSZXF1ZXN0U2lnbmluZ09wdGlvbnMpIHtcclxuICAgIHJldHVybiBSZXF1ZXN0VXRpbC5zaWduKHRoaXMub3B0aW9ucy5jbGllbnRTZWNyZXQsIHJlcXVlc3QpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBBUEkgU3RhdHVzLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBzdGF0dXMoKTogUHJvbWlzZTxPQXV0aFN0YXR1c1Jlc3BvbnNlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi5vYXV0aFdlYlNlcnZpY2Uuc3RhdHVzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnRseSBhdXRoZW50aWNhdGVkIHVzZXIgaW4gdGhlIFNESywgaWYgYW55LlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjdXJyZW50KCk6IFVzZXIgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24uY3VycmVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgQml0Y2FwaXRhbCBzZXNzaW9uIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXNzaW9uKCk6IFNlc3Npb24ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBPQXV0aCAyLjAgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgb2F1dGgoKTogT0F1dGhXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLm9hdXRoV2ViU2VydmljZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIEFkZHJlc3NlcyBzZXJ2aWNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGRyZXNzZXMoKTogQWRkcmVzc1dlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIEFkZHJlc3NXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBBc3NldHMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgYXNzZXRzKCk6IEFzc2V0V2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gQXNzZXRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBDb25zdW1lcnMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgY29uc3VtZXJzKCk6IENvbnN1bWVyV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gQ29uc3VtZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBEb2N1bWVudHMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgZG9jdW1lbnRzKCk6IERvY3VtZW50V2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gRG9jdW1lbnRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBEb21haW5zIHNlcnZpY2UuXHJcbiAgICovXHJcbiAgcHVibGljIGRvbWFpbnMoKTogRG9tYWluV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gRG9tYWluV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgUGF5bWVudHMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgcGF5bWVudHMoKTogUGF5bWVudFdlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIFBheW1lbnRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBQaG9uZXMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgcGhvbmVzKCk6IFBob25lV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gUGhvbmVXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBQcm9kdWN0IHNlcnZpY2UuXHJcbiAgICovXHJcbiAgcHVibGljIHByb2R1Y3RzKCk6IFByb2R1Y3RXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBQcm9kdWN0V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgVXNlcnMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgdXNlcnMoKTogVXNlcldlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIFVzZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBXYWxsZXRzIHNlcnZpY2UuXHJcbiAgICovXHJcbiAgcHVibGljIHdhbGxldHMoKTogV2FsbGV0V2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gV2FsbGV0V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=