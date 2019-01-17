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
const utils_1 = require("../utils");
const models_1 = require("../models");
const BaseModelWebService_1 = require("./base/BaseModelWebService");
class PaymentWebService extends BaseModelWebService_1.default {
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
            return new models_1.Payment(response.data);
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
            const signature = utils_1.RequestUtil.sign(this.options.clientSecret, {
                url,
                method: "POST",
                body: JSON.stringify(body)
            });
            const response = yield this.http.post(url, body, { headers: Object.assign({}, signature) });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.Payment(response.data);
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
            const signature = utils_1.RequestUtil.sign(this.options.clientSecret, {
                url,
                body: JSON.stringify(payload),
                method: "POST"
            });
            const response = yield this.http.post(url, payload, { headers: Object.assign({}, signature) });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.BankTransferPayment(response.data);
        });
    }
}
exports.default = PaymentWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5bWVudFdlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvUGF5bWVudFdlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9DQUF1QztBQUN2QyxzQ0FNb0I7QUFDcEIsb0VBQTZGO0FBSTdGLHVCQUF1QyxTQUFRLDZCQUEyQztJQUd4RixZQUFZLE9BQWlDO1FBQzNDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQWlDO1FBQ3hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSxPQUFPLENBQUMsRUFBVTs7WUFDN0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFeEQsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksZ0JBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLEdBQUcsQ0FBQyxPQUE2Qjs7WUFDNUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxPQUFPLENBQUM7WUFDdkMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRWpELE1BQU0sR0FBRyxHQUFHLGFBQWEsS0FBSyxFQUFFLENBQUM7WUFDakMsTUFBTSxJQUFJLEdBQUcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUM7WUFDcEMsTUFBTSxTQUFTLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7Z0JBQzVELEdBQUc7Z0JBQ0gsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQzNCLENBQUMsQ0FBQztZQUVILE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sb0JBQU8sU0FBUyxDQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRWhGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLGdCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxRQUFRLENBQUMsV0FBb0M7O1lBQ3hELE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLFdBQVcsQ0FBQztZQUV2RCxNQUFNLE9BQU8sR0FBRyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQztZQUN4QyxNQUFNLEdBQUcsR0FBRyxzQkFBc0IsU0FBUyxFQUFFLENBQUM7WUFDOUMsTUFBTSxTQUFTLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7Z0JBQzVELEdBQUc7Z0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2dCQUM3QixNQUFNLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sb0JBQU8sU0FBUyxDQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRW5GLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLDRCQUFtQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxDQUFDO0tBQUE7Q0FDRjtBQWhGRCxvQ0FnRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0VXRpbCB9IGZyb20gXCIuLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBcclxuICBQYXltZW50LCBcclxuICBQYXltZW50UmVxdWVzdFNjaGVtYSwgXHJcbiAgUGF5bWVudFNjaGVtYSwgXHJcbiAgQmFua1RyYW5zZmVyUGF5bWVudCxcclxuICBXaXRoZHJhd2FsUmVxdWVzdFNjaGVtYVxyXG4gfSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCBCYXNlTW9kZWxXZWJTZXJ2aWNlLCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBheW1lbnRXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIHt9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXltZW50V2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8UGF5bWVudCwgUGF5bWVudFNjaGVtYT4ge1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IFBheW1lbnRXZWJTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBQYXltZW50V2ViU2VydmljZU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBQYXltZW50V2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBQYXltZW50V2ViU2VydmljZU9wdGlvbnMpOiBQYXltZW50V2ViU2VydmljZSB7XHJcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFBheW1lbnRXZWJTZXJ2aWNlKG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5kIGEgUGF5bWVudC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZCBUaGUgUGF5bWVudCBJRC5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZmluZE9uZShpZDogc3RyaW5nKTogUHJvbWlzZTxQYXltZW50PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9wYXltZW50cy8ke2lkfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQYXltZW50KHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VuZHMgYSBuZXcgUGF5bWVudCB0byB0aGUgbmV0d29yaywgZnJvbSBhIHNpbmdsZSBzb3VyY2Ugd2FsbGV0IHNwbGl0dGluZyBpbnRvIG11bHRpcGxlIHBheW1lbnQgcmVjaXBpZW50cy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBwYXltZW50IFRoZSBQYXltZW50IHNjaGVtYVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBwYXkocmVxdWVzdDogUGF5bWVudFJlcXVlc3RTY2hlbWEpOiBQcm9taXNlPFBheW1lbnQ+IHtcclxuICAgIGNvbnN0IHsgc291cmNlLCByZWNpcGllbnRzIH0gPSByZXF1ZXN0O1xyXG4gICAgY29uc3QgYXNzZXQgPSByZXF1ZXN0LmFzc2V0ID8gcmVxdWVzdC5hc3NldCA6IFwiXCI7XHJcblxyXG4gICAgY29uc3QgdXJsID0gYC9wYXltZW50cy8ke2Fzc2V0fWA7XHJcbiAgICBjb25zdCBib2R5ID0geyBzb3VyY2UsIHJlY2lwaWVudHMgfTtcclxuICAgIGNvbnN0IHNpZ25hdHVyZSA9IFJlcXVlc3RVdGlsLnNpZ24odGhpcy5vcHRpb25zLmNsaWVudFNlY3JldCwge1xyXG4gICAgICB1cmwsXHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KHVybCwgYm9keSwgeyBoZWFkZXJzOiB7IC4uLnNpZ25hdHVyZSB9IH0pO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQYXltZW50KHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGVyZm9ybXMgY2FzaG91dCBmcm9tIGNvbnN1bWVyIHdhbGxldCB0byB0aGUgYmFuayBhY2NvdW50IGlkZW50aWZpZWQgYnkgdGhlIGdpdmVuIGlkXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYmFua2luZ0lkIFRoZSBpZCBvZiB0aGUgYmFuayBhY2NvdW50IHRvIGJlIGNyZWRpdGVkXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHdpdGhkcmF3KHJlcXVlc3REYXRhOiBXaXRoZHJhd2FsUmVxdWVzdFNjaGVtYSk6IFByb21pc2U8QmFua1RyYW5zZmVyUGF5bWVudD4ge1xyXG4gICAgY29uc3QgeyBiYW5raW5nSWQsIGFtb3VudCwgZGVzY3JpcHRpb24gfSA9IHJlcXVlc3REYXRhO1xyXG5cclxuICAgIGNvbnN0IHBheWxvYWQgPSB7IGFtb3VudCwgZGVzY3JpcHRpb24gfTtcclxuICAgIGNvbnN0IHVybCA9IGAvcGF5bWVudHMvd2l0aGRyYXcvJHtiYW5raW5nSWR9YDtcclxuICAgIGNvbnN0IHNpZ25hdHVyZSA9IFJlcXVlc3RVdGlsLnNpZ24odGhpcy5vcHRpb25zLmNsaWVudFNlY3JldCwgeyBcclxuICAgICAgdXJsLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSwgXHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIgXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QodXJsLCBwYXlsb2FkLCB7IGhlYWRlcnM6IHsgLi4uc2lnbmF0dXJlIH0gfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEJhbmtUcmFuc2ZlclBheW1lbnQocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==