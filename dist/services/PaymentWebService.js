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
            const asset = request.asset ? request.asset : "";
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
            return new bitcapital_common_1.Payment(response.data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5bWVudFdlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvUGF5bWVudFdlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQU8yQjtBQUMzQixpQ0FBeUU7QUFJekUsTUFBYSxpQkFBa0IsU0FBUSwwQkFBMkM7SUFHaEYsWUFBWSxPQUFpQztRQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFpQztRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7OztPQUlHO0lBQ1UsT0FBTyxDQUFDLEVBQVU7O1lBQzdCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXhELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLDJCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxHQUFHLENBQUMsT0FBNkI7O1lBQzVDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBQ3ZDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVqRCxNQUFNLEdBQUcsR0FBRyxhQUFhLEtBQUssRUFBRSxDQUFDO1lBQ2pDLE1BQU0sSUFBSSxHQUFHLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDO1lBQ3BDLE1BQU0sU0FBUyxHQUFHLCtCQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO2dCQUM1RCxHQUFHO2dCQUNILE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzthQUMzQixDQUFDLENBQUM7WUFFSCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLG9CQUFPLFNBQVMsQ0FBRSxFQUFFLENBQUMsQ0FBQztZQUVoRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSwyQkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsUUFBUSxDQUFDLFdBQW9DOztZQUN4RCxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxXQUFXLENBQUM7WUFFdkQsTUFBTSxPQUFPLEdBQUcsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUM7WUFDeEMsTUFBTSxHQUFHLEdBQUcsc0JBQXNCLFNBQVMsRUFBRSxDQUFDO1lBQzlDLE1BQU0sU0FBUyxHQUFHLCtCQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO2dCQUM1RCxHQUFHO2dCQUNILElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQkFDN0IsTUFBTSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUM7WUFDSCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLG9CQUFPLFNBQVMsQ0FBRSxFQUFFLENBQUMsQ0FBQztZQUVuRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSx1Q0FBbUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsQ0FBQztLQUFBO0NBQ0Y7QUFoRkQsOENBZ0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUGF5bWVudCxcbiAgUGF5bWVudFNjaGVtYSxcbiAgUmVxdWVzdFV0aWwsXG4gIFBheW1lbnRSZXF1ZXN0U2NoZW1hLFxuICBXaXRoZHJhd2FsUmVxdWVzdFNjaGVtYSxcbiAgQmFua1RyYW5zZmVyUGF5bWVudFxufSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcbmltcG9ydCB7IEJhc2VNb2RlbFdlYlNlcnZpY2UsIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBheW1lbnRXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIHt9XG5cbmV4cG9ydCBjbGFzcyBQYXltZW50V2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8UGF5bWVudCwgUGF5bWVudFNjaGVtYT4ge1xuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBQYXltZW50V2ViU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBQYXltZW50V2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUGF5bWVudFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IFBheW1lbnRXZWJTZXJ2aWNlT3B0aW9ucyk6IFBheW1lbnRXZWJTZXJ2aWNlIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFBheW1lbnRXZWJTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSBQYXltZW50LlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIFBheW1lbnQgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZE9uZShpZDogc3RyaW5nKTogUHJvbWlzZTxQYXltZW50PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvcGF5bWVudHMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUGF5bWVudChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG5ldyBQYXltZW50IHRvIHRoZSBuZXR3b3JrLCBmcm9tIGEgc2luZ2xlIHNvdXJjZSB3YWxsZXQgc3BsaXR0aW5nIGludG8gbXVsdGlwbGUgcGF5bWVudCByZWNpcGllbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gcGF5bWVudCBUaGUgUGF5bWVudCBzY2hlbWFcbiAgICovXG4gIHB1YmxpYyBhc3luYyBwYXkocmVxdWVzdDogUGF5bWVudFJlcXVlc3RTY2hlbWEpOiBQcm9taXNlPFBheW1lbnQ+IHtcbiAgICBjb25zdCB7IHNvdXJjZSwgcmVjaXBpZW50cyB9ID0gcmVxdWVzdDtcbiAgICBjb25zdCBhc3NldCA9IHJlcXVlc3QuYXNzZXQgPyByZXF1ZXN0LmFzc2V0IDogXCJcIjtcblxuICAgIGNvbnN0IHVybCA9IGAvcGF5bWVudHMvJHthc3NldH1gO1xuICAgIGNvbnN0IGJvZHkgPSB7IHNvdXJjZSwgcmVjaXBpZW50cyB9O1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IFJlcXVlc3RVdGlsLnNpZ24odGhpcy5vcHRpb25zLmNsaWVudFNlY3JldCwge1xuICAgICAgdXJsLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KHVybCwgYm9keSwgeyBoZWFkZXJzOiB7IC4uLnNpZ25hdHVyZSB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQYXltZW50KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGNhc2hvdXQgZnJvbSBjb25zdW1lciB3YWxsZXQgdG8gdGhlIGJhbmsgYWNjb3VudCBpZGVudGlmaWVkIGJ5IHRoZSBnaXZlbiBpZFxuICAgKlxuICAgKiBAcGFyYW0gYmFua2luZ0lkIFRoZSBpZCBvZiB0aGUgYmFuayBhY2NvdW50IHRvIGJlIGNyZWRpdGVkXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgd2l0aGRyYXcocmVxdWVzdERhdGE6IFdpdGhkcmF3YWxSZXF1ZXN0U2NoZW1hKTogUHJvbWlzZTxCYW5rVHJhbnNmZXJQYXltZW50PiB7XG4gICAgY29uc3QgeyBiYW5raW5nSWQsIGFtb3VudCwgZGVzY3JpcHRpb24gfSA9IHJlcXVlc3REYXRhO1xuXG4gICAgY29uc3QgcGF5bG9hZCA9IHsgYW1vdW50LCBkZXNjcmlwdGlvbiB9O1xuICAgIGNvbnN0IHVybCA9IGAvcGF5bWVudHMvd2l0aGRyYXcvJHtiYW5raW5nSWR9YDtcbiAgICBjb25zdCBzaWduYXR1cmUgPSBSZXF1ZXN0VXRpbC5zaWduKHRoaXMub3B0aW9ucy5jbGllbnRTZWNyZXQsIHtcbiAgICAgIHVybCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIlxuICAgIH0pO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QodXJsLCBwYXlsb2FkLCB7IGhlYWRlcnM6IHsgLi4uc2lnbmF0dXJlIH0gfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEJhbmtUcmFuc2ZlclBheW1lbnQocmVzcG9uc2UuZGF0YSk7XG4gIH1cbn1cbiJdfQ==