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
const base_1 = require("../base");
const response_1 = require("./response");
class AnalyticsWebService extends base_1.Http {
    constructor(options) {
        super(options);
        if (options.session) {
            this.interceptors(options.session.interceptors());
        }
    }
    static getInstance(options) {
        if (!this.instance) {
            this.instance = new AnalyticsWebService(options);
        }
        return this.instance;
    }
    /**
     * Gets analytics for the currently active tokens.
     */
    active(query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get('/analytics/active', query);
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
            const response = yield this.get('/analytics/devices', query);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new response_1.AnalyticsDevicesResponse(response.data);
        });
    }
}
exports.default = AnalyticsWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5hbHl0aWNzV2ViU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9BbmFseXRpY3NXZWJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxrQ0FBNEM7QUFDNUMseUNBQStFO0FBTS9FLHlCQUF5QyxTQUFRLFdBQUk7SUFJbkQsWUFBWSxPQUFtQztRQUM3QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFtQztRQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbEQ7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ1UsTUFBTSxDQUFDLFFBQWEsRUFBRTs7WUFDakMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRTVELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLGtDQUF1QixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLE9BQU8sQ0FBQyxRQUFhLEVBQUU7O1lBQ2xDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUU3RCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxtQ0FBd0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsQ0FBQztLQUFBO0NBRUY7QUE1Q0Qsc0NBNENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gJy4uL3Nlc3Npb24nO1xuaW1wb3J0IHsgSHR0cCwgSHR0cE9wdGlvbnMgfSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCB7IEFuYWx5dGljc0FjdGl2ZVJlc3BvbnNlLCBBbmFseXRpY3NEZXZpY2VzUmVzcG9uc2UgfSBmcm9tICcuL3Jlc3BvbnNlJztcblxuZXhwb3J0IGludGVyZmFjZSBBbmFseXRpY3NXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEh0dHBPcHRpb25zIHtcbiAgc2Vzc2lvbj86IFNlc3Npb247XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuYWx5dGljc1dlYlNlcnZpY2UgZXh0ZW5kcyBIdHRwIHtcbiAgcHJvdGVjdGVkIG9wdGlvbnM6IEFuYWx5dGljc1dlYlNlcnZpY2VPcHRpb25zO1xuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBBbmFseXRpY3NXZWJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEFuYWx5dGljc1dlYlNlcnZpY2VPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMuc2Vzc2lvbikge1xuICAgICAgdGhpcy5pbnRlcmNlcHRvcnMob3B0aW9ucy5zZXNzaW9uLmludGVyY2VwdG9ycygpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKG9wdGlvbnM6IEFuYWx5dGljc1dlYlNlcnZpY2VPcHRpb25zKTogQW5hbHl0aWNzV2ViU2VydmljZSB7XG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XG4gICAgICB0aGlzLmluc3RhbmNlID0gbmV3IEFuYWx5dGljc1dlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW5hbHl0aWNzIGZvciB0aGUgY3VycmVudGx5IGFjdGl2ZSB0b2tlbnMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYWN0aXZlKHF1ZXJ5OiBhbnkgPSB7fSk6IFByb21pc2U8QW5hbHl0aWNzQWN0aXZlUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0KCcvYW5hbHl0aWNzL2FjdGl2ZScsIHF1ZXJ5KTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQW5hbHl0aWNzQWN0aXZlUmVzcG9uc2UocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBkZXZpY2UgYW5hbHl0aWNzIGZyb20gcmVjZW50IHRva2Vucy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBkZXZpY2VzKHF1ZXJ5OiBhbnkgPSB7fSk6IFByb21pc2U8QW5hbHl0aWNzRGV2aWNlc1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldCgnL2FuYWx5dGljcy9kZXZpY2VzJywgcXVlcnkpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBbmFseXRpY3NEZXZpY2VzUmVzcG9uc2UocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxufVxuIl19