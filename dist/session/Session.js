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
            new interceptors_1.SessionUnauthorizedInterceptor(this, () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXNzaW9uL1Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQUE0RjtBQUM1RiwwQ0FBc0Y7QUFFdEYsb0NBQXVDO0FBQ3ZDLGlEQUErRjtBQXFCL0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxNQUFxQixPQUFPO0lBZTFCLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBWjFDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUtuQixrQkFBYSxHQUFzQixFQUFFLENBQUM7UUFPNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDhCQUFVLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTdELCtCQUErQjtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLElBQUksNENBQTZCLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLElBQUksNkNBQThCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDNUMsSUFBSTtvQkFDRixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7b0JBRXZGLElBQUksT0FBTyxDQUFDLDBCQUEwQixFQUFFO3dCQUN0QyxzQ0FBc0M7d0JBQ3RDLE9BQU8sT0FBTyxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDekQ7b0JBQ0QsSUFBSSxZQUFZLEVBQUU7d0JBQ2hCLGdEQUFnRDt3QkFDaEQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsWUFBWSxFQUFF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VyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDMUU7aUJBQ0Y7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7b0JBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUN2QixNQUFNLEtBQUssQ0FBQztpQkFDYjtnQkFFRCxNQUFNLEtBQUssQ0FBQzthQUNiO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLE1BQU0sS0FBSyxDQUFDO2FBQ2I7UUFDSCxDQUFDO0tBQUE7O0FBaFJhLDZCQUFxQixHQUFHLGlCQUFpQixDQUFDO0FBWDFELDBCQTRSQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBJbnRlcmNlcHRvciwgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFVzZXIsIFVzZXJTY2hlbWEgfSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcbmltcG9ydCB7IE9BdXRoV2ViU2VydmljZSwgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucywgVXNlcldlYlNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXNcIjtcbmltcG9ydCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2Jhc2UvQmFzZU1vZGVsV2ViU2VydmljZVwiO1xuaW1wb3J0IHsgU3RvcmFnZVV0aWwgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7IFNlc3Npb25DcmVkZW50aWFsc0ludGVyY2VwdG9yLCBTZXNzaW9uVW5hdXRob3JpemVkSW50ZXJjZXB0b3IgfSBmcm9tIFwiLi9pbnRlcmNlcHRvcnNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTZXNzaW9uT3B0aW9ucyB7XG4gIGh0dHA/OiBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucztcbiAgb2F1dGg/OiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zO1xuICBzdG9yYWdlPzogU3RvcmFnZVV0aWw7XG4gIGF1dG9GZXRjaD86IGJvb2xlYW47XG4gIHNlc3Npb25VbmF1dGhvcml6ZWRIYW5kbGVyPzogKGN1cnJlbnQ6IFVzZXIpID0+IFByb21pc2U8dm9pZD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFzc3dvcmRHcmFudE9wdGlvbnMge1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xuICBzY29wZXM/OiBzdHJpbmdbXTtcbiAgc2NvcGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVmcmVzaEdyYW50T3B0aW9ucyB7XG4gIHJlZnJlc2hUb2tlbjogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFuIGFic3RyYWN0aW9uIGxheWVyIHRvIHNlY3VyZWx5IHN0b3JlIGFuZCBtYW5hZ2UgcGxhdGZvcm0gY3JlZGVudGlhbHMuXG4gKlxuICogVGhlIFNlc3Npb24gaXMgYSBzaW5nbGV0b24sIHNvIHlvdSBtYXkgYWNjZXNzIHRoZSBhdXRoZW50aWNhdGlvbiBzdGF0ZVxuICogYXQgYW55IHRpbWUsIGluIGFueSBjb250ZXh0LCBnZXR0aW5nIGl0cyBjdXJyZW50IGluc3RhbmNlLiBJdCBpcyBhbHNvXG4gKiBhbiBvYnNlcnZhYmxlLCBzbyBpdCBjYW4gYmUgd2F0Y2hlZCBmb3IgY2hhbmdlczpcbiAqXG4gYGBgdHlwZXNjcmlwdFxuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdiaXRjYXBpdGFsLWNvcmUtc2RrJztcblxuLy8gR2V0cyB0aGUgY3VycmVudCBTZXNzaW9uIGluc3RhbmNlXG5jb25zdCBzZXNzaW9uID0gYml0Y2FwaXRhbC5zZXNzaW9uKCk7XG5cbi8vIFNob3dzIHRoZSBjdXJyZW50IHVzZXIgaW5zdGFuY2UsIGlmIGFueVxuY29uc29sZS5sb2coc2Vzc2lvbi5jdXJyZW50KTtcblxuLy8gUHJlcGFyZSBhIG5ldyBzZXNzaW9uIG9ic2VydmVyICh0eXBlc2NyaXB0IG5vdGF0aW9uKVxuY29uc3Qgb2JzZXJ2ZXI6IE9ic2VydmVyID0ge1xuICB1cGRhdGUoZXZlbnQ6IHN0cmluZywgZGF0YTogVXNlcikge1xuICAgIGlmKGV2ZW50ID09PSBTZXNzaW9uLkVWRU5UX1NFU1NJT05fQ0hBTkdFRCkge1xuICAgICAgY29uc29sZS5sb2coJ1VzZXIgaW5zdGFuY2UgaGFzIGNoYW5nZWQgaW4gU2Vzc2lvbicsIHsgdXNlcjogZGF0YSB9KTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIFN0YXJ0IGxpc3RlbmluZyB0byBTZXNzaW9uIGNoYW5nZXMsIHN1Y2ggYXMgY3JlZGVudGlhbHNcbi8vIGV4cGlyYXRpb24gb3IgYSByZWZyZXNoZWQgYWNjZXNzIHRva2VuLlxuc2Vzc2lvbi5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xuXG4vLyAuLi5cblxuLy8gRXZlbnR1YWxseSwgeW91IGNhbiBhbHNvIHN0b3AgbGlzdGVuaW5nIHRvIGl0cyBjaGFuZ2VzXG5zZXNzaW9uLnVuc3Vic2NyaWJlKG9ic2VydmVyKTtcbiBgYGBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vzc2lvbiB7XG4gIGN1cnJlbnQ/OiBVc2VyO1xuICBzdG9yYWdlOiBTdG9yYWdlVXRpbDtcbiAgaXNGZXRjaGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBpc0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTtcbiAgdXNlcldlYlNlcnZpY2U6IFVzZXJXZWJTZXJ2aWNlO1xuICBvYXV0aFdlYlNlcnZpY2U6IE9BdXRoV2ViU2VydmljZTtcbiAgcHJpdmF0ZSBfZmV0Y2hQcm9taXNlPzogUHJvbWlzZTxVc2VyPjtcbiAgcHJpdmF0ZSBfaW50ZXJjZXB0b3JzOiBIdHRwSW50ZXJjZXB0b3JbXSA9IFtdO1xuXG4gIHB1YmxpYyBzdGF0aWMgRVZFTlRfU0VTU0lPTl9DSEFOR0VEID0gXCJTRVNTSU9OX0NIQU5HRURcIjtcblxuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBTZXNzaW9uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBTZXNzaW9uT3B0aW9ucykge1xuICAgIHRoaXMub2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5zdG9yYWdlID0gb3B0aW9ucy5zdG9yYWdlIHx8IG5ldyBTdG9yYWdlVXRpbChcInNlc3Npb25cIik7XG5cbiAgICAvLyBQcmVwYXJlIFNlc3Npb24gaW50ZXJjZXB0b3JzXG4gICAgdGhpcy5faW50ZXJjZXB0b3JzID0gW1xuICAgICAgbmV3IFNlc3Npb25DcmVkZW50aWFsc0ludGVyY2VwdG9yKHRoaXMpLFxuICAgICAgbmV3IFNlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvcih0aGlzLCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVmcmVzaFRva2VuID0gdGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzICYmIHRoaXMuY3VycmVudC5jcmVkZW50aWFscy5yZWZyZXNoVG9rZW47XG5cbiAgICAgICAgICBpZiAob3B0aW9ucy5zZXNzaW9uVW5hdXRob3JpemVkSGFuZGxlcikge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBhIGN1c3RvbSBoYW5kbGVyLCBydW4gaXRcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLnNlc3Npb25VbmF1dGhvcml6ZWRIYW5kbGVyKHRoaXMuY3VycmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSByZWZyZXNoIHRva2VuLCB0cnkgdG8gcmVmcmVzaCBpdFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaFRva2VuKHsgcmVmcmVzaFRva2VuIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBObyByZWZyZXNoIHRva2VuLCBqdXN0IGRlc3Ryb3kgdGhlIHNlc3Npb25cbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJTZXNzaW9uIGlzIGludmFsaWQgYW5kIG5vIHJlZnJlc2ggdG9rZW4gYXZhaWFibGUsIGRlc3Ryb3lpbmcgc2Vzc2lvblwiKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kZXN0cm95KCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgLy8gUmVmcmVzaCB0b2tlbiBhdXRoIGZhaWxlZCwgZGVzdHJveSB0aGUgc2Vzc2lvblxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTZXNzaW9uIGlzIGludmFsaWQgYW5kIGhhbmRsZXIgZmFpbGVkLCBkZXN0cm95aW5nIHNlc3Npb25cIik7XG4gICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgXTtcblxuICAgIC8vIFByZXBhcmUgaW5uZXIgd2ViIHNlcnZpY2VzXG4gICAgdGhpcy51c2VyV2ViU2VydmljZSA9IG9wdGlvbnMuaHR0cFxuICAgICAgPyBVc2VyV2ViU2VydmljZS5pbml0aWFsaXplKHsgc2Vzc2lvbjogdGhpcywgLi4ub3B0aW9ucy5odHRwIH0pXG4gICAgICA6IFVzZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gICAgdGhpcy5vYXV0aFdlYlNlcnZpY2UgPSBvcHRpb25zLm9hdXRoXG4gICAgICA/IE9BdXRoV2ViU2VydmljZS5pbml0aWFsaXplKHsgLi4ub3B0aW9ucy5vYXV0aCB9KVxuICAgICAgOiBPQXV0aFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcblxuICAgIC8vIEZldGNoIHNlc3Npb24gaW4gc3RhcnR1cCBieSBkZWZhdWx0XG4gICAgaWYgKChvcHRpb25zLmF1dG9GZXRjaCBhcyBhbnkpICE9PSBmYWxzZSkge1xuICAgICAgdGhpcy5fZmV0Y2hQcm9taXNlID0gdGhpcy5mZXRjaCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIFNlc3Npb24gaW50ZXJjZXB0b3JzIGZvciBhdXRob3JpemVkIGNhbGxzIGFuZCBhdXRvIFNlc3Npb24gZGVzdHJ1Y3Rpb24uXG4gICAqL1xuICBpbnRlcmNlcHRvcnMoKTogSHR0cEludGVyY2VwdG9yW10ge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcmNlcHRvcnM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBTZXNzaW9uIHNpbmdsZXRvbiBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogU2Vzc2lvbiB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogU2Vzc2lvbk9wdGlvbnMpOiBTZXNzaW9uIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFNlc3Npb24ob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIGZvciB1cGRhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge09ic2VydmVyfSBvYnNlcnZhYmxlIFRoZSBpbnN0YWNlIHRvIGJlIG5vdGlmaWVkLlxuICAgKi9cbiAgcHVibGljIHN1YnNjcmliZShvYnNlcnZhYmxlOiBPYnNlcnZlcikge1xuICAgIHRoaXMub2JzZXJ2YWJsZS5zdWJzY3JpYmUob2JzZXJ2YWJsZSk7XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB1cGRhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge09ic2VydmVyfSBvYnNlcnZhYmxlIFRoZSBpbnN0YW5jZSB0byBiZSByZW1vdmVkIGZyb20gbGlzdGVuZXJzLlxuICAgKi9cbiAgcHVibGljIHVuc3Vic2NyaWJlKG9ic2VydmFibGU6IE9ic2VydmVyKSB7XG4gICAgdGhpcy5vYnNlcnZhYmxlLnVuc3Vic2NyaWJlKG9ic2VydmFibGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHRvIGF3YWl0IGZldGNoaW5nIGNvbXBsZXRpb24uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25GZXRjaCgpIHtcbiAgICBpZiAoIXRoaXMuX2ZldGNoUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmN1cnJlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZmV0Y2hQcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgbmV3IFVzZXIgaW4gc2Vzc2lvbiwgbm90aWZ5aW5nIGFsbCBvYnNlcnZlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB1c2VyIFRoZSBVc2VyIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge3tub3RpZnk6IGJvb2xlYW59fSBvcHRpb25zIFRoZSBvcGVyYXRpb24gb3B0aW9ucy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyByZWdpc3Rlcih1c2VyOiBVc2VyLCBvcHRpb25zID0geyBub3RpZnk6IHRydWUgfSkge1xuICAgIHRoaXMuY3VycmVudCA9IHVzZXI7XG5cbiAgICAvLyBTYXZlIGluIGxvY2FsIHN0b3JhZ2VcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucHV0KFwic2Vzc2lvblwiLCB0aGlzLmN1cnJlbnQpO1xuXG4gICAgLy8gQXQgbGFzdCwgbm90aWZ5IG9ic2VydmVycyBvZiB0aGlzIGNoYW5nZVxuICAgIGlmICghb3B0aW9ucyB8fCAob3B0aW9ucyAmJiBvcHRpb25zLm5vdGlmeSkpIHtcbiAgICAgIGF3YWl0IHRoaXMub2JzZXJ2YWJsZS5ub3RpZnkoU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQsIHRoaXMuY3VycmVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggdGhlIGN1cnJlbnRseSBzdG9yZWQgU2Vzc2lvbiBmcm9tIGxvY2FsIHN0b3JhZ2UuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmV0Y2goKSB7XG4gICAgdGhpcy5pc0ZldGNoaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jdXJyZW50ID0gYXdhaXQgdGhpcy5zdG9yYWdlLmdldChcInNlc3Npb25cIik7XG4gICAgICBhd2FpdCB0aGlzLm9ic2VydmFibGUubm90aWZ5KFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VELCB0aGlzLmN1cnJlbnQpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgY29uc29sZS53YXJuKFwiQ291bGQgbm90IGZldGNoIGZyb20gbG9jYWwgc3RvcmFnZSwgY2xlYXJpbmcgc2Vzc2lvblwiLCBleGNlcHRpb24pO1xuICAgICAgYXdhaXQgdGhpcy5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuaXNGZXRjaGluZyA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmVsb2FkIHRoZSBjdXJyZW50IFVzZXIgdXNpbmcgdGhlIHJlbW90ZSBzZXJ2ZXIuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVsb2FkKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQpIHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG9hdXRoID0gdGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzO1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyV2ViU2VydmljZS5tZShvYXV0aCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgLi4udXNlciwgY3JlZGVudGlhbHM6IG9hdXRoIH0gYXMgVXNlclNjaGVtYSkpO1xuICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkNvdWxkIG5vdCBmZXRjaCBmcm9tIGxvY2FsIHN0b3JhZ2UsIGNsZWFyaW5nIHNlc3Npb25cIiwgZXhjZXB0aW9uKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIFNlc3Npb24gYW5kIGNsZWFycyB0aGUgc3RvcmFnZS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95KCkge1xuICAgIHRoaXMuY3VycmVudCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIERlc3Ryb3lzIGluIGxvY2FsIHN0b3JhZ2VcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcblxuICAgIC8vIEF0IGxhc3QsIG5vdGlmeSBvYnNlcnZlcnMgb2YgdGhpcyBjaGFuZ2VcbiAgICBhd2FpdCB0aGlzLm9ic2VydmFibGUubm90aWZ5KFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VELCB0aGlzLmN1cnJlbnQpO1xuXG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xuICAgICAgLy8gUmV2b2tlcyB0aGUgdG9rZW4gaW4gdGhlIE9BdXRoIFNlcnZlclxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5vYXV0aFdlYlNlcnZpY2UucmV2b2tlKHRoaXMuY3VycmVudC5jcmVkZW50aWFscy5hY2Nlc3NUb2tlbik7XG4gICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiU0VTU0lPTjogQ291bGQgbm90IGRlc3Ryb3kgY3VycmVudCBzZXNzaW9uXCIsIGV4Y2VwdGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgXCJwYXNzd29yZFwiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyIGFuZCByZWdpc3RlcnMgaXQgaW4gY3VycmVudCBTZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgVXNlciBjcmVkZW50aWFscy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBwYXNzd29yZChkYXRhOiBQYXNzd29yZEdyYW50T3B0aW9ucyk6IFByb21pc2U8VXNlcj4ge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgb2F1dGggPSBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5wYXNzd29yZCh7XG4gICAgICAgIHVzZXJuYW1lOiBkYXRhLnVzZXJuYW1lLFxuICAgICAgICBwYXNzd29yZDogZGF0YS5wYXNzd29yZCxcbiAgICAgICAgc2NvcGU6IGRhdGEuc2NvcGVzID8gZGF0YS5zY29wZXMuam9pbihcIixcIikgOiBkYXRhLnNjb3BlXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFvYXV0aC5hY2Nlc3NUb2tlbikge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aHJvdyBvYXV0aDtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IC4uLnVzZXIsIGNyZWRlbnRpYWxzOiBvYXV0aCB9IGFzIFVzZXJTY2hlbWEpKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGVycm9yLmNyZWRlbnRpYWxzID0gb2F1dGg7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgXCJyZWZyZXNoX3Rva2VuXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIgYW5kIHJlZ2lzdGVycyBpdCBpbiBjdXJyZW50IHNlc3Npb24uXG4gICAqIFRoaXMgbWV0aG9kIGlzIGF1dG9tYXRpY2FsbHkgY2FsbGVkIG9uIHJlcXVlc3RzIHRoYXQgcmV0dXJuIDQwMVxuICAgKlxuICAgKiBAcGFyYW0ge1JlZnJlc2hHcmFudE9wdGlvbnN9IGRhdGFcbiAgICovXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoVG9rZW4oZGF0YTogUmVmcmVzaEdyYW50T3B0aW9ucykge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgb2F1dGggPSBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5yZWZyZXNoVG9rZW4oe1xuICAgICAgICByZWZyZXNoVG9rZW46IGRhdGEucmVmcmVzaFRva2VuXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFvYXV0aC5hY2Nlc3NUb2tlbikge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aHJvdyBvYXV0aDtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IC4uLnVzZXIsIGNyZWRlbnRpYWxzOiBvYXV0aCB9IGFzIFVzZXJTY2hlbWEpKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGVycm9yLmNyZWRlbnRpYWxzID0gb2F1dGg7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBcImNsaWVudF9jcmVkZW50aWFsc1wiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyIGFuZCByZWdpc3RlcnMgaXQgaW4gY3VycmVudCBTZXNzaW9uLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNsaWVudENyZWRlbnRpYWxzKCk6IFByb21pc2U8VXNlcj4ge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBUaGUgY2xpZW50IElEIGFuZCBjbGllbnQgc2VjcmV0IHdpbGwgYmUgcGFzc2VkIGJ5IHRoZSBPQXV0aFdlYlNlcnZpY2VcbiAgICAgIGNvbnN0IG9hdXRoID0gYXdhaXQgdGhpcy5vYXV0aFdlYlNlcnZpY2UuY2xpZW50Q3JlZGVudGlhbHMoKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKG9hdXRoLmFjY2Vzc1Rva2VuICYmICFvYXV0aC52aXJ0dWFsKSB7XG4gICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIodXNlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9hdXRoLmFjY2Vzc1Rva2VuKSB7XG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IGlkOiBvYXV0aC51c2VySWQsIGNyZWRlbnRpYWxzOiBvYXV0aCB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGVycm9yLmNyZWRlbnRpYWxzID0gb2F1dGg7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBvYXV0aDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufVxuIl19