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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXNzaW9uL1Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHNDQUE2QztBQUM3QywwQ0FBc0Y7QUFFdEYsb0NBQTZEO0FBQzdELGlEQUErRjtBQW9CL0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSDtJQVlFLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTmxDLGtCQUFhLEdBQXNCLEVBQUUsQ0FBQztRQU81QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksa0JBQVUsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLG1CQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0QsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMseUJBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyx5QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVHLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWpILCtCQUErQjtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLElBQUksNENBQTZCLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLElBQUksNkNBQThCLENBQUMsR0FBRyxFQUFFO2dCQUN0QyxJQUFJO29CQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMs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QUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNqRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzVCO2dCQUNELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtvQkFDckIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksYUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDMUU7YUFDRjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixNQUFNLEtBQUssQ0FBQzthQUNiO1lBRUQsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDO0tBQUE7O0FBak5hLDZCQUFxQixHQUFHLGlCQUFpQixDQUFDO0FBUjFELDBCQTBOQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBJbnRlcmNlcHRvciB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IFVzZXIsIFVzZXJTY2hlbWEgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IE9BdXRoV2ViU2VydmljZSwgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucywgVXNlcldlYlNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXNcIjtcclxuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi4vc2VydmljZXMvYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBTdG9yYWdlVXRpbCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBTZXNzaW9uQ3JlZGVudGlhbHNJbnRlcmNlcHRvciwgU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yIH0gZnJvbSBcIi4vaW50ZXJjZXB0b3JzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNlc3Npb25PcHRpb25zIHtcclxuICBodHRwPzogQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnM7XHJcbiAgb2F1dGg/OiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zO1xyXG4gIHN0b3JhZ2U/OiBTdG9yYWdlVXRpbDtcclxuICBhdXRvRmV0Y2g/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBhc3N3b3JkR3JhbnRPcHRpb25zIHtcclxuICB1c2VybmFtZTogc3RyaW5nO1xyXG4gIHBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgc2NvcGVzPzogc3RyaW5nW107XHJcbiAgc2NvcGU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVmcmVzaEdyYW50T3B0aW9ucyB7XHJcbiAgcmVmcmVzaFRva2VuOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBbiBhYnN0cmFjdGlvbiBsYXllciB0byBzZWN1cmVseSBzdG9yZSBhbmQgbWFuYWdlIHBsYXRmb3JtIGNyZWRlbnRpYWxzLlxyXG4gKlxyXG4gKiBUaGUgU2Vzc2lvbiBpcyBhIHNpbmdsZXRvbiwgc28geW91IG1heSBhY2Nlc3MgdGhlIGF1dGhlbnRpY2F0aW9uIHN0YXRlXHJcbiAqIGF0IGFueSB0aW1lLCBpbiBhbnkgY29udGV4dCwgZ2V0dGluZyBpdHMgY3VycmVudCBpbnN0YW5jZS4gSXQgaXMgYWxzb1xyXG4gKiBhbiBvYnNlcnZhYmxlLCBzbyBpdCBjYW4gYmUgd2F0Y2hlZCBmb3IgY2hhbmdlczpcclxuICpcclxuIGBgYHR5cGVzY3JpcHRcclxuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdiaXRjYXBpdGFsLWNvcmUtc2RrJztcclxuXHJcbi8vIEdldHMgdGhlIGN1cnJlbnQgU2Vzc2lvbiBpbnN0YW5jZVxyXG5jb25zdCBzZXNzaW9uID0gYml0Y2FwaXRhbC5zZXNzaW9uKCk7XHJcblxyXG4vLyBTaG93cyB0aGUgY3VycmVudCB1c2VyIGluc3RhbmNlLCBpZiBhbnlcclxuY29uc29sZS5sb2coc2Vzc2lvbi5jdXJyZW50KTtcclxuXHJcbi8vIFByZXBhcmUgYSBuZXcgc2Vzc2lvbiBvYnNlcnZlciAodHlwZXNjcmlwdCBub3RhdGlvbilcclxuY29uc3Qgb2JzZXJ2ZXI6IE9ic2VydmVyID0ge1xyXG4gIHVwZGF0ZShldmVudDogc3RyaW5nLCBkYXRhOiBVc2VyKSB7XHJcbiAgICBpZihldmVudCA9PT0gU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ1VzZXIgaW5zdGFuY2UgaGFzIGNoYW5nZWQgaW4gU2Vzc2lvbicsIHsgdXNlcjogZGF0YSB9KTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vLyBTdGFydCBsaXN0ZW5pbmcgdG8gU2Vzc2lvbiBjaGFuZ2VzLCBzdWNoIGFzIGNyZWRlbnRpYWxzXHJcbi8vIGV4cGlyYXRpb24gb3IgYSByZWZyZXNoZWQgYWNjZXNzIHRva2VuLlxyXG5zZXNzaW9uLnN1YnNjcmliZShvYnNlcnZlcik7XHJcblxyXG4vLyAuLi5cclxuXHJcbi8vIEV2ZW50dWFsbHksIHlvdSBjYW4gYWxzbyBzdG9wIGxpc3RlbmluZyB0byBpdHMgY2hhbmdlc1xyXG5zZXNzaW9uLnVuc3Vic2NyaWJlKG9ic2VydmVyKTtcclxuIGBgYFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vzc2lvbiB7XHJcbiAgY3VycmVudD86IFVzZXI7XHJcbiAgc3RvcmFnZTogU3RvcmFnZVV0aWw7XHJcbiAgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTtcclxuICB1c2VyV2ViU2VydmljZTogVXNlcldlYlNlcnZpY2U7XHJcbiAgb2F1dGhXZWJTZXJ2aWNlOiBPQXV0aFdlYlNlcnZpY2U7XHJcbiAgcHJpdmF0ZSBfaW50ZXJjZXB0b3JzOiBIdHRwSW50ZXJjZXB0b3JbXSA9IFtdO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIEVWRU5UX1NFU1NJT05fQ0hBTkdFRCA9IFwiU0VTU0lPTl9DSEFOR0VEXCI7XHJcblxyXG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IFNlc3Npb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBTZXNzaW9uT3B0aW9ucykge1xyXG4gICAgdGhpcy5vYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKTtcclxuICAgIHRoaXMuc3RvcmFnZSA9IG9wdGlvbnMuc3RvcmFnZSB8fCBuZXcgU3RvcmFnZVV0aWwoXCJzZXNzaW9uXCIpO1xyXG5cclxuICAgIC8vIFByZXBhcmUgd2ViIHNlcnZpY2VzXHJcbiAgICB0aGlzLnVzZXJXZWJTZXJ2aWNlID0gb3B0aW9ucy5odHRwID8gVXNlcldlYlNlcnZpY2UuaW5pdGlhbGl6ZShvcHRpb25zLmh0dHApIDogVXNlcldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuICAgIHRoaXMub2F1dGhXZWJTZXJ2aWNlID0gb3B0aW9ucy5vYXV0aCA/IE9BdXRoV2ViU2VydmljZS5pbml0aWFsaXplKG9wdGlvbnMub2F1dGgpIDogT0F1dGhXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgLy8gUHJlcGFyZSBTZXNzaW9uIGludGVyY2VwdG9yc1xyXG4gICAgdGhpcy5faW50ZXJjZXB0b3JzID0gW1xyXG4gICAgICBuZXcgU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IodGhpcyksXHJcbiAgICAgIG5ldyBTZXNzaW9uVW5hdXRob3JpemVkSW50ZXJjZXB0b3IoKCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSB0aGlzLmN1cnJlbnQuY3JlZGVudGlhbHMgJiYgdGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzLnJlZnJlc2hUb2tlbjtcclxuXHJcbiAgICAgICAgICBpZiAocmVmcmVzaFRva2VuKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSByZWZyZXNoIHRva2VuLCB0cnkgdG8gcmVmcmVzaCBpdFxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hUb2tlbih7IHJlZnJlc2hUb2tlbiB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE5vIHJlZnJlc2ggdG9rZW4sIGp1c3QgZGVzdHJveSB0aGUgc2Vzc2lvblxyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgLy8gUmVmcmVzaCB0b2tlbiBhdXRoIGZhaWxlZCwgZGVzdHJveSB0aGUgc2Vzc2lvblxyXG4gICAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgXTtcclxuXHJcbiAgICAvLyBGZXRjaCBzZXNzaW9uIGluIHN0YXJ0dXAgYnkgZGVmYXVsdFxyXG4gICAgaWYgKChvcHRpb25zLmF1dG9GZXRjaCBhcyBhbnkpICE9PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmZldGNoKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIFNlc3Npb24gaW50ZXJjZXB0b3JzIGZvciBhdXRob3JpemVkIGNhbGxzIGFuZCBhdXRvIFNlc3Npb24gZGVzdHJ1Y3Rpb24uXHJcbiAgICovXHJcbiAgaW50ZXJjZXB0b3JzKCk6IEh0dHBJbnRlcmNlcHRvcltdIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnRlcmNlcHRvcnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIFNlc3Npb24gc2luZ2xldG9uIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogU2Vzc2lvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBTZXNzaW9uT3B0aW9ucyk6IFNlc3Npb24ge1xyXG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBTZXNzaW9uKG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgZm9yIHVwZGF0ZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09ic2VydmVyfSBvYnNlcnZhYmxlIFRoZSBpbnN0YWNlIHRvIGJlIG5vdGlmaWVkLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdWJzY3JpYmUob2JzZXJ2YWJsZTogT2JzZXJ2ZXIpIHtcclxuICAgIHRoaXMub2JzZXJ2YWJsZS5zdWJzY3JpYmUob2JzZXJ2YWJsZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHVwZGF0ZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09ic2VydmVyfSBvYnNlcnZhYmxlIFRoZSBpbnN0YW5jZSB0byBiZSByZW1vdmVkIGZyb20gbGlzdGVuZXJzLlxyXG4gICAqL1xyXG4gIHB1YmxpYyB1bnN1YnNjcmliZShvYnNlcnZhYmxlOiBPYnNlcnZlcikge1xyXG4gICAgdGhpcy5vYnNlcnZhYmxlLnVuc3Vic2NyaWJlKG9ic2VydmFibGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXIgYSBuZXcgVXNlciBpbiBzZXNzaW9uLCBub3RpZnlpbmcgYWxsIG9ic2VydmVycy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB1c2VyIFRoZSBVc2VyIGluc3RhbmNlLlxyXG4gICAqIEBwYXJhbSB7e25vdGlmeTogYm9vbGVhbn19IG9wdGlvbnMgVGhlIG9wZXJhdGlvbiBvcHRpb25zLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyByZWdpc3Rlcih1c2VyOiBVc2VyLCBvcHRpb25zID0geyBub3RpZnk6IHRydWUgfSkge1xyXG4gICAgdGhpcy5jdXJyZW50ID0gdXNlcjtcclxuXHJcbiAgICAvLyBTYXZlIGluIGxvY2FsIHN0b3JhZ2VcclxuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5wdXQoXCJzZXNzaW9uXCIsIHRoaXMuY3VycmVudCk7XHJcblxyXG4gICAgLy8gQXQgbGFzdCwgbm90aWZ5IG9ic2VydmVycyBvZiB0aGlzIGNoYW5nZVxyXG4gICAgaWYgKCFvcHRpb25zIHx8IChvcHRpb25zICYmIG9wdGlvbnMubm90aWZ5KSkge1xyXG4gICAgICBhd2FpdCB0aGlzLm9ic2VydmFibGUubm90aWZ5KFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VELCB0aGlzLmN1cnJlbnQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZldGNoIHRoZSBjdXJyZW50bHkgc3RvcmVkIFNlc3Npb24gZnJvbSBsb2NhbCBzdG9yYWdlLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBhc3luYyBmZXRjaCgpIHtcclxuICAgIHRoaXMuY3VycmVudCA9IGF3YWl0IHRoaXMuc3RvcmFnZS5nZXQoXCJzZXNzaW9uXCIpO1xyXG4gICAgYXdhaXQgdGhpcy5vYnNlcnZhYmxlLm5vdGlmeShTZXNzaW9uLkVWRU5UX1NFU1NJT05fQ0hBTkdFRCwgdGhpcy5jdXJyZW50KTtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWxvYWQgdGhlIGN1cnJlbnQgVXNlciB1c2luZyB0aGUgcmVtb3RlIHNlcnZlci5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgcmVsb2FkKCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xyXG4gICAgICBjb25zdCBvYXV0aCA9IHRoaXMuY3VycmVudC5jcmVkZW50aWFscztcclxuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xyXG4gICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IC4uLnVzZXIsIGNyZWRlbnRpYWxzOiBvYXV0aCB9IGFzIFVzZXJTY2hlbWEpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc3Ryb3kgdGhlIFNlc3Npb24gYW5kIGNsZWFycyB0aGUgc3RvcmFnZS5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuY3VycmVudCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAvLyBEZXN0cm95cyBpbiBsb2NhbCBzdG9yYWdlXHJcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcclxuXHJcbiAgICAvLyBBdCBsYXN0LCBub3RpZnkgb2JzZXJ2ZXJzIG9mIHRoaXMgY2hhbmdlXHJcbiAgICBhd2FpdCB0aGlzLm9ic2VydmFibGUubm90aWZ5KFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VELCB0aGlzLmN1cnJlbnQpO1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnQpIHtcclxuICAgICAgLy8gUmV2b2tlcyB0aGUgdG9rZW4gaW4gdGhlIE9BdXRoIFNlcnZlclxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMub2F1dGhXZWJTZXJ2aWNlLnJldm9rZSh0aGlzLmN1cnJlbnQuY3JlZGVudGlhbHMuYWNjZXNzVG9rZW4pO1xyXG4gICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXCJTRVNTSU9OOiBDb3VsZCBub3QgZGVzdHJveSBjdXJyZW50IHNlc3Npb25cIiwgZXhjZXB0aW9uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIGEgXCJwYXNzd29yZFwiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyIGFuZCByZWdpc3RlcnMgaXQgaW4gY3VycmVudCBTZXNzaW9uLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgVGhlIFVzZXIgY3JlZGVudGlhbHMuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHBhc3N3b3JkKGRhdGE6IFBhc3N3b3JkR3JhbnRPcHRpb25zKTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICBjb25zdCBvYXV0aCA9IGF3YWl0IHRoaXMub2F1dGhXZWJTZXJ2aWNlLnBhc3N3b3JkKHtcclxuICAgICAgdXNlcm5hbWU6IGRhdGEudXNlcm5hbWUsXHJcbiAgICAgIHBhc3N3b3JkOiBkYXRhLnBhc3N3b3JkLFxyXG4gICAgICBzY29wZTogZGF0YS5zY29wZXMgPyBkYXRhLnNjb3Blcy5qb2luKFwiLFwiKSA6IGRhdGEuc2NvcGVcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghb2F1dGguYWNjZXNzVG9rZW4pIHtcclxuICAgICAgdGhyb3cgb2F1dGg7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xyXG4gICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IC4uLnVzZXIsIGNyZWRlbnRpYWxzOiBvYXV0aCB9IGFzIFVzZXJTY2hlbWEpKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGVycm9yLmNyZWRlbnRpYWxzID0gb2F1dGg7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGVyZm9ybXMgYSBcInJlZnJlc2hfdG9rZW5cIiBhdXRoZW50aWNhdGlvbiB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlciBhbmQgcmVnaXN0ZXJzIGl0IGluIGN1cnJlbnQgc2Vzc2lvbi5cclxuICAgKiBUaGlzIG1ldGhvZCBpcyBhdXRvbWF0aWNhbGx5IGNhbGxlZCBvbiByZXF1ZXN0cyB0aGF0IHJldHVybiA0MDFcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7UmVmcmVzaEdyYW50T3B0aW9uc30gZGF0YVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoVG9rZW4oZGF0YTogUmVmcmVzaEdyYW50T3B0aW9ucykge1xyXG4gICAgY29uc3Qgb2F1dGggPSBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5yZWZyZXNoVG9rZW4oe1xyXG4gICAgICByZWZyZXNoVG9rZW46IGRhdGEucmVmcmVzaFRva2VuXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIW9hdXRoLmFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgIHRocm93IG9hdXRoO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJXZWJTZXJ2aWNlLm1lKG9hdXRoKTtcclxuICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIobmV3IFVzZXIoeyAuLi51c2VyLCBjcmVkZW50aWFsczogb2F1dGggfSBhcyBVc2VyU2NoZW1hKSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBlcnJvci5jcmVkZW50aWFscyA9IG9hdXRoO1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm0gYSBcImNsaWVudF9jcmVkZW50aWFsc1wiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyIGFuZCByZWdpc3RlcnMgaXQgaW4gY3VycmVudCBTZXNzaW9uLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBjbGllbnRDcmVkZW50aWFscygpOiBQcm9taXNlPFVzZXI+IHtcclxuICAgIC8vIFRoZSBjbGllbnQgSUQgYW5kIGNsaWVudCBzZWNyZXQgd2lsbCBiZSBwYXNzZWQgYnkgdGhlIE9BdXRoV2ViU2VydmljZVxyXG4gICAgY29uc3Qgb2F1dGggPSBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5jbGllbnRDcmVkZW50aWFscygpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChvYXV0aC5hY2Nlc3NUb2tlbiAmJiAhb2F1dGgudmlydHVhbCkge1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJXZWJTZXJ2aWNlLm1lKG9hdXRoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3Rlcih1c2VyKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob2F1dGguYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IGlkOiBvYXV0aC51c2VySWQsIGNyZWRlbnRpYWxzOiBvYXV0aCB9KSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGVycm9yLmNyZWRlbnRpYWxzID0gb2F1dGg7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG5cclxuICAgIHRocm93IG9hdXRoO1xyXG4gIH1cclxufVxyXG4iXX0=