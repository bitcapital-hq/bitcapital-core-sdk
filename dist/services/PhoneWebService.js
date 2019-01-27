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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGhvbmVXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL1Bob25lV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQTZFO0FBQzdFLHlEQUFtRztBQUluRyxxQkFBNkIsU0FBUSw0QkFBeUM7SUFHNUUsWUFBK0IsT0FBK0I7UUFDNUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRGMsWUFBTyxHQUFQLE9BQU8sQ0FBd0I7SUFFOUQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUErQjtRQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVSxPQUFPLENBQUMsTUFBYyxFQUFFLFVBQXNCOztZQUN6RCxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsTUFBTSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV2RyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELCtEQUErRDtZQUMvRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUkseUJBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE9BQU8sa0NBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLE9BQU8sQ0FBQyxNQUFjLEVBQUUsT0FBZTs7WUFDbEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLE1BQU0sV0FBVyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRS9FLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLHlCQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsTUFBTSxDQUFDLE1BQWMsRUFBRSxLQUFrQjs7WUFDcEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLE1BQU0sU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRTVFLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLHlCQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUVEOzs7Ozs7T0FNRztJQUNVLE1BQU0sQ0FBQyxNQUFjLEVBQUUsT0FBZSxFQUFFLEtBQTJCOztZQUM5RSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsTUFBTSxXQUFXLE9BQU8sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXZGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLHlCQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsTUFBTSxDQUFDLE1BQWMsRUFBRSxPQUFlOztZQUNqRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsTUFBTSxXQUFXLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFFbEYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtDQUNGO0FBbkdELDBDQW1HQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5lc3RlZE1vZGVsV2ViU2VydmljZSwgTmVzdGVkTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2VcIjtcbmltcG9ydCB7IFBob25lLCBQaG9uZVNjaGVtYSwgUGFnaW5hdGlvbiwgUGFnaW5hdGVkQXJyYXksIFBhZ2luYXRpb25VdGlsIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGhvbmVXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIE5lc3RlZE1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cblxuZXhwb3J0IGNsYXNzIFBob25lV2ViU2VydmljZSBleHRlbmRzIE5lc3RlZE1vZGVsV2ViU2VydmljZTxQaG9uZSwgUGhvbmVTY2hlbWE+IHtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogUGhvbmVXZWJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBQaG9uZVdlYlNlcnZpY2VPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFBob25lV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogUGhvbmVXZWJTZXJ2aWNlT3B0aW9ucyk6IFBob25lV2ViU2VydmljZSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQaG9uZVdlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgUGhvbmVzIGZyb20gYSBDb25zdW1lci5cbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxuICAgKiBAcGFyYW0gcGFnaW5hdGlvbiBUaGUgcGFnaW5hdGlvbiBwYXJhbWV0ZXJzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRBbGwodXNlcklkOiBzdHJpbmcsIHBhZ2luYXRpb246IFBhZ2luYXRpb24pOiBQcm9taXNlPFBhZ2luYXRlZEFycmF5PFBob25lPj4ge1xuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvY29uc3VtZXJzLyR7dXNlcklkfS9waG9uZXNgLCBudWxsLCB7IHBhcmFtczogeyBza2lwLCBsaW1pdCB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGEgcGFnaW5hdGVkIGFycmF5IHdpdGggY291bnQgaW5mb3JtYXRpb24gZnJvbSBoZWFkZXJzXG4gICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YS5tYXAoKGl0ZW06IFBob25lU2NoZW1hKSA9PiBuZXcgUGhvbmUoaXRlbSkpO1xuICAgIHJldHVybiBQYWdpbmF0aW9uVXRpbC5wYXJzZShyZXN1bHQsIHJlc3BvbnNlLmhlYWRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYW4gUGhvbmUgYmFzZWQgb24gaXQncyBJRC5cbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxuICAgKiBAcGFyYW0gcGhvbmVJZCBUaGUgUGhvbmUgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZE9uZSh1c2VySWQ6IHN0cmluZywgcGhvbmVJZDogc3RyaW5nKTogUHJvbWlzZTxQaG9uZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2NvbnN1bWVycy8ke3VzZXJJZH0vcGhvbmVzLyR7cGhvbmVJZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUGhvbmUocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFBob25lIGluIHRoZSBwbGF0Zm9ybS5cbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxuICAgKiBAcGFyYW0gcGhvbmUgVGhlIFBob25lIHNjaGVtYS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBjcmVhdGUodXNlcklkOiBzdHJpbmcsIHBob25lOiBQaG9uZVNjaGVtYSk6IFByb21pc2U8UGhvbmU+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7dXNlcklkfS9waG9uZXNgLCBwaG9uZSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBob25lKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnRpYWxseSB1cGRhdGUgYW4gZXhpc3RpbmcgUGhvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cbiAgICogQHBhcmFtIHBob25lSWQgVGhlIFBob25lIElELlxuICAgKiBAcGFyYW0gcGhvbmUgVGhlIHBhcnRpYWwgUGhvbmUgc2NoZW1hLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVwZGF0ZSh1c2VySWQ6IHN0cmluZywgcGhvbmVJZDogc3RyaW5nLCBwaG9uZTogUGFydGlhbDxQaG9uZVNjaGVtYT4pOiBQcm9taXNlPFBob25lPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVycy8ke3VzZXJJZH0vcGhvbmVzLyR7cGhvbmVJZH1gLCBwaG9uZSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBob25lKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhbiBQaG9uZSBmcm9tIHRoZSBwbGF0Zm9ybS5cbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxuICAgKiBAcGFyYW0gcGhvbmVJZCBUaGUgUGhvbmUgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGVsZXRlKHVzZXJJZDogc3RyaW5nLCBwaG9uZUlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5kZWxldGUoYC9jb25zdW1lcnMvJHt1c2VySWR9L3Bob25lcy8ke3Bob25lSWR9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19