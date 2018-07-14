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
class SessionCredentialsInterceptor {
    constructor(session) {
        this.session = session;
    }
    request(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = this.session.current ? this.session.current.credentials : undefined;
            if (credentials && !request.headers['Authorization']) {
                request.headers['Authorization'] = `Bearer ${credentials.accessToken}`;
            }
            return request;
        });
    }
    response(response) {
        return __awaiter(this, void 0, void 0, function* () {
            return response;
        });
    }
    error(error) {
        return __awaiter(this, void 0, void 0, function* () {
            return error;
        });
    }
}
exports.default = SessionCredentialsInterceptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc2Vzc2lvbi9pbnRlcmNlcHRvcnMvU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBO0lBR0UsWUFBWSxPQUFnQjtRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRVksT0FBTyxDQUFDLE9BQTJCOztZQUM5QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFFeEYsSUFBSSxXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUNwRCxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLFVBQVUsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3hFO1lBQ0QsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQztLQUFBO0lBRVksUUFBUSxDQUFDLFFBQXVCOztZQUMzQyxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFFWSxLQUFLLENBQUMsS0FBaUI7O1lBQ2xDLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0NBQ0Y7QUF2QkQsZ0RBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXhpb3NFcnJvciwgQXhpb3NSZXF1ZXN0Q29uZmlnLCBBeGlvc1Jlc3BvbnNlIH0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yIH0gZnJvbSAnLi4vLi4vYmFzZSc7XG5pbXBvcnQgU2Vzc2lvbiBmcm9tICcuLi9TZXNzaW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBzZXNzaW9uOiBTZXNzaW9uO1xuXG4gIGNvbnN0cnVjdG9yKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlcXVlc3QocmVxdWVzdDogQXhpb3NSZXF1ZXN0Q29uZmlnKSB7XG4gICAgY29uc3QgY3JlZGVudGlhbHMgPSB0aGlzLnNlc3Npb24uY3VycmVudCA/IHRoaXMuc2Vzc2lvbi5jdXJyZW50LmNyZWRlbnRpYWxzIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGNyZWRlbnRpYWxzICYmICFyZXF1ZXN0LmhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSkge1xuICAgICAgcmVxdWVzdC5oZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBgQmVhcmVyICR7Y3JlZGVudGlhbHMuYWNjZXNzVG9rZW59YDtcbiAgICB9XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVzcG9uc2UocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2UpIHtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZXJyb3IoZXJyb3I6IEF4aW9zRXJyb3IpIHtcbiAgICByZXR1cm4gZXJyb3I7XG4gIH1cbn1cbiJdfQ==