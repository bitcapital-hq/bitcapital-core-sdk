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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Y2FwaXRhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9CaXRjYXBpdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSx5Q0FTb0I7QUFHcEIsdUNBQW9DO0FBQ3BDLG1DQUE2RDtBQVM3RDs7R0FFRztBQUNIO0lBSUU7Ozs7T0FJRztJQUNILFlBQXlDLE9BQTBCO1FBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQ2pFLDZGQUE2RjtRQUM3RixJQUFJLENBQUMsUUFBUTtZQUNYLE9BQU8sQ0FBQyxPQUFPO2dCQUNmLGlCQUFPLENBQUMsVUFBVSxDQUFDO29CQUNqQixLQUFLLG9CQUNDLE9BQWtDLENBQ3ZDO29CQUNELElBQUksb0JBQ0UsT0FBc0MsQ0FDM0M7aUJBQ0YsQ0FBQyxDQUFDO1FBRUwsK0JBQStCO1FBQy9CLDBCQUFlLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUMzQyw2QkFBa0IsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzlDLDJCQUFnQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFDNUMsNEJBQWlCLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUM3QywyQkFBZ0IsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBRTVDLHNDQUFzQztRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTtZQUN6QixVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUM3QjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBMEI7UUFDakQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLElBQUksQ0FBQyxPQUE4QjtRQUN4QyxPQUFPLG1CQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7T0FFRztJQUNVLE1BQU07O1lBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEQsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUMvQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU07UUFDWCxPQUFPLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksU0FBUztRQUNkLE9BQU8sNkJBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLE9BQU8sMkJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLE9BQU8sNEJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNWLE9BQU8seUJBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTywyQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0NBQ0Y7QUFqSUQsNkJBaUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL21vZGVsc1wiO1xuaW1wb3J0IHtcbiAgQXNzZXRXZWJTZXJ2aWNlLFxuICBDb25zdW1lcldlYlNlcnZpY2UsXG4gIERvbWFpbldlYlNlcnZpY2UsXG4gIE9BdXRoV2ViU2VydmljZSxcbiAgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucyxcbiAgUGF5bWVudFdlYlNlcnZpY2UsXG4gIFVzZXJXZWJTZXJ2aWNlLFxuICBXYWxsZXRXZWJTZXJ2aWNlXG59IGZyb20gXCIuL3NlcnZpY2VzXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL3NlcnZpY2VzL2Jhc2UvQmFzZU1vZGVsV2ViU2VydmljZVwiO1xuaW1wb3J0IHsgT0F1dGhTdGF0dXNSZXNwb25zZSB9IGZyb20gXCIuL3NlcnZpY2VzL3Jlc3BvbnNlXCI7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSBcIi4vc2Vzc2lvblwiO1xuaW1wb3J0IHsgUmVxdWVzdFNpZ25pbmdPcHRpb25zLCBSZXF1ZXN0VXRpbCB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQml0Y2FwaXRhbE9wdGlvbnMge1xuICBzZXNzaW9uPzogU2Vzc2lvbjtcbiAgYmFzZVVSTDogc3RyaW5nO1xuICBjbGllbnRJZDogc3RyaW5nO1xuICBjbGllbnRTZWNyZXQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgbWFpbiBpbnRlcmZhY2UgZm9yIHRoZSBCaXRjYXBpdGFsIFNESywgaG9sZHMgY3JlZGVudGlhbHMsIGluc3RhbmNlIG9wdGlvbnMgYW5kIGFsbCBpbnRlcm5hbCBtb2R1bGVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaXRjYXBpdGFsIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zZXNzaW9uOiBTZXNzaW9uO1xuICBwcm90ZWN0ZWQgc3RhdGljIF9pbnN0YW5jZTogQml0Y2FwaXRhbDtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IEJpdGNhcGl0YWwgaW5zdGFuY2UsIG5vdCBzYWZlIHRvIGNhbGwgZGlyZWN0bHksIHVzZSB0aGUgYGluaXQoKWAgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgYml0Y2FwaXRhbCBvcHRpb25zIGFuZCBjcmVkZW50aWFsc1xuICAgKi9cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBCaXRjYXBpdGFsT3B0aW9ucykge1xuICAgIC8vIEluaXRpYWxpemUgc2Vzc2lvbiBpbnN0YW5jZSwgT0F1dGggYW5kIFVzZXIgd2ViIHNlcnZpY2VzIHdpbGwgYmUgaW5pdGlhbGl6ZWQgYXV0b21hdGljYWxseVxuICAgIHRoaXMuX3Nlc3Npb24gPVxuICAgICAgb3B0aW9ucy5zZXNzaW9uIHx8XG4gICAgICBTZXNzaW9uLmluaXRpYWxpemUoe1xuICAgICAgICBvYXV0aDoge1xuICAgICAgICAgIC4uLihvcHRpb25zIGFzIE9BdXRoV2ViU2VydmljZU9wdGlvbnMpXG4gICAgICAgIH0sXG4gICAgICAgIGh0dHA6IHtcbiAgICAgICAgICAuLi4ob3B0aW9ucyBhcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucylcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAvLyBJbml0aWFsaXplIG1haW4gd2ViIHNlcnZpY2VzXG4gICAgQXNzZXRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xuICAgIENvbnN1bWVyV2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcbiAgICBEb21haW5XZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xuICAgIFBheW1lbnRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xuICAgIFdhbGxldFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IC4uLm9wdGlvbnMgfSk7XG5cbiAgICAvLyBQcmVwYXJlIHNpbmdsZXRvbiBmb3IgZWFzaWVyIGFjY2Vzc1xuICAgIGlmICghQml0Y2FwaXRhbC5faW5zdGFuY2UpIHtcbiAgICAgIEJpdGNhcGl0YWwuX2luc3RhbmNlID0gdGhpcztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc2luZ2xldG9uIGluc3RhbmNlLCBpZiBhbHJlYWR5IGluaXRpYWxpemVkIGFuZCBhdmFpbGFibGUuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEJpdGNhcGl0YWwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBCaXRjYXBpdGFsIFNESyB3aXRoIGNyZWRlbnRpYWxzLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgYml0Y2FwaXRhbCBvcHRpb25zIGFuZCBjcmVkZW50aWFscy5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBCaXRjYXBpdGFsT3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgQml0Y2FwaXRhbChvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBzaWduYXR1cmUgaGVhZGVycyBmb3IgdGhlIHNwZWNpZmljZWQgcmVxdWVzdC5cbiAgICogXG4gICAqIEBwYXJhbSByZXF1ZXN0IFRoZSByZXF1ZXN0IG9iamVjdFxuICAgKi9cbiAgcHVibGljIHNpZ24ocmVxdWVzdDogUmVxdWVzdFNpZ25pbmdPcHRpb25zKSB7XG4gICAgcmV0dXJuIFJlcXVlc3RVdGlsLnNpZ24odGhpcy5vcHRpb25zLmNsaWVudFNlY3JldCwgcmVxdWVzdCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBBUEkgU3RhdHVzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHN0YXR1cygpOiBQcm9taXNlPE9BdXRoU3RhdHVzUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi5vYXV0aFdlYlNlcnZpY2Uuc3RhdHVzKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50bHkgYXV0aGVudGljYXRlZCB1c2VyIGluIHRoZSBTREssIGlmIGFueS5cbiAgICovXG4gIHB1YmxpYyBjdXJyZW50KCk6IFVzZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBCaXRjYXBpdGFsIHNlc3Npb24gaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgc2Vzc2lvbigpOiBTZXNzaW9uIHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBPQXV0aCAyLjAgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBvYXV0aCgpOiBPQXV0aFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLm9hdXRoV2ViU2VydmljZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBBc3NldHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBhc3NldHMoKTogQXNzZXRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gQXNzZXRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQ29uc3VtZXJzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3VtZXJzKCk6IENvbnN1bWVyV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIENvbnN1bWVyV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIERvbWFpbnMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBkb21haW5zKCk6IERvbWFpbldlYlNlcnZpY2Uge1xuICAgIHJldHVybiBEb21haW5XZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgUGF5bWVudHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBwYXltZW50cygpOiBQYXltZW50V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIFBheW1lbnRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgVXNlcnMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyB1c2VycygpOiBVc2VyV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIFVzZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgV2FsbGV0cyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHdhbGxldHMoKTogV2FsbGV0V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIFdhbGxldFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxufVxuIl19