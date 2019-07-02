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
        services_1.AddressWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.AssetWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.BankingWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.BoletoWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.CardWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.ConsumerWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.DocumentWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.DomainWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.MediatorWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.PaymentWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.PhoneWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.ProductWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.TransactionWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.WalletWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.PhoneCreditWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.IssueWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.AlertWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.PreviewWebService.initialize(Object.assign({ session: this._session }, options));
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
     * Interface for the Mediators service.
     */
    mediators() {
        return services_1.MediatorWebService.getInstance();
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
     * Interface for the Phone Credit service.
     */
    phoneCredit() {
        return services_1.PhoneCreditWebService.getInstance();
    }
    /**
     * Interface for the Product service.
     */
    products() {
        return services_1.ProductWebService.getInstance();
    }
    /**
     * Interface for the Transactions service.
     */
    transactions() {
        return services_1.TransactionWebService.getInstance();
    }
    /**
     * Interface for the Users service.
     */
    users() {
        return this._session.userWebService;
    }
    /**
     * Interface for the Wallets service.
     */
    wallets() {
        return services_1.WalletWebService.getInstance();
    }
    /**
     * Interface for the Issues service.
     */
    issues() {
        return services_1.IssueWebService.getInstance();
    }
    /**
     * Interface for the Alerts service.
     */
    alerts() {
        return services_1.AlertWebService.getInstance();
    }
    /**
     * Interface for the Preview service.
     */
    previews() {
        return services_1.PreviewWebService.getInstance();
    }
}
exports.default = Bitcapital;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Y2FwaXRhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9CaXRjYXBpdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5REFBNkU7QUFDN0UseUNBc0JvQjtBQUdwQix1Q0FBb0M7QUFTcEM7O0dBRUc7QUFDSCxNQUFxQixVQUFVO0lBSTdCOzs7O09BSUc7SUFDSCxZQUF5QyxPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUNqRSw2RkFBNkY7UUFDN0YsSUFBSSxDQUFDLFFBQVE7WUFDWCxPQUFPLENBQUMsT0FBTztnQkFDZixpQkFBTyxDQUFDLFVBQVUsQ0FBQztvQkFDakIsS0FBSyxvQkFDQyxPQUFrQyxDQUN2QztvQkFDRCxJQUFJLG9CQUNFLE9BQXNDLENBQzNDO2lCQUNGLENBQUMsQ0FBQztRQUVMLCtCQUErQjtRQUMvQiw0QkFBaUIsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sRUFBRyxDQUFDO1FBQ3JFLDBCQUFlLENBQUMsVUFBVSxpQkFBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSyxPQUFPLEVBQUcsQ0FBQztRQUNuRSw0QkFBaUIsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sRUFBRyxDQUFDO1FBQ3JFLDJCQUFnQixDQUFDLFVBQVUsaUJBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUssT0FBTyxFQUFHLENBQUM7UUFDcEUseUJBQWMsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sRUFBRyxDQUFDO1FBQ2xFLDZCQUFrQixDQUFDLFVBQVUsaUJBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUssT0FBTyxFQUFHLENBQUM7UUFDdEUsNkJBQWtCLENBQUMsVUFBVSxpQkFBRyxPQUFPLEVBQUUsSUFBSSxD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Q0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLE9BQU8sMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2IsT0FBTyw0QkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0NBQ0Y7QUF4T0QsNkJBd09DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlciwgUmVxdWVzdFV0aWwsIFJlcXVlc3RTaWduaW5nT3B0aW9ucyB9IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xuaW1wb3J0IHtcbiAgQWRkcmVzc1dlYlNlcnZpY2UsXG4gIEFzc2V0V2ViU2VydmljZSxcbiAgQmFua2luZ1dlYlNlcnZpY2UsXG4gIEJvbGV0b1dlYlNlcnZpY2UsXG4gIENhcmRXZWJTZXJ2aWNlLFxuICBDb25zdW1lcldlYlNlcnZpY2UsXG4gIERvY3VtZW50V2ViU2VydmljZSxcbiAgRG9tYWluV2ViU2VydmljZSxcbiAgTWVkaWF0b3JXZWJTZXJ2aWNlLFxuICBPQXV0aFdlYlNlcnZpY2UsXG4gIE9BdXRoV2ViU2VydmljZU9wdGlvbnMsXG4gIFBheW1lbnRXZWJTZXJ2aWNlLFxuICBQaG9uZVdlYlNlcnZpY2UsXG4gIFRyYW5zYWN0aW9uV2ViU2VydmljZSxcbiAgVXNlcldlYlNlcnZpY2UsXG4gIFdhbGxldFdlYlNlcnZpY2UsXG4gIFBob25lQ3JlZGl0V2ViU2VydmljZSxcbiAgUHJvZHVjdFdlYlNlcnZpY2UsXG4gIElzc3VlV2ViU2VydmljZSxcbiAgQWxlcnRXZWJTZXJ2aWNlLFxuICBQcmV2aWV3V2ViU2VydmljZVxufSBmcm9tIFwiLi9zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9zZXJ2aWNlcy9iYXNlL0Jhc2VNb2RlbFdlYlNlcnZpY2VcIjtcbmltcG9ydCB7IE9BdXRoU3RhdHVzUmVzcG9uc2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9yZXNwb25zZVwiO1xuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gXCIuL3Nlc3Npb25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBCaXRjYXBpdGFsT3B0aW9ucyB7XG4gIHNlc3Npb24/OiBTZXNzaW9uO1xuICBiYXNlVVJMOiBzdHJpbmc7XG4gIGNsaWVudElkOiBzdHJpbmc7XG4gIGNsaWVudFNlY3JldDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoZSBtYWluIGludGVyZmFjZSBmb3IgdGhlIEJpdGNhcGl0YWwgU0RLLCBob2xkcyBjcmVkZW50aWFscywgaW5zdGFuY2Ugb3B0aW9ucyBhbmQgYWxsIGludGVybmFsIG1vZHVsZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpdGNhcGl0YWwge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3Nlc3Npb246IFNlc3Npb247XG4gIHByb3RlY3RlZCBzdGF0aWMgX2luc3RhbmNlOiBCaXRjYXBpdGFsO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgQml0Y2FwaXRhbCBpbnN0YW5jZSwgbm90IHNhZmUgdG8gY2FsbCBkaXJlY3RseSwgdXNlIHRoZSBgaW5pdCgpYCBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBiaXRjYXBpdGFsIG9wdGlvbnMgYW5kIGNyZWRlbnRpYWxzXG4gICAqL1xuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IG9wdGlvbnM6IEJpdGNhcGl0YWxPcHRpb25zKSB7XG4gICAgLy8gSW5pdGlhbGl6ZSBzZXNzaW9uIGluc3RhbmNlLCBPQXV0aCBhbmQgVXNlciB3ZWIgc2VydmljZXMgd2lsbCBiZSBpbml0aWFsaXplZCBhdXRvbWF0aWNhbGx5XG4gICAgdGhpcy5fc2Vzc2lvbiA9XG4gICAgICBvcHRpb25zLnNlc3Npb24gfHxcbiAgICAgIFNlc3Npb24uaW5pdGlhbGl6ZSh7XG4gICAgICAgIG9hdXRoOiB7XG4gICAgICAgICAgLi4uKG9wdGlvbnMgYXMgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucylcbiAgICAgICAgfSxcbiAgICAgICAgaHR0cDoge1xuICAgICAgICAgIC4uLihvcHRpb25zIGFzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zKVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIC8vIEluaXRpYWxpemUgbWFpbiB3ZWIgc2VydmljZXNcbiAgICBBZGRyZXNzV2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBBc3NldFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgQmFua2luZ1dlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgQm9sZXRvV2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBDYXJkV2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBDb25zdW1lcldlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgRG9jdW1lbnRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIERvbWFpbldlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgTWVkaWF0b3JXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIFBheW1lbnRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIFBob25lV2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBQcm9kdWN0V2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBUcmFuc2FjdGlvbldlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgV2FsbGV0V2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBQaG9uZUNyZWRpdFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgSXNzdWVXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIEFsZXJ0V2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBQcmV2aWV3V2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcblxuICAgIC8vIFByZXBhcmUgc2luZ2xldG9uIGZvciBlYXNpZXIgYWNjZXNzXG4gICAgaWYgKCFCaXRjYXBpdGFsLl9pbnN0YW5jZSkge1xuICAgICAgQml0Y2FwaXRhbC5faW5zdGFuY2UgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzaW5nbGV0b24gaW5zdGFuY2UsIGlmIGFscmVhZHkgaW5pdGlhbGl6ZWQgYW5kIGF2YWlsYWJsZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogQml0Y2FwaXRhbCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIEJpdGNhcGl0YWwgU0RLIHdpdGggY3JlZGVudGlhbHMuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBiaXRjYXBpdGFsIG9wdGlvbnMgYW5kIGNyZWRlbnRpYWxzLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IEJpdGNhcGl0YWxPcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBCaXRjYXBpdGFsKG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIHNpZ25hdHVyZSBoZWFkZXJzIGZvciB0aGUgc3BlY2lmaWNlZCByZXF1ZXN0LlxuICAgKlxuICAgKiBAcGFyYW0gcmVxdWVzdCBUaGUgcmVxdWVzdCBvYmplY3RcbiAgICovXG4gIHB1YmxpYyBzaWduKHJlcXVlc3Q6IFJlcXVlc3RTaWduaW5nT3B0aW9ucykge1xuICAgIHJldHVybiBSZXF1ZXN0VXRpbC5zaWduKHRoaXMub3B0aW9ucy5jbGllbnRTZWNyZXQsIHJlcXVlc3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgQVBJIFN0YXR1cy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzdGF0dXMoKTogUHJvbWlzZTxPQXV0aFN0YXR1c1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24ub2F1dGhXZWJTZXJ2aWNlLnN0YXR1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudGx5IGF1dGhlbnRpY2F0ZWQgdXNlciBpbiB0aGUgU0RLLCBpZiBhbnkuXG4gICAqL1xuICBwdWJsaWMgY3VycmVudCgpOiBVc2VyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi5jdXJyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgQml0Y2FwaXRhbCBzZXNzaW9uIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIHNlc3Npb24oKTogU2Vzc2lvbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb247XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgT0F1dGggMi4wIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgb2F1dGgoKTogT0F1dGhXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5fc2Vzc2lvbi5vYXV0aFdlYlNlcnZpY2U7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQWRkcmVzc2VzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgYWRkcmVzc2VzKCk6IEFkZHJlc3NXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gQWRkcmVzc1dlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBBc3NldHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBhc3NldHMoKTogQXNzZXRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gQXNzZXRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQmFua2luZ3Mgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBiYW5raW5ncygpOiBCYW5raW5nV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIEJhbmtpbmdXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQm9sZXRvIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgYm9sZXRvcygpOiBCb2xldG9XZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gQm9sZXRvV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIENvbnN1bWVycyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN1bWVycygpOiBDb25zdW1lcldlYlNlcnZpY2Uge1xuICAgIHJldHVybiBDb25zdW1lcldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBDYXJkIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgY2FyZHMoKTogQ2FyZFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiBDYXJkV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqIEludGVyZmFjZSBmb3IgdGhlIERvY3VtZW50cyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGRvY3VtZW50cygpOiBEb2N1bWVudFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiBEb2N1bWVudFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBEb21haW5zIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgZG9tYWlucygpOiBEb21haW5XZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gRG9tYWluV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIE1lZGlhdG9ycyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIG1lZGlhdG9ycygpOiBNZWRpYXRvcldlYlNlcnZpY2Uge1xuICAgIHJldHVybiBNZWRpYXRvcldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBQYXltZW50cyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHBheW1lbnRzKCk6IFBheW1lbnRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gUGF5bWVudFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBQaG9uZXMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBwaG9uZXMoKTogUGhvbmVXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gUGhvbmVXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgUGhvbmUgQ3JlZGl0IHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgcGhvbmVDcmVkaXQoKTogUGhvbmVDcmVkaXRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gUGhvbmVDcmVkaXRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgUHJvZHVjdCBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHByb2R1Y3RzKCk6IFByb2R1Y3RXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gUHJvZHVjdFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBUcmFuc2FjdGlvbnMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyB0cmFuc2FjdGlvbnMoKTogVHJhbnNhY3Rpb25XZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gVHJhbnNhY3Rpb25XZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgVXNlcnMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyB1c2VycygpOiBVc2VyV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24udXNlcldlYlNlcnZpY2U7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgV2FsbGV0cyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHdhbGxldHMoKTogV2FsbGV0V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIFdhbGxldFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBJc3N1ZXMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBpc3N1ZXMoKTogSXNzdWVXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gSXNzdWVXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQWxlcnRzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgYWxlcnRzKCk6IEFsZXJ0V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIEFsZXJ0V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIFByZXZpZXcgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBwcmV2aWV3cygpOiBQcmV2aWV3V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIFByZXZpZXdXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cbn1cbiJdfQ==