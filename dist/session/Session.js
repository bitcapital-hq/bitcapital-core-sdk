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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXNzaW9uL1Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQUE0RjtBQUM1RiwwQ0FBc0Y7QUFFdEYsb0NBQXVDO0FBQ3ZDLGlEQUErRjtBQW9CL0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxNQUFxQixPQUFPO0lBWTFCLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTmxDLGtCQUFhLEdBQXNCLEVBQUUsQ0FBQztRQU81QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksOEJBQVUsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLG1CQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0QsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMseUJBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyx5QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVHLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWpILCtCQUErQjtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLElBQUksNENBQTZCLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLElBQUksNkNBQThCLENBQUMsR0FBRyxFQUFFO2dCQUN0QyxJQUFJO29CQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksQ0FB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QUksR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNqRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzVCO2dCQUNELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtvQkFDckIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksd0JBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzFFO2FBQ0Y7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxLQUFLLENBQUM7YUFDYjtZQUVELE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQztLQUFBOztBQWpOYSw2QkFBcUIsR0FBRyxpQkFBaUIsQ0FBQztBQVIxRCwwQkEwTkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyLCBVc2VyU2NoZW1hLCBIdHRwSW50ZXJjZXB0b3IsIE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XG5pbXBvcnQgeyBPQXV0aFdlYlNlcnZpY2UsIE9BdXRoV2ViU2VydmljZU9wdGlvbnMsIFVzZXJXZWJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuLi9zZXJ2aWNlcy9iYXNlL0Jhc2VNb2RlbFdlYlNlcnZpY2VcIjtcbmltcG9ydCB7IFN0b3JhZ2VVdGlsIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgeyBTZXNzaW9uQ3JlZGVudGlhbHNJbnRlcmNlcHRvciwgU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yIH0gZnJvbSBcIi4vaW50ZXJjZXB0b3JzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2Vzc2lvbk9wdGlvbnMge1xuICBodHRwPzogQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnM7XG4gIG9hdXRoPzogT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucztcbiAgc3RvcmFnZT86IFN0b3JhZ2VVdGlsO1xuICBhdXRvRmV0Y2g/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhc3N3b3JkR3JhbnRPcHRpb25zIHtcbiAgdXNlcm5hbWU6IHN0cmluZztcbiAgcGFzc3dvcmQ6IHN0cmluZztcbiAgc2NvcGVzPzogc3RyaW5nW107XG4gIHNjb3BlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlZnJlc2hHcmFudE9wdGlvbnMge1xuICByZWZyZXNoVG9rZW46IHN0cmluZztcbn1cblxuLyoqXG4gKiBBbiBhYnN0cmFjdGlvbiBsYXllciB0byBzZWN1cmVseSBzdG9yZSBhbmQgbWFuYWdlIHBsYXRmb3JtIGNyZWRlbnRpYWxzLlxuICpcbiAqIFRoZSBTZXNzaW9uIGlzIGEgc2luZ2xldG9uLCBzbyB5b3UgbWF5IGFjY2VzcyB0aGUgYXV0aGVudGljYXRpb24gc3RhdGVcbiAqIGF0IGFueSB0aW1lLCBpbiBhbnkgY29udGV4dCwgZ2V0dGluZyBpdHMgY3VycmVudCBpbnN0YW5jZS4gSXQgaXMgYWxzb1xuICogYW4gb2JzZXJ2YWJsZSwgc28gaXQgY2FuIGJlIHdhdGNoZWQgZm9yIGNoYW5nZXM6XG4gKlxuIGBgYHR5cGVzY3JpcHRcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAnYml0Y2FwaXRhbC1jb3JlLXNkayc7XG5cbi8vIEdldHMgdGhlIGN1cnJlbnQgU2Vzc2lvbiBpbnN0YW5jZVxuY29uc3Qgc2Vzc2lvbiA9IGJpdGNhcGl0YWwuc2Vzc2lvbigpO1xuXG4vLyBTaG93cyB0aGUgY3VycmVudCB1c2VyIGluc3RhbmNlLCBpZiBhbnlcbmNvbnNvbGUubG9nKHNlc3Npb24uY3VycmVudCk7XG5cbi8vIFByZXBhcmUgYSBuZXcgc2Vzc2lvbiBvYnNlcnZlciAodHlwZXNjcmlwdCBub3RhdGlvbilcbmNvbnN0IG9ic2VydmVyOiBPYnNlcnZlciA9IHtcbiAgdXBkYXRlKGV2ZW50OiBzdHJpbmcsIGRhdGE6IFVzZXIpIHtcbiAgICBpZihldmVudCA9PT0gU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGluc3RhbmNlIGhhcyBjaGFuZ2VkIGluIFNlc3Npb24nLCB7IHVzZXI6IGRhdGEgfSk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBTdGFydCBsaXN0ZW5pbmcgdG8gU2Vzc2lvbiBjaGFuZ2VzLCBzdWNoIGFzIGNyZWRlbnRpYWxzXG4vLyBleHBpcmF0aW9uIG9yIGEgcmVmcmVzaGVkIGFjY2VzcyB0b2tlbi5cbnNlc3Npb24uc3Vic2NyaWJlKG9ic2VydmVyKTtcblxuLy8gLi4uXG5cbi8vIEV2ZW50dWFsbHksIHlvdSBjYW4gYWxzbyBzdG9wIGxpc3RlbmluZyB0byBpdHMgY2hhbmdlc1xuc2Vzc2lvbi51bnN1YnNjcmliZShvYnNlcnZlcik7XG4gYGBgXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlc3Npb24ge1xuICBjdXJyZW50PzogVXNlcjtcbiAgc3RvcmFnZTogU3RvcmFnZVV0aWw7XG4gIG9ic2VydmFibGU6IE9ic2VydmFibGU7XG4gIHVzZXJXZWJTZXJ2aWNlOiBVc2VyV2ViU2VydmljZTtcbiAgb2F1dGhXZWJTZXJ2aWNlOiBPQXV0aFdlYlNlcnZpY2U7XG4gIHByaXZhdGUgX2ludGVyY2VwdG9yczogSHR0cEludGVyY2VwdG9yW10gPSBbXTtcblxuICBwdWJsaWMgc3RhdGljIEVWRU5UX1NFU1NJT05fQ0hBTkdFRCA9IFwiU0VTU0lPTl9DSEFOR0VEXCI7XG5cbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogU2Vzc2lvbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogU2Vzc2lvbk9wdGlvbnMpIHtcbiAgICB0aGlzLm9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuc3RvcmFnZSA9IG9wdGlvbnMuc3RvcmFnZSB8fCBuZXcgU3RvcmFnZVV0aWwoXCJzZXNzaW9uXCIpO1xuXG4gICAgLy8gUHJlcGFyZSB3ZWIgc2VydmljZXNcbiAgICB0aGlzLnVzZXJXZWJTZXJ2aWNlID0gb3B0aW9ucy5odHRwID8gVXNlcldlYlNlcnZpY2UuaW5pdGlhbGl6ZShvcHRpb25zLmh0dHApIDogVXNlcldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgICB0aGlzLm9hdXRoV2ViU2VydmljZSA9IG9wdGlvbnMub2F1dGggPyBPQXV0aFdlYlNlcnZpY2UuaW5pdGlhbGl6ZShvcHRpb25zLm9hdXRoKSA6IE9BdXRoV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8gUHJlcGFyZSBTZXNzaW9uIGludGVyY2VwdG9yc1xuICAgIHRoaXMuX2ludGVyY2VwdG9ycyA9IFtcbiAgICAgIG5ldyBTZXNzaW9uQ3JlZGVudGlhbHNJbnRlcmNlcHRvcih0aGlzKSxcbiAgICAgIG5ldyBTZXNzaW9uVW5hdXRob3JpemVkSW50ZXJjZXB0b3IoKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IHRoaXMuY3VycmVudC5jcmVkZW50aWFscyAmJiB0aGlzLmN1cnJlbnQuY3JlZGVudGlhbHMucmVmcmVzaFRva2VuO1xuXG4gICAgICAgICAgaWYgKHJlZnJlc2hUb2tlbikge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBhIHJlZnJlc2ggdG9rZW4sIHRyeSB0byByZWZyZXNoIGl0XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hUb2tlbih7IHJlZnJlc2hUb2tlbiB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTm8gcmVmcmVzaCB0b2tlbiwganVzdCBkZXN0cm95IHRoZSBzZXNzaW9uXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgLy8gUmVmcmVzaCB0b2tlbiBhdXRoIGZhaWxlZCwgZGVzdHJveSB0aGUgc2Vzc2lvblxuICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIF07XG5cbiAgICAvLyBGZXRjaCBzZXNzaW9uIGluIHN0YXJ0dXAgYnkgZGVmYXVsdFxuICAgIGlmICgob3B0aW9ucy5hdXRvRmV0Y2ggYXMgYW55KSAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZmV0Y2goKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBTZXNzaW9uIGludGVyY2VwdG9ycyBmb3IgYXV0aG9yaXplZCBjYWxscyBhbmQgYXV0byBTZXNzaW9uIGRlc3RydWN0aW9uLlxuICAgKi9cbiAgaW50ZXJjZXB0b3JzKCk6IEh0dHBJbnRlcmNlcHRvcltdIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJjZXB0b3JzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgU2Vzc2lvbiBzaW5nbGV0b24gaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFNlc3Npb24ge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IFNlc3Npb25PcHRpb25zKTogU2Vzc2lvbiB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBTZXNzaW9uKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSBmb3IgdXBkYXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtPYnNlcnZlcn0gb2JzZXJ2YWJsZSBUaGUgaW5zdGFjZSB0byBiZSBub3RpZmllZC5cbiAgICovXG4gIHB1YmxpYyBzdWJzY3JpYmUob2JzZXJ2YWJsZTogT2JzZXJ2ZXIpIHtcbiAgICB0aGlzLm9ic2VydmFibGUuc3Vic2NyaWJlKG9ic2VydmFibGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlIGZyb20gdXBkYXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtPYnNlcnZlcn0gb2JzZXJ2YWJsZSBUaGUgaW5zdGFuY2UgdG8gYmUgcmVtb3ZlZCBmcm9tIGxpc3RlbmVycy5cbiAgICovXG4gIHB1YmxpYyB1bnN1YnNjcmliZShvYnNlcnZhYmxlOiBPYnNlcnZlcikge1xuICAgIHRoaXMub2JzZXJ2YWJsZS51bnN1YnNjcmliZShvYnNlcnZhYmxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIG5ldyBVc2VyIGluIHNlc3Npb24sIG5vdGlmeWluZyBhbGwgb2JzZXJ2ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0gdXNlciBUaGUgVXNlciBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHt7bm90aWZ5OiBib29sZWFufX0gb3B0aW9ucyBUaGUgb3BlcmF0aW9uIG9wdGlvbnMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXIodXNlcjogVXNlciwgb3B0aW9ucyA9IHsgbm90aWZ5OiB0cnVlIH0pIHtcbiAgICB0aGlzLmN1cnJlbnQgPSB1c2VyO1xuXG4gICAgLy8gU2F2ZSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLnB1dChcInNlc3Npb25cIiwgdGhpcy5jdXJyZW50KTtcblxuICAgIC8vIEF0IGxhc3QsIG5vdGlmeSBvYnNlcnZlcnMgb2YgdGhpcyBjaGFuZ2VcbiAgICBpZiAoIW9wdGlvbnMgfHwgKG9wdGlvbnMgJiYgb3B0aW9ucy5ub3RpZnkpKSB7XG4gICAgICBhd2FpdCB0aGlzLm9ic2VydmFibGUubm90aWZ5KFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VELCB0aGlzLmN1cnJlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIHRoZSBjdXJyZW50bHkgc3RvcmVkIFNlc3Npb24gZnJvbSBsb2NhbCBzdG9yYWdlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIGZldGNoKCkge1xuICAgIHRoaXMuY3VycmVudCA9IGF3YWl0IHRoaXMuc3RvcmFnZS5nZXQoXCJzZXNzaW9uXCIpO1xuICAgIGF3YWl0IHRoaXMub2JzZXJ2YWJsZS5ub3RpZnkoU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQsIHRoaXMuY3VycmVudCk7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWxvYWQgdGhlIGN1cnJlbnQgVXNlciB1c2luZyB0aGUgcmVtb3RlIHNlcnZlci5cbiAgICovXG4gIHB1YmxpYyBhc3luYyByZWxvYWQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xuICAgICAgY29uc3Qgb2F1dGggPSB0aGlzLmN1cnJlbnQuY3JlZGVudGlhbHM7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyV2ViU2VydmljZS5tZShvYXV0aCk7XG4gICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IC4uLnVzZXIsIGNyZWRlbnRpYWxzOiBvYXV0aCB9IGFzIFVzZXJTY2hlbWEpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgU2Vzc2lvbiBhbmQgY2xlYXJzIHRoZSBzdG9yYWdlLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5jdXJyZW50ID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gRGVzdHJveXMgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5jbGVhcigpO1xuXG4gICAgLy8gQXQgbGFzdCwgbm90aWZ5IG9ic2VydmVycyBvZiB0aGlzIGNoYW5nZVxuICAgIGF3YWl0IHRoaXMub2JzZXJ2YWJsZS5ub3RpZnkoU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQsIHRoaXMuY3VycmVudCk7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50KSB7XG4gICAgICAvLyBSZXZva2VzIHRoZSB0b2tlbiBpbiB0aGUgT0F1dGggU2VydmVyXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5yZXZva2UodGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzLmFjY2Vzc1Rva2VuKTtcbiAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJTRVNTSU9OOiBDb3VsZCBub3QgZGVzdHJveSBjdXJyZW50IHNlc3Npb25cIiwgZXhjZXB0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBcInBhc3N3b3JkXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIgYW5kIHJlZ2lzdGVycyBpdCBpbiBjdXJyZW50IFNlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBVc2VyIGNyZWRlbnRpYWxzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHBhc3N3b3JkKGRhdGE6IFBhc3N3b3JkR3JhbnRPcHRpb25zKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgY29uc3Qgb2F1dGggPSBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5wYXNzd29yZCh7XG4gICAgICB1c2VybmFtZTogZGF0YS51c2VybmFtZSxcbiAgICAgIHBhc3N3b3JkOiBkYXRhLnBhc3N3b3JkLFxuICAgICAgc2NvcGU6IGRhdGEuc2NvcGVzID8gZGF0YS5zY29wZXMuam9pbihcIixcIikgOiBkYXRhLnNjb3BlXG4gICAgfSk7XG5cbiAgICBpZiAoIW9hdXRoLmFjY2Vzc1Rva2VuKSB7XG4gICAgICB0aHJvdyBvYXV0aDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xuICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIobmV3IFVzZXIoeyAuLi51c2VyLCBjcmVkZW50aWFsczogb2F1dGggfSBhcyBVc2VyU2NoZW1hKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGVycm9yLmNyZWRlbnRpYWxzID0gb2F1dGg7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBcInJlZnJlc2hfdG9rZW5cIiBhdXRoZW50aWNhdGlvbiB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlciBhbmQgcmVnaXN0ZXJzIGl0IGluIGN1cnJlbnQgc2Vzc2lvbi5cbiAgICogVGhpcyBtZXRob2QgaXMgYXV0b21hdGljYWxseSBjYWxsZWQgb24gcmVxdWVzdHMgdGhhdCByZXR1cm4gNDAxXG4gICAqXG4gICAqIEBwYXJhbSB7UmVmcmVzaEdyYW50T3B0aW9uc30gZGF0YVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJlZnJlc2hUb2tlbihkYXRhOiBSZWZyZXNoR3JhbnRPcHRpb25zKSB7XG4gICAgY29uc3Qgb2F1dGggPSBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5yZWZyZXNoVG9rZW4oe1xuICAgICAgcmVmcmVzaFRva2VuOiBkYXRhLnJlZnJlc2hUb2tlblxuICAgIH0pO1xuXG4gICAgaWYgKCFvYXV0aC5hY2Nlc3NUb2tlbikge1xuICAgICAgdGhyb3cgb2F1dGg7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJXZWJTZXJ2aWNlLm1lKG9hdXRoKTtcbiAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgLi4udXNlciwgY3JlZGVudGlhbHM6IG9hdXRoIH0gYXMgVXNlclNjaGVtYSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBlcnJvci5jcmVkZW50aWFscyA9IG9hdXRoO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBcImNsaWVudF9jcmVkZW50aWFsc1wiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyIGFuZCByZWdpc3RlcnMgaXQgaW4gY3VycmVudCBTZXNzaW9uLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNsaWVudENyZWRlbnRpYWxzKCk6IFByb21pc2U8VXNlcj4ge1xuICAgIC8vIFRoZSBjbGllbnQgSUQgYW5kIGNsaWVudCBzZWNyZXQgd2lsbCBiZSBwYXNzZWQgYnkgdGhlIE9BdXRoV2ViU2VydmljZVxuICAgIGNvbnN0IG9hdXRoID0gYXdhaXQgdGhpcy5vYXV0aFdlYlNlcnZpY2UuY2xpZW50Q3JlZGVudGlhbHMoKTtcblxuICAgIHRyeSB7XG4gICAgICBpZiAob2F1dGguYWNjZXNzVG9rZW4gJiYgIW9hdXRoLnZpcnR1YWwpIHtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3Rlcih1c2VyKTsgXG4gICAgICB9XG4gICAgICBpZiAob2F1dGguYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIobmV3IFVzZXIoeyBpZDogb2F1dGgudXNlcklkLCBjcmVkZW50aWFsczogb2F1dGggfSkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBlcnJvci5jcmVkZW50aWFscyA9IG9hdXRoO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgdGhyb3cgb2F1dGg7XG4gIH1cbn1cbiJdfQ==