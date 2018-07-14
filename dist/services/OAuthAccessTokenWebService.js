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
const base_1 = require("../base");
const models_1 = require("../models");
const utils_1 = require("../utils");
class OAuthAccessTokenWebService extends base_1.Http {
    constructor(options) {
        super(options);
        if (options.session) {
            this.interceptors(options.session.interceptors());
        }
    }
    static getInstance(options) {
        if (!this.instance) {
            this.instance = new OAuthAccessTokenWebService(options);
        }
        return this.instance;
    }
    /**
     * Finds {#OAuthAccessToken} with a given query
     * @param query The query of the search
     */
    find(query = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get('/tokens', query);
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((token) => new models_1.OAuthAccessToken(token));
            return utils_1.PaginationUtil.parse(result, response.headers);
        });
    }
    /**
     * Find a {#OAuthAccessToken} by giving it's User ID
     * @param id The id of the {#OAuthAccessToken}.
     */
    findByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get(`/tokens`, { user });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new models_1.OAuthAccessToken(response.data);
        });
    }
}
exports.default = OAuthAccessTokenWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhBY2Nlc3NUb2tlbldlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvT0F1dGhBY2Nlc3NUb2tlbldlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLGtDQUE0QztBQUM1QyxzQ0FBNkM7QUFDN0Msb0NBQTBEO0FBTTFELGdDQUFnRCxTQUFRLFdBQUk7SUFJMUQsWUFBWSxPQUEwQztRQUNwRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUEwQztRQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekQ7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRztJQUNVLElBQUksQ0FBQyxRQUFhLEVBQUU7O1lBQy9CLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFbEQsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCwrREFBK0Q7WUFDL0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLElBQUkseUJBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM5RSxPQUFPLHNCQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEQsQ0FBQztLQUFBO0lBRUQ7OztPQUdHO0lBQ1UsVUFBVSxDQUFDLElBQVk7O1lBQ2xDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRXJELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLHlCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDO0tBQUE7Q0FDRjtBQS9DRCw2Q0ErQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vc2Vzc2lvbic7XG5pbXBvcnQgeyBIdHRwLCBIdHRwT3B0aW9ucyB9IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IHsgT0F1dGhBY2Nlc3NUb2tlbiB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uVXRpbCwgUGFnaW5hdGVkQXJyYXkgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT0F1dGhBY2Nlc3NUb2tlbldlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgSHR0cE9wdGlvbnMge1xuICBzZXNzaW9uPzogU2Vzc2lvbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0F1dGhBY2Nlc3NUb2tlbldlYlNlcnZpY2UgZXh0ZW5kcyBIdHRwIHtcbiAgcHJvdGVjdGVkIG9wdGlvbnM6IE9BdXRoQWNjZXNzVG9rZW5XZWJTZXJ2aWNlT3B0aW9ucztcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogT0F1dGhBY2Nlc3NUb2tlbldlYlNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogT0F1dGhBY2Nlc3NUb2tlbldlYlNlcnZpY2VPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMuc2Vzc2lvbikge1xuICAgICAgdGhpcy5pbnRlcmNlcHRvcnMob3B0aW9ucy5zZXNzaW9uLmludGVyY2VwdG9ycygpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKG9wdGlvbnM6IE9BdXRoQWNjZXNzVG9rZW5XZWJTZXJ2aWNlT3B0aW9ucyk6IE9BdXRoQWNjZXNzVG9rZW5XZWJTZXJ2aWNlIHtcbiAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgT0F1dGhBY2Nlc3NUb2tlbldlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIHsjT0F1dGhBY2Nlc3NUb2tlbn0gd2l0aCBhIGdpdmVuIHF1ZXJ5XG4gICAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkgb2YgdGhlIHNlYXJjaFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmQocXVlcnk6IGFueSA9IHt9KTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxPQXV0aEFjY2Vzc1Rva2VuPj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXQoJy90b2tlbnMnLCBxdWVyeSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBwYWdpbmF0ZWQgYXJyYXkgd2l0aCBjb3VudCBpbmZvcm1hdGlvbiBmcm9tIGhlYWRlcnNcbiAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5kYXRhLm1hcCgodG9rZW46IGFueSkgPT4gbmV3IE9BdXRoQWNjZXNzVG9rZW4odG9rZW4pKTtcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgeyNPQXV0aEFjY2Vzc1Rva2VufSBieSBnaXZpbmcgaXQncyBVc2VyIElEXG4gICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHsjT0F1dGhBY2Nlc3NUb2tlbn0uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmluZEJ5VXNlcih1c2VyOiBzdHJpbmcpOiBQcm9taXNlPE9BdXRoQWNjZXNzVG9rZW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0KGAvdG9rZW5zYCwgeyB1c2VyIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBPQXV0aEFjY2Vzc1Rva2VuKHJlc3BvbnNlLmRhdGEpO1xuICB9XG59XG4iXX0=