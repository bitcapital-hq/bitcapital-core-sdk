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
const __1 = require("..");
const bitcapital_common_1 = require("bitcapital-common");
class PreviewWebService {
    constructor(options) {
        this.options = options;
        this.http = new bitcapital_common_1.Http(options);
        if (options.session) {
            this.http.interceptors(options.session.interceptors());
        }
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new PreviewWebService(options);
        return this.instance;
    }
    findOne(id, resourceId) {
        id.toLowerCase;
        resourceId.toLowerCase;
        throw new Error("Method not implemented.");
    }
    kyc(taxId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {};
            const url = `/preview/kyc/${taxId}`;
            const signature = __1.RequestUtil.sign(this.options.clientSecret, {
                url,
                body: JSON.stringify(payload),
                method: "GET"
            });
            const response = yield this.http.get(url, payload, { headers: Object.assign({}, signature) });
            if (!response || response.status !== 200) {
                throw response;
            }
            return response.data;
        });
    }
}
exports.PreviewWebService = PreviewWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJldmlld1dlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvUHJldmlld1dlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLDBCQUFpQztBQUNqQyx5REFBeUM7QUFLekMsTUFBYSxpQkFBaUI7SUFJNUIsWUFBK0IsT0FBbUM7UUFBbkMsWUFBTyxHQUFQLE9BQU8sQ0FBNEI7UUFDaEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHdCQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFOUIsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBaUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sT0FBTyxDQUFDLEVBQVUsRUFBRSxVQUFtQjtRQUM1QyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ2YsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVZLEdBQUcsQ0FBQyxLQUFhOztZQUM1QixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFFbkIsTUFBTSxHQUFHLEdBQUcsZ0JBQWdCLEtBQUssRUFBRSxDQUFDO1lBQ3BDLE1BQU0sU0FBUyxHQUFHLGVBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7Z0JBQzVELEdBQUc7Z0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2dCQUM3QixNQUFNLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sb0JBQU8sU0FBUyxDQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRWxGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7S0FBQTtDQUNGO0FBNUNELDhDQTRDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IFJlcXVlc3RVdGlsIH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBIdHRwIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XG5pbXBvcnQgeyBQZW9wbGVSZXNwb25zZSB9IGZyb20gXCJiaWdkYXRhY29ycC1zZXJ2aWNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJldmlld1dlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cblxuZXhwb3J0IGNsYXNzIFByZXZpZXdXZWJTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogUHJldmlld1dlYlNlcnZpY2U7XG4gIHByb3RlY3RlZCBodHRwOiBIdHRwO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBvcHRpb25zOiBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucykge1xuICAgIHRoaXMuaHR0cCA9IG5ldyBIdHRwKG9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnMuc2Vzc2lvbikge1xuICAgICAgdGhpcy5odHRwLmludGVyY2VwdG9ycyhvcHRpb25zLnNlc3Npb24uaW50ZXJjZXB0b3JzKCkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUHJldmlld1dlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IFByZXZpZXdXZWJTZXJ2aWNlT3B0aW9ucyk6IFByZXZpZXdXZWJTZXJ2aWNlIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFByZXZpZXdXZWJTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIGZpbmRPbmUoaWQ6IHN0cmluZywgcmVzb3VyY2VJZD86IHN0cmluZykge1xuICAgIGlkLnRvTG93ZXJDYXNlO1xuICAgIHJlc291cmNlSWQudG9Mb3dlckNhc2U7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMga3ljKHRheElkOiBzdHJpbmcpOiBQcm9taXNlPHsgYWNjZXB0ZWQ6IHRydWU7IGRldGFpbHM6IFBlb3BsZVJlc3BvbnNlIH0+IHtcbiAgICBjb25zdCBwYXlsb2FkID0ge307XG5cbiAgICBjb25zdCB1cmwgPSBgL3ByZXZpZXcva3ljLyR7dGF4SWR9YDtcbiAgICBjb25zdCBzaWduYXR1cmUgPSBSZXF1ZXN0VXRpbC5zaWduKHRoaXMub3B0aW9ucy5jbGllbnRTZWNyZXQsIHtcbiAgICAgIHVybCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgfSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KHVybCwgcGF5bG9hZCwgeyBoZWFkZXJzOiB7IC4uLnNpZ25hdHVyZSB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH1cbn1cbiJdfQ==