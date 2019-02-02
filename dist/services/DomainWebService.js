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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluV2ViU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9Eb21haW5XZWJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5REFBaUg7QUFDakgsaUNBQXlFO0FBR3pFLElBQVksY0FJWDtBQUpELFdBQVksY0FBYztJQUN4QixtQ0FBaUIsQ0FBQTtJQUNqQiwrQkFBYSxDQUFBO0lBQ2IscUNBQW1CLENBQUE7QUFDckIsQ0FBQyxFQUpXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBSXpCO0FBYUQsc0JBQThCLFNBQVEsMEJBQXlDO0lBSTdFLFlBQVksT0FBZ0M7UUFDMUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBZ0M7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDVSxPQUFPLENBQUMsVUFBc0I7O1lBQ3pDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFcEYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCwrREFBK0Q7WUFDL0QsTUFBTSxN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QUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuRyxDQUFDO0tBQUE7Q0FDRjtBQXhNRCw0Q0F3TUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEb21haW4sIERvbWFpblNjaGVtYSwgSHR0cCwgVXNlciwgUGFnaW5hdGVkQXJyYXksIFBhZ2luYXRpb24sIFBhZ2luYXRpb25VdGlsIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlLCBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2VcIjtcbmltcG9ydCB7IENvdW50TWV0cmljc1Jlc3BvbnNlLCBUb3RhbE1ldHJpY3NSZXNwb25zZSB9IGZyb20gXCIuL3Jlc3BvbnNlXCI7XG5cbmV4cG9ydCBlbnVtIFBheW1lbnRMb2dUeXBlIHtcbiAgQ09NTU9OID0gXCJjb21tb25cIixcbiAgRU1JVCA9IFwiZW1pdFwiLFxuICBERVNUUk9ZID0gXCJkZXN0cm95XCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb21haW5NZXRyaWNzT3B0aW9ucyB7XG4gIHN0YXJ0PzogRGF0ZTsgLy8gU3RhcnQgb2YgZGF0ZSByYW5nZSBmb3IgbWV0cmljc1xuICBlbmQ/OiBEYXRlOyAvLyBFbmQgb2YgZGF0ZSByYW5nZSBmb3IgbWV0cmljc1xuICBzb3VyY2U/OiBzdHJpbmc7IC8vIEdldCBtZXRyaWNzIGZvciBhIHNpbmdsZSBzb3VyY2VcbiAgcmVjaXBpZW50Pzogc3RyaW5nOyAvLyBHZXQgbWV0cmljcyBmb3IgYSBzaW5nbGUgcmVjaXBpZW50XG4gIGFzc2V0Pzogc3RyaW5nOyAvLyBHZXQgbWV0cmljcyBmb3IgYSBzaW5nbGUgYXNzZXRcbiAgdHlwZT86IFBheW1lbnRMb2dUeXBlOyAvLyBHZXQgbWV0cmljcyBmb3IgYSBzaW5nbGUgcGF5bWVudCB0eXBlXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9tYWluV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxuXG5leHBvcnQgY2xhc3MgRG9tYWluV2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8RG9tYWluLCBEb21haW5TY2hlbWE+IHtcbiAgcHJvdGVjdGVkIGh0dHA6IEh0dHA7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IERvbWFpbldlYlNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogRG9tYWluV2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogRG9tYWluV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogRG9tYWluV2ViU2VydmljZU9wdGlvbnMpOiBEb21haW5XZWJTZXJ2aWNlIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IERvbWFpbldlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgRG9tYWlucy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kQWxsKHBhZ2luYXRpb246IFBhZ2luYXRpb24pOiBQcm9taXNlPFBhZ2luYXRlZEFycmF5PERvbWFpbj4+IHtcbiAgICBjb25zdCB7IHNraXAsIGxpbWl0IH0gPSBwYWdpbmF0aW9uO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChcIi9kb21haW5zXCIsIG51bGwsIHsgcGFyYW1zOiB7IHNraXAsIGxpbWl0IH0gfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBwYWdpbmF0ZWQgYXJyYXkgd2l0aCBjb3VudCBpbmZvcm1hdGlvbiBmcm9tIGhlYWRlcnNcbiAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5kYXRhLm1hcCgoaXRlbTogRG9tYWluU2NoZW1hKSA9PiBuZXcgRG9tYWluKGl0ZW0pKTtcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgRG9tYWluLlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIERvbWFpbiBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2RvbWFpbnMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRG9tYWluKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIFJvb3QgRG9tYWluLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRSb290RG9tYWluKCk6IFByb21pc2U8RG9tYWluPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvZG9tYWlucy9yb290YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERvbWFpbihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBVc2VycyB3aXRoIHJvbGUgQ29uc3VtZXIgZnJvbSBhIERvbWFpbi5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBEb21haW4gSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZENvbnN1bWVyc0J5SWQoaWQ6IHN0cmluZyk6IFByb21pc2U8VXNlcltdPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvZG9tYWlucy8ke2lkfS9jb25zdW1lcnNgKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZS5kYXRhLm1hcCh1c2VyID0+IG5ldyBVc2VyKHVzZXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBVc2VycyB3aXRoIHJvbGUgTWVkaWF0b3IgZnJvbSBhIERvbWFpbi5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBEb21haW4gSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZE1lZGlhdG9yc0J5SWQoaWQ6IHN0cmluZyk6IFByb21pc2U8VXNlcltdPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvZG9tYWlucy8ke2lkfS9tZWRpYXRvcnNgKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZS5kYXRhLm1hcCh1c2VyID0+IG5ldyBVc2VyKHVzZXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgRG9tYWluLlxuICAgKlxuICAgKiBAcGFyYW0gZG9tYWluIFRoZSBEb21haW4gc2NoZW1hLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNyZWF0ZShkb21haW46IERvbWFpblNjaGVtYSk6IFByb21pc2U8RG9tYWluPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcIi9kb21haW5zXCIsIGRvbWFpbik7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERvbWFpbihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJ0aWFsbHkgdXBkYXRlIGFuIGV4aXN0aW5nIERvbWFpbi5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBEb21haW4gSUQuXG4gICAqIEBwYXJhbSBkb21haW4gVGhlIHBhcnRpYWwgRG9tYWluIHNjaGVtYS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUoaWQ6IHN0cmluZywgZG9tYWluOiBQYXJ0aWFsPERvbWFpblNjaGVtYT4pOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9kb21haW5zLyR7aWR9YCwgZG9tYWluKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRG9tYWluKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIERvbWFpbi5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBEb21haW4gSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGVsZXRlKGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5kZWxldGUoYC9kb21haW5zLyR7aWR9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdW11bGF0aXZlIHN1bSBvZiBwYXltZW50IGFtb3VudHMgZ3JvdXBlZCBieSB0aW1lXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0RvbWFpbk1ldHJpY3NPcHRpb25zfSBbb3B0aW9uc11cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRQYXltZW50c0Ftb3VudE1ldHJpY3MoaWQ6IHN0cmluZywgb3B0aW9ucz86IERvbWFpbk1ldHJpY3NPcHRpb25zKTogUHJvbWlzZTxUb3RhbE1ldHJpY3NSZXNwb25zZVtdPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvZG9tYWlucy8ke2lkfS9tZXRyaWNzL3BheW1lbnRzL2Ftb3VudGAsIHsgcGFyYW1zOiBvcHRpb25zIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEubWFwKHIgPT4gKHsgdGltZTogbmV3IERhdGUoci50aW1lKSwgdG90YWxBbW91bnQ6IE51bWJlcihyLnRvdGFsX2Ftb3VudCkgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1bXVsYXRpdmUgY291bnQgb2YgcGF5bWVudCBhbW91bnRzIGdyb3VwZWQgYnkgdGltZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICogQHBhcmFtIHtEb21haW5NZXRyaWNzT3B0aW9uc30gW29wdGlvbnNdXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0UGF5bWVudHNDb3VudE1ldHJpY3MoaWQ6IHN0cmluZywgb3B0aW9ucz86IERvbWFpbk1ldHJpY3NPcHRpb25zKTogUHJvbWlzZTxDb3VudE1ldHJpY3NSZXNwb25zZVtdPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvZG9tYWlucy8ke2lkfS9tZXRyaWNzL3BheW1lbnRzL2NvdW50YCwgeyBwYXJhbXM6IG9wdGlvbnMgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXAociA9PiAoeyB0aW1lOiBuZXcgRGF0ZShyLnRpbWUpLCBjb3VudDogTnVtYmVyKHIuY291bnQpIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdW11bGF0aXZlIGNvdW50IG9mIGFjdGl2ZSB1c2VycyBncm91cGVkIGJ5IHRpbWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAqIEBwYXJhbSB7RG9tYWluTWV0cmljc09wdGlvbnN9IFtvcHRpb25zXVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldEFjdGl2ZVVzZXJDb3VudE1ldHJpY3MoaWQ6IHN0cmluZywgb3B0aW9ucz86IERvbWFpbk1ldHJpY3NPcHRpb25zKTogUHJvbWlzZTxDb3VudE1ldHJpY3NSZXNwb25zZVtdPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvZG9tYWlucy8ke2lkfS9tZXRyaWNzL3VzZXJzL2NvdW50YCwgeyBwYXJhbXM6IG9wdGlvbnMgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXAociA9PiAoeyB0aW1lOiBuZXcgRGF0ZShyLnRpbWUpLCBjb3VudDogTnVtYmVyKHIuY291bnQpIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdW11bGF0aXZlIGJhbGFuY2UgZ3JvdXBlZCBieSB0aW1lXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgKiBAcGFyYW0ge0RvbWFpbk1ldHJpY3NPcHRpb25zfSBbb3B0aW9uc11cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRCYWxhbmNlTWV0cmljcyhpZDogc3RyaW5nLCBvcHRpb25zPzogRG9tYWluTWV0cmljc09wdGlvbnMpOiBQcm9taXNlPFRvdGFsTWV0cmljc1Jlc3BvbnNlW10+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9kb21haW5zLyR7aWR9L21ldHJpY3MvYmFsYW5jZWAsIHsgcGFyYW1zOiBvcHRpb25zIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEubWFwKHIgPT4gKHsgdGltZTogbmV3IERhdGUoci50aW1lKSwgdG90YWxBbW91bnQ6IE51bWJlcihyLnRvdGFsX2Ftb3VudCkgfSkpO1xuICB9XG59XG4iXX0=