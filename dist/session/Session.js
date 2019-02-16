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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXNzaW9uL1Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQUE0RjtBQUM1RiwwQ0FBc0Y7QUFFdEYsb0NBQXVDO0FBQ3ZDLGlEQUErRjtBQW9CL0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxNQUFxQixPQUFPO0lBYTFCLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTmxDLGtCQUFhLEdBQXNCLEVBQUUsQ0FBQztRQU81QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksOEJBQVUsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLG1CQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0QsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUc7WUFDbkIsSUFBSSw0Q0FBNkIsQ0FBQyxJQUFJLENBQUM7WUFDdkMsSUFBSSw2Q0FBOEIsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3RDLElBQUk7b0JBQ0YsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO29CQUV2RixJQUFJLFlBQVksRUFBRTt3QkFDaEIsZ0RBQWdEO3dCQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztxQkFDckM7eUJBQU07d0JBQ0wsNkNBQTZDO3dCQUM3QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7cUJBQ2hCO2lCQUNGO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLGlEQUFpRDtvQkFDakQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUNoQjtZQUNILENBQUMsQ0FBQztTQUNILENBQUM7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QU0sS0FBSyxDQUFDO2FBQ2I7UUFDSCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLGlCQUFpQjs7WUFDNUIsd0VBQXdFO1lBQ3hFLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBRTdELElBQUk7Z0JBQ0YsSUFBSSxLQUFLLENBQUMsV0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtvQkFDdkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QjtnQkFDRCxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUU7b0JBQ3JCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLHdCQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUMxRTthQUNGO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQzFCLE1BQU0sS0FBSyxDQUFDO2FBQ2I7WUFFRCxNQUFNLEtBQUssQ0FBQztRQUNkLENBQUM7S0FBQTs7QUEvTmEsNkJBQXFCLEdBQUcsaUJBQWlCLENBQUM7QUFUMUQsMEJBeU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlciwgVXNlclNjaGVtYSwgSHR0cEludGVyY2VwdG9yLCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xuaW1wb3J0IHsgT0F1dGhXZWJTZXJ2aWNlLCBPQXV0aFdlYlNlcnZpY2VPcHRpb25zLCBVc2VyV2ViU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi4vc2VydmljZXMvYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XG5pbXBvcnQgeyBTdG9yYWdlVXRpbCB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHsgU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IsIFNlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvciB9IGZyb20gXCIuL2ludGVyY2VwdG9yc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlc3Npb25PcHRpb25zIHtcbiAgaHR0cD86IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zO1xuICBvYXV0aD86IE9BdXRoV2ViU2VydmljZU9wdGlvbnM7XG4gIHN0b3JhZ2U/OiBTdG9yYWdlVXRpbDtcbiAgYXV0b0ZldGNoPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXNzd29yZEdyYW50T3B0aW9ucyB7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG4gIHNjb3Blcz86IHN0cmluZ1tdO1xuICBzY29wZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWZyZXNoR3JhbnRPcHRpb25zIHtcbiAgcmVmcmVzaFRva2VuOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3Rpb24gbGF5ZXIgdG8gc2VjdXJlbHkgc3RvcmUgYW5kIG1hbmFnZSBwbGF0Zm9ybSBjcmVkZW50aWFscy5cbiAqXG4gKiBUaGUgU2Vzc2lvbiBpcyBhIHNpbmdsZXRvbiwgc28geW91IG1heSBhY2Nlc3MgdGhlIGF1dGhlbnRpY2F0aW9uIHN0YXRlXG4gKiBhdCBhbnkgdGltZSwgaW4gYW55IGNvbnRleHQsIGdldHRpbmcgaXRzIGN1cnJlbnQgaW5zdGFuY2UuIEl0IGlzIGFsc29cbiAqIGFuIG9ic2VydmFibGUsIHNvIGl0IGNhbiBiZSB3YXRjaGVkIGZvciBjaGFuZ2VzOlxuICpcbiBgYGB0eXBlc2NyaXB0XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ2JpdGNhcGl0YWwtY29yZS1zZGsnO1xuXG4vLyBHZXRzIHRoZSBjdXJyZW50IFNlc3Npb24gaW5zdGFuY2VcbmNvbnN0IHNlc3Npb24gPSBiaXRjYXBpdGFsLnNlc3Npb24oKTtcblxuLy8gU2hvd3MgdGhlIGN1cnJlbnQgdXNlciBpbnN0YW5jZSwgaWYgYW55XG5jb25zb2xlLmxvZyhzZXNzaW9uLmN1cnJlbnQpO1xuXG4vLyBQcmVwYXJlIGEgbmV3IHNlc3Npb24gb2JzZXJ2ZXIgKHR5cGVzY3JpcHQgbm90YXRpb24pXG5jb25zdCBvYnNlcnZlcjogT2JzZXJ2ZXIgPSB7XG4gIHVwZGF0ZShldmVudDogc3RyaW5nLCBkYXRhOiBVc2VyKSB7XG4gICAgaWYoZXZlbnQgPT09IFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VEKSB7XG4gICAgICBjb25zb2xlLmxvZygnVXNlciBpbnN0YW5jZSBoYXMgY2hhbmdlZCBpbiBTZXNzaW9uJywgeyB1c2VyOiBkYXRhIH0pO1xuICAgIH1cbiAgfVxufTtcblxuLy8gU3RhcnQgbGlzdGVuaW5nIHRvIFNlc3Npb24gY2hhbmdlcywgc3VjaCBhcyBjcmVkZW50aWFsc1xuLy8gZXhwaXJhdGlvbiBvciBhIHJlZnJlc2hlZCBhY2Nlc3MgdG9rZW4uXG5zZXNzaW9uLnN1YnNjcmliZShvYnNlcnZlcik7XG5cbi8vIC4uLlxuXG4vLyBFdmVudHVhbGx5LCB5b3UgY2FuIGFsc28gc3RvcCBsaXN0ZW5pbmcgdG8gaXRzIGNoYW5nZXNcbnNlc3Npb24udW5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xuIGBgYFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXNzaW9uIHtcbiAgY3VycmVudD86IFVzZXI7XG4gIHN0b3JhZ2U6IFN0b3JhZ2VVdGlsO1xuICBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlO1xuICB1c2VyV2ViU2VydmljZTogVXNlcldlYlNlcnZpY2U7XG4gIG9hdXRoV2ViU2VydmljZTogT0F1dGhXZWJTZXJ2aWNlO1xuICBwcml2YXRlIF9mZXRjaFByb21pc2U/OiBQcm9taXNlPFVzZXI+O1xuICBwcml2YXRlIF9pbnRlcmNlcHRvcnM6IEh0dHBJbnRlcmNlcHRvcltdID0gW107XG5cbiAgcHVibGljIHN0YXRpYyBFVkVOVF9TRVNTSU9OX0NIQU5HRUQgPSBcIlNFU1NJT05fQ0hBTkdFRFwiO1xuXG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IFNlc3Npb247XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IFNlc3Npb25PcHRpb25zKSB7XG4gICAgdGhpcy5vYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKTtcbiAgICB0aGlzLnN0b3JhZ2UgPSBvcHRpb25zLnN0b3JhZ2UgfHwgbmV3IFN0b3JhZ2VVdGlsKFwic2Vzc2lvblwiKTtcblxuICAgIC8vIFByZXBhcmUgU2Vzc2lvbiBpbnRlcmNlcHRvcnNcbiAgICB0aGlzLl9pbnRlcmNlcHRvcnMgPSBbXG4gICAgICBuZXcgU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IodGhpcyksXG4gICAgICBuZXcgU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yKCgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSB0aGlzLmN1cnJlbnQuY3JlZGVudGlhbHMgJiYgdGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzLnJlZnJlc2hUb2tlbjtcblxuICAgICAgICAgIGlmIChyZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSByZWZyZXNoIHRva2VuLCB0cnkgdG8gcmVmcmVzaCBpdFxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVG9rZW4oeyByZWZyZXNoVG9rZW4gfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5vIHJlZnJlc2ggdG9rZW4sIGp1c3QgZGVzdHJveSB0aGUgc2Vzc2lvblxuICAgICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIC8vIFJlZnJlc2ggdG9rZW4gYXV0aCBmYWlsZWQsIGRlc3Ryb3kgdGhlIHNlc3Npb25cbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICBdO1xuXG4gICAgLy8gUHJlcGFyZSBpbm5lciB3ZWIgc2VydmljZXNcbiAgICB0aGlzLnVzZXJXZWJTZXJ2aWNlID0gb3B0aW9ucy5odHRwXG4gICAgICA/IFVzZXJXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLCAuLi5vcHRpb25zLmh0dHAgfSlcbiAgICAgIDogVXNlcldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgICB0aGlzLm9hdXRoV2ViU2VydmljZSA9IG9wdGlvbnMub2F1dGhcbiAgICAgID8gT0F1dGhXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zLm9hdXRoIH0pXG4gICAgICA6IE9BdXRoV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8gRmV0Y2ggc2Vzc2lvbiBpbiBzdGFydHVwIGJ5IGRlZmF1bHRcbiAgICBpZiAoKG9wdGlvbnMuYXV0b0ZldGNoIGFzIGFueSkgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLl9mZXRjaFByb21pc2UgPSB0aGlzLmZldGNoKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgU2Vzc2lvbiBpbnRlcmNlcHRvcnMgZm9yIGF1dGhvcml6ZWQgY2FsbHMgYW5kIGF1dG8gU2Vzc2lvbiBkZXN0cnVjdGlvbi5cbiAgICovXG4gIGludGVyY2VwdG9ycygpOiBIdHRwSW50ZXJjZXB0b3JbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVyY2VwdG9ycztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIFNlc3Npb24gc2luZ2xldG9uIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBTZXNzaW9uIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBTZXNzaW9uT3B0aW9ucyk6IFNlc3Npb24ge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgU2Vzc2lvbihvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgZm9yIHVwZGF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JzZXJ2ZXJ9IG9ic2VydmFibGUgVGhlIGluc3RhY2UgdG8gYmUgbm90aWZpZWQuXG4gICAqL1xuICBwdWJsaWMgc3Vic2NyaWJlKG9ic2VydmFibGU6IE9ic2VydmVyKSB7XG4gICAgdGhpcy5vYnNlcnZhYmxlLnN1YnNjcmliZShvYnNlcnZhYmxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHVwZGF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JzZXJ2ZXJ9IG9ic2VydmFibGUgVGhlIGluc3RhbmNlIHRvIGJlIHJlbW92ZWQgZnJvbSBsaXN0ZW5lcnMuXG4gICAqL1xuICBwdWJsaWMgdW5zdWJzY3JpYmUob2JzZXJ2YWJsZTogT2JzZXJ2ZXIpIHtcbiAgICB0aGlzLm9ic2VydmFibGUudW5zdWJzY3JpYmUob2JzZXJ2YWJsZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHByb21pc2UgdG8gYXdhaXQgZmV0Y2hpbmcgY29tcGxldGlvbi5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBvbkZldGNoKCkge1xuICAgIGlmKCF0aGlzLl9mZXRjaFByb21pc2UpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5jdXJyZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2ZldGNoUHJvbWlzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIG5ldyBVc2VyIGluIHNlc3Npb24sIG5vdGlmeWluZyBhbGwgb2JzZXJ2ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0gdXNlciBUaGUgVXNlciBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHt7bm90aWZ5OiBib29sZWFufX0gb3B0aW9ucyBUaGUgb3BlcmF0aW9uIG9wdGlvbnMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXIodXNlcjogVXNlciwgb3B0aW9ucyA9IHsgbm90aWZ5OiB0cnVlIH0pIHtcbiAgICB0aGlzLmN1cnJlbnQgPSB1c2VyO1xuXG4gICAgLy8gU2F2ZSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLnB1dChcInNlc3Npb25cIiwgdGhpcy5jdXJyZW50KTtcblxuICAgIC8vIEF0IGxhc3QsIG5vdGlmeSBvYnNlcnZlcnMgb2YgdGhpcyBjaGFuZ2VcbiAgICBpZiAoIW9wdGlvbnMgfHwgKG9wdGlvbnMgJiYgb3B0aW9ucy5ub3RpZnkpKSB7XG4gICAgICBhd2FpdCB0aGlzLm9ic2VydmFibGUubm90aWZ5KFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VELCB0aGlzLmN1cnJlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIHRoZSBjdXJyZW50bHkgc3RvcmVkIFNlc3Npb24gZnJvbSBsb2NhbCBzdG9yYWdlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIGZldGNoKCkge1xuICAgIHRoaXMuY3VycmVudCA9IGF3YWl0IHRoaXMuc3RvcmFnZS5nZXQoXCJzZXNzaW9uXCIpO1xuICAgIGF3YWl0IHRoaXMub2JzZXJ2YWJsZS5ub3RpZnkoU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQsIHRoaXMuY3VycmVudCk7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWxvYWQgdGhlIGN1cnJlbnQgVXNlciB1c2luZyB0aGUgcmVtb3RlIHNlcnZlci5cbiAgICovXG4gIHB1YmxpYyBhc3luYyByZWxvYWQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xuICAgICAgY29uc3Qgb2F1dGggPSB0aGlzLmN1cnJlbnQuY3JlZGVudGlhbHM7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyV2ViU2VydmljZS5tZShvYXV0aCk7XG4gICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IC4uLnVzZXIsIGNyZWRlbnRpYWxzOiBvYXV0aCB9IGFzIFVzZXJTY2hlbWEpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgU2Vzc2lvbiBhbmQgY2xlYXJzIHRoZSBzdG9yYWdlLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5jdXJyZW50ID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gRGVzdHJveXMgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5jbGVhcigpO1xuXG4gICAgLy8gQXQgbGFzdCwgbm90aWZ5IG9ic2VydmVycyBvZiB0aGlzIGNoYW5nZVxuICAgIGF3YWl0IHRoaXMub2JzZXJ2YWJsZS5ub3RpZnkoU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQsIHRoaXMuY3VycmVudCk7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50KSB7XG4gICAgICAvLyBSZXZva2VzIHRoZSB0b2tlbiBpbiB0aGUgT0F1dGggU2VydmVyXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5yZXZva2UodGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzLmFjY2Vzc1Rva2VuKTtcbiAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJTRVNTSU9OOiBDb3VsZCBub3QgZGVzdHJveSBjdXJyZW50IHNlc3Npb25cIiwgZXhjZXB0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBcInBhc3N3b3JkXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIgYW5kIHJlZ2lzdGVycyBpdCBpbiBjdXJyZW50IFNlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBVc2VyIGNyZWRlbnRpYWxzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHBhc3N3b3JkKGRhdGE6IFBhc3N3b3JkR3JhbnRPcHRpb25zKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgY29uc3Qgb2F1dGggPSBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5wYXNzd29yZCh7XG4gICAgICB1c2VybmFtZTogZGF0YS51c2VybmFtZSxcbiAgICAgIHBhc3N3b3JkOiBkYXRhLnBhc3N3b3JkLFxuICAgICAgc2NvcGU6IGRhdGEuc2NvcGVzID8gZGF0YS5zY29wZXMuam9pbihcIixcIikgOiBkYXRhLnNjb3BlXG4gICAgfSk7XG5cbiAgICBpZiAoIW9hdXRoLmFjY2Vzc1Rva2VuKSB7XG4gICAgICB0aHJvdyBvYXV0aDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xuICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIobmV3IFVzZXIoeyAuLi51c2VyLCBjcmVkZW50aWFsczogb2F1dGggfSBhcyBVc2VyU2NoZW1hKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGVycm9yLmNyZWRlbnRpYWxzID0gb2F1dGg7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBcInJlZnJlc2hfdG9rZW5cIiBhdXRoZW50aWNhdGlvbiB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlciBhbmQgcmVnaXN0ZXJzIGl0IGluIGN1cnJlbnQgc2Vzc2lvbi5cbiAgICogVGhpcyBtZXRob2QgaXMgYXV0b21hdGljYWxseSBjYWxsZWQgb24gcmVxdWVzdHMgdGhhdCByZXR1cm4gNDAxXG4gICAqXG4gICAqIEBwYXJhbSB7UmVmcmVzaEdyYW50T3B0aW9uc30gZGF0YVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJlZnJlc2hUb2tlbihkYXRhOiBSZWZyZXNoR3JhbnRPcHRpb25zKSB7XG4gICAgY29uc3Qgb2F1dGggPSBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5yZWZyZXNoVG9rZW4oe1xuICAgICAgcmVmcmVzaFRva2VuOiBkYXRhLnJlZnJlc2hUb2tlblxuICAgIH0pO1xuXG4gICAgaWYgKCFvYXV0aC5hY2Nlc3NUb2tlbikge1xuICAgICAgdGhyb3cgb2F1dGg7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJXZWJTZXJ2aWNlLm1lKG9hdXRoKTtcbiAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgLi4udXNlciwgY3JlZGVudGlhbHM6IG9hdXRoIH0gYXMgVXNlclNjaGVtYSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBlcnJvci5jcmVkZW50aWFscyA9IG9hdXRoO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBcImNsaWVudF9jcmVkZW50aWFsc1wiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyIGFuZCByZWdpc3RlcnMgaXQgaW4gY3VycmVudCBTZXNzaW9uLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNsaWVudENyZWRlbnRpYWxzKCk6IFByb21pc2U8VXNlcj4ge1xuICAgIC8vIFRoZSBjbGllbnQgSUQgYW5kIGNsaWVudCBzZWNyZXQgd2lsbCBiZSBwYXNzZWQgYnkgdGhlIE9BdXRoV2ViU2VydmljZVxuICAgIGNvbnN0IG9hdXRoID0gYXdhaXQgdGhpcy5vYXV0aFdlYlNlcnZpY2UuY2xpZW50Q3JlZGVudGlhbHMoKTtcblxuICAgIHRyeSB7XG4gICAgICBpZiAob2F1dGguYWNjZXNzVG9rZW4gJiYgIW9hdXRoLnZpcnR1YWwpIHtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3Rlcih1c2VyKTtcbiAgICAgIH1cbiAgICAgIGlmIChvYXV0aC5hY2Nlc3NUb2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IGlkOiBvYXV0aC51c2VySWQsIGNyZWRlbnRpYWxzOiBvYXV0aCB9KSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGVycm9yLmNyZWRlbnRpYWxzID0gb2F1dGg7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICB0aHJvdyBvYXV0aDtcbiAgfVxufVxuIl19