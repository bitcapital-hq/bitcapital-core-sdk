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
}
exports.PaymentWebService = PaymentWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5bWVudFdlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvUGF5bWVudFdlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQUF3RTtBQUN4RSxpQ0FBeUU7QUFLekUsdUJBQStCLFNBQVEsMEJBQTJDO0lBR2hGLFlBQVksT0FBaUM7UUFDM0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBaUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLE9BQU8sQ0FBQyxFQUFVOztZQUM3QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV4RCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSwyQkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsR0FBRyxDQUFDLE9BQXVCOztZQUN0QyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLE9BQU8sQ0FBQztZQUN2QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFakQsTUFBTSxHQUFHLEdBQUcsYUFBYSxLQUFLLEVBQUUsQ0FBQztZQUNqQyxNQUFNLElBQUksR0FBRyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQztZQUNwQyxNQUFNLFNBQVMsR0FBRywrQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDNUQsR0FBRztnQkFDSCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDM0IsQ0FBQyxDQUFDO1lBRUgsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxvQkFBTyxTQUFTLENBQUUsRUFBRSxDQUFDLENBQUM7WUFFaEYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksMkJBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQztLQUFBO0NBQ0Y7QUF4REQsOENBd0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGF5bWVudCwgUGF5bWVudFNjaGVtYSwgUmVxdWVzdFV0aWwgfSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcbmltcG9ydCB7IEJhc2VNb2RlbFdlYlNlcnZpY2UsIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZVwiO1xuaW1wb3J0IHsgUGF5bWVudFJlcXVlc3QgfSBmcm9tIFwiLi9yZXF1ZXN0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF5bWVudFdlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgeyB9XG5cbmV4cG9ydCBjbGFzcyBQYXltZW50V2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8UGF5bWVudCwgUGF5bWVudFNjaGVtYT4ge1xuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBQYXltZW50V2ViU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBQYXltZW50V2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUGF5bWVudFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IFBheW1lbnRXZWJTZXJ2aWNlT3B0aW9ucyk6IFBheW1lbnRXZWJTZXJ2aWNlIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFBheW1lbnRXZWJTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSBQYXltZW50LlxuICAgKlxuICAgKiBAcGFyYW0gaWQgVGhlIFBheW1lbnQgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZE9uZShpZDogc3RyaW5nKTogUHJvbWlzZTxQYXltZW50PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvcGF5bWVudHMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUGF5bWVudChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG5ldyBQYXltZW50IHRvIHRoZSBuZXR3b3JrLCBmcm9tIGEgc2luZ2xlIHNvdXJjZSB3YWxsZXQgc3BsaXR0aW5nIGludG8gbXVsdGlwbGUgcGF5bWVudCByZWNpcGllbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gcGF5bWVudCBUaGUgUGF5bWVudCBzY2hlbWFcbiAgICovXG4gIHB1YmxpYyBhc3luYyBwYXkocmVxdWVzdDogUGF5bWVudFJlcXVlc3QpOiBQcm9taXNlPFBheW1lbnQ+IHtcbiAgICBjb25zdCB7IHNvdXJjZSwgcmVjaXBpZW50cyB9ID0gcmVxdWVzdDtcbiAgICBjb25zdCBhc3NldCA9IHJlcXVlc3QuYXNzZXQgPyByZXF1ZXN0LmFzc2V0IDogXCJcIjtcblxuICAgIGNvbnN0IHVybCA9IGAvcGF5bWVudHMvJHthc3NldH1gO1xuICAgIGNvbnN0IGJvZHkgPSB7IHNvdXJjZSwgcmVjaXBpZW50cyB9O1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IFJlcXVlc3RVdGlsLnNpZ24odGhpcy5vcHRpb25zLmNsaWVudFNlY3JldCwge1xuICAgICAgdXJsLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KHVybCwgYm9keSwgeyBoZWFkZXJzOiB7IC4uLnNpZ25hdHVyZSB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQYXltZW50KHJlc3BvbnNlLmRhdGEpO1xuICB9XG59XG4iXX0=