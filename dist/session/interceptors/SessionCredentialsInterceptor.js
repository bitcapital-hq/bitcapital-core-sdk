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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc2Vzc2lvbi9pbnRlcmNlcHRvcnMvU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLE1BQXFCLDZCQUE2QjtJQUdoRCxZQUFZLE9BQWdCO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFWSxPQUFPLENBQUMsT0FBMkI7O1lBQzlDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUV4RixJQUFJLFdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ3BELE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsVUFBVSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDeEU7WUFDRCxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUMsUUFBdUI7O1lBQzNDLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVZLEtBQUssQ0FBQyxLQUFpQjs7WUFDbEMsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0tBQUE7Q0FDRjtBQXZCRCxnREF1QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBeGlvc0Vycm9yLCBBeGlvc1JlcXVlc3RDb25maWcsIEF4aW9zUmVzcG9uc2UgfSBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCBTZXNzaW9uIGZyb20gXCIuLi9TZXNzaW9uXCI7XG5pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3IgfSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vzc2lvbkNyZWRlbnRpYWxzSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBzZXNzaW9uOiBTZXNzaW9uO1xuXG4gIGNvbnN0cnVjdG9yKHNlc3Npb246IFNlc3Npb24pIHtcbiAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlcXVlc3QocmVxdWVzdDogQXhpb3NSZXF1ZXN0Q29uZmlnKSB7XG4gICAgY29uc3QgY3JlZGVudGlhbHMgPSB0aGlzLnNlc3Npb24uY3VycmVudCA/IHRoaXMuc2Vzc2lvbi5jdXJyZW50LmNyZWRlbnRpYWxzIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGNyZWRlbnRpYWxzICYmICFyZXF1ZXN0LmhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdKSB7XG4gICAgICByZXF1ZXN0LmhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdID0gYEJlYXJlciAke2NyZWRlbnRpYWxzLmFjY2Vzc1Rva2VufWA7XG4gICAgfVxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlc3BvbnNlKHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGVycm9yKGVycm9yOiBBeGlvc0Vycm9yKSB7XG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG59XG4iXX0=