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
const BaseModelWebService_1 = require("./base/BaseModelWebService");
const bitcapital_common_1 = require("bitcapital-common");
class BankingWebService extends BaseModelWebService_1.BaseModelWebService {
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
            const response = yield this.http.get(`/consumer/${userId}/bankings`, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new bitcapital_common_1.Banking(item));
            return bitcapital_common_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find an Banking based on it's ID.
     *
     * @param userId The Consumer's User ID.
     * @param bankingId The Banking ID.
     */
    findOneById(userId, bankingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/consumer/${userId}/bankings/${bankingId}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Banking(response.data);
        });
    }
    findOne(id) {
        throw new Error(`Unable to find banking with id ${id}: method not implemented. Use findOneById instead.`);
    }
    /**
     * Create a new Banking in the platform.
     *
     * @param userId The Consumer's User ID.
     * @param banking The Banking schema.
     */
    create(userId, banking) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/consumer/${userId}/bankings`, banking);
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
            const response = yield this.http.post(`/consumer/${userId}/bankings/${bankingId}`, banking);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Banking(response.data);
        });
    }
    /**
     * Delete an Banking from the platform.
     *
     * @param userId The Consumer's User ID.
     * @param bankingId The Banking ID.
     */
    delete(userId, bankingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.delete(`/consumer/${userId}/bankings/${bankingId}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
}
exports.BankingWebService = BankingWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFua2luZ1dlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvQmFua2luZ1dlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9FQUE2RjtBQUM3Rix5REFBdUc7QUFJdkcsTUFBYSxpQkFBa0IsU0FBUSx5Q0FBMkM7SUFHaEYsWUFBK0IsT0FBaUM7UUFDOUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRGMsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7SUFFaEUsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFpQztRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNVLE9BQU8sQ0FBQyxNQUFjLEVBQUUsVUFBc0I7O1lBQ3pELE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxNQUFNLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFbEcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCwrREFBK0Q7WUFDL0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFtQixFQUFFLEVBQUUsQ0FBQyxJQUFJLDJCQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3RSxPQUFPLGtDQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEQsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxXQUFXLENBQUMsTUFBYyxFQUFFLFNBQWlCOztZQUN4RCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsTUFBTSxhQUFhLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFFbEYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksMkJBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQztLQUFBO0lBRU0sT0FBTyxDQUFDLEVBQVU7UUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsRUFBRSxvREFBb0QsQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNVLE1BQU0sQ0FBQyxNQUFjLEVBQUUsT0FBc0I7O1lBQ3hELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxNQUFNLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUUvRSxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSwyQkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDVSxNQUFNLENBQUMsTUFBYyxFQUFFLFNBQWlCLEVBQUUsT0FBK0I7O1lBQ3BGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxNQUFNLGFBQWEsU0FBUyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFNUYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksMkJBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxNQUFNLENBQUMsTUFBYyxFQUFFLFNBQWlCOztZQUNuRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsTUFBTSxhQUFhLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFFckYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtDQUNGO0FBdkdELDhDQXVHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbFdlYlNlcnZpY2UsIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEJhbmtpbmcsIEJhbmtpbmdTY2hlbWEsIFBhZ2luYXRpb24sIFBhZ2luYXRlZEFycmF5LCBQYWdpbmF0aW9uVXRpbCB9IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCYW5raW5nV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhbmtpbmdXZWJTZXJ2aWNlIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZTxCYW5raW5nLCBCYW5raW5nU2NoZW1hPiB7XHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogQmFua2luZ1dlYlNlcnZpY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBCYW5raW5nV2ViU2VydmljZU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBCYW5raW5nV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBCYW5raW5nV2ViU2VydmljZU9wdGlvbnMpOiBCYW5raW5nV2ViU2VydmljZSB7XHJcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IEJhbmtpbmdXZWJTZXJ2aWNlKG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5kIGFsbCBCYW5raW5ncyBmcm9tIGEgQ29uc3VtZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXHJcbiAgICogQHBhcmFtIHBhZ2luYXRpb24gVGhlIHBhZ2luYXRpb24gcGFyYW1ldGVycy5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZmluZEFsbCh1c2VySWQ6IHN0cmluZywgcGFnaW5hdGlvbjogUGFnaW5hdGlvbik6IFByb21pc2U8UGFnaW5hdGVkQXJyYXk8QmFua2luZz4+IHtcclxuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9jb25zdW1lci8ke3VzZXJJZH0vYmFua2luZ3NgLCB7IHBhcmFtczogeyBza2lwLCBsaW1pdCB9IH0pO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJuIGEgcGFnaW5hdGVkIGFycmF5IHdpdGggY291bnQgaW5mb3JtYXRpb24gZnJvbSBoZWFkZXJzXHJcbiAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5kYXRhLm1hcCgoaXRlbTogQmFua2luZ1NjaGVtYSkgPT4gbmV3IEJhbmtpbmcoaXRlbSkpO1xyXG4gICAgcmV0dXJuIFBhZ2luYXRpb25VdGlsLnBhcnNlKHJlc3VsdCwgcmVzcG9uc2UuaGVhZGVycyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5kIGFuIEJhbmtpbmcgYmFzZWQgb24gaXQncyBJRC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cclxuICAgKiBAcGFyYW0gYmFua2luZ0lkIFRoZSBCYW5raW5nIElELlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBmaW5kT25lQnlJZCh1c2VySWQ6IHN0cmluZywgYmFua2luZ0lkOiBzdHJpbmcpOiBQcm9taXNlPEJhbmtpbmc+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2NvbnN1bWVyLyR7dXNlcklkfS9iYW5raW5ncy8ke2JhbmtpbmdJZH1gKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgQmFua2luZyhyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaW5kT25lKGlkOiBzdHJpbmcpOiBQcm9taXNlPEJhbmtpbmc+IHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGZpbmQgYmFua2luZyB3aXRoIGlkICR7aWR9OiBtZXRob2Qgbm90IGltcGxlbWVudGVkLiBVc2UgZmluZE9uZUJ5SWQgaW5zdGVhZC5gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBCYW5raW5nIGluIHRoZSBwbGF0Zm9ybS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cclxuICAgKiBAcGFyYW0gYmFua2luZyBUaGUgQmFua2luZyBzY2hlbWEuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGNyZWF0ZSh1c2VySWQ6IHN0cmluZywgYmFua2luZzogQmFua2luZ1NjaGVtYSk6IFByb21pc2U8QmFua2luZz4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVyLyR7dXNlcklkfS9iYW5raW5nc2AsIGJhbmtpbmcpO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBCYW5raW5nKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFydGlhbGx5IHVwZGF0ZSBhbiBleGlzdGluZyBCYW5raW5nLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxyXG4gICAqIEBwYXJhbSBiYW5raW5nSWQgVGhlIEJhbmtpbmcgSUQuXHJcbiAgICogQHBhcmFtIGJhbmtpbmcgVGhlIHBhcnRpYWwgQmFua2luZyBzY2hlbWEuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHVwZGF0ZSh1c2VySWQ6IHN0cmluZywgYmFua2luZ0lkOiBzdHJpbmcsIGJhbmtpbmc6IFBhcnRpYWw8QmFua2luZ1NjaGVtYT4pOiBQcm9taXNlPEJhbmtpbmc+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9jb25zdW1lci8ke3VzZXJJZH0vYmFua2luZ3MvJHtiYW5raW5nSWR9YCwgYmFua2luZyk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEJhbmtpbmcocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWxldGUgYW4gQmFua2luZyBmcm9tIHRoZSBwbGF0Zm9ybS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cclxuICAgKiBAcGFyYW0gYmFua2luZ0lkIFRoZSBCYW5raW5nIElELlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBkZWxldGUodXNlcklkOiBzdHJpbmcsIGJhbmtpbmdJZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5kZWxldGUoYC9jb25zdW1lci8ke3VzZXJJZH0vYmFua2luZ3MvJHtiYW5raW5nSWR9YCk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuIl19