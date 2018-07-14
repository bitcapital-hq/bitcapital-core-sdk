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
const base_1 = require("../base");
const models_1 = require("../models");
const utils_1 = require("../utils");
class UserWebService extends base_1.Http {
    constructor(options) {
        super(options);
        if (options.session) {
            this.interceptors(options.session.interceptors());
        }
    }
    static getInstance(options) {
        if (!this.instance) {
            this.instance = new UserWebService(options);
        }
        return this.instance;
    }
    /**
     * Finds users with a given query
     * @param query The query of the search
     */
    find(query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get('/users', query);
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new models_1.User(item));
            return utils_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find a user by giving it's ID
     * @param id The id of the user
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get(`/users/${id}`, {});
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.User(response.data);
        });
    }
    /**
     * Creates a new user
     * @param user The user properties
     */
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.post('/users', new models_1.User(user));
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.User(response.data);
        });
    }
    /**
     * Updates an existing {#User}.
     *
     * @param id the id of the {#User}
     * @param user The values you want to update
     */
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.put(`/users/${id}`, user);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.User(Object.assign({}, response.data));
        });
    }
    /**
     * Deletes a given user
     * @param id The id of the user
     */
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.delete(`/users/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
    /**
     * Gets the current user information from API.
     *
     * @param credentials The OAuth 2.0 credentials for the request
     */
    me(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get('/users/me', {}, {
                // TODO: move this to an interceptor
                headers: { Authorization: credentials ? `Bearer ${credentials.accessToken}` : undefined },
            });
            return new models_1.User(Object.assign({ credentials }, response.data));
        });
    }
    /**
     * Set a new password using a secret token.
     */
    setPassword(token, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.post('/users/password', { token, password });
            if (!response || response.status !== 200) {
                throw response;
            }
        });
    }
    /**
     * Resets a specific account credentials based on its email.
     *
     * @param email The email to be reset
     */
    reset(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.post('/users/reset', { email });
            if (!response || response.status !== 200) {
                throw response;
            }
        });
    }
}
exports.default = UserWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcldlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvVXNlcldlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLGtDQUE0QztBQUM1QyxzQ0FBK0Q7QUFDL0Qsb0NBQTBEO0FBTTFELG9CQUFvQyxTQUFRLFdBQUk7SUFJOUMsWUFBWSxPQUE4QjtRQUN4QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUE4QjtRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7SUFDVSxJQUFJLENBQUMsUUFBYSxFQUFFOztZQUMvQixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRWpELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsK0RBQStEO1lBQy9ELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBZ0IsRUFBRSxFQUFFLENBQUMsSUFBSSxhQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2RSxPQUFPLHNCQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMs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QUFRLENBQUM7YUFDaEI7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQWpJRCxpQ0FpSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vc2Vzc2lvbic7XG5pbXBvcnQgeyBIdHRwLCBIdHRwT3B0aW9ucyB9IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IHsgVXNlciwgVXNlclNjaGVtYSwgT0F1dGhDcmVkZW50aWFscyB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uVXRpbCwgUGFnaW5hdGVkQXJyYXkgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlcldlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgSHR0cE9wdGlvbnMge1xuICBzZXNzaW9uPzogU2Vzc2lvbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlcldlYlNlcnZpY2UgZXh0ZW5kcyBIdHRwIHtcbiAgcHJvdGVjdGVkIG9wdGlvbnM6IFVzZXJXZWJTZXJ2aWNlT3B0aW9ucztcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogVXNlcldlYlNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogVXNlcldlYlNlcnZpY2VPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMuc2Vzc2lvbikge1xuICAgICAgdGhpcy5pbnRlcmNlcHRvcnMob3B0aW9ucy5zZXNzaW9uLmludGVyY2VwdG9ycygpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKG9wdGlvbnM6IFVzZXJXZWJTZXJ2aWNlT3B0aW9ucyk6IFVzZXJXZWJTZXJ2aWNlIHtcbiAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgVXNlcldlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIHVzZXJzIHdpdGggYSBnaXZlbiBxdWVyeVxuICAgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IG9mIHRoZSBzZWFyY2hcbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kKHF1ZXJ5OiBhbnkgPSB7fSk6IFByb21pc2U8UGFnaW5hdGVkQXJyYXk8VXNlcj4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0KCcvdXNlcnMnLCBxdWVyeSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBwYWdpbmF0ZWQgYXJyYXkgd2l0aCBjb3VudCBpbmZvcm1hdGlvbiBmcm9tIGhlYWRlcnNcbiAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5kYXRhLm1hcCgoaXRlbTogVXNlclNjaGVtYSkgPT4gbmV3IFVzZXIoaXRlbSkpO1xuICAgIHJldHVybiBQYWdpbmF0aW9uVXRpbC5wYXJzZShyZXN1bHQsIHJlc3BvbnNlLmhlYWRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSB1c2VyIGJ5IGdpdmluZyBpdCdzIElEXG4gICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHVzZXJcbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kQnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldChgL3VzZXJzLyR7aWR9YCwge30pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBVc2VyKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgdXNlclxuICAgKiBAcGFyYW0gdXNlciBUaGUgdXNlciBwcm9wZXJ0aWVzXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY3JlYXRlKHVzZXI6IFVzZXJTY2hlbWEpOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucG9zdCgnL3VzZXJzJywgbmV3IFVzZXIodXNlcikpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBVc2VyKHJlc3BvbnNlLmRhdGEpO1xuXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhbiBleGlzdGluZyB7I1VzZXJ9LlxuICAgKlxuICAgKiBAcGFyYW0gaWQgdGhlIGlkIG9mIHRoZSB7I1VzZXJ9XG4gICAqIEBwYXJhbSB1c2VyIFRoZSB2YWx1ZXMgeW91IHdhbnQgdG8gdXBkYXRlXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlKGlkOiBzdHJpbmcsIHVzZXI6IFVzZXJTY2hlbWEpOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucHV0KGAvdXNlcnMvJHtpZH1gLCB1c2VyKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcih7IC4uLnJlc3BvbnNlLmRhdGEgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhIGdpdmVuIHVzZXJcbiAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgdXNlclxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlbGV0ZUJ5SWQoaWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5kZWxldGUoYC91c2Vycy8ke2lkfWApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCB1c2VyIGluZm9ybWF0aW9uIGZyb20gQVBJLlxuICAgKlxuICAgKiBAcGFyYW0gY3JlZGVudGlhbHMgVGhlIE9BdXRoIDIuMCBjcmVkZW50aWFscyBmb3IgdGhlIHJlcXVlc3RcbiAgICovXG4gIHB1YmxpYyBhc3luYyBtZShjcmVkZW50aWFscz86IE9BdXRoQ3JlZGVudGlhbHMpOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0KCcvdXNlcnMvbWUnLCB7fSwge1xuICAgICAgLy8gVE9ETzogbW92ZSB0aGlzIHRvIGFuIGludGVyY2VwdG9yXG4gICAgICBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGNyZWRlbnRpYWxzID8gYEJlYXJlciAke2NyZWRlbnRpYWxzLmFjY2Vzc1Rva2VufWAgOiB1bmRlZmluZWQgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IFVzZXIoeyBjcmVkZW50aWFscywgLi4ucmVzcG9uc2UuZGF0YSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSBuZXcgcGFzc3dvcmQgdXNpbmcgYSBzZWNyZXQgdG9rZW4uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2V0UGFzc3dvcmQodG9rZW46IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wb3N0KCcvdXNlcnMvcGFzc3dvcmQnLCB7IHRva2VuLCBwYXNzd29yZCB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgYSBzcGVjaWZpYyBhY2NvdW50IGNyZWRlbnRpYWxzIGJhc2VkIG9uIGl0cyBlbWFpbC5cbiAgICpcbiAgICogQHBhcmFtIGVtYWlsIFRoZSBlbWFpbCB0byBiZSByZXNldFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJlc2V0KGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucG9zdCgnL3VzZXJzL3Jlc2V0JywgeyBlbWFpbCB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cbiAgfVxufVxuIl19