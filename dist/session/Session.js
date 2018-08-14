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
     * Performs a "client_credentials" authentication using the OAuth 2.0 server and registers it in current session.
     */
    clientCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXNzaW9uL1Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUE2QztBQUU3QyxvQ0FBMkU7QUFDM0UsMENBQXNGO0FBQ3RGLGlEQUErRjtBQVMvRjtJQVVFLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTjFDLGtCQUFhLEdBQXNCLEVBQUUsQ0FBQztRQU9wQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksa0JBQVUsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLG1CQUFXLENBQUMsU0FBUyxFQUFFLElBQUksb0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRXZGLCtCQUErQjtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLElBQUksNENBQTZCLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLElBQUksNkNBQThCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3pELENBQUM7UUFFRixzQ0FBc0M7UUFDdEMsSUFBSyxPQUFPLENBQUMsU0FBaUIsS0FBSyxLQUFLLEVBQUU7WUFDeEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUF1QjtRQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLFFB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QztLQUFBOztBQWpLYSw2QkFBcUIsR0FBRyxpQkFBaUIsQ0FBQztBQU4xRCwwQkF3S0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyLCBVc2VyU2NoZW1hIH0gZnJvbSBcIi4uL21vZGVsc1wiO1xuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yLCBIdHRwT3B0aW9ucyB9IGZyb20gXCIuLi9iYXNlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3RvcmFnZVV0aWwsIExvY2FsU3RvcmFnZSB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHsgT0F1dGhXZWJTZXJ2aWNlLCBPQXV0aFdlYlNlcnZpY2VPcHRpb25zLCBVc2VyV2ViU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IsIFNlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvciB9IGZyb20gXCIuL2ludGVyY2VwdG9yc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlc3Npb25PcHRpb25zIHtcbiAgaHR0cD86IEh0dHBPcHRpb25zO1xuICBhdXRvRmV0Y2g/OiBib29sZWFuO1xuICBzdG9yYWdlPzogU3RvcmFnZVV0aWw7XG4gIG9hdXRoPzogT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vzc2lvbiB7XG4gIGN1cnJlbnQ/OiBVc2VyO1xuICBzdG9yYWdlOiBTdG9yYWdlVXRpbDtcbiAgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTtcbiAgX2ludGVyY2VwdG9yczogSHR0cEludGVyY2VwdG9yW10gPSBbXTtcblxuICBwdWJsaWMgc3RhdGljIEVWRU5UX1NFU1NJT05fQ0hBTkdFRCA9IFwiU0VTU0lPTl9DSEFOR0VEXCI7XG5cbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogU2Vzc2lvbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogU2Vzc2lvbk9wdGlvbnMpIHtcbiAgICB0aGlzLm9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuc3RvcmFnZSA9IG9wdGlvbnMuc3RvcmFnZSB8fCBuZXcgU3RvcmFnZVV0aWwoXCJzZXNzaW9uXCIsIG5ldyBMb2NhbFN0b3JhZ2Uod2luZG93KSk7XG5cbiAgICAvLyBQcmVwYXJlIHNlc3Npb24gaW50ZXJjZXB0b3JzXG4gICAgdGhpcy5faW50ZXJjZXB0b3JzID0gW1xuICAgICAgbmV3IFNlc3Npb25DcmVkZW50aWFsc0ludGVyY2VwdG9yKHRoaXMpLFxuICAgICAgbmV3IFNlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvcigoKSA9PiB0aGlzLmRlc3Ryb3koKSlcbiAgICBdO1xuXG4gICAgLy8gRmV0Y2ggc2Vzc2lvbiBpbiBzdGFydHVwIGJ5IGRlZmF1bHRcbiAgICBpZiAoKG9wdGlvbnMuYXV0b0ZldGNoIGFzIGFueSkgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmZldGNoKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHNlc2lzb24gaW50ZXJjZXB0b3JzIGZvciBhdXRob3JpemVkIGNhbGxzIGFuZCBhdXRvIHNlc3Npb24gZGVzdHJ1Y3Rpb24uXG4gICAqL1xuICBpbnRlcmNlcHRvcnMoKTogSHR0cEludGVyY2VwdG9yW10ge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcmNlcHRvcnM7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBzZXNzaW9uIHNpbmdsZXRvbiBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogU2Vzc2lvbiB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogU2Vzc2lvbk9wdGlvbnMpOiBTZXNzaW9uIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFNlc3Npb24ob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIGZvciB1cGRhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge09ic2VydmVyfSBvYnNlcnZhYmxlIFRoZSBpbnN0YWNlIHRvIGJlIG5vdGlmaWVkXG4gICAqL1xuICBwdWJsaWMgc3Vic2NyaWJlKG9ic2VydmFibGU6IE9ic2VydmVyKSB7XG4gICAgdGhpcy5vYnNlcnZhYmxlLnN1YnNjcmliZShvYnNlcnZhYmxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHVwZGF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JzZXJ2ZXJ9IG9ic2VydmFibGUgVGhlIGluc3RhbmNlIHRvIGJlIHJlbW92ZWQgZnJvbSBsaXN0ZW5lcnNcbiAgICovXG4gIHB1YmxpYyB1bnN1YnNjcmliZShvYnNlcnZhYmxlOiBPYnNlcnZlcikge1xuICAgIHRoaXMub2JzZXJ2YWJsZS51bnN1YnNjcmliZShvYnNlcnZhYmxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBuZXcgdXNlciBpbiBzZXNzaW9uLCBub3RpZnlpbmcgYWxsIG9ic2VydmVycy5cbiAgICpcbiAgICogQHBhcmFtIHVzZXIgVGhlIHVzZXIgaW5zdGFuY2VcbiAgICogQHBhcmFtIHt7bm90aWZ5OiBib29sZWFufX0gb3B0aW9ucyBUaGUgb3BlcmF0aW9uIG9wdGlvbnNcbiAgICovXG4gIHB1YmxpYyBhc3luYyByZWdpc3Rlcih1c2VyOiBVc2VyLCBvcHRpb25zID0geyBub3RpZnk6IHRydWUgfSkge1xuICAgIHRoaXMuY3VycmVudCA9IHVzZXI7XG5cbiAgICAvLyBTYXZlIGluIGxvY2FsIHN0b3JhZ2VcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucHV0KFwic2Vzc2lvblwiLCB0aGlzLmN1cnJlbnQpO1xuXG4gICAgLy8gQXQgbGFzdCwgbm90aWZ5IG9ic2VydmVycyBvZiB0aGlzIGNoYW5nZVxuICAgIGlmICghb3B0aW9ucyB8fCAob3B0aW9ucyAmJiBvcHRpb25zLm5vdGlmeSkpIHtcbiAgICAgIGF3YWl0IHRoaXMub2JzZXJ2YWJsZS5ub3RpZnkoU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQsIHRoaXMuY3VycmVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyB0aGUgY3VycmVudGx5IHN0b3JlZCBzZXNzaW9uIGZyb20gbG9jYWwgc3RvcmFnZS5cbiAgICovXG4gIHByb3RlY3RlZCBhc3luYyBmZXRjaCgpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSBhd2FpdCB0aGlzLnN0b3JhZ2UuZ2V0KFwic2Vzc2lvblwiKTtcbiAgICBhd2FpdCB0aGlzLm9ic2VydmFibGUubm90aWZ5KFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VELCB0aGlzLmN1cnJlbnQpO1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmVsb2FkcyB0aGUgY3VycmVudCB1c2VyIHVzaW5nIHRoZSByZW1vdGUgc2VydmVyLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJlbG9hZCgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50KSB7XG4gICAgICBjb25zdCBvYXV0aCA9IHRoaXMuY3VycmVudC5jcmVkZW50aWFscztcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpLm1lKG9hdXRoKTtcbiAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgLi4udXNlciwgY3JlZGVudGlhbHM6IG9hdXRoIH0gYXMgVXNlclNjaGVtYSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgc2Vzc2lvbiBhbmQgY2xlYXJzIHRoZSBzdG9yYWdlLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5jdXJyZW50ID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gRGVzdHJveXMgaW4gbG9jYWwgc3RvcmFnZVxuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5jbGVhcigpO1xuXG4gICAgLy8gQXQgbGFzdCwgbm90aWZ5IG9ic2VydmVycyBvZiB0aGlzIGNoYW5nZVxuICAgIGF3YWl0IHRoaXMub2JzZXJ2YWJsZS5ub3RpZnkoU2Vzc2lvbi5FVkVOVF9TRVNTSU9OX0NIQU5HRUQsIHRoaXMuY3VycmVudCk7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50KSB7XG4gICAgICAvLyBSZXZva2VzIHRoZSB0b2tlbiBpbiB0aGUgT0F1dGggU2VydmVyXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBPQXV0aFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5yZXZva2UodGhpcy5jdXJyZW50LmNyZWRlbnRpYWxzLmFjY2Vzc1Rva2VuKTtcbiAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJTRVNTSU9OOiBDb3VsZCBub3QgZGVzdHJveSBjdXJyZW50IHNlc3Npb25cIiwgZXhjZXB0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgXCJwYXNzd29yZFwiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyIGFuZCByZWdpc3RlcnMgaXQgaW4gY3VycmVudCBzZXNzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgdXNlciBjcmVkZW50aWFsc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHBhc3N3b3JkKGRhdGE6IHsgdXNlcm5hbWU6IHN0cmluZzsgcGFzc3dvcmQ6IHN0cmluZyB9KTogUHJvbWlzZTxVc2VyPiB7XG4gICAgY29uc3Qgb2F1dGggPSBhd2FpdCBPQXV0aFdlYlNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5wYXNzd29yZChkYXRhKTtcblxuICAgIGlmIChvYXV0aC5hY2Nlc3NUb2tlbikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJXZWJTZXJ2aWNlLmdldEluc3RhbmNlKCkubWUob2F1dGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcihuZXcgVXNlcih7IC4uLnVzZXIsIGNyZWRlbnRpYWxzOiBvYXV0aCB9IGFzIFVzZXJTY2hlbWEpKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGVycm9yLmNyZWRlbnRpYWxzID0gb2F1dGg7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRocm93IG9hdXRoO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgXCJjbGllbnRfY3JlZGVudGlhbHNcIiBhdXRoZW50aWNhdGlvbiB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlciBhbmQgcmVnaXN0ZXJzIGl0IGluIGN1cnJlbnQgc2Vzc2lvbi5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBjbGllbnRDcmVkZW50aWFscygpOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCBvYXV0aCA9IGF3YWl0IE9BdXRoV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpLmNsaWVudENyZWRlbnRpYWxzKCk7XG5cbiAgICB0cnkge1xuICAgICAgaWYgKG9hdXRoLmFjY2Vzc1Rva2VuICYmICFvYXV0aC52aXJ0dWFsKSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyV2ViU2VydmljZS5nZXRJbnN0YW5jZSgpLm1lKG9hdXRoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIodXNlcik7XG4gICAgICB9XG4gICAgICBpZiAob2F1dGguYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIobmV3IFVzZXIoeyBpZDogb2F1dGgudXNlcklkLCBjcmVkZW50aWFsczogb2F1dGggfSkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBlcnJvci5jcmVkZW50aWFscyA9IG9hdXRoO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgdGhyb3cgb2F1dGg7XG4gIH1cbn1cbiJdfQ==