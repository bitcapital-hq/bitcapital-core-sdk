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
const axios_1 = require("axios");
class SessionUnauthorizedInterceptor {
    constructor(onUnauthorizedStatus, errorCodes = [401]) {
        this.onUnauthorizedStatus = onUnauthorizedStatus;
        this.errorCodes = errorCodes;
    }
    request(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return request;
        });
    }
    response(response) {
        return __awaiter(this, void 0, void 0, function* () {
            // As axios is calling this interceptor even when the status code is 400 or higher
            // This hack is needed to actually call onUnauthorizedStatus when there's a error
            // As the error object has a different structure and the status code is inside error.response
            const actualResponse = response.response || response;
            if (actualResponse && this.errorCodes.indexOf(actualResponse.status) >= 0) {
                this.onUnauthorizedStatus(actualResponse);
            }
            return actualResponse;
        });
    }
    error(error) {
        return __awaiter(this, void 0, void 0, function* () {
            const originalRequest = error.config;
            if (error && error.response && this.errorCodes.indexOf(error.response.status) >= 0 && !originalRequest["_retry"]) {
                originalRequest["_retry"] = true;
                return this.onUnauthorizedStatus(error).then(() => axios_1.default(originalRequest));
            }
            throw error;
        });
    }
}
exports.default = SessionUnauthorizedInterceptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3Nlc3Npb24vaW50ZXJjZXB0b3JzL1Nlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQTZFO0FBSzdFLE1BQXFCLDhCQUE4QjtJQUlqRCxZQUFZLG9CQUFpRCxFQUFFLGFBQXVCLENBQUMsR0FBRyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRVksT0FBTyxDQUFDLE9BQTJCOztZQUM5QyxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUMsUUFBdUI7O1lBQzNDLGtGQUFrRjtZQUNsRixpRkFBaUY7WUFDakYsNkZBQTZGO1lBQzdGLE1BQU0sY0FBYyxHQUFJLFFBQWdCLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQztZQUM5RCxJQUFJLGNBQWMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6RSxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDM0M7WUFDRCxPQUFPLGNBQWMsQ0FBQztRQUN4QixDQUFDO0tBQUE7SUFFWSxLQUFLLENBQUMsS0FBaUI7O1lBQ2xDLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDckMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDaEgsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDakMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2FBQzVFO1lBQ0QsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDO0tBQUE7Q0FDRjtBQWhDRCxpREFnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXhpb3MsIHsgQXhpb3NSZXF1ZXN0Q29uZmlnLCBBeGlvc0Vycm9yLCBBeGlvc1Jlc3BvbnNlIH0gZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3IgfSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcblxuZXhwb3J0IHR5cGUgU2Vzc2lvblVuYXV0aG9yaXplZENhbGxiYWNrID0gKGVycm9yOiBBeGlvc0Vycm9yIHwgQXhpb3NSZXNwb25zZSkgPT4gYW55O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXNzaW9uVW5hdXRob3JpemVkSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBlcnJvckNvZGVzOiBudW1iZXJbXTtcbiAgb25VbmF1dGhvcml6ZWRTdGF0dXM6IFNlc3Npb25VbmF1dGhvcml6ZWRDYWxsYmFjaztcblxuICBjb25zdHJ1Y3RvcihvblVuYXV0aG9yaXplZFN0YXR1czogU2Vzc2lvblVuYXV0aG9yaXplZENhbGxiYWNrLCBlcnJvckNvZGVzOiBudW1iZXJbXSA9IFs0MDFdKSB7XG4gICAgdGhpcy5vblVuYXV0aG9yaXplZFN0YXR1cyA9IG9uVW5hdXRob3JpemVkU3RhdHVzO1xuICAgIHRoaXMuZXJyb3JDb2RlcyA9IGVycm9yQ29kZXM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVxdWVzdChyZXF1ZXN0OiBBeGlvc1JlcXVlc3RDb25maWcpIHtcbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXNwb25zZShyZXNwb25zZTogQXhpb3NSZXNwb25zZSkge1xuICAgIC8vIEFzIGF4aW9zIGlzIGNhbGxpbmcgdGhpcyBpbnRlcmNlcHRvciBldmVuIHdoZW4gdGhlIHN0YXR1cyBjb2RlIGlzIDQwMCBvciBoaWdoZXJcbiAgICAvLyBUaGlzIGhhY2sgaXMgbmVlZGVkIHRvIGFjdHVhbGx5IGNhbGwgb25VbmF1dGhvcml6ZWRTdGF0dXMgd2hlbiB0aGVyZSdzIGEgZXJyb3JcbiAgICAvLyBBcyB0aGUgZXJyb3Igb2JqZWN0IGhhcyBhIGRpZmZlcmVudCBzdHJ1Y3R1cmUgYW5kIHRoZSBzdGF0dXMgY29kZSBpcyBpbnNpZGUgZXJyb3IucmVzcG9uc2VcbiAgICBjb25zdCBhY3R1YWxSZXNwb25zZSA9IChyZXNwb25zZSBhcyBhbnkpLnJlc3BvbnNlIHx8IHJlc3BvbnNlO1xuICAgIGlmIChhY3R1YWxSZXNwb25zZSAmJiB0aGlzLmVycm9yQ29kZXMuaW5kZXhPZihhY3R1YWxSZXNwb25zZS5zdGF0dXMpID49IDApIHtcbiAgICAgIHRoaXMub25VbmF1dGhvcml6ZWRTdGF0dXMoYWN0dWFsUmVzcG9uc2UpO1xuICAgIH1cbiAgICByZXR1cm4gYWN0dWFsUmVzcG9uc2U7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZXJyb3IoZXJyb3I6IEF4aW9zRXJyb3IpOiBQcm9taXNlPEF4aW9zRXJyb3IgfCBBeGlvc1Jlc3BvbnNlPGFueT4+IHtcbiAgICBjb25zdCBvcmlnaW5hbFJlcXVlc3QgPSBlcnJvci5jb25maWc7XG4gICAgaWYgKGVycm9yICYmIGVycm9yLnJlc3BvbnNlICYmIHRoaXMuZXJyb3JDb2Rlcy5pbmRleE9mKGVycm9yLnJlc3BvbnNlLnN0YXR1cykgPj0gMCAmJiAhb3JpZ2luYWxSZXF1ZXN0W1wiX3JldHJ5XCJdKSB7XG4gICAgICBvcmlnaW5hbFJlcXVlc3RbXCJfcmV0cnlcIl0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXMub25VbmF1dGhvcml6ZWRTdGF0dXMoZXJyb3IpLnRoZW4oKCkgPT4gQXhpb3Mob3JpZ2luYWxSZXF1ZXN0KSk7XG4gICAgfVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG4iXX0=