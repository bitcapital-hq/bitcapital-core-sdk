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
const utils_1 = require("../utils");
const BaseModelWebService_1 = require("./base/BaseModelWebService");
class AssetWebService extends BaseModelWebService_1.default {
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
            return utils_1.PaginationUtil.parse(result, response.headers);
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
exports.default = AssetWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNzZXRXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL0Fzc2V0V2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseURBQTZFO0FBQzdFLG9DQUFzRTtBQUN0RSxvRUFBNkY7QUFLN0YscUJBQXFDLFNBQVEsNkJBQXVDO0lBR2xGLFlBQStCLE9BQStCO1FBQzVELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURjLFlBQU8sR0FBUCxPQUFPLENBQXdCO0lBRTlELENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ1UsT0FBTyxDQUFDLFVBQXNCOztZQUN6QyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRW5GLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsK0RBQStEO1lBQy9ELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSx5QkFBSyxDQUFDLElBQUksQ0FBQyxDQUFD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Q0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxNQUFNLENBQUMsRUFBVSxFQUFFLEtBQTJCOztZQUN6RCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFOUQsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUkseUJBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLE1BQU0sQ0FBQyxFQUFVOztZQUM1QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUV6RCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0NBQ0Y7QUExSUQsa0NBMElDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXNzZXQsIEFzc2V0U2NoZW1hLCBQYXltZW50LCBSZXF1ZXN0VXRpbCB9IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xuaW1wb3J0IHsgUGFnaW5hdGVkQXJyYXksIFBhZ2luYXRpb24sIFBhZ2luYXRpb25VdGlsIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgQmFzZU1vZGVsV2ViU2VydmljZSwgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2UvQmFzZU1vZGVsV2ViU2VydmljZVwiO1xuaW1wb3J0IHsgQXNzZXREZXN0cm95UmVxdWVzdFNjaGVtYSwgQXNzZXRFbWl0UmVxdWVzdFNjaGVtYSB9IGZyb20gXCIuL3JlcXVlc3RcIjtcblxuZXhwb3J0IGludGVyZmFjZSBBc3NldFdlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgeyB9XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFzc2V0V2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8QXNzZXQsIEFzc2V0U2NoZW1hPiB7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IEFzc2V0V2ViU2VydmljZTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogQXNzZXRXZWJTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBBc3NldFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IEFzc2V0V2ViU2VydmljZU9wdGlvbnMpOiBBc3NldFdlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgQXNzZXRXZWJTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYWxsIEFzc2V0cyBpbiB0aGUgcGxhdGZvcm0uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZEFsbChwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxBc3NldD4+IHtcbiAgICBjb25zdCB7IHNraXAsIGxpbWl0IH0gPSBwYWdpbmF0aW9uO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChcIi9hc3NldHNcIiwgbnVsbCwgeyBwYXJhbXM6IHsgc2tpcCwgbGltaXQgfSB9KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIHBhZ2luYXRlZCBhcnJheSB3aXRoIGNvdW50IGluZm9ybWF0aW9uIGZyb20gaGVhZGVyc1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBBc3NldFNjaGVtYSkgPT4gbmV3IEFzc2V0KGl0ZW0pKTtcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFuIEFzc2V0IGJhc2VkIG9uIGl0cyBJRC5cbiAgICpcbiAgICogQHBhcmFtIGlkIFRoZSBBc3NldCBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpOiBQcm9taXNlPEFzc2V0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvYXNzZXRzLyR7aWR9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFzc2V0KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIEFzc2V0IHRvIGEgc3BlY2lmaWMgd2FsbGV0LiBJZiBub25lIHN1cHBsaWVkLCB3aWxsIGJlIGVtaXRlZCB0byB0aGUgbWVkaWF0b3Igd2FsbGV0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGVtaXQocmVxdWVzdDogQXNzZXRFbWl0UmVxdWVzdFNjaGVtYSk6IFByb21pc2U8UGF5bWVudD4ge1xuICAgIGNvbnN0IHsgaWQsIGFtb3VudCwgZGVzdGluYXRpb24gfSA9IHJlcXVlc3Q7XG4gICAgY29uc3QgYm9keSA9IHsgYW1vdW50LCBkZXN0aW5hdGlvbiB9O1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IFJlcXVlc3RVdGlsLnNpZ24odGhpcy5vcHRpb25zLmNsaWVudFNlY3JldCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogYC9hc3NldHMvJHtpZH0vZW1pdGAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL2Fzc2V0cy8ke2lkfS9lbWl0YCwgYm9keSwge1xuICAgICAgaGVhZGVyczogeyAuLi5zaWduYXR1cmUgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQYXltZW50KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFuIGFtb3VudCBvZiBBc3NldHMgZnJvbSBhIHNwZWNpZmljIHdhbGxldC4gSWYgbm9uZSBzdXBwbGllZCwgd2lsbCBiZSBkZXN0cm95ZWQgZnJvbSB0aGUgbWVkaWF0b3Igd2FsbGV0LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kocmVxdWVzdDogQXNzZXREZXN0cm95UmVxdWVzdFNjaGVtYSk6IFByb21pc2U8UGF5bWVudD4ge1xuICAgIGNvbnN0IHsgaWQsIGFtb3VudCwgc291cmNlIH0gPSByZXF1ZXN0O1xuICAgIGNvbnN0IGJvZHkgPSB7IGFtb3VudCwgc291cmNlIH07XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiBgL2Fzc2V0cy8ke2lkfS9kZXN0cm95YCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvYXNzZXRzLyR7aWR9L2Rlc3Ryb3lgLCBib2R5LCB7XG4gICAgICBoZWFkZXJzOiB7IC4uLnNpZ25hdHVyZSB9XG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBheW1lbnQocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEFzc2V0IGluIHRoZSBwbGF0Zm9ybS5cbiAgICpcbiAgICogQHBhcmFtIGFzc2V0IFRoZSBBc3NldCBzY2hlbWEuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY3JlYXRlKGFzc2V0OiBBc3NldFNjaGVtYSk6IFByb21pc2U8QXNzZXQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFwiL2Fzc2V0c1wiLCBhc3NldCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFzc2V0KHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnRpYWxseSB1cGRhdGUgYW4gZXhpc3RpbmcgQXNzZXQuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgQXNzZXQgSUQuXG4gICAqIEBwYXJhbSBhc3NldCBUaGUgcGFydGlhbCBBc3NldCBzY2hlbWEuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBkYXRlKGlkOiBzdHJpbmcsIGFzc2V0OiBQYXJ0aWFsPEFzc2V0U2NoZW1hPik6IFByb21pc2U8QXNzZXQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvYXNzZXRzLyR7aWR9YCwgYXNzZXQpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBc3NldChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYW4gQXNzZXQgZnJvbSB0aGUgcGxhdGZvcm0uXG4gICAqXG4gICAqIEBwYXJhbSBpZCBUaGUgQXNzZXQgSUQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZGVsZXRlKGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5kZWxldGUoYC9hc3NldHMvJHtpZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=