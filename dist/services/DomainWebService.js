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
var PaymentLogType;
(function (PaymentLogType) {
    PaymentLogType["COMMON"] = "common";
    PaymentLogType["EMIT"] = "emit";
    PaymentLogType["DESTROY"] = "destroy";
})(PaymentLogType = exports.PaymentLogType || (exports.PaymentLogType = {}));
class DomainWebService extends base_1.BaseModelWebService {
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
            const result = response.data.map((item) => new bitcapital_common_1.Domain(item));
            return bitcapital_common_1.PaginationUtil.parse(result, response.headers);
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
            return new bitcapital_common_1.Domain(response.data);
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
            return new bitcapital_common_1.Domain(response.data);
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
            return response.data.map(user => new bitcapital_common_1.User(user));
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
            return response.data.map(user => new bitcapital_common_1.User(user));
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
            return new bitcapital_common_1.Domain(response.data);
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
            return new bitcapital_common_1.Domain(response.data);
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
exports.DomainWebService = DomainWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluV2ViU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9Eb21haW5XZWJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5REFBaUg7QUFDakgsaUNBQXlFO0FBR3pFLElBQVksY0FJWDtBQUpELFdBQVksY0FBYztJQUN4QixtQ0FBaUIsQ0FBQTtJQUNqQiwrQkFBYSxDQUFBO0lBQ2IscUNBQW1CLENBQUE7QUFDckIsQ0FBQyxFQUpXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBSXpCO0FBYUQsTUFBYSxnQkFBaUIsU0FBUSwwQkFBeUM7SUFJN0UsWUFBWSxPQUFnQztRQUMxQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFnQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNVLE9BQU8sQ0FBQyxVQUFzQjs7WUFDekMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVwRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELCtEQUErRDtZQUMvRCxN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RTVGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25HLENBQUM7S0FBQTtDQUNGO0FBeE1ELDRDQXdNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvbWFpbiwgRG9tYWluU2NoZW1hLCBIdHRwLCBVc2VyLCBQYWdpbmF0ZWRBcnJheSwgUGFnaW5hdGlvbiwgUGFnaW5hdGlvblV0aWwgfSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcclxuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZSwgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7IENvdW50TWV0cmljc1Jlc3BvbnNlLCBUb3RhbE1ldHJpY3NSZXNwb25zZSB9IGZyb20gXCIuL3Jlc3BvbnNlXCI7XHJcblxyXG5leHBvcnQgZW51bSBQYXltZW50TG9nVHlwZSB7XHJcbiAgQ09NTU9OID0gXCJjb21tb25cIixcclxuICBFTUlUID0gXCJlbWl0XCIsXHJcbiAgREVTVFJPWSA9IFwiZGVzdHJveVwiXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRG9tYWluTWV0cmljc09wdGlvbnMge1xyXG4gIHN0YXJ0PzogRGF0ZTsgLy8gU3RhcnQgb2YgZGF0ZSByYW5nZSBmb3IgbWV0cmljc1xyXG4gIGVuZD86IERhdGU7IC8vIEVuZCBvZiBkYXRlIHJhbmdlIGZvciBtZXRyaWNzXHJcbiAgc291cmNlPzogc3RyaW5nOyAvLyBHZXQgbWV0cmljcyBmb3IgYSBzaW5nbGUgc291cmNlXHJcbiAgcmVjaXBpZW50Pzogc3RyaW5nOyAvLyBHZXQgbWV0cmljcyBmb3IgYSBzaW5nbGUgcmVjaXBpZW50XHJcbiAgYXNzZXQ/OiBzdHJpbmc7IC8vIEdldCBtZXRyaWNzIGZvciBhIHNpbmdsZSBhc3NldFxyXG4gIHR5cGU/OiBQYXltZW50TG9nVHlwZTsgLy8gR2V0IG1ldHJpY3MgZm9yIGEgc2luZ2xlIHBheW1lbnQgdHlwZVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERvbWFpbldlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cclxuXHJcbmV4cG9ydCBjbGFzcyBEb21haW5XZWJTZXJ2aWNlIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZTxEb21haW4sIERvbWFpblNjaGVtYT4ge1xyXG4gIHByb3RlY3RlZCBodHRwOiBIdHRwO1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IERvbWFpbldlYlNlcnZpY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IERvbWFpbldlYlNlcnZpY2VPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogRG9tYWluV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBEb21haW5XZWJTZXJ2aWNlT3B0aW9ucyk6IERvbWFpbldlYlNlcnZpY2Uge1xyXG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBEb21haW5XZWJTZXJ2aWNlKG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5kIGFsbCBEb21haW5zLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBmaW5kQWxsKHBhZ2luYXRpb246IFBhZ2luYXRpb24pOiBQcm9taXNlPFBhZ2luYXRlZEFycmF5PERvbWFpbj4+IHtcclxuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoXCIvZG9tYWluc1wiLCBudWxsLCB7IHBhcmFtczogeyBza2lwLCBsaW1pdCB9IH0pO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJuIGEgcGFnaW5hdGVkIGFycmF5IHdpdGggY291bnQgaW5mb3JtYXRpb24gZnJvbSBoZWFkZXJzXHJcbiAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5kYXRhLm1hcCgoaXRlbTogRG9tYWluU2NoZW1hKSA9PiBuZXcgRG9tYWluKGl0ZW0pKTtcclxuICAgIHJldHVybiBQYWdpbmF0aW9uVXRpbC5wYXJzZShyZXN1bHQsIHJlc3BvbnNlLmhlYWRlcnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluZCBhIERvbWFpbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZCBUaGUgRG9tYWluIElELlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpbj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvZG9tYWlucy8ke2lkfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBEb21haW4ocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5kIHRoZSBSb290IERvbWFpbi5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZmluZFJvb3REb21haW4oKTogUHJvbWlzZTxEb21haW4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2RvbWFpbnMvcm9vdGApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBEb21haW4ocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5kIHRoZSBVc2VycyB3aXRoIHJvbGUgQ29uc3VtZXIgZnJvbSBhIERvbWFpbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZCBUaGUgRG9tYWluIElELlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBmaW5kQ29uc3VtZXJzQnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyW10+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2RvbWFpbnMvJHtpZH0vY29uc3VtZXJzYCk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXAodXNlciA9PiBuZXcgVXNlcih1c2VyKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5kIHRoZSBVc2VycyB3aXRoIHJvbGUgTWVkaWF0b3IgZnJvbSBhIERvbWFpbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZCBUaGUgRG9tYWluIElELlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBmaW5kTWVkaWF0b3JzQnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyW10+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2RvbWFpbnMvJHtpZH0vbWVkaWF0b3JzYCk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXAodXNlciA9PiBuZXcgVXNlcih1c2VyKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgRG9tYWluLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRvbWFpbiBUaGUgRG9tYWluIHNjaGVtYS5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgY3JlYXRlKGRvbWFpbjogRG9tYWluU2NoZW1hKTogUHJvbWlzZTxEb21haW4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoXCIvZG9tYWluc1wiLCBkb21haW4pO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBEb21haW4ocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXJ0aWFsbHkgdXBkYXRlIGFuIGV4aXN0aW5nIERvbWFpbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZCBUaGUgRG9tYWluIElELlxyXG4gICAqIEBwYXJhbSBkb21haW4gVGhlIHBhcnRpYWwgRG9tYWluIHNjaGVtYS5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKGlkOiBzdHJpbmcsIGRvbWFpbjogUGFydGlhbDxEb21haW5TY2hlbWE+KTogUHJvbWlzZTxEb21haW4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9kb21haW5zLyR7aWR9YCwgZG9tYWluKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgRG9tYWluKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVsZXRlIGEgRG9tYWluLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGlkIFRoZSBEb21haW4gSUQuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGRlbGV0ZShpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5kZWxldGUoYC9kb21haW5zLyR7aWR9YCk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGN1bXVsYXRpdmUgc3VtIG9mIHBheW1lbnQgYW1vdW50cyBncm91cGVkIGJ5IHRpbWVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqIEBwYXJhbSB7RG9tYWluTWV0cmljc09wdGlvbnN9IFtvcHRpb25zXVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBnZXRQYXltZW50c0Ftb3VudE1ldHJpY3MoaWQ6IHN0cmluZywgb3B0aW9ucz86IERvbWFpbk1ldHJpY3NPcHRpb25zKTogUHJvbWlzZTxUb3RhbE1ldHJpY3NSZXNwb25zZVtdPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9kb21haW5zLyR7aWR9L21ldHJpY3MvcGF5bWVudHMvYW1vdW50YCwgeyBwYXJhbXM6IG9wdGlvbnMgfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXAociA9PiAoeyB0aW1lOiBuZXcgRGF0ZShyLnRpbWUpLCB0b3RhbEFtb3VudDogTnVtYmVyKHIudG90YWxfYW1vdW50KSB9KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBjdW11bGF0aXZlIGNvdW50IG9mIHBheW1lbnQgYW1vdW50cyBncm91cGVkIGJ5IHRpbWVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqIEBwYXJhbSB7RG9tYWluTWV0cmljc09wdGlvbnN9IFtvcHRpb25zXVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBnZXRQYXltZW50c0NvdW50TWV0cmljcyhpZDogc3RyaW5nLCBvcHRpb25zPzogRG9tYWluTWV0cmljc09wdGlvbnMpOiBQcm9taXNlPENvdW50TWV0cmljc1Jlc3BvbnNlW10+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2RvbWFpbnMvJHtpZH0vbWV0cmljcy9wYXltZW50cy9jb3VudGAsIHsgcGFyYW1zOiBvcHRpb25zIH0pO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEubWFwKHIgPT4gKHsgdGltZTogbmV3IERhdGUoci50aW1lKSwgY291bnQ6IE51bWJlcihyLmNvdW50KSB9KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBjdW11bGF0aXZlIGNvdW50IG9mIGFjdGl2ZSB1c2VycyBncm91cGVkIGJ5IHRpbWVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqIEBwYXJhbSB7RG9tYWluTWV0cmljc09wdGlvbnN9IFtvcHRpb25zXVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBnZXRBY3RpdmVVc2VyQ291bnRNZXRyaWNzKGlkOiBzdHJpbmcsIG9wdGlvbnM/OiBEb21haW5NZXRyaWNzT3B0aW9ucyk6IFByb21pc2U8Q291bnRNZXRyaWNzUmVzcG9uc2VbXT4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvZG9tYWlucy8ke2lkfS9tZXRyaWNzL3VzZXJzL2NvdW50YCwgeyBwYXJhbXM6IG9wdGlvbnMgfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXAociA9PiAoeyB0aW1lOiBuZXcgRGF0ZShyLnRpbWUpLCBjb3VudDogTnVtYmVyKHIuY291bnQpIH0pKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGN1bXVsYXRpdmUgYmFsYW5jZSBncm91cGVkIGJ5IHRpbWVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqIEBwYXJhbSB7RG9tYWluTWV0cmljc09wdGlvbnN9IFtvcHRpb25zXVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBnZXRCYWxhbmNlTWV0cmljcyhpZDogc3RyaW5nLCBvcHRpb25zPzogRG9tYWluTWV0cmljc09wdGlvbnMpOiBQcm9taXNlPFRvdGFsTWV0cmljc1Jlc3BvbnNlW10+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2RvbWFpbnMvJHtpZH0vbWV0cmljcy9iYWxhbmNlYCwgeyBwYXJhbXM6IG9wdGlvbnMgfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXAociA9PiAoeyB0aW1lOiBuZXcgRGF0ZShyLnRpbWUpLCB0b3RhbEFtb3VudDogTnVtYmVyKHIudG90YWxfYW1vdW50KSB9KSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==