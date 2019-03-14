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
const bitcapital_common_1 = require("bitcapital-common");
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
            const response = yield this.http.get(`/consumers/${userId}/phones`, null, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new bitcapital_common_1.Phone(item));
            return bitcapital_common_1.PaginationUtil.parse(result, response.headers);
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
            const response = yield this.http.get(`/consumers/${userId}/phones/${phoneId}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Phone(response.data);
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
            const response = yield this.http.post(`/consumers/${userId}/phones`, phone);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Phone(response.data);
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
            const response = yield this.http.post(`/consumers/${userId}/phones/${phoneId}`, phone);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Phone(response.data);
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
            const response = yield this.http.delete(`/consumers/${userId}/phones/${phoneId}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
}
exports.PhoneWebService = PhoneWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGhvbmVXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL1Bob25lV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQTZFO0FBQzdFLHlEQUFtRztBQUluRyxNQUFhLGVBQWdCLFNBQVEsNEJBQXlDO0lBRzVFLFlBQStCLE9BQStCO1FBQzVELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURjLFlBQU8sR0FBUCxPQUFPLENBQXdCO0lBRTlELENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1UsT0FBTyxDQUFDLE1BQWMsRUFBRSxVQUFzQjs7WUFDekQsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLE1BQU0sU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFdkcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCwrREFBK0Q7WUFDL0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFpQixFQUFFLEVBQUUsQ0FBQyxJQUFJLHlCQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6RSxPQUFPLGtDQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEQsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxPQUFPLENBQUMsTUFBYyxFQUFFLE9BQWU7O1lBQ2xELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxNQUFNLFdBQVcsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUUvRSxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSx5QkFBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLE1BQU0sQ0FBQyxNQUFjLEVBQUUsS0FBa0I7O1lBQ3BELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxNQUFNLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUU1RSxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSx5QkFBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDVSxNQUFNLENBQUMsTUFBYyxFQUFFLE9BQWUsRUFBRSxLQUEyQjs7WUFDOUUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLE1BQU0sV0FBVyxPQUFPLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUV2RixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSx5QkFBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLE1BQU0sQ0FBQyxNQUFjLEVBQUUsT0FBZTs7WUFDakQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLE1BQU0sV0FBVyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRWxGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7Q0FDRjtBQW5HRCwwQ0FtR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXN0ZWRNb2RlbFdlYlNlcnZpY2UsIE5lc3RlZE1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7IFBob25lLCBQaG9uZVNjaGVtYSwgUGFnaW5hdGlvbiwgUGFnaW5hdGVkQXJyYXksIFBhZ2luYXRpb25VdGlsIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBob25lV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBOZXN0ZWRNb2RlbFdlYlNlcnZpY2VPcHRpb25zIHt9XHJcblxyXG5leHBvcnQgY2xhc3MgUGhvbmVXZWJTZXJ2aWNlIGV4dGVuZHMgTmVzdGVkTW9kZWxXZWJTZXJ2aWNlPFBob25lLCBQaG9uZVNjaGVtYT4ge1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IFBob25lV2ViU2VydmljZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IG9wdGlvbnM6IFBob25lV2ViU2VydmljZU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBQaG9uZVdlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogUGhvbmVXZWJTZXJ2aWNlT3B0aW9ucyk6IFBob25lV2ViU2VydmljZSB7XHJcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFBob25lV2ViU2VydmljZShvcHRpb25zKTtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluZCBhbGwgUGhvbmVzIGZyb20gYSBDb25zdW1lci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cclxuICAgKiBAcGFyYW0gcGFnaW5hdGlvbiBUaGUgcGFnaW5hdGlvbiBwYXJhbWV0ZXJzLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBmaW5kQWxsKHVzZXJJZDogc3RyaW5nLCBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxQaG9uZT4+IHtcclxuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9jb25zdW1lcnMvJHt1c2VySWR9L3Bob25lc2AsIG51bGwsIHsgcGFyYW1zOiB7IHNraXAsIGxpbWl0IH0gfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm4gYSBwYWdpbmF0ZWQgYXJyYXkgd2l0aCBjb3VudCBpbmZvcm1hdGlvbiBmcm9tIGhlYWRlcnNcclxuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBQaG9uZVNjaGVtYSkgPT4gbmV3IFBob25lKGl0ZW0pKTtcclxuICAgIHJldHVybiBQYWdpbmF0aW9uVXRpbC5wYXJzZShyZXN1bHQsIHJlc3BvbnNlLmhlYWRlcnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluZCBhbiBQaG9uZSBiYXNlZCBvbiBpdCdzIElELlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxyXG4gICAqIEBwYXJhbSBwaG9uZUlkIFRoZSBQaG9uZSBJRC5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZmluZE9uZSh1c2VySWQ6IHN0cmluZywgcGhvbmVJZDogc3RyaW5nKTogUHJvbWlzZTxQaG9uZT4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvY29uc3VtZXJzLyR7dXNlcklkfS9waG9uZXMvJHtwaG9uZUlkfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQaG9uZShyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBQaG9uZSBpbiB0aGUgcGxhdGZvcm0uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXHJcbiAgICogQHBhcmFtIHBob25lIFRoZSBQaG9uZSBzY2hlbWEuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGNyZWF0ZSh1c2VySWQ6IHN0cmluZywgcGhvbmU6IFBob25lU2NoZW1hKTogUHJvbWlzZTxQaG9uZT4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVycy8ke3VzZXJJZH0vcGhvbmVzYCwgcGhvbmUpO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQaG9uZShyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhcnRpYWxseSB1cGRhdGUgYW4gZXhpc3RpbmcgUGhvbmUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXHJcbiAgICogQHBhcmFtIHBob25lSWQgVGhlIFBob25lIElELlxyXG4gICAqIEBwYXJhbSBwaG9uZSBUaGUgcGFydGlhbCBQaG9uZSBzY2hlbWEuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHVwZGF0ZSh1c2VySWQ6IHN0cmluZywgcGhvbmVJZDogc3RyaW5nLCBwaG9uZTogUGFydGlhbDxQaG9uZVNjaGVtYT4pOiBQcm9taXNlPFBob25lPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7dXNlcklkfS9waG9uZXMvJHtwaG9uZUlkfWAsIHBob25lKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUGhvbmUocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWxldGUgYW4gUGhvbmUgZnJvbSB0aGUgcGxhdGZvcm0uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXHJcbiAgICogQHBhcmFtIHBob25lSWQgVGhlIFBob25lIElELlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBkZWxldGUodXNlcklkOiBzdHJpbmcsIHBob25lSWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZGVsZXRlKGAvY29uc3VtZXJzLyR7dXNlcklkfS9waG9uZXMvJHtwaG9uZUlkfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==