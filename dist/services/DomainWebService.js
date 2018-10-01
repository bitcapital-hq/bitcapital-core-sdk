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
const models_1 = require("../models");
const utils_1 = require("../utils");
const BaseModelWebService_1 = require("./base/BaseModelWebService");
var PaymentLogType;
(function (PaymentLogType) {
    PaymentLogType["COMMON"] = "common";
    PaymentLogType["EMIT"] = "emit";
    PaymentLogType["DESTROY"] = "destroy";
})(PaymentLogType = exports.PaymentLogType || (exports.PaymentLogType = {}));
class DomainWebService extends BaseModelWebService_1.default {
    constructor(options) {
        super(options);
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new DomainWebService(options);
        return this.instance;
    }
    /**
     * Find all {#Domain}s
     */
    findAll(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get("/domains", null, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new models_1.Domain(item));
            return utils_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/domains/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Domain(response.data);
        });
    }
    /**
     * Find the Root Domain.
     */
    findRootDomain() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/domains/root`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Domain(response.data);
        });
    }
    /**
     * Find the {#User}s from a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    findUsersById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/domains/${id}/users`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data.map(user => new models_1.User(user));
        });
    }
    /**
     * Find the {#User}s with role {#Consumer} from a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    findConsumersById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/domains/${id}/consumers`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data.map(user => new models_1.User(user));
        });
    }
    /**
     * Find the {#User}s with role Mediator from a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    findMediatorsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/domains/${id}/mediators`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data.map(user => new models_1.User(user));
        });
    }
    /**
     * Create a new {#Domain}.
     *
     * @param domain The {#Domain} properties
     */
    create(domain) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post("/domains", domain);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Domain(response.data);
        });
    }
    /**
     * Partially update an existing {#Domain}.
     *
     * @param id the id of the {#Domain}
     * @param domain The values you want to update
     */
    update(id, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/domains/${id}`, domain);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Domain(response.data);
        });
    }
    /**
     * Delete a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.delete(`/domains/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
    /**
     * Gets the cumulative sum of payment amounts grouped by time
     *
     * @param {string} id
     * @param {DomainMetricsOptions} [options]
     */
    getPaymentsAmountMetrics(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/domains/${id}/metrics/payments/amount`, { params: options });
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data.map(r => ({ time: new Date(r.time), totalAmount: Number(r.total_amount) }));
        });
    }
    /**
     * Gets the cumulative count of payment amounts grouped by time
     *
     * @param {string} id
     * @param {DomainMetricsOptions} [options]
     */
    getPaymentsCountMetrics(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/domains/${id}/metrics/payments/count`, { params: options });
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data.map(r => ({ time: new Date(r.time), count: Number(r.count) }));
        });
    }
    /**
     * Gets the cumulative count of active users grouped by time
     *
     * @param {string} id
     * @param {DomainMetricsOptions} [options]
     */
    getActiveUserCountMetrics(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/domains/${id}/metrics/users/count`, { params: options });
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data.map(r => ({ time: new Date(r.time), count: Number(r.count) }));
        });
    }
    /**
     * Gets the cumulative balance grouped by time
     *
     * @param {string} id
     * @param {DomainMetricsOptions} [options]
     */
    getBalanceMetrics(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/domains/${id}/metrics/balance`, { params: options });
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data.map(r => ({ time: new Date(r.time), totalAmount: Number(r.total_amount) }));
        });
    }
}
exports.default = DomainWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluV2ViU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9Eb21haW5XZWJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxzQ0FBdUQ7QUFDdkQsb0NBQXNFO0FBQ3RFLG9FQUE2RjtBQUU3RixJQUFZLGNBSVg7QUFKRCxXQUFZLGNBQWM7SUFDeEIsbUNBQWlCLENBQUE7SUFDakIsK0JBQWEsQ0FBQTtJQUNiLHFDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFKVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUl6QjtBQXVCRCxzQkFBc0MsU0FBUSw2QkFBeUM7SUFJckYsWUFBWSxPQUFnQztRQUMxQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFnQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNVLE9BQU8sQ0FBQyxVQUFzQjs7WUFDekMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVwRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELCtEQUEr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QUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsaUJBQWlCLENBQUMsRUFBVSxFQUFFLE9BQThCOztZQUN2RSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRTVGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25HLENBQUM7S0FBQTtDQUNGO0FBdk5ELG1DQXVOQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHAgfSBmcm9tIFwiLi4vYmFzZVwiO1xuaW1wb3J0IHsgRG9tYWluLCBEb21haW5TY2hlbWEsIFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XG5pbXBvcnQgeyBQYWdpbmF0ZWRBcnJheSwgUGFnaW5hdGlvbiwgUGFnaW5hdGlvblV0aWwgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBCYXNlTW9kZWxXZWJTZXJ2aWNlLCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XG5cbmV4cG9ydCBlbnVtIFBheW1lbnRMb2dUeXBlIHtcbiAgQ09NTU9OID0gXCJjb21tb25cIixcbiAgRU1JVCA9IFwiZW1pdFwiLFxuICBERVNUUk9ZID0gXCJkZXN0cm95XCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb21haW5NZXRyaWNzT3B0aW9ucyB7XG4gIHN0YXJ0PzogRGF0ZTsgLy8gU3RhcnQgb2YgZGF0ZSByYW5nZSBmb3IgbWV0cmljc1xuICBlbmQ/OiBEYXRlOyAvLyBFbmQgb2YgZGF0ZSByYW5nZSBmb3IgbWV0cmljc1xuICBzb3VyY2U/OiBzdHJpbmc7IC8vIEdldCBtZXRyaWNzIGZvciBhIHNpbmdsZSBzb3VyY2VcbiAgcmVjaXBpZW50Pzogc3RyaW5nOyAvLyBHZXQgbWV0cmljcyBmb3IgYSBzaW5nbGUgcmVjaXBpZW50XG4gIGFzc2V0Pzogc3RyaW5nOyAvLyBHZXQgbWV0cmljcyBmb3IgYSBzaW5nbGUgYXNzZXRcbiAgdHlwZT86IFBheW1lbnRMb2dUeXBlOyAvLyBHZXQgbWV0cmljcyBmb3IgYSBzaW5nbGUgcGF5bWVudCB0eXBlXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ291bnRNZXRyaWNzUmVzcG9uc2Uge1xuICBwYXltZW50VGltZTogRGF0ZTtcbiAgY291bnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUb3RhbE1ldHJpY3NSZXNwb25zZSB7XG4gIHBheW1lbnRUaW1lOiBEYXRlO1xuICB0b3RhbEFtb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERvbWFpbldlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluV2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8RG9tYWluLCBEb21haW5TY2hlbWE+IHtcbiAgcHJvdGVjdGVkIGh0dHA6IEh0dHA7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IERvbWFpbldlYlNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogRG9tYWluV2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogRG9tYWluV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogRG9tYWluV2ViU2VydmljZU9wdGlvbnMpOiBEb21haW5XZWJTZXJ2aWNlIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IERvbWFpbldlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgeyNEb21haW59c1xuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRBbGwocGFnaW5hdGlvbjogUGFnaW5hdGlvbik6IFByb21pc2U8UGFnaW5hdGVkQXJyYXk8RG9tYWluPj4ge1xuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KFwiL2RvbWFpbnNcIiwgbnVsbCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQgfSB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBEb21haW5TY2hlbWEpID0+IG5ldyBEb21haW4oaXRlbSkpO1xuICAgIHJldHVybiBQYWdpbmF0aW9uVXRpbC5wYXJzZShyZXN1bHQsIHJlc3BvbnNlLmhlYWRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSB7I0RvbWFpbn0gYnkgaXQncyBpZC5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgeyNEb21haW59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZE9uZShpZDogc3RyaW5nKTogUHJvbWlzZTxEb21haW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9kb21haW5zLyR7aWR9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERvbWFpbihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBSb290IERvbWFpbi5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kUm9vdERvbWFpbigpOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2RvbWFpbnMvcm9vdGApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEb21haW4ocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgeyNVc2VyfXMgZnJvbSBhIHsjRG9tYWlufSBieSBpdCdzIGlkLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSB7I0RvbWFpbn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kVXNlcnNCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXJbXT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2RvbWFpbnMvJHtpZH0vdXNlcnNgKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZS5kYXRhLm1hcCh1c2VyID0+IG5ldyBVc2VyKHVzZXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSB7I1VzZXJ9cyB3aXRoIHJvbGUgeyNDb25zdW1lcn0gZnJvbSBhIHsjRG9tYWlufSBieSBpdCdzIGlkLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSB7I0RvbWFpbn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kQ29uc3VtZXJzQnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyW10+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9kb21haW5zLyR7aWR9L2NvbnN1bWVyc2ApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEubWFwKHVzZXIgPT4gbmV3IFVzZXIodXNlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIHsjVXNlcn1zIHdpdGggcm9sZSBNZWRpYXRvciBmcm9tIGEgeyNEb21haW59IGJ5IGl0J3MgaWQuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHsjRG9tYWlufVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRNZWRpYXRvcnNCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXJbXT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2RvbWFpbnMvJHtpZH0vbWVkaWF0b3JzYCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXAodXNlciA9PiBuZXcgVXNlcih1c2VyKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHsjRG9tYWlufS5cbiAgICpcbiAgICogQHBhcmFtIGRvbWFpbiBUaGUgeyNEb21haW59IHByb3BlcnRpZXNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjcmVhdGUoZG9tYWluOiBEb21haW5TY2hlbWEpOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoXCIvZG9tYWluc1wiLCBkb21haW4pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEb21haW4ocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogUGFydGlhbGx5IHVwZGF0ZSBhbiBleGlzdGluZyB7I0RvbWFpbn0uXG4gICAqXG4gICAqIEBwYXJhbSBpZCB0aGUgaWQgb2YgdGhlIHsjRG9tYWlufVxuICAgKiBAcGFyYW0gZG9tYWluIFRoZSB2YWx1ZXMgeW91IHdhbnQgdG8gdXBkYXRlXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlKGlkOiBzdHJpbmcsIGRvbWFpbjogUGFydGlhbDxEb21haW5TY2hlbWE+KTogUHJvbWlzZTxEb21haW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvZG9tYWlucy8ke2lkfWAsIGRvbWFpbik7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERvbWFpbihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSB7I0RvbWFpbn0gYnkgaXQncyBpZC5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgeyNEb21haW59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGVsZXRlKGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5kZWxldGUoYC9kb21haW5zLyR7aWR9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdW11bGF0aXZlIHN1bSBvZiBwYXltZW50IGFtb3VudHMgZ3JvdXBlZCBieSB0aW1lXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0RvbWFpbk1ldHJpY3NPcHRpb25zfSBbb3B0aW9uc11cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRQYXltZW50c0Ftb3VudE1ldHJpY3MoaWQ6IHN0cmluZywgb3B0aW9ucz86IERvbWFpbk1ldHJpY3NPcHRpb25zKTogUHJvbWlzZTxUb3RhbE1ldHJpY3NSZXNwb25zZVtdPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvZG9tYWlucy8ke2lkfS9tZXRyaWNzL3BheW1lbnRzL2Ftb3VudGAsIHsgcGFyYW1zOiBvcHRpb25zIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEubWFwKHIgPT4gKHsgdGltZTogbmV3IERhdGUoci50aW1lKSwgdG90YWxBbW91bnQ6IE51bWJlcihyLnRvdGFsX2Ftb3VudCkgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1bXVsYXRpdmUgY291bnQgb2YgcGF5bWVudCBhbW91bnRzIGdyb3VwZWQgYnkgdGltZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtEb21haW5NZXRyaWNzT3B0aW9uc30gW29wdGlvbnNdXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0UGF5bWVudHNDb3VudE1ldHJpY3MoaWQ6IHN0cmluZywgb3B0aW9ucz86IERvbWFpbk1ldHJpY3NPcHRpb25zKTogUHJvbWlzZTxDb3VudE1ldHJpY3NSZXNwb25zZVtdPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvZG9tYWlucy8ke2lkfS9tZXRyaWNzL3BheW1lbnRzL2NvdW50YCwgeyBwYXJhbXM6IG9wdGlvbnMgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXAociA9PiAoeyB0aW1lOiBuZXcgRGF0ZShyLnRpbWUpLCBjb3VudDogTnVtYmVyKHIuY291bnQpIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdW11bGF0aXZlIGNvdW50IG9mIGFjdGl2ZSB1c2VycyBncm91cGVkIGJ5IHRpbWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7RG9tYWluTWV0cmljc09wdGlvbnN9IFtvcHRpb25zXVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEFjdGl2ZVVzZXJDb3VudE1ldHJpY3MoaWQ6IHN0cmluZywgb3B0aW9ucz86IERvbWFpbk1ldHJpY3NPcHRpb25zKTogUHJvbWlzZTxDb3VudE1ldHJpY3NSZXNwb25zZVtdPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvZG9tYWlucy8ke2lkfS9tZXRyaWNzL3VzZXJzL2NvdW50YCwgeyBwYXJhbXM6IG9wdGlvbnMgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXAociA9PiAoeyB0aW1lOiBuZXcgRGF0ZShyLnRpbWUpLCBjb3VudDogTnVtYmVyKHIuY291bnQpIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdW11bGF0aXZlIGJhbGFuY2UgZ3JvdXBlZCBieSB0aW1lXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0RvbWFpbk1ldHJpY3NPcHRpb25zfSBbb3B0aW9uc11cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRCYWxhbmNlTWV0cmljcyhpZDogc3RyaW5nLCBvcHRpb25zPzogRG9tYWluTWV0cmljc09wdGlvbnMpOiBQcm9taXNlPFRvdGFsTWV0cmljc1Jlc3BvbnNlW10+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9kb21haW5zLyR7aWR9L21ldHJpY3MvYmFsYW5jZWAsIHsgcGFyYW1zOiBvcHRpb25zIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEubWFwKHIgPT4gKHsgdGltZTogbmV3IERhdGUoci50aW1lKSwgdG90YWxBbW91bnQ6IE51bWJlcihyLnRvdGFsX2Ftb3VudCkgfSkpO1xuICB9XG59XG4iXX0=