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
const models_1 = require("../models");
const utils_1 = require("../utils");
const services_1 = require("../services");
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
        this.observable = new utils_1.Observable();
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
                return this.register(new models_1.User(Object.assign({}, user, { credentials: oauth })));
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
                return this.register(new models_1.User(Object.assign({}, user, { credentials: oauth })));
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
                return this.register(new models_1.User(Object.assign({}, user, { credentials: oauth })));
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
                    return this.register(new models_1.User({ id: oauth.userId, credentials: oauth }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXNzaW9uL1Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUE2QztBQUU3QyxvQ0FBNkQ7QUFDN0QsMENBQXNGO0FBQ3RGLGlEQUErRjtBQW9CL0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSDtJQVlFLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTmxDLGtCQUFhLEdBQXNCLEVBQUUsQ0FBQztRQU81QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksa0JBQVUsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLG1CQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0QsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMseUJBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyx5QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVHLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWpILCtCQUErQjtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLElBQUksNENBQTZCLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLElBQUksNkNBQThCLENBQUMsR0FBRyxFQUFFO2dCQUN0QyxJQUFJO29CQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMs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QUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNqRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzVCO2dCQUNELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtvQkFDckIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksYUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDMUU7YUFDRjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixNQUFNLEtBQUssQ0FBQzthQUNiO1lBRUQsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDO0tBQUE7O0FBak5hLDZCQUFxQixHQUFHLGlCQUFpQixDQUFDO0FBUjFELDBCQTBOQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXIsIFVzZXJTY2hlbWEgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XG5pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3IsIEh0dHBPcHRpb25zIH0gZnJvbSBcIi4uL2Jhc2VcIjtcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBTdG9yYWdlVXRpbCB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHsgT0F1dGhXZWJTZXJ2aWNlLCBPQXV0aFdlYlNlcnZpY2VPcHRpb25zLCBVc2VyV2ViU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IsIFNlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvciB9IGZyb20gXCIuL2ludGVyY2VwdG9yc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlc3Npb25PcHRpb25zIHtcbiAgaHR0cD86IEh0dHBPcHRpb25zO1xuICBvYXV0aD86IE9BdXRoV2ViU2VydmljZU9wdGlvbnM7XG4gIHN0b3JhZ2U/OiBTdG9yYWdlVXRpbDtcbiAgYXV0b0ZldGNoPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXNzd29yZEdyYW50T3B0aW9ucyB7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG4gIHNjb3Blcz86IHN0cmluZ1tdO1xuICBzY29wZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWZyZXNoR3JhbnRPcHRpb25zIHtcbiAgcmVmcmVzaFRva2VuOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3Rpb24gbGF5ZXIgdG8gc2VjdXJlbHkgc3RvcmUgYW5kIG1hbmFnZSBwbGF0Zm9ybSBjcmVkZW50aWFscy5cbiAqXG4gKiBUaGUgU2Vzc2lvbiBpcyBhIHNpbmdsZXRvbiwgc28geW91IG1heSBhY2Nlc3MgdGhlIGF1dGhlbnRpY2F0aW9uIHN0YXRlXG4gKiBhdCBhbnkgdGltZSwgaW4gYW55IGNvbnRleHQsIGdldHRpbmcgaXRzIGN1cnJlbnQgaW5zdGFuY2UuIEl0IGlzIGFsc29cbiAqIGFuIG9ic2VydmFibGUsIHNvIGl0IGNhbiBiZSB3YXRjaGVkIGZvciBjaGFuZ2VzOlxuICpcbiBgYGB0eXBlc2NyaXB0XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ2JpdGNhcGl0YWwtY29yZS1zZGsnO1xuXG4vLyBHZXRzIHRoZSBjdXJyZW50IFNlc3Npb24gaW5zdGFuY2VcbmNvbnN0IHNlc3Npb24gPSBiaXRjYXBpdGFsLnNlc3Npb24oKTtcblxuLy8gU2hvd3MgdGhlIGN1cnJlbnQgdXNlciBpbnN0YW5jZSwgaWYgYW55XG5jb25zb2xlLmxvZyhzZXNzaW9uLmN1cnJlbnQpO1xuXG4vLyBQcmVwYXJlIGEgbmV3IHNlc3Npb24gb2JzZXJ2ZXIgKHR5cGVzY3JpcHQgbm90YXRpb24pXG5jb25zdCBvYnNlcnZlcjogT2JzZXJ2ZXIgPSB7XG4gIHVwZGF0ZShldmVudDogc3RyaW5nLCBkYXRhOiBVc2VyKSB7XG4gICAgaWYoZXZlbnQgPT09IFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VEKSB7XG4gICAgICBjb25zb2xlLmxvZygnVXNlciBpbnN0YW5jZSBoYXMgY2hhbmdlZCBpbiBTZXNzaW9uJywgeyB1c2VyOiBkYXRhIH0pO1xuICAgIH1cbiAgfVxufTtcblxuLy8gU3RhcnQgbGlzdGVuaW5nIHRvIFNlc3Npb24gY2hhbmdlcywgc3VjaCBhcyBjcmVkZW50aWFsc1xuLy8gZXhwaXJhdGlvbiBvciBhIHJlZnJlc2hlZCBhY2Nlc3MgdG9rZW4uXG5zZXNzaW9uLnN1YnNjcmliZShvYnNlcnZlcik7XG5cbi8vIC4uLlxuXG4vLyBFdmVudHVhbGx5LCB5b3UgY2FuIGFsc28gc3RvcCBsaXN0ZW5pbmcgdG8gaXRzIGNoYW5nZXNcbnNlc3Npb24udW5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xuIGBgYFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXNzaW9uIHtcbiAgY3VycmVudD86IFVzZXI7XG4gIHN0b3JhZ2U6IFN0b3JhZ2VVdGlsO1xuICBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlO1xuICB1c2VyV2ViU2VydmljZTogVXNlcldlYlNlcnZpY2U7XG4gIG9hdXRoV2ViU2VydmljZTogT0F1dGhXZWJTZXJ2aWNlO1xuICBwcml2YXRlIF9pbnRlcmNlcHRvcnM6IEh0dHBJbnRlcmNlcHRvcltdID0gW107XG5cbiAgcHVibGljIHN0YXRpYyBFVkVOVF9TRVNTSU9OX0NIQU5HRUQgPSBcIlNFU1NJT05fQ0hBTkdFRFwiO1xuXG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IFNlc3Npb247XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IFNlc3Npb25PcHRpb25zKSB7XG4gICAgdGhpcy5vYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKTtcbiAgICB0aGlzLnN0b3JhZ2UgPSBvcHRpb25zLnN0b3JhZ2UgfHwgbmV3IFN0b3JhZ2VVdGlsKFwic2Vzc2lvblwiKTtcblxuICAgIC8vIFByZXBhcmUgd2ViIHNlcnZpY2VzXG4gICAgdGhpcy51c2VyV2ViU2VydmljZSA9IG9wdGlvbnMuaHR0cCA/IFVzZXJXZWJTZXJ2aWNlLmluaXRpYWxpemUob3B0aW9ucy5odHRwKSA6IFVzZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gICAgdGhpcy5vYXV0aFdlYlNlcnZpY2UgPSBvcHRpb25zLm9hdXRoID8gT0F1dGhXZWJTZXJ2aWNlLmluaXRpYWxpemUob3B0aW9ucy5vYXV0aCkgOiBPQXV0aFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcblxuICAgIC8vIFByZXBhcmUgU2Vzc2lvbiBpbnRlcmNlcHRvcnNcbiAgICB0aGlzLl9pbnRlcmNlcHRvcnMgPSBbXG4gICAgICBuZXcgU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IodGhpcyksXG4gICAgICBuZXcgU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yKCgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSB0aGlzLmN1cnJlbnQuY3JlZGVudGlhbHMgJiYgdGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzLnJlZnJlc2hUb2tlbjtcblxuICAgICAgICAgIGlmIChyZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSByZWZyZXNoIHRva2VuLCB0cnkgdG8gcmVmcmVzaCBpdFxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVG9rZW4oeyByZWZyZXNoVG9rZW4gfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5vIHJlZnJlc2ggdG9rZW4sIGp1c3QgZGVzdHJveSB0aGUgc2Vzc2lvblxuICAgICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIC8vIFJlZnJlc2ggdG9rZW4gYXV0aCBmYWlsZWQsIGRlc3Ryb3kgdGhlIHNlc3Npb25cbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICBdO1xuXG4gICAgLy8gRmV0Y2ggc2Vzc2lvbiBpbiBzdGFydHVwIGJ5IGRlZmF1bHRcbiAgICBpZiAoKG9wdGlvbnMuYXV0b0ZldGNoIGFzIGFueSkgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmZldGNoKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgU2Vzc2lvbiBpbnRlcmNlcHRvcnMgZm9yIGF1dGhvcml6ZWQgY2FsbHMgYW5kIGF1dG8gU2Vzc2lvbiBkZXN0cnVjdGlvbi5cbiAgICovXG4gIGludGVyY2VwdG9ycygpOiBIdHRwSW50ZXJjZXB0b3JbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVyY2VwdG9ycztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIFNlc3Npb24gc2luZ2xldG9uIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBTZXNzaW9uIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBTZXNzaW9uT3B0aW9ucyk6IFNlc3Npb24ge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgU2Vzc2lvbihvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgZm9yIHVwZGF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JzZXJ2ZXJ9IG9ic2VydmFibGUgVGhlIGluc3RhY2UgdG8gYmUgbm90aWZpZWQuXG4gICAqL1xuICBwdWJsaWMgc3Vic2NyaWJlKG9ic2VydmFibGU6IE9ic2VydmVyKSB7XG4gICAgdGhpcy5vYnNlcnZhYmxlLnN1YnNjcmliZShvYnNlcnZhYmxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHVwZGF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JzZXJ2ZXJ9IG9ic2VydmFibGUgVGhlIGluc3RhbmNlIHRvIGJlIHJlbW92ZWQgZnJvbSBsaXN0ZW5lcnMuXG4gICAqL1xuICBwdWJsaWMgdW5zdWJzY3JpYmUob2JzZXJ2YWJsZTogT2JzZXJ2ZXIpIHtcbiAgICB0aGlzLm9ic2VydmFibGUudW5zdWJzY3JpYmUob2JzZXJ2YWJsZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBuZXcgVXNlciBpbiBzZXNzaW9uLCBub3RpZnlpbmcgYWxsIG9ic2VydmVycy5cbiAgICpcbiAgICogQHBhcmFtIHVzZXIgVGhlIFVzZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7e25vdGlmeTogYm9vbGVhbn19IG9wdGlvbnMgVGhlIG9wZXJhdGlvbiBvcHRpb25zLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJlZ2lzdGVyKHVzZXI6IFVzZXIsIG9wdGlvbnMgPSB7IG5vdGlmeTogdHJ1ZSB9KSB7XG4gICAgdGhpcy5jdXJyZW50ID0gdXNlcjtcblxuICAgIC8vIFNhdmUgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5wdXQoXCJzZXNzaW9uXCIsIHRoaXMuY3VycmVudCk7XG5cbiAgICAvLyBBdCBsYXN0LCBub3RpZnkgb2JzZXJ2ZXJzIG9mIHRoaXMgY2hhbmdlXG4gICAgaWYgKCFvcHRpb25zIHx8IChvcHRpb25zICYmIG9wdGlvbnMubm90aWZ5KSkge1xuICAgICAgYXdhaXQgdGhpcy5vYnNlcnZhYmxlLm5vdGlmeShTZXNzaW9uLkVWRU5UX1NFU1NJT05fQ0hBTkdFRCwgdGhpcy5jdXJyZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCB0aGUgY3VycmVudGx5IHN0b3JlZCBTZXNzaW9uIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICovXG4gIHByb3RlY3RlZCBhc3luYyBmZXRjaCgpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSBhd2FpdCB0aGlzLnN0b3JhZ2UuZ2V0KFwic2Vzc2lvblwiKTtcbiAgICBhd2FpdCB0aGlzLm9ic2VydmFibGUubm90aWZ5KFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VELCB0aGlzLmN1cnJlbnQpO1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmVsb2FkIHRoZSBjdXJyZW50IFVzZXIgdXNpbmcgdGhlIHJlbW90ZSBzZXJ2ZXIuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVsb2FkKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IG9hdXRoID0gdGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzO1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xuICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIobmV3IFVzZXIoeyAuLi51c2VyLCBjcmVkZW50aWFsczogb2F1dGggfSBhcyBVc2VyU2NoZW1hKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIFNlc3Npb24gYW5kIGNsZWFycyB0aGUgc3RvcmFnZS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95KCkge1xuICAgIHRoaXMuY3VycmVudCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIERlc3Ryb3lzIGluIGxvY2FsIHN0b3JhZ2VcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcblxuICAgIC8vIEF0IGxhc3QsIG5vdGlmeSBvYnNlcnZlcnMgb2YgdGhpcyBjaGFuZ2VcbiAgICBhd2FpdCB0aGlzLm9ic2VydmFibGUubm90aWZ5KFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VELCB0aGlzLmN1cnJlbnQpO1xuXG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xuICAgICAgLy8gUmV2b2tlcyB0aGUgdG9rZW4gaW4gdGhlIE9BdXRoIFNlcnZlclxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5vYXV0aFdlYlNlcnZpY2UucmV2b2tlKHRoaXMuY3VycmVudC5jcmVkZW50aWFscy5hY2Nlc3NUb2tlbik7XG4gICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiU0VTU0lPTjogQ291bGQgbm90IGRlc3Ryb3kgY3VycmVudCBzZXNzaW9uXCIsIGV4Y2VwdGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgXCJwYXNzd29yZFwiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyIGFuZCByZWdpc3RlcnMgaXQgaW4gY3VycmVudCBTZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgVXNlciBjcmVkZW50aWFscy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBwYXNzd29yZChkYXRhOiBQYXNzd29yZEdyYW50T3B0aW9ucyk6IFByb21pc2U8VXNlcj4ge1xuICAgIGNvbnN0IG9hdXRoID0gYXdhaXQgdGhpcy5vYXV0aFdlYlNlcnZpY2UucGFzc3dvcmQoe1xuICAgICAgdXNlcm5hbWU6IGRhdGEudXNlcm5hbWUsXG4gICAgICBwYXNzd29yZDogZGF0YS5wYXNzd29yZCxcbiAgICAgIHNjb3BlOiBkYXRhLnNjb3BlcyA/IGRhdGEuc2NvcGVzLmpvaW4oXCIsXCIpIDogZGF0YS5zY29wZVxuICAgIH0pO1xuXG4gICAgaWYgKCFvYXV0aC5hY2Nlc3NUb2tlbikge1xuICAgICAgdGhyb3cgb2F1dGg7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJXZWJTZXJ2aWNlLm1lKG9hdXRoKTtcbiAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgLi4udXNlciwgY3JlZGVudGlhbHM6IG9hdXRoIH0gYXMgVXNlclNjaGVtYSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBlcnJvci5jcmVkZW50aWFscyA9IG9hdXRoO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgXCJyZWZyZXNoX3Rva2VuXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIgYW5kIHJlZ2lzdGVycyBpdCBpbiBjdXJyZW50IHNlc3Npb24uXG4gICAqIFRoaXMgbWV0aG9kIGlzIGF1dG9tYXRpY2FsbHkgY2FsbGVkIG9uIHJlcXVlc3RzIHRoYXQgcmV0dXJuIDQwMVxuICAgKlxuICAgKiBAcGFyYW0ge1JlZnJlc2hHcmFudE9wdGlvbnN9IGRhdGFcbiAgICovXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoVG9rZW4oZGF0YTogUmVmcmVzaEdyYW50T3B0aW9ucykge1xuICAgIGNvbnN0IG9hdXRoID0gYXdhaXQgdGhpcy5vYXV0aFdlYlNlcnZpY2UucmVmcmVzaFRva2VuKHtcbiAgICAgIHJlZnJlc2hUb2tlbjogZGF0YS5yZWZyZXNoVG9rZW5cbiAgICB9KTtcblxuICAgIGlmICghb2F1dGguYWNjZXNzVG9rZW4pIHtcbiAgICAgIHRocm93IG9hdXRoO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyV2ViU2VydmljZS5tZShvYXV0aCk7XG4gICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IC4uLnVzZXIsIGNyZWRlbnRpYWxzOiBvYXV0aCB9IGFzIFVzZXJTY2hlbWEpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgZXJyb3IuY3JlZGVudGlhbHMgPSBvYXV0aDtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgXCJjbGllbnRfY3JlZGVudGlhbHNcIiBhdXRoZW50aWNhdGlvbiB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlciBhbmQgcmVnaXN0ZXJzIGl0IGluIGN1cnJlbnQgU2Vzc2lvbi5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBjbGllbnRDcmVkZW50aWFscygpOiBQcm9taXNlPFVzZXI+IHtcbiAgICAvLyBUaGUgY2xpZW50IElEIGFuZCBjbGllbnQgc2VjcmV0IHdpbGwgYmUgcGFzc2VkIGJ5IHRoZSBPQXV0aFdlYlNlcnZpY2VcbiAgICBjb25zdCBvYXV0aCA9IGF3YWl0IHRoaXMub2F1dGhXZWJTZXJ2aWNlLmNsaWVudENyZWRlbnRpYWxzKCk7XG5cbiAgICB0cnkge1xuICAgICAgaWYgKG9hdXRoLmFjY2Vzc1Rva2VuICYmICFvYXV0aC52aXJ0dWFsKSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJXZWJTZXJ2aWNlLm1lKG9hdXRoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIodXNlcik7XG4gICAgICB9XG4gICAgICBpZiAob2F1dGguYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIobmV3IFVzZXIoeyBpZDogb2F1dGgudXNlcklkLCBjcmVkZW50aWFsczogb2F1dGggfSkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBlcnJvci5jcmVkZW50aWFscyA9IG9hdXRoO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgdGhyb3cgb2F1dGg7XG4gIH1cbn1cbiJdfQ==