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
class BankingWebService extends base_1.NestedModelWebService {
    constructor(options) {
        super(options);
        this.options = options;
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new BankingWebService(options);
        return this.instance;
    }
    /**
     * Find all Bankings from a Consumer.
     *
     * @param userId The Consumer's User ID.
     * @param pagination The pagination parameters.
     */
    findAll(userId, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get(`/consumers/${userId}/bankings`, null, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new bitcapital_common_1.Banking(item));
            return bitcapital_common_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find a Banking based on it's ID.
     *
     * @param userId The Consumer's User ID.
     * @param bankingId The Banking ID.
     */
    findOne(userId, bankingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/consumers/${userId}/bankings/${bankingId}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Banking(response.data);
        });
    }
    /**
     * Create a new Banking in the platform.
     *
     * @param userId The Consumer's User ID.
     * @param banking The Banking schema.
     */
    create(userId, banking) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumers/${userId}/bankings`, banking);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Banking(response.data);
        });
    }
    /**
     * Partially update an existing Banking.
     *
     * @param userId The Consumer's User ID.
     * @param bankingId The Banking ID.
     * @param banking The partial Banking schema.
     */
    update(userId, bankingId, banking) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumers/${userId}/bankings/${bankingId}`, banking);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Banking(response.data);
        });
    }
    /**
     * Delete a Banking from the platform.
     *
     * @param userId The Consumer's User ID.
     * @param bankingId The Banking ID.
     */
    delete(userId, bankingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.delete(`/consumers/${userId}/bankings/${bankingId}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
}
exports.BankingWebService = BankingWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFua2luZ1dlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvQmFua2luZ1dlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQUF1RztBQUN2RyxpQ0FBNkU7QUFJN0UsTUFBYSxpQkFBa0IsU0FBUSw0QkFBNkM7SUFHbEYsWUFBK0IsT0FBaUM7UUFDOUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRGMsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7SUFFaEUsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFpQztRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNVLE9BQU8sQ0FBQyxNQUFjLEVBQUUsVUFBc0I7O1lBQ3pELE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxNQUFNLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXpHLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsK0RBQStEO1lBQy9ELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBbUIsRUFBRSxFQUFFLENBQUMsSUFBSSwyQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDN0UsT0FBTyxrQ0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hELENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsT0FBTyxDQUFDLE1BQWMsRUFBRSxTQUFpQjs7WUFDcEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLE1BQU0sYUFBYSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBRW5GLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLDJCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsTUFBTSxDQUFDLE1BQWMsRUFBRSxPQUFzQjs7WUFDeEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLE1BQU0sV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRWhGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLDJCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVEOzs7Ozs7T0FNRztJQUNVLE1BQU0sQ0FBQyxNQUFjLEVBQUUsU0FBaUIsRUFBRSxPQUErQjs7WUFDcEYsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLE1BQU0sYUFBYSxTQUFTLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUU3RixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSwyQkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLE1BQU0sQ0FBQyxNQUFjLEVBQUUsU0FBaUI7O1lBQ25ELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxNQUFNLGFBQWEsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUV0RixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0NBQ0Y7QUFuR0QsOENBbUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFua2luZywgQmFua2luZ1NjaGVtYSwgUGFnaW5hdGVkQXJyYXksIFBhZ2luYXRpb24sIFBhZ2luYXRpb25VdGlsIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XHJcbmltcG9ydCB7IE5lc3RlZE1vZGVsV2ViU2VydmljZSwgTmVzdGVkTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2VcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmFua2luZ1dlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgTmVzdGVkTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhbmtpbmdXZWJTZXJ2aWNlIGV4dGVuZHMgTmVzdGVkTW9kZWxXZWJTZXJ2aWNlPEJhbmtpbmcsIEJhbmtpbmdTY2hlbWE+IHtcclxuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBCYW5raW5nV2ViU2VydmljZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IG9wdGlvbnM6IEJhbmtpbmdXZWJTZXJ2aWNlT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEJhbmtpbmdXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IEJhbmtpbmdXZWJTZXJ2aWNlT3B0aW9ucyk6IEJhbmtpbmdXZWJTZXJ2aWNlIHtcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgQmFua2luZ1dlYlNlcnZpY2Uob3B0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmQgYWxsIEJhbmtpbmdzIGZyb20gYSBDb25zdW1lci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cclxuICAgKiBAcGFyYW0gcGFnaW5hdGlvbiBUaGUgcGFnaW5hdGlvbiBwYXJhbWV0ZXJzLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBmaW5kQWxsKHVzZXJJZDogc3RyaW5nLCBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxCYW5raW5nPj4ge1xyXG4gICAgY29uc3QgeyBza2lwLCBsaW1pdCB9ID0gcGFnaW5hdGlvbjtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2NvbnN1bWVycy8ke3VzZXJJZH0vYmFua2luZ3NgLCBudWxsLCB7IHBhcmFtczogeyBza2lwLCBsaW1pdCB9IH0pO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJuIGEgcGFnaW5hdGVkIGFycmF5IHdpdGggY291bnQgaW5mb3JtYXRpb24gZnJvbSBoZWFkZXJzXHJcbiAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5kYXRhLm1hcCgoaXRlbTogQmFua2luZ1NjaGVtYSkgPT4gbmV3IEJhbmtpbmcoaXRlbSkpO1xyXG4gICAgcmV0dXJuIFBhZ2luYXRpb25VdGlsLnBhcnNlKHJlc3VsdCwgcmVzcG9uc2UuaGVhZGVycyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5kIGEgQmFua2luZyBiYXNlZCBvbiBpdCdzIElELlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxyXG4gICAqIEBwYXJhbSBiYW5raW5nSWQgVGhlIEJhbmtpbmcgSUQuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGZpbmRPbmUodXNlcklkOiBzdHJpbmcsIGJhbmtpbmdJZDogc3RyaW5nKTogUHJvbWlzZTxCYW5raW5nPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9jb25zdW1lcnMvJHt1c2VySWR9L2JhbmtpbmdzLyR7YmFua2luZ0lkfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBCYW5raW5nKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IEJhbmtpbmcgaW4gdGhlIHBsYXRmb3JtLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxyXG4gICAqIEBwYXJhbSBiYW5raW5nIFRoZSBCYW5raW5nIHNjaGVtYS5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgY3JlYXRlKHVzZXJJZDogc3RyaW5nLCBiYW5raW5nOiBCYW5raW5nU2NoZW1hKTogUHJvbWlzZTxCYW5raW5nPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXJzLyR7dXNlcklkfS9iYW5raW5nc2AsIGJhbmtpbmcpO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBCYW5raW5nKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFydGlhbGx5IHVwZGF0ZSBhbiBleGlzdGluZyBCYW5raW5nLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxyXG4gICAqIEBwYXJhbSBiYW5raW5nSWQgVGhlIEJhbmtpbmcgSUQuXHJcbiAgICogQHBhcmFtIGJhbmtpbmcgVGhlIHBhcnRpYWwgQmFua2luZyBzY2hlbWEuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHVwZGF0ZSh1c2VySWQ6IHN0cmluZywgYmFua2luZ0lkOiBzdHJpbmcsIGJhbmtpbmc6IFBhcnRpYWw8QmFua2luZ1NjaGVtYT4pOiBQcm9taXNlPEJhbmtpbmc+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9jb25zdW1lcnMvJHt1c2VySWR9L2JhbmtpbmdzLyR7YmFua2luZ0lkfWAsIGJhbmtpbmcpO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBCYW5raW5nKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVsZXRlIGEgQmFua2luZyBmcm9tIHRoZSBwbGF0Zm9ybS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cclxuICAgKiBAcGFyYW0gYmFua2luZ0lkIFRoZSBCYW5raW5nIElELlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBkZWxldGUodXNlcklkOiBzdHJpbmcsIGJhbmtpbmdJZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5kZWxldGUoYC9jb25zdW1lcnMvJHt1c2VySWR9L2JhbmtpbmdzLyR7YmFua2luZ0lkfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==