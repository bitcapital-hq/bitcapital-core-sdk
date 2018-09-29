"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("./services");
const session_1 = require("./session");
/**
 * The main interface for the Bitcapital SDK, holds credentials, instance options and all internal modules.
 */
class Bitcapital {
    /**
     * Constructs a new Bitcapital instance, not safe to call directly, use the `init()` method.
     *
     * @param options The bitcapital options and credentials
     */
    constructor(options) {
        this.options = options;
        // Initialize session instance, OAuth and User web services will be initialized automatically
        this._session = options.session || session_1.Session.initialize({ oauth: options.oauth, http: options.http });
        // Initialize main web services
        services_1.AssetWebService.initialize(Object.assign({}, options.http));
        services_1.ConsumerWebService.initialize(Object.assign({}, options.http));
        services_1.DomainWebService.initialize(Object.assign({}, options.http));
        services_1.PaymentWebService.initialize(Object.assign({}, options.http));
        services_1.WalletWebService.initialize(Object.assign({}, options.http));
    }
    /**
     * Initializes the Bitcapital SDK with credentials.
     *
     * @param options The bitcapital options and credentials
     */
    static init(options) {
        return new Bitcapital(options);
    }
    /**
     * Gets the Bitcapital session instance.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Y2FwaXRhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9CaXRjYXBpdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBUW9CO0FBQ3BCLHVDQUFvQztBQVFwQzs7R0FFRztBQUNIO0lBR0U7Ozs7T0FJRztJQUNILFlBQWdDLE9BQTBCO1FBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQ3hELDZGQUE2RjtRQUM3RixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksaUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFcEcsK0JBQStCO1FBQy9CLDBCQUFlLENBQUMsVUFBVSxtQkFBTSxPQUFPLENBQUMsSUFBSSxFQUFHLENBQUM7UUFDaEQsNkJBQWtCLENBQUMsVUFBVSxtQkFBTSxPQUFPLENBQUMsSUFBSSxFQUFHLENBQUM7UUFDbkQsMkJBQWdCLENBQUMsVUFBVSxtQkFBTSxPQUFPLENBQUMsSUFBSSxFQUFHLENBQUM7UUFDakQsNEJBQWlCLENBQUMsVUFBVSxtQkFBTSxPQUFPLENBQUMsSUFBSSxFQUFHLENBQUM7UUFDbEQsMkJBQWdCLENBQUMsVUFBVSxtQkFBTSxPQUFPLENBQUMsSUFBSSxFQUFHLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQTBCO1FBQzNDLE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNO1FBQ1gsT0FBTywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7TUFFRTtJQUNLLFNBQVM7UUFDZCxPQUFPLDZCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLDJCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNJLFFBQVE7UUFDYixPQUFPLDRCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFDVixPQUFPLHlCQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNaLE9BQU8sMkJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQztDQUNGO0FBcEZELDZCQW9GQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBPcHRpb25zIH0gZnJvbSBcIi4vYmFzZVwiO1xuaW1wb3J0IHtcbiAgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucyxcbiAgQ29uc3VtZXJXZWJTZXJ2aWNlLFxuICBEb21haW5XZWJTZXJ2aWNlLFxuICBBc3NldFdlYlNlcnZpY2UsXG4gIFBheW1lbnRXZWJTZXJ2aWNlLFxuICBVc2VyV2ViU2VydmljZSxcbiAgV2FsbGV0V2ViU2VydmljZSxcbn0gZnJvbSBcIi4vc2VydmljZXNcIjtcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tIFwiLi9zZXNzaW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQml0Y2FwaXRhbE9wdGlvbnMge1xuICBodHRwOiBIdHRwT3B0aW9ucztcbiAgb2F1dGg6IE9BdXRoV2ViU2VydmljZU9wdGlvbnM7XG4gIHNlc3Npb24/OiBTZXNzaW9uO1xufVxuXG4vKipcbiAqIFRoZSBtYWluIGludGVyZmFjZSBmb3IgdGhlIEJpdGNhcGl0YWwgU0RLLCBob2xkcyBjcmVkZW50aWFscywgaW5zdGFuY2Ugb3B0aW9ucyBhbmQgYWxsIGludGVybmFsIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpdGNhcGl0YWwge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3Nlc3Npb246IFNlc3Npb247XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBuZXcgQml0Y2FwaXRhbCBpbnN0YW5jZSwgbm90IHNhZmUgdG8gY2FsbCBkaXJlY3RseSwgdXNlIHRoZSBgaW5pdCgpYCBtZXRob2QuXG4gICAqIFxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgYml0Y2FwaXRhbCBvcHRpb25zIGFuZCBjcmVkZW50aWFsc1xuICAgKi9cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcHRpb25zOiBCaXRjYXBpdGFsT3B0aW9ucykge1xuICAgIC8vIEluaXRpYWxpemUgc2Vzc2lvbiBpbnN0YW5jZSwgT0F1dGggYW5kIFVzZXIgd2ViIHNlcnZpY2VzIHdpbGwgYmUgaW5pdGlhbGl6ZWQgYXV0b21hdGljYWxseVxuICAgIHRoaXMuX3Nlc3Npb24gPSBvcHRpb25zLnNlc3Npb24gfHwgU2Vzc2lvbi5pbml0aWFsaXplKHsgb2F1dGg6IG9wdGlvbnMub2F1dGgsIGh0dHA6IG9wdGlvbnMuaHR0cCB9KTtcblxuICAgIC8vIEluaXRpYWxpemUgbWFpbiB3ZWIgc2VydmljZXNcbiAgICBBc3NldFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IC4uLm9wdGlvbnMuaHR0cCB9KTtcbiAgICBDb25zdW1lcldlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IC4uLm9wdGlvbnMuaHR0cCB9KTtcbiAgICBEb21haW5XZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zLmh0dHAgfSk7XG4gICAgUGF5bWVudFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IC4uLm9wdGlvbnMuaHR0cCB9KTtcbiAgICBXYWxsZXRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zLmh0dHAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIEJpdGNhcGl0YWwgU0RLIHdpdGggY3JlZGVudGlhbHMuXG4gICAqIFxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgYml0Y2FwaXRhbCBvcHRpb25zIGFuZCBjcmVkZW50aWFsc1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpbml0KG9wdGlvbnM6IEJpdGNhcGl0YWxPcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBCaXRjYXBpdGFsKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIEJpdGNhcGl0YWwgc2Vzc2lvbiBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBzZXNzaW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIE9BdXRoIDIuMCBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIG9hdXRoKCkge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLm9hdXRoV2ViU2VydmljZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBBc3NldHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBhc3NldHMoKSB7XG4gICAgcmV0dXJuIEFzc2V0V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICogSW50ZXJmYWNlIGZvciB0aGUgQ29uc3VtZXJzIHNlcnZpY2UuXG4gICovXG4gIHB1YmxpYyBjb25zdW1lcnMoKSB7XG4gICAgcmV0dXJuIENvbnN1bWVyV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIERvbWFpbnMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBkb21haW5zKCkge1xuICAgIHJldHVybiBEb21haW5XZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgUGF5bWVudHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBwYXltZW50cygpIHtcbiAgICByZXR1cm4gUGF5bWVudFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBVc2VycyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHVzZXJzKCkge1xuICAgIHJldHVybiBVc2VyV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFdhbGxldHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyB3YWxsZXRzKCkge1xuICAgIHJldHVybiBXYWxsZXRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cbn1cbiJdfQ==