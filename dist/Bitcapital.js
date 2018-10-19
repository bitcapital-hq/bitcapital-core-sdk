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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Y2FwaXRhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9CaXRjYXBpdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSx5Q0FTb0I7QUFDcEIsdUNBQW9DO0FBVXBDOztHQUVHO0FBQ0g7SUFJRTs7OztPQUlHO0lBQ0gsWUFBeUMsT0FBMEI7UUFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFDakUsNkZBQTZGO1FBQzdGLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVwRywrQkFBK0I7UUFDL0IsMEJBQWUsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUcsQ0FBQztRQUN4RSw2QkFBa0IsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUcsQ0FBQztRQUMzRSwyQkFBZ0IsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUcsQ0FBQztRQUN6RSw0QkFBaUIsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUcsQ0FBQztRQUMxRSwyQkFBZ0IsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUcsQ0FBQztRQUV6RSxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDekIsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQTBCO1FBQ2pELE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOztPQUVHO0lBQ1UsTUFBTTs7WUFDakIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoRCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLE9BQU8sMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxTQUFTO1FBQ2QsT0FBTyw2QkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxPQUFPO1FBQ1osT0FBTywyQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2IsT0FBTyw0QkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1YsT0FBTyx5QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLDJCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7Q0FDRjtBQS9HRCw2QkErR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2VcIjtcbmltcG9ydCB7XG4gIE9BdXRoV2ViU2VydmljZU9wdGlvbnMsXG4gIENvbnN1bWVyV2ViU2VydmljZSxcbiAgRG9tYWluV2ViU2VydmljZSxcbiAgQXNzZXRXZWJTZXJ2aWNlLFxuICBQYXltZW50V2ViU2VydmljZSxcbiAgVXNlcldlYlNlcnZpY2UsXG4gIFdhbGxldFdlYlNlcnZpY2UsXG4gIE9BdXRoV2ViU2VydmljZVxufSBmcm9tIFwiLi9zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gXCIuL3Nlc3Npb25cIjtcbmltcG9ydCB7IE9BdXRoU3RhdHVzUmVzcG9uc2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9yZXNwb25zZVwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL21vZGVsc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJpdGNhcGl0YWxPcHRpb25zIHtcbiAgaHR0cDogSHR0cE9wdGlvbnM7XG4gIG9hdXRoOiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zO1xuICBzZXNzaW9uPzogU2Vzc2lvbjtcbn1cblxuLyoqXG4gKiBUaGUgbWFpbiBpbnRlcmZhY2UgZm9yIHRoZSBCaXRjYXBpdGFsIFNESywgaG9sZHMgY3JlZGVudGlhbHMsIGluc3RhbmNlIG9wdGlvbnMgYW5kIGFsbCBpbnRlcm5hbCBtb2R1bGVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaXRjYXBpdGFsIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zZXNzaW9uOiBTZXNzaW9uO1xuICBwcm90ZWN0ZWQgc3RhdGljIF9pbnN0YW5jZTogQml0Y2FwaXRhbDtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IEJpdGNhcGl0YWwgaW5zdGFuY2UsIG5vdCBzYWZlIHRvIGNhbGwgZGlyZWN0bHksIHVzZSB0aGUgYGluaXQoKWAgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgYml0Y2FwaXRhbCBvcHRpb25zIGFuZCBjcmVkZW50aWFsc1xuICAgKi9cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBCaXRjYXBpdGFsT3B0aW9ucykge1xuICAgIC8vIEluaXRpYWxpemUgc2Vzc2lvbiBpbnN0YW5jZSwgT0F1dGggYW5kIFVzZXIgd2ViIHNlcnZpY2VzIHdpbGwgYmUgaW5pdGlhbGl6ZWQgYXV0b21hdGljYWxseVxuICAgIHRoaXMuX3Nlc3Npb24gPSBvcHRpb25zLnNlc3Npb24gfHwgU2Vzc2lvbi5pbml0aWFsaXplKHsgb2F1dGg6IG9wdGlvbnMub2F1dGgsIGh0dHA6IG9wdGlvbnMuaHR0cCB9KTtcblxuICAgIC8vIEluaXRpYWxpemUgbWFpbiB3ZWIgc2VydmljZXNcbiAgICBBc3NldFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMuaHR0cCB9KTtcbiAgICBDb25zdW1lcldlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMuaHR0cCB9KTtcbiAgICBEb21haW5XZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zLmh0dHAgfSk7XG4gICAgUGF5bWVudFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMuaHR0cCB9KTtcbiAgICBXYWxsZXRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zLmh0dHAgfSk7XG5cbiAgICAvLyBQcmVwYXJlIHNpbmdsZXRvbiBmb3IgZWFzaWVyIGFjY2Vzc1xuICAgIGlmICghQml0Y2FwaXRhbC5faW5zdGFuY2UpIHtcbiAgICAgIEJpdGNhcGl0YWwuX2luc3RhbmNlID0gdGhpcztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc2luZ2xldG9uIGluc3RhbmNlLCBpZiBhbHJlYWR5IGluaXRpYWxpemVkIGFuZCBhdmFpbGFibGUuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEJpdGNhcGl0YWwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBCaXRjYXBpdGFsIFNESyB3aXRoIGNyZWRlbnRpYWxzLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgYml0Y2FwaXRhbCBvcHRpb25zIGFuZCBjcmVkZW50aWFscy5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBCaXRjYXBpdGFsT3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgQml0Y2FwaXRhbChvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIEFQSSBTdGF0dXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc3RhdHVzKCk6IFByb21pc2U8T0F1dGhTdGF0dXNSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLm9hdXRoV2ViU2VydmljZS5zdGF0dXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnRseSBhdXRoZW50aWNhdGVkIHVzZXIgaW4gdGhlIFNESywgaWYgYW55LlxuICAgKi9cbiAgcHVibGljIGN1cnJlbnQoKTogVXNlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24uY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIEJpdGNhcGl0YWwgc2Vzc2lvbiBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBzZXNzaW9uKCk6IFNlc3Npb24ge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIE9BdXRoIDIuMCBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIG9hdXRoKCk6IE9BdXRoV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24ub2F1dGhXZWJTZXJ2aWNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIEFzc2V0cyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGFzc2V0cygpOiBBc3NldFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiBBc3NldFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBDb25zdW1lcnMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdW1lcnMoKTogQ29uc3VtZXJXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gQ29uc3VtZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgRG9tYWlucyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGRvbWFpbnMoKTogRG9tYWluV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIERvbWFpbldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBQYXltZW50cyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHBheW1lbnRzKCk6IFBheW1lbnRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gUGF5bWVudFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBVc2VycyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHVzZXJzKCk6IFVzZXJXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gVXNlcldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBXYWxsZXRzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgd2FsbGV0cygpOiBXYWxsZXRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gV2FsbGV0V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG59XG4iXX0=