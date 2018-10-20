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
     * Find all Domains.
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
     * Find a Domain.
     *
     * @param id The Domain ID.
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
     * Find the Users with role Consumer from a Domain.
     *
     * @param id The Domain ID.
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
     * Find the Users with role Mediator from a Domain.
     *
     * @param id The Domain ID.
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
     * Create a new Domain.
     *
     * @param domain The Domain schema.
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
     * Partially update an existing Domain.
     *
     * @param id The Domain ID.
     * @param domain The partial Domain schema.
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
     * Delete a Domain.
     *
     * @param id The Domain ID.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluV2ViU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9Eb21haW5XZWJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxzQ0FBdUQ7QUFDdkQsb0NBQXNFO0FBQ3RFLG9FQUE2RjtBQUU3RixJQUFZLGNBSVg7QUFKRCxXQUFZLGNBQWM7SUFDeEIsbUNBQWlCLENBQUE7SUFDakIsK0JBQWEsQ0FBQTtJQUNiLHFDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFKVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUl6QjtBQXVCRCxzQkFBc0MsU0FBUSw2QkFBeUM7SUFJckYsWUFBWSxPQUFnQztRQUMxQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFnQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNVLE9BQU8sQ0FBQyxVQUFzQjs7WUFDekMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVwRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELCtEQUErRDtZQUMvRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQWtCLEVBQUUsRUFBRSxDQUFDLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0UsT0FBTyxzQkFBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hELENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxPQUFPLENBQUMsRUFBVTs7WUFDN0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFdkQsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLGNBQWM7O1lBQ3pCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFdEQsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksZUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsaUJBQWlCLENBQUMsRUFBVTs7WUFDdkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxhQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsaUJBQWlCLENBQUMsRUFBVTs7WUFDdkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxhQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsTUFBTSxDQUFDLE1BQW9COztZQUN0QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUUxRCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxlQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsTUFBTSxDQUFDLEVBQVUsRUFBRSxNQUE2Qjs7WUFDM0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRWhFLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLGVBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLE1BQU0sQ0FBQyxFQUFVOztZQUM1QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUxRCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSx3QkFBd0IsQ0FBQyxFQUFVLEVBQUUsT0FBOEI7O1lBQzlFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLDBCQUEwQixFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFFcEcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkcsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSx1QkFBdUIsQ0FBQyxFQUFVLEVBQUUsT0FBOEI7O1lBQzdFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLHlCQUF5QixFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFFbkcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEYsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSx5QkFBeUIsQ0FBQyxFQUFVLEVBQUUsT0FBOEI7O1lBQy9FLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLHNCQUFzQixFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFFaEcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEYsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxpQkFBaUIsQ0FBQyxFQUFVLEVBQUUsT0FBOEI7O1lBQ3ZFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFFNUYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkcsQ0FBQztLQUFBO0NBQ0Y7QUF4TUQsbUNBd01DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cCB9IGZyb20gXCIuLi9iYXNlXCI7XG5pbXBvcnQgeyBEb21haW4sIERvbWFpblNjaGVtYSwgVXNlciB9IGZyb20gXCIuLi9tb2RlbHNcIjtcbmltcG9ydCB7IFBhZ2luYXRlZEFycmF5LCBQYWdpbmF0aW9uLCBQYWdpbmF0aW9uVXRpbCB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IEJhc2VNb2RlbFdlYlNlcnZpY2UsIHsgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlL0Jhc2VNb2RlbFdlYlNlcnZpY2VcIjtcblxuZXhwb3J0IGVudW0gUGF5bWVudExvZ1R5cGUge1xuICBDT01NT04gPSBcImNvbW1vblwiLFxuICBFTUlUID0gXCJlbWl0XCIsXG4gIERFU1RST1kgPSBcImRlc3Ryb3lcIlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERvbWFpbk1ldHJpY3NPcHRpb25zIHtcbiAgc3RhcnQ/OiBEYXRlOyAvLyBTdGFydCBvZiBkYXRlIHJhbmdlIGZvciBtZXRyaWNzXG4gIGVuZD86IERhdGU7IC8vIEVuZCBvZiBkYXRlIHJhbmdlIGZvciBtZXRyaWNzXG4gIHNvdXJjZT86IHN0cmluZzsgLy8gR2V0IG1ldHJpY3MgZm9yIGEgc2luZ2xlIHNvdXJjZVxuICByZWNpcGllbnQ/OiBzdHJpbmc7IC8vIEdldCBtZXRyaWNzIGZvciBhIHNpbmdsZSByZWNpcGllbnRcbiAgYXNzZXQ/OiBzdHJpbmc7IC8vIEdldCBtZXRyaWNzIGZvciBhIHNpbmdsZSBhc3NldFxuICB0eXBlPzogUGF5bWVudExvZ1R5cGU7IC8vIEdldCBtZXRyaWNzIGZvciBhIHNpbmdsZSBwYXltZW50IHR5cGVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb3VudE1ldHJpY3NSZXNwb25zZSB7XG4gIHBheW1lbnRUaW1lOiBEYXRlO1xuICBjb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRvdGFsTWV0cmljc1Jlc3BvbnNlIHtcbiAgcGF5bWVudFRpbWU6IERhdGU7XG4gIHRvdGFsQW1vdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9tYWluV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5XZWJTZXJ2aWNlIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZTxEb21haW4sIERvbWFpblNjaGVtYT4ge1xuICBwcm90ZWN0ZWQgaHR0cDogSHR0cDtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogRG9tYWluV2ViU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBEb21haW5XZWJTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBEb21haW5XZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBEb21haW5XZWJTZXJ2aWNlT3B0aW9ucyk6IERvbWFpbldlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgRG9tYWluV2ViU2VydmljZShvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCBEb21haW5zLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRBbGwocGFnaW5hdGlvbjogUGFnaW5hdGlvbik6IFByb21pc2U8UGFnaW5hdGVkQXJyYXk8RG9tYWluPj4ge1xuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KFwiL2RvbWFpbnNcIiwgbnVsbCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQgfSB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBEb21haW5TY2hlbWEpID0+IG5ldyBEb21haW4oaXRlbSkpO1xuICAgIHJldHVybiBQYWdpbmF0aW9uVXRpbC5wYXJzZShyZXN1bHQsIHJlc3BvbnNlLmhlYWRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSBEb21haW4uXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgRG9tYWluIElELlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRPbmUoaWQ6IHN0cmluZyk6IFByb21pc2U8RG9tYWluPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvZG9tYWlucy8ke2lkfWApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEb21haW4ocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgUm9vdCBEb21haW4uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZFJvb3REb21haW4oKTogUHJvbWlzZTxEb21haW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9kb21haW5zL3Jvb3RgKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRG9tYWluKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIFVzZXJzIHdpdGggcm9sZSBDb25zdW1lciBmcm9tIGEgRG9tYWluLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIERvbWFpbiBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kQ29uc3VtZXJzQnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyW10+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9kb21haW5zLyR7aWR9L2NvbnN1bWVyc2ApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEubWFwKHVzZXIgPT4gbmV3IFVzZXIodXNlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIFVzZXJzIHdpdGggcm9sZSBNZWRpYXRvciBmcm9tIGEgRG9tYWluLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIERvbWFpbiBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kTWVkaWF0b3JzQnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyW10+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9kb21haW5zLyR7aWR9L21lZGlhdG9yc2ApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEubWFwKHVzZXIgPT4gbmV3IFVzZXIodXNlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBEb21haW4uXG4gICAqXG4gICAqIEBwYXJhbSBkb21haW4gVGhlIERvbWFpbiBzY2hlbWEuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY3JlYXRlKGRvbWFpbjogRG9tYWluU2NoZW1hKTogUHJvbWlzZTxEb21haW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFwiL2RvbWFpbnNcIiwgZG9tYWluKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRG9tYWluKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnRpYWxseSB1cGRhdGUgYW4gZXhpc3RpbmcgRG9tYWluLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIERvbWFpbiBJRC5cbiAgICogQHBhcmFtIGRvbWFpbiBUaGUgcGFydGlhbCBEb21haW4gc2NoZW1hLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVwZGF0ZShpZDogc3RyaW5nLCBkb21haW46IFBhcnRpYWw8RG9tYWluU2NoZW1hPik6IFByb21pc2U8RG9tYWluPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2RvbWFpbnMvJHtpZH1gLCBkb21haW4pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEb21haW4ocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgRG9tYWluLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIERvbWFpbiBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBkZWxldGUoaWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmRlbGV0ZShgL2RvbWFpbnMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1bXVsYXRpdmUgc3VtIG9mIHBheW1lbnQgYW1vdW50cyBncm91cGVkIGJ5IHRpbWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7RG9tYWluTWV0cmljc09wdGlvbnN9IFtvcHRpb25zXVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFBheW1lbnRzQW1vdW50TWV0cmljcyhpZDogc3RyaW5nLCBvcHRpb25zPzogRG9tYWluTWV0cmljc09wdGlvbnMpOiBQcm9taXNlPFRvdGFsTWV0cmljc1Jlc3BvbnNlW10+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9kb21haW5zLyR7aWR9L21ldHJpY3MvcGF5bWVudHMvYW1vdW50YCwgeyBwYXJhbXM6IG9wdGlvbnMgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXAociA9PiAoeyB0aW1lOiBuZXcgRGF0ZShyLnRpbWUpLCB0b3RhbEFtb3VudDogTnVtYmVyKHIudG90YWxfYW1vdW50KSB9KSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY3VtdWxhdGl2ZSBjb3VudCBvZiBwYXltZW50IGFtb3VudHMgZ3JvdXBlZCBieSB0aW1lXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0RvbWFpbk1ldHJpY3NPcHRpb25zfSBbb3B0aW9uc11cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRQYXltZW50c0NvdW50TWV0cmljcyhpZDogc3RyaW5nLCBvcHRpb25zPzogRG9tYWluTWV0cmljc09wdGlvbnMpOiBQcm9taXNlPENvdW50TWV0cmljc1Jlc3BvbnNlW10+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9kb21haW5zLyR7aWR9L21ldHJpY3MvcGF5bWVudHMvY291bnRgLCB7IHBhcmFtczogb3B0aW9ucyB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZS5kYXRhLm1hcChyID0+ICh7IHRpbWU6IG5ldyBEYXRlKHIudGltZSksIGNvdW50OiBOdW1iZXIoci5jb3VudCkgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1bXVsYXRpdmUgY291bnQgb2YgYWN0aXZlIHVzZXJzIGdyb3VwZWQgYnkgdGltZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtEb21haW5NZXRyaWNzT3B0aW9uc30gW29wdGlvbnNdXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0QWN0aXZlVXNlckNvdW50TWV0cmljcyhpZDogc3RyaW5nLCBvcHRpb25zPzogRG9tYWluTWV0cmljc09wdGlvbnMpOiBQcm9taXNlPENvdW50TWV0cmljc1Jlc3BvbnNlW10+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9kb21haW5zLyR7aWR9L21ldHJpY3MvdXNlcnMvY291bnRgLCB7IHBhcmFtczogb3B0aW9ucyB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZS5kYXRhLm1hcChyID0+ICh7IHRpbWU6IG5ldyBEYXRlKHIudGltZSksIGNvdW50OiBOdW1iZXIoci5jb3VudCkgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1bXVsYXRpdmUgYmFsYW5jZSBncm91cGVkIGJ5IHRpbWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7RG9tYWluTWV0cmljc09wdGlvbnN9IFtvcHRpb25zXVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEJhbGFuY2VNZXRyaWNzKGlkOiBzdHJpbmcsIG9wdGlvbnM/OiBEb21haW5NZXRyaWNzT3B0aW9ucyk6IFByb21pc2U8VG90YWxNZXRyaWNzUmVzcG9uc2VbXT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2RvbWFpbnMvJHtpZH0vbWV0cmljcy9iYWxhbmNlYCwgeyBwYXJhbXM6IG9wdGlvbnMgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXAociA9PiAoeyB0aW1lOiBuZXcgRGF0ZShyLnRpbWUpLCB0b3RhbEFtb3VudDogTnVtYmVyKHIudG90YWxfYW1vdW50KSB9KSk7XG4gIH1cbn1cbiJdfQ==