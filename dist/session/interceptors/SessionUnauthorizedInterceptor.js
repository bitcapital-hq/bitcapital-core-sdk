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
            if (error && error.response && this.errorCodes.indexOf(error.response.status) >= 0) {
                this.onUnauthorizedStatus(error);
            }
            return error;
        });
    }
}
exports.default = SessionUnauthorizedInterceptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3Nlc3Npb24vaW50ZXJjZXB0b3JzL1Nlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0E7SUFJRSxZQUFZLG9CQUFpRCxFQUFFLGFBQXVCLENBQUMsR0FBRyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRVksT0FBTyxDQUFDLE9BQTJCOztZQUM5QyxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUMsUUFBdUI7O1lBQzNDLGtGQUFrRjtZQUNsRixpRkFBaUY7WUFDakYsNkZBQTZGO1lBQzdGLE1BQU0sY0FBYyxHQUFJLFFBQWdCLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQztZQUM5RCxJQUFJLGNBQWMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6RSxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDM0M7WUFDRCxPQUFPLGNBQWMsQ0FBQztRQUN4QixDQUFDO0tBQUE7SUFFWSxLQUFLLENBQUMsS0FBaUI7O1lBQ2xDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xGLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0NBQ0Y7QUE5QkQsaURBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXhpb3NSZXF1ZXN0Q29uZmlnLCBBeGlvc0Vycm9yLCBBeGlvc1Jlc3BvbnNlIH0gZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCB7IEh0dHBJbnRlcmNlcHRvciB9IGZyb20gXCIuLi8uLi9iYXNlXCI7XHJcblxyXG5leHBvcnQgdHlwZSBTZXNzaW9uVW5hdXRob3JpemVkQ2FsbGJhY2sgPSAoZXJyb3I6IEF4aW9zRXJyb3IgfCBBeGlvc1Jlc3BvbnNlKSA9PiBhbnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXNzaW9uVW5hdXRob3JpemVkSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xyXG4gIGVycm9yQ29kZXM6IG51bWJlcltdO1xyXG4gIG9uVW5hdXRob3JpemVkU3RhdHVzOiBTZXNzaW9uVW5hdXRob3JpemVkQ2FsbGJhY2s7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9uVW5hdXRob3JpemVkU3RhdHVzOiBTZXNzaW9uVW5hdXRob3JpemVkQ2FsbGJhY2ssIGVycm9yQ29kZXM6IG51bWJlcltdID0gWzQwMV0pIHtcclxuICAgIHRoaXMub25VbmF1dGhvcml6ZWRTdGF0dXMgPSBvblVuYXV0aG9yaXplZFN0YXR1cztcclxuICAgIHRoaXMuZXJyb3JDb2RlcyA9IGVycm9yQ29kZXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgcmVxdWVzdChyZXF1ZXN0OiBBeGlvc1JlcXVlc3RDb25maWcpIHtcclxuICAgIHJldHVybiByZXF1ZXN0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHJlc3BvbnNlKHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlKSB7XHJcbiAgICAvLyBBcyBheGlvcyBpcyBjYWxsaW5nIHRoaXMgaW50ZXJjZXB0b3IgZXZlbiB3aGVuIHRoZSBzdGF0dXMgY29kZSBpcyA0MDAgb3IgaGlnaGVyXHJcbiAgICAvLyBUaGlzIGhhY2sgaXMgbmVlZGVkIHRvIGFjdHVhbGx5IGNhbGwgb25VbmF1dGhvcml6ZWRTdGF0dXMgd2hlbiB0aGVyZSdzIGEgZXJyb3JcclxuICAgIC8vIEFzIHRoZSBlcnJvciBvYmplY3QgaGFzIGEgZGlmZmVyZW50IHN0cnVjdHVyZSBhbmQgdGhlIHN0YXR1cyBjb2RlIGlzIGluc2lkZSBlcnJvci5yZXNwb25zZVxyXG4gICAgY29uc3QgYWN0dWFsUmVzcG9uc2UgPSAocmVzcG9uc2UgYXMgYW55KS5yZXNwb25zZSB8fCByZXNwb25zZTtcclxuICAgIGlmIChhY3R1YWxSZXNwb25zZSAmJiB0aGlzLmVycm9yQ29kZXMuaW5kZXhPZihhY3R1YWxSZXNwb25zZS5zdGF0dXMpID49IDApIHtcclxuICAgICAgdGhpcy5vblVuYXV0aG9yaXplZFN0YXR1cyhhY3R1YWxSZXNwb25zZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWN0dWFsUmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgZXJyb3IoZXJyb3I6IEF4aW9zRXJyb3IpIHtcclxuICAgIGlmIChlcnJvciAmJiBlcnJvci5yZXNwb25zZSAmJiB0aGlzLmVycm9yQ29kZXMuaW5kZXhPZihlcnJvci5yZXNwb25zZS5zdGF0dXMpID49IDApIHtcclxuICAgICAgdGhpcy5vblVuYXV0aG9yaXplZFN0YXR1cyhlcnJvcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXJyb3I7XHJcbiAgfVxyXG59XHJcbiJdfQ==