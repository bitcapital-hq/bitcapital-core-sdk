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
            const response = yield this.http.get("/boletos", { params: { barcode } });
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
            const url = "/boletos/pay";
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
     * Emits a boleto to enable a deposit into a specified account.
     *
     * @param payload The payload schema
     */
    emit(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "/boletos/emit";
            const signature = bitcapital_common_1.RequestUtil.sign(this.options.clientSecret, {
                url,
                method: "POST",
                body: JSON.stringify(payload)
            });
            const response = yield this.http.post(url, payload, { headers: Object.assign({}, signature) });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.BoletoEmissionResponse(response.data);
        });
    }
    /**
     * Find a Boleto by its ID
     *
     * @param id the boleto ID
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/boletos/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Boleto(response.data);
        });
    }
}
exports.BoletoWebService = BoletoWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZXRvV2ViU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9Cb2xldG9XZWJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5REFTMkI7QUFFM0Isb0VBQTZGO0FBSTdGLE1BQWEsZ0JBQWlCLFNBQVEseUNBQXlDO0lBRzdFLFlBQVksT0FBZ0M7UUFDMUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBZ0M7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLGNBQWMsQ0FBQyxPQUFlOztZQUN6QyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUxRSxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSwwQ0FBc0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxHQUFHLENBQUMsT0FBbUM7O1lBQ2xELE1BQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQztZQUMzQixNQUFNLFNBQVMsR0FBRywrQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDNUQsR0FBRztnQkFDSCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7YUFDOUIsQ0FBQyxDQUFDO1lBRUgsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxvQkFBTyxTQUFTLENBQUUsRUFBRSxDQUFDLENBQUM7WUFFbkYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUkseUNBQXFCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxJQUFJLENBQUMsT0FBb0M7O1lBQ3BELE1BQU0sR0FBRyxHQUFHLGVBQWUsQ0FBQztZQUM1QixNQUFNLFNBQVMsR0FBRywrQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDNUQsR0FBRztnQkFDSCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7YUFDOUIsQ0FBQyxDQUFDO1lBRUgsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxvQkFBTyxTQUFTLENBQUUsRUFBRSxDQUFDLENBQUM7WUFFbkYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksMENBQXNCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxPQUFPLENBQUMsRUFBVTs7WUFDN0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFdkQsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksMEJBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQztLQUFBO0NBQ0Y7QUExRkQsNENBMEZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQm9sZXRvLFxuICBCb2xldG9TY2hlbWEsXG4gIEJvbGV0b0VtaXNzaW9uUmVxdWVzdFNjaGVtYSxcbiAgQm9sZXRvRW1pc3Npb25SZXNwb25zZSxcbiAgQm9sZXRvUGF5bWVudFJlcXVlc3RTY2hlbWEsXG4gIEJvbGV0b1BheW1lbnRSZXNwb25zZSxcbiAgQm9sZXRvVmFsaWRhdGVSZXNwb25zZSxcbiAgUmVxdWVzdFV0aWxcbn0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XG5cbmltcG9ydCB7IEJhc2VNb2RlbFdlYlNlcnZpY2UsIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQm9sZXRvV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxuXG5leHBvcnQgY2xhc3MgQm9sZXRvV2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8Qm9sZXRvLCBCb2xldG9TY2hlbWE+IHtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogQm9sZXRvV2ViU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBCb2xldG9XZWJTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBCb2xldG9XZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBCb2xldG9XZWJTZXJ2aWNlT3B0aW9ucyk6IEJvbGV0b1dlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgQm9sZXRvV2ViU2VydmljZShvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgZGF0YSByZXF1aXJlZCBmb3IgYm9sZXRvIHBheW1lbnQgdXNpbmcgaXRzIGJhcmNvZGVcbiAgICpcbiAgICogQHBhcmFtIGJhcmNvZGUgVGhlIGJvbGV0byBiYXJjb2RlXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZ2V0UGF5bWVudEluZm8oYmFyY29kZTogc3RyaW5nKTogUHJvbWlzZTxCb2xldG9WYWxpZGF0ZVJlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KFwiL2JvbGV0b3NcIiwgeyBwYXJhbXM6IHsgYmFyY29kZSB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBCb2xldG9WYWxpZGF0ZVJlc3BvbnNlKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBheXMgYSBib2xldG8gaWRlbnRpZmllZCBieSBoaXMgYmFyY29kZSB1c2luZyB0aGUgYWNjb3VudFxuICAgKiBiYWxhbmNlIG9mIHRoZSB1c2VyIHdob3NlIGlkIHdhcyBzZW50IGluIHRoZSByZXF1ZXN0IGJvZHlcbiAgICpcbiAgICogQHBhcmFtIHBheW1lbnQgVGhlIFBheW1lbnQgc2NoZW1hXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcGF5KHBheWxvYWQ6IEJvbGV0b1BheW1lbnRSZXF1ZXN0U2NoZW1hKTogUHJvbWlzZTxCb2xldG9QYXltZW50UmVzcG9uc2U+IHtcbiAgICBjb25zdCB1cmwgPSBcIi9ib2xldG9zL3BheVwiO1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IFJlcXVlc3RVdGlsLnNpZ24odGhpcy5vcHRpb25zLmNsaWVudFNlY3JldCwge1xuICAgICAgdXJsLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KHVybCwgcGF5bG9hZCwgeyBoZWFkZXJzOiB7IC4uLnNpZ25hdHVyZSB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBCb2xldG9QYXltZW50UmVzcG9uc2UocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgYSBib2xldG8gdG8gZW5hYmxlIGEgZGVwb3NpdCBpbnRvIGEgc3BlY2lmaWVkIGFjY291bnQuXG4gICAqXG4gICAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkIHNjaGVtYVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGVtaXQocGF5bG9hZDogQm9sZXRvRW1pc3Npb25SZXF1ZXN0U2NoZW1hKTogUHJvbWlzZTxCb2xldG9FbWlzc2lvblJlc3BvbnNlPiB7XG4gICAgY29uc3QgdXJsID0gXCIvYm9sZXRvcy9lbWl0XCI7XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCB7XG4gICAgICB1cmwsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QodXJsLCBwYXlsb2FkLCB7IGhlYWRlcnM6IHsgLi4uc2lnbmF0dXJlIH0gfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEJvbGV0b0VtaXNzaW9uUmVzcG9uc2UocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhIEJvbGV0byBieSBpdHMgSURcbiAgICpcbiAgICogQHBhcmFtIGlkIHRoZSBib2xldG8gSURcbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpOiBQcm9taXNlPEJvbGV0bz4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2JvbGV0b3MvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQm9sZXRvKHJlc3BvbnNlLmRhdGEpO1xuICB9XG59XG4iXX0=