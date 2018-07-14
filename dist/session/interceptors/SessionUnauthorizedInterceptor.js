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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3Nlc3Npb24vaW50ZXJjZXB0b3JzL1Nlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0E7SUFJRSxZQUFZLG9CQUFpRCxFQUFFLGFBQXVCLENBQUMsR0FBRyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRVksT0FBTyxDQUFDLE9BQTJCOztZQUM5QyxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUMsUUFBdUI7O1lBQzNDLGtGQUFrRjtZQUNsRixpRkFBaUY7WUFDakYsNkZBQTZGO1lBQzdGLE1BQU0sY0FBYyxHQUFJLFFBQWdCLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQztZQUM5RCxJQUFJLGNBQWMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6RSxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDM0M7WUFDRCxPQUFPLGNBQWMsQ0FBQztRQUN4QixDQUFDO0tBQUE7SUFFWSxLQUFLLENBQUMsS0FBaUI7O1lBQ2xDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xGLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0NBQ0Y7QUE5QkQsaURBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXhpb3NSZXF1ZXN0Q29uZmlnLCBBeGlvc0Vycm9yLCBBeGlvc1Jlc3BvbnNlIH0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yIH0gZnJvbSAnLi4vLi4vYmFzZSc7XG5cbmV4cG9ydCB0eXBlIFNlc3Npb25VbmF1dGhvcml6ZWRDYWxsYmFjayA9IChlcnJvcjogQXhpb3NFcnJvciB8IEF4aW9zUmVzcG9uc2UpID0+IGFueTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgZXJyb3JDb2RlczogbnVtYmVyW107XG4gIG9uVW5hdXRob3JpemVkU3RhdHVzOiBTZXNzaW9uVW5hdXRob3JpemVkQ2FsbGJhY2s7XG5cbiAgY29uc3RydWN0b3Iob25VbmF1dGhvcml6ZWRTdGF0dXM6IFNlc3Npb25VbmF1dGhvcml6ZWRDYWxsYmFjaywgZXJyb3JDb2RlczogbnVtYmVyW10gPSBbNDAxXSkge1xuICAgIHRoaXMub25VbmF1dGhvcml6ZWRTdGF0dXMgPSBvblVuYXV0aG9yaXplZFN0YXR1cztcbiAgICB0aGlzLmVycm9yQ29kZXMgPSBlcnJvckNvZGVzO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlcXVlc3QocmVxdWVzdDogQXhpb3NSZXF1ZXN0Q29uZmlnKSB7XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVzcG9uc2UocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2UpIHtcbiAgICAvLyBBcyBheGlvcyBpcyBjYWxsaW5nIHRoaXMgaW50ZXJjZXB0b3IgZXZlbiB3aGVuIHRoZSBzdGF0dXMgY29kZSBpcyA0MDAgb3IgaGlnaGVyXG4gICAgLy8gVGhpcyBoYWNrIGlzIG5lZWRlZCB0byBhY3R1YWxseSBjYWxsIG9uVW5hdXRob3JpemVkU3RhdHVzIHdoZW4gdGhlcmUncyBhIGVycm9yXG4gICAgLy8gQXMgdGhlIGVycm9yIG9iamVjdCBoYXMgYSBkaWZmZXJlbnQgc3RydWN0dXJlIGFuZCB0aGUgc3RhdHVzIGNvZGUgaXMgaW5zaWRlIGVycm9yLnJlc3BvbnNlXG4gICAgY29uc3QgYWN0dWFsUmVzcG9uc2UgPSAocmVzcG9uc2UgYXMgYW55KS5yZXNwb25zZSB8fCByZXNwb25zZTtcbiAgICBpZiAoYWN0dWFsUmVzcG9uc2UgJiYgdGhpcy5lcnJvckNvZGVzLmluZGV4T2YoYWN0dWFsUmVzcG9uc2Uuc3RhdHVzKSA+PSAwKSB7XG4gICAgICB0aGlzLm9uVW5hdXRob3JpemVkU3RhdHVzKGFjdHVhbFJlc3BvbnNlKTtcbiAgICB9XG4gICAgcmV0dXJuIGFjdHVhbFJlc3BvbnNlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGVycm9yKGVycm9yOiBBeGlvc0Vycm9yKSB7XG4gICAgaWYgKGVycm9yICYmIGVycm9yLnJlc3BvbnNlICYmIHRoaXMuZXJyb3JDb2Rlcy5pbmRleE9mKGVycm9yLnJlc3BvbnNlLnN0YXR1cykgPj0gMCkge1xuICAgICAgdGhpcy5vblVuYXV0aG9yaXplZFN0YXR1cyhlcnJvcik7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfVxufVxuIl19