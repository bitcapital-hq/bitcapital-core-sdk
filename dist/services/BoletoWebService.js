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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZXRvV2ViU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9Cb2xldG9XZWJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxvQ0FBdUM7QUFDdkMsb0VBQTZGO0FBQzdGLHNDQU1tQjtBQUluQixzQkFBc0MsU0FBUSw2QkFBeUM7SUFHckYsWUFBWSxPQUFnQztRQUMxQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFnQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7OztPQUlHO0lBQ1UsY0FBYyxDQUFDLE9BQWU7O1lBQ3pDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXpFLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLCtCQUFzQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLEdBQUcsQ0FBQyxPQUFtQzs7WUFDbEQsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDO1lBQzFCLE1BQU0sU0FBUyxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO2dCQUM1RCxHQUFHO2dCQUNILE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQzthQUM5QixDQUFDLENBQUM7WUFFSCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLG9CQUFPLFNBQVMsQ0FBRSxFQUFFLENBQUMsQ0FBQztZQUVuRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSw4QkFBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLE9BQU8sQ0FBQyxFQUFVOztZQUM3QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV0RCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxlQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7S0FBQTtDQUNGO0FBcEVELG1DQW9FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3RVdGlsIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcbmltcG9ydCBCYXNlTW9kZWxXZWJTZXJ2aWNlLCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZS9CYXNlTW9kZWxXZWJTZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFxyXG4gIEJvbGV0bywgXHJcbiAgQm9sZXRvU2NoZW1hLCBcclxuICBCb2xldG9QYXltZW50UmVxdWVzdFNjaGVtYSxcclxuICBCb2xldG9QYXltZW50UmVzcG9uc2UsXHJcbiAgQm9sZXRvVmFsaWRhdGVSZXNwb25zZSBcclxufSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJvbGV0b1dlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvbGV0b1dlYlNlcnZpY2UgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlPEJvbGV0bywgQm9sZXRvU2NoZW1hPiB7XHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogQm9sZXRvV2ViU2VydmljZTtcclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogQm9sZXRvV2ViU2VydmljZU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBCb2xldG9XZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IEJvbGV0b1dlYlNlcnZpY2VPcHRpb25zKTogQm9sZXRvV2ViU2VydmljZSB7XHJcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IEJvbGV0b1dlYlNlcnZpY2Uob3B0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHJpZXZlcyBkYXRhIHJlcXVpcmVkIGZvciBib2xldG8gcGF5bWVudCB1c2luZyBpdHMgYmFyY29kZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIGJhcmNvZGUgVGhlIGJvbGV0byBiYXJjb2RlXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGdldFBheW1lbnRJbmZvKGJhcmNvZGU6IHN0cmluZyk6IFByb21pc2U8Qm9sZXRvVmFsaWRhdGVSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KFwiL2JvbGV0b1wiLCB7IHBhcmFtczogeyBiYXJjb2RlIH0gfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEJvbGV0b1ZhbGlkYXRlUmVzcG9uc2UocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXlzIGEgYm9sZXRvIGlkZW50aWZpZWQgYnkgaGlzIGJhcmNvZGUgdXNpbmcgdGhlIGFjY291bnRcclxuICAgKiBiYWxhbmNlIG9mIHRoZSB1c2VyIHdob3NlIGlkIHdhcyBzZW50IGluIHRoZSByZXF1ZXN0IGJvZHlcclxuICAgKlxyXG4gICAqIEBwYXJhbSBwYXltZW50IFRoZSBQYXltZW50IHNjaGVtYVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBwYXkocGF5bG9hZDogQm9sZXRvUGF5bWVudFJlcXVlc3RTY2hlbWEpOiBQcm9taXNlPEJvbGV0b1BheW1lbnRSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgdXJsID0gXCIvYm9sZXRvL3BheVwiO1xyXG4gICAgY29uc3Qgc2lnbmF0dXJlID0gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCB7XHJcbiAgICAgIHVybCxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QodXJsLCBwYXlsb2FkLCB7IGhlYWRlcnM6IHsgLi4uc2lnbmF0dXJlIH0gfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEJvbGV0b1BheW1lbnRSZXNwb25zZShyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmQgYSBCb2xldG8gYnkgaXRzIElEIFxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSBpZCB0aGUgYm9sZXRvIElEXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGZpbmRPbmUoaWQ6IHN0cmluZyk6IFByb21pc2U8Qm9sZXRvPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9ib2xldG8vJHtpZH1gKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgQm9sZXRvKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxufVxyXG4iXX0=