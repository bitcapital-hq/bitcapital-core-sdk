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
     * Find the Wallets from a User with role Consumer.
     *
     * @param id The User ID.
     */
    findWalletsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/users/${id}/wallets`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data.map((wallet) => new bitcapital_common_1.Wallet(wallet));
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
            const accessToken = credentials && credentials.accessToken ? credentials.accessToken : undefined;
            // If a specific credential was supplied, use it in the header, then perform request
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined;
            const response = yield this.http.get("/users/me", {}, { headers });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcldlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvVXNlcldlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQVUyQjtBQUMzQixpQ0FBeUU7QUFJekUsTUFBYSxjQUFlLFNBQVEsMEJBQXFDO0lBR3ZFLFlBQVksT0FBOEI7UUFDeEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBOEI7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ1UsYUFBYSxDQUFDLFVBQXNCLEVBQUUsSUFBYzs7WUFDL0QsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFL0YsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCwrREFBK0Q7WUFDL0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFnQixFQUFFLEVBQUUsQ0FBQyxJQUFJLHdCQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2RSxPQUFPLGtD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S0FBQTtDQUNGO0FBMUpELHdDQTBKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIE9BdXRoQ3JlZGVudGlhbHMsXG4gIFVzZXIsXG4gIFVzZXJSb2xlLFxuICBVc2VyU2NoZW1hLFxuICBQYWdpbmF0aW9uLFxuICBQYWdpbmF0ZWRBcnJheSxcbiAgUGFnaW5hdGlvblV0aWwsXG4gIFdhbGxldCxcbiAgV2FsbGV0U2NoZW1hXG59IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZSwgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlcldlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cblxuZXhwb3J0IGNsYXNzIFVzZXJXZWJTZXJ2aWNlIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZTxVc2VyLCBVc2VyU2NoZW1hPiB7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IFVzZXJXZWJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFVzZXJXZWJTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBVc2VyV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogVXNlcldlYlNlcnZpY2VPcHRpb25zKTogVXNlcldlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgVXNlcldlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgVXNlcnMgYnkgcm9sZS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kQWxsQnlSb2xlKHBhZ2luYXRpb246IFBhZ2luYXRpb24sIHJvbGU6IFVzZXJSb2xlKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxVc2VyPj4ge1xuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvdXNlcnMvcm9sZS8ke3JvbGV9YCwgbnVsbCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQgfSB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBVc2VyU2NoZW1hKSA9PiBuZXcgVXNlcihpdGVtKSk7XG4gICAgcmV0dXJuIFBhZ2luYXRpb25VdGlsLnBhcnNlKHJlc3VsdCwgcmVzcG9uc2UuaGVhZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbiBVc2VyLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIFVzZXIgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZE9uZShpZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvdXNlcnMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBXYWxsZXRzIGZyb20gYSBVc2VyIHdpdGggcm9sZSBDb25zdW1lci5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBVc2VyIElELlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRXYWxsZXRzQnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxXYWxsZXRbXT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL3VzZXJzLyR7aWR9L3dhbGxldHNgKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZS5kYXRhLm1hcCgod2FsbGV0OiBXYWxsZXRTY2hlbWEpID0+IG5ldyBXYWxsZXQod2FsbGV0KSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFVzZXIuXG4gICAqXG4gICAqIEBwYXJhbSBjb25zdW1lciBUaGUgVXNlciBzY2hlbWEuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY3JlYXRlKHVzZXI6IFVzZXJTY2hlbWEpOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvdXNlcnNgLCB1c2VyKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJ0aWFsbHkgdXBkYXRlIGFuIGV4aXN0aW5nIFVzZXIuXG4gICAqXG4gICAqIEBwYXJhbSBpZCB0aGUgVXNlciBJRC5cbiAgICogQHBhcmFtIHVzZXIgVGhlIHBhcnRpYWwgVXNlciBzY2hlbWEuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlKGlkOiBzdHJpbmcsIHVzZXI6IFBhcnRpYWw8VXNlclNjaGVtYT4pOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvdXNlcnMvJHtpZH1gLCB1c2VyKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYW4gVXNlci5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBVc2VyIElELlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlbGV0ZShpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZGVsZXRlKGAvdXNlcnMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1cnJlbnQgVXNlciBpbmZvcm1hdGlvbiBmcm9tIHRoZSBBUEkuXG4gICAqXG4gICAqIEBwYXJhbSBjcmVkZW50aWFscyBUaGUgT0F1dGggMi4wIGNyZWRlbnRpYWxzIGZvciB0aGUgcmVxdWVzdFxuICAgKi9cbiAgcHVibGljIGFzeW5jIG1lKGNyZWRlbnRpYWxzPzogT0F1dGhDcmVkZW50aWFscyk6IFByb21pc2U8VXNlcj4ge1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gY3JlZGVudGlhbHMgJiYgY3JlZGVudGlhbHMuYWNjZXNzVG9rZW4gPyBjcmVkZW50aWFscy5hY2Nlc3NUb2tlbiA6IHVuZGVmaW5lZDtcblxuICAgIC8vIElmIGEgc3BlY2lmaWMgY3JlZGVudGlhbCB3YXMgc3VwcGxpZWQsIHVzZSBpdCBpbiB0aGUgaGVhZGVyLCB0aGVuIHBlcmZvcm0gcmVxdWVzdFxuICAgIGNvbnN0IGhlYWRlcnMgPSBhY2Nlc3NUb2tlbiA/IHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FjY2Vzc1Rva2VufWAgfSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoXCIvdXNlcnMvbWVcIiwge30sIHsgaGVhZGVycyB9KTtcblxuICAgIGlmIChjcmVkZW50aWFscyAmJiAhY3JlZGVudGlhbHMuZXhwaXJlc0F0ICYmIHJlc3BvbnNlLmhlYWRlcnMgJiYgcmVzcG9uc2UuaGVhZGVyc1tcIngtb2F1dGgtYmVhcmVyLWV4cGlyYXRpb25cIl0pIHtcbiAgICAgIGNyZWRlbnRpYWxzLmV4cGlyZXNBdCA9IG5ldyBEYXRlKHJlc3BvbnNlLmhlYWRlcnNbXCJ4LW9hdXRoLWJlYXJlci1leHBpcmF0aW9uXCJdKTtcbiAgICB9XG5cbiAgICBpZiAoY3JlZGVudGlhbHMgJiYgIWNyZWRlbnRpYWxzLnNjb3BlICYmIHJlc3BvbnNlLmhlYWRlcnMgJiYgcmVzcG9uc2UuaGVhZGVyc1tcIngtb2F1dGgtYmVhcmVyLXNjb3BlXCJdKSB7XG4gICAgICBjcmVkZW50aWFscy5zY29wZSA9IHJlc3BvbnNlLmhlYWRlcnNbXCJ4LW9hdXRoLWJlYXJlci1zY29wZVwiXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFVzZXIoeyBjcmVkZW50aWFscywgLi4ucmVzcG9uc2UuZGF0YSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSBuZXcgcGFzc3dvcmQgdXNpbmcgYSBzZWNyZXQgdG9rZW4uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2V0UGFzc3dvcmQodG9rZW46IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoXCIvdXNlcnMvcGFzc3dvcmRcIiwgeyB0b2tlbiwgcGFzc3dvcmQgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIGEgc3BlY2lmaWMgYWNjb3VudCBjcmVkZW50aWFscyBiYXNlZCBvbiBpdHMgZW1haWwuXG4gICAqXG4gICAqIEBwYXJhbSBlbWFpbCBUaGUgZW1haWwgdG8gYmUgcmVzZXRcbiAgICovXG4gIHB1YmxpYyBhc3luYyByZXNldChlbWFpbDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcIi91c2Vycy9yZXNldFwiLCB7IGVtYWlsIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuICB9XG59XG4iXX0=