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
            let asset = '';
            if (request['assetId']) {
                console.warn('BITCAPITAL-SDK: Payment global recipient is deprecated, asset must be passed in recipients array');
                asset = request['assetId'];
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
}
exports.PaymentWebService = PaymentWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5bWVudFdlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvUGF5bWVudFdlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQVEyQjtBQUMzQixpQ0FBeUU7QUFJekUsTUFBYSxpQkFBa0IsU0FBUSwwQkFBMkM7SUFHaEYsWUFBWSxPQUFpQztRQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFpQztRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7OztPQUlHO0lBQ1UsT0FBTyxDQUFDLEVBQVU7O1lBQzdCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXhELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLDJCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxHQUFHLENBQUMsT0FBNkI7O1lBQzVDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBRXZDLHFFQUFxRTtZQUNyRSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxrR0FBa0csQ0FBQyxDQUFDO2dCQUNqSCxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzVCO1lBRUQsTUFBTSxHQUFHLEdBQUcsYUFBYSxLQUFLLEVBQUUsQ0FBQztZQUNqQyxNQUFNLElBQUksR0FBRyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQztZQUNwQyxNQUFNLFNBQVMsR0FBRywrQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDNUQsR0FBRztnQkFDSCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDM0IsQ0FBQyxDQUFDO1lBRUgsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxvQkFBTyxTQUFTLENBQUUsRUFBRSxDQUFDLENBQUM7WUFFaEYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksK0JBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLFFBQVEsQ0FBQyxXQUFvQzs7WUFDeEQsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsV0FBVyxDQUFDO1lBRXZELE1BQU0sT0FBTyxHQUFHLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDO1lBQ3hDLE1BQU0sR0FBRyxHQUFHLHNCQUFzQixTQUFTLEVBQUUsQ0FBQztZQUM5QyxNQUFNLFNBQVMsR0FBRywrQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDNUQsR0FBRztnQkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQzdCLE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxvQkFBTyxTQUFTLENBQUUsRUFBRSxDQUFDLENBQUM7WUFFbkYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksdUNBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUM7S0FBQTtDQUNGO0FBdEZELDhDQXNGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFBheW1lbnQsXG4gIFBheW1lbnRTY2hlbWEsXG4gIFJlcXVlc3RVdGlsLFxuICBQYXltZW50UmVxdWVzdFNjaGVtYSxcbiAgV2l0aGRyYXdhbFJlcXVlc3RTY2hlbWEsXG4gIEJhbmtUcmFuc2ZlclBheW1lbnQsXG4gIFRyYW5zYWN0aW9uXG59IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZSwgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF5bWVudFdlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgeyB9XG5cbmV4cG9ydCBjbGFzcyBQYXltZW50V2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8UGF5bWVudCwgUGF5bWVudFNjaGVtYT4ge1xuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBQYXltZW50V2ViU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBQYXltZW50V2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUGF5bWVudFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IFBheW1lbnRXZWJTZXJ2aWNlT3B0aW9ucyk6IFBheW1lbnRXZWJTZXJ2aWNlIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFBheW1lbnRXZWJTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSBQYXltZW50LlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIFBheW1lbnQgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZE9uZShpZDogc3RyaW5nKTogUHJvbWlzZTxQYXltZW50PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvcGF5bWVudHMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUGF5bWVudChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG5ldyBQYXltZW50IHRvIHRoZSBuZXR3b3JrLCBmcm9tIGEgc2luZ2xlIHNvdXJjZSB3YWxsZXQgc3BsaXR0aW5nIGludG8gbXVsdGlwbGUgcGF5bWVudCByZWNpcGllbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gcGF5bWVudCBUaGUgUGF5bWVudCBzY2hlbWFcbiAgICovXG4gIHB1YmxpYyBhc3luYyBwYXkocmVxdWVzdDogUGF5bWVudFJlcXVlc3RTY2hlbWEpOiBQcm9taXNlPFRyYW5zYWN0aW9uPiB7XG4gICAgY29uc3QgeyBzb3VyY2UsIHJlY2lwaWVudHMgfSA9IHJlcXVlc3Q7XG5cbiAgICAvLyBUT0RPOiBUaGlzIHNob3VsZCBiZSBkZXByZWNhdGVkLCBhc3NldCBtdXN0IGJlIHBhc3NlZCBpbiByZWNpcGllbnRcbiAgICBsZXQgYXNzZXQgPSAnJztcbiAgICBpZiAocmVxdWVzdFsnYXNzZXRJZCddKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0JJVENBUElUQUwtU0RLOiBQYXltZW50IGdsb2JhbCByZWNpcGllbnQgaXMgZGVwcmVjYXRlZCwgYXNzZXQgbXVzdCBiZSBwYXNzZWQgaW4gcmVjaXBpZW50cyBhcnJheScpO1xuICAgICAgYXNzZXQgPSByZXF1ZXN0Wydhc3NldElkJ107XG4gICAgfVxuXG4gICAgY29uc3QgdXJsID0gYC9wYXltZW50cy8ke2Fzc2V0fWA7XG4gICAgY29uc3QgYm9keSA9IHsgc291cmNlLCByZWNpcGllbnRzIH07XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCB7XG4gICAgICB1cmwsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QodXJsLCBib2R5LCB7IGhlYWRlcnM6IHsgLi4uc2lnbmF0dXJlIH0gfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGNhc2hvdXQgZnJvbSBjb25zdW1lciB3YWxsZXQgdG8gdGhlIGJhbmsgYWNjb3VudCBpZGVudGlmaWVkIGJ5IHRoZSBnaXZlbiBpZFxuICAgKlxuICAgKiBAcGFyYW0gYmFua2luZ0lkIFRoZSBpZCBvZiB0aGUgYmFuayBhY2NvdW50IHRvIGJlIGNyZWRpdGVkXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgd2l0aGRyYXcocmVxdWVzdERhdGE6IFdpdGhkcmF3YWxSZXF1ZXN0U2NoZW1hKTogUHJvbWlzZTxCYW5rVHJhbnNmZXJQYXltZW50PiB7XG4gICAgY29uc3QgeyBiYW5raW5nSWQsIGFtb3VudCwgZGVzY3JpcHRpb24gfSA9IHJlcXVlc3REYXRhO1xuXG4gICAgY29uc3QgcGF5bG9hZCA9IHsgYW1vdW50LCBkZXNjcmlwdGlvbiB9O1xuICAgIGNvbnN0IHVybCA9IGAvcGF5bWVudHMvd2l0aGRyYXcvJHtiYW5raW5nSWR9YDtcbiAgICBjb25zdCBzaWduYXR1cmUgPSBSZXF1ZXN0VXRpbC5zaWduKHRoaXMub3B0aW9ucy5jbGllbnRTZWNyZXQsIHtcbiAgICAgIHVybCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIlxuICAgIH0pO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QodXJsLCBwYXlsb2FkLCB7IGhlYWRlcnM6IHsgLi4uc2lnbmF0dXJlIH0gfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEJhbmtUcmFuc2ZlclBheW1lbnQocmVzcG9uc2UuZGF0YSk7XG4gIH1cbn1cbiJdfQ==