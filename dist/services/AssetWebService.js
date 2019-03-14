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
const base_1 = require("./base");
const bitcapital_common_1 = require("bitcapital-common");
class AssetWebService extends base_1.BaseModelWebService {
    constructor(options) {
        super(options);
        this.options = options;
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new AssetWebService(options);
        return this.instance;
    }
    /**
     * Find all Assets in the platform.
     */
    findAll(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get("/assets", null, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new bitcapital_common_1.Asset(item));
            return bitcapital_common_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find an Asset based on its ID.
     *
     * @param id The Asset ID.
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/assets/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Asset(response.data);
        });
    }
    /**
     * Emits an Asset to a specific wallet. If none supplied, will be emited to the mediator wallet.
     */
    emit(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, amount, destination, additionalData } = request;
            const body = { amount, destination, additionalData };
            const signature = bitcapital_common_1.RequestUtil.sign(this.options.clientSecret, {
                method: "POST",
                url: `/assets/${id}/emit`,
                body: JSON.stringify(body)
            });
            const response = yield this.http.post(`/assets/${id}/emit`, body, {
                headers: Object.assign({}, signature)
            });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Transaction(response.data);
        });
    }
    /**
     * Destroys an amount of Assets from a specific wallet. If none supplied, will be destroyed from the mediator wallet.
     */
    destroy(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, amount, source, additionalData } = request;
            const body = { amount, source, additionalData };
            const signature = bitcapital_common_1.RequestUtil.sign(this.options.clientSecret, {
                method: "POST",
                url: `/assets/${id}/destroy`,
                body: JSON.stringify(body)
            });
            const response = yield this.http.post(`/assets/${id}/destroy`, body, {
                headers: Object.assign({}, signature)
            });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Transaction(response.data);
        });
    }
    /**
     * Create a new Asset in the platform.
     *
     * @param asset The Asset schema.
     */
    create(asset) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post("/assets", asset);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Asset(response.data);
        });
    }
}
exports.AssetWebService = AssetWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNzZXRXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL0Fzc2V0V2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQXlFO0FBQ3pFLHlEQVEyQjtBQUszQixNQUFhLGVBQWdCLFNBQVEsMEJBQXVDO0lBRzFFLFlBQStCLE9BQStCO1FBQzVELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURjLFlBQU8sR0FBUCxPQUFPLENBQXdCO0lBRTlELENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ1UsT0FBTyxDQUFDLFVBQXNCOztZQUN6QyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRW5GLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsK0RBQStEO1lBQy9ELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSx5QkFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFD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QUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLHlCQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FBQTtDQUNGO0FBM0dELDBDQTJHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zLCBCYXNlTW9kZWxXZWJTZXJ2aWNlIH0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQge1xyXG4gIEFzc2V0LFxyXG4gIEFzc2V0U2NoZW1hLFxyXG4gIFBhZ2luYXRpb24sXHJcbiAgUGFnaW5hdGVkQXJyYXksXHJcbiAgUGFnaW5hdGlvblV0aWwsXHJcbiAgUmVxdWVzdFV0aWwsXHJcbiAgVHJhbnNhY3Rpb25cclxufSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcclxuaW1wb3J0IHsgQXNzZXRFbWl0UmVxdWVzdFNjaGVtYSwgQXNzZXREZXN0cm95UmVxdWVzdFNjaGVtYSB9IGZyb20gXCIuL3JlcXVlc3RcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXNzZXRXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIHt9XHJcblxyXG5leHBvcnQgY2xhc3MgQXNzZXRXZWJTZXJ2aWNlIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZTxBc3NldCwgQXNzZXRTY2hlbWE+IHtcclxuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBBc3NldFdlYlNlcnZpY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBBc3NldFdlYlNlcnZpY2VPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogQXNzZXRXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IEFzc2V0V2ViU2VydmljZU9wdGlvbnMpOiBBc3NldFdlYlNlcnZpY2Uge1xyXG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBBc3NldFdlYlNlcnZpY2Uob3B0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmQgYWxsIEFzc2V0cyBpbiB0aGUgcGxhdGZvcm0uXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGZpbmRBbGwocGFnaW5hdGlvbjogUGFnaW5hdGlvbik6IFByb21pc2U8UGFnaW5hdGVkQXJyYXk8QXNzZXQ+PiB7XHJcbiAgICBjb25zdCB7IHNraXAsIGxpbWl0IH0gPSBwYWdpbmF0aW9uO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KFwiL2Fzc2V0c1wiLCBudWxsLCB7IHBhcmFtczogeyBza2lwLCBsaW1pdCB9IH0pO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJuIGEgcGFnaW5hdGVkIGFycmF5IHdpdGggY291bnQgaW5mb3JtYXRpb24gZnJvbSBoZWFkZXJzXHJcbiAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5kYXRhLm1hcCgoaXRlbTogQXNzZXRTY2hlbWEpID0+IG5ldyBBc3NldChpdGVtKSk7XHJcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmQgYW4gQXNzZXQgYmFzZWQgb24gaXRzIElELlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGlkIFRoZSBBc3NldCBJRC5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZmluZE9uZShpZDogc3RyaW5nKTogUHJvbWlzZTxBc3NldD4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvYXNzZXRzLyR7aWR9YCk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEFzc2V0KHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdHMgYW4gQXNzZXQgdG8gYSBzcGVjaWZpYyB3YWxsZXQuIElmIG5vbmUgc3VwcGxpZWQsIHdpbGwgYmUgZW1pdGVkIHRvIHRoZSBtZWRpYXRvciB3YWxsZXQuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGVtaXQocmVxdWVzdDogQXNzZXRFbWl0UmVxdWVzdFNjaGVtYSk6IFByb21pc2U8VHJhbnNhY3Rpb24+IHtcclxuICAgIGNvbnN0IHsgaWQsIGFtb3VudCwgZGVzdGluYXRpb24sIGFkZGl0aW9uYWxEYXRhIH0gPSByZXF1ZXN0O1xyXG4gICAgY29uc3QgYm9keSA9IHsgYW1vdW50LCBkZXN0aW5hdGlvbiwgYWRkaXRpb25hbERhdGEgfTtcclxuICAgIGNvbnN0IHNpZ25hdHVyZSA9IFJlcXVlc3RVdGlsLnNpZ24odGhpcy5vcHRpb25zLmNsaWVudFNlY3JldCwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICB1cmw6IGAvYXNzZXRzLyR7aWR9L2VtaXRgLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2Fzc2V0cy8ke2lkfS9lbWl0YCwgYm9keSwge1xyXG4gICAgICBoZWFkZXJzOiB7IC4uLnNpZ25hdHVyZSB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb24ocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95cyBhbiBhbW91bnQgb2YgQXNzZXRzIGZyb20gYSBzcGVjaWZpYyB3YWxsZXQuIElmIG5vbmUgc3VwcGxpZWQsIHdpbGwgYmUgZGVzdHJveWVkIGZyb20gdGhlIG1lZGlhdG9yIHdhbGxldC5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZGVzdHJveShyZXF1ZXN0OiBBc3NldERlc3Ryb3lSZXF1ZXN0U2NoZW1hKTogUHJvbWlzZTxUcmFuc2FjdGlvbj4ge1xyXG4gICAgY29uc3QgeyBpZCwgYW1vdW50LCBzb3VyY2UsIGFkZGl0aW9uYWxEYXRhIH0gPSByZXF1ZXN0O1xyXG4gICAgY29uc3QgYm9keSA9IHsgYW1vdW50LCBzb3VyY2UsIGFkZGl0aW9uYWxEYXRhIH07XHJcbiAgICBjb25zdCBzaWduYXR1cmUgPSBSZXF1ZXN0VXRpbC5zaWduKHRoaXMub3B0aW9ucy5jbGllbnRTZWNyZXQsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgdXJsOiBgL2Fzc2V0cy8ke2lkfS9kZXN0cm95YCxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9hc3NldHMvJHtpZH0vZGVzdHJveWAsIGJvZHksIHtcclxuICAgICAgaGVhZGVyczogeyAuLi5zaWduYXR1cmUgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IEFzc2V0IGluIHRoZSBwbGF0Zm9ybS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBhc3NldCBUaGUgQXNzZXQgc2NoZW1hLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBjcmVhdGUoYXNzZXQ6IEFzc2V0U2NoZW1hKTogUHJvbWlzZTxBc3NldD4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcIi9hc3NldHNcIiwgYXNzZXQpO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBBc3NldChyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcbn1cclxuIl19