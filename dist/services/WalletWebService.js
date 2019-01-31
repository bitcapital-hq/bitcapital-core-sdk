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
class WalletWebService extends base_1.BaseModelWebService {
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
            const result = response.data.map((item) => new bitcapital_common_1.Wallet(item));
            return bitcapital_common_1.PaginationUtil.parse(result, response.headers);
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
            return new bitcapital_common_1.Wallet(response.data);
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
            const result = response.data.map((item) => new bitcapital_common_1.Transaction(item));
            return bitcapital_common_1.PaginationUtil.parse(result, response.headers);
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
            const result = response.data.map((item) => new bitcapital_common_1.Payment(item));
            return bitcapital_common_1.PaginationUtil.parse(result, response.headers);
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
            return new bitcapital_common_1.Wallet(response.data);
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
            return new bitcapital_common_1.Wallet(response.data);
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
            return new bitcapital_common_1.Wallet(response.data);
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
exports.WalletWebService = WalletWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbGV0V2ViU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9XYWxsZXRXZWJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5REFVMkI7QUFDM0IsaUNBQXlFO0FBSXpFLE1BQWEsZ0JBQWlCLFNBQVEsMEJBQXlDO0lBRzdFLFlBQVksT0FBZ0M7UUFDMUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBZ0M7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDVSxPQUFPLENBQUMsVUFBc0I7O1lBQ3pDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFcEYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCwrREFBK0Q7WUFDL0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFrQixFQUFFLEVBQUUsQ0FBQyxJQUFJLDBCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzRSxPQUFPLGtDQUFjLENBQUMsS0FB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RTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksMEJBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxNQUFNLENBQUMsRUFBVSxFQUFFLE1BQTZCOztZQUMzRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFaEUsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksMEJBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLE1BQU0sQ0FBQyxFQUFVOztZQUM1QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUxRCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0NBQ0Y7QUE3SUQsNENBNklDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBXYWxsZXQsXHJcbiAgV2FsbGV0U2NoZW1hLFxyXG4gIFRyYW5zYWN0aW9uLFxyXG4gIFRyYW5zYWN0aW9uU2NoZW1hLFxyXG4gIFBheW1lbnQsXHJcbiAgUGF5bWVudFNjaGVtYSxcclxuICBQYWdpbmF0aW9uLFxyXG4gIFBhZ2luYXRlZEFycmF5LFxyXG4gIFBhZ2luYXRpb25VdGlsXHJcbn0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XHJcbmltcG9ydCB7IEJhc2VNb2RlbFdlYlNlcnZpY2UsIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXYWxsZXRXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIHt9XHJcblxyXG5leHBvcnQgY2xhc3MgV2FsbGV0V2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8V2FsbGV0LCBXYWxsZXRTY2hlbWE+IHtcclxuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBXYWxsZXRXZWJTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBXYWxsZXRXZWJTZXJ2aWNlT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFdhbGxldFdlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogV2FsbGV0V2ViU2VydmljZU9wdGlvbnMpOiBXYWxsZXRXZWJTZXJ2aWNlIHtcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgV2FsbGV0V2ViU2VydmljZShvcHRpb25zKTtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluZCBhbGwgV2FsbGV0cy5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZmluZEFsbChwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxXYWxsZXQ+PiB7XHJcbiAgICBjb25zdCB7IHNraXAsIGxpbWl0IH0gPSBwYWdpbmF0aW9uO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KFwiL3dhbGxldHNcIiwgbnVsbCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQgfSB9KTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xyXG4gICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YS5tYXAoKGl0ZW06IFdhbGxldFNjaGVtYSkgPT4gbmV3IFdhbGxldChpdGVtKSk7XHJcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmQgYSBXYWxsZXQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaWQgVGhlIFdhbGxldCBJRC5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZmluZE9uZShpZDogc3RyaW5nKTogUHJvbWlzZTxXYWxsZXQ+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL3dhbGxldHMvJHtpZH1gKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgV2FsbGV0KHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluZCB0aGUgVHJhbnNhY3Rpb25zIGZyb20gYSBXYWxsZXQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaWQgVGhlIFdhbGxldCBJRC5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZmluZFdhbGxldFRyYW5zYWN0aW9ucyhpZDogc3RyaW5nLCBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxUcmFuc2FjdGlvbj4+IHtcclxuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC93YWxsZXRzLyR7aWR9L3RyYW5zYWN0aW9uc2AsIG51bGwsIHsgcGFyYW1zOiB7IHNraXAsIGxpbWl0IH0gfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm4gYSBwYWdpbmF0ZWQgYXJyYXkgd2l0aCBjb3VudCBpbmZvcm1hdGlvbiBmcm9tIGhlYWRlcnNcclxuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBUcmFuc2FjdGlvblNjaGVtYSkgPT4gbmV3IFRyYW5zYWN0aW9uKGl0ZW0pKTtcclxuICAgIHJldHVybiBQYWdpbmF0aW9uVXRpbC5wYXJzZShyZXN1bHQsIHJlc3BvbnNlLmhlYWRlcnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluZCB0aGUgUGF5bWVudHMgZnJvbSBhIFdhbGxldC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZCBUaGUgV2FsbGV0IElELlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBmaW5kV2FsbGV0UGF5bWVudHMoaWQ6IHN0cmluZywgcGFnaW5hdGlvbjogUGFnaW5hdGlvbik6IFByb21pc2U8UGFnaW5hdGVkQXJyYXk8UGF5bWVudD4+IHtcclxuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC93YWxsZXRzLyR7aWR9L3BheW1lbnRzYCwgbnVsbCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQgfSB9KTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xyXG4gICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YS5tYXAoKGl0ZW06IFBheW1lbnRTY2hlbWEpID0+IG5ldyBQYXltZW50KGl0ZW0pKTtcclxuICAgIHJldHVybiBQYWdpbmF0aW9uVXRpbC5wYXJzZShyZXN1bHQsIHJlc3BvbnNlLmhlYWRlcnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluZCB0aGUgUm9vdCBXYWxsZXQuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGZpbmRSb290V2FsbGV0KCk6IFByb21pc2U8V2FsbGV0PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC93YWxsZXRzL3Jvb3RgKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgV2FsbGV0KHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IFdhbGxldC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB3YWxsZXQgVGhlIFdhbGxldCBzY2hlbWEuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGNyZWF0ZSh3YWxsZXQ6IFdhbGxldFNjaGVtYSk6IFByb21pc2U8V2FsbGV0PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFwiL3dhbGxldHNcIiwgd2FsbGV0KTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgV2FsbGV0KHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFydGlhbGx5IHVwZGF0ZSBhbiBleGlzdGluZyBXYWxsZXQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaWQgVGhlIFdhbGxldCBJRC5cclxuICAgKiBAcGFyYW0gd2FsbGV0IFRoZSBwYXJ0aWFsIFdhbGxldCBzY2hlbWEuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHVwZGF0ZShpZDogc3RyaW5nLCB3YWxsZXQ6IFBhcnRpYWw8V2FsbGV0U2NoZW1hPik6IFByb21pc2U8V2FsbGV0PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvd2FsbGV0cy8ke2lkfWAsIHdhbGxldCk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFdhbGxldChyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlbGV0ZSBhIFdhbGxldC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZCBUaGUgV2FsbGV0IElELlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBkZWxldGUoaWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZGVsZXRlKGAvd2FsbGV0cy8ke2lkfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==