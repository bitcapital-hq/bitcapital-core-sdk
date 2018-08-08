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
const session_1 = require("../session");
const base_1 = require("../base");
const models_1 = require("../models");
const utils_1 = require("../utils");
class UserWebService {
    constructor(options) {
        this.http = new base_1.Http(options);
        if (session_1.Session.getInstance()) {
            this.http.interceptors(session_1.Session.getInstance().interceptors());
        }
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new UserWebService(options);
        return this.instance;
    }
    /**
     * Find all {#User}s.
     */
    findAll(pagination, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get("/users", null, { params: { skip, limit, role } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new models_1.User(item));
            return utils_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find a {#User} by it's id.
     *
     * @param id The id of the {#User}
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/users/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.User(response.data);
        });
    }
    /**
     * Partially update an existing {#User}.
     *
     * @param id the id of the {#User}
     * @param user The values you want to update
     */
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/users/${id}`, user);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.User(response.data);
        });
    }
    /**
     *  Inserts a new {#User}.
     *
     * @param consumer The values you want to upsert
     */
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/users`, user);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.User(response.data);
        });
    }
    /**
     * Delete an {$User} by it's id
     *
     * @param id The id of the {#User}
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
     * Gets the current {#User} information from the API.
     *
     * @param credentials The OAuth 2.0 credentials for the request
     */
    me(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get("/users/me", {}, {
                // TODO: move this to an interceptor
                headers: { Authorization: credentials ? `Bearer ${credentials.accessToken}` : undefined }
            });
            return new models_1.User(Object.assign({ credentials }, response.data));
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
exports.default = UserWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcldlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvVXNlcldlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHdDQUFxQztBQUNyQyxrQ0FBNEM7QUFDNUMsc0NBQXlFO0FBQ3pFLG9DQUFzRTtBQUd0RTtJQUlFLFlBQVksT0FBb0I7UUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5QixJQUFJLGlCQUFPLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFvQjtRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDVSxPQUFPLENBQUMsVUFBc0IsRUFBRSxJQUFlOztZQUMxRCxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV4RixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFB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QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtRQUNILENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxLQUFLLENBQUMsS0FBYTs7WUFDOUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBRWpFLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUExSUQsaUNBMElDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gXCIuLi9zZXNzaW9uXCI7XG5pbXBvcnQgeyBIdHRwLCBIdHRwT3B0aW9ucyB9IGZyb20gXCIuLi9iYXNlXCI7XG5pbXBvcnQgeyBVc2VyLCBVc2VyU2NoZW1hLCBPQXV0aENyZWRlbnRpYWxzLCBVc2VyUm9sZSB9IGZyb20gXCIuLi9tb2RlbHNcIjtcbmltcG9ydCB7IFBhZ2luYXRpb25VdGlsLCBQYWdpbmF0ZWRBcnJheSwgUGFnaW5hdGlvbiB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IEJhc2VNb2RlbFdlYlNlcnZpY2UgZnJvbSBcIi4vYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJXZWJTZXJ2aWNlIGltcGxlbWVudHMgQmFzZU1vZGVsV2ViU2VydmljZTxVc2VyLCBVc2VyU2NoZW1hPiB7XG4gIHByb3RlY3RlZCBodHRwOiBIdHRwO1xuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBVc2VyV2ViU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBIdHRwT3B0aW9ucykge1xuICAgIHRoaXMuaHR0cCA9IG5ldyBIdHRwKG9wdGlvbnMpO1xuXG4gICAgaWYgKFNlc3Npb24uZ2V0SW5zdGFuY2UoKSkge1xuICAgICAgdGhpcy5odHRwLmludGVyY2VwdG9ycyhTZXNzaW9uLmdldEluc3RhbmNlKCkuaW50ZXJjZXB0b3JzKCkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogVXNlcldlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IEh0dHBPcHRpb25zKTogVXNlcldlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgVXNlcldlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgeyNVc2VyfXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZEFsbChwYWdpbmF0aW9uOiBQYWdpbmF0aW9uLCByb2xlPzogVXNlclJvbGUpOiBQcm9taXNlPFBhZ2luYXRlZEFycmF5PFVzZXI+PiB7XG4gICAgY29uc3QgeyBza2lwLCBsaW1pdCB9ID0gcGFnaW5hdGlvbjtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoXCIvdXNlcnNcIiwgbnVsbCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQsIHJvbGUgfSB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBVc2VyU2NoZW1hKSA9PiBuZXcgVXNlcihpdGVtKSk7XG4gICAgcmV0dXJuIFBhZ2luYXRpb25VdGlsLnBhcnNlKHJlc3VsdCwgcmVzcG9uc2UuaGVhZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhIHsjVXNlcn0gYnkgaXQncyBpZC5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgeyNVc2VyfVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRPbmUoaWQ6IHN0cmluZyk6IFByb21pc2U8VXNlcj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL3VzZXJzLyR7aWR9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFVzZXIocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogUGFydGlhbGx5IHVwZGF0ZSBhbiBleGlzdGluZyB7I1VzZXJ9LlxuICAgKlxuICAgKiBAcGFyYW0gaWQgdGhlIGlkIG9mIHRoZSB7I1VzZXJ9XG4gICAqIEBwYXJhbSB1c2VyIFRoZSB2YWx1ZXMgeW91IHdhbnQgdG8gdXBkYXRlXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlKGlkOiBzdHJpbmcsIHVzZXI6IFBhcnRpYWw8VXNlclNjaGVtYT4pOiBQcm9taXNlPFVzZXI+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvdXNlcnMvJHtpZH1gLCB1c2VyKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgSW5zZXJ0cyBhIG5ldyB7I1VzZXJ9LlxuICAgKlxuICAgKiBAcGFyYW0gY29uc3VtZXIgVGhlIHZhbHVlcyB5b3Ugd2FudCB0byB1cHNlcnRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjcmVhdGUodXNlcjogVXNlclNjaGVtYSk6IFByb21pc2U8VXNlcj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC91c2Vyc2AsIHVzZXIpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBVc2VyKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbiB7JFVzZXJ9IGJ5IGl0J3MgaWRcbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgeyNVc2VyfVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlbGV0ZShpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZGVsZXRlKGAvdXNlcnMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1cnJlbnQgeyNVc2VyfSBpbmZvcm1hdGlvbiBmcm9tIHRoZSBBUEkuXG4gICAqXG4gICAqIEBwYXJhbSBjcmVkZW50aWFscyBUaGUgT0F1dGggMi4wIGNyZWRlbnRpYWxzIGZvciB0aGUgcmVxdWVzdFxuICAgKi9cbiAgcHVibGljIGFzeW5jIG1lKGNyZWRlbnRpYWxzPzogT0F1dGhDcmVkZW50aWFscyk6IFByb21pc2U8VXNlcj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChcbiAgICAgIFwiL3VzZXJzL21lXCIsXG4gICAgICB7fSxcbiAgICAgIHtcbiAgICAgICAgLy8gVE9ETzogbW92ZSB0aGlzIHRvIGFuIGludGVyY2VwdG9yXG4gICAgICAgIGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbjogY3JlZGVudGlhbHMgPyBgQmVhcmVyICR7Y3JlZGVudGlhbHMuYWNjZXNzVG9rZW59YCA6IHVuZGVmaW5lZCB9XG4gICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gbmV3IFVzZXIoeyBjcmVkZW50aWFscywgLi4ucmVzcG9uc2UuZGF0YSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSBuZXcgcGFzc3dvcmQgdXNpbmcgYSBzZWNyZXQgdG9rZW4uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2V0UGFzc3dvcmQodG9rZW46IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoXCIvdXNlcnMvcGFzc3dvcmRcIiwgeyB0b2tlbiwgcGFzc3dvcmQgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIGEgc3BlY2lmaWMgYWNjb3VudCBjcmVkZW50aWFscyBiYXNlZCBvbiBpdHMgZW1haWwuXG4gICAqXG4gICAqIEBwYXJhbSBlbWFpbCBUaGUgZW1haWwgdG8gYmUgcmVzZXRcbiAgICovXG4gIHB1YmxpYyBhc3luYyByZXNldChlbWFpbDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcIi91c2Vycy9yZXNldFwiLCB7IGVtYWlsIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuICB9XG59XG4iXX0=