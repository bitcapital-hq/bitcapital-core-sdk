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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcldlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvVXNlcldlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQVEyQjtBQUMzQixpQ0FBeUU7QUFJekUsTUFBYSxjQUFlLFNBQVEsMEJBQXFDO0lBR3ZFLFlBQVksT0FBOEI7UUFDeEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBOEI7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ1UsYUFBYSxDQUFDLFVBQXNCLEVBQUUsSUFBYzs7WUFDL0QsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFL0YsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCwrREFBK0Q7WUFDL0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFnQixFQUFFLEVBQUUsQ0FBQyxJQUFJLHdCQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2RSxPQUFPLGtD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QVEsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQzthQUM5RDtZQUVELE9BQU8sSUFBSSx3QkFBSSxpQkFBRyxXQUFXLElBQUssUUFBUSxDQUFDLElBQUksRUFBRyxDQUFDO1FBQ3JELENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsV0FBVyxDQUFDLEtBQWEsRUFBRSxRQUFnQjs7WUFDdEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRTlFLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLEtBQUssQ0FBQyxLQUFhOztZQUM5QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQTNJRCx3Q0EySUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBPQXV0aENyZWRlbnRpYWxzLFxuICBVc2VyLFxuICBVc2VyUm9sZSxcbiAgVXNlclNjaGVtYSxcbiAgUGFnaW5hdGlvbixcbiAgUGFnaW5hdGVkQXJyYXksXG4gIFBhZ2luYXRpb25VdGlsXG59IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZSwgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlcldlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cblxuZXhwb3J0IGNsYXNzIFVzZXJXZWJTZXJ2aWNlIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZTxVc2VyLCBVc2VyU2NoZW1hPiB7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IFVzZXJXZWJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFVzZXJXZWJTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBVc2VyV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogVXNlcldlYlNlcnZpY2VPcHRpb25zKTogVXNlcldlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgVXNlcldlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgVXNlcnMgYnkgcm9sZS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kQWxsQnlSb2xlKHBhZ2luYXRpb246IFBhZ2luYXRpb24sIHJvbGU6IFVzZXJSb2xlKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxVc2VyPj4ge1xuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvdXNlcnMvcm9sZS8ke3JvbGV9YCwgbnVsbCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQgfSB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBVc2VyU2NoZW1hKSA9PiBuZXcgVXNlcihpdGVtKSk7XG4gICAgcmV0dXJuIFBhZ2luYXRpb25VdGlsLnBhcnNlKHJlc3VsdCwgcmVzcG9uc2UuaGVhZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbiBVc2VyLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIFVzZXIgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZE9uZShpZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvdXNlcnMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVXNlci5cbiAgICpcbiAgICogQHBhcmFtIGNvbnN1bWVyIFRoZSBVc2VyIHNjaGVtYS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBjcmVhdGUodXNlcjogVXNlclNjaGVtYSk6IFByb21pc2U8VXNlcj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC91c2Vyc2AsIHVzZXIpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBVc2VyKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnRpYWxseSB1cGRhdGUgYW4gZXhpc3RpbmcgVXNlci5cbiAgICpcbiAgICogQHBhcmFtIGlkIHRoZSBVc2VyIElELlxuICAgKiBAcGFyYW0gdXNlciBUaGUgcGFydGlhbCBVc2VyIHNjaGVtYS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUoaWQ6IHN0cmluZywgdXNlcjogUGFydGlhbDxVc2VyU2NoZW1hPik6IFByb21pc2U8VXNlcj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC91c2Vycy8ke2lkfWAsIHVzZXIpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBVc2VyKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbiBVc2VyLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIFVzZXIgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGVsZXRlKGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5kZWxldGUoYC91c2Vycy8ke2lkfWApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VycmVudCBVc2VyIGluZm9ybWF0aW9uIGZyb20gdGhlIEFQSS5cbiAgICpcbiAgICogQHBhcmFtIGNyZWRlbnRpYWxzIFRoZSBPQXV0aCAyLjAgY3JlZGVudGlhbHMgZm9yIHRoZSByZXF1ZXN0XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbWUoY3JlZGVudGlhbHM/OiBPQXV0aENyZWRlbnRpYWxzKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBjcmVkZW50aWFscyAmJiBjcmVkZW50aWFscy5hY2Nlc3NUb2tlbiA/IGNyZWRlbnRpYWxzLmFjY2Vzc1Rva2VuIDogdW5kZWZpbmVkO1xuXG4gICAgLy8gSWYgYSBzcGVjaWZpYyBjcmVkZW50aWFsIHdhcyBzdXBwbGllZCwgdXNlIGl0IGluIHRoZSBoZWFkZXIsIHRoZW4gcGVyZm9ybSByZXF1ZXN0XG4gICAgY29uc3QgaGVhZGVycyA9IGFjY2Vzc1Rva2VuID8geyBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YCB9IDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChcIi91c2Vycy9tZVwiLCB7fSwgeyBoZWFkZXJzIH0pO1xuXG4gICAgaWYgKGNyZWRlbnRpYWxzICYmICFjcmVkZW50aWFscy5leHBpcmVzQXQgJiYgcmVzcG9uc2UuaGVhZGVycyAmJiByZXNwb25zZS5oZWFkZXJzW1wieC1vYXV0aC1iZWFyZXItZXhwaXJhdGlvblwiXSkge1xuICAgICAgY3JlZGVudGlhbHMuZXhwaXJlc0F0ID0gbmV3IERhdGUocmVzcG9uc2UuaGVhZGVyc1tcIngtb2F1dGgtYmVhcmVyLWV4cGlyYXRpb25cIl0pO1xuICAgIH1cblxuICAgIGlmIChjcmVkZW50aWFscyAmJiAhY3JlZGVudGlhbHMuc2NvcGUgJiYgcmVzcG9uc2UuaGVhZGVycyAmJiByZXNwb25zZS5oZWFkZXJzW1wieC1vYXV0aC1iZWFyZXItc2NvcGVcIl0pIHtcbiAgICAgIGNyZWRlbnRpYWxzLnNjb3BlID0gcmVzcG9uc2UuaGVhZGVyc1tcIngtb2F1dGgtYmVhcmVyLXNjb3BlXCJdO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcih7IGNyZWRlbnRpYWxzLCAuLi5yZXNwb25zZS5kYXRhIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIG5ldyBwYXNzd29yZCB1c2luZyBhIHNlY3JldCB0b2tlbi5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZXRQYXNzd29yZCh0b2tlbjogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcIi91c2Vycy9wYXNzd29yZFwiLCB7IHRva2VuLCBwYXNzd29yZCB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgYSBzcGVjaWZpYyBhY2NvdW50IGNyZWRlbnRpYWxzIGJhc2VkIG9uIGl0cyBlbWFpbC5cbiAgICpcbiAgICogQHBhcmFtIGVtYWlsIFRoZSBlbWFpbCB0byBiZSByZXNldFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJlc2V0KGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFwiL3VzZXJzL3Jlc2V0XCIsIHsgZW1haWwgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==