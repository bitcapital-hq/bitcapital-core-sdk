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
        services_1.BankingWebService.initialize(Object.assign({}, options));
        services_1.BoletoWebService.initialize(Object.assign({}, options));
        services_1.CardWebService.initialize(Object.assign({}, options));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Y2FwaXRhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9CaXRjYXBpdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5REFBNkU7QUFDN0UseUNBZW9CO0FBR3BCLHVDQUFvQztBQUNwQyxvRUFBaUU7QUFTakU7O0dBRUc7QUFDSCxNQUFxQixVQUFVO0lBSTdCOzs7O09BSUc7SUFDSCxZQUF5QyxPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUNqRSw2RkFBNkY7UUFDN0YsSUFBSSxDQUFDLFFBQVE7WUFDWCxPQUFPLENBQUMsT0FBTztnQkFDZixpQkFBTyxDQUFDLFVBQVUsQ0FBQztvQkFDakIsS0FBSyxvQkFDQyxPQUFrQyxDQUN2QztvQkFDRCxJQUFJLG9CQUNFLE9BQXNDLENBQzNDO2lCQUNGLENBQUMsQ0FBQztRQUVMLCtCQUErQjtRQUMvQiw0QkFBaUIsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzdDLDBCQUFlLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUMzQyw0QkFBaUIsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzdDLDJCQUFnQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFDNUMseUJBQWMsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzFDLDZCQUFrQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFDOUMsNkJBQWtCLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUM5QywyQkFBZ0IsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzVDLDRCQUFpQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFDN0MsMEJBQWUsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzNDLDJCQUFnQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFFNUMsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ3pCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUEwQjtRQUNqRCxPQUFPLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksSUFBSSxDQUFDLE9BQThCO1FBQ3hDLE9BQU8sK0JBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOztPQUVHO0lBQ1UsTUFBTTs7WUFDakIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoRCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksU0FBUztRQUNkLE9BQU8sNEJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLE9BQU8sMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2IsT0FBTyw0QkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTywyQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxTQUFTO1FBQ2QsT0FBTyw2QkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1YsT0FBTyx5QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDtPQUNHO0lBQ0ksU0FBUztRQUNkLE9BQU8sNkJBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLE9BQU8sMkJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLE9BQU8sNEJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLE9BQU8sMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2IsT0FBTyxxQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1YsT0FBTyx5QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLDJCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7Q0FDRjtBQXZMRCw2QkF1TEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyLCBSZXF1ZXN0VXRpbCwgUmVxdWVzdFNpZ25pbmdPcHRpb25zIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XHJcbmltcG9ydCB7XHJcbiAgQWRkcmVzc1dlYlNlcnZpY2UsXHJcbiAgQXNzZXRXZWJTZXJ2aWNlLFxyXG4gIENhcmRXZWJTZXJ2aWNlLFxyXG4gIENvbnN1bWVyV2ViU2VydmljZSxcclxuICBEb2N1bWVudFdlYlNlcnZpY2UsXHJcbiAgRG9tYWluV2ViU2VydmljZSxcclxuICBPQXV0aFdlYlNlcnZpY2UsXHJcbiAgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucyxcclxuICBQYXltZW50V2ViU2VydmljZSxcclxuICBQaG9uZVdlYlNlcnZpY2UsXHJcbiAgVXNlcldlYlNlcnZpY2UsXHJcbiAgV2FsbGV0V2ViU2VydmljZSxcclxuICBCYW5raW5nV2ViU2VydmljZSxcclxuICBCb2xldG9XZWJTZXJ2aWNlXHJcbn0gZnJvbSBcIi4vc2VydmljZXNcIjtcclxuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9zZXJ2aWNlcy9iYXNlL0Jhc2VNb2RlbFdlYlNlcnZpY2VcIjtcclxuaW1wb3J0IHsgT0F1dGhTdGF0dXNSZXNwb25zZSB9IGZyb20gXCIuL3NlcnZpY2VzL3Jlc3BvbnNlXCI7XHJcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tIFwiLi9zZXNzaW9uXCI7XHJcbmltcG9ydCB7IFByb2R1Y3RXZWJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvUHJvZHVjdFdlYlNlcnZpY2VcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQml0Y2FwaXRhbE9wdGlvbnMge1xyXG4gIHNlc3Npb24/OiBTZXNzaW9uO1xyXG4gIGJhc2VVUkw6IHN0cmluZztcclxuICBjbGllbnRJZDogc3RyaW5nO1xyXG4gIGNsaWVudFNlY3JldDogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIG1haW4gaW50ZXJmYWNlIGZvciB0aGUgQml0Y2FwaXRhbCBTREssIGhvbGRzIGNyZWRlbnRpYWxzLCBpbnN0YW5jZSBvcHRpb25zIGFuZCBhbGwgaW50ZXJuYWwgbW9kdWxlcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpdGNhcGl0YWwge1xyXG4gIHByb3RlY3RlZCByZWFkb25seSBfc2Vzc2lvbjogU2Vzc2lvbjtcclxuICBwcm90ZWN0ZWQgc3RhdGljIF9pbnN0YW5jZTogQml0Y2FwaXRhbDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IEJpdGNhcGl0YWwgaW5zdGFuY2UsIG5vdCBzYWZlIHRvIGNhbGwgZGlyZWN0bHksIHVzZSB0aGUgYGluaXQoKWAgbWV0aG9kLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGJpdGNhcGl0YWwgb3B0aW9ucyBhbmQgY3JlZGVudGlhbHNcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IG9wdGlvbnM6IEJpdGNhcGl0YWxPcHRpb25zKSB7XHJcbiAgICAvLyBJbml0aWFsaXplIHNlc3Npb24gaW5zdGFuY2UsIE9BdXRoIGFuZCBVc2VyIHdlYiBzZXJ2aWNlcyB3aWxsIGJlIGluaXRpYWxpemVkIGF1dG9tYXRpY2FsbHlcclxuICAgIHRoaXMuX3Nlc3Npb24gPVxyXG4gICAgICBvcHRpb25zLnNlc3Npb24gfHxcclxuICAgICAgU2Vzc2lvbi5pbml0aWFsaXplKHtcclxuICAgICAgICBvYXV0aDoge1xyXG4gICAgICAgICAgLi4uKG9wdGlvbnMgYXMgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucylcclxuICAgICAgICB9LFxyXG4gICAgICAgIGh0dHA6IHtcclxuICAgICAgICAgIC4uLihvcHRpb25zIGFzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zKVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBtYWluIHdlYiBzZXJ2aWNlc1xyXG4gICAgQWRkcmVzc1dlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IC4uLm9wdGlvbnMgfSk7XHJcbiAgICBBc3NldFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IC4uLm9wdGlvbnMgfSk7XHJcbiAgICBCYW5raW5nV2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcclxuICAgIEJvbGV0b1dlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IC4uLm9wdGlvbnMgfSk7XHJcbiAgICBDYXJkV2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcclxuICAgIENvbnN1bWVyV2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcclxuICAgIERvY3VtZW50V2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcclxuICAgIERvbWFpbldlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IC4uLm9wdGlvbnMgfSk7XHJcbiAgICBQYXltZW50V2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcclxuICAgIFBob25lV2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcclxuICAgIFdhbGxldFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IC4uLm9wdGlvbnMgfSk7XHJcblxyXG4gICAgLy8gUHJlcGFyZSBzaW5nbGV0b24gZm9yIGVhc2llciBhY2Nlc3NcclxuICAgIGlmICghQml0Y2FwaXRhbC5faW5zdGFuY2UpIHtcclxuICAgICAgQml0Y2FwaXRhbC5faW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgc2luZ2xldG9uIGluc3RhbmNlLCBpZiBhbHJlYWR5IGluaXRpYWxpemVkIGFuZCBhdmFpbGFibGUuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBCaXRjYXBpdGFsIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIEJpdGNhcGl0YWwgU0RLIHdpdGggY3JlZGVudGlhbHMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgYml0Y2FwaXRhbCBvcHRpb25zIGFuZCBjcmVkZW50aWFscy5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogQml0Y2FwaXRhbE9wdGlvbnMpIHtcclxuICAgIHJldHVybiBuZXcgQml0Y2FwaXRhbChvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyYXRlIHNpZ25hdHVyZSBoZWFkZXJzIGZvciB0aGUgc3BlY2lmaWNlZCByZXF1ZXN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3Qgb2JqZWN0XHJcbiAgICovXHJcbiAgcHVibGljIHNpZ24ocmVxdWVzdDogUmVxdWVzdFNpZ25pbmdPcHRpb25zKSB7XHJcbiAgICByZXR1cm4gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCByZXF1ZXN0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgQVBJIFN0YXR1cy5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgc3RhdHVzKCk6IFByb21pc2U8T0F1dGhTdGF0dXNSZXNwb25zZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24ub2F1dGhXZWJTZXJ2aWNlLnN0YXR1cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50bHkgYXV0aGVudGljYXRlZCB1c2VyIGluIHRoZSBTREssIGlmIGFueS5cclxuICAgKi9cclxuICBwdWJsaWMgY3VycmVudCgpOiBVc2VyIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLmN1cnJlbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIEJpdGNhcGl0YWwgc2Vzc2lvbiBpbnN0YW5jZS5cclxuICAgKi9cclxuICBwdWJsaWMgc2Vzc2lvbigpOiBTZXNzaW9uIHtcclxuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgT0F1dGggMi4wIHNlcnZpY2UuXHJcbiAgICovXHJcbiAgcHVibGljIG9hdXRoKCk6IE9BdXRoV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi5vYXV0aFdlYlNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBBZGRyZXNzZXMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkcmVzc2VzKCk6IEFkZHJlc3NXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBBZGRyZXNzV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQXNzZXRzIHNlcnZpY2UuXHJcbiAgICovXHJcbiAgcHVibGljIGFzc2V0cygpOiBBc3NldFdlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIEFzc2V0V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQmFua2luZ3Mgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgYmFua2luZ3MoKTogQmFua2luZ1dlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIEJhbmtpbmdXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBCb2xldG8gc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgYm9sZXRvcygpOiBCb2xldG9XZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBCb2xldG9XZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBDb25zdW1lcnMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgY29uc3VtZXJzKCk6IENvbnN1bWVyV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gQ29uc3VtZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBDYXJkIHNlcnZpY2UuXHJcbiAgICovXHJcbiAgcHVibGljIGNhcmRzKCk6IENhcmRXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBDYXJkV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEludGVyZmFjZSBmb3IgdGhlIERvY3VtZW50cyBzZXJ2aWNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBkb2N1bWVudHMoKTogRG9jdW1lbnRXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBEb2N1bWVudFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIERvbWFpbnMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgZG9tYWlucygpOiBEb21haW5XZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBEb21haW5XZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBQYXltZW50cyBzZXJ2aWNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBwYXltZW50cygpOiBQYXltZW50V2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gUGF5bWVudFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFBob25lcyBzZXJ2aWNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBwaG9uZXMoKTogUGhvbmVXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBQaG9uZVdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFByb2R1Y3Qgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgcHJvZHVjdHMoKTogUHJvZHVjdFdlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIFByb2R1Y3RXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBVc2VycyBzZXJ2aWNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyB1c2VycygpOiBVc2VyV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gVXNlcldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFdhbGxldHMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgd2FsbGV0cygpOiBXYWxsZXRXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBXYWxsZXRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==