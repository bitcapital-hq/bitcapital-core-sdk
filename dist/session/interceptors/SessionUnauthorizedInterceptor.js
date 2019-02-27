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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvblVuYXV0aG9yaXplZEludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3Nlc3Npb24vaW50ZXJjZXB0b3JzL1Nlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsTUFBcUIsOEJBQThCO0lBSWpELFlBQVksb0JBQWlELEVBQUUsYUFBdUIsQ0FBQyxHQUFHLENBQUM7UUFDekYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFWSxPQUFPLENBQUMsT0FBMkI7O1lBQzlDLE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUM7S0FBQTtJQUVZLFFBQVEsQ0FBQyxRQUF1Qjs7WUFDM0Msa0ZBQWtGO1lBQ2xGLGlGQUFpRjtZQUNqRiw2RkFBNkY7WUFDN0YsTUFBTSxjQUFjLEdBQUksUUFBZ0IsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDO1lBQzlELElBQUksY0FBYyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUMzQztZQUNELE9BQU8sY0FBYyxDQUFDO1FBQ3hCLENBQUM7S0FBQTtJQUVZLEtBQUssQ0FBQyxLQUFpQjs7WUFDbEMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0tBQUE7Q0FDRjtBQTlCRCxpREE4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBeGlvc1JlcXVlc3RDb25maWcsIEF4aW9zRXJyb3IsIEF4aW9zUmVzcG9uc2UgfSBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IEh0dHBJbnRlcmNlcHRvciB9IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xuXG5leHBvcnQgdHlwZSBTZXNzaW9uVW5hdXRob3JpemVkQ2FsbGJhY2sgPSAoZXJyb3I6IEF4aW9zRXJyb3IgfCBBeGlvc1Jlc3BvbnNlKSA9PiBhbnk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlc3Npb25VbmF1dGhvcml6ZWRJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIGVycm9yQ29kZXM6IG51bWJlcltdO1xuICBvblVuYXV0aG9yaXplZFN0YXR1czogU2Vzc2lvblVuYXV0aG9yaXplZENhbGxiYWNrO1xuXG4gIGNvbnN0cnVjdG9yKG9uVW5hdXRob3JpemVkU3RhdHVzOiBTZXNzaW9uVW5hdXRob3JpemVkQ2FsbGJhY2ssIGVycm9yQ29kZXM6IG51bWJlcltdID0gWzQwMV0pIHtcbiAgICB0aGlzLm9uVW5hdXRob3JpemVkU3RhdHVzID0gb25VbmF1dGhvcml6ZWRTdGF0dXM7XG4gICAgdGhpcy5lcnJvckNvZGVzID0gZXJyb3JDb2RlcztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0KHJlcXVlc3Q6IEF4aW9zUmVxdWVzdENvbmZpZykge1xuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlc3BvbnNlKHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlKSB7XG4gICAgLy8gQXMgYXhpb3MgaXMgY2FsbGluZyB0aGlzIGludGVyY2VwdG9yIGV2ZW4gd2hlbiB0aGUgc3RhdHVzIGNvZGUgaXMgNDAwIG9yIGhpZ2hlclxuICAgIC8vIFRoaXMgaGFjayBpcyBuZWVkZWQgdG8gYWN0dWFsbHkgY2FsbCBvblVuYXV0aG9yaXplZFN0YXR1cyB3aGVuIHRoZXJlJ3MgYSBlcnJvclxuICAgIC8vIEFzIHRoZSBlcnJvciBvYmplY3QgaGFzIGEgZGlmZmVyZW50IHN0cnVjdHVyZSBhbmQgdGhlIHN0YXR1cyBjb2RlIGlzIGluc2lkZSBlcnJvci5yZXNwb25zZVxuICAgIGNvbnN0IGFjdHVhbFJlc3BvbnNlID0gKHJlc3BvbnNlIGFzIGFueSkucmVzcG9uc2UgfHwgcmVzcG9uc2U7XG4gICAgaWYgKGFjdHVhbFJlc3BvbnNlICYmIHRoaXMuZXJyb3JDb2Rlcy5pbmRleE9mKGFjdHVhbFJlc3BvbnNlLnN0YXR1cykgPj0gMCkge1xuICAgICAgdGhpcy5vblVuYXV0aG9yaXplZFN0YXR1cyhhY3R1YWxSZXNwb25zZSk7XG4gICAgfVxuICAgIHJldHVybiBhY3R1YWxSZXNwb25zZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBlcnJvcihlcnJvcjogQXhpb3NFcnJvcikge1xuICAgIGlmIChlcnJvciAmJiBlcnJvci5yZXNwb25zZSAmJiB0aGlzLmVycm9yQ29kZXMuaW5kZXhPZihlcnJvci5yZXNwb25zZS5zdGF0dXMpID49IDApIHtcbiAgICAgIHRoaXMub25VbmF1dGhvcml6ZWRTdGF0dXMoZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gZXJyb3I7XG4gIH1cbn1cbiJdfQ==