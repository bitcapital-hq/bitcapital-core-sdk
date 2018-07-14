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
        this.storage = options.storage || new utils_1.StorageUtil('session', new utils_1.LocalStorage(window));
        // Prepare session interceptors
        this._interceptors = [
            new interceptors_1.SessionCredentialsInterceptor(this),
            new interceptors_1.SessionUnauthorizedInterceptor(() => this.destroy()),
        ];
        // TODO: Service instance or config are required, validate this
        this.oauthWebService = options.oauthWebService || services_1.OAuthWebService.getInstance(Object.assign({}, options.oauth));
        this.userWebService = options.userWebService || services_1.UserWebService.getInstance(Object.assign({ session: this }, options.http));
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
     *
     * @param options The session options
     */
    static getInstance(options) {
        if (!this.instance) {
            this.instance = new Session(options);
        }
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
            yield this.storage.put('session', this.current);
            // At last, notify observers of this change
            if (!options || (options && options.notify)) {
                yield this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
            }
            return this.current;
        });
    }
    /**
     * Fetches the currently stored session.
     */
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.current = yield this.storage.get('session');
            yield this.observable.notify(Session.EVENT_SESSION_CHANGED, this.current);
            return this.current;
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
                    yield this.oauthWebService.revoke(this.current.credentials.accessToken);
                }
                catch (exception) {
                    console.warn('SESSION: Could not destroy current session', exception);
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
            const oauth = yield this.oauthWebService.password(data);
            if (oauth.accessToken) {
                try {
                    const user = yield this.userWebService.me(oauth);
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
Session.EVENT_SESSION_CHANGED = 'SESSION_CHANGED';
exports.default = Session;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXNzaW9uL1Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFpQztBQUVqQyxvQ0FBMkU7QUFDM0UsMENBQXNGO0FBQ3RGLGlEQUErRjtBQVcvRjtJQVlFLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTjFDLGtCQUFhLEdBQXNCLEVBQUUsQ0FBQztRQU9wQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksa0JBQVUsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLG1CQUFXLENBQUMsU0FBUyxFQUFFLElBQUksb0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRXZGLCtCQUErQjtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLElBQUksNENBQTZCLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLElBQUksNkNBQThCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3pELENBQUM7UUFFRiwrREFBK0Q7UUFDL0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsZUFBZSxJQUFJLDBCQUFlLENBQUMsV0FBVyxtQkFBTSxPQUFPLENBQUMsS0FBSyxFQUFHLENBQUM7UUFDcEcsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsY0FBYyxJQUFJLHlCQUFjLENBQUMsV0FBVyxpQkFBRyxPQUFPLEVBQUUsSUFBSSxJQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUcsQ0FBQztRQUUvRyxzQ0FBc0M7UUFDdEMsSUFBSSxPQUFPLENBQUMsU0FBZ0IsS0FBSyxLQUFLLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZO1FBQ1Ys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SSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGFBQUksbUJBQU0sSUFBSSxJQUFFLFdBQVcsRUFBRSxLQUFLLElBQUcsQ0FBQyxDQUFDO2lCQUNqRTtnQkFBQyxPQUFPLEtBQUssRUFBRTtvQkFDZCxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztvQkFDMUIsTUFBTSxLQUFLLENBQUM7aUJBQ2I7YUFDRjtZQUVELE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxpQkFBaUI7O1lBQzVCLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBRTdELElBQUk7Z0JBRUYsSUFBSSxLQUFLLENBQUMsV0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtvQkFDdkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QjtnQkFDRCxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUU7b0JBQ3JCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGFBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzFFO2FBRUY7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxLQUFLLENBQUM7YUFDYjtZQUVELE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQztLQUFBOztBQS9KYSw2QkFBcUIsR0FBRyxpQkFBaUIsQ0FBQztBQVIxRCwwQkF3S0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IEh0dHBJbnRlcmNlcHRvciwgSHR0cE9wdGlvbnMgfSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBTdG9yYWdlVXRpbCwgTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgT0F1dGhXZWJTZXJ2aWNlLCBPQXV0aFdlYlNlcnZpY2VPcHRpb25zLCBVc2VyV2ViU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzJztcbmltcG9ydCB7IFNlc3Npb25DcmVkZW50aWFsc0ludGVyY2VwdG9yLCBTZXNzaW9uVW5hdXRob3JpemVkSW50ZXJjZXB0b3IgfSBmcm9tICcuL2ludGVyY2VwdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2Vzc2lvbk9wdGlvbnMge1xuICBodHRwPzogSHR0cE9wdGlvbnM7XG4gIGF1dG9GZXRjaD86IGJvb2xlYW47XG4gIHN0b3JhZ2U/OiBTdG9yYWdlVXRpbDtcbiAgb2F1dGg/OiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zO1xuICB1c2VyV2ViU2VydmljZT86IFVzZXJXZWJTZXJ2aWNlO1xuICBvYXV0aFdlYlNlcnZpY2U/OiBPQXV0aFdlYlNlcnZpY2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlc3Npb24ge1xuICBjdXJyZW50PzogVXNlcjtcbiAgc3RvcmFnZTogU3RvcmFnZVV0aWw7XG4gIG9ic2VydmFibGU6IE9ic2VydmFibGU7XG4gIHVzZXJXZWJTZXJ2aWNlOiBVc2VyV2ViU2VydmljZTtcbiAgb2F1dGhXZWJTZXJ2aWNlOiBPQXV0aFdlYlNlcnZpY2U7XG4gIF9pbnRlcmNlcHRvcnM6IEh0dHBJbnRlcmNlcHRvcltdID0gW107XG5cbiAgcHVibGljIHN0YXRpYyBFVkVOVF9TRVNTSU9OX0NIQU5HRUQgPSAnU0VTU0lPTl9DSEFOR0VEJztcblxuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBTZXNzaW9uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBTZXNzaW9uT3B0aW9ucykge1xuICAgIHRoaXMub2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5zdG9yYWdlID0gb3B0aW9ucy5zdG9yYWdlIHx8IG5ldyBTdG9yYWdlVXRpbCgnc2Vzc2lvbicsIG5ldyBMb2NhbFN0b3JhZ2Uod2luZG93KSk7XG5cbiAgICAvLyBQcmVwYXJlIHNlc3Npb24gaW50ZXJjZXB0b3JzXG4gICAgdGhpcy5faW50ZXJjZXB0b3JzID0gW1xuICAgICAgbmV3IFNlc3Npb25DcmVkZW50aWFsc0ludGVyY2VwdG9yKHRoaXMpLFxuICAgICAgbmV3IFNlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvcigoKSA9PiB0aGlzLmRlc3Ryb3koKSksXG4gICAgXTtcblxuICAgIC8vIFRPRE86IFNlcnZpY2UgaW5zdGFuY2Ugb3IgY29uZmlnIGFyZSByZXF1aXJlZCwgdmFsaWRhdGUgdGhpc1xuICAgIHRoaXMub2F1dGhXZWJTZXJ2aWNlID0gb3B0aW9ucy5vYXV0aFdlYlNlcnZpY2UgfHwgT0F1dGhXZWJTZXJ2aWNlLmdldEluc3RhbmNlKHsgLi4ub3B0aW9ucy5vYXV0aCB9KTtcbiAgICB0aGlzLnVzZXJXZWJTZXJ2aWNlID0gb3B0aW9ucy51c2VyV2ViU2VydmljZSB8fCBVc2VyV2ViU2VydmljZS5nZXRJbnN0YW5jZSh7IHNlc3Npb246IHRoaXMsIC4uLm9wdGlvbnMuaHR0cCB9KTtcblxuICAgIC8vIEZldGNoIHNlc3Npb24gaW4gc3RhcnR1cCBieSBkZWZhdWx0XG4gICAgaWYgKG9wdGlvbnMuYXV0b0ZldGNoIGFzIGFueSAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZmV0Y2goKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc2VzaXNvbiBpbnRlcmNlcHRvcnMgZm9yIGF1dGhvcml6ZWQgY2FsbHMgYW5kIGF1dG8gc2Vzc2lvbiBkZXN0cnVjdGlvbi5cbiAgICovXG4gIGludGVyY2VwdG9ycygpOiBIdHRwSW50ZXJjZXB0b3JbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludGVyY2VwdG9ycztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHNlc3Npb24gc2luZ2xldG9uIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgc2Vzc2lvbiBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKG9wdGlvbnM6IFNlc3Npb25PcHRpb25zKTogU2Vzc2lvbiB7XG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XG4gICAgICB0aGlzLmluc3RhbmNlID0gbmV3IFNlc3Npb24ob3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSBmb3IgdXBkYXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtPYnNlcnZlcn0gb2JzZXJ2YWJsZSBUaGUgaW5zdGFjZSB0byBiZSBub3RpZmllZFxuICAgKi9cbiAgcHVibGljIHN1YnNjcmliZShvYnNlcnZhYmxlOiBPYnNlcnZlcikge1xuICAgIHRoaXMub2JzZXJ2YWJsZS5zdWJzY3JpYmUob2JzZXJ2YWJsZSk7XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB1cGRhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge09ic2VydmVyfSBvYnNlcnZhYmxlIFRoZSBpbnN0YW5jZSB0byBiZSByZW1vdmVkIGZyb20gbGlzdGVuZXJzXG4gICAqL1xuICBwdWJsaWMgdW5zdWJzY3JpYmUob2JzZXJ2YWJsZTogT2JzZXJ2ZXIpIHtcbiAgICB0aGlzLm9ic2VydmFibGUudW5zdWJzY3JpYmUob2JzZXJ2YWJsZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgbmV3IHVzZXIgaW4gc2Vzc2lvbiwgbm90aWZ5aW5nIGFsbCBvYnNlcnZlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB1c2VyIFRoZSB1c2VyIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7e25vdGlmeTogYm9vbGVhbn19IG9wdGlvbnMgVGhlIG9wZXJhdGlvbiBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVnaXN0ZXIodXNlcjogVXNlciwgb3B0aW9ucyA9IHsgbm90aWZ5OiB0cnVlIH0pIHtcbiAgICB0aGlzLmN1cnJlbnQgPSB1c2VyO1xuXG4gICAgLy8gU2F2ZSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLnB1dCgnc2Vzc2lvbicsIHRoaXMuY3VycmVudCk7XG5cbiAgICAvLyBBdCBsYXN0LCBub3RpZnkgb2JzZXJ2ZXJzIG9mIHRoaXMgY2hhbmdlXG4gICAgaWYgKCFvcHRpb25zIHx8IChvcHRpb25zICYmIG9wdGlvbnMubm90aWZ5KSkge1xuICAgICAgYXdhaXQgdGhpcy5vYnNlcnZhYmxlLm5vdGlmeShTZXNzaW9uLkVWRU5UX1NFU1NJT05fQ0hBTkdFRCwgdGhpcy5jdXJyZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIHRoZSBjdXJyZW50bHkgc3RvcmVkIHNlc3Npb24uXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgZmV0Y2goKSB7XG4gICAgdGhpcy5jdXJyZW50ID0gYXdhaXQgdGhpcy5zdG9yYWdlLmdldCgnc2Vzc2lvbicpO1xuXG4gICAgYXdhaXQgdGhpcy5vYnNlcnZhYmxlLm5vdGlmeShTZXNzaW9uLkVWRU5UX1NFU1NJT05fQ0hBTkdFRCwgdGhpcy5jdXJyZW50KTtcblxuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIHNlc3Npb24gYW5kIGNsZWFycyB0aGUgc3RvcmFnZS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBkZXN0cm95KCkge1xuICAgIHRoaXMuY3VycmVudCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIERlc3Ryb3lzIGluIGxvY2FsIHN0b3JhZ2VcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcblxuICAgIC8vIEF0IGxhc3QsIG5vdGlmeSBvYnNlcnZlcnMgb2YgdGhpcyBjaGFuZ2VcbiAgICBhd2FpdCB0aGlzLm9ic2VydmFibGUubm90aWZ5KFNlc3Npb24uRVZFTlRfU0VTU0lPTl9DSEFOR0VELCB0aGlzLmN1cnJlbnQpO1xuXG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xuICAgICAgLy8gUmV2b2tlcyB0aGUgdG9rZW4gaW4gdGhlIE9BdXRoIFNlcnZlclxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5vYXV0aFdlYlNlcnZpY2UucmV2b2tlKHRoaXMuY3VycmVudC5jcmVkZW50aWFscy5hY2Nlc3NUb2tlbik7XG4gICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdTRVNTSU9OOiBDb3VsZCBub3QgZGVzdHJveSBjdXJyZW50IHNlc3Npb24nLCBleGNlcHRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBcInBhc3N3b3JkXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIgYW5kIHJlZ2lzdGVycyBpdCBpbiBjdXJyZW50IHNlc3Npb24uXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIFRoZSB1c2VyIGNyZWRlbnRpYWxzXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcGFzc3dvcmQoZGF0YTogeyB1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nIH0pOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCBvYXV0aCA9IGF3YWl0IHRoaXMub2F1dGhXZWJTZXJ2aWNlLnBhc3N3b3JkKGRhdGEpO1xuXG4gICAgaWYgKG9hdXRoLmFjY2Vzc1Rva2VuKSB7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnVzZXJXZWJTZXJ2aWNlLm1lKG9hdXRoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXIobmV3IFVzZXIoeyAuLi51c2VyLCBjcmVkZW50aWFsczogb2F1dGggfSkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZXJyb3IuY3JlZGVudGlhbHMgPSBvYXV0aDtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhyb3cgb2F1dGg7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBcImNsaWVudF9jcmVkZW50aWFsc1wiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyIGFuZCByZWdpc3RlcnMgaXQgaW4gY3VycmVudCBzZXNzaW9uLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNsaWVudENyZWRlbnRpYWxzKCk6IFByb21pc2U8VXNlcj4ge1xuICAgIGNvbnN0IG9hdXRoID0gYXdhaXQgdGhpcy5vYXV0aFdlYlNlcnZpY2UuY2xpZW50Q3JlZGVudGlhbHMoKTtcblxuICAgIHRyeSB7XG5cbiAgICAgIGlmIChvYXV0aC5hY2Nlc3NUb2tlbiAmJiAhb2F1dGgudmlydHVhbCkge1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyV2ViU2VydmljZS5tZShvYXV0aCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKHVzZXIpO1xuICAgICAgfVxuICAgICAgaWYgKG9hdXRoLmFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyKG5ldyBVc2VyKHsgaWQ6IG9hdXRoLnVzZXJJZCwgY3JlZGVudGlhbHM6IG9hdXRoIH0pKTtcbiAgICAgIH1cblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBlcnJvci5jcmVkZW50aWFscyA9IG9hdXRoO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgdGhyb3cgb2F1dGg7XG4gIH1cbn1cbiJdfQ==