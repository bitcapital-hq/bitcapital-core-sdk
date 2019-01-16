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
const models_1 = require("../models");
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
            const result = response.data.map((item) => new models_1.Asset(item));
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
            return new models_1.Asset(response.data);
        });
    }
    /**
     * Emits an Asset to a specific wallet. If none supplied, will be emited to the mediator wallet.
     */
    emit(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, amount, destination } = request;
            const body = { amount, destination };
            const signature = utils_1.RequestUtil.sign(this.options.clientSecret, {
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
            return new models_1.Payment(response.data);
        });
    }
    /**
     * Destroys an amount of Assets from a specific wallet. If none supplied, will be destroyed from the mediator wallet.
     */
    destroy(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, amount, source } = request;
            const body = { amount, source };
            const signature = utils_1.RequestUtil.sign(this.options.clientSecret, {
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
            return new models_1.Payment(response.data);
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
            return new models_1.Asset(response.data);
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
            return new models_1.Asset(response.data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNzZXRXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL0Fzc2V0V2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsc0NBQXdEO0FBQ3hELG9DQUFtRjtBQUNuRixvRUFBNkY7QUFLN0YscUJBQXFDLFNBQVEsNkJBQXVDO0lBR2xGLFlBQStCLE9BQStCO1FBQzVELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURjLFlBQU8sR0FBUCxPQUFPLENBQXdCO0lBRTlELENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ1UsT0FBTyxDQUFDLFVBQXNCOztZQUN6QyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRW5GLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsK0RBQStEO1lBQy9ELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSxjQUFLLENBQUMsSUFBSSxDQUFDLENBQUMs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QyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxNQUFNLENBQUMsRUFBVSxFQUFFLEtBQTJCOztZQUN6RCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFOUQsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksY0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsTUFBTSxDQUFDLEVBQVU7O1lBQzVCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXpELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7Q0FDRjtBQTFJRCxrQ0EwSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3NldCwgQXNzZXRTY2hlbWEsIFBheW1lbnQgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IFBhZ2luYXRlZEFycmF5LCBQYWdpbmF0aW9uLCBQYWdpbmF0aW9uVXRpbCwgUmVxdWVzdFV0aWwgfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuaW1wb3J0IEJhc2VNb2RlbFdlYlNlcnZpY2UsIHsgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlL0Jhc2VNb2RlbFdlYlNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXNzZXRFbWl0UmVxdWVzdFNjaGVtYSwgQXNzZXREZXN0cm95UmVxdWVzdFNjaGVtYSB9IGZyb20gXCIuL3JlcXVlc3RcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXNzZXRXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIHt9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc3NldFdlYlNlcnZpY2UgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlPEFzc2V0LCBBc3NldFNjaGVtYT4ge1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IEFzc2V0V2ViU2VydmljZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IG9wdGlvbnM6IEFzc2V0V2ViU2VydmljZU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBBc3NldFdlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogQXNzZXRXZWJTZXJ2aWNlT3B0aW9ucyk6IEFzc2V0V2ViU2VydmljZSB7XHJcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IEFzc2V0V2ViU2VydmljZShvcHRpb25zKTtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluZCBhbGwgQXNzZXRzIGluIHRoZSBwbGF0Zm9ybS5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZmluZEFsbChwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxBc3NldD4+IHtcclxuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IHBhZ2luYXRpb247XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoXCIvYXNzZXRzXCIsIG51bGwsIHsgcGFyYW1zOiB7IHNraXAsIGxpbWl0IH0gfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm4gYSBwYWdpbmF0ZWQgYXJyYXkgd2l0aCBjb3VudCBpbmZvcm1hdGlvbiBmcm9tIGhlYWRlcnNcclxuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBBc3NldFNjaGVtYSkgPT4gbmV3IEFzc2V0KGl0ZW0pKTtcclxuICAgIHJldHVybiBQYWdpbmF0aW9uVXRpbC5wYXJzZShyZXN1bHQsIHJlc3BvbnNlLmhlYWRlcnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluZCBhbiBBc3NldCBiYXNlZCBvbiBpdHMgSUQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaWQgVGhlIEFzc2V0IElELlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpOiBQcm9taXNlPEFzc2V0PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9hc3NldHMvJHtpZH1gKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgQXNzZXQocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyBhbiBBc3NldCB0byBhIHNwZWNpZmljIHdhbGxldC4gSWYgbm9uZSBzdXBwbGllZCwgd2lsbCBiZSBlbWl0ZWQgdG8gdGhlIG1lZGlhdG9yIHdhbGxldC5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZW1pdChyZXF1ZXN0OiBBc3NldEVtaXRSZXF1ZXN0U2NoZW1hKTogUHJvbWlzZTxQYXltZW50PiB7XHJcbiAgICBjb25zdCB7IGlkLCBhbW91bnQsIGRlc3RpbmF0aW9uIH0gPSByZXF1ZXN0O1xyXG4gICAgY29uc3QgYm9keSA9IHsgYW1vdW50LCBkZXN0aW5hdGlvbiB9O1xyXG4gICAgY29uc3Qgc2lnbmF0dXJlID0gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIHVybDogYC9hc3NldHMvJHtpZH0vZW1pdGAsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvYXNzZXRzLyR7aWR9L2VtaXRgLCBib2R5LCB7XHJcbiAgICAgIGhlYWRlcnM6IHsgLi4uc2lnbmF0dXJlIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQYXltZW50KHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdHJveXMgYW4gYW1vdW50IG9mIEFzc2V0cyBmcm9tIGEgc3BlY2lmaWMgd2FsbGV0LiBJZiBub25lIHN1cHBsaWVkLCB3aWxsIGJlIGRlc3Ryb3llZCBmcm9tIHRoZSBtZWRpYXRvciB3YWxsZXQuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGRlc3Ryb3kocmVxdWVzdDogQXNzZXREZXN0cm95UmVxdWVzdFNjaGVtYSk6IFByb21pc2U8UGF5bWVudD4ge1xyXG4gICAgY29uc3QgeyBpZCwgYW1vdW50LCBzb3VyY2UgfSA9IHJlcXVlc3Q7XHJcbiAgICBjb25zdCBib2R5ID0geyBhbW91bnQsIHNvdXJjZSB9O1xyXG4gICAgY29uc3Qgc2lnbmF0dXJlID0gUmVxdWVzdFV0aWwuc2lnbih0aGlzLm9wdGlvbnMuY2xpZW50U2VjcmV0LCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIHVybDogYC9hc3NldHMvJHtpZH0vZGVzdHJveWAsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvYXNzZXRzLyR7aWR9L2Rlc3Ryb3lgLCBib2R5LCB7XHJcbiAgICAgIGhlYWRlcnM6IHsgLi4uc2lnbmF0dXJlIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQYXltZW50KHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IEFzc2V0IGluIHRoZSBwbGF0Zm9ybS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBhc3NldCBUaGUgQXNzZXQgc2NoZW1hLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBjcmVhdGUoYXNzZXQ6IEFzc2V0U2NoZW1hKTogUHJvbWlzZTxBc3NldD4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcIi9hc3NldHNcIiwgYXNzZXQpO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBBc3NldChyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhcnRpYWxseSB1cGRhdGUgYW4gZXhpc3RpbmcgQXNzZXQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaWQgVGhlIEFzc2V0IElELlxyXG4gICAqIEBwYXJhbSBhc3NldCBUaGUgcGFydGlhbCBBc3NldCBzY2hlbWEuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHVwZGF0ZShpZDogc3RyaW5nLCBhc3NldDogUGFydGlhbDxBc3NldFNjaGVtYT4pOiBQcm9taXNlPEFzc2V0PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvYXNzZXRzLyR7aWR9YCwgYXNzZXQpO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBBc3NldChyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlbGV0ZSBhbiBBc3NldCBmcm9tIHRoZSBwbGF0Zm9ybS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZCBUaGUgQXNzZXQgSUQuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGRlbGV0ZShpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5kZWxldGUoYC9hc3NldHMvJHtpZH1gKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG4iXX0=