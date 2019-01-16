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
const BaseModelWebService_1 = require("./base/BaseModelWebService");
const models_1 = require("../models");
class BoletoWebService extends BaseModelWebService_1.default {
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
            return new models_1.BoletoValidateResponse(response.data);
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
            const signature = utils_1.RequestUtil.sign(this.options.clientSecret, {
                url,
                method: "POST",
                body: JSON.stringify(payload)
            });
            const response = yield this.http.post(url, payload, { headers: Object.assign({}, signature) });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.BoletoPaymentResponse(response.data);
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
            return new models_1.Boleto(response.data);
        });
    }
}
exports.default = BoletoWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZXRvV2ViU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9Cb2xldG9XZWJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxvQ0FBdUM7QUFDdkMsb0VBQTZGO0FBQzdGLHNDQU1tQjtBQUluQixzQkFBc0MsU0FBUSw2QkFBeUM7SUFHckYsWUFBWSxPQUFnQztRQUMxQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFnQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7OztPQUlHO0lBQ1UsY0FBYyxDQUFDLE9BQWU7O1lBQ3pDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXpFLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLCtCQUFzQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLEdBQUcsQ0FBQyxPQUFtQzs7WUFDbEQsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDO1lBQzFCLE1BQU0sU0FBUyxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO2dCQUM1RCxHQUFHO2dCQUNILE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQzthQUM5QixDQUFDLENBQUM7WUFFSCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLG9CQUFPLFNBQVMsQ0FBRSxFQUFFLENBQUMsQ0FBQztZQUVuRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSw4QkFBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLE9BQU8sQ0FBQyxFQUFVOztZQUM3QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV0RCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxlQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7S0FBQTtDQUNGO0FBcEVELG1DQW9FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RVdGlsIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCBCYXNlTW9kZWxXZWJTZXJ2aWNlLCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XHJcbmltcG9ydCB7XHJcbiAgQm9sZXRvLFxyXG4gIEJvbGV0b1NjaGVtYSxcclxuICBCb2xldG9QYXltZW50UmVxdWVzdFNjaGVtYSxcclxuICBCb2xldG9QYXltZW50UmVzcG9uc2UsXHJcbiAgQm9sZXRvVmFsaWRhdGVSZXNwb25zZVxyXG59IGZyb20gXCIuLi9tb2RlbHNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQm9sZXRvV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9sZXRvV2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8Qm9sZXRvLCBCb2xldG9TY2hlbWE+IHtcclxuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBCb2xldG9XZWJTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBCb2xldG9XZWJTZXJ2aWNlT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEJvbGV0b1dlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogQm9sZXRvV2ViU2VydmljZU9wdGlvbnMpOiBCb2xldG9XZWJTZXJ2aWNlIHtcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgQm9sZXRvV2ViU2VydmljZShvcHRpb25zKTtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0cmlldmVzIGRhdGEgcmVxdWlyZWQgZm9yIGJvbGV0byBwYXltZW50IHVzaW5nIGl0cyBiYXJjb2RlXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYmFyY29kZSBUaGUgYm9sZXRvIGJhcmNvZGVcclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZ2V0UGF5bWVudEluZm8oYmFyY29kZTogc3RyaW5nKTogUHJvbWlzZTxCb2xldG9WYWxpZGF0ZVJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoXCIvYm9sZXRvXCIsIHsgcGFyYW1zOiB7IGJhcmNvZGUgfSB9KTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgQm9sZXRvVmFsaWRhdGVSZXNwb25zZShyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBheXMgYSBib2xldG8gaWRlbnRpZmllZCBieSBoaXMgYmFyY29kZSB1c2luZyB0aGUgYWNjb3VudFxyXG4gICAqIGJhbGFuY2Ugb2YgdGhlIHVzZXIgd2hvc2UgaWQgd2FzIHNlbnQgaW4gdGhlIHJlcXVlc3QgYm9keVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHBheW1lbnQgVGhlIFBheW1lbnQgc2NoZW1hXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHBheShwYXlsb2FkOiBCb2xldG9QYXltZW50UmVxdWVzdFNjaGVtYSk6IFByb21pc2U8Qm9sZXRvUGF5bWVudFJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCB1cmwgPSBcIi9ib2xldG8vcGF5XCI7XHJcbiAgICBjb25zdCBzaWduYXR1cmUgPSBSZXF1ZXN0VXRpbC5zaWduKHRoaXMub3B0aW9ucy5jbGllbnRTZWNyZXQsIHtcclxuICAgICAgdXJsLFxyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdCh1cmwsIHBheWxvYWQsIHsgaGVhZGVyczogeyAuLi5zaWduYXR1cmUgfSB9KTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgQm9sZXRvUGF5bWVudFJlc3BvbnNlKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluZCBhIEJvbGV0byBieSBpdHMgSURcclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZCB0aGUgYm9sZXRvIElEXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGZpbmRPbmUoaWQ6IHN0cmluZyk6IFByb21pc2U8Qm9sZXRvPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9ib2xldG8vJHtpZH1gKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgQm9sZXRvKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxufVxyXG4iXX0=