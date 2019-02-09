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
        this._interceptors = [];
        this.observable = new bitcapital_common_1.Observable();
        this.storage = options.storage || new utils_1.StorageUtil("session");
        // Prepare web services
        this.userWebService = options.http ? services_1.UserWebService.initialize(options.http) : services_1.UserWebService.getInstance();
        this.oauthWebService = options.oauth ? services_1.OAuthWebService.initialize(options.oauth) : services_1.OAuthWebService.getInstance();
        // Prepare Session interceptors
        this._interceptors = [
            new interceptors_1.SessionCredentialsInterceptor(this),
            new interceptors_1.SessionUnauthorizedInterceptor(() => {
                try {
                    const refreshToken = this.current.credentials && this.current.credentials.refreshToken;
                    if (refreshToken) {
                        // If there's a refresh token, try to refresh it
                        this.refreshToken({ refreshToken });
                    }
                    else {
                        // No refresh token, just destroy the session
                        this.destroy();
                    }
                }
                catch (error) {
                    // Refresh token auth failed, destroy the session
                    this.destroy();
                }
            })
        ];
        // Fetch session in startup by default
        if (options.autoFetch !== false) {
            this.fetch();
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
            this.current = yield this.storage.get("session");
            yield this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
            return this.current;
        });
    }
    /**
     * Reload the current User using the remote server.
     */
    reload() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.current) {
                const oauth = this.current.credentials;
                const user = yield this.userWebService.me(oauth);
                return this.register(new bitcapital_common_1.User(Object.assign({}, user, { credentials: oauth })));
            }
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
            const oauth = yield this.oauthWebService.password({
                username: data.username,
                password: data.password,
                scope: data.scopes ? data.scopes.join(",") : data.scope
            });
            if (!oauth.accessToken) {
                throw oauth;
            }
            try {
                const user = yield this.userWebService.me(oauth);
                return this.register(new bitcapital_common_1.User(Object.assign({}, user, { credentials: oauth })));
            }
            catch (error) {
                error.credentials = oauth;
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
            const oauth = yield this.oauthWebService.refreshToken({
                refreshToken: data.refreshToken
            });
            if (!oauth.accessToken) {
                throw oauth;
            }
            try {
                const user = yield this.userWebService.me(oauth);
                return this.register(new bitcapital_common_1.User(Object.assign({}, user, { credentials: oauth })));
            }
            catch (error) {
                error.credentials = oauth;
                throw error;
            }
        });
    }
    /**
     * Perform a "client_credentials" authentication using the OAuth 2.0 server and registers it in current Session.
     */
    clientCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            // The client ID and client secret will be passed by the OAuthWebService
            const oauth = yield this.oauthWebService.clientCredentials();
            try {
                if (oauth.accessToken && !oauth.virtual) {
                    const user = yield this.userWebService.me(oauth);
                    return this.register(user);
                }
                if (oauth.accessToken) {
                    return this.register(new bitcapital_common_1.User({ id: oauth.userId, credentials: oauth }));
                }
            }
            catch (error) {
                error.credentials = oauth;
                throw error;
            }
            throw oauth;
        });
    }
}
Session.EVENT_SESSION_CHANGED = "SESSION_CHANGED";
exports.default = Session;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXNzaW9uL1Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQUE0RjtBQUM1RiwwQ0FBc0Y7QUFFdEYsb0NBQXVDO0FBQ3ZDLGlEQUErRjtBQW9CL0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxNQUFxQixPQUFPO0lBWTFCLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTmxDLGtCQUFhLEdBQXNCLEVBQUUsQ0FBQztRQU81QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksOEJBQVUsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLG1CQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0QsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMseUJBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyx5QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVHLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWpILCtCQUErQjtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLElBQUksNENBQTZCLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLElBQUksNkNBQThCLENBQUMsR0FBRyxFQUFFO2dCQUN0QyxJQUFJO29CQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksQ0FB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QUksR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNqRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzVCO2dCQUNELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtvQkFDckIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksd0JBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzFFO2FBQ0Y7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxLQUFLLENBQUM7YUFDYjtZQUVELE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQztLQUFBOztBQWpOYSw2QkFBcUIsR0FBRyxpQkFBaUIsQ0FBQztBQVIxRCwwQkEwTkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyLCBVc2VyU2NoZW1hLCBIdHRwSW50ZXJjZXB0b3IsIE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XHJcbmltcG9ydCB7IE9BdXRoV2ViU2VydmljZSwgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucywgVXNlcldlYlNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXNcIjtcclxuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi4vc2VydmljZXMvYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VVdGlsIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IFNlc3Npb25DcmVkZW50aWFsc0ludGVyY2VwdG9yLCBTZXNzaW9uVW5hdXRob3JpemVkSW50ZXJjZXB0b3IgfSBmcm9tIFwiLi9pbnRlcmNlcHRvcnNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2Vzc2lvbk9wdGlvbnMge1xyXG4gIGh0dHA/OiBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucztcclxuICBvYXV0aD86IE9BdXRoV2ViU2VydmljZU9wdGlvbnM7XHJcbiAgc3RvcmFnZT86IFN0b3JhZ2VVdGlsO1xyXG4gIGF1dG9GZXRjaD86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGFzc3dvcmRHcmFudE9wdGlvbnMge1xyXG4gIHVzZXJuYW1lOiBzdHJpbmc7XHJcbiAgcGFzc3dvcmQ6IHN0cmluZztcclxuICBzY29wZXM/OiBzdHJpbmdbXTtcclxuICBzY29wZT86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZWZyZXNoR3JhbnRPcHRpb25zIHtcclxuICByZWZyZXNoVG9rZW46IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIEFuIGFic3RyYWN0aW9uIGxheWVyIHRvIHNlY3VyZWx5IHN0b3JlIGFuZCBtYW5hZ2UgcGxhdGZvcm0gY3JlZGVudGlhbHMuXHJcbiAqXHJcbiAqIFRoZSBTZXNzaW9uIGlzIGEgc2luZ2xldG9uLCBzbyB5b3UgbWF5IGFjY2VzcyB0aGUgYXV0aGVudGljYXRpb24gc3RhdGVcclxuICogYXQgYW55IHRpbWUsIGluIGFueSBjb250ZXh0LCBnZXR0aW5nIGl0cyBjdXJyZW50IGluc3RhbmNlLiBJdCBpcyBhbHNvXHJcbiAqIGFuIG9ic2VydmFibGUsIHNvIGl0IGNhbiBiZSB3YXRjaGVkIGZvciBjaGFuZ2VzOlxyXG4gKlxyXG4gYGBgdHlwZXNjcmlwdFxyXG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ2JpdGNhcGl0YWwtY29yZS1zZGsnO1xyXG5cclxuLy8gR2V0cyB0aGUgY3VycmVudCBTZXNzaW9uIGluc3RhbmNlXHJcbmNvbnN0IHNlc3Npb24gPSBiaXRjYXBpdGFsLnNlc3Npb24oKTtcclxuXHJcbi8vIFNob3dzIHRoZSBjdXJyZW50IHVzZXIgaW5zdGFuY2UsIGlmIGFueVxyXG5jb25zb2xlLmxvZyhzZXNzaW9uLmN1cnJlbnQpO1xyXG5cclxuLy8gUHJlcGFyZSBhIG5ldyBzZXNzaW9uIG9ic2VydmVyICh0eXBlc2NyaXB0IG5vdGF0aW9uKVxyXG5jb25zdCBvYnNlcnZlcjogT2JzZXJ2ZXIgPSB7XHJcbiAgdXBkYXRlKGV2ZW50OiBzdHJpbmcsIGRhdGE6IFVzZXIpIHtcclxuICAgIGlmKGV2ZW50ID09PSBTZXNzaW9uLkVWRU5UX1NFU1NJT05fQ0hBTkdFRCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnVXNlciBpbnN0YW5jZSBoYXMgY2hhbmdlZCBpbiBTZXNzaW9uJywgeyB1c2VyOiBkYXRhIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8vIFN0YXJ0IGxpc3RlbmluZyB0byBTZXNzaW9uIGNoYW5nZXMsIHN1Y2ggYXMgY3JlZGVudGlhbHNcclxuLy8gZXhwaXJhdGlvbiBvciBhIHJlZnJlc2hlZCBhY2Nlc3MgdG9rZW4uXHJcbnNlc3Npb24uc3Vic2NyaWJlKG9ic2VydmVyKTtcclxuXHJcbi8vIC4uLlxyXG5cclxuLy8gRXZlbnR1YWxseSwgeW91IGNhbiBhbHNvIHN0b3AgbGlzdGVuaW5nIHRvIGl0cyBjaGFuZ2VzXHJcbnNlc3Npb24udW5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xyXG4gYGBgXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXNzaW9uIHtcclxuICBjdXJyZW50PzogVXNlcjtcclxuICBzdG9yYWdlOiBTdG9yYWdlVXRpbDtcclxuICBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlO1xyXG4gIHVzZXJXZWJTZXJ2aWNlOiBVc2VyV2ViU2VydmljZTtcclxuICBvYXV0aFdlYlNlcnZpY2U6IE9BdXRoV2ViU2VydmljZTtcclxuICBwcml2YXRlIF9pbnRlcmNlcHRvcnM6IEh0dHBJbnRlcmNlcHRvcltdID0gW107XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgRVZFTlRfU0VTU0lPTl9DSEFOR0VEID0gXCJTRVNTSU9OX0NIQU5HRURcIjtcclxuXHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogU2Vzc2lvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IFNlc3Npb25PcHRpb25zKSB7XHJcbiAgICB0aGlzLm9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpO1xyXG4gICAgdGhpcy5zdG9yYWdlID0gb3B0aW9ucy5zdG9yYWdlIHx8IG5ldyBTdG9yYWdlVXRpbChcInNlc3Npb25cIik7XHJcblxyXG4gICAgLy8gUHJlcGFyZSB3ZWIgc2VydmljZXNcclxuICAgIHRoaXMudXNlcldlYlNlcnZpY2UgPSBvcHRpb25zLmh0dHAgPyBVc2VyV2ViU2VydmljZS5pbml0aWFsaXplKG9wdGlvbnMuaHR0cCkgOiBVc2VyV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gICAgdGhpcy5vYXV0aFdlYlNlcnZpY2UgPSBvcHRpb25zLm9hdXRoID8gT0F1dGhXZWJTZXJ2aWNlLmluaXRpYWxpemUob3B0aW9ucy5vYXV0aCkgOiBPQXV0aFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAvLyBQcmVwYXJlIFNlc3Npb24gaW50ZXJjZXB0b3JzXHJcbiAgICB0aGlzLl9pbnRlcmNlcHRvcnMgPSBbXHJcbiAgICAgIG5ldyBTZXNzaW9uQ3JlZGVudGlhbHNJbnRlcmNlcHRvcih0aGlzKSxcclxuICAgICAgbmV3IFNlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvcigoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IHRoaXMuY3VycmVudC5jcmVkZW50aWFscyAmJiB0aGlzLmN1cnJlbnQuY3JlZGVudGlhbHMucmVmcmVzaFRva2VuO1xyXG5cclxuICAgICAgICAgIGlmIChyZWZyZXNoVG9rZW4pIHtcclxuICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBhIHJlZnJlc2ggdG9rZW4sIHRyeSB0byByZWZyZXNoIGl0XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFRva2VuKHsgcmVmcmVzaFRva2VuIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gTm8gcmVmcmVzaCB0b2tlbiwganVzdCBkZXN0cm95IHRoZSBzZXNzaW9uXHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAvLyBSZWZyZXNoIHRva2VuIGF1dGggZmFpbGVkLCBkZXN0cm95IHRoZSBzZXNzaW9uXHJcbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIEZldGNoIHNlc3Npb24gaW4gc3RhcnR1cCBieSBkZWZhdWx0XHJcbiAgICBpZiAoKG9wdGlvbnMuYXV0b0ZldGNoIGFzIGFueSkgIT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuZmV0Y2goKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgU2Vzc2lvbiBpbnRlcmNlcHRvcnMgZm9yIGF1dGhvcml6ZWQgY2FsbHMgYW5kIGF1dG8gU2Vzc2lvbiBkZXN0cnVjdGlvbi5cclxuICAgKi9cclxuICBpbnRlcmNlcHRvcnMoKTogSHR0cEludGVyY2VwdG9yW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ludGVyY2VwdG9ycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgU2Vzc2lvbiBzaW5nbGV0b24gaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBTZXNzaW9uIHtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IFNlc3Npb25PcHRpb25zKTogU2Vzc2lvbiB7XHJcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFNlc3Npb24ob3B0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSBmb3IgdXBkYXRlcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JzZXJ2ZXJ9IG9ic2VydmFibGUgVGhlIGluc3RhY2UgdG8gYmUgbm90aWZpZWQuXHJcbiAgICovXHJcbiAgcHVibGljIHN1YnNjcmliZShvYnNlcnZhYmxlOiBPYnNlcnZlcikge1xyXG4gICAgdGhpcy5vYnNlcnZhYmxlLnN1YnNjcmliZShvYnNlcnZhYmxlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuc3Vic2NyaWJlIGZyb20gdXBkYXRlcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JzZXJ2ZXJ9IG9ic2VydmFibGUgVGhlIGluc3RhbmNlIHRvIGJlIHJlbW92ZWQgZnJvbSBsaXN0ZW5lcnMuXHJcbiAgICovXHJcbiAgcHVibGljIHVuc3Vic2NyaWJlKG9ic2VydmFibGU6IE9ic2VydmVyKSB7XHJcbiAgICB0aGlzLm9ic2VydmFibGUudW5zdWJzY3JpYmUob2JzZXJ2YWJsZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWdpc3RlciBhIG5ldyBVc2VyIGluIHNlc3Npb24sIG5vdGlmeWluZyBhbGwgb2JzZXJ2ZXJzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVzZXIgVGhlIFVzZXIgaW5zdGFuY2UuXHJcbiAgICogQHBhcmFtIHt7bm90aWZ5OiBib29sZWFufX0gb3B0aW9ucyBUaGUgb3BlcmF0aW9uIG9wdGlvbnMuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHJlZ2lzdGVyKHVzZXI6IFVzZXIsIG9wdGlvbnMgPSB7IG5vdGlmeTogdHJ1ZSB9KSB7XHJcbiAgICB0aGlzLmN1cnJlbnQgPSB1c2VyO1xyXG5cclxuICAgIC8vIFNhdmUgaW4gbG9jYWwgc3RvcmFnZVxyXG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLnB1dChcInNlc3Npb25cIiwgdGhpcy5jdXJyZW50KTtcclxuXHJcbiAgICAvLyBBdCBsYXN0LCBub3RpZnkgb2JzZXJ2ZXJzIG9mIHRoaXMgY2hhbmdlXHJcbiAgICBpZiAoIW9wdGlvbnMgfHwgKG9wdGlvbnMgJiYgb3B0aW9ucy5ub3RpZnkpKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMub2JzZXJ2YWJsZS5ub3RpZnkoU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQsIHRoaXMuY3VycmVudCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmV0Y2ggdGhlIGN1cnJlbnRseSBzdG9yZWQgU2Vzc2lvbiBmcm9tIGxvY2FsIHN0b3JhZ2UuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGFzeW5jIGZldGNoKCkge1xyXG4gICAgdGhpcy5jdXJyZW50ID0gYXdhaXQgdGhpcy5zdG9yYWdlLmdldChcInNlc3Npb25cIik7XHJcbiAgICBhd2FpdCB0aGlzLm9ic2VydmFibGUubm90aWZ5KFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VELCB0aGlzLmN1cnJlbnQpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbG9hZCB0aGUgY3VycmVudCBVc2VyIHVzaW5nIHRoZSByZW1vdGUgc2VydmVyLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyByZWxvYWQoKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50KSB7XHJcbiAgICAgIGNvbnN0IG9hdXRoID0gdGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzO1xyXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyV2ViU2VydmljZS5tZShvYXV0aCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgLi4udXNlciwgY3JlZGVudGlhbHM6IG9hdXRoIH0gYXMgVXNlclNjaGVtYSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdHJveSB0aGUgU2Vzc2lvbiBhbmQgY2xlYXJzIHRoZSBzdG9yYWdlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5jdXJyZW50ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIC8vIERlc3Ryb3lzIGluIGxvY2FsIHN0b3JhZ2VcclxuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5jbGVhcigpO1xyXG5cclxuICAgIC8vIEF0IGxhc3QsIG5vdGlmeSBvYnNlcnZlcnMgb2YgdGhpcyBjaGFuZ2VcclxuICAgIGF3YWl0IHRoaXMub2JzZXJ2YWJsZS5ub3RpZnkoU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQsIHRoaXMuY3VycmVudCk7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xyXG4gICAgICAvLyBSZXZva2VzIHRoZSB0b2tlbiBpbiB0aGUgT0F1dGggU2VydmVyXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5vYXV0aFdlYlNlcnZpY2UucmV2b2tlKHRoaXMuY3VycmVudC5jcmVkZW50aWFscy5hY2Nlc3NUb2tlbik7XHJcbiAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcIlNFU1NJT046IENvdWxkIG5vdCBkZXN0cm95IGN1cnJlbnQgc2Vzc2lvblwiLCBleGNlcHRpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm0gYSBcInBhc3N3b3JkXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIgYW5kIHJlZ2lzdGVycyBpdCBpbiBjdXJyZW50IFNlc3Npb24uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSBUaGUgVXNlciBjcmVkZW50aWFscy5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgcGFzc3dvcmQoZGF0YTogUGFzc3dvcmRHcmFudE9wdGlvbnMpOiBQcm9taXNlPFVzZXI+IHtcclxuICAgIGNvbnN0IG9hdXRoID0gYXdhaXQgdGhpcy5vYXV0aFdlYlNlcnZpY2UucGFzc3dvcmQoe1xyXG4gICAgICB1c2VybmFtZTogZGF0YS51c2VybmFtZSxcclxuICAgICAgcGFzc3dvcmQ6IGRhdGEucGFzc3dvcmQsXHJcbiAgICAgIHNjb3BlOiBkYXRhLnNjb3BlcyA/IGRhdGEuc2NvcGVzLmpvaW4oXCIsXCIpIDogZGF0YS5zY29wZVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFvYXV0aC5hY2Nlc3NUb2tlbikge1xyXG4gICAgICB0aHJvdyBvYXV0aDtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyV2ViU2VydmljZS5tZShvYXV0aCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgLi4udXNlciwgY3JlZGVudGlhbHM6IG9hdXRoIH0gYXMgVXNlclNjaGVtYSkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgZXJyb3IuY3JlZGVudGlhbHMgPSBvYXV0aDtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtcyBhIFwicmVmcmVzaF90b2tlblwiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyIGFuZCByZWdpc3RlcnMgaXQgaW4gY3VycmVudCBzZXNzaW9uLlxyXG4gICAqIFRoaXMgbWV0aG9kIGlzIGF1dG9tYXRpY2FsbHkgY2FsbGVkIG9uIHJlcXVlc3RzIHRoYXQgcmV0dXJuIDQwMVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtSZWZyZXNoR3JhbnRPcHRpb25zfSBkYXRhXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHJlZnJlc2hUb2tlbihkYXRhOiBSZWZyZXNoR3JhbnRPcHRpb25zKSB7XHJcbiAgICBjb25zdCBvYXV0aCA9IGF3YWl0IHRoaXMub2F1dGhXZWJTZXJ2aWNlLnJlZnJlc2hUb2tlbih7XHJcbiAgICAgIHJlZnJlc2hUb2tlbjogZGF0YS5yZWZyZXNoVG9rZW5cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghb2F1dGguYWNjZXNzVG9rZW4pIHtcclxuICAgICAgdGhyb3cgb2F1dGg7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xyXG4gICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IC4uLnVzZXIsIGNyZWRlbnRpYWxzOiBvYXV0aCB9IGFzIFVzZXJTY2hlbWEpKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGVycm9yLmNyZWRlbnRpYWxzID0gb2F1dGg7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGVyZm9ybSBhIFwiY2xpZW50X2NyZWRlbnRpYWxzXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIgYW5kIHJlZ2lzdGVycyBpdCBpbiBjdXJyZW50IFNlc3Npb24uXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGNsaWVudENyZWRlbnRpYWxzKCk6IFByb21pc2U8VXNlcj4ge1xyXG4gICAgLy8gVGhlIGNsaWVudCBJRCBhbmQgY2xpZW50IHNlY3JldCB3aWxsIGJlIHBhc3NlZCBieSB0aGUgT0F1dGhXZWJTZXJ2aWNlXHJcbiAgICBjb25zdCBvYXV0aCA9IGF3YWl0IHRoaXMub2F1dGhXZWJTZXJ2aWNlLmNsaWVudENyZWRlbnRpYWxzKCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKG9hdXRoLmFjY2Vzc1Rva2VuICYmICFvYXV0aC52aXJ0dWFsKSB7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKHVzZXIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvYXV0aC5hY2Nlc3NUb2tlbikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgaWQ6IG9hdXRoLnVzZXJJZCwgY3JlZGVudGlhbHM6IG9hdXRoIH0pKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgZXJyb3IuY3JlZGVudGlhbHMgPSBvYXV0aDtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgdGhyb3cgb2F1dGg7XHJcbiAgfVxyXG59XHJcbiJdfQ==