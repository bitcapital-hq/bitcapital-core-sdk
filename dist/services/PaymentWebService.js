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
class PaymentWebService extends base_1.BaseModelWebService {
    constructor(options) {
        super(options);
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new PaymentWebService(options);
        return this.instance;
    }
    /**
     * Find a Payment.
     *
     * @param id The Payment ID.
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/payments/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Payment(response.data);
        });
    }
    /**
     * Sends a new Payment to the network, from a single source wallet splitting into multiple payment recipients.
     *
     * @param payment The Payment schema
     */
    pay(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { source, recipients } = request;
            // TODO: This should be deprecated, asset must be passed in recipient
            let asset = "";
            if (request["assetId"]) {
                console.warn("BITCAPITAL-SDK: Payment global recipient is deprecated, asset must be passed in recipients array");
                asset = request["assetId"];
            }
            const url = `/payments/${asset}`;
            const body = { source, recipients };
            const signature = bitcapital_common_1.RequestUtil.sign(this.options.clientSecret, {
                url,
                method: "POST",
                body: JSON.stringify(body)
            });
            const response = yield this.http.post(url, body, { headers: Object.assign({}, signature) });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Transaction(response.data);
        });
    }
    /**
     * Performs cashout from consumer wallet to the bank account identified by the given id
     *
     * @param bankingId The id of the bank account to be credited
     */
    withdraw(requestData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bankingId, amount, description } = requestData;
            const payload = { amount, description };
            const url = `/payments/withdraw/${bankingId}`;
            const signature = bitcapital_common_1.RequestUtil.sign(this.options.clientSecret, {
                url,
                body: JSON.stringify(payload),
                method: "POST"
            });
            const response = yield this.http.post(url, payload, { headers: Object.assign({}, signature) });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.BankTransferPayment(response.data);
        });
    }
    confirm(source, id, extra) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = { source, extra };
            const signature = bitcapital_common_1.RequestUtil.sign(this.options.clientSecret, {
                method: "POST",
                url: `/payments/${id}/confirmation`,
                body: JSON.stringify(body)
            });
            const response = yield this.http.post(`/payments/${id}/confirmation`, body, {
                headers: Object.assign({}, signature)
            });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Payment(response.data);
        });
    }
    reverse(source, id, extra) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = { source, extra };
            const signature = bitcapital_common_1.RequestUtil.sign(this.options.clientSecret, {
                method: "POST",
                url: `/payments/${id}/reversal`,
                body: JSON.stringify(body)
            });
            const response = yield this.http.post(`/payments/${id}/reversal`, body, {
                headers: Object.assign({}, signature)
            });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Payment(response.data);
        });
    }
    authorize(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = Object.assign({}, request);
            const signature = bitcapital_common_1.RequestUtil.sign(this.options.clientSecret, {
                method: "POST",
                url: `/payments/authorization`,
                body: JSON.stringify(body)
            });
            const response = yield this.http.post(`/payments/authorization`, body, {
                headers: Object.assign({}, signature)
            });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Transaction(response.data);
        });
    }
    recordFailedPayment(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = Object.assign({}, request);
            const signature = bitcapital_common_1.RequestUtil.sign(this.options.clientSecret, {
                method: "POST",
                url: `/payments/offline/failed`,
                body: JSON.stringify(body)
            });
            const response = yield this.http.post(`/payments/offline/failed`, body, {
                headers: Object.assign({}, signature)
            });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Transaction(response.data);
        });
    }
}
exports.PaymentWebService = PaymentWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5bWVudFdlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvUGF5bWVudFdlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQVMyQjtBQUMzQixpQ0FBeUU7QUFJekUsTUFBYSxpQkFBa0IsU0FBUSwwQkFBMkM7SUFHaEYsWUFBWSxPQUFpQztRQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFpQztRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7OztPQUlHO0lBQ1UsT0FBTyxDQUFDLEVBQVU7O1lBQzdCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXhELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLDJCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxHQUFHLENBQUMsT0FBNkI7O1lBQzVDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBRXZDLHFFQUFxRTtZQUNyRSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDdEIsT0FBTyxDQUFD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QUM7WUFFSCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSwrQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFFWSxtQkFBbUIsQ0FBQyxPQU1oQzs7WUFDQyxNQUFNLElBQUkscUJBQVEsT0FBTyxDQUFFLENBQUM7WUFDNUIsTUFBTSxTQUFTLEdBQUcsK0JBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7Z0JBQzVELE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSwwQkFBMEI7Z0JBQy9CLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzthQUMzQixDQUFDLENBQUM7WUFFSCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLElBQUksRUFBRTtnQkFDdEUsT0FBTyxvQkFBTyxTQUFTLENBQUU7YUFDMUIsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksK0JBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0NBQ0Y7QUE5S0QsOENBOEtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUGF5bWVudCxcbiAgUGF5bWVudFNjaGVtYSxcbiAgUmVxdWVzdFV0aWwsXG4gIFBheW1lbnRSZXF1ZXN0U2NoZW1hLFxuICBXaXRoZHJhd2FsUmVxdWVzdFNjaGVtYSxcbiAgQmFua1RyYW5zZmVyUGF5bWVudCxcbiAgVHJhbnNhY3Rpb24sXG4gIFBheW1lbnRUeXBlXG59IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZSwgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF5bWVudFdlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cblxuZXhwb3J0IGNsYXNzIFBheW1lbnRXZWJTZXJ2aWNlIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZTxQYXltZW50LCBQYXltZW50U2NoZW1hPiB7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IFBheW1lbnRXZWJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFBheW1lbnRXZWJTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBQYXltZW50V2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogUGF5bWVudFdlYlNlcnZpY2VPcHRpb25zKTogUGF5bWVudFdlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUGF5bWVudFdlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhIFBheW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgUGF5bWVudCBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpOiBQcm9taXNlPFBheW1lbnQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9wYXltZW50cy8ke2lkfWApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQYXltZW50KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgbmV3IFBheW1lbnQgdG8gdGhlIG5ldHdvcmssIGZyb20gYSBzaW5nbGUgc291cmNlIHdhbGxldCBzcGxpdHRpbmcgaW50byBtdWx0aXBsZSBwYXltZW50IHJlY2lwaWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSBwYXltZW50IFRoZSBQYXltZW50IHNjaGVtYVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHBheShyZXF1ZXN0OiBQYXltZW50UmVxdWVzdFNjaGVtYSk6IFByb21pc2U8VHJhbnNhY3Rpb24+IHtcbiAgICBjb25zdCB7IHNvdXJjZSwgcmVjaXBpZW50cyB9ID0gcmVxdWVzdDtcblxuICAgIC8vIFRPRE86IFRoaXMgc2hvdWxkIGJlIGRlcHJlY2F0ZWQsIGFzc2V0IG11c3QgYmUgcGFzc2VkIGluIHJlY2lwaWVudFxuICAgIGxldCBhc3NldCA9IFwiXCI7XG4gICAgaWYgKHJlcXVlc3RbXCJhc3NldElkXCJdKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJCSVRDQVBJVEFMLVNESzogUGF5bWVudCBnbG9iYWwgcmVjaXBpZW50IGlzIGRlcHJlY2F0ZWQsIGFzc2V0IG11c3QgYmUgcGFzc2VkIGluIHJlY2lwaWVudHMgYXJyYXlcIik7XG4gICAgICBhc3NldCA9IHJlcXVlc3RbXCJhc3NldElkXCJdO1xuICAgIH1cblxuICAgIGNvbnN0IHVybCA9IGAvcGF5bWVudHMvJHthc3NldH1gO1xuICAgIGNvbnN0IGJvZHkgPSB7IHNvdXJjZSwgcmVjaXBpZW50cyB9O1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IFJlcXVlc3RVdGlsLnNpZ24odGhpcy5vcHRpb25zLmNsaWVudFNlY3JldCwge1xuICAgICAgdXJsLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KHVybCwgYm9keSwgeyBoZWFkZXJzOiB7IC4uLnNpZ25hdHVyZSB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBjYXNob3V0IGZyb20gY29uc3VtZXIgd2FsbGV0IHRvIHRoZSBiYW5rIGFjY291bnQgaWRlbnRpZmllZCBieSB0aGUgZ2l2ZW4gaWRcbiAgICpcbiAgICogQHBhcmFtIGJhbmtpbmdJZCBUaGUgaWQgb2YgdGhlIGJhbmsgYWNjb3VudCB0byBiZSBjcmVkaXRlZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHdpdGhkcmF3KHJlcXVlc3REYXRhOiBXaXRoZHJhd2FsUmVxdWVzdFNjaGVtYSk6IFByb21pc2U8QmFua1RyYW5zZmVyUGF5bWVudD4ge1xuICAgIGNvbnN0IHsgYmFua2luZ0lkLCBhbW91bnQsIGRlc2NyaXB0aW9uIH0gPSByZXF1ZXN0RGF0YTtcblxuICAgIGNvbnN0IHBheWxvYWQgPSB7IGFtb3VudCwgZGVzY3JpcHRpb24gfTtcbiAgICBjb25zdCB1cmwgPSBgL3BheW1lbnRzL3dpdGhkcmF3LyR7YmFua2luZ0lkfWA7XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCB7XG4gICAgICB1cmwsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCJcbiAgICB9KTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KHVybCwgcGF5bG9hZCwgeyBoZWFkZXJzOiB7IC4uLnNpZ25hdHVyZSB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBCYW5rVHJhbnNmZXJQYXltZW50KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvbmZpcm0oc291cmNlOiBzdHJpbmcsIGlkOiBzdHJpbmcsIGV4dHJhPzogYW55KTogUHJvbWlzZTxQYXltZW50PiB7XG4gICAgY29uc3QgYm9keSA9IHsgc291cmNlLCBleHRyYSB9O1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IFJlcXVlc3RVdGlsLnNpZ24odGhpcy5vcHRpb25zLmNsaWVudFNlY3JldCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogYC9wYXltZW50cy8ke2lkfS9jb25maXJtYXRpb25gLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9wYXltZW50cy8ke2lkfS9jb25maXJtYXRpb25gLCBib2R5LCB7XG4gICAgICBoZWFkZXJzOiB7IC4uLnNpZ25hdHVyZSB9XG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBheW1lbnQocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmV2ZXJzZShzb3VyY2U6IHN0cmluZywgaWQ6IHN0cmluZywgZXh0cmE/OiBhbnkpOiBQcm9taXNlPFBheW1lbnQ+IHtcbiAgICBjb25zdCBib2R5ID0geyBzb3VyY2UsIGV4dHJhIH07XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiBgL3BheW1lbnRzLyR7aWR9L3JldmVyc2FsYCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvcGF5bWVudHMvJHtpZH0vcmV2ZXJzYWxgLCBib2R5LCB7XG4gICAgICBoZWFkZXJzOiB7IC4uLnNpZ25hdHVyZSB9XG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBheW1lbnQocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYXV0aG9yaXplKHJlcXVlc3Q6IHtcbiAgICBzb3VyY2U6IHN0cmluZztcbiAgICBhbW91bnQ6IHN0cmluZztcbiAgICB0eXBlPzogUGF5bWVudFR5cGU7XG4gICAgYXNzZXRDb2RlPzogc3RyaW5nO1xuICAgIGFkZGl0aW9uYWxEYXRhPzogYW55O1xuICB9KTogUHJvbWlzZTxUcmFuc2FjdGlvbj4ge1xuICAgIGNvbnN0IGJvZHkgPSB7IC4uLnJlcXVlc3QgfTtcbiAgICBjb25zdCBzaWduYXR1cmUgPSBSZXF1ZXN0VXRpbC5zaWduKHRoaXMub3B0aW9ucy5jbGllbnRTZWNyZXQsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6IGAvcGF5bWVudHMvYXV0aG9yaXphdGlvbmAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL3BheW1lbnRzL2F1dGhvcml6YXRpb25gLCBib2R5LCB7XG4gICAgICBoZWFkZXJzOiB7IC4uLnNpZ25hdHVyZSB9XG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlY29yZEZhaWxlZFBheW1lbnQocmVxdWVzdDoge1xuICAgIHNvdXJjZTogc3RyaW5nO1xuICAgIGFtb3VudDogc3RyaW5nO1xuICAgIHR5cGU/OiBQYXltZW50VHlwZTtcbiAgICBhc3NldENvZGU/OiBzdHJpbmc7XG4gICAgYWRkaXRpb25hbERhdGE/OiBhbnk7XG4gIH0pOiBQcm9taXNlPFRyYW5zYWN0aW9uPiB7XG4gICAgY29uc3QgYm9keSA9IHsgLi4ucmVxdWVzdCB9O1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IFJlcXVlc3RVdGlsLnNpZ24odGhpcy5vcHRpb25zLmNsaWVudFNlY3JldCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogYC9wYXltZW50cy9vZmZsaW5lL2ZhaWxlZGAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL3BheW1lbnRzL29mZmxpbmUvZmFpbGVkYCwgYm9keSwge1xuICAgICAgaGVhZGVyczogeyAuLi5zaWduYXR1cmUgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbihyZXNwb25zZS5kYXRhKTtcbiAgfVxufVxuIl19