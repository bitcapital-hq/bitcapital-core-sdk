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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Y2FwaXRhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9CaXRjYXBpdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSx5Q0FTb0I7QUFHcEIsdUNBQW9DO0FBU3BDOztHQUVHO0FBQ0g7SUFJRTs7OztPQUlHO0lBQ0gsWUFBeUMsT0FBMEI7UUFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFDakUsNkZBQTZGO1FBQzdGLElBQUksQ0FBQyxRQUFRO1lBQ1gsT0FBTyxDQUFDLE9BQU87Z0JBQ2YsaUJBQU8sQ0FBQyxVQUFVLENBQUM7b0JBQ2pCLEtBQUssb0JBQ0MsT0FBa0MsQ0FDdkM7b0JBQ0QsSUFBSSxvQkFDRSxPQUFzQyxDQUMzQztpQkFDRixDQUFDLENBQUM7UUFFTCwrQkFBK0I7UUFDL0IsMEJBQWUsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzNDLDZCQUFrQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFDOUMsMkJBQWdCLENBQUMsVUFBVSxtQkFBTSxPQUFPLEVBQUcsQ0FBQztRQUM1Qyw0QkFBaUIsQ0FBQyxVQUFVLG1CQUFNLE9BQU8sRUFBRyxDQUFDO1FBQzdDLDJCQUFnQixDQUFDLFVBQVUsbUJBQU0sT0FBTyxFQUFHLENBQUM7UUFFNUMsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ3pCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUEwQjtRQUNqRCxPQUFPLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNVLE1BQU07O1lBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEQsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUMvQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU07UUFDWCxPQUFPLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksU0FBUztRQUNkLE9BQU8sNkJBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLE9BQU8sMkJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLE9BQU8sNEJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNWLE9BQU8seUJBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTywyQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0NBQ0Y7QUF4SEQsNkJBd0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL21vZGVsc1wiO1xuaW1wb3J0IHtcbiAgQXNzZXRXZWJTZXJ2aWNlLFxuICBDb25zdW1lcldlYlNlcnZpY2UsXG4gIERvbWFpbldlYlNlcnZpY2UsXG4gIE9BdXRoV2ViU2VydmljZSxcbiAgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucyxcbiAgUGF5bWVudFdlYlNlcnZpY2UsXG4gIFVzZXJXZWJTZXJ2aWNlLFxuICBXYWxsZXRXZWJTZXJ2aWNlXG59IGZyb20gXCIuL3NlcnZpY2VzXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL3NlcnZpY2VzL2Jhc2UvQmFzZU1vZGVsV2ViU2VydmljZVwiO1xuaW1wb3J0IHsgT0F1dGhTdGF0dXNSZXNwb25zZSB9IGZyb20gXCIuL3NlcnZpY2VzL3Jlc3BvbnNlXCI7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSBcIi4vc2Vzc2lvblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJpdGNhcGl0YWxPcHRpb25zIHtcbiAgc2Vzc2lvbj86IFNlc3Npb247XG4gIGJhc2VVUkw6IHN0cmluZztcbiAgY2xpZW50SWQ6IHN0cmluZztcbiAgY2xpZW50U2VjcmV0OiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIG1haW4gaW50ZXJmYWNlIGZvciB0aGUgQml0Y2FwaXRhbCBTREssIGhvbGRzIGNyZWRlbnRpYWxzLCBpbnN0YW5jZSBvcHRpb25zIGFuZCBhbGwgaW50ZXJuYWwgbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQml0Y2FwaXRhbCB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc2Vzc2lvbjogU2Vzc2lvbjtcbiAgcHJvdGVjdGVkIHN0YXRpYyBfaW5zdGFuY2U6IEJpdGNhcGl0YWw7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBCaXRjYXBpdGFsIGluc3RhbmNlLCBub3Qgc2FmZSB0byBjYWxsIGRpcmVjdGx5LCB1c2UgdGhlIGBpbml0KClgIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGJpdGNhcGl0YWwgb3B0aW9ucyBhbmQgY3JlZGVudGlhbHNcbiAgICovXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogQml0Y2FwaXRhbE9wdGlvbnMpIHtcbiAgICAvLyBJbml0aWFsaXplIHNlc3Npb24gaW5zdGFuY2UsIE9BdXRoIGFuZCBVc2VyIHdlYiBzZXJ2aWNlcyB3aWxsIGJlIGluaXRpYWxpemVkIGF1dG9tYXRpY2FsbHlcbiAgICB0aGlzLl9zZXNzaW9uID1cbiAgICAgIG9wdGlvbnMuc2Vzc2lvbiB8fFxuICAgICAgU2Vzc2lvbi5pbml0aWFsaXplKHtcbiAgICAgICAgb2F1dGg6IHtcbiAgICAgICAgICAuLi4ob3B0aW9ucyBhcyBPQXV0aFdlYlNlcnZpY2VPcHRpb25zKVxuICAgICAgICB9LFxuICAgICAgICBodHRwOiB7XG4gICAgICAgICAgLi4uKG9wdGlvbnMgYXMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBtYWluIHdlYiBzZXJ2aWNlc1xuICAgIEFzc2V0V2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcbiAgICBDb25zdW1lcldlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IC4uLm9wdGlvbnMgfSk7XG4gICAgRG9tYWluV2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcbiAgICBQYXltZW50V2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucyB9KTtcbiAgICBXYWxsZXRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zIH0pO1xuXG4gICAgLy8gUHJlcGFyZSBzaW5nbGV0b24gZm9yIGVhc2llciBhY2Nlc3NcbiAgICBpZiAoIUJpdGNhcGl0YWwuX2luc3RhbmNlKSB7XG4gICAgICBCaXRjYXBpdGFsLl9pbnN0YW5jZSA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHNpbmdsZXRvbiBpbnN0YW5jZSwgaWYgYWxyZWFkeSBpbml0aWFsaXplZCBhbmQgYXZhaWxhYmxlLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBCaXRjYXBpdGFsIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgQml0Y2FwaXRhbCBTREsgd2l0aCBjcmVkZW50aWFscy5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGJpdGNhcGl0YWwgb3B0aW9ucyBhbmQgY3JlZGVudGlhbHMuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogQml0Y2FwaXRhbE9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IEJpdGNhcGl0YWwob3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBBUEkgU3RhdHVzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHN0YXR1cygpOiBQcm9taXNlPE9BdXRoU3RhdHVzUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi5vYXV0aFdlYlNlcnZpY2Uuc3RhdHVzKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50bHkgYXV0aGVudGljYXRlZCB1c2VyIGluIHRoZSBTREssIGlmIGFueS5cbiAgICovXG4gIHB1YmxpYyBjdXJyZW50KCk6IFVzZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBCaXRjYXBpdGFsIHNlc3Npb24gaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgc2Vzc2lvbigpOiBTZXNzaW9uIHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBPQXV0aCAyLjAgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBvYXV0aCgpOiBPQXV0aFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLm9hdXRoV2ViU2VydmljZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBBc3NldHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBhc3NldHMoKTogQXNzZXRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gQXNzZXRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQ29uc3VtZXJzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3VtZXJzKCk6IENvbnN1bWVyV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIENvbnN1bWVyV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIERvbWFpbnMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBkb21haW5zKCk6IERvbWFpbldlYlNlcnZpY2Uge1xuICAgIHJldHVybiBEb21haW5XZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgUGF5bWVudHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBwYXltZW50cygpOiBQYXltZW50V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIFBheW1lbnRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgVXNlcnMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyB1c2VycygpOiBVc2VyV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIFVzZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgV2FsbGV0cyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHdhbGxldHMoKTogV2FsbGV0V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIFdhbGxldFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxufVxuIl19