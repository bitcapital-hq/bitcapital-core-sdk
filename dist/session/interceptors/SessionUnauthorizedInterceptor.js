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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3Nlc3Npb24vaW50ZXJjZXB0b3JzL1Nlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0E7SUFJRSxZQUFZLG9CQUFpRCxFQUFFLGFBQXVCLENBQUMsR0FBRyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRVksT0FBTyxDQUFDLE9BQTJCOztZQUM5QyxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUMsUUFBdUI7O1lBQzNDLGtGQUFrRjtZQUNsRixpRkFBaUY7WUFDakYsNkZBQTZGO1lBQzdGLE1BQU0sY0FBYyxHQUFJLFFBQWdCLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQztZQUM5RCxJQUFJLGNBQWMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6RSxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDM0M7WUFDRCxPQUFPLGNBQWMsQ0FBQztRQUN4QixDQUFDO0tBQUE7SUFFWSxLQUFLLENBQUMsS0FBaUI7O1lBQ2xDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xGLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0NBQ0Y7QUE5QkQsaURBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXhpb3NSZXF1ZXN0Q29uZmlnLCBBeGlvc0Vycm9yLCBBeGlvc1Jlc3BvbnNlIH0gZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3IgfSBmcm9tIFwiLi4vLi4vYmFzZVwiO1xuXG5leHBvcnQgdHlwZSBTZXNzaW9uVW5hdXRob3JpemVkQ2FsbGJhY2sgPSAoZXJyb3I6IEF4aW9zRXJyb3IgfCBBeGlvc1Jlc3BvbnNlKSA9PiBhbnk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIGVycm9yQ29kZXM6IG51bWJlcltdO1xuICBvblVuYXV0aG9yaXplZFN0YXR1czogU2Vzc2lvblVuYXV0aG9yaXplZENhbGxiYWNrO1xuXG4gIGNvbnN0cnVjdG9yKG9uVW5hdXRob3JpemVkU3RhdHVzOiBTZXNzaW9uVW5hdXRob3JpemVkQ2FsbGJhY2ssIGVycm9yQ29kZXM6IG51bWJlcltdID0gWzQwMV0pIHtcbiAgICB0aGlzLm9uVW5hdXRob3JpemVkU3RhdHVzID0gb25VbmF1dGhvcml6ZWRTdGF0dXM7XG4gICAgdGhpcy5lcnJvckNvZGVzID0gZXJyb3JDb2RlcztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0KHJlcXVlc3Q6IEF4aW9zUmVxdWVzdENvbmZpZykge1xuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlc3BvbnNlKHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlKSB7XG4gICAgLy8gQXMgYXhpb3MgaXMgY2FsbGluZyB0aGlzIGludGVyY2VwdG9yIGV2ZW4gd2hlbiB0aGUgc3RhdHVzIGNvZGUgaXMgNDAwIG9yIGhpZ2hlclxuICAgIC8vIFRoaXMgaGFjayBpcyBuZWVkZWQgdG8gYWN0dWFsbHkgY2FsbCBvblVuYXV0aG9yaXplZFN0YXR1cyB3aGVuIHRoZXJlJ3MgYSBlcnJvclxuICAgIC8vIEFzIHRoZSBlcnJvciBvYmplY3QgaGFzIGEgZGlmZmVyZW50IHN0cnVjdHVyZSBhbmQgdGhlIHN0YXR1cyBjb2RlIGlzIGluc2lkZSBlcnJvci5yZXNwb25zZVxuICAgIGNvbnN0IGFjdHVhbFJlc3BvbnNlID0gKHJlc3BvbnNlIGFzIGFueSkucmVzcG9uc2UgfHwgcmVzcG9uc2U7XG4gICAgaWYgKGFjdHVhbFJlc3BvbnNlICYmIHRoaXMuZXJyb3JDb2Rlcy5pbmRleE9mKGFjdHVhbFJlc3BvbnNlLnN0YXR1cykgPj0gMCkge1xuICAgICAgdGhpcy5vblVuYXV0aG9yaXplZFN0YXR1cyhhY3R1YWxSZXNwb25zZSk7XG4gICAgfVxuICAgIHJldHVybiBhY3R1YWxSZXNwb25zZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBlcnJvcihlcnJvcjogQXhpb3NFcnJvcikge1xuICAgIGlmIChlcnJvciAmJiBlcnJvci5yZXNwb25zZSAmJiB0aGlzLmVycm9yQ29kZXMuaW5kZXhPZihlcnJvci5yZXNwb25zZS5zdGF0dXMpID49IDApIHtcbiAgICAgIHRoaXMub25VbmF1dGhvcml6ZWRTdGF0dXMoZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gZXJyb3I7XG4gIH1cbn1cbiJdfQ==