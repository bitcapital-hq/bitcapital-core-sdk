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
const _1 = require(".");
const __1 = require("..");
const bitcapital_common_1 = require("bitcapital-common");
class PhoneCreditWebService extends _1.BaseModelWebService {
    constructor(options) {
        super(options);
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new PhoneCreditWebService(options);
        return this.instance;
    }
    findOne(id, resourceId) {
        id.toLowerCase;
        resourceId.toLowerCase;
        throw new Error("Method not implemented.");
    }
    getPhoneCreditProviders() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/phone-credits/providers`;
            const signature = __1.RequestUtil.sign(this.options.clientSecret, {
                url,
                method: "GET"
            });
            const response = yield this.http.get(url, {}, { headers: Object.assign({}, signature) });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.PhoneCreditDealers(response.data);
        });
    }
    getPhoneCreditOrderHistoryForWallet(walletId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/phone-credits/order/history/${walletId}`;
            const signature = __1.RequestUtil.sign(this.options.clientSecret, {
                url,
                method: "GET"
            });
            const response = yield this.http.get(url, {}, { headers: Object.assign({}, signature) });
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data;
        });
    }
    createOrder(phoneCode, phoneNumber, providerCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { phoneCode, phoneNumber, providerCode };
            const url = `/phone-credits/order/create`;
            const signature = __1.RequestUtil.sign(this.options.clientSecret, {
                url,
                body: JSON.stringify(payload),
                method: "POST"
            });
            const response = yield this.http.post(url, payload, { headers: Object.assign({}, signature) });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.PhoneCredit(response.data);
        });
    }
    completeOrder(amount, sourceWalletId, phoneCreditOrderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { amount, source: sourceWalletId };
            const url = `/phone-credits/order/${phoneCreditOrderId}/complete`;
            const signature = __1.RequestUtil.sign(this.options.clientSecret, {
                url,
                body: JSON.stringify(payload),
                method: "POST"
            });
            const response = yield this.http.post(url, payload, { headers: Object.assign({}, signature) });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.PhoneCredit(response.data);
        });
    }
}
exports.PhoneCreditWebService = PhoneCreditWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGhvbmVDcmVkaXRXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL1Bob25lQ3JlZGl0V2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsd0JBQW9FO0FBQ3BFLDBCQUFpQztBQUNqQyx5REFBdUY7QUFJdkYsTUFBYSxxQkFBc0IsU0FBUSxzQkFBbUQ7SUFHNUYsWUFBWSxPQUFxQztRQUMvQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFxQztRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUkscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxPQUFPLENBQUMsRUFBVSxFQUFFLFVBQW1CO1FBQzVDLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDZixVQUFVLENBQUMsV0FBVyxDQUFDO1FBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRVksdUJBQXVCOztZQUNsQyxNQUFNLEdBQUcsR0FBRywwQkFBMEIsQ0FBQztZQUN2QyxNQUFNLFNBQVMsR0FBRyxlQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO2dCQUM1RCxHQUFHO2dCQUNILE1BQU0sRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxvQkFBTyxTQUFTLENBQUUsRUFBRSxDQUFDLENBQUM7WUFFN0UsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksc0NBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7S0FBQTtJQUVZLG1DQUFtQyxDQUFDLFFBQWdCOztZQUMvRCxNQUFNLEdBQUcsR0FBRyxnQ0FBZ0MsUUFBUSxFQUFFLENBQUM7WUFDdkQsTUFBTSxTQUFTLEdBQUcsZUFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDNUQsR0FBRztnQkFDSCxNQUFNLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sb0JBQU8sU0FBUyxDQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRTdFLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7S0FBQTtJQUVZLFdBQVcsQ0FBQyxTQUFpQixFQUFFLFdBQW1CLEVBQUUsWUFBb0I7O1lBQ25GLE1BQU0sT0FBTyxHQUFHLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsQ0FBQztZQUV6RCxNQUFNLEdBQUcsR0FBRyw2QkFBNkIsQ0FBQztZQUMxQyxNQUFNLFNBQVMsR0FBRyxlQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO2dCQUM1RCxHQUFHO2dCQUNILElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQkFDN0IsTUFBTSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUM7WUFDSCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLG9CQUFPLFNBQVMsQ0FBRSxFQUFFLENBQUMsQ0FBQztZQUVuRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSwrQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7SUFFWSxhQUFhLENBQUMsTUFBYyxFQUFFLGNBQXNCLEVBQUUsa0JBQTBCOztZQUMzRixNQUFNLE9BQU8sR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLENBQUM7WUFFbkQsTUFBTSxHQUFHLEdBQUcsd0JBQXdCLGtCQUFrQixXQUFXLENBQUM7WUFDbEUsTUFBTSxTQUFTLEdBQUcsZUFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDNUQsR0FBRztnQkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQzdCLE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxvQkFBTyxTQUFTLENBQUUsRUFBRSxDQUFDLENBQUM7WUFFbkYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksK0JBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0NBQ0Y7QUF2RkQsc0RBdUZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMsIEJhc2VNb2RlbFdlYlNlcnZpY2UgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgUmVxdWVzdFV0aWwgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IFBob25lQ3JlZGl0LCBQaG9uZUNyZWRpdFNjaGVtYSwgUGhvbmVDcmVkaXREZWFsZXJzIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGhvbmVDcmVkaXRXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIHt9XG5cbmV4cG9ydCBjbGFzcyBQaG9uZUNyZWRpdFdlYlNlcnZpY2UgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlPFBob25lQ3JlZGl0LCBQaG9uZUNyZWRpdFNjaGVtYT4ge1xuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBQaG9uZUNyZWRpdFdlYlNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogUGhvbmVDcmVkaXRXZWJTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBQaG9uZUNyZWRpdFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IFBob25lQ3JlZGl0V2ViU2VydmljZU9wdGlvbnMpOiBQaG9uZUNyZWRpdFdlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUGhvbmVDcmVkaXRXZWJTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIGZpbmRPbmUoaWQ6IHN0cmluZywgcmVzb3VyY2VJZD86IHN0cmluZyk6IFByb21pc2U8UGhvbmVDcmVkaXQ+IHtcbiAgICBpZC50b0xvd2VyQ2FzZTtcbiAgICByZXNvdXJjZUlkLnRvTG93ZXJDYXNlO1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFBob25lQ3JlZGl0UHJvdmlkZXJzKCk6IFByb21pc2U8UGhvbmVDcmVkaXREZWFsZXJzPiB7XG4gICAgY29uc3QgdXJsID0gYC9waG9uZS1jcmVkaXRzL3Byb3ZpZGVyc2A7XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCB7XG4gICAgICB1cmwsXG4gICAgICBtZXRob2Q6IFwiR0VUXCJcbiAgICB9KTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQodXJsLCB7fSwgeyBoZWFkZXJzOiB7IC4uLnNpZ25hdHVyZSB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQaG9uZUNyZWRpdERlYWxlcnMocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0UGhvbmVDcmVkaXRPcmRlckhpc3RvcnlGb3JXYWxsZXQod2FsbGV0SWQ6IFN0cmluZyk6IFByb21pc2U8UGhvbmVDcmVkaXRbXT4ge1xuICAgIGNvbnN0IHVybCA9IGAvcGhvbmUtY3JlZGl0cy9vcmRlci9oaXN0b3J5LyR7d2FsbGV0SWR9YDtcbiAgICBjb25zdCBzaWduYXR1cmUgPSBSZXF1ZXN0VXRpbC5zaWduKHRoaXMub3B0aW9ucy5jbGllbnRTZWNyZXQsIHtcbiAgICAgIHVybCxcbiAgICAgIG1ldGhvZDogXCJHRVRcIlxuICAgIH0pO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldCh1cmwsIHt9LCB7IGhlYWRlcnM6IHsgLi4uc2lnbmF0dXJlIH0gfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjcmVhdGVPcmRlcihwaG9uZUNvZGU6IHN0cmluZywgcGhvbmVOdW1iZXI6IHN0cmluZywgcHJvdmlkZXJDb2RlOiBzdHJpbmcpOiBQcm9taXNlPFBob25lQ3JlZGl0PiB7XG4gICAgY29uc3QgcGF5bG9hZCA9IHsgcGhvbmVDb2RlLCBwaG9uZU51bWJlciwgcHJvdmlkZXJDb2RlIH07XG5cbiAgICBjb25zdCB1cmwgPSBgL3Bob25lLWNyZWRpdHMvb3JkZXIvY3JlYXRlYDtcbiAgICBjb25zdCBzaWduYXR1cmUgPSBSZXF1ZXN0VXRpbC5zaWduKHRoaXMub3B0aW9ucy5jbGllbnRTZWNyZXQsIHtcbiAgICAgIHVybCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIlxuICAgIH0pO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QodXJsLCBwYXlsb2FkLCB7IGhlYWRlcnM6IHsgLi4uc2lnbmF0dXJlIH0gfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBob25lQ3JlZGl0KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvbXBsZXRlT3JkZXIoYW1vdW50OiBTdHJpbmcsIHNvdXJjZVdhbGxldElkOiBTdHJpbmcsIHBob25lQ3JlZGl0T3JkZXJJZDogc3RyaW5nKTogUHJvbWlzZTxQaG9uZUNyZWRpdD4ge1xuICAgIGNvbnN0IHBheWxvYWQgPSB7IGFtb3VudCwgc291cmNlOiBzb3VyY2VXYWxsZXRJZCB9O1xuXG4gICAgY29uc3QgdXJsID0gYC9waG9uZS1jcmVkaXRzL29yZGVyLyR7cGhvbmVDcmVkaXRPcmRlcklkfS9jb21wbGV0ZWA7XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCB7XG4gICAgICB1cmwsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCJcbiAgICB9KTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KHVybCwgcGF5bG9hZCwgeyBoZWFkZXJzOiB7IC4uLnNpZ25hdHVyZSB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQaG9uZUNyZWRpdChyZXNwb25zZS5kYXRhKTtcbiAgfVxufVxuIl19