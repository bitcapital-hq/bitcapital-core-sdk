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
            if (credentials && !request.headers["Authorization"]) {
                request.headers["Authorization"] = `Bearer ${credentials.accessToken}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc2Vzc2lvbi9pbnRlcmNlcHRvcnMvU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBO0lBR0UsWUFBWSxPQUFnQjtRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRVksT0FBTyxDQUFDLE9BQTJCOztZQUM5QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFFeEYsSUFBSSxXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUNwRCxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLFVBQVUsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3hFO1lBQ0QsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQztLQUFBO0lBRVksUUFBUSxDQUFDLFFBQXVCOztZQUMzQyxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFFWSxLQUFLLENBQUMsS0FBaUI7O1lBQ2xDLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0NBQ0Y7QUF2QkQsZ0RBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXhpb3NFcnJvciwgQXhpb3NSZXF1ZXN0Q29uZmlnLCBBeGlvc1Jlc3BvbnNlIH0gZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgU2Vzc2lvbiBmcm9tIFwiLi4vU2Vzc2lvblwiO1xuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlc3Npb25DcmVkZW50aWFsc0ludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgc2Vzc2lvbjogU2Vzc2lvbjtcblxuICBjb25zdHJ1Y3RvcihzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0KHJlcXVlc3Q6IEF4aW9zUmVxdWVzdENvbmZpZykge1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gdGhpcy5zZXNzaW9uLmN1cnJlbnQgPyB0aGlzLnNlc3Npb24uY3VycmVudC5jcmVkZW50aWFscyA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChjcmVkZW50aWFscyAmJiAhcmVxdWVzdC5oZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSkge1xuICAgICAgcmVxdWVzdC5oZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IGBCZWFyZXIgJHtjcmVkZW50aWFscy5hY2Nlc3NUb2tlbn1gO1xuICAgIH1cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZXNwb25zZShyZXNwb25zZTogQXhpb3NSZXNwb25zZSkge1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBlcnJvcihlcnJvcjogQXhpb3NFcnJvcikge1xuICAgIHJldHVybiBlcnJvcjtcbiAgfVxufVxuIl19