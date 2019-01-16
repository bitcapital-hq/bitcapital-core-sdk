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
const base_1 = require("./base");
const models_1 = require("../models");
const utils_1 = require("../utils");
class PhoneWebService extends base_1.NestedModelWebService {
    constructor(options) {
        super(options);
        this.options = options;
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new PhoneWebService(options);
        return this.instance;
    }
    /**
     * Find all Phones from a Consumer.
     *
     * @param userId The Consumer's User ID.
     * @param pagination The pagination parameters.
     */
    findAll(userId, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get(`/consumer/${userId}/phones`, null, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new models_1.Phone(item));
            return utils_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find an Phone based on it's ID.
     *
     * @param userId The Consumer's User ID.
     * @param phoneId The Phone ID.
     */
    findOne(userId, phoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/consumer/${userId}/phones/${phoneId}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Phone(response.data);
        });
    }
    /**
     * Create a new Phone in the platform.
     *
     * @param userId The Consumer's User ID.
     * @param phone The Phone schema.
     */
    create(userId, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumer/${userId}/phones`, phone);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Phone(response.data);
        });
    }
    /**
     * Partially update an existing Phone.
     *
     * @param userId The Consumer's User ID.
     * @param phoneId The Phone ID.
     * @param phone The partial Phone schema.
     */
    update(userId, phoneId, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumer/${userId}/phones/${phoneId}`, phone);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Phone(response.data);
        });
    }
    /**
     * Delete an Phone from the platform.
     *
     * @param userId The Consumer's User ID.
     * @param phoneId The Phone ID.
     */
    delete(userId, phoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.delete(`/consumer/${userId}/phones/${phoneId}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
}
exports.PhoneWebService = PhoneWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGhvbmVXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL1Bob25lV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQTZFO0FBQzdFLHNDQUErQztBQUMvQyxvQ0FBc0U7QUFJdEUscUJBQTZCLFNBQVEsNEJBQXlDO0lBRzVFLFlBQStCLE9BQStCO1FBQzVELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURjLFlBQU8sR0FBUCxPQUFPLENBQXdCO0lBRTlELENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1UsT0FBTyxDQUFDLE1BQWMsRUFBRSxVQUFzQjs7WUFDekQsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLE1BQU0sU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFdEcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCwrREFBK0Q7WUFDL0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFpQixFQUFFLEVBQUUsQ0FBQyxJQUFJLGNBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE9BQU8sc0JBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLE9BQU8sQ0FBQyxNQUFjLEVBQUUsT0FBZTs7WUFDbEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLE1BQU0sV0FBVyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRTlFLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLGNBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxNQUFNLENBQUMsTUFBYyxFQUFFLEtBQWtCOztZQUNwRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsTUFBTSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFM0UsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksY0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDVSxNQUFNLENBQUMsTUFBYyxFQUFFLE9BQWUsRUFBRSxLQUEyQjs7WUFDOUUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLE1BQU0sV0FBVyxPQUFPLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUV0RixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxjQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsTUFBTSxDQUFDLE1BQWMsRUFBRSxPQUFlOztZQUNqRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsTUFBTSxXQUFXLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFFakYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtDQUNGO0FBbkdELDBDQW1HQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5lc3RlZE1vZGVsV2ViU2VydmljZSwgTmVzdGVkTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2VcIjtcbmltcG9ydCB7IFBob25lU2NoZW1hLCBQaG9uZSB9IGZyb20gXCIuLi9tb2RlbHNcIjtcbmltcG9ydCB7IFBhZ2luYXRpb24sIFBhZ2luYXRlZEFycmF5LCBQYWdpbmF0aW9uVXRpbCB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBob25lV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBOZXN0ZWRNb2RlbFdlYlNlcnZpY2VPcHRpb25zIHt9XG5cbmV4cG9ydCBjbGFzcyBQaG9uZVdlYlNlcnZpY2UgZXh0ZW5kcyBOZXN0ZWRNb2RlbFdlYlNlcnZpY2U8UGhvbmUsIFBob25lU2NoZW1hPiB7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IFBob25lV2ViU2VydmljZTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogUGhvbmVXZWJTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBQaG9uZVdlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IFBob25lV2ViU2VydmljZU9wdGlvbnMpOiBQaG9uZVdlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUGhvbmVXZWJTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYWxsIFBob25lcyBmcm9tIGEgQ29uc3VtZXIuXG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cbiAgICogQHBhcmFtIHBhZ2luYXRpb24gVGhlIHBhZ2luYXRpb24gcGFyYW1ldGVycy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kQWxsKHVzZXJJZDogc3RyaW5nLCBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxQaG9uZT4+IHtcbiAgICBjb25zdCB7IHNraXAsIGxpbWl0IH0gPSBwYWdpbmF0aW9uO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2NvbnN1bWVyLyR7dXNlcklkfS9waG9uZXNgLCBudWxsLCB7IHBhcmFtczogeyBza2lwLCBsaW1pdCB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGEgcGFnaW5hdGVkIGFycmF5IHdpdGggY291bnQgaW5mb3JtYXRpb24gZnJvbSBoZWFkZXJzXG4gICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YS5tYXAoKGl0ZW06IFBob25lU2NoZW1hKSA9PiBuZXcgUGhvbmUoaXRlbSkpO1xuICAgIHJldHVybiBQYWdpbmF0aW9uVXRpbC5wYXJzZShyZXN1bHQsIHJlc3BvbnNlLmhlYWRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYW4gUGhvbmUgYmFzZWQgb24gaXQncyBJRC5cbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxuICAgKiBAcGFyYW0gcGhvbmVJZCBUaGUgUGhvbmUgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZE9uZSh1c2VySWQ6IHN0cmluZywgcGhvbmVJZDogc3RyaW5nKTogUHJvbWlzZTxQaG9uZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2NvbnN1bWVyLyR7dXNlcklkfS9waG9uZXMvJHtwaG9uZUlkfWApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQaG9uZShyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgUGhvbmUgaW4gdGhlIHBsYXRmb3JtLlxuICAgKlxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXG4gICAqIEBwYXJhbSBwaG9uZSBUaGUgUGhvbmUgc2NoZW1hLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNyZWF0ZSh1c2VySWQ6IHN0cmluZywgcGhvbmU6IFBob25lU2NoZW1hKTogUHJvbWlzZTxQaG9uZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9jb25zdW1lci8ke3VzZXJJZH0vcGhvbmVzYCwgcGhvbmUpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQaG9uZShyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJ0aWFsbHkgdXBkYXRlIGFuIGV4aXN0aW5nIFBob25lLlxuICAgKlxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXG4gICAqIEBwYXJhbSBwaG9uZUlkIFRoZSBQaG9uZSBJRC5cbiAgICogQHBhcmFtIHBob25lIFRoZSBwYXJ0aWFsIFBob25lIHNjaGVtYS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUodXNlcklkOiBzdHJpbmcsIHBob25lSWQ6IHN0cmluZywgcGhvbmU6IFBhcnRpYWw8UGhvbmVTY2hlbWE+KTogUHJvbWlzZTxQaG9uZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9jb25zdW1lci8ke3VzZXJJZH0vcGhvbmVzLyR7cGhvbmVJZH1gLCBwaG9uZSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBob25lKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbiBQaG9uZSBmcm9tIHRoZSBwbGF0Zm9ybS5cbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxuICAgKiBAcGFyYW0gcGhvbmVJZCBUaGUgUGhvbmUgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGVsZXRlKHVzZXJJZDogc3RyaW5nLCBwaG9uZUlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5kZWxldGUoYC9jb25zdW1lci8ke3VzZXJJZH0vcGhvbmVzLyR7cGhvbmVJZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=