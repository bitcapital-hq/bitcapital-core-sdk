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
        services_1.BankingWebService.initialize(Object.assign({}, options));
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
     * Interface for the Bankings service.
     */
    bankings() {
        return services_1.BankingWebService.getInstance();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Y2FwaXRhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9CaXRjYXBpdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSx5Q0FVb0I7QUFHcEIsdUNBQW9DO0FBQ3BDLG1DQUE2RDtBQVM3RDs7R0FFRztBQUNIO0lBSUU7Ozs7T0FJRztJQUNILFlBQXlDLE9BQTBCO1FBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQ2pFLDZGQUE2RjtRQUM3RixJQUFJLENBQUMsUUFBUTtZQUNYLE9BQU8sQ0FBQyxPQUFPO2dCQUNmLGlCQUFPLENBQUMsVUFBVSxDQUFDO29CQUNqQixLQUFLLG9CQUNDLE9BQWtDLENBQ3ZDO29CQUNELElBQUksb0JBQ0UsT0FBc0MsQ0FDM0M7aUJBQ0YsQ0FBQyxDQUFDO1FBRUwsK0JBQStCO1FBQy9CLDBCQUFlLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUMzQyw0QkFBaUIsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzdDLDZCQUFrQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFDOUMsMkJBQWdCLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUM1Qyw0QkFBaUIsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzdDLDJCQUFnQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFFNUMsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ3pCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUEwQjtRQUNqRCxPQUFPLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksSUFBSSxDQUFDLE9BQThCO1FBQ3hDLE9BQU8sbUJBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOztPQUVHO0lBQ1UsTUFBTTs7WUFDakIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoRCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLE9BQU8sMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2IsT0FBTyw0QkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxTQUFTO1FBQ2QsT0FBTyw2QkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTywyQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2IsT0FBTyw0QkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1YsT0FBTyx5QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLDJCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7Q0FDRjtBQXpJRCw2QkF5SUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7XHJcbiAgQXNzZXRXZWJTZXJ2aWNlLFxyXG4gIENvbnN1bWVyV2ViU2VydmljZSxcclxuICBEb21haW5XZWJTZXJ2aWNlLFxyXG4gIE9BdXRoV2ViU2VydmljZSxcclxuICBPQXV0aFdlYlNlcnZpY2VPcHRpb25zLFxyXG4gIFBheW1lbnRXZWJTZXJ2aWNlLFxyXG4gIFVzZXJXZWJTZXJ2aWNlLFxyXG4gIFdhbGxldFdlYlNlcnZpY2UsXHJcbiAgQmFua2luZ1dlYlNlcnZpY2VcclxufSBmcm9tIFwiLi9zZXJ2aWNlc1wiO1xyXG5pbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL3NlcnZpY2VzL2Jhc2UvQmFzZU1vZGVsV2ViU2VydmljZVwiO1xyXG5pbXBvcnQgeyBPQXV0aFN0YXR1c1Jlc3BvbnNlIH0gZnJvbSBcIi4vc2VydmljZXMvcmVzcG9uc2VcIjtcclxuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gXCIuL3Nlc3Npb25cIjtcclxuaW1wb3J0IHsgUmVxdWVzdFNpZ25pbmdPcHRpb25zLCBSZXF1ZXN0VXRpbCB9IGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJpdGNhcGl0YWxPcHRpb25zIHtcclxuICBzZXNzaW9uPzogU2Vzc2lvbjtcclxuICBiYXNlVVJMOiBzdHJpbmc7XHJcbiAgY2xpZW50SWQ6IHN0cmluZztcclxuICBjbGllbnRTZWNyZXQ6IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBtYWluIGludGVyZmFjZSBmb3IgdGhlIEJpdGNhcGl0YWwgU0RLLCBob2xkcyBjcmVkZW50aWFscywgaW5zdGFuY2Ugb3B0aW9ucyBhbmQgYWxsIGludGVybmFsIG1vZHVsZXMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaXRjYXBpdGFsIHtcclxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3Nlc3Npb246IFNlc3Npb247XHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBfaW5zdGFuY2U6IEJpdGNhcGl0YWw7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBCaXRjYXBpdGFsIGluc3RhbmNlLCBub3Qgc2FmZSB0byBjYWxsIGRpcmVjdGx5LCB1c2UgdGhlIGBpbml0KClgIG1ldGhvZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBiaXRjYXBpdGFsIG9wdGlvbnMgYW5kIGNyZWRlbnRpYWxzXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBCaXRjYXBpdGFsT3B0aW9ucykge1xyXG4gICAgLy8gSW5pdGlhbGl6ZSBzZXNzaW9uIGluc3RhbmNlLCBPQXV0aCBhbmQgVXNlciB3ZWIgc2VydmljZXMgd2lsbCBiZSBpbml0aWFsaXplZCBhdXRvbWF0aWNhbGx5XHJcbiAgICB0aGlzLl9zZXNzaW9uID1cclxuICAgICAgb3B0aW9ucy5zZXNzaW9uIHx8XHJcbiAgICAgIFNlc3Npb24uaW5pdGlhbGl6ZSh7XHJcbiAgICAgICAgb2F1dGg6IHtcclxuICAgICAgICAgIC4uLihvcHRpb25zIGFzIE9BdXRoV2ViU2VydmljZU9wdGlvbnMpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBodHRwOiB7XHJcbiAgICAgICAgICAuLi4ob3B0aW9ucyBhcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucylcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgbWFpbiB3ZWIgc2VydmljZXNcclxuICAgIEFzc2V0V2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcclxuICAgIEJhbmtpbmdXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xyXG4gICAgQ29uc3VtZXJXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xyXG4gICAgRG9tYWluV2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcclxuICAgIFBheW1lbnRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xyXG4gICAgV2FsbGV0V2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcclxuXHJcbiAgICAvLyBQcmVwYXJlIHNpbmdsZXRvbiBmb3IgZWFzaWVyIGFjY2Vzc1xyXG4gICAgaWYgKCFCaXRjYXBpdGFsLl9pbnN0YW5jZSkge1xyXG4gICAgICBCaXRjYXBpdGFsLl9pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBzaW5nbGV0b24gaW5zdGFuY2UsIGlmIGFscmVhZHkgaW5pdGlhbGl6ZWQgYW5kIGF2YWlsYWJsZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEJpdGNhcGl0YWwgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgQml0Y2FwaXRhbCBTREsgd2l0aCBjcmVkZW50aWFscy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBiaXRjYXBpdGFsIG9wdGlvbnMgYW5kIGNyZWRlbnRpYWxzLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBCaXRjYXBpdGFsT3B0aW9ucykge1xyXG4gICAgcmV0dXJuIG5ldyBCaXRjYXBpdGFsKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJhdGUgc2lnbmF0dXJlIGhlYWRlcnMgZm9yIHRoZSBzcGVjaWZpY2VkIHJlcXVlc3QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcmVxdWVzdCBUaGUgcmVxdWVzdCBvYmplY3RcclxuICAgKi9cclxuICBwdWJsaWMgc2lnbihyZXF1ZXN0OiBSZXF1ZXN0U2lnbmluZ09wdGlvbnMpIHtcclxuICAgIHJldHVybiBSZXF1ZXN0VXRpbC5zaWduKHRoaXMub3B0aW9ucy5jbGllbnRTZWNyZXQsIHJlcXVlc3QpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBBUEkgU3RhdHVzLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBzdGF0dXMoKTogUHJvbWlzZTxPQXV0aFN0YXR1c1Jlc3BvbnNlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi5vYXV0aFdlYlNlcnZpY2Uuc3RhdHVzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnRseSBhdXRoZW50aWNhdGVkIHVzZXIgaW4gdGhlIFNESywgaWYgYW55LlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjdXJyZW50KCk6IFVzZXIgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24uY3VycmVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgQml0Y2FwaXRhbCBzZXNzaW9uIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXNzaW9uKCk6IFNlc3Npb24ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBPQXV0aCAyLjAgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgb2F1dGgoKTogT0F1dGhXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLm9hdXRoV2ViU2VydmljZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIEFzc2V0cyBzZXJ2aWNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3NldHMoKTogQXNzZXRXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBBc3NldFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIEJhbmtpbmdzIHNlcnZpY2UuXHJcbiAgICovXHJcbiAgcHVibGljIGJhbmtpbmdzKCk6IEJhbmtpbmdXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBCYW5raW5nV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQ29uc3VtZXJzIHNlcnZpY2UuXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN1bWVycygpOiBDb25zdW1lcldlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIENvbnN1bWVyV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgRG9tYWlucyBzZXJ2aWNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBkb21haW5zKCk6IERvbWFpbldlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIERvbWFpbldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFBheW1lbnRzIHNlcnZpY2UuXHJcbiAgICovXHJcbiAgcHVibGljIHBheW1lbnRzKCk6IFBheW1lbnRXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiBQYXltZW50V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgVXNlcnMgc2VydmljZS5cclxuICAgKi9cclxuICBwdWJsaWMgdXNlcnMoKTogVXNlcldlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIFVzZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBXYWxsZXRzIHNlcnZpY2UuXHJcbiAgICovXHJcbiAgcHVibGljIHdhbGxldHMoKTogV2FsbGV0V2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gV2FsbGV0V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=