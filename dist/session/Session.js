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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXNzaW9uL1Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQUE0RjtBQUM1RiwwQ0FBc0Y7QUFFdEYsb0NBQXVDO0FBQ3ZDLGlEQUErRjtBQW9CL0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxNQUFxQixPQUFPO0lBYTFCLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTmxDLGtCQUFhLEdBQXNCLEVBQUUsQ0FBQztRQU81QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksOEJBQVUsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLG1CQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0QsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUc7WUFDbkIsSUFBSSw0Q0FBNkIsQ0FBQyxJQUFJLENBQUM7WUFDdkMsSUFBSSw2Q0FBOEIsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3RDLElBQUk7b0JBQ0YsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO29CQUV2RixJQUFJLFlBQVksRUFBRTt3QkFDaEIsZ0RBQWdEO3dCQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztxQkFDckM7eUJBQU07d0JBQ0wsNkNBQTZDO3dCQUM3QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7cUJBQ2hCO2lCQUNGO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLGlEQUFpRDtvQkFDakQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUNoQjtZQUNILENBQUMsQ0FBQztTQUNILENBQUM7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QU0sS0FBSyxDQUFDO2FBQ2I7UUFDSCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLGlCQUFpQjs7WUFDNUIsd0VBQXdFO1lBQ3hFLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBRTdELElBQUk7Z0JBQ0YsSUFBSSxLQUFLLENBQUMsV0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtvQkFDdkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QjtnQkFDRCxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUU7b0JBQ3JCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLHdCQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUMxRTthQUNGO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQzFCLE1BQU0sS0FBSyxDQUFDO2FBQ2I7WUFFRCxNQUFNLEtBQUssQ0FBQztRQUNkLENBQUM7S0FBQTs7QUEvTmEsNkJBQXFCLEdBQUcsaUJBQWlCLENBQUM7QUFUMUQsMEJBeU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlciwgVXNlclNjaGVtYSwgSHR0cEludGVyY2VwdG9yLCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xyXG5pbXBvcnQgeyBPQXV0aFdlYlNlcnZpY2UsIE9BdXRoV2ViU2VydmljZU9wdGlvbnMsIFVzZXJXZWJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzXCI7XHJcbmltcG9ydCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2Jhc2UvQmFzZU1vZGVsV2ViU2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdG9yYWdlVXRpbCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBTZXNzaW9uQ3JlZGVudGlhbHNJbnRlcmNlcHRvciwgU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yIH0gZnJvbSBcIi4vaW50ZXJjZXB0b3JzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNlc3Npb25PcHRpb25zIHtcclxuICBodHRwPzogQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnM7XHJcbiAgb2F1dGg/OiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zO1xyXG4gIHN0b3JhZ2U/OiBTdG9yYWdlVXRpbDtcclxuICBhdXRvRmV0Y2g/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBhc3N3b3JkR3JhbnRPcHRpb25zIHtcclxuICB1c2VybmFtZTogc3RyaW5nO1xyXG4gIHBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgc2NvcGVzPzogc3RyaW5nW107XHJcbiAgc2NvcGU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVmcmVzaEdyYW50T3B0aW9ucyB7XHJcbiAgcmVmcmVzaFRva2VuOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBbiBhYnN0cmFjdGlvbiBsYXllciB0byBzZWN1cmVseSBzdG9yZSBhbmQgbWFuYWdlIHBsYXRmb3JtIGNyZWRlbnRpYWxzLlxyXG4gKlxyXG4gKiBUaGUgU2Vzc2lvbiBpcyBhIHNpbmdsZXRvbiwgc28geW91IG1heSBhY2Nlc3MgdGhlIGF1dGhlbnRpY2F0aW9uIHN0YXRlXHJcbiAqIGF0IGFueSB0aW1lLCBpbiBhbnkgY29udGV4dCwgZ2V0dGluZyBpdHMgY3VycmVudCBpbnN0YW5jZS4gSXQgaXMgYWxzb1xyXG4gKiBhbiBvYnNlcnZhYmxlLCBzbyBpdCBjYW4gYmUgd2F0Y2hlZCBmb3IgY2hhbmdlczpcclxuICpcclxuIGBgYHR5cGVzY3JpcHRcclxuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdiaXRjYXBpdGFsLWNvcmUtc2RrJztcclxuXHJcbi8vIEdldHMgdGhlIGN1cnJlbnQgU2Vzc2lvbiBpbnN0YW5jZVxyXG5jb25zdCBzZXNzaW9uID0gYml0Y2FwaXRhbC5zZXNzaW9uKCk7XHJcblxyXG4vLyBTaG93cyB0aGUgY3VycmVudCB1c2VyIGluc3RhbmNlLCBpZiBhbnlcclxuY29uc29sZS5sb2coc2Vzc2lvbi5jdXJyZW50KTtcclxuXHJcbi8vIFByZXBhcmUgYSBuZXcgc2Vzc2lvbiBvYnNlcnZlciAodHlwZXNjcmlwdCBub3RhdGlvbilcclxuY29uc3Qgb2JzZXJ2ZXI6IE9ic2VydmVyID0ge1xyXG4gIHVwZGF0ZShldmVudDogc3RyaW5nLCBkYXRhOiBVc2VyKSB7XHJcbiAgICBpZihldmVudCA9PT0gU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ1VzZXIgaW5zdGFuY2UgaGFzIGNoYW5nZWQgaW4gU2Vzc2lvbicsIHsgdXNlcjogZGF0YSB9KTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vLyBTdGFydCBsaXN0ZW5pbmcgdG8gU2Vzc2lvbiBjaGFuZ2VzLCBzdWNoIGFzIGNyZWRlbnRpYWxzXHJcbi8vIGV4cGlyYXRpb24gb3IgYSByZWZyZXNoZWQgYWNjZXNzIHRva2VuLlxyXG5zZXNzaW9uLnN1YnNjcmliZShvYnNlcnZlcik7XHJcblxyXG4vLyAuLi5cclxuXHJcbi8vIEV2ZW50dWFsbHksIHlvdSBjYW4gYWxzbyBzdG9wIGxpc3RlbmluZyB0byBpdHMgY2hhbmdlc1xyXG5zZXNzaW9uLnVuc3Vic2NyaWJlKG9ic2VydmVyKTtcclxuIGBgYFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vzc2lvbiB7XHJcbiAgY3VycmVudD86IFVzZXI7XHJcbiAgc3RvcmFnZTogU3RvcmFnZVV0aWw7XHJcbiAgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTtcclxuICB1c2VyV2ViU2VydmljZTogVXNlcldlYlNlcnZpY2U7XHJcbiAgb2F1dGhXZWJTZXJ2aWNlOiBPQXV0aFdlYlNlcnZpY2U7XHJcbiAgcHJpdmF0ZSBfZmV0Y2hQcm9taXNlPzogUHJvbWlzZTxVc2VyPjtcclxuICBwcml2YXRlIF9pbnRlcmNlcHRvcnM6IEh0dHBJbnRlcmNlcHRvcltdID0gW107XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgRVZFTlRfU0VTU0lPTl9DSEFOR0VEID0gXCJTRVNTSU9OX0NIQU5HRURcIjtcclxuXHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogU2Vzc2lvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IFNlc3Npb25PcHRpb25zKSB7XHJcbiAgICB0aGlzLm9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpO1xyXG4gICAgdGhpcy5zdG9yYWdlID0gb3B0aW9ucy5zdG9yYWdlIHx8IG5ldyBTdG9yYWdlVXRpbChcInNlc3Npb25cIik7XHJcblxyXG4gICAgLy8gUHJlcGFyZSBTZXNzaW9uIGludGVyY2VwdG9yc1xyXG4gICAgdGhpcy5faW50ZXJjZXB0b3JzID0gW1xyXG4gICAgICBuZXcgU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IodGhpcyksXHJcbiAgICAgIG5ldyBTZXNzaW9uVW5hdXRob3JpemVkSW50ZXJjZXB0b3IoKCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSB0aGlzLmN1cnJlbnQuY3JlZGVudGlhbHMgJiYgdGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzLnJlZnJlc2hUb2tlbjtcclxuXHJcbiAgICAgICAgICBpZiAocmVmcmVzaFRva2VuKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSByZWZyZXNoIHRva2VuLCB0cnkgdG8gcmVmcmVzaCBpdFxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hUb2tlbih7IHJlZnJlc2hUb2tlbiB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE5vIHJlZnJlc2ggdG9rZW4sIGp1c3QgZGVzdHJveSB0aGUgc2Vzc2lvblxyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgLy8gUmVmcmVzaCB0b2tlbiBhdXRoIGZhaWxlZCwgZGVzdHJveSB0aGUgc2Vzc2lvblxyXG4gICAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgXTtcclxuXHJcbiAgICAvLyBQcmVwYXJlIGlubmVyIHdlYiBzZXJ2aWNlc1xyXG4gICAgdGhpcy51c2VyV2ViU2VydmljZSA9IG9wdGlvbnMuaHR0cFxyXG4gICAgICA/IFVzZXJXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyBzZXNzaW9uOiB0aGlzLCAuLi5vcHRpb25zLmh0dHAgfSlcclxuICAgICAgOiBVc2VyV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gICAgdGhpcy5vYXV0aFdlYlNlcnZpY2UgPSBvcHRpb25zLm9hdXRoXHJcbiAgICAgID8gT0F1dGhXZWJTZXJ2aWNlLmluaXRpYWxpemUoeyAuLi5vcHRpb25zLm9hdXRoIH0pXHJcbiAgICAgIDogT0F1dGhXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgLy8gRmV0Y2ggc2Vzc2lvbiBpbiBzdGFydHVwIGJ5IGRlZmF1bHRcclxuICAgIGlmICgob3B0aW9ucy5hdXRvRmV0Y2ggYXMgYW55KSAhPT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5fZmV0Y2hQcm9taXNlID0gdGhpcy5mZXRjaCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBTZXNzaW9uIGludGVyY2VwdG9ycyBmb3IgYXV0aG9yaXplZCBjYWxscyBhbmQgYXV0byBTZXNzaW9uIGRlc3RydWN0aW9uLlxyXG4gICAqL1xyXG4gIGludGVyY2VwdG9ycygpOiBIdHRwSW50ZXJjZXB0b3JbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5faW50ZXJjZXB0b3JzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBTZXNzaW9uIHNpbmdsZXRvbiBpbnN0YW5jZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFNlc3Npb24ge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogU2Vzc2lvbk9wdGlvbnMpOiBTZXNzaW9uIHtcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgU2Vzc2lvbihvcHRpb25zKTtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIGZvciB1cGRhdGVzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYnNlcnZlcn0gb2JzZXJ2YWJsZSBUaGUgaW5zdGFjZSB0byBiZSBub3RpZmllZC5cclxuICAgKi9cclxuICBwdWJsaWMgc3Vic2NyaWJlKG9ic2VydmFibGU6IE9ic2VydmVyKSB7XHJcbiAgICB0aGlzLm9ic2VydmFibGUuc3Vic2NyaWJlKG9ic2VydmFibGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB1cGRhdGVzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYnNlcnZlcn0gb2JzZXJ2YWJsZSBUaGUgaW5zdGFuY2UgdG8gYmUgcmVtb3ZlZCBmcm9tIGxpc3RlbmVycy5cclxuICAgKi9cclxuICBwdWJsaWMgdW5zdWJzY3JpYmUob2JzZXJ2YWJsZTogT2JzZXJ2ZXIpIHtcclxuICAgIHRoaXMub2JzZXJ2YWJsZS51bnN1YnNjcmliZShvYnNlcnZhYmxlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHRvIGF3YWl0IGZldGNoaW5nIGNvbXBsZXRpb24uXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIG9uRmV0Y2goKSB7XHJcbiAgICBpZiAoIXRoaXMuX2ZldGNoUHJvbWlzZSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuY3VycmVudCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fZmV0Y2hQcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXIgYSBuZXcgVXNlciBpbiBzZXNzaW9uLCBub3RpZnlpbmcgYWxsIG9ic2VydmVycy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB1c2VyIFRoZSBVc2VyIGluc3RhbmNlLlxyXG4gICAqIEBwYXJhbSB7e25vdGlmeTogYm9vbGVhbn19IG9wdGlvbnMgVGhlIG9wZXJhdGlvbiBvcHRpb25zLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyByZWdpc3Rlcih1c2VyOiBVc2VyLCBvcHRpb25zID0geyBub3RpZnk6IHRydWUgfSkge1xyXG4gICAgdGhpcy5jdXJyZW50ID0gdXNlcjtcclxuXHJcbiAgICAvLyBTYXZlIGluIGxvY2FsIHN0b3JhZ2VcclxuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5wdXQoXCJzZXNzaW9uXCIsIHRoaXMuY3VycmVudCk7XHJcblxyXG4gICAgLy8gQXQgbGFzdCwgbm90aWZ5IG9ic2VydmVycyBvZiB0aGlzIGNoYW5nZVxyXG4gICAgaWYgKCFvcHRpb25zIHx8IChvcHRpb25zICYmIG9wdGlvbnMubm90aWZ5KSkge1xyXG4gICAgICBhd2FpdCB0aGlzLm9ic2VydmFibGUubm90aWZ5KFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VELCB0aGlzLmN1cnJlbnQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZldGNoIHRoZSBjdXJyZW50bHkgc3RvcmVkIFNlc3Npb24gZnJvbSBsb2NhbCBzdG9yYWdlLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBhc3luYyBmZXRjaCgpIHtcclxuICAgIHRoaXMuY3VycmVudCA9IGF3YWl0IHRoaXMuc3RvcmFnZS5nZXQoXCJzZXNzaW9uXCIpO1xyXG4gICAgYXdhaXQgdGhpcy5vYnNlcnZhYmxlLm5vdGlmeShTZXNzaW9uLkVWRU5UX1NFU1NJT05fQ0hBTkdFRCwgdGhpcy5jdXJyZW50KTtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWxvYWQgdGhlIGN1cnJlbnQgVXNlciB1c2luZyB0aGUgcmVtb3RlIHNlcnZlci5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgcmVsb2FkKCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xyXG4gICAgICBjb25zdCBvYXV0aCA9IHRoaXMuY3VycmVudC5jcmVkZW50aWFscztcclxuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xyXG4gICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IC4uLnVzZXIsIGNyZWRlbnRpYWxzOiBvYXV0aCB9IGFzIFVzZXJTY2hlbWEpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc3Ryb3kgdGhlIFNlc3Npb24gYW5kIGNsZWFycyB0aGUgc3RvcmFnZS5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuY3VycmVudCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAvLyBEZXN0cm95cyBpbiBsb2NhbCBzdG9yYWdlXHJcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcclxuXHJcbiAgICAvLyBBdCBsYXN0LCBub3RpZnkgb2JzZXJ2ZXJzIG9mIHRoaXMgY2hhbmdlXHJcbiAgICBhd2FpdCB0aGlzLm9ic2VydmFibGUubm90aWZ5KFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VELCB0aGlzLmN1cnJlbnQpO1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnQpIHtcclxuICAgICAgLy8gUmV2b2tlcyB0aGUgdG9rZW4gaW4gdGhlIE9BdXRoIFNlcnZlclxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMub2F1dGhXZWJTZXJ2aWNlLnJldm9rZSh0aGlzLmN1cnJlbnQuY3JlZGVudGlhbHMuYWNjZXNzVG9rZW4pO1xyXG4gICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXCJTRVNTSU9OOiBDb3VsZCBub3QgZGVzdHJveSBjdXJyZW50IHNlc3Npb25cIiwgZXhjZXB0aW9uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIGEgXCJwYXNzd29yZFwiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyIGFuZCByZWdpc3RlcnMgaXQgaW4gY3VycmVudCBTZXNzaW9uLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgVGhlIFVzZXIgY3JlZGVudGlhbHMuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHBhc3N3b3JkKGRhdGE6IFBhc3N3b3JkR3JhbnRPcHRpb25zKTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICBjb25zdCBvYXV0aCA9IGF3YWl0IHRoaXMub2F1dGhXZWJTZXJ2aWNlLnBhc3N3b3JkKHtcclxuICAgICAgdXNlcm5hbWU6IGRhdGEudXNlcm5hbWUsXHJcbiAgICAgIHBhc3N3b3JkOiBkYXRhLnBhc3N3b3JkLFxyXG4gICAgICBzY29wZTogZGF0YS5zY29wZXMgPyBkYXRhLnNjb3Blcy5qb2luKFwiLFwiKSA6IGRhdGEuc2NvcGVcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghb2F1dGguYWNjZXNzVG9rZW4pIHtcclxuICAgICAgdGhyb3cgb2F1dGg7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcldlYlNlcnZpY2UubWUob2F1dGgpO1xyXG4gICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IC4uLnVzZXIsIGNyZWRlbnRpYWxzOiBvYXV0aCB9IGFzIFVzZXJTY2hlbWEpKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGVycm9yLmNyZWRlbnRpYWxzID0gb2F1dGg7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGVyZm9ybXMgYSBcInJlZnJlc2hfdG9rZW5cIiBhdXRoZW50aWNhdGlvbiB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlciBhbmQgcmVnaXN0ZXJzIGl0IGluIGN1cnJlbnQgc2Vzc2lvbi5cclxuICAgKiBUaGlzIG1ldGhvZCBpcyBhdXRvbWF0aWNhbGx5IGNhbGxlZCBvbiByZXF1ZXN0cyB0aGF0IHJldHVybiA0MDFcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7UmVmcmVzaEdyYW50T3B0aW9uc30gZGF0YVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoVG9rZW4oZGF0YTogUmVmcmVzaEdyYW50T3B0aW9ucykge1xyXG4gICAgY29uc3Qgb2F1dGggPSBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5yZWZyZXNoVG9rZW4oe1xyXG4gICAgICByZWZyZXNoVG9rZW46IGRhdGEucmVmcmVzaFRva2VuXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIW9hdXRoLmFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgIHRocm93IG9hdXRoO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJXZWJTZXJ2aWNlLm1lKG9hdXRoKTtcclxuICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIobmV3IFVzZXIoeyAuLi51c2VyLCBjcmVkZW50aWFsczogb2F1dGggfSBhcyBVc2VyU2NoZW1hKSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBlcnJvci5jcmVkZW50aWFscyA9IG9hdXRoO1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm0gYSBcImNsaWVudF9jcmVkZW50aWFsc1wiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyIGFuZCByZWdpc3RlcnMgaXQgaW4gY3VycmVudCBTZXNzaW9uLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBjbGllbnRDcmVkZW50aWFscygpOiBQcm9taXNlPFVzZXI+IHtcclxuICAgIC8vIFRoZSBjbGllbnQgSUQgYW5kIGNsaWVudCBzZWNyZXQgd2lsbCBiZSBwYXNzZWQgYnkgdGhlIE9BdXRoV2ViU2VydmljZVxyXG4gICAgY29uc3Qgb2F1dGggPSBhd2FpdCB0aGlzLm9hdXRoV2ViU2VydmljZS5jbGllbnRDcmVkZW50aWFscygpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChvYXV0aC5hY2Nlc3NUb2tlbiAmJiAhb2F1dGgudmlydHVhbCkge1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJXZWJTZXJ2aWNlLm1lKG9hdXRoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3Rlcih1c2VyKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob2F1dGguYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IGlkOiBvYXV0aC51c2VySWQsIGNyZWRlbnRpYWxzOiBvYXV0aCB9KSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGVycm9yLmNyZWRlbnRpYWxzID0gb2F1dGg7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG5cclxuICAgIHRocm93IG9hdXRoO1xyXG4gIH1cclxufVxyXG4iXX0=