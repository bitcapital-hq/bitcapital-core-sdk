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
class WalletWebService extends BaseModelWebService_1.default {
    constructor(options) {
        super(options);
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new WalletWebService(options);
        return this.instance;
    }
    /**
     * Find all Wallets.
     */
    findAll(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get("/wallets", null, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new models_1.Wallet(item));
            return utils_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find a Wallet.
     *
     * @param id The Wallet ID.
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/wallets/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Wallet(response.data);
        });
    }
    /**
     * Find the Transactions from a Wallet.
     *
     * @param id The Wallet ID.
     */
    findWalletTransactions(id, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get(`/wallets/${id}/transactions`, null, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new models_1.Transaction(item));
            return utils_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find the Payments from a Wallet.
     *
     * @param id The Wallet ID.
     */
    findWalletPayments(id, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get(`/wallets/${id}/payments`, null, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new models_1.Payment(item));
            return utils_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find the Root Wallet.
     */
    findRootWallet() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/wallets/root`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Wallet(response.data);
        });
    }
    /**
     * Create a new Wallet.
     *
     * @param wallet The Wallet schema.
     */
    create(wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post("/wallets", wallet);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Wallet(response.data);
        });
    }
    /**
     * Partially update an existing Wallet.
     *
     * @param id The Wallet ID.
     * @param wallet The partial Wallet schema.
     */
    update(id, wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/wallets/${id}`, wallet);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Wallet(response.data);
        });
    }
    /**
     * Delete a Wallet.
     *
     * @param id The Wallet ID.
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.delete(`/wallets/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
}
exports.default = WalletWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbGV0V2ViU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9XYWxsZXRXZWJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUc7QUFDekcsb0NBQXNFO0FBQ3RFLG9FQUE2RjtBQUk3RixzQkFBc0MsU0FBUSw2QkFBeUM7SUFHckYsWUFBWSxPQUFnQztRQUMxQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFnQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNVLE9BQU8sQ0FBQyxVQUFzQjs7WUFDekMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVwRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELCtEQUErRDtZQUMvRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQWtCLEVBQUUsRUFBRSxDQUFDLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0UsT0FBTyxzQkFBYyxD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RyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxlQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsTUFBTSxDQUFDLEVBQVUsRUFBRSxNQUE2Qjs7WUFDM0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRWhFLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLGVBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLE1BQU0sQ0FBQyxFQUFVOztZQUM1QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUxRCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0NBQ0Y7QUE3SUQsbUNBNklDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2FsbGV0LCBXYWxsZXRTY2hlbWEsIFRyYW5zYWN0aW9uLCBUcmFuc2FjdGlvblNjaGVtYSwgUGF5bWVudCwgUGF5bWVudFNjaGVtYSB9IGZyb20gXCIuLi9tb2RlbHNcIjtcbmltcG9ydCB7IFBhZ2luYXRpb25VdGlsLCBQYWdpbmF0ZWRBcnJheSwgUGFnaW5hdGlvbiB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IEJhc2VNb2RlbFdlYlNlcnZpY2UsIHsgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlL0Jhc2VNb2RlbFdlYlNlcnZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBXYWxsZXRXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIHt9XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGxldFdlYlNlcnZpY2UgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlPFdhbGxldCwgV2FsbGV0U2NoZW1hPiB7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IFdhbGxldFdlYlNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogV2FsbGV0V2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogV2FsbGV0V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogV2FsbGV0V2ViU2VydmljZU9wdGlvbnMpOiBXYWxsZXRXZWJTZXJ2aWNlIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFdhbGxldFdlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgV2FsbGV0cy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kQWxsKHBhZ2luYXRpb246IFBhZ2luYXRpb24pOiBQcm9taXNlPFBhZ2luYXRlZEFycmF5PFdhbGxldD4+IHtcbiAgICBjb25zdCB7IHNraXAsIGxpbWl0IH0gPSBwYWdpbmF0aW9uO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChcIi93YWxsZXRzXCIsIG51bGwsIHsgcGFyYW1zOiB7IHNraXAsIGxpbWl0IH0gfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBwYWdpbmF0ZWQgYXJyYXkgd2l0aCBjb3VudCBpbmZvcm1hdGlvbiBmcm9tIGhlYWRlcnNcbiAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5kYXRhLm1hcCgoaXRlbTogV2FsbGV0U2NoZW1hKSA9PiBuZXcgV2FsbGV0KGl0ZW0pKTtcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgV2FsbGV0LlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIFdhbGxldCBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpOiBQcm9taXNlPFdhbGxldD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL3dhbGxldHMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgV2FsbGV0KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIFRyYW5zYWN0aW9ucyBmcm9tIGEgV2FsbGV0LlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIFdhbGxldCBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kV2FsbGV0VHJhbnNhY3Rpb25zKGlkOiBzdHJpbmcsIHBhZ2luYXRpb246IFBhZ2luYXRpb24pOiBQcm9taXNlPFBhZ2luYXRlZEFycmF5PFRyYW5zYWN0aW9uPj4ge1xuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvd2FsbGV0cy8ke2lkfS90cmFuc2FjdGlvbnNgLCBudWxsLCB7IHBhcmFtczogeyBza2lwLCBsaW1pdCB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGEgcGFnaW5hdGVkIGFycmF5IHdpdGggY291bnQgaW5mb3JtYXRpb24gZnJvbSBoZWFkZXJzXG4gICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YS5tYXAoKGl0ZW06IFRyYW5zYWN0aW9uU2NoZW1hKSA9PiBuZXcgVHJhbnNhY3Rpb24oaXRlbSkpO1xuICAgIHJldHVybiBQYWdpbmF0aW9uVXRpbC5wYXJzZShyZXN1bHQsIHJlc3BvbnNlLmhlYWRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIFBheW1lbnRzIGZyb20gYSBXYWxsZXQuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgV2FsbGV0IElELlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRXYWxsZXRQYXltZW50cyhpZDogc3RyaW5nLCBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxQYXltZW50Pj4ge1xuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvd2FsbGV0cy8ke2lkfS9wYXltZW50c2AsIG51bGwsIHsgcGFyYW1zOiB7IHNraXAsIGxpbWl0IH0gfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBwYWdpbmF0ZWQgYXJyYXkgd2l0aCBjb3VudCBpbmZvcm1hdGlvbiBmcm9tIGhlYWRlcnNcbiAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5kYXRhLm1hcCgoaXRlbTogUGF5bWVudFNjaGVtYSkgPT4gbmV3IFBheW1lbnQoaXRlbSkpO1xuICAgIHJldHVybiBQYWdpbmF0aW9uVXRpbC5wYXJzZShyZXN1bHQsIHJlc3BvbnNlLmhlYWRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIFJvb3QgV2FsbGV0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRSb290V2FsbGV0KCk6IFByb21pc2U8V2FsbGV0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvd2FsbGV0cy9yb290YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFdhbGxldChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgV2FsbGV0LlxuICAgKlxuICAgKiBAcGFyYW0gd2FsbGV0IFRoZSBXYWxsZXQgc2NoZW1hLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNyZWF0ZSh3YWxsZXQ6IFdhbGxldFNjaGVtYSk6IFByb21pc2U8V2FsbGV0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcIi93YWxsZXRzXCIsIHdhbGxldCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFdhbGxldChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJ0aWFsbHkgdXBkYXRlIGFuIGV4aXN0aW5nIFdhbGxldC5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBXYWxsZXQgSUQuXG4gICAqIEBwYXJhbSB3YWxsZXQgVGhlIHBhcnRpYWwgV2FsbGV0IHNjaGVtYS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUoaWQ6IHN0cmluZywgd2FsbGV0OiBQYXJ0aWFsPFdhbGxldFNjaGVtYT4pOiBQcm9taXNlPFdhbGxldD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC93YWxsZXRzLyR7aWR9YCwgd2FsbGV0KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgV2FsbGV0KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIFdhbGxldC5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBXYWxsZXQgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGVsZXRlKGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5kZWxldGUoYC93YWxsZXRzLyR7aWR9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19