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
const session_1 = require("../session");
const base_1 = require("../base");
const response_1 = require("./response");
class AnalyticsWebService {
    constructor(options) {
        this.http = new base_1.Http(options);
        if (session_1.Session.getInstance()) {
            this.http.interceptors(session_1.Session.getInstance().interceptors());
        }
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new AnalyticsWebService(options);
        return this.instance;
    }
    /**
     * Gets analytics for the currently active tokens.
     */
    active(query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get("/analytics/active", query);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new response_1.AnalyticsActiveResponse(response.data);
        });
    }
    /**
     * Gets device analytics from recent tokens.
     */
    devices(query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get("/analytics/devices", query);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new response_1.AnalyticsDevicesResponse(response.data);
        });
    }
}
exports.default = AnalyticsWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5hbHl0aWNzV2ViU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9BbmFseXRpY3NXZWJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx3Q0FBcUM7QUFDckMsa0NBQTRDO0FBQzVDLHlDQUErRTtBQUUvRTtJQUlFLFlBQVksT0FBb0I7UUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5QixJQUFJLGlCQUFPLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFvQjtRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNVLE1BQU0sQ0FBQyxRQUFhLEVBQUU7O1lBQ2pDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksa0NBQXVCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsT0FBTyxDQUFDLFFBQWEsRUFBRTs7WUFDbEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVsRSxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxtQ0FBd0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsQ0FBQztLQUFBO0NBQ0Y7QUE5Q0Qsc0NBOENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gXCIuLi9zZXNzaW9uXCI7XG5pbXBvcnQgeyBIdHRwLCBIdHRwT3B0aW9ucyB9IGZyb20gXCIuLi9iYXNlXCI7XG5pbXBvcnQgeyBBbmFseXRpY3NBY3RpdmVSZXNwb25zZSwgQW5hbHl0aWNzRGV2aWNlc1Jlc3BvbnNlIH0gZnJvbSBcIi4vcmVzcG9uc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5hbHl0aWNzV2ViU2VydmljZSB7XG4gIHByb3RlY3RlZCBodHRwOiBIdHRwO1xuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBBbmFseXRpY3NXZWJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEh0dHBPcHRpb25zKSB7XG4gICAgdGhpcy5odHRwID0gbmV3IEh0dHAob3B0aW9ucyk7XG5cbiAgICBpZiAoU2Vzc2lvbi5nZXRJbnN0YW5jZSgpKSB7XG4gICAgICB0aGlzLmh0dHAuaW50ZXJjZXB0b3JzKFNlc3Npb24uZ2V0SW5zdGFuY2UoKS5pbnRlcmNlcHRvcnMoKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBBbmFseXRpY3NXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBIdHRwT3B0aW9ucyk6IEFuYWx5dGljc1dlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgQW5hbHl0aWNzV2ViU2VydmljZShvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuYWx5dGljcyBmb3IgdGhlIGN1cnJlbnRseSBhY3RpdmUgdG9rZW5zLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGFjdGl2ZShxdWVyeTogYW55ID0ge30pOiBQcm9taXNlPEFuYWx5dGljc0FjdGl2ZVJlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KFwiL2FuYWx5dGljcy9hY3RpdmVcIiwgcXVlcnkpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBbmFseXRpY3NBY3RpdmVSZXNwb25zZShyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGRldmljZSBhbmFseXRpY3MgZnJvbSByZWNlbnQgdG9rZW5zLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGRldmljZXMocXVlcnk6IGFueSA9IHt9KTogUHJvbWlzZTxBbmFseXRpY3NEZXZpY2VzUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoXCIvYW5hbHl0aWNzL2RldmljZXNcIiwgcXVlcnkpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBbmFseXRpY3NEZXZpY2VzUmVzcG9uc2UocmVzcG9uc2UuZGF0YSk7XG4gIH1cbn1cbiJdfQ==