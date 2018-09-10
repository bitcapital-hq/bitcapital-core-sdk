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
class Session {
    constructor(options) {
        this.options = options;
        this._interceptors = [];
        this.observable = new utils_1.Observable();
        this.storage = options.storage || new utils_1.StorageUtil("session", new utils_1.LocalStorage(window));
        // Prepare session interceptors
        this._interceptors = [
            new interceptors_1.SessionCredentialsInterceptor(this),
            new interceptors_1.SessionUnauthorizedInterceptor(() => this.destroy())
        ];
        // Fetch session in startup by default
        if (options.autoFetch !== false) {
            this.fetch();
        }
    }
    /**
     * Gets the sesison interceptors for authorized calls and auto session destruction.
     */
    interceptors() {
        return this._interceptors;
    }
    /**
     * Gets session singleton instance.
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
     * @param {Observer} observable The instace to be notified
     */
    subscribe(observable) {
        this.observable.subscribe(observable);
    }
    /**
     * Unsubscribe from updates.
     *
     * @param {Observer} observable The instance to be removed from listeners
     */
    unsubscribe(observable) {
        this.observable.unsubscribe(observable);
    }
    /**
     * Registers a new user in session, notifying all observers.
     *
     * @param user The user instance
     * @param {{notify: boolean}} options The operation options
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
     * Fetches the currently stored session from local storage.
     */
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.current = yield this.storage.get("session");
            yield this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
            return this.current;
        });
    }
    /**
     * Reloads the current user using the remote server.
     */
    reload() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.current) {
                const oauth = this.current.credentials;
                const user = yield services_1.UserWebService.getInstance().me(oauth);
                return this.register(new models_1.User(Object.assign({}, user, { credentials: oauth })));
            }
        });
    }
    /**
     * Destroys the session and clears the storage.
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
                    yield services_1.OAuthWebService.getInstance().revoke(this.current.credentials.accessToken);
                }
                catch (exception) {
                    console.warn("SESSION: Could not destroy current session", exception);
                }
            }
            return this.current;
        });
    }
    /**
     * Performs a "password" authentication using the OAuth 2.0 server and registers it in current session.
     *
     * @param data The user credentials
     */
    password(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const oauth = yield services_1.OAuthWebService.getInstance().password(data);
            if (oauth.accessToken) {
                try {
                    const user = yield services_1.UserWebService.getInstance().me(oauth);
                    return this.register(new models_1.User(Object.assign({}, user, { credentials: oauth })));
                }
                catch (error) {
                    error.credentials = oauth;
                    throw error;
                }
            }
            throw oauth;
        });
    }
    /**
     * Refreshs the current user information.
     */
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.current)
                return;
            const user = yield services_1.UserWebService.getInstance().me();
            this.register(new models_1.User(Object.assign({}, user, { credentials: this.current.credentials })));
            return user;
        });
    }
    /**
     * Performs a "client_credentials" authentication using the OAuth 2.0 server and registers it in current session.
     */
    clientCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            // The client ID and client secret will be passed by the OAuthWebService
            const oauth = yield services_1.OAuthWebService.getInstance().clientCredentials();
            try {
                if (oauth.accessToken && !oauth.virtual) {
                    const user = yield services_1.UserWebService.getInstance().me(oauth);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXNzaW9uL1Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUE2QztBQUU3QyxvQ0FBMkU7QUFDM0UsMENBQXNGO0FBQ3RGLGlEQUErRjtBQVMvRjtJQVVFLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTjFDLGtCQUFhLEdBQXNCLEVBQUUsQ0FBQztRQU9wQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksa0JBQVUsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLG1CQUFXLENBQUMsU0FBUyxFQUFFLElBQUksb0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRXZGLCtCQUErQjtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLElBQUksNENBQTZCLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLElBQUksNkNBQThCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3pELENBQUM7UUFFRixzQ0FBc0M7UUFDdEMsSUFBSyxPQUFPLENBQUMsU0FBaUIsS0FBSyxLQUFLLEVBQUU7WUFDeEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUF1QjtRQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFFB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SUFBSSxDQUFDLENBQUM7aUJBQzVCO2dCQUNELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtvQkFDckIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksYUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDMUU7YUFDRjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixNQUFNLEtBQUssQ0FBQzthQUNiO1lBRUQsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDO0tBQUE7O0FBOUthLDZCQUFxQixHQUFHLGlCQUFpQixDQUFDO0FBTjFELDBCQXFMQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXIsIFVzZXJTY2hlbWEgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XG5pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3IsIEh0dHBPcHRpb25zIH0gZnJvbSBcIi4uL2Jhc2VcIjtcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBTdG9yYWdlVXRpbCwgTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgeyBPQXV0aFdlYlNlcnZpY2UsIE9BdXRoV2ViU2VydmljZU9wdGlvbnMsIFVzZXJXZWJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzXCI7XG5pbXBvcnQgeyBTZXNzaW9uQ3JlZGVudGlhbHNJbnRlcmNlcHRvciwgU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yIH0gZnJvbSBcIi4vaW50ZXJjZXB0b3JzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2Vzc2lvbk9wdGlvbnMge1xuICBodHRwPzogSHR0cE9wdGlvbnM7XG4gIGF1dG9GZXRjaD86IGJvb2xlYW47XG4gIHN0b3JhZ2U/OiBTdG9yYWdlVXRpbDtcbiAgb2F1dGg/OiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXNzaW9uIHtcbiAgY3VycmVudD86IFVzZXI7XG4gIHN0b3JhZ2U6IFN0b3JhZ2VVdGlsO1xuICBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlO1xuICBfaW50ZXJjZXB0b3JzOiBIdHRwSW50ZXJjZXB0b3JbXSA9IFtdO1xuXG4gIHB1YmxpYyBzdGF0aWMgRVZFTlRfU0VTU0lPTl9DSEFOR0VEID0gXCJTRVNTSU9OX0NIQU5HRURcIjtcblxuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBTZXNzaW9uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBTZXNzaW9uT3B0aW9ucykge1xuICAgIHRoaXMub2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5zdG9yYWdlID0gb3B0aW9ucy5zdG9yYWdlIHx8IG5ldyBTdG9yYWdlVXRpbChcInNlc3Npb25cIiwgbmV3IExvY2FsU3RvcmFnZSh3aW5kb3cpKTtcblxuICAgIC8vIFByZXBhcmUgc2Vzc2lvbiBpbnRlcmNlcHRvcnNcbiAgICB0aGlzLl9pbnRlcmNlcHRvcnMgPSBbXG4gICAgICBuZXcgU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IodGhpcyksXG4gICAgICBuZXcgU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yKCgpID0+IHRoaXMuZGVzdHJveSgpKVxuICAgIF07XG5cbiAgICAvLyBGZXRjaCBzZXNzaW9uIGluIHN0YXJ0dXAgYnkgZGVmYXVsdFxuICAgIGlmICgob3B0aW9ucy5hdXRvRmV0Y2ggYXMgYW55KSAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZmV0Y2goKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc2VzaXNvbiBpbnRlcmNlcHRvcnMgZm9yIGF1dGhvcml6ZWQgY2FsbHMgYW5kIGF1dG8gc2Vzc2lvbiBkZXN0cnVjdGlvbi5cbiAgICovXG4gIGludGVyY2VwdG9ycygpOiBIdHRwSW50ZXJjZXB0b3JbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVyY2VwdG9ycztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHNlc3Npb24gc2luZ2xldG9uIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBTZXNzaW9uIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBTZXNzaW9uT3B0aW9ucyk6IFNlc3Npb24ge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgU2Vzc2lvbihvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgZm9yIHVwZGF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JzZXJ2ZXJ9IG9ic2VydmFibGUgVGhlIGluc3RhY2UgdG8gYmUgbm90aWZpZWRcbiAgICovXG4gIHB1YmxpYyBzdWJzY3JpYmUob2JzZXJ2YWJsZTogT2JzZXJ2ZXIpIHtcbiAgICB0aGlzLm9ic2VydmFibGUuc3Vic2NyaWJlKG9ic2VydmFibGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlIGZyb20gdXBkYXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtPYnNlcnZlcn0gb2JzZXJ2YWJsZSBUaGUgaW5zdGFuY2UgdG8gYmUgcmVtb3ZlZCBmcm9tIGxpc3RlbmVyc1xuICAgKi9cbiAgcHVibGljIHVuc3Vic2NyaWJlKG9ic2VydmFibGU6IE9ic2VydmVyKSB7XG4gICAgdGhpcy5vYnNlcnZhYmxlLnVuc3Vic2NyaWJlKG9ic2VydmFibGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIG5ldyB1c2VyIGluIHNlc3Npb24sIG5vdGlmeWluZyBhbGwgb2JzZXJ2ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0gdXNlciBUaGUgdXNlciBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge3tub3RpZnk6IGJvb2xlYW59fSBvcHRpb25zIFRoZSBvcGVyYXRpb24gb3B0aW9uc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHJlZ2lzdGVyKHVzZXI6IFVzZXIsIG9wdGlvbnMgPSB7IG5vdGlmeTogdHJ1ZSB9KSB7XG4gICAgdGhpcy5jdXJyZW50ID0gdXNlcjtcblxuICAgIC8vIFNhdmUgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5wdXQoXCJzZXNzaW9uXCIsIHRoaXMuY3VycmVudCk7XG5cbiAgICAvLyBBdCBsYXN0LCBub3RpZnkgb2JzZXJ2ZXJzIG9mIHRoaXMgY2hhbmdlXG4gICAgaWYgKCFvcHRpb25zIHx8IChvcHRpb25zICYmIG9wdGlvbnMubm90aWZ5KSkge1xuICAgICAgYXdhaXQgdGhpcy5vYnNlcnZhYmxlLm5vdGlmeShTZXNzaW9uLkVWRU5UX1NFU1NJT05fQ0hBTkdFRCwgdGhpcy5jdXJyZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIHRoZSBjdXJyZW50bHkgc3RvcmVkIHNlc3Npb24gZnJvbSBsb2NhbCBzdG9yYWdlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIGZldGNoKCkge1xuICAgIHRoaXMuY3VycmVudCA9IGF3YWl0IHRoaXMuc3RvcmFnZS5nZXQoXCJzZXNzaW9uXCIpO1xuICAgIGF3YWl0IHRoaXMub2JzZXJ2YWJsZS5ub3RpZnkoU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQsIHRoaXMuY3VycmVudCk7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWxvYWRzIHRoZSBjdXJyZW50IHVzZXIgdXNpbmcgdGhlIHJlbW90ZSBzZXJ2ZXIuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVsb2FkKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IG9hdXRoID0gdGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzO1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCkubWUob2F1dGgpO1xuICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIobmV3IFVzZXIoeyAuLi51c2VyLCBjcmVkZW50aWFsczogb2F1dGggfSBhcyBVc2VyU2NoZW1hKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBzZXNzaW9uIGFuZCBjbGVhcnMgdGhlIHN0b3JhZ2UuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBEZXN0cm95cyBpbiBsb2NhbCBzdG9yYWdlXG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLmNsZWFyKCk7XG5cbiAgICAvLyBBdCBsYXN0LCBub3RpZnkgb2JzZXJ2ZXJzIG9mIHRoaXMgY2hhbmdlXG4gICAgYXdhaXQgdGhpcy5vYnNlcnZhYmxlLm5vdGlmeShTZXNzaW9uLkVWRU5UX1NFU1NJT05fQ0hBTkdFRCwgdGhpcy5jdXJyZW50KTtcblxuICAgIGlmICh0aGlzLmN1cnJlbnQpIHtcbiAgICAgIC8vIFJldm9rZXMgdGhlIHRva2VuIGluIHRoZSBPQXV0aCBTZXJ2ZXJcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IE9BdXRoV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpLnJldm9rZSh0aGlzLmN1cnJlbnQuY3JlZGVudGlhbHMuYWNjZXNzVG9rZW4pO1xuICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlNFU1NJT046IENvdWxkIG5vdCBkZXN0cm95IGN1cnJlbnQgc2Vzc2lvblwiLCBleGNlcHRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBcInBhc3N3b3JkXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIgYW5kIHJlZ2lzdGVycyBpdCBpbiBjdXJyZW50IHNlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIFRoZSB1c2VyIGNyZWRlbnRpYWxzXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcGFzc3dvcmQoZGF0YTogeyB1c2VybmFtZTogc3RyaW5nOyBwYXNzd29yZDogc3RyaW5nIH0pOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCBvYXV0aCA9IGF3YWl0IE9BdXRoV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpLnBhc3N3b3JkKGRhdGEpO1xuXG4gICAgaWYgKG9hdXRoLmFjY2Vzc1Rva2VuKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlcldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5tZShvYXV0aCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgLi4udXNlciwgY3JlZGVudGlhbHM6IG9hdXRoIH0gYXMgVXNlclNjaGVtYSkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZXJyb3IuY3JlZGVudGlhbHMgPSBvYXV0aDtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhyb3cgb2F1dGg7XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaHMgdGhlIGN1cnJlbnQgdXNlciBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoKCk6IFByb21pc2U8VXNlcj4ge1xuICAgIGlmICghdGhpcy5jdXJyZW50KSByZXR1cm47XG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlcldlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5tZSgpO1xuICAgIHRoaXMucmVnaXN0ZXIobmV3IFVzZXIoeyAuLi51c2VyLCBjcmVkZW50aWFsczogdGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzIH0gYXMgVXNlclNjaGVtYSkpO1xuXG4gICAgcmV0dXJuIHVzZXI7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBcImNsaWVudF9jcmVkZW50aWFsc1wiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyIGFuZCByZWdpc3RlcnMgaXQgaW4gY3VycmVudCBzZXNzaW9uLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNsaWVudENyZWRlbnRpYWxzKCk6IFByb21pc2U8VXNlcj4ge1xuICAgIC8vIFRoZSBjbGllbnQgSUQgYW5kIGNsaWVudCBzZWNyZXQgd2lsbCBiZSBwYXNzZWQgYnkgdGhlIE9BdXRoV2ViU2VydmljZVxuICAgIGNvbnN0IG9hdXRoID0gYXdhaXQgT0F1dGhXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCkuY2xpZW50Q3JlZGVudGlhbHMoKTtcblxuICAgIHRyeSB7XG4gICAgICBpZiAob2F1dGguYWNjZXNzVG9rZW4gJiYgIW9hdXRoLnZpcnR1YWwpIHtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCkubWUob2F1dGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3Rlcih1c2VyKTtcbiAgICAgIH1cbiAgICAgIGlmIChvYXV0aC5hY2Nlc3NUb2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IGlkOiBvYXV0aC51c2VySWQsIGNyZWRlbnRpYWxzOiBvYXV0aCB9KSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGVycm9yLmNyZWRlbnRpYWxzID0gb2F1dGg7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICB0aHJvdyBvYXV0aDtcbiAgfVxufVxuIl19