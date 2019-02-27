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
const BaseModelWebService_1 = require("./base/BaseModelWebService");
const bitcapital_common_1 = require("bitcapital-common");
class CardWebService extends BaseModelWebService_1.BaseModelWebService {
    constructor(options) {
        super(options);
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new CardWebService(options);
        return this.instance;
    }
    /**
     * Blocks card with the given ID
     *
     * @param userId  The user ID
     * @param payload The data required for the card blocking operation
     */
    block(userId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/users/${userId}/cards/${payload.cardId}/block`, payload);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
    /**
     * Unblocks card with the given ID
     *
     * @param userId  The user ID
     * @param payload The data required for the card unblocking operation
     */
    unblock(userId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/users/${userId}/cards/${payload.cardId}/unblock`, payload);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
    /**
     * Activates card with the given ID
     *
     * @param userId  The user ID
     * @param payload The data required for the card activation operation
     */
    activate(userId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/users/${userId}/cards/${payload.cardId}/activate`, payload);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
    findOne(userId, cardsId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/users/${userId}/cards/${cardsId}`);
            if (!response || !response.data || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Card(response.data);
        });
    }
    /**
     * Find the Payments from a Card.
     *
     * @param userId  The user ID
     * @param id      The Card ID.
     */
    findCardPayments(userId, id, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = pagination;
            const response = yield this.http.get(`/users/${userId}/cards/${id}/payments`, null, { params: { skip, limit } });
            if (!response || response.status !== 200) {
                throw response;
            }
            // Return a paginated array with count information from headers
            const result = response.data.map((item) => new bitcapital_common_1.Payment(item));
            return bitcapital_common_1.PaginationUtil.parse(result, response.headers);
        });
    }
}
exports.CardWebService = CardWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZFdlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvQ2FyZFdlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9FQUE2RjtBQUM3Rix5REFXMkI7QUFJM0IsTUFBYSxjQUFlLFNBQVEseUNBQXFDO0lBR3ZFLFlBQVksT0FBOEI7UUFDeEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBOEI7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1UsS0FBSyxDQUFDLE1BQWMsRUFBRSxPQUErQjs7WUFDaEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU0sVUFBVSxPQUFPLENBQUMsTUFBTSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFakcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsT0FBTyxDQUFDLE1BQWMsRUFBRSxPQUFpQzs7WUFDcEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU0sVUFBVSxPQUFPLENBQUMsTUFBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFbkcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsUUFBUSxDQUFDLE1BQWMsRUFBRSxPQUE4Qjs7WUFDbEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU0sVUFBVSxPQUFPLENBQUMsTUFBTSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFcEcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVZLE9BQU8sQ0FBQyxNQUFjLEVBQUUsT0FBZTs7WUFDbEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLE1BQU0sVUFBVSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRTFFLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUMxRCxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSx3QkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLGdCQUFnQixDQUFDLE1BQWMsRUFBRSxFQUFVLEVBQUUsVUFBc0I7O1lBQzlFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxNQUFNLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVqSCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELCtEQUErRDtZQUMvRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksMkJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdFLE9BQU8sa0NBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxDQUFDO0tBQUE7Q0FDRjtBQTVGRCx3Q0E0RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlLCBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2UvQmFzZU1vZGVsV2ViU2VydmljZVwiO1xuaW1wb3J0IHtcbiAgQ2FyZCxcbiAgQ2FyZFNjaGVtYSxcbiAgQ2FyZEJsb2NrUmVxdWVzdFNjaGVtYSxcbiAgQ2FyZFVuYmxvY2tSZXF1ZXN0U2NoZW1hLFxuICBDYXJkQmFzZVJlcXVlc3RTY2hlbWEsXG4gIFBheW1lbnQsXG4gIFBheW1lbnRTY2hlbWEsXG4gIFBhZ2luYXRpb24sXG4gIFBhZ2luYXRlZEFycmF5LFxuICBQYWdpbmF0aW9uVXRpbFxufSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBDYXJkV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxuXG5leHBvcnQgY2xhc3MgQ2FyZFdlYlNlcnZpY2UgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlPENhcmQsIENhcmRTY2hlbWE+IHtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogQ2FyZFdlYlNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogQ2FyZFdlYlNlcnZpY2VPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IENhcmRXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBDYXJkV2ViU2VydmljZU9wdGlvbnMpOiBDYXJkV2ViU2VydmljZSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBDYXJkV2ViU2VydmljZShvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCbG9ja3MgY2FyZCB3aXRoIHRoZSBnaXZlbiBJRFxuICAgKlxuICAgKiBAcGFyYW0gdXNlcklkICBUaGUgdXNlciBJRFxuICAgKiBAcGFyYW0gcGF5bG9hZCBUaGUgZGF0YSByZXF1aXJlZCBmb3IgdGhlIGNhcmQgYmxvY2tpbmcgb3BlcmF0aW9uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYmxvY2sodXNlcklkOiBzdHJpbmcsIHBheWxvYWQ6IENhcmRCbG9ja1JlcXVlc3RTY2hlbWEpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvdXNlcnMvJHt1c2VySWR9L2NhcmRzLyR7cGF5bG9hZC5jYXJkSWR9L2Jsb2NrYCwgcGF5bG9hZCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbmJsb2NrcyBjYXJkIHdpdGggdGhlIGdpdmVuIElEXG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWQgIFRoZSB1c2VyIElEXG4gICAqIEBwYXJhbSBwYXlsb2FkIFRoZSBkYXRhIHJlcXVpcmVkIGZvciB0aGUgY2FyZCB1bmJsb2NraW5nIG9wZXJhdGlvblxuICAgKi9cbiAgcHVibGljIGFzeW5jIHVuYmxvY2sodXNlcklkOiBzdHJpbmcsIHBheWxvYWQ6IENhcmRVbmJsb2NrUmVxdWVzdFNjaGVtYSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC91c2Vycy8ke3VzZXJJZH0vY2FyZHMvJHtwYXlsb2FkLmNhcmRJZH0vdW5ibG9ja2AsIHBheWxvYWQpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQWN0aXZhdGVzIGNhcmQgd2l0aCB0aGUgZ2l2ZW4gSURcbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZCAgVGhlIHVzZXIgSURcbiAgICogQHBhcmFtIHBheWxvYWQgVGhlIGRhdGEgcmVxdWlyZWQgZm9yIHRoZSBjYXJkIGFjdGl2YXRpb24gb3BlcmF0aW9uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYWN0aXZhdGUodXNlcklkOiBzdHJpbmcsIHBheWxvYWQ6IENhcmRCYXNlUmVxdWVzdFNjaGVtYSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC91c2Vycy8ke3VzZXJJZH0vY2FyZHMvJHtwYXlsb2FkLmNhcmRJZH0vYWN0aXZhdGVgLCBwYXlsb2FkKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGZpbmRPbmUodXNlcklkOiBzdHJpbmcsIGNhcmRzSWQ6IHN0cmluZyk6IFByb21pc2U8Q2FyZD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL3VzZXJzLyR7dXNlcklkfS9jYXJkcy8ke2NhcmRzSWR9YCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8ICFyZXNwb25zZS5kYXRhIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENhcmQocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgUGF5bWVudHMgZnJvbSBhIENhcmQuXG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWQgIFRoZSB1c2VyIElEXG4gICAqIEBwYXJhbSBpZCAgICAgIFRoZSBDYXJkIElELlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZpbmRDYXJkUGF5bWVudHModXNlcklkOiBzdHJpbmcsIGlkOiBzdHJpbmcsIHBhZ2luYXRpb246IFBhZ2luYXRpb24pOiBQcm9taXNlPFBhZ2luYXRlZEFycmF5PFBheW1lbnQ+PiB7XG4gICAgY29uc3QgeyBza2lwLCBsaW1pdCB9ID0gcGFnaW5hdGlvbjtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC91c2Vycy8ke3VzZXJJZH0vY2FyZHMvJHtpZH0vcGF5bWVudHNgLCBudWxsLCB7IHBhcmFtczogeyBza2lwLCBsaW1pdCB9IH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGEgcGFnaW5hdGVkIGFycmF5IHdpdGggY291bnQgaW5mb3JtYXRpb24gZnJvbSBoZWFkZXJzXG4gICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YS5tYXAoKGl0ZW06IFBheW1lbnRTY2hlbWEpID0+IG5ldyBQYXltZW50KGl0ZW0pKTtcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcbiAgfVxufVxuIl19