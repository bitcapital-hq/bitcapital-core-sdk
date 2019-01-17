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
const utils_1 = require("../utils");
const models_1 = require("../models");
const BaseModelWebService_1 = require("./base/BaseModelWebService");
class BankingWebService extends BaseModelWebService_1.default {
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
            const result = response.data.map((item) => new models_1.Banking(item));
            return utils_1.PaginationUtil.parse(result, response.headers);
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
            return new models_1.Banking(response.data);
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
            return new models_1.Banking(response.data);
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
            return new models_1.Banking(response.data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFua2luZ1dlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvQmFua2luZ1dlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9DQUFzRTtBQUN0RSxzQ0FBbUQ7QUFDbkQsb0VBQTZGO0FBSTdGLHVCQUErQixTQUFRLDZCQUEyQztJQUdoRixZQUErQixPQUFpQztRQUM5RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFEYyxZQUFPLEdBQVAsT0FBTyxDQUEwQjtJQUVoRSxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQWlDO1FBQ3hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1UsT0FBTyxDQUFDLE1BQWMsRUFBRSxVQUFzQjs7WUFDekQsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLE1BQU0sV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVsRyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELCtEQUErRDtZQUMvRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksZ0JBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdFLE9BQU8sc0JBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLFdBQVcsQ0FBQyxNQUFjLEVBQUUsU0FBaUI7O1lBQ3hELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxNQUFNLGFBQWEsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUVsRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxnQkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFTSxPQUFPLENBQUMsRUFBVTtRQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxFQUFFLG9EQUFvRCxDQUFDLENBQUM7SUFDNUcsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1UsTUFBTSxDQUFDLE1BQWMsRUFBRSxPQUFzQjs7WUFDeEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLE1BQU0sV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRS9FLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLGdCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVEOzs7Ozs7T0FNRztJQUNVLE1BQU0sQ0FBQyxNQUFjLEVBQUUsU0FBaUIsRUFBRSxPQUErQjs7WUFDcEYsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLE1BQU0sYUFBYSxTQUFTLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUU1RixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxnQkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLE1BQU0sQ0FBQyxNQUFjLEVBQUUsU0FBaUI7O1lBQ25ELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxNQUFNLGFBQWEsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUVyRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0NBQ0Y7QUF2R0QsOENBdUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnaW5hdGlvbiwgUGFnaW5hdGVkQXJyYXksIFBhZ2luYXRpb25VdGlsIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCB7IEJhbmtpbmcsIEJhbmtpbmdTY2hlbWEgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCBCYXNlTW9kZWxXZWJTZXJ2aWNlLCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJhbmtpbmdXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIHt9XHJcblxyXG5leHBvcnQgY2xhc3MgQmFua2luZ1dlYlNlcnZpY2UgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlPEJhbmtpbmcsIEJhbmtpbmdTY2hlbWE+IHtcclxuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBCYW5raW5nV2ViU2VydmljZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IG9wdGlvbnM6IEJhbmtpbmdXZWJTZXJ2aWNlT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEJhbmtpbmdXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IEJhbmtpbmdXZWJTZXJ2aWNlT3B0aW9ucyk6IEJhbmtpbmdXZWJTZXJ2aWNlIHtcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgQmFua2luZ1dlYlNlcnZpY2Uob3B0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmQgYWxsIEJhbmtpbmdzIGZyb20gYSBDb25zdW1lci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cclxuICAgKiBAcGFyYW0gcGFnaW5hdGlvbiBUaGUgcGFnaW5hdGlvbiBwYXJhbWV0ZXJzLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBmaW5kQWxsKHVzZXJJZDogc3RyaW5nLCBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxCYW5raW5nPj4ge1xyXG4gICAgY29uc3QgeyBza2lwLCBsaW1pdCB9ID0gcGFnaW5hdGlvbjtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2NvbnN1bWVyLyR7dXNlcklkfS9iYW5raW5nc2AsIHsgcGFyYW1zOiB7IHNraXAsIGxpbWl0IH0gfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm4gYSBwYWdpbmF0ZWQgYXJyYXkgd2l0aCBjb3VudCBpbmZvcm1hdGlvbiBmcm9tIGhlYWRlcnNcclxuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBCYW5raW5nU2NoZW1hKSA9PiBuZXcgQmFua2luZyhpdGVtKSk7XHJcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmQgYW4gQmFua2luZyBiYXNlZCBvbiBpdCdzIElELlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxyXG4gICAqIEBwYXJhbSBiYW5raW5nSWQgVGhlIEJhbmtpbmcgSUQuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGZpbmRPbmVCeUlkKHVzZXJJZDogc3RyaW5nLCBiYW5raW5nSWQ6IHN0cmluZyk6IFByb21pc2U8QmFua2luZz4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvY29uc3VtZXIvJHt1c2VySWR9L2JhbmtpbmdzLyR7YmFua2luZ0lkfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBCYW5raW5nKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbmRPbmUoaWQ6IHN0cmluZyk6IFByb21pc2U8QmFua2luZz4ge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gZmluZCBiYW5raW5nIHdpdGggaWQgJHtpZH06IG1ldGhvZCBub3QgaW1wbGVtZW50ZWQuIFVzZSBmaW5kT25lQnlJZCBpbnN0ZWFkLmApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IEJhbmtpbmcgaW4gdGhlIHBsYXRmb3JtLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxyXG4gICAqIEBwYXJhbSBiYW5raW5nIFRoZSBCYW5raW5nIHNjaGVtYS5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgY3JlYXRlKHVzZXJJZDogc3RyaW5nLCBiYW5raW5nOiBCYW5raW5nU2NoZW1hKTogUHJvbWlzZTxCYW5raW5nPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXIvJHt1c2VySWR9L2JhbmtpbmdzYCwgYmFua2luZyk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEJhbmtpbmcocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXJ0aWFsbHkgdXBkYXRlIGFuIGV4aXN0aW5nIEJhbmtpbmcuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXHJcbiAgICogQHBhcmFtIGJhbmtpbmdJZCBUaGUgQmFua2luZyBJRC5cclxuICAgKiBAcGFyYW0gYmFua2luZyBUaGUgcGFydGlhbCBCYW5raW5nIHNjaGVtYS5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHVzZXJJZDogc3RyaW5nLCBiYW5raW5nSWQ6IHN0cmluZywgYmFua2luZzogUGFydGlhbDxCYW5raW5nU2NoZW1hPik6IFByb21pc2U8QmFua2luZz4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVyLyR7dXNlcklkfS9iYW5raW5ncy8ke2JhbmtpbmdJZH1gLCBiYW5raW5nKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgQmFua2luZyhyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlbGV0ZSBhbiBCYW5raW5nIGZyb20gdGhlIHBsYXRmb3JtLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxyXG4gICAqIEBwYXJhbSBiYW5raW5nSWQgVGhlIEJhbmtpbmcgSUQuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGRlbGV0ZSh1c2VySWQ6IHN0cmluZywgYmFua2luZ0lkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmRlbGV0ZShgL2NvbnN1bWVyLyR7dXNlcklkfS9iYW5raW5ncy8ke2JhbmtpbmdJZH1gKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG4iXX0=