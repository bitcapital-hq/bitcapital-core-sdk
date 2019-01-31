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
const bitcapital_common_1 = require("bitcapital-common");
const base_1 = require("./base");
class ProductWebService extends base_1.BaseModelWebService {
    constructor(options) {
        super(options);
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new ProductWebService(options);
        return this.instance;
    }
    /**
     * Find all Products.
     */
    findAll(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get("/products", null, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new bitcapital_common_1.Product(item));
            return bitcapital_common_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find a Product.
     *
     * @param id The Product ID.
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/products/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Product(response.data);
        });
    }
}
exports.ProductWebService = ProductWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdFdlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvUHJvZHVjdFdlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlEQU02QjtBQUMzQixpQ0FBeUU7QUFJekUsTUFBYSxpQkFBa0IsU0FBUSwwQkFBMkM7SUFHaEYsWUFBWSxPQUFpQztRQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFpQztRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNVLE9BQU8sQ0FBQyxVQUFzQjs7WUFDekMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVyRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELCtEQUErRDtZQUMvRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksMkJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdFLE9BQU8sa0NBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsT0FBTyxDQUFDLEVBQVU7O1lBQzdCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXhELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLDJCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtDQUNGO0FBOUNELDhDQThDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBQYWdpbmF0aW9uLFxyXG4gICAgUGFnaW5hdGVkQXJyYXksXHJcbiAgICBQYWdpbmF0aW9uVXRpbCxcclxuICAgIFByb2R1Y3QsXHJcbiAgICBQcm9kdWN0U2NoZW1hXHJcbiAgfSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcclxuICBpbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlLCBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2VcIjtcclxuICBcclxuICBleHBvcnQgaW50ZXJmYWNlIFByb2R1Y3RXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIHt9XHJcbiAgXHJcbiAgZXhwb3J0IGNsYXNzIFByb2R1Y3RXZWJTZXJ2aWNlIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZTxQcm9kdWN0LCBQcm9kdWN0U2NoZW1hPiB7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBQcm9kdWN0V2ViU2VydmljZTtcclxuICBcclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFByb2R1Y3RXZWJTZXJ2aWNlT3B0aW9ucykge1xyXG4gICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIH1cclxuICBcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUHJvZHVjdFdlYlNlcnZpY2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuICBcclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBQcm9kdWN0V2ViU2VydmljZU9wdGlvbnMpOiBQcm9kdWN0V2ViU2VydmljZSB7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUHJvZHVjdFdlYlNlcnZpY2Uob3B0aW9ucyk7XHJcbiAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kIGFsbCBQcm9kdWN0cy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGZpbmRBbGwocGFnaW5hdGlvbjogUGFnaW5hdGlvbik6IFByb21pc2U8UGFnaW5hdGVkQXJyYXk8UHJvZHVjdD4+IHtcclxuICAgICAgY29uc3QgeyBza2lwLCBsaW1pdCB9ID0gcGFnaW5hdGlvbjtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KFwiL3Byb2R1Y3RzXCIsIG51bGwsIHsgcGFyYW1zOiB7IHNraXAsIGxpbWl0IH0gfSk7XHJcbiAgXHJcbiAgICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICAvLyBSZXR1cm4gYSBwYWdpbmF0ZWQgYXJyYXkgd2l0aCBjb3VudCBpbmZvcm1hdGlvbiBmcm9tIGhlYWRlcnNcclxuICAgICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YS5tYXAoKGl0ZW06IFByb2R1Y3RTY2hlbWEpID0+IG5ldyBQcm9kdWN0KGl0ZW0pKTtcclxuICAgICAgcmV0dXJuIFBhZ2luYXRpb25VdGlsLnBhcnNlKHJlc3VsdCwgcmVzcG9uc2UuaGVhZGVycyk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIEZpbmQgYSBQcm9kdWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBpZCBUaGUgUHJvZHVjdCBJRC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGZpbmRPbmUoaWQ6IHN0cmluZyk6IFByb21pc2U8UHJvZHVjdD4ge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9wcm9kdWN0cy8ke2lkfWApO1xyXG4gIFxyXG4gICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgcmV0dXJuIG5ldyBQcm9kdWN0KHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gIH1cclxuICAiXX0=