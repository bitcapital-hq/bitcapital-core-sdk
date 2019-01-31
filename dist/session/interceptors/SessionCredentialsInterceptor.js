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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc2Vzc2lvbi9pbnRlcmNlcHRvcnMvU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLE1BQXFCLDZCQUE2QjtJQUdoRCxZQUFZLE9BQWdCO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFWSxPQUFPLENBQUMsT0FBMkI7O1lBQzlDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUV4RixJQUFJLFdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ3BELE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsVUFBVSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDeEU7WUFDRCxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUMsUUFBdUI7O1lBQzNDLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVZLEtBQUssQ0FBQyxLQUFpQjs7WUFDbEMsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0tBQUE7Q0FDRjtBQXZCRCxnREF1QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBeGlvc0Vycm9yLCBBeGlvc1JlcXVlc3RDb25maWcsIEF4aW9zUmVzcG9uc2UgfSBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IFNlc3Npb24gZnJvbSBcIi4uL1Nlc3Npb25cIjtcclxuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXNzaW9uQ3JlZGVudGlhbHNJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XHJcbiAgc2Vzc2lvbjogU2Vzc2lvbjtcclxuXHJcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbjogU2Vzc2lvbikge1xyXG4gICAgdGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0KHJlcXVlc3Q6IEF4aW9zUmVxdWVzdENvbmZpZykge1xyXG4gICAgY29uc3QgY3JlZGVudGlhbHMgPSB0aGlzLnNlc3Npb24uY3VycmVudCA/IHRoaXMuc2Vzc2lvbi5jdXJyZW50LmNyZWRlbnRpYWxzIDogdW5kZWZpbmVkO1xyXG5cclxuICAgIGlmIChjcmVkZW50aWFscyAmJiAhcmVxdWVzdC5oZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSkge1xyXG4gICAgICByZXF1ZXN0LmhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdID0gYEJlYXJlciAke2NyZWRlbnRpYWxzLmFjY2Vzc1Rva2VufWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVxdWVzdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyByZXNwb25zZShyZXNwb25zZTogQXhpb3NSZXNwb25zZSkge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGVycm9yKGVycm9yOiBBeGlvc0Vycm9yKSB7XHJcbiAgICByZXR1cm4gZXJyb3I7XHJcbiAgfVxyXG59XHJcbiJdfQ==