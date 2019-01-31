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
const base_1 = require("./base");
class UserWebService extends base_1.BaseModelWebService {
    constructor(options) {
        super(options);
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new UserWebService(options);
        return this.instance;
    }
    /**
     * Find all Users by role.
     */
    findAllByRole(pagination, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get(`/users/role/${role}`, null, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new bitcapital_common_1.User(item));
            return bitcapital_common_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find an User.
     *
     * @param id The User ID.
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/users/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.User(response.data);
        });
    }
    /**
     * Create a new User.
     *
     * @param consumer The User schema.
     */
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/users`, user);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.User(response.data);
        });
    }
    /**
     * Partially update an existing User.
     *
     * @param id the User ID.
     * @param user The partial User schema.
     */
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/users/${id}`, user);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.User(response.data);
        });
    }
    /**
     * Delete an User.
     *
     * @param id The User ID.
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.delete(`/users/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
    /**
     * Gets the current User information from the API.
     *
     * @param credentials The OAuth 2.0 credentials for the request
     */
    me(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get("/users/me", {}, {
                // TODO: move this to an interceptor
                headers: { Authorization: credentials ? `Bearer ${credentials.accessToken}` : undefined }
            });
            if (credentials && !credentials.expiresAt && response.headers && response.headers["x-oauth-bearer-expiration"]) {
                credentials.expiresAt = new Date(response.headers["x-oauth-bearer-expiration"]);
            }
            if (credentials && !credentials.scope && response.headers && response.headers["x-oauth-bearer-scope"]) {
                credentials.scope = response.headers["x-oauth-bearer-scope"];
            }
            return new bitcapital_common_1.User(Object.assign({ credentials }, response.data));
        });
    }
    /**
     * Set a new password using a secret token.
     */
    setPassword(token, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post("/users/password", { token, password });
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
            const response = yield this.http.post("/users/reset", { email });
            if (!response || response.status !== 200) {
                throw response;
            }
        });
    }
}
exports.UserWebService = UserWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcldlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvVXNlcldlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQVEyQjtBQUMzQixpQ0FBeUU7QUFJekUsTUFBYSxjQUFlLFNBQVEsMEJBQXFDO0lBR3ZFLFlBQVksT0FBOEI7UUFDeEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBOEI7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ1UsYUFBYSxDQUFDLFVBQXNCLEVBQUUsSUFBYzs7WUFDL0QsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFL0YsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCwrREFBK0Q7WUFDL0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFnQixFQUFFLEVBQUUsQ0FBQyxJQUFJLHdCQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2RSxPQUFPLGtD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Q0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxXQUFXLENBQUMsS0FBYSxFQUFFLFFBQWdCOztZQUN0RCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFFOUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7UUFDSCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsS0FBSyxDQUFDLEtBQWE7O1lBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUVqRSxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtRQUNILENBQUM7S0FBQTtDQUNGO0FBOUlELHdDQThJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgT0F1dGhDcmVkZW50aWFscyxcclxuICBVc2VyLFxyXG4gIFVzZXJSb2xlLFxyXG4gIFVzZXJTY2hlbWEsXHJcbiAgUGFnaW5hdGlvbixcclxuICBQYWdpbmF0ZWRBcnJheSxcclxuICBQYWdpbmF0aW9uVXRpbFxyXG59IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xyXG5pbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlLCBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2VcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlcldlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VyV2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8VXNlciwgVXNlclNjaGVtYT4ge1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IFVzZXJXZWJTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBVc2VyV2ViU2VydmljZU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBVc2VyV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBVc2VyV2ViU2VydmljZU9wdGlvbnMpOiBVc2VyV2ViU2VydmljZSB7XHJcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFVzZXJXZWJTZXJ2aWNlKG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5kIGFsbCBVc2VycyBieSByb2xlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBmaW5kQWxsQnlSb2xlKHBhZ2luYXRpb246IFBhZ2luYXRpb24sIHJvbGU6IFVzZXJSb2xlKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxVc2VyPj4ge1xyXG4gICAgY29uc3QgeyBza2lwLCBsaW1pdCB9ID0gcGFnaW5hdGlvbjtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL3VzZXJzL3JvbGUvJHtyb2xlfWAsIG51bGwsIHsgcGFyYW1zOiB7IHNraXAsIGxpbWl0IH0gfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm4gYSBwYWdpbmF0ZWQgYXJyYXkgd2l0aCBjb3VudCBpbmZvcm1hdGlvbiBmcm9tIGhlYWRlcnNcclxuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBVc2VyU2NoZW1hKSA9PiBuZXcgVXNlcihpdGVtKSk7XHJcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmQgYW4gVXNlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZCBUaGUgVXNlciBJRC5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZmluZE9uZShpZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC91c2Vycy8ke2lkfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBVc2VyKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IFVzZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY29uc3VtZXIgVGhlIFVzZXIgc2NoZW1hLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBjcmVhdGUodXNlcjogVXNlclNjaGVtYSk6IFByb21pc2U8VXNlcj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL3VzZXJzYCwgdXNlcik7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFVzZXIocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXJ0aWFsbHkgdXBkYXRlIGFuIGV4aXN0aW5nIFVzZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaWQgdGhlIFVzZXIgSUQuXHJcbiAgICogQHBhcmFtIHVzZXIgVGhlIHBhcnRpYWwgVXNlciBzY2hlbWEuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHVwZGF0ZShpZDogc3RyaW5nLCB1c2VyOiBQYXJ0aWFsPFVzZXJTY2hlbWE+KTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvdXNlcnMvJHtpZH1gLCB1c2VyKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlbGV0ZSBhbiBVc2VyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGlkIFRoZSBVc2VyIElELlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBkZWxldGUoaWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZGVsZXRlKGAvdXNlcnMvJHtpZH1gKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgY3VycmVudCBVc2VyIGluZm9ybWF0aW9uIGZyb20gdGhlIEFQSS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBjcmVkZW50aWFscyBUaGUgT0F1dGggMi4wIGNyZWRlbnRpYWxzIGZvciB0aGUgcmVxdWVzdFxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBtZShjcmVkZW50aWFscz86IE9BdXRoQ3JlZGVudGlhbHMpOiBQcm9taXNlPFVzZXI+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChcclxuICAgICAgXCIvdXNlcnMvbWVcIixcclxuICAgICAge30sXHJcbiAgICAgIHtcclxuICAgICAgICAvLyBUT0RPOiBtb3ZlIHRoaXMgdG8gYW4gaW50ZXJjZXB0b3JcclxuICAgICAgICBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGNyZWRlbnRpYWxzID8gYEJlYXJlciAke2NyZWRlbnRpYWxzLmFjY2Vzc1Rva2VufWAgOiB1bmRlZmluZWQgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmIChjcmVkZW50aWFscyAmJiAhY3JlZGVudGlhbHMuZXhwaXJlc0F0ICYmIHJlc3BvbnNlLmhlYWRlcnMgJiYgcmVzcG9uc2UuaGVhZGVyc1tcIngtb2F1dGgtYmVhcmVyLWV4cGlyYXRpb25cIl0pIHtcclxuICAgICAgY3JlZGVudGlhbHMuZXhwaXJlc0F0ID0gbmV3IERhdGUocmVzcG9uc2UuaGVhZGVyc1tcIngtb2F1dGgtYmVhcmVyLWV4cGlyYXRpb25cIl0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjcmVkZW50aWFscyAmJiAhY3JlZGVudGlhbHMuc2NvcGUgJiYgcmVzcG9uc2UuaGVhZGVycyAmJiByZXNwb25zZS5oZWFkZXJzW1wieC1vYXV0aC1iZWFyZXItc2NvcGVcIl0pIHtcclxuICAgICAgY3JlZGVudGlhbHMuc2NvcGUgPSByZXNwb25zZS5oZWFkZXJzW1wieC1vYXV0aC1iZWFyZXItc2NvcGVcIl07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBVc2VyKHsgY3JlZGVudGlhbHMsIC4uLnJlc3BvbnNlLmRhdGEgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgYSBuZXcgcGFzc3dvcmQgdXNpbmcgYSBzZWNyZXQgdG9rZW4uXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHNldFBhc3N3b3JkKHRva2VuOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoXCIvdXNlcnMvcGFzc3dvcmRcIiwgeyB0b2tlbiwgcGFzc3dvcmQgfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0cyBhIHNwZWNpZmljIGFjY291bnQgY3JlZGVudGlhbHMgYmFzZWQgb24gaXRzIGVtYWlsLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGVtYWlsIFRoZSBlbWFpbCB0byBiZSByZXNldFxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyByZXNldChlbWFpbDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFwiL3VzZXJzL3Jlc2V0XCIsIHsgZW1haWwgfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19