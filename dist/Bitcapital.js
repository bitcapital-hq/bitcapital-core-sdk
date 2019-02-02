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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Y2FwaXRhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9CaXRjYXBpdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5REFBNkU7QUFDN0UseUNBZW9CO0FBR3BCLHVDQUFvQztBQVNwQzs7R0FFRztBQUNILE1BQXFCLFVBQVU7SUFJN0I7Ozs7T0FJRztJQUNILFlBQXlDLE9BQTBCO1FBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQ2pFLDZGQUE2RjtRQUM3RixJQUFJLENBQUMsUUFBUTtZQUNYLE9BQU8sQ0FBQyxPQUFPO2dCQUNmLGlCQUFPLENBQUMsVUFBVSxDQUFDO29CQUNqQixLQUFLLG9CQUNDLE9BQWtDLENBQ3ZDO29CQUNELElBQUksb0JBQ0UsT0FBc0MsQ0FDM0M7aUJBQ0YsQ0FBQyxDQUFDO1FBRUwsK0JBQStCO1FBQy9CLDRCQUFpQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFDN0MsMEJBQWUsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzNDLDRCQUFpQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFDN0MsMkJBQWdCLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUM1Qyx5QkFBYyxDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFDMUMsNkJBQWtCLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUM5Qyw2QkFBa0IsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzlDLDJCQUFnQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFDNUMsNEJBQWlCLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUM3QywwQkFBZSxDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFDM0MsMkJBQWdCLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUU1QyxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDekIsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQTBCO1FBQ2pELE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxJQUFJLENBQUMsT0FBOEI7UUFDeEMsT0FBTywrQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7O09BRUc7SUFDVSxNQUFNOztZQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hELENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxTQUFTO1FBQ2QsT0FBTyw0QkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNO1FBQ1gsT0FBTywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNJLFFBQVE7UUFDYixPQUFPLDRCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLDJCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNJLFNBQVM7UUFDZCxPQUFPLDZCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFDVixPQUFPLHlCQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVEO09BQ0c7SUFDSSxTQUFTO1FBQ2QsT0FBTyw2QkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTywyQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2IsT0FBTyw0QkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNO1FBQ1gsT0FBTywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFDVixPQUFPLHlCQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLE9BQU8sMkJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQztDQUNGO0FBaExELDZCQWdMQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXIsIFJlcXVlc3RVdGlsLCBSZXF1ZXN0U2lnbmluZ09wdGlvbnMgfSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcbmltcG9ydCB7XG4gIEFkZHJlc3NXZWJTZXJ2aWNlLFxuICBBc3NldFdlYlNlcnZpY2UsXG4gIENhcmRXZWJTZXJ2aWNlLFxuICBDb25zdW1lcldlYlNlcnZpY2UsXG4gIERvY3VtZW50V2ViU2VydmljZSxcbiAgRG9tYWluV2ViU2VydmljZSxcbiAgT0F1dGhXZWJTZXJ2aWNlLFxuICBPQXV0aFdlYlNlcnZpY2VPcHRpb25zLFxuICBQYXltZW50V2ViU2VydmljZSxcbiAgUGhvbmVXZWJTZXJ2aWNlLFxuICBVc2VyV2ViU2VydmljZSxcbiAgV2FsbGV0V2ViU2VydmljZSxcbiAgQmFua2luZ1dlYlNlcnZpY2UsXG4gIEJvbGV0b1dlYlNlcnZpY2UsXG59IGZyb20gXCIuL3NlcnZpY2VzXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL3NlcnZpY2VzL2Jhc2UvQmFzZU1vZGVsV2ViU2VydmljZVwiO1xuaW1wb3J0IHsgT0F1dGhTdGF0dXNSZXNwb25zZSB9IGZyb20gXCIuL3NlcnZpY2VzL3Jlc3BvbnNlXCI7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSBcIi4vc2Vzc2lvblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJpdGNhcGl0YWxPcHRpb25zIHtcbiAgc2Vzc2lvbj86IFNlc3Npb247XG4gIGJhc2VVUkw6IHN0cmluZztcbiAgY2xpZW50SWQ6IHN0cmluZztcbiAgY2xpZW50U2VjcmV0OiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIG1haW4gaW50ZXJmYWNlIGZvciB0aGUgQml0Y2FwaXRhbCBTREssIGhvbGRzIGNyZWRlbnRpYWxzLCBpbnN0YW5jZSBvcHRpb25zIGFuZCBhbGwgaW50ZXJuYWwgbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQml0Y2FwaXRhbCB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc2Vzc2lvbjogU2Vzc2lvbjtcbiAgcHJvdGVjdGVkIHN0YXRpYyBfaW5zdGFuY2U6IEJpdGNhcGl0YWw7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBCaXRjYXBpdGFsIGluc3RhbmNlLCBub3Qgc2FmZSB0byBjYWxsIGRpcmVjdGx5LCB1c2UgdGhlIGBpbml0KClgIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGJpdGNhcGl0YWwgb3B0aW9ucyBhbmQgY3JlZGVudGlhbHNcbiAgICovXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogQml0Y2FwaXRhbE9wdGlvbnMpIHtcbiAgICAvLyBJbml0aWFsaXplIHNlc3Npb24gaW5zdGFuY2UsIE9BdXRoIGFuZCBVc2VyIHdlYiBzZXJ2aWNlcyB3aWxsIGJlIGluaXRpYWxpemVkIGF1dG9tYXRpY2FsbHlcbiAgICB0aGlzLl9zZXNzaW9uID1cbiAgICAgIG9wdGlvbnMuc2Vzc2lvbiB8fFxuICAgICAgU2Vzc2lvbi5pbml0aWFsaXplKHtcbiAgICAgICAgb2F1dGg6IHtcbiAgICAgICAgICAuLi4ob3B0aW9ucyBhcyBPQXV0aFdlYlNlcnZpY2VPcHRpb25zKVxuICAgICAgICB9LFxuICAgICAgICBodHRwOiB7XG4gICAgICAgICAgLi4uKG9wdGlvbnMgYXMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBtYWluIHdlYiBzZXJ2aWNlc1xuICAgIEFkZHJlc3NXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xuICAgIEFzc2V0V2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcbiAgICBCYW5raW5nV2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcbiAgICBCb2xldG9XZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xuICAgIENhcmRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xuICAgIENvbnN1bWVyV2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcbiAgICBEb2N1bWVudFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IC4uLm9wdGlvbnMgfSk7XG4gICAgRG9tYWluV2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcbiAgICBQYXltZW50V2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcbiAgICBQaG9uZVdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IC4uLm9wdGlvbnMgfSk7XG4gICAgV2FsbGV0V2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcblxuICAgIC8vIFByZXBhcmUgc2luZ2xldG9uIGZvciBlYXNpZXIgYWNjZXNzXG4gICAgaWYgKCFCaXRjYXBpdGFsLl9pbnN0YW5jZSkge1xuICAgICAgQml0Y2FwaXRhbC5faW5zdGFuY2UgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzaW5nbGV0b24gaW5zdGFuY2UsIGlmIGFscmVhZHkgaW5pdGlhbGl6ZWQgYW5kIGF2YWlsYWJsZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogQml0Y2FwaXRhbCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIEJpdGNhcGl0YWwgU0RLIHdpdGggY3JlZGVudGlhbHMuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBiaXRjYXBpdGFsIG9wdGlvbnMgYW5kIGNyZWRlbnRpYWxzLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IEJpdGNhcGl0YWxPcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBCaXRjYXBpdGFsKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIHNpZ25hdHVyZSBoZWFkZXJzIGZvciB0aGUgc3BlY2lmaWNlZCByZXF1ZXN0LlxuICAgKlxuICAgKiBAcGFyYW0gcmVxdWVzdCBUaGUgcmVxdWVzdCBvYmplY3RcbiAgICovXG4gIHB1YmxpYyBzaWduKHJlcXVlc3Q6IFJlcXVlc3RTaWduaW5nT3B0aW9ucykge1xuICAgIHJldHVybiBSZXF1ZXN0VXRpbC5zaWduKHRoaXMub3B0aW9ucy5jbGllbnRTZWNyZXQsIHJlcXVlc3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgQVBJIFN0YXR1cy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzdGF0dXMoKTogUHJvbWlzZTxPQXV0aFN0YXR1c1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24ub2F1dGhXZWJTZXJ2aWNlLnN0YXR1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudGx5IGF1dGhlbnRpY2F0ZWQgdXNlciBpbiB0aGUgU0RLLCBpZiBhbnkuXG4gICAqL1xuICBwdWJsaWMgY3VycmVudCgpOiBVc2VyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi5jdXJyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgQml0Y2FwaXRhbCBzZXNzaW9uIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIHNlc3Npb24oKTogU2Vzc2lvbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb247XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgT0F1dGggMi4wIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgb2F1dGgoKTogT0F1dGhXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi5vYXV0aFdlYlNlcnZpY2U7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQWRkcmVzc2VzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgYWRkcmVzc2VzKCk6IEFkZHJlc3NXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gQWRkcmVzc1dlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBBc3NldHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBhc3NldHMoKTogQXNzZXRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gQXNzZXRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQmFua2luZ3Mgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBiYW5raW5ncygpOiBCYW5raW5nV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIEJhbmtpbmdXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBCb2xldG8gc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBib2xldG9zKCk6IEJvbGV0b1dlYlNlcnZpY2Uge1xuICAgIHJldHVybiBCb2xldG9XZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQ29uc3VtZXJzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3VtZXJzKCk6IENvbnN1bWVyV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIENvbnN1bWVyV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIENhcmQgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBjYXJkcygpOiBDYXJkV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIENhcmRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKiogSW50ZXJmYWNlIGZvciB0aGUgRG9jdW1lbnRzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgZG9jdW1lbnRzKCk6IERvY3VtZW50V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIERvY3VtZW50V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIERvbWFpbnMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBkb21haW5zKCk6IERvbWFpbldlYlNlcnZpY2Uge1xuICAgIHJldHVybiBEb21haW5XZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgUGF5bWVudHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBwYXltZW50cygpOiBQYXltZW50V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIFBheW1lbnRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgUGhvbmVzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgcGhvbmVzKCk6IFBob25lV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIFBob25lV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFVzZXJzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgdXNlcnMoKTogVXNlcldlYlNlcnZpY2Uge1xuICAgIHJldHVybiBVc2VyV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFdhbGxldHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyB3YWxsZXRzKCk6IFdhbGxldFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiBXYWxsZXRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cbn1cbiJdfQ==