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
            const { id, amount, destination } = request;
            const body = { amount, destination };
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
            return new bitcapital_common_1.Payment(response.data);
        });
    }
    /**
     * Destroys an amount of Assets from a specific wallet. If none supplied, will be destroyed from the mediator wallet.
     */
    destroy(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, amount, source } = request;
            const body = { amount, source };
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
            return new bitcapital_common_1.Payment(response.data);
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
    /**
     * Partially update an existing Asset.
     *
     * @param id The Asset ID.
     * @param asset The partial Asset schema.
     */
    update(id, asset) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/assets/${id}`, asset);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Asset(response.data);
        });
    }
    /**
     * Delete an Asset from the platform.
     *
     * @param id The Asset ID.
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.delete(`/assets/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
}
exports.AssetWebService = AssetWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNzZXRXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL0Fzc2V0V2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EseURBUTJCO0FBQzNCLGlDQUF5RTtBQUl6RSxNQUFhLGVBQWdCLFNBQVEsMEJBQXVDO0lBRzFFLFlBQStCLE9BQStCO1FBQzVELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURjLFlBQU8sR0FBUCxPQUFPLENBQXdCO0lBRTlELENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ1UsT0FBTyxDQUFDLFVBQXNCOztZQUN6QyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRW5GLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsK0RBQStEO1lBQy9ELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSx5QkFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFD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LENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxNQUFNLENBQUMsRUFBVSxFQUFFLEtBQTJCOztZQUN6RCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFOUQsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUkseUJBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLE1BQU0sQ0FBQyxFQUFVOztZQUM1QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV6RCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0NBQ0Y7QUExSUQsMENBMElDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzZXRFbWl0UmVxdWVzdFNjaGVtYSwgQXNzZXREZXN0cm95UmVxdWVzdFNjaGVtYSB9IGZyb20gXCIuL3JlcXVlc3RcIjtcclxuaW1wb3J0IHtcclxuICBBc3NldCxcclxuICBBc3NldFNjaGVtYSxcclxuICBQYXltZW50LFxyXG4gIFJlcXVlc3RVdGlsLFxyXG4gIFBhZ2luYXRlZEFycmF5LFxyXG4gIFBhZ2luYXRpb24sXHJcbiAgUGFnaW5hdGlvblV0aWxcclxufSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcclxuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMsIEJhc2VNb2RlbFdlYlNlcnZpY2UgfSBmcm9tIFwiLi9iYXNlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFzc2V0V2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxyXG5cclxuZXhwb3J0IGNsYXNzIEFzc2V0V2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8QXNzZXQsIEFzc2V0U2NoZW1hPiB7XHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogQXNzZXRXZWJTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogQXNzZXRXZWJTZXJ2aWNlT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEFzc2V0V2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBBc3NldFdlYlNlcnZpY2VPcHRpb25zKTogQXNzZXRXZWJTZXJ2aWNlIHtcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgQXNzZXRXZWJTZXJ2aWNlKG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5kIGFsbCBBc3NldHMgaW4gdGhlIHBsYXRmb3JtLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBmaW5kQWxsKHBhZ2luYXRpb246IFBhZ2luYXRpb24pOiBQcm9taXNlPFBhZ2luYXRlZEFycmF5PEFzc2V0Pj4ge1xyXG4gICAgY29uc3QgeyBza2lwLCBsaW1pdCB9ID0gcGFnaW5hdGlvbjtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChcIi9hc3NldHNcIiwgbnVsbCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQgfSB9KTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xyXG4gICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YS5tYXAoKGl0ZW06IEFzc2V0U2NoZW1hKSA9PiBuZXcgQXNzZXQoaXRlbSkpO1xyXG4gICAgcmV0dXJuIFBhZ2luYXRpb25VdGlsLnBhcnNlKHJlc3VsdCwgcmVzcG9uc2UuaGVhZGVycyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5kIGFuIEFzc2V0IGJhc2VkIG9uIGl0cyBJRC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZCBUaGUgQXNzZXQgSUQuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGZpbmRPbmUoaWQ6IHN0cmluZyk6IFByb21pc2U8QXNzZXQ+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2Fzc2V0cy8ke2lkfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBBc3NldChyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIGFuIEFzc2V0IHRvIGEgc3BlY2lmaWMgd2FsbGV0LiBJZiBub25lIHN1cHBsaWVkLCB3aWxsIGJlIGVtaXRlZCB0byB0aGUgbWVkaWF0b3Igd2FsbGV0LlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBlbWl0KHJlcXVlc3Q6IEFzc2V0RW1pdFJlcXVlc3RTY2hlbWEpOiBQcm9taXNlPFBheW1lbnQ+IHtcclxuICAgIGNvbnN0IHsgaWQsIGFtb3VudCwgZGVzdGluYXRpb24gfSA9IHJlcXVlc3Q7XHJcbiAgICBjb25zdCBib2R5ID0geyBhbW91bnQsIGRlc3RpbmF0aW9uIH07XHJcbiAgICBjb25zdCBzaWduYXR1cmUgPSBSZXF1ZXN0VXRpbC5zaWduKHRoaXMub3B0aW9ucy5jbGllbnRTZWNyZXQsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgdXJsOiBgL2Fzc2V0cy8ke2lkfS9lbWl0YCxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9hc3NldHMvJHtpZH0vZW1pdGAsIGJvZHksIHtcclxuICAgICAgaGVhZGVyczogeyAuLi5zaWduYXR1cmUgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFBheW1lbnQocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95cyBhbiBhbW91bnQgb2YgQXNzZXRzIGZyb20gYSBzcGVjaWZpYyB3YWxsZXQuIElmIG5vbmUgc3VwcGxpZWQsIHdpbGwgYmUgZGVzdHJveWVkIGZyb20gdGhlIG1lZGlhdG9yIHdhbGxldC5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZGVzdHJveShyZXF1ZXN0OiBBc3NldERlc3Ryb3lSZXF1ZXN0U2NoZW1hKTogUHJvbWlzZTxQYXltZW50PiB7XHJcbiAgICBjb25zdCB7IGlkLCBhbW91bnQsIHNvdXJjZSB9ID0gcmVxdWVzdDtcclxuICAgIGNvbnN0IGJvZHkgPSB7IGFtb3VudCwgc291cmNlIH07XHJcbiAgICBjb25zdCBzaWduYXR1cmUgPSBSZXF1ZXN0VXRpbC5zaWduKHRoaXMub3B0aW9ucy5jbGllbnRTZWNyZXQsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgdXJsOiBgL2Fzc2V0cy8ke2lkfS9kZXN0cm95YCxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9hc3NldHMvJHtpZH0vZGVzdHJveWAsIGJvZHksIHtcclxuICAgICAgaGVhZGVyczogeyAuLi5zaWduYXR1cmUgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFBheW1lbnQocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgQXNzZXQgaW4gdGhlIHBsYXRmb3JtLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGFzc2V0IFRoZSBBc3NldCBzY2hlbWEuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGNyZWF0ZShhc3NldDogQXNzZXRTY2hlbWEpOiBQcm9taXNlPEFzc2V0PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFwiL2Fzc2V0c1wiLCBhc3NldCk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEFzc2V0KHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFydGlhbGx5IHVwZGF0ZSBhbiBleGlzdGluZyBBc3NldC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZCBUaGUgQXNzZXQgSUQuXHJcbiAgICogQHBhcmFtIGFzc2V0IFRoZSBwYXJ0aWFsIEFzc2V0IHNjaGVtYS5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKGlkOiBzdHJpbmcsIGFzc2V0OiBQYXJ0aWFsPEFzc2V0U2NoZW1hPik6IFByb21pc2U8QXNzZXQ+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9hc3NldHMvJHtpZH1gLCBhc3NldCk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEFzc2V0KHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVsZXRlIGFuIEFzc2V0IGZyb20gdGhlIHBsYXRmb3JtLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGlkIFRoZSBBc3NldCBJRC5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZGVsZXRlKGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmRlbGV0ZShgL2Fzc2V0cy8ke2lkfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==