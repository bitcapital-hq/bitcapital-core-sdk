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
const _1 = require(".");
class SessionUnauthorizedInterceptor {
    constructor(session, onUnauthorizedStatus, errorCodes = [401]) {
        this.onUnauthorizedStatus = onUnauthorizedStatus;
        this.errorCodes = errorCodes;
        this.session = session;
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
                return this.onUnauthorizedStatus(error).then(() => __awaiter(this, void 0, void 0, function* () {
                    const credentialInterceptor = new _1.SessionCredentialsInterceptor(this.session);
                    const request = yield credentialInterceptor.request(originalRequest);
                    return axios_1.default(request);
                }));
            }
            throw error;
        });
    }
}
exports.default = SessionUnauthorizedInterceptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3Nlc3Npb24vaW50ZXJjZXB0b3JzL1Nlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQTZFO0FBRzdFLHdCQUFrRDtBQUlsRCxNQUFxQiw4QkFBOEI7SUFLakQsWUFBWSxPQUFnQixFQUFFLG9CQUFpRCxFQUFFLGFBQXVCLENBQUMsR0FBRyxDQUFDO1FBQzNHLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRVksT0FBTyxDQUFDLE9BQTJCOztZQUM5QyxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUMsUUFBdUI7O1lBQzNDLGtGQUFrRjtZQUNsRixpRkFBaUY7WUFDakYsNkZBQTZGO1lBQzdGLE1BQU0sY0FBYyxHQUFJLFFBQWdCLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQztZQUM5RCxJQUFJLGNBQWMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6RSxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDM0M7WUFDRCxPQUFPLGNBQWMsQ0FBQztRQUN4QixDQUFDO0tBQUE7SUFFWSxLQUFLLENBQUMsS0FBaUI7O1lBQ2xDLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDckMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDaEgsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDakMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQVMsRUFBRTtvQkFDdEQsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLGdDQUE2QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDOUUsTUFBTSxPQUFPLEdBQUcsTUFBTSxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ3JFLE9BQU8sZUFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN4QixDQUFDLENBQUEsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxNQUFNLEtBQUssQ0FBQztRQUNkLENBQUM7S0FBQTtDQUNGO0FBdENELGlEQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBeGlvcywgeyBBeGlvc1JlcXVlc3RDb25maWcsIEF4aW9zRXJyb3IsIEF4aW9zUmVzcG9uc2UgfSBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IEh0dHBJbnRlcmNlcHRvciB9IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xuaW1wb3J0IFNlc3Npb24gZnJvbSBcIi4uL1Nlc3Npb25cIjtcbmltcG9ydCB7IFNlc3Npb25DcmVkZW50aWFsc0ludGVyY2VwdG9yIH0gZnJvbSBcIi5cIjtcblxuZXhwb3J0IHR5cGUgU2Vzc2lvblVuYXV0aG9yaXplZENhbGxiYWNrID0gKGVycm9yOiBBeGlvc0Vycm9yIHwgQXhpb3NSZXNwb25zZSkgPT4gYW55O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXNzaW9uVW5hdXRob3JpemVkSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBlcnJvckNvZGVzOiBudW1iZXJbXTtcbiAgb25VbmF1dGhvcml6ZWRTdGF0dXM6IFNlc3Npb25VbmF1dGhvcml6ZWRDYWxsYmFjaztcbiAgc2Vzc2lvbjogU2Vzc2lvbjtcblxuICBjb25zdHJ1Y3RvcihzZXNzaW9uOiBTZXNzaW9uLCBvblVuYXV0aG9yaXplZFN0YXR1czogU2Vzc2lvblVuYXV0aG9yaXplZENhbGxiYWNrLCBlcnJvckNvZGVzOiBudW1iZXJbXSA9IFs0MDFdKSB7XG4gICAgdGhpcy5vblVuYXV0aG9yaXplZFN0YXR1cyA9IG9uVW5hdXRob3JpemVkU3RhdHVzO1xuICAgIHRoaXMuZXJyb3JDb2RlcyA9IGVycm9yQ29kZXM7XG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0KHJlcXVlc3Q6IEF4aW9zUmVxdWVzdENvbmZpZykge1xuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlc3BvbnNlKHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlKSB7XG4gICAgLy8gQXMgYXhpb3MgaXMgY2FsbGluZyB0aGlzIGludGVyY2VwdG9yIGV2ZW4gd2hlbiB0aGUgc3RhdHVzIGNvZGUgaXMgNDAwIG9yIGhpZ2hlclxuICAgIC8vIFRoaXMgaGFjayBpcyBuZWVkZWQgdG8gYWN0dWFsbHkgY2FsbCBvblVuYXV0aG9yaXplZFN0YXR1cyB3aGVuIHRoZXJlJ3MgYSBlcnJvclxuICAgIC8vIEFzIHRoZSBlcnJvciBvYmplY3QgaGFzIGEgZGlmZmVyZW50IHN0cnVjdHVyZSBhbmQgdGhlIHN0YXR1cyBjb2RlIGlzIGluc2lkZSBlcnJvci5yZXNwb25zZVxuICAgIGNvbnN0IGFjdHVhbFJlc3BvbnNlID0gKHJlc3BvbnNlIGFzIGFueSkucmVzcG9uc2UgfHwgcmVzcG9uc2U7XG4gICAgaWYgKGFjdHVhbFJlc3BvbnNlICYmIHRoaXMuZXJyb3JDb2Rlcy5pbmRleE9mKGFjdHVhbFJlc3BvbnNlLnN0YXR1cykgPj0gMCkge1xuICAgICAgdGhpcy5vblVuYXV0aG9yaXplZFN0YXR1cyhhY3R1YWxSZXNwb25zZSk7XG4gICAgfVxuICAgIHJldHVybiBhY3R1YWxSZXNwb25zZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBlcnJvcihlcnJvcjogQXhpb3NFcnJvcikge1xuICAgIGNvbnN0IG9yaWdpbmFsUmVxdWVzdCA9IGVycm9yLmNvbmZpZztcbiAgICBpZiAoZXJyb3IgJiYgZXJyb3IucmVzcG9uc2UgJiYgdGhpcy5lcnJvckNvZGVzLmluZGV4T2YoZXJyb3IucmVzcG9uc2Uuc3RhdHVzKSA+PSAwICYmICFvcmlnaW5hbFJlcXVlc3RbXCJfcmV0cnlcIl0pIHtcbiAgICAgIG9yaWdpbmFsUmVxdWVzdFtcIl9yZXRyeVwiXSA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5vblVuYXV0aG9yaXplZFN0YXR1cyhlcnJvcikudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxJbnRlcmNlcHRvciA9IG5ldyBTZXNzaW9uQ3JlZGVudGlhbHNJbnRlcmNlcHRvcih0aGlzLnNlc3Npb24pO1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgY3JlZGVudGlhbEludGVyY2VwdG9yLnJlcXVlc3Qob3JpZ2luYWxSZXF1ZXN0KTtcbiAgICAgICAgcmV0dXJuIEF4aW9zKHJlcXVlc3QpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG4iXX0=