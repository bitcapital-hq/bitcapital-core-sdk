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
}
exports.CardWebService = CardWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZFdlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvQ2FyZFdlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9FQUE2RjtBQUM3Rix5REFNMkI7QUFJM0IsTUFBYSxjQUFlLFNBQVEseUNBQXFDO0lBR3ZFLFlBQVksT0FBOEI7UUFDeEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBOEI7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1UsS0FBSyxDQUFDLE1BQWMsRUFBRSxPQUErQjs7WUFDaEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU0sVUFBVSxPQUFPLENBQUMsTUFBTSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFakcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsT0FBTyxDQUFDLE1BQWMsRUFBRSxPQUFpQzs7WUFDcEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU0sVUFBVSxPQUFPLENBQUMsTUFBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFbkcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsUUFBUSxDQUFDLE1BQWMsRUFBRSxPQUE4Qjs7WUFDbEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU0sVUFBVSxPQUFPLENBQUMsTUFBTSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFcEcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVZLE9BQU8sQ0FBQyxNQUFjLEVBQUUsT0FBZTs7WUFDbEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLE1BQU0sVUFBVSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRTFFLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUMxRCxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSx3QkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQUE7Q0FDRjtBQXpFRCx3Q0F5RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlLCBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2UvQmFzZU1vZGVsV2ViU2VydmljZVwiO1xuaW1wb3J0IHtcbiAgQ2FyZCxcbiAgQ2FyZFNjaGVtYSxcbiAgQ2FyZEJsb2NrUmVxdWVzdFNjaGVtYSxcbiAgQ2FyZFVuYmxvY2tSZXF1ZXN0U2NoZW1hLFxuICBDYXJkQmFzZVJlcXVlc3RTY2hlbWFcbn0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FyZFdlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cblxuZXhwb3J0IGNsYXNzIENhcmRXZWJTZXJ2aWNlIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZTxDYXJkLCBDYXJkU2NoZW1hPiB7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IENhcmRXZWJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IENhcmRXZWJTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBDYXJkV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogQ2FyZFdlYlNlcnZpY2VPcHRpb25zKTogQ2FyZFdlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgQ2FyZFdlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogQmxvY2tzIGNhcmQgd2l0aCB0aGUgZ2l2ZW4gSURcbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZCAgVGhlIHVzZXIgSURcbiAgICogQHBhcmFtIHBheWxvYWQgVGhlIGRhdGEgcmVxdWlyZWQgZm9yIHRoZSBjYXJkIGJsb2NraW5nIG9wZXJhdGlvblxuICAgKi9cbiAgcHVibGljIGFzeW5jIGJsb2NrKHVzZXJJZDogc3RyaW5nLCBwYXlsb2FkOiBDYXJkQmxvY2tSZXF1ZXN0U2NoZW1hKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL3VzZXJzLyR7dXNlcklkfS9jYXJkcy8ke3BheWxvYWQuY2FyZElkfS9ibG9ja2AsIHBheWxvYWQpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVW5ibG9ja3MgY2FyZCB3aXRoIHRoZSBnaXZlbiBJRFxuICAgKlxuICAgKiBAcGFyYW0gdXNlcklkICBUaGUgdXNlciBJRFxuICAgKiBAcGFyYW0gcGF5bG9hZCBUaGUgZGF0YSByZXF1aXJlZCBmb3IgdGhlIGNhcmQgdW5ibG9ja2luZyBvcGVyYXRpb25cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1bmJsb2NrKHVzZXJJZDogc3RyaW5nLCBwYXlsb2FkOiBDYXJkVW5ibG9ja1JlcXVlc3RTY2hlbWEpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvdXNlcnMvJHt1c2VySWR9L2NhcmRzLyR7cGF5bG9hZC5jYXJkSWR9L3VuYmxvY2tgLCBwYXlsb2FkKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlcyBjYXJkIHdpdGggdGhlIGdpdmVuIElEXG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWQgIFRoZSB1c2VyIElEXG4gICAqIEBwYXJhbSBwYXlsb2FkIFRoZSBkYXRhIHJlcXVpcmVkIGZvciB0aGUgY2FyZCBhY3RpdmF0aW9uIG9wZXJhdGlvblxuICAgKi9cbiAgcHVibGljIGFzeW5jIGFjdGl2YXRlKHVzZXJJZDogc3RyaW5nLCBwYXlsb2FkOiBDYXJkQmFzZVJlcXVlc3RTY2hlbWEpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvdXNlcnMvJHt1c2VySWR9L2NhcmRzLyR7cGF5bG9hZC5jYXJkSWR9L2FjdGl2YXRlYCwgcGF5bG9hZCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBmaW5kT25lKHVzZXJJZDogc3RyaW5nLCBjYXJkc0lkOiBzdHJpbmcpOiBQcm9taXNlPENhcmQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC91c2Vycy8ke3VzZXJJZH0vY2FyZHMvJHtjYXJkc0lkfWApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCAhcmVzcG9uc2UuZGF0YSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBDYXJkKHJlc3BvbnNlLmRhdGEpO1xuICB9XG59XG4iXX0=