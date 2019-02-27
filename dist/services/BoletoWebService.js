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
const BaseModelWebService_1 = require("./base/BaseModelWebService");
class BoletoWebService extends BaseModelWebService_1.BaseModelWebService {
    constructor(options) {
        super(options);
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new BoletoWebService(options);
        return this.instance;
    }
    /**
     * Retrieves data required for boleto payment using its barcode
     *
     * @param barcode The boleto barcode
     */
    getPaymentInfo(barcode) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get("/boleto", { params: { barcode } });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.BoletoValidateResponse(response.data);
        });
    }
    /**
     * Pays a boleto identified by his barcode using the account
     * balance of the user whose id was sent in the request body
     *
     * @param payment The Payment schema
     */
    pay(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "/boleto/pay";
            const signature = bitcapital_common_1.RequestUtil.sign(this.options.clientSecret, {
                url,
                method: "POST",
                body: JSON.stringify(payload)
            });
            const response = yield this.http.post(url, payload, { headers: Object.assign({}, signature) });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.BoletoPaymentResponse(response.data);
        });
    }
    /**
     * Find a Boleto by its ID
     *
     * @param id the boleto ID
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/boleto/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Boleto(response.data);
        });
    }
}
exports.BoletoWebService = BoletoWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZXRvV2ViU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9Cb2xldG9XZWJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5REFPMkI7QUFFM0Isb0VBQTZGO0FBSTdGLE1BQWEsZ0JBQWlCLFNBQVEseUNBQXlDO0lBRzdFLFlBQVksT0FBZ0M7UUFDMUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBZ0M7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLGNBQWMsQ0FBQyxPQUFlOztZQUN6QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV6RSxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSwwQ0FBc0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxHQUFHLENBQUMsT0FBbUM7O1lBQ2xELE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQztZQUMxQixNQUFNLFNBQVMsR0FBRywrQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDNUQsR0FBRztnQkFDSCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7YUFDOUIsQ0FBQyxDQUFDO1lBRUgsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxvQkFBTyxTQUFTLENBQUUsRUFBRSxDQUFDLENBQUM7WUFFbkYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUkseUNBQXFCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxPQUFPLENBQUMsRUFBVTs7WUFDN0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFdEQsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksMEJBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQztLQUFBO0NBQ0Y7QUFwRUQsNENBb0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQm9sZXRvLFxuICBCb2xldG9TY2hlbWEsXG4gIEJvbGV0b1BheW1lbnRSZXF1ZXN0U2NoZW1hLFxuICBCb2xldG9QYXltZW50UmVzcG9uc2UsXG4gIEJvbGV0b1ZhbGlkYXRlUmVzcG9uc2UsXG4gIFJlcXVlc3RVdGlsXG59IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xuXG5pbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlLCBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2UvQmFzZU1vZGVsV2ViU2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJvbGV0b1dlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cblxuZXhwb3J0IGNsYXNzIEJvbGV0b1dlYlNlcnZpY2UgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlPEJvbGV0bywgQm9sZXRvU2NoZW1hPiB7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IEJvbGV0b1dlYlNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogQm9sZXRvV2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogQm9sZXRvV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogQm9sZXRvV2ViU2VydmljZU9wdGlvbnMpOiBCb2xldG9XZWJTZXJ2aWNlIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IEJvbGV0b1dlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGRhdGEgcmVxdWlyZWQgZm9yIGJvbGV0byBwYXltZW50IHVzaW5nIGl0cyBiYXJjb2RlXG4gICAqXG4gICAqIEBwYXJhbSBiYXJjb2RlIFRoZSBib2xldG8gYmFyY29kZVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGdldFBheW1lbnRJbmZvKGJhcmNvZGU6IHN0cmluZyk6IFByb21pc2U8Qm9sZXRvVmFsaWRhdGVSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChcIi9ib2xldG9cIiwgeyBwYXJhbXM6IHsgYmFyY29kZSB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBCb2xldG9WYWxpZGF0ZVJlc3BvbnNlKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBheXMgYSBib2xldG8gaWRlbnRpZmllZCBieSBoaXMgYmFyY29kZSB1c2luZyB0aGUgYWNjb3VudFxuICAgKiBiYWxhbmNlIG9mIHRoZSB1c2VyIHdob3NlIGlkIHdhcyBzZW50IGluIHRoZSByZXF1ZXN0IGJvZHlcbiAgICpcbiAgICogQHBhcmFtIHBheW1lbnQgVGhlIFBheW1lbnQgc2NoZW1hXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcGF5KHBheWxvYWQ6IEJvbGV0b1BheW1lbnRSZXF1ZXN0U2NoZW1hKTogUHJvbWlzZTxCb2xldG9QYXltZW50UmVzcG9uc2U+IHtcbiAgICBjb25zdCB1cmwgPSBcIi9ib2xldG8vcGF5XCI7XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCB7XG4gICAgICB1cmwsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QodXJsLCBwYXlsb2FkLCB7IGhlYWRlcnM6IHsgLi4uc2lnbmF0dXJlIH0gfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEJvbGV0b1BheW1lbnRSZXNwb25zZShyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgQm9sZXRvIGJ5IGl0cyBJRFxuICAgKlxuICAgKiBAcGFyYW0gaWQgdGhlIGJvbGV0byBJRFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRPbmUoaWQ6IHN0cmluZyk6IFByb21pc2U8Qm9sZXRvPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvYm9sZXRvLyR7aWR9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEJvbGV0byhyZXNwb25zZS5kYXRhKTtcbiAgfVxufVxuIl19