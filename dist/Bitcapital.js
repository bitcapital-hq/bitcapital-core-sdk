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
const services_1 = require("./services");
const session_1 = require("./session");
const utils_1 = require("./utils");
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
        services_1.AssetWebService.initialize(Object.assign({}, options));
        services_1.BoletoWebService.initialize(Object.assign({}, options));
        services_1.ConsumerWebService.initialize(Object.assign({}, options));
        services_1.DomainWebService.initialize(Object.assign({}, options));
        services_1.PaymentWebService.initialize(Object.assign({}, options));
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
        return utils_1.RequestUtil.sign(this.options.clientSecret, request);
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
     * Interface for the Assets service.
     */
    assets() {
        return services_1.AssetWebService.getInstance();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Y2FwaXRhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9CaXRjYXBpdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSx5Q0FVb0I7QUFHcEIsdUNBQW9DO0FBQ3BDLG1DQUE2RDtBQVM3RDs7R0FFRztBQUNIO0lBSUU7Ozs7T0FJRztJQUNILFlBQXlDLE9BQTBCO1FBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQ2pFLDZGQUE2RjtRQUM3RixJQUFJLENBQUMsUUFBUTtZQUNYLE9BQU8sQ0FBQyxPQUFPO2dCQUNmLGlCQUFPLENBQUMsVUFBVSxDQUFDO29CQUNqQixLQUFLLG9CQUNDLE9BQWtDLENBQ3ZDO29CQUNELElBQUksb0JBQ0UsT0FBc0MsQ0FDM0M7aUJBQ0YsQ0FBQyxDQUFDO1FBRUwsK0JBQStCO1FBQy9CLDBCQUFlLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUMzQywyQkFBZ0IsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzVDLDZCQUFrQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFDOUMsMkJBQWdCLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUM1Qyw0QkFBaUIsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzdDLDJCQUFnQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFFNUMsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ3pCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUEwQjtRQUNqRCxPQUFPLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksSUFBSSxDQUFDLE9BQThCO1FBQ3hDLE9BQU8sbUJBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOztPQUVHO0lBQ1UsTUFBTTs7WUFDakIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoRCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLE9BQU8sMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTywyQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxTQUFTO1FBQ2QsT0FBTyw2QkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTywyQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2IsT0FBTyw0QkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1YsT0FBTyx5QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLDJCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7Q0FDRjtBQXpJRCw2QkF5SUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7XHJcbiAgQXNzZXRXZWJTZXJ2aWNlLFxyXG4gIENvbnN1bWVyV2ViU2VydmljZSxcclxuICBEb21haW5XZWJTZXJ2aWNlLFxyXG4gIE9BdXRoV2ViU2VydmljZSxcclxuICBPQXV0aFdlYlNlcnZpY2VPcHRpb25zLFxyXG4gIFBheW1lbnRXZWJTZXJ2aWNlLFxyXG4gIFVzZXJXZWJTZXJ2aWNlLFxyXG4gIFdhbGxldFdlYlNlcnZpY2UsXHJcbiAgQm9sZXRvV2ViU2VydmljZVxyXG59IGZyb20gXCIuL3NlcnZpY2VzXCI7XHJcbmltcG9ydCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vc2VydmljZXMvYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE9BdXRoU3RhdHVzUmVzcG9uc2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9yZXNwb25zZVwiO1xyXG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSBcIi4vc2Vzc2lvblwiO1xyXG5pbXBvcnQgeyBSZXF1ZXN0U2lnbmluZ09wdGlvbnMsIFJlcXVlc3RVdGlsIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQml0Y2FwaXRhbE9wdGlvbnMge1xyXG4gIHNlc3Npb24/OiBTZXNzaW9uO1xyXG4gIGJhc2VVUkw6IHN0cmluZztcclxuICBjbGllbnRJZDogc3RyaW5nO1xyXG4gIGNsaWVudFNlY3JldDogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIG1haW4gaW50ZXJmYWNlIGZvciB0aGUgQml0Y2FwaXRhbCBTREssIGhvbGRzIGNyZWRlbnRpYWxzLCBpbnN0YW5jZSBvcHRpb25zIGFuZCBhbGwgaW50ZXJuYWwgbW9kdWxlcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpdGNhcGl0YWwge1xyXG4gIHByb3RlY3RlZCByZWFkb25seSBfc2Vzc2lvbjogU2Vzc2lvbjtcclxuICBwcm90ZWN0ZWQgc3RhdGljIF9pbnN0YW5jZTogQml0Y2FwaXRhbDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IEJpdGNhcGl0YWwgaW5zdGFuY2UsIG5vdCBzYWZlIHRvIGNhbGwgZGlyZWN0bHksIHVzZSB0aGUgYGluaXQoKWAgbWV0aG9kLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGJpdGNhcGl0YWwgb3B0aW9ucyBhbmQgY3JlZGVudGlhbHNcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IG9wdGlvbnM6IEJpdGNhcGl0YWxPcHRpb25zKSB7XHJcbiAgICAvLyBJbml0aWFsaXplIHNlc3Npb24gaW5zdGFuY2UsIE9BdXRoIGFuZCBVc2VyIHdlYiBzZXJ2aWNlcyB3aWxsIGJlIGluaXRpYWxpemVkIGF1dG9tYXRpY2FsbHlcclxuICAgIHRoaXMuX3Nlc3Npb24gPVxyXG4gICAgICBvcHRpb25zLnNlc3Npb24gfHxcclxuICAgICAgU2Vzc2lvbi5pbml0aWFsaXplKHtcclxuICAgICAgICBvYXV0aDoge1xyXG4gICAgICAgICAgLi4uKG9wdGlvbnMgYXMgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucylcclxuICAgICAgICB9LFxyXG4gICAgICAgIGh0dHA6IHtcclxuICAgICAgICAgIC4uLihvcHRpb25zIGFzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zKVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBtYWluIHdlYiBzZXJ2aWNlc1xyXG4gICAgQXNzZXRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xyXG4gICAgQm9sZXRvV2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcclxuICAgIENvbnN1bWVyV2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcclxuICAgIERvbWFpbldlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IC4uLm9wdGlvbnMgfSk7XHJcbiAgICBQYXltZW50V2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcclxuICAgIFdhbGxldFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IC4uLm9wdGlvbnMgfSk7XHJcblxyXG4gICAgLy8gUHJlcGFyZSBzaW5nbGV0b24gZm9yIGVhc2llciBhY2Nlc3NcclxuICAgIGlmICghQml0Y2FwaXRhbC5faW5zdGFuY2UpIHtcclxuICAgICAgQml0Y2FwaXRhbC5faW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgc2luZ2xldG9uIGluc3RhbmNlLCBpZiBhbHJlYWR5IGluaXRpYWxpemVkIGFuZCBhdmFpbGFibGUuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBCaXRjYXBpdGFsIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIEJpdGNhcGl0YWwgU0RLIHdpdGggY3JlZGVudGlhbHMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgYml0Y2FwaXRhbCBvcHRpb25zIGFuZCBjcmVkZW50aWFscy5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogQml0Y2FwaXRhbE9wdGlvbnMpIHtcclxuICAgIHJldHVybiBuZXcgQml0Y2FwaXRhbChvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyYXRlIHNpZ25hdHVyZSBoZWFkZXJzIGZvciB0aGUgc3BlY2lmaWNlZCByZXF1ZXN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3Qgb2JqZWN0XHJcbiAgICovXHJcbiAgcHVibGljIHNpZ24ocmVxdWVzdDogUmVxdWVzdFNpZ25pbmdPcHRpb25zKSB7XHJcbiAgICByZXR1cm4gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCByZXF1ZXN0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgQVBJIFN0YXR1cy5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgc3RhdHVzKCk6IFByb21pc2U8T0F1dGhTdGF0dXNSZXNwb25zZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24ub2F1dGhXZWJTZXJ2aWNlLnN0YXR1cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50bHkgYXV0aGVudGljYXRlZCB1c2VyIGluIHRoZSBTREssIGlmIGFueS5cclxuICAgKi9cclxuICBwdWJsaWMgY3VycmVudCgpOiBVc2VyIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLmN1cnJlbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIEJpdGNhcGl0YWwgc2Vzc2lvbiBpbnN0YW5jZS5cclxuICAgKi9cclxuICBwdWJsaWMgc2Vzc2lvbigpOiBTZXNzaW9uIHtcclxuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgT0F1dGggMi4wIHNlcnZpY2UuXHJcbiAgICovXHJcbiAgcHVibGljIG9hdXRoKCk6IE9BdXRoV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi5vYXV0aFdlYlNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBBc3NldHMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgYXNzZXRzKCk6IEFzc2V0V2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gQXNzZXRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBCb2xldG8gc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgYm9sZXRvcygpOiBCb2xldG9XZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBCb2xldG9XZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBDb25zdW1lcnMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgY29uc3VtZXJzKCk6IENvbnN1bWVyV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gQ29uc3VtZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBEb21haW5zIHNlcnZpY2UuXHJcbiAgICovXHJcbiAgcHVibGljIGRvbWFpbnMoKTogRG9tYWluV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gRG9tYWluV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgUGF5bWVudHMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgcGF5bWVudHMoKTogUGF5bWVudFdlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIFBheW1lbnRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBVc2VycyBzZXJ2aWNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyB1c2VycygpOiBVc2VyV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gVXNlcldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFdhbGxldHMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgd2FsbGV0cygpOiBXYWxsZXRXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBXYWxsZXRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==