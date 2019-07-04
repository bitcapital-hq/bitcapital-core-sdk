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
const services_1 = require("../services");
const utils_1 = require("../utils");
const interceptors_1 = require("./interceptors");
/**
 * An abstraction layer to securely store and manage platform credentials.
 *
 * The Session is a singleton, so you may access the authentication state
 * at any time, in any context, getting its current instance. It is also
 * an observable, so it can be watched for changes:
 *
 ```typescript
import { Observer } from 'bitcapital-core-sdk';

// Gets the current Session instance
const session = bitcapital.session();

// Shows the current user instance, if any
console.log(session.current);

// Prepare a new session observer (typescript notation)
const observer: Observer = {
  update(event: string, data: User) {
    if(event === Session.EVENT_SESSION_CHANGED) {
      console.log('User instance has changed in Session', { user: data });
    }
  }
};

// Start listening to Session changes, such as credentials
// expiration or a refreshed access token.
session.subscribe(observer);

// ...

// Eventually, you can also stop listening to its changes
session.unsubscribe(observer);
 ```
 */
class Session {
    constructor(options) {
        this.options = options;
        this.isFetching = false;
        this.isLoading = false;
        this._interceptors = [];
        this.observable = new bitcapital_common_1.Observable();
        this.storage = options.storage || new utils_1.StorageUtil("session");
        // Prepare Session interceptors
        this._interceptors = [
            new interceptors_1.SessionCredentialsInterceptor(this),
            new interceptors_1.SessionUnauthorizedInterceptor(() => {
                try {
                    const refreshToken = this.current.credentials && this.current.credentials.refreshToken;
                    if (options.sessionUnauthorizedHandler) {
                        // If there's a custom handler, run it
                        return options.sessionUnauthorizedHandler(this.current);
                    }
                    if (refreshToken) {
                        // If there's a refresh token, try to refresh it
                        return this.refreshToken({ refreshToken });
                    }
                    // No refresh token, just destroy the session
                    console.warn("Session is invalid and no refresh token avaiable, destroying session");
                    return this.destroy();
                }
                catch (error) {
                    // Refresh token auth failed, destroy the session
                    console.error("Session is invalid and handler failed, destroying session");
                    this.destroy();
                    throw error;
                }
            })
        ];
        // Prepare inner web services
        this.userWebService = options.http
            ? services_1.UserWebService.initialize(Object.assign({ session: this }, options.http))
            : services_1.UserWebService.getInstance();
        this.oauthWebService = options.oauth
            ? services_1.OAuthWebService.initialize(Object.assign({}, options.oauth))
            : services_1.OAuthWebService.getInstance();
        // Fetch session in startup by default
        if (options.autoFetch !== false) {
            this._fetchPromise = this.fetch();
        }
    }
    /**
     * Get the Session interceptors for authorized calls and auto Session destruction.
     */
    interceptors() {
        return this._interceptors;
    }
    /**
     * Get the Session singleton instance.
     */
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new Session(options);
        return this.instance;
    }
    /**
     * Subscribe for updates.
     *
     * @param {Observer} observable The instace to be notified.
     */
    subscribe(observable) {
        this.observable.subscribe(observable);
    }
    /**
     * Unsubscribe from updates.
     *
     * @param {Observer} observable The instance to be removed from listeners.
     */
    unsubscribe(observable) {
        this.observable.unsubscribe(observable);
    }
    /**
     * Returns a promise to await fetching completion.
     */
    onFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._fetchPromise) {
                return Promise.resolve(this.current);
            }
            return this._fetchPromise;
        });
    }
    /**
     * Register a new User in session, notifying all observers.
     *
     * @param user The User instance.
     * @param {{notify: boolean}} options The operation options.
     */
    register(user, options = { notify: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.current = user;
            // Save in local storage
            yield this.storage.put("session", this.current);
            // At last, notify observers of this change
            if (!options || (options && options.notify)) {
                yield this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
            }
            return this.current;
        });
    }
    /**
     * Fetch the currently stored Session from local storage.
     */
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isFetching = true;
            try {
                this.current = yield this.storage.get("session");
                yield this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
            }
            catch (exception) {
                console.warn("Could not fetch from local storage, clearing session", exception);
                yield this.destroy();
            }
            this.isFetching = false;
            return this.current;
        });
    }
    /**
     * Reload the current User using the remote server.
     */
    reload() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.current) {
                this.isLoading = true;
                try {
                    const oauth = this.current.credentials;
                    const user = yield this.userWebService.me(oauth);
                    return this.register(new bitcapital_common_1.User(Object.assign({}, user, { credentials: oauth })));
                }
                catch (exception) {
                    console.warn("Could not fetch from local storage, clearing session", exception);
                    yield this.destroy();
                }
                this.isLoading = false;
            }
            return this.current;
        });
    }
    /**
     * Destroy the Session and clears the storage.
     */
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.current = undefined;
            // Destroys in local storage
            yield this.storage.clear();
            // At last, notify observers of this change
            yield this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
            if (this.current) {
                // Revokes the token in the OAuth Server
                try {
                    yield this.oauthWebService.revoke(this.current.credentials.accessToken);
                }
                catch (exception) {
                    console.warn("SESSION: Could not destroy current session", exception);
                }
            }
            return this.current;
        });
    }
    /**
     * Perform a "password" authentication using the OAuth 2.0 server and registers it in current Session.
     *
     * @param data The User credentials.
     */
    password(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isLoading = true;
            try {
                const oauth = yield this.oauthWebService.password({
                    username: data.username,
                    password: data.password,
                    scope: data.scopes ? data.scopes.join(",") : data.scope
                });
                if (!oauth.accessToken) {
                    this.isLoading = false;
                    throw oauth;
                }
                try {
                    const user = yield this.userWebService.me(oauth);
                    this.isLoading = false;
                    return this.register(new bitcapital_common_1.User(Object.assign({}, user, { credentials: oauth })));
                }
                catch (error) {
                    error.credentials = oauth;
                    this.isLoading = false;
                    throw error;
                }
            }
            catch (error) {
                this.isLoading = false;
                throw error;
            }
        });
    }
    /**
     * Performs a "refresh_token" authentication using the OAuth 2.0 server and registers it in current session.
     * This method is automatically called on requests that return 401
     *
     * @param {RefreshGrantOptions} data
     */
    refreshToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isLoading = true;
            try {
                const oauth = yield this.oauthWebService.refreshToken({
                    refreshToken: data.refreshToken
                });
                if (!oauth.accessToken) {
                    this.isLoading = false;
                    throw oauth;
                }
                try {
                    const user = yield this.userWebService.me(oauth);
                    this.isLoading = false;
                    return this.register(new bitcapital_common_1.User(Object.assign({}, user, { credentials: oauth })));
                }
                catch (error) {
                    error.credentials = oauth;
                    this.isLoading = false;
                    throw error;
                }
            }
            catch (error) {
                this.isLoading = false;
                throw error;
            }
        });
    }
    /**
     * Perform a "client_credentials" authentication using the OAuth 2.0 server and registers it in current Session.
     */
    clientCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isLoading = true;
            try {
                // The client ID and client secret will be passed by the OAuthWebService
                const oauth = yield this.oauthWebService.clientCredentials();
                try {
                    if (oauth.accessToken && !oauth.virtual) {
                        const user = yield this.userWebService.me(oauth);
                        this.isLoading = false;
                        return this.register(user);
                    }
                    if (oauth.accessToken) {
                        this.isLoading = false;
                        return this.register(new bitcapital_common_1.User({ id: oauth.userId, credentials: oauth }));
                    }
                }
                catch (error) {
                    error.credentials = oauth;
                    this.isLoading = false;
                    throw error;
                }
                throw oauth;
            }
            catch (error) {
                this.isLoading = false;
                throw error;
            }
        });
    }
}
Session.EVENT_SESSION_CHANGED = "SESSION_CHANGED";
exports.default = Session;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXNzaW9uL1Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQUE0RjtBQUM1RiwwQ0FBc0Y7QUFFdEYsb0NBQXVDO0FBQ3ZDLGlEQUErRjtBQXFCL0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxNQUFxQixPQUFPO0lBZTFCLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBWjFDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUtuQixrQkFBYSxHQUFzQixFQUFFLENBQUM7UUFPNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDhCQUFVLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTdELCtCQUErQjtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLElBQUksNENBQTZCLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLElBQUksNkNBQThCLENBQUMsR0FBRyxFQUFFO2dCQUN0QyxJQUFJO29CQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztvQkFFdkYsSUFBSSxPQUFPLENBQUMsMEJBQTBCLEVBQUU7d0JBQ3RDLHNDQUFzQzt3QkFDdEMsT0FBTyxPQUFPLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUN6RDtvQkFDRCxJQUFJLFlBQVksRUFBRTt3QkFDaEIsZ0RBQWdEO3dCQUNoRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFD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SyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUMxRTtpQkFDRjtnQkFBQyxPQUFPLEtBQUssRUFBRTtvQkFDZCxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztvQkFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLE1BQU0sS0FBSyxDQUFDO2lCQUNiO2dCQUVELE1BQU0sS0FBSyxDQUFDO2FBQ2I7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsTUFBTSxLQUFLLENBQUM7YUFDYjtRQUNILENBQUM7S0FBQTs7QUFoUmEsNkJBQXFCLEdBQUcsaUJBQWlCLENBQUM7QUFYMUQsMEJBNFJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yLCBPYnNlcnZhYmxlLCBPYnNlcnZlciwgVXNlciwgVXNlclNjaGVtYSB9IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xuaW1wb3J0IHsgT0F1dGhXZWJTZXJ2aWNlLCBPQXV0aFdlYlNlcnZpY2VPcHRpb25zLCBVc2VyV2ViU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi4vc2VydmljZXMvYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XG5pbXBvcnQgeyBTdG9yYWdlVXRpbCB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHsgU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IsIFNlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvciB9IGZyb20gXCIuL2ludGVyY2VwdG9yc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlc3Npb25PcHRpb25zIHtcbiAgaHR0cD86IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zO1xuICBvYXV0aD86IE9BdXRoV2ViU2VydmljZU9wdGlvbnM7XG4gIHN0b3JhZ2U/OiBTdG9yYWdlVXRpbDtcbiAgYXV0b0ZldGNoPzogYm9vbGVhbjtcbiAgc2Vzc2lvblVuYXV0aG9yaXplZEhhbmRsZXI/OiAoY3VycmVudDogVXNlcikgPT4gUHJvbWlzZTx2b2lkPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXNzd29yZEdyYW50T3B0aW9ucyB7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG4gIHNjb3Blcz86IHN0cmluZ1tdO1xuICBzY29wZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWZyZXNoR3JhbnRPcHRpb25zIHtcbiAgcmVmcmVzaFRva2VuOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3Rpb24gbGF5ZXIgdG8gc2VjdXJlbHkgc3RvcmUgYW5kIG1hbmFnZSBwbGF0Zm9ybSBjcmVkZW50aWFscy5cbiAqXG4gKiBUaGUgU2Vzc2lvbiBpcyBhIHNpbmdsZXRvbiwgc28geW91IG1heSBhY2Nlc3MgdGhlIGF1dGhlbnRpY2F0aW9uIHN0YXRlXG4gKiBhdCBhbnkgdGltZSwgaW4gYW55IGNvbnRleHQsIGdldHRpbmcgaXRzIGN1cnJlbnQgaW5zdGFuY2UuIEl0IGlzIGFsc29cbiAqIGFuIG9ic2VydmFibGUsIHNvIGl0IGNhbiBiZSB3YXRjaGVkIGZvciBjaGFuZ2VzOlxuICpcbiBgYGB0eXBlc2NyaXB0XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ2JpdGNhcGl0YWwtY29yZS1zZGsnO1xuXG4vLyBHZXRzIHRoZSBjdXJyZW50IFNlc3Npb24gaW5zdGFuY2VcbmNvbnN0IHNlc3Npb24gPSBiaXRjYXBpdGFsLnNlc3Npb24oKTtcblxuLy8gU2hvd3MgdGhlIGN1cnJlbnQgdXNlciBpbnN0YW5jZSwgaWYgYW55XG5jb25zb2xlLmxvZyhzZXNzaW9uLmN1cnJlbnQpO1xuXG4vLyBQcmVwYXJlIGEgbmV3IHNlc3Npb24gb2JzZXJ2ZXIgKHR5cGVzY3JpcHQgbm90YXRpb24pXG5jb25zdCBvYnNlcnZlcjogT2JzZXJ2ZXIgPSB7XG4gIHVwZGF0ZShldmVudDogc3RyaW5nLCBkYXRhOiBVc2VyKSB7XG4gICAgaWYoZXZlbnQgPT09IFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VEKSB7XG4gICAgICBjb25zb2xlLmxvZygnVXNlciBpbnN0YW5jZSBoYXMgY2hhbmdlZCBpbiBTZXNzaW9uJywgeyB1c2VyOiBkYXRhIH0pO1xuICAgIH1cbiAgfVxufTtcblxuLy8gU3RhcnQgbGlzdGVuaW5nIHRvIFNlc3Npb24gY2hhbmdlcywgc3VjaCBhcyBjcmVkZW50aWFsc1xuLy8gZXhwaXJhdGlvbiBvciBhIHJlZnJlc2hlZCBhY2Nlc3MgdG9rZW4uXG5zZXNzaW9uLnN1YnNjcmliZShvYnNlcnZlcik7XG5cbi8vIC4uLlxuXG4vLyBFdmVudHVhbGx5LCB5b3UgY2FuIGFsc28gc3RvcCBsaXN0ZW5pbmcgdG8gaXRzIGNoYW5nZXNcbnNlc3Npb24udW5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xuIGBgYFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXNzaW9uIHtcbiAgY3VycmVudD86IFVzZXI7XG4gIHN0b3JhZ2U6IFN0b3JhZ2VVdGlsO1xuICBpc0ZldGNoaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIGlzTG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlO1xuICB1c2VyV2ViU2VydmljZTogVXNlcldlYlNlcnZpY2U7XG4gIG9hdXRoV2ViU2VydmljZTogT0F1dGhXZWJTZXJ2aWNlO1xuICBwcml2YXRlIF9mZXRjaFByb21pc2U/OiBQcm9taXNlPFVzZXI+O1xuICBwcml2YXRlIF9pbnRlcmNlcHRvcnM6IEh0dHBJbnRlcmNlcHRvcltdID0gW107XG5cbiAgcHVibGljIHN0YXRpYyBFVkVOVF9TRVNTSU9OX0NIQU5HRUQgPSBcIlNFU1NJT05fQ0hBTkdFRFwiO1xuXG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IFNlc3Npb247XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IFNlc3Npb25PcHRpb25zKSB7XG4gICAgdGhpcy5vYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKTtcbiAgICB0aGlzLnN0b3JhZ2UgPSBvcHRpb25zLnN0b3JhZ2UgfHwgbmV3IFN0b3JhZ2VVdGlsKFwic2Vzc2lvblwiKTtcblxuICAgIC8vIFByZXBhcmUgU2Vzc2lvbiBpbnRlcmNlcHRvcnNcbiAgICB0aGlzLl9pbnRlcmNlcHRvcnMgPSBbXG4gICAgICBuZXcgU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IodGhpcyksXG4gICAgICBuZXcgU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yKCgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSB0aGlzLmN1cnJlbnQuY3JlZGVudGlhbHMgJiYgdGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzLnJlZnJlc2hUb2tlbjtcblxuICAgICAgICAgIGlmIChvcHRpb25zLnNlc3Npb25VbmF1dGhvcml6ZWRIYW5kbGVyKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGEgY3VzdG9tIGhhbmRsZXIsIHJ1biBpdFxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuc2Vzc2lvblVuYXV0aG9yaXplZEhhbmRsZXIodGhpcy5jdXJyZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlZnJlc2hUb2tlbikge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBhIHJlZnJlc2ggdG9rZW4sIHRyeSB0byByZWZyZXNoIGl0XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZyZXNoVG9rZW4oeyByZWZyZXNoVG9rZW4gfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIE5vIHJlZnJlc2ggdG9rZW4sIGp1c3QgZGVzdHJveSB0aGUgc2Vzc2lvblxuICAgICAgICAgIGNvbnNvbGUud2FybihcIlNlc3Npb24gaXMgaW52YWxpZCBhbmQgbm8gcmVmcmVzaCB0b2tlbiBhdmFpYWJsZSwgZGVzdHJveWluZyBzZXNzaW9uXCIpO1xuICAgICAgICAgIHJldHVybiB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAvLyBSZWZyZXNoIHRva2VuIGF1dGggZmFpbGVkLCBkZXN0cm95IHRoZSBzZXNzaW9uXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlNlc3Npb24gaXMgaW52YWxpZCBhbmQgaGFuZGxlciBmYWlsZWQsIGRlc3Ryb3lpbmcgc2Vzc2lvblwiKTtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICBdO1xuXG4gICAgLy8gUHJlcGFyZSBpbm5lciB3ZWIgc2VydmljZXNcbiAgICB0aGlzLnVzZXJXZWJTZXJ2aWNlID0gb3B0aW9ucy5odHRwXG4gICAgICA/IFVzZXJXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLCAuLi5vcHRpb25zLmh0dHAgfSlcbiAgICAgIDogVXNlcldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgICB0aGlzLm9hdXRoV2ViU2VydmljZSA9IG9wdGlvbnMub2F1dGhcbiAgICAgID8gT0F1dGhXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zLm9hdXRoIH0pXG4gICAgICA6IE9BdXRoV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8gRmV0Y2ggc2Vzc2lvbiBpbiBzdGFydHVwIGJ5IGRlZmF1bHRcbiAgICBpZiAoKG9wdGlvbnMuYXV0b0ZldGNoIGFzIGFueSkgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLl9mZXRjaFByb21pc2UgPSB0aGlzLmZldGNoKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgU2Vzc2lvbiBpbnRlcmNlcHRvcnMgZm9yIGF1dGhvcml6ZWQgY2FsbHMgYW5kIGF1dG8gU2Vzc2lvbiBkZXN0cnVjdGlvbi5cbiAgICovXG4gIGludGVyY2VwdG9ycygpOiBIdHRwSW50ZXJjZXB0b3JbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVyY2VwdG9ycztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIFNlc3Npb24gc2luZ2xldG9uIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBTZXNzaW9uIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBTZXNzaW9uT3B0aW9ucyk6IFNlc3Npb24ge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgU2Vzc2lvbihvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgZm9yIHVwZGF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JzZXJ2ZXJ9IG9ic2VydmFibGUgVGhlIGluc3RhY2UgdG8gYmUgbm90aWZpZWQuXG4gICAqL1xuICBwdWJsaWMgc3Vic2NyaWJlKG9ic2VydmFibGU6IE9ic2VydmVyKSB7XG4gICAgdGhpcy5vYnNlcnZhYmxlLnN1YnNjcmliZShvYnNlcnZhYmxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHVwZGF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JzZXJ2ZXJ9IG9ic2VydmFibGUgVGhlIGluc3RhbmNlIHRvIGJlIHJlbW92ZWQgZnJvbSBsaXN0ZW5lcnMuXG4gICAqL1xuICBwdWJsaWMgdW5zdWJzY3JpYmUob2JzZXJ2YWJsZTogT2JzZXJ2ZXIpIHtcbiAgICB0aGlzLm9ic2VydmFibGUudW5zdWJzY3JpYmUob2JzZXJ2YWJsZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHByb21pc2UgdG8gYXdhaXQgZmV0Y2hpbmcgY29tcGxldGlvbi5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBvbkZldGNoKCkge1xuICAgIGlmICghdGhpcy5fZmV0Y2hQcm9taXNlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuY3VycmVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9mZXRjaFByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBuZXcgVXNlciBpbiBzZXNzaW9uLCBub3RpZnlpbmcgYWxsIG9ic2VydmVycy5cbiAgICpcbiAgICogQHBhcmFtIHVzZXIgVGhlIFVzZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7e25vdGlmeTogYm9vbGVhbn19IG9wdGlvbnMgVGhlIG9wZXJhdGlvbiBvcHRpb25zLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJlZ2lzdGVyKHVzZXI6IFVzZXIsIG9wdGlvbnMgPSB7IG5vdGlmeTogdHJ1ZSB9KSB7XG4gICAgdGhpcy5jdXJyZW50ID0gdXNlcjtcblxuICAgIC8vIFNhdmUgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5wdXQoXCJzZXNzaW9uXCIsIHRoaXMuY3VycmVudCk7XG5cbiAgICAvLyBBdCBsYXN0LCBub3RpZnkgb2JzZXJ2ZXJzIG9mIHRoaXMgY2hhbmdlXG4gICAgaWYgKCFvcHRpb25zIHx8IChvcHRpb25zICYmIG9wdGlvbnMubm90aWZ5KSkge1xuICAgICAgYXdhaXQgdGhpcy5vYnNlcnZhYmxlLm5vdGlmeShTZXNzaW9uLkVWRU5UX1NFU1NJT05fQ0hBTkdFRCwgdGhpcy5jdXJyZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCB0aGUgY3VycmVudGx5IHN0b3JlZCBTZXNzaW9uIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmZXRjaCgpIHtcbiAgICB0aGlzLmlzRmV0Y2hpbmcgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSBhd2FpdCB0aGlzLnN0b3JhZ2UuZ2V0KFwic2Vzc2lvblwiKTtcbiAgICAgIGF3YWl0IHRoaXMub2JzZXJ2YWJsZS5ub3RpZnkoU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQsIHRoaXMuY3VycmVudCk7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJDb3VsZCBub3QgZmV0Y2ggZnJvbSBsb2NhbCBzdG9yYWdlLCBjbGVhcmluZyBzZXNzaW9uXCIsIGV4Y2VwdGlvbik7XG4gICAgICBhd2FpdCB0aGlzLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5pc0ZldGNoaW5nID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWxvYWQgdGhlIGN1cnJlbnQgVXNlciB1c2luZyB0aGUgcmVtb3RlIHNlcnZlci5cbiAgICovXG4gIHB1YmxpYyBhc3luYyByZWxvYWQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgb2F1dGggPSB0aGlzLmN1cnJlbnQuY3JlZGVudGlhbHM7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJXZWJTZXJ2aWNlLm1lKG9hdXRoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIobmV3IFVzZXIoeyAuLi51c2VyLCBjcmVkZW50aWFsczogb2F1dGggfSBhcyBVc2VyU2NoZW1hKSk7XG4gICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiQ291bGQgbm90IGZldGNoIGZyb20gbG9jYWwgc3RvcmFnZSwgY2xlYXJpbmcgc2Vzc2lvblwiLCBleGNlcHRpb24pO1xuICAgICAgICBhd2FpdCB0aGlzLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgU2Vzc2lvbiBhbmQgY2xlYXJzIHRoZSBzdG9yYWdlLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5jdXJyZW50ID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gRGVzdHJveXMgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5jbGVhcigpO1xuXG4gICAgLy8gQXQgbGFzdCwgbm90aWZ5IG9ic2VydmVycyBvZiB0aGlzIGNoYW5nZVxuICAgIGF3YWl0IHRoaXMub2JzZXJ2YWJsZS5ub3RpZnkoU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQsIHRoaXMuY3VycmVudCk7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50KSB7XG4gICAgICAvLyBSZXZva2VzIHRoZSB0b2tlbiBpbiB0aGUgT0F1dGggU2VydmVyXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5yZXZva2UodGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzLmFjY2Vzc1Rva2VuKTtcbiAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJTRVNTSU9OOiBDb3VsZCBub3QgZGVzdHJveSBjdXJyZW50IHNlc3Npb25cIiwgZXhjZXB0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBcInBhc3N3b3JkXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIgYW5kIHJlZ2lzdGVycyBpdCBpbiBjdXJyZW50IFNlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBVc2VyIGNyZWRlbnRpYWxzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHBhc3N3b3JkKGRhdGE6IFBhc3N3b3JkR3JhbnRPcHRpb25zKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBvYXV0aCA9IGF3YWl0IHRoaXMub2F1dGhXZWJTZXJ2aWNlLnBhc3N3b3JkKHtcbiAgICAgICAgdXNlcm5hbWU6IGRhdGEudXNlcm5hbWUsXG4gICAgICAgIHBhc3N3b3JkOiBkYXRhLnBhc3N3b3JkLFxuICAgICAgICBzY29wZTogZGF0YS5zY29wZXMgPyBkYXRhLnNjb3Blcy5qb2luKFwiLFwiKSA6IGRhdGEuc2NvcGVcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIW9hdXRoLmFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRocm93IG9hdXRoO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyV2ViU2VydmljZS5tZShvYXV0aCk7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgLi4udXNlciwgY3JlZGVudGlhbHM6IG9hdXRoIH0gYXMgVXNlclNjaGVtYSkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZXJyb3IuY3JlZGVudGlhbHMgPSBvYXV0aDtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBcInJlZnJlc2hfdG9rZW5cIiBhdXRoZW50aWNhdGlvbiB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlciBhbmQgcmVnaXN0ZXJzIGl0IGluIGN1cnJlbnQgc2Vzc2lvbi5cbiAgICogVGhpcyBtZXRob2QgaXMgYXV0b21hdGljYWxseSBjYWxsZWQgb24gcmVxdWVzdHMgdGhhdCByZXR1cm4gNDAxXG4gICAqXG4gICAqIEBwYXJhbSB7UmVmcmVzaEdyYW50T3B0aW9uc30gZGF0YVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJlZnJlc2hUb2tlbihkYXRhOiBSZWZyZXNoR3JhbnRPcHRpb25zKSB7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBvYXV0aCA9IGF3YWl0IHRoaXMub2F1dGhXZWJTZXJ2aWNlLnJlZnJlc2hUb2tlbih7XG4gICAgICAgIHJlZnJlc2hUb2tlbjogZGF0YS5yZWZyZXNoVG9rZW5cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIW9hdXRoLmFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRocm93IG9hdXRoO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyV2ViU2VydmljZS5tZShvYXV0aCk7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgLi4udXNlciwgY3JlZGVudGlhbHM6IG9hdXRoIH0gYXMgVXNlclNjaGVtYSkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZXJyb3IuY3JlZGVudGlhbHMgPSBvYXV0aDtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybSBhIFwiY2xpZW50X2NyZWRlbnRpYWxzXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIgYW5kIHJlZ2lzdGVycyBpdCBpbiBjdXJyZW50IFNlc3Npb24uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2xpZW50Q3JlZGVudGlhbHMoKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFRoZSBjbGllbnQgSUQgYW5kIGNsaWVudCBzZWNyZXQgd2lsbCBiZSBwYXNzZWQgYnkgdGhlIE9BdXRoV2ViU2VydmljZVxuICAgICAgY29uc3Qgb2F1dGggPSBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5jbGllbnRDcmVkZW50aWFscygpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBpZiAob2F1dGguYWNjZXNzVG9rZW4gJiYgIW9hdXRoLnZpcnR1YWwpIHtcbiAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyV2ViU2VydmljZS5tZShvYXV0aCk7XG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3Rlcih1c2VyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2F1dGguYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgaWQ6IG9hdXRoLnVzZXJJZCwgY3JlZGVudGlhbHM6IG9hdXRoIH0pKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZXJyb3IuY3JlZGVudGlhbHMgPSBvYXV0aDtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIHRocm93IG9hdXRoO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iXX0=