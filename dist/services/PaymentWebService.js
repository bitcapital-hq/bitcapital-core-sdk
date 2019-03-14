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
}
exports.PaymentWebService = PaymentWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5bWVudFdlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvUGF5bWVudFdlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQVEyQjtBQUMzQixpQ0FBeUU7QUFJekUsTUFBYSxpQkFBa0IsU0FBUSwwQkFBMkM7SUFHaEYsWUFBWSxPQUFpQztRQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFpQztRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7OztPQUlHO0lBQ1UsT0FBTyxDQUFDLEVBQVU7O1lBQzdCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXhELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLDJCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxHQUFHLENBQUMsT0FBNkI7O1lBQzVDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBRXZDLHFFQUFxRTtZQUNyRSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxrR0FBa0csQ0FBQyxDQUFDO2dCQUNqSCxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzVCO1lBRUQsTUFBTSxHQUFHLEdBQUcsYUFBYSxLQUFLLEVBQUUsQ0FBQztZQUNqQyxNQUFNLElBQUksR0FBRyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQztZQUNwQyxNQUFNLFNBQVMsR0FBRywrQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDNUQsR0FBRztnQkFDSCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDM0IsQ0FBQyxDQUFDO1lBRUgsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxvQkFBTyxTQUFTLENBQUUsRUFBRSxDQUFDLENBQUM7WUFFaEYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksK0JBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLFFBQVEsQ0FBQyxXQUFvQzs7WUFDeEQsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsV0FBVyxDQUFDO1lBRXZELE1BQU0sT0FBTyxHQUFHLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDO1lBQ3hDLE1BQU0sR0FBRyxHQUFHLHNCQUFzQixTQUFTLEVBQUUsQ0FBQztZQUM5QyxNQUFNLFNBQVMsR0FBRywrQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDNUQsR0FBRztnQkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQzdCLE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxvQkFBTyxTQUFTLENBQUUsRUFBRSxDQUFDLENBQUM7WUFFbkYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksdUNBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUM7S0FBQTtDQUNGO0FBdEZELDhDQXNGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgUGF5bWVudCxcclxuICBQYXltZW50U2NoZW1hLFxyXG4gIFJlcXVlc3RVdGlsLFxyXG4gIFBheW1lbnRSZXF1ZXN0U2NoZW1hLFxyXG4gIFdpdGhkcmF3YWxSZXF1ZXN0U2NoZW1hLFxyXG4gIEJhbmtUcmFuc2ZlclBheW1lbnQsXHJcbiAgVHJhbnNhY3Rpb25cclxufSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcclxuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZSwgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBheW1lbnRXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIHt9XHJcblxyXG5leHBvcnQgY2xhc3MgUGF5bWVudFdlYlNlcnZpY2UgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlPFBheW1lbnQsIFBheW1lbnRTY2hlbWE+IHtcclxuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBQYXltZW50V2ViU2VydmljZTtcclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogUGF5bWVudFdlYlNlcnZpY2VPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUGF5bWVudFdlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogUGF5bWVudFdlYlNlcnZpY2VPcHRpb25zKTogUGF5bWVudFdlYlNlcnZpY2Uge1xyXG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQYXltZW50V2ViU2VydmljZShvcHRpb25zKTtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluZCBhIFBheW1lbnQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaWQgVGhlIFBheW1lbnQgSUQuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGZpbmRPbmUoaWQ6IHN0cmluZyk6IFByb21pc2U8UGF5bWVudD4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvcGF5bWVudHMvJHtpZH1gKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUGF5bWVudChyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlbmRzIGEgbmV3IFBheW1lbnQgdG8gdGhlIG5ldHdvcmssIGZyb20gYSBzaW5nbGUgc291cmNlIHdhbGxldCBzcGxpdHRpbmcgaW50byBtdWx0aXBsZSBwYXltZW50IHJlY2lwaWVudHMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcGF5bWVudCBUaGUgUGF5bWVudCBzY2hlbWFcclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgcGF5KHJlcXVlc3Q6IFBheW1lbnRSZXF1ZXN0U2NoZW1hKTogUHJvbWlzZTxUcmFuc2FjdGlvbj4ge1xyXG4gICAgY29uc3QgeyBzb3VyY2UsIHJlY2lwaWVudHMgfSA9IHJlcXVlc3Q7XHJcblxyXG4gICAgLy8gVE9ETzogVGhpcyBzaG91bGQgYmUgZGVwcmVjYXRlZCwgYXNzZXQgbXVzdCBiZSBwYXNzZWQgaW4gcmVjaXBpZW50XHJcbiAgICBsZXQgYXNzZXQgPSBcIlwiO1xyXG4gICAgaWYgKHJlcXVlc3RbXCJhc3NldElkXCJdKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcIkJJVENBUElUQUwtU0RLOiBQYXltZW50IGdsb2JhbCByZWNpcGllbnQgaXMgZGVwcmVjYXRlZCwgYXNzZXQgbXVzdCBiZSBwYXNzZWQgaW4gcmVjaXBpZW50cyBhcnJheVwiKTtcclxuICAgICAgYXNzZXQgPSByZXF1ZXN0W1wiYXNzZXRJZFwiXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cmwgPSBgL3BheW1lbnRzLyR7YXNzZXR9YDtcclxuICAgIGNvbnN0IGJvZHkgPSB7IHNvdXJjZSwgcmVjaXBpZW50cyB9O1xyXG4gICAgY29uc3Qgc2lnbmF0dXJlID0gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCB7XHJcbiAgICAgIHVybCxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QodXJsLCBib2R5LCB7IGhlYWRlcnM6IHsgLi4uc2lnbmF0dXJlIH0gfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGVyZm9ybXMgY2FzaG91dCBmcm9tIGNvbnN1bWVyIHdhbGxldCB0byB0aGUgYmFuayBhY2NvdW50IGlkZW50aWZpZWQgYnkgdGhlIGdpdmVuIGlkXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYmFua2luZ0lkIFRoZSBpZCBvZiB0aGUgYmFuayBhY2NvdW50IHRvIGJlIGNyZWRpdGVkXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHdpdGhkcmF3KHJlcXVlc3REYXRhOiBXaXRoZHJhd2FsUmVxdWVzdFNjaGVtYSk6IFByb21pc2U8QmFua1RyYW5zZmVyUGF5bWVudD4ge1xyXG4gICAgY29uc3QgeyBiYW5raW5nSWQsIGFtb3VudCwgZGVzY3JpcHRpb24gfSA9IHJlcXVlc3REYXRhO1xyXG5cclxuICAgIGNvbnN0IHBheWxvYWQgPSB7IGFtb3VudCwgZGVzY3JpcHRpb24gfTtcclxuICAgIGNvbnN0IHVybCA9IGAvcGF5bWVudHMvd2l0aGRyYXcvJHtiYW5raW5nSWR9YDtcclxuICAgIGNvbnN0IHNpZ25hdHVyZSA9IFJlcXVlc3RVdGlsLnNpZ24odGhpcy5vcHRpb25zLmNsaWVudFNlY3JldCwge1xyXG4gICAgICB1cmwsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QodXJsLCBwYXlsb2FkLCB7IGhlYWRlcnM6IHsgLi4uc2lnbmF0dXJlIH0gfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEJhbmtUcmFuc2ZlclBheW1lbnQocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==