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
        this._session = options.session || session_1.Session.initialize({ oauth: options.oauth, http: options.http });
        // Initialize main web services
        services_1.AssetWebService.initialize(Object.assign({ session: this._session }, options.http));
        services_1.ConsumerWebService.initialize(Object.assign({ session: this._session }, options.http));
        services_1.DomainWebService.initialize(Object.assign({ session: this._session }, options.http));
        services_1.PaymentWebService.initialize(Object.assign({ session: this._session }, options.http));
        services_1.WalletWebService.initialize(Object.assign({ session: this._session }, options.http));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Y2FwaXRhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9CaXRjYXBpdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSx5Q0FTb0I7QUFDcEIsdUNBQW9DO0FBVXBDOztHQUVHO0FBQ0g7SUFHRTs7OztPQUlHO0lBQ0gsWUFBeUMsT0FBMEI7UUFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFDakUsNkZBQTZGO1FBQzdGLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVwRywrQkFBK0I7UUFDL0IsMEJBQWUsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUcsQ0FBQztRQUN4RSw2QkFBa0IsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUcsQ0FBQztRQUMzRSwyQkFBZ0IsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUcsQ0FBQztRQUN6RSw0QkFBaUIsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUcsQ0FBQztRQUMxRSwyQkFBZ0IsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUcsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBMEI7UUFDakQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDVSxNQUFNOztZQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hELENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNO1FBQ1gsT0FBTywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNJLFNBQVM7UUFDZCxPQUFPLDZCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLDJCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNJLFFBQVE7UUFDYixPQUFPLDRCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFDVixPQUFPLHlCQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLE9BQU8sMkJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQztDQUNGO0FBbEdELDZCQWtHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBPcHRpb25zIH0gZnJvbSBcIi4vYmFzZVwiO1xuaW1wb3J0IHtcbiAgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucyxcbiAgQ29uc3VtZXJXZWJTZXJ2aWNlLFxuICBEb21haW5XZWJTZXJ2aWNlLFxuICBBc3NldFdlYlNlcnZpY2UsXG4gIFBheW1lbnRXZWJTZXJ2aWNlLFxuICBVc2VyV2ViU2VydmljZSxcbiAgV2FsbGV0V2ViU2VydmljZSxcbiAgT0F1dGhXZWJTZXJ2aWNlXG59IGZyb20gXCIuL3NlcnZpY2VzXCI7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSBcIi4vc2Vzc2lvblwiO1xuaW1wb3J0IHsgT0F1dGhTdGF0dXNSZXNwb25zZSB9IGZyb20gXCIuL3NlcnZpY2VzL3Jlc3BvbnNlXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4vbW9kZWxzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQml0Y2FwaXRhbE9wdGlvbnMge1xuICBodHRwOiBIdHRwT3B0aW9ucztcbiAgb2F1dGg6IE9BdXRoV2ViU2VydmljZU9wdGlvbnM7XG4gIHNlc3Npb24/OiBTZXNzaW9uO1xufVxuXG4vKipcbiAqIFRoZSBtYWluIGludGVyZmFjZSBmb3IgdGhlIEJpdGNhcGl0YWwgU0RLLCBob2xkcyBjcmVkZW50aWFscywgaW5zdGFuY2Ugb3B0aW9ucyBhbmQgYWxsIGludGVybmFsIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpdGNhcGl0YWwge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3Nlc3Npb246IFNlc3Npb247XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBCaXRjYXBpdGFsIGluc3RhbmNlLCBub3Qgc2FmZSB0byBjYWxsIGRpcmVjdGx5LCB1c2UgdGhlIGBpbml0KClgIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGJpdGNhcGl0YWwgb3B0aW9ucyBhbmQgY3JlZGVudGlhbHNcbiAgICovXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogQml0Y2FwaXRhbE9wdGlvbnMpIHtcbiAgICAvLyBJbml0aWFsaXplIHNlc3Npb24gaW5zdGFuY2UsIE9BdXRoIGFuZCBVc2VyIHdlYiBzZXJ2aWNlcyB3aWxsIGJlIGluaXRpYWxpemVkIGF1dG9tYXRpY2FsbHlcbiAgICB0aGlzLl9zZXNzaW9uID0gb3B0aW9ucy5zZXNzaW9uIHx8IFNlc3Npb24uaW5pdGlhbGl6ZSh7IG9hdXRoOiBvcHRpb25zLm9hdXRoLCBodHRwOiBvcHRpb25zLmh0dHAgfSk7XG5cbiAgICAvLyBJbml0aWFsaXplIG1haW4gd2ViIHNlcnZpY2VzXG4gICAgQXNzZXRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zLmh0dHAgfSk7XG4gICAgQ29uc3VtZXJXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zLmh0dHAgfSk7XG4gICAgRG9tYWluV2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucy5odHRwIH0pO1xuICAgIFBheW1lbnRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zLmh0dHAgfSk7XG4gICAgV2FsbGV0V2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucy5odHRwIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIEJpdGNhcGl0YWwgU0RLIHdpdGggY3JlZGVudGlhbHMuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBiaXRjYXBpdGFsIG9wdGlvbnMgYW5kIGNyZWRlbnRpYWxzLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IEJpdGNhcGl0YWxPcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBCaXRjYXBpdGFsKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgQVBJIFN0YXR1cy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzdGF0dXMoKTogUHJvbWlzZTxPQXV0aFN0YXR1c1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24ub2F1dGhXZWJTZXJ2aWNlLnN0YXR1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudGx5IGF1dGhlbnRpY2F0ZWQgdXNlciBpbiB0aGUgU0RLLCBpZiBhbnkuXG4gICAqL1xuICBwdWJsaWMgY3VycmVudCgpOiBVc2VyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi5jdXJyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgQml0Y2FwaXRhbCBzZXNzaW9uIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIHNlc3Npb24oKTogU2Vzc2lvbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb247XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgT0F1dGggMi4wIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgb2F1dGgoKTogT0F1dGhXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi5vYXV0aFdlYlNlcnZpY2U7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQXNzZXRzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgYXNzZXRzKCk6IEFzc2V0V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIEFzc2V0V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIENvbnN1bWVycyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN1bWVycygpOiBDb25zdW1lcldlYlNlcnZpY2Uge1xuICAgIHJldHVybiBDb25zdW1lcldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBEb21haW5zIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgZG9tYWlucygpOiBEb21haW5XZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gRG9tYWluV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFBheW1lbnRzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgcGF5bWVudHMoKTogUGF5bWVudFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiBQYXltZW50V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFVzZXJzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgdXNlcnMoKTogVXNlcldlYlNlcnZpY2Uge1xuICAgIHJldHVybiBVc2VyV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFdhbGxldHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyB3YWxsZXRzKCk6IFdhbGxldFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiBXYWxsZXRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cbn1cbiJdfQ==