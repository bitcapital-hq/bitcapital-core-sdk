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
        services_1.AddressWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.AssetWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.BankingWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.BoletoWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.CardWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.ConsumerWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.DocumentWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.DomainWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.PaymentWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.PhoneWebService.initialize(Object.assign({ session: this._session }, options));
        services_1.WalletWebService.initialize(Object.assign({ session: this._session }, options));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQml0Y2FwaXRhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9CaXRjYXBpdGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5REFBNkU7QUFDN0UseUNBZW9CO0FBR3BCLHVDQUFvQztBQUNwQyxvRUFBaUU7QUFTakU7O0dBRUc7QUFDSCxNQUFxQixVQUFVO0lBSTdCOzs7O09BSUc7SUFDSCxZQUF5QyxPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUNqRSw2RkFBNkY7UUFDN0YsSUFBSSxDQUFDLFFBQVE7WUFDWCxPQUFPLENBQUMsT0FBTztnQkFDZixpQkFBTyxDQUFDLFVBQVUsQ0FBQztvQkFDakIsS0FBSyxvQkFDQyxPQUFrQyxDQUN2QztvQkFDRCxJQUFJLG9CQUNFLE9BQXNDLENBQzNDO2lCQUNGLENBQUMsQ0FBQztRQUVILCtCQUErQjtRQUMvQiw0QkFBaUIsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sRUFBRyxDQUFDO1FBQ3ZFLDBCQUFlLENBQUMsVUFBVSxpQkFBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSyxPQUFPLEVBQUcsQ0FBQztRQUNuRSw0QkFBaUIsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sRUFBRyxDQUFDO1FBQ3JFLDJCQUFnQixDQUFDLFVBQVUsaUJBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUssT0FBTyxFQUFHLENBQUM7UUFDcEUseUJBQWMsQ0FBQyxVQUFVLGlCQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFLLE9BQU8sRUFBRyxDQUFDO1FBQ2xFLDZCQUFrQixDQUFDLFVBQVUsaUJBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUssT0FBTyxFQUFHLENBQUM7UUFDdEUsNkJBQWtCLENBQUMsVUFBVSxpQkFBRyxPQUFP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QUFLO1FBQ1YsT0FBTyx5QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLDJCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7Q0FDRjtBQXZMRCw2QkF1TEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyLCBSZXF1ZXN0VXRpbCwgUmVxdWVzdFNpZ25pbmdPcHRpb25zIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XG5pbXBvcnQge1xuICBBZGRyZXNzV2ViU2VydmljZSxcbiAgQXNzZXRXZWJTZXJ2aWNlLFxuICBDYXJkV2ViU2VydmljZSxcbiAgQ29uc3VtZXJXZWJTZXJ2aWNlLFxuICBEb2N1bWVudFdlYlNlcnZpY2UsXG4gIERvbWFpbldlYlNlcnZpY2UsXG4gIE9BdXRoV2ViU2VydmljZSxcbiAgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucyxcbiAgUGF5bWVudFdlYlNlcnZpY2UsXG4gIFBob25lV2ViU2VydmljZSxcbiAgVXNlcldlYlNlcnZpY2UsXG4gIFdhbGxldFdlYlNlcnZpY2UsXG4gIEJhbmtpbmdXZWJTZXJ2aWNlLFxuICBCb2xldG9XZWJTZXJ2aWNlXG59IGZyb20gXCIuL3NlcnZpY2VzXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL3NlcnZpY2VzL2Jhc2UvQmFzZU1vZGVsV2ViU2VydmljZVwiO1xuaW1wb3J0IHsgT0F1dGhTdGF0dXNSZXNwb25zZSB9IGZyb20gXCIuL3NlcnZpY2VzL3Jlc3BvbnNlXCI7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSBcIi4vc2Vzc2lvblwiO1xuaW1wb3J0IHsgUHJvZHVjdFdlYlNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9Qcm9kdWN0V2ViU2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJpdGNhcGl0YWxPcHRpb25zIHtcbiAgc2Vzc2lvbj86IFNlc3Npb247XG4gIGJhc2VVUkw6IHN0cmluZztcbiAgY2xpZW50SWQ6IHN0cmluZztcbiAgY2xpZW50U2VjcmV0OiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIG1haW4gaW50ZXJmYWNlIGZvciB0aGUgQml0Y2FwaXRhbCBTREssIGhvbGRzIGNyZWRlbnRpYWxzLCBpbnN0YW5jZSBvcHRpb25zIGFuZCBhbGwgaW50ZXJuYWwgbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQml0Y2FwaXRhbCB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc2Vzc2lvbjogU2Vzc2lvbjtcbiAgcHJvdGVjdGVkIHN0YXRpYyBfaW5zdGFuY2U6IEJpdGNhcGl0YWw7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIG5ldyBCaXRjYXBpdGFsIGluc3RhbmNlLCBub3Qgc2FmZSB0byBjYWxsIGRpcmVjdGx5LCB1c2UgdGhlIGBpbml0KClgIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGJpdGNhcGl0YWwgb3B0aW9ucyBhbmQgY3JlZGVudGlhbHNcbiAgICovXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogQml0Y2FwaXRhbE9wdGlvbnMpIHtcbiAgICAvLyBJbml0aWFsaXplIHNlc3Npb24gaW5zdGFuY2UsIE9BdXRoIGFuZCBVc2VyIHdlYiBzZXJ2aWNlcyB3aWxsIGJlIGluaXRpYWxpemVkIGF1dG9tYXRpY2FsbHlcbiAgICB0aGlzLl9zZXNzaW9uID1cbiAgICAgIG9wdGlvbnMuc2Vzc2lvbiB8fFxuICAgICAgU2Vzc2lvbi5pbml0aWFsaXplKHtcbiAgICAgICAgb2F1dGg6IHtcbiAgICAgICAgICAuLi4ob3B0aW9ucyBhcyBPQXV0aFdlYlNlcnZpY2VPcHRpb25zKVxuICAgICAgICB9LFxuICAgICAgICBodHRwOiB7XG4gICAgICAgICAgLi4uKG9wdGlvbnMgYXMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBJbml0aWFsaXplIG1haW4gd2ViIHNlcnZpY2VzXG4gICAgICBBZGRyZXNzV2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBBc3NldFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgQmFua2luZ1dlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgQm9sZXRvV2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBDYXJkV2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcy5fc2Vzc2lvbiwgLi4ub3B0aW9ucyB9KTtcbiAgICBDb25zdW1lcldlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgRG9jdW1lbnRXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIERvbWFpbldlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgUGF5bWVudFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG4gICAgUGhvbmVXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLl9zZXNzaW9uLCAuLi5vcHRpb25zIH0pO1xuICAgIFdhbGxldFdlYlNlcnZpY2UuaW5pdGlhbGl6ZSh7IHNlc3Npb246IHRoaXMuX3Nlc3Npb24sIC4uLm9wdGlvbnMgfSk7XG5cbiAgICAvLyBQcmVwYXJlIHNpbmdsZXRvbiBmb3IgZWFzaWVyIGFjY2Vzc1xuICAgIGlmICghQml0Y2FwaXRhbC5faW5zdGFuY2UpIHtcbiAgICAgIEJpdGNhcGl0YWwuX2luc3RhbmNlID0gdGhpcztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc2luZ2xldG9uIGluc3RhbmNlLCBpZiBhbHJlYWR5IGluaXRpYWxpemVkIGFuZCBhdmFpbGFibGUuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEJpdGNhcGl0YWwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBCaXRjYXBpdGFsIFNESyB3aXRoIGNyZWRlbnRpYWxzLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgYml0Y2FwaXRhbCBvcHRpb25zIGFuZCBjcmVkZW50aWFscy5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBCaXRjYXBpdGFsT3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgQml0Y2FwaXRhbChvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBzaWduYXR1cmUgaGVhZGVycyBmb3IgdGhlIHNwZWNpZmljZWQgcmVxdWVzdC5cbiAgICpcbiAgICogQHBhcmFtIHJlcXVlc3QgVGhlIHJlcXVlc3Qgb2JqZWN0XG4gICAqL1xuICBwdWJsaWMgc2lnbihyZXF1ZXN0OiBSZXF1ZXN0U2lnbmluZ09wdGlvbnMpIHtcbiAgICByZXR1cm4gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCByZXF1ZXN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIEFQSSBTdGF0dXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc3RhdHVzKCk6IFByb21pc2U8T0F1dGhTdGF0dXNSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uLm9hdXRoV2ViU2VydmljZS5zdGF0dXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnRseSBhdXRoZW50aWNhdGVkIHVzZXIgaW4gdGhlIFNESywgaWYgYW55LlxuICAgKi9cbiAgcHVibGljIGN1cnJlbnQoKTogVXNlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24uY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIEJpdGNhcGl0YWwgc2Vzc2lvbiBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBzZXNzaW9uKCk6IFNlc3Npb24ge1xuICAgIHJldHVybiB0aGlzLl9zZXNzaW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIE9BdXRoIDIuMCBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIG9hdXRoKCk6IE9BdXRoV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nlc3Npb24ub2F1dGhXZWJTZXJ2aWNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIEFkZHJlc3NlcyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGFkZHJlc3NlcygpOiBBZGRyZXNzV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIEFkZHJlc3NXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQXNzZXRzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgYXNzZXRzKCk6IEFzc2V0V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIEFzc2V0V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIEJhbmtpbmdzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgYmFua2luZ3MoKTogQmFua2luZ1dlYlNlcnZpY2Uge1xuICAgIHJldHVybiBCYW5raW5nV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyZmFjZSBmb3IgdGhlIEJvbGV0byBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGJvbGV0b3MoKTogQm9sZXRvV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIEJvbGV0b1dlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBDb25zdW1lcnMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdW1lcnMoKTogQ29uc3VtZXJXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gQ29uc3VtZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgQ2FyZCBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGNhcmRzKCk6IENhcmRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gQ2FyZFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKiBJbnRlcmZhY2UgZm9yIHRoZSBEb2N1bWVudHMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBkb2N1bWVudHMoKTogRG9jdW1lbnRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gRG9jdW1lbnRXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgRG9tYWlucyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIGRvbWFpbnMoKTogRG9tYWluV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIERvbWFpbldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBQYXltZW50cyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHBheW1lbnRzKCk6IFBheW1lbnRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gUGF5bWVudFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBQaG9uZXMgc2VydmljZS5cbiAgICovXG4gIHB1YmxpYyBwaG9uZXMoKTogUGhvbmVXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gUGhvbmVXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJmYWNlIGZvciB0aGUgUHJvZHVjdCBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHByb2R1Y3RzKCk6IFByb2R1Y3RXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gUHJvZHVjdFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBVc2VycyBzZXJ2aWNlLlxuICAgKi9cbiAgcHVibGljIHVzZXJzKCk6IFVzZXJXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gVXNlcldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgZm9yIHRoZSBXYWxsZXRzIHNlcnZpY2UuXG4gICAqL1xuICBwdWJsaWMgd2FsbGV0cygpOiBXYWxsZXRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gV2FsbGV0V2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICB9XG59XG4iXX0=