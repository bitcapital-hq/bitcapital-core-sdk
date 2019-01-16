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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFua2luZ1dlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvQmFua2luZ1dlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9DQUFzRTtBQUN0RSxzQ0FBbUQ7QUFDbkQsb0VBQTZGO0FBSTdGLHVCQUErQixTQUFRLDZCQUEyQztJQUc5RSxZQUErQixPQUFpQztRQUM1RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFEWSxZQUFPLEdBQVAsT0FBTyxDQUEwQjtJQUVoRSxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVc7UUFDckIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQWlDO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1UsT0FBTyxDQUFDLE1BQWMsRUFBRSxVQUFzQjs7WUFDdkQsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLE1BQU0sV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVsRyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN0QyxNQUFNLFFBQVEsQ0FBQzthQUNsQjtZQUVELCtEQUErRDtZQUMvRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksZ0JBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdFLE9BQU8sc0JBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRCxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLFdBQVcsQ0FBQyxNQUFjLEVBQUUsU0FBaUI7O1lBQ3RELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxNQUFNLGFBQWEsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUVsRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN0QyxNQUFNLFFBQVEsQ0FBQzthQUNsQjtZQUVELE9BQU8sSUFBSSxnQkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxDQUFDO0tBQUE7SUFFTSxPQUFPLENBQUMsRUFBVTtRQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxFQUFFLG9EQUFvRCxDQUFDLENBQUM7SUFDOUcsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1UsTUFBTSxDQUFDLE1BQWMsRUFBRSxPQUFzQjs7WUFDdEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLE1BQU0sV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRS9FLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3RDLE1BQU0sUUFBUSxDQUFDO2FBQ2xCO1lBRUQsT0FBTyxJQUFJLGdCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUM7S0FBQTtJQUVEOzs7Ozs7T0FNRztJQUNVLE1BQU0sQ0FBQyxNQUFjLEVBQUUsU0FBaUIsRUFBRSxPQUErQjs7WUFDbEYsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLE1BQU0sYUFBYSxTQUFTLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUU1RixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN0QyxNQUFNLFFBQVEsQ0FBQzthQUNsQjtZQUVELE9BQU8sSUFBSSxnQkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLE1BQU0sQ0FBQyxNQUFjLEVBQUUsU0FBaUI7O1lBQ2pELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxNQUFNLGFBQWEsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUVyRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN0QyxNQUFNLFFBQVEsQ0FBQzthQUNsQjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKO0FBdkdELDhDQXVHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2luYXRpb24sIFBhZ2luYXRlZEFycmF5LCBQYWdpbmF0aW9uVXRpbCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBCYW5raW5nLCBCYW5raW5nU2NoZW1hIH0gZnJvbSBcIi4uL21vZGVsc1wiO1xyXG5pbXBvcnQgQmFzZU1vZGVsV2ViU2VydmljZSwgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2UvQmFzZU1vZGVsV2ViU2VydmljZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCYW5raW5nV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhbmtpbmdXZWJTZXJ2aWNlIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZTxCYW5raW5nLCBCYW5raW5nU2NoZW1hPiB7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBCYW5raW5nV2ViU2VydmljZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogQmFua2luZ1dlYlNlcnZpY2VPcHRpb25zKSB7XHJcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBCYW5raW5nV2ViU2VydmljZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IEJhbmtpbmdXZWJTZXJ2aWNlT3B0aW9ucyk6IEJhbmtpbmdXZWJTZXJ2aWNlIHtcclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IEJhbmtpbmdXZWJTZXJ2aWNlKG9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCBhbGwgQmFua2luZ3MgZnJvbSBhIENvbnN1bWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cclxuICAgICAqIEBwYXJhbSBwYWdpbmF0aW9uIFRoZSBwYWdpbmF0aW9uIHBhcmFtZXRlcnMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBmaW5kQWxsKHVzZXJJZDogc3RyaW5nLCBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxCYW5raW5nPj4ge1xyXG4gICAgICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvY29uc3VtZXIvJHt1c2VySWR9L2JhbmtpbmdzYCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQgfSB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICAgICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBCYW5raW5nU2NoZW1hKSA9PiBuZXcgQmFua2luZyhpdGVtKSk7XHJcbiAgICAgICAgcmV0dXJuIFBhZ2luYXRpb25VdGlsLnBhcnNlKHJlc3VsdCwgcmVzcG9uc2UuaGVhZGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kIGFuIEJhbmtpbmcgYmFzZWQgb24gaXQncyBJRC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdXNlcklkIFRoZSBDb25zdW1lcidzIFVzZXIgSUQuXHJcbiAgICAgKiBAcGFyYW0gYmFua2luZ0lkIFRoZSBCYW5raW5nIElELlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZmluZE9uZUJ5SWQodXNlcklkOiBzdHJpbmcsIGJhbmtpbmdJZDogc3RyaW5nKTogUHJvbWlzZTxCYW5raW5nPiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvY29uc3VtZXIvJHt1c2VySWR9L2JhbmtpbmdzLyR7YmFua2luZ0lkfWApO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBCYW5raW5nKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaW5kT25lKGlkOiBzdHJpbmcpOiBQcm9taXNlPEJhbmtpbmc+IHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBmaW5kIGJhbmtpbmcgd2l0aCBpZCAke2lkfTogbWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4gVXNlIGZpbmRPbmVCeUlkIGluc3RlYWQuYCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgQmFua2luZyBpbiB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxyXG4gICAgICogQHBhcmFtIGJhbmtpbmcgVGhlIEJhbmtpbmcgc2NoZW1hLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgY3JlYXRlKHVzZXJJZDogc3RyaW5nLCBiYW5raW5nOiBCYW5raW5nU2NoZW1hKTogUHJvbWlzZTxCYW5raW5nPiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2NvbnN1bWVyLyR7dXNlcklkfS9iYW5raW5nc2AsIGJhbmtpbmcpO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBCYW5raW5nKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFydGlhbGx5IHVwZGF0ZSBhbiBleGlzdGluZyBCYW5raW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB1c2VySWQgVGhlIENvbnN1bWVyJ3MgVXNlciBJRC5cclxuICAgICAqIEBwYXJhbSBiYW5raW5nSWQgVGhlIEJhbmtpbmcgSUQuXHJcbiAgICAgKiBAcGFyYW0gYmFua2luZyBUaGUgcGFydGlhbCBCYW5raW5nIHNjaGVtYS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZSh1c2VySWQ6IHN0cmluZywgYmFua2luZ0lkOiBzdHJpbmcsIGJhbmtpbmc6IFBhcnRpYWw8QmFua2luZ1NjaGVtYT4pOiBQcm9taXNlPEJhbmtpbmc+IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvY29uc3VtZXIvJHt1c2VySWR9L2JhbmtpbmdzLyR7YmFua2luZ0lkfWAsIGJhbmtpbmcpO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBCYW5raW5nKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlIGFuIEJhbmtpbmcgZnJvbSB0aGUgcGxhdGZvcm0uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHVzZXJJZCBUaGUgQ29uc3VtZXIncyBVc2VyIElELlxyXG4gICAgICogQHBhcmFtIGJhbmtpbmdJZCBUaGUgQmFua2luZyBJRC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGRlbGV0ZSh1c2VySWQ6IHN0cmluZywgYmFua2luZ0lkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5kZWxldGUoYC9jb25zdW1lci8ke3VzZXJJZH0vYmFua2luZ3MvJHtiYW5raW5nSWR9YCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG4iXX0=