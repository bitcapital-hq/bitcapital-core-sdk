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
     * Emits a new physical card
     *
     * @param userId The user ID
     * @param plasticId The plastic ID
     */
    emitPhysical(userId, plasticId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/users/${userId}/cards/physical`, { plasticId });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Card(response.data);
        });
    }
    /**
     * Emits a new physical card
     *
     * @param userId The user ID
     * @param expirationDate The expiration date
     */
    emitVirtual(userId, expirationDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/users/${userId}/cards/virtual`, { expirationDate });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Card(response.data);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZFdlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvQ2FyZFdlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9FQUE2RjtBQUM3Rix5REFXMkI7QUFJM0IsTUFBYSxjQUFlLFNBQVEseUNBQXFDO0lBR3ZFLFlBQVksT0FBOEI7UUFDeEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBOEI7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1UsWUFBWSxDQUFDLE1BQWMsRUFBRSxTQUFpQjs7WUFDekQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU0saUJBQWlCLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBRXhGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLHdCQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsV0FBVyxDQUFDLE1BQWMsRUFBRSxjQUFvQjs7WUFDM0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU0sZ0JBQWdCLEVBQUUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBRTVGLElB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Q0FBQztRQUN4RCxDQUFDO0tBQUE7Q0FDRjtBQTVIRCx3Q0E0SEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWxXZWJTZXJ2aWNlLCBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCIuL2Jhc2UvQmFzZU1vZGVsV2ViU2VydmljZVwiO1xyXG5pbXBvcnQge1xyXG4gIENhcmQsXHJcbiAgQ2FyZFNjaGVtYSxcclxuICBDYXJkQmxvY2tSZXF1ZXN0U2NoZW1hLFxyXG4gIENhcmRVbmJsb2NrUmVxdWVzdFNjaGVtYSxcclxuICBDYXJkQmFzZVJlcXVlc3RTY2hlbWEsXHJcbiAgUGF5bWVudCxcclxuICBQYXltZW50U2NoZW1hLFxyXG4gIFBhZ2luYXRpb24sXHJcbiAgUGFnaW5hdGVkQXJyYXksXHJcbiAgUGFnaW5hdGlvblV0aWxcclxufSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2FyZFdlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMge31cclxuXHJcbmV4cG9ydCBjbGFzcyBDYXJkV2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8Q2FyZCwgQ2FyZFNjaGVtYT4ge1xyXG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IENhcmRXZWJTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBDYXJkV2ViU2VydmljZU9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBDYXJkV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBDYXJkV2ViU2VydmljZU9wdGlvbnMpOiBDYXJkV2ViU2VydmljZSB7XHJcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IENhcmRXZWJTZXJ2aWNlKG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyBhIG5ldyBwaHlzaWNhbCBjYXJkXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSB1c2VyIElEXHJcbiAgICogQHBhcmFtIHBsYXN0aWNJZCBUaGUgcGxhc3RpYyBJRFxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBlbWl0UGh5c2ljYWwodXNlcklkOiBzdHJpbmcsIHBsYXN0aWNJZDogbnVtYmVyKTogUHJvbWlzZTxDYXJkPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvdXNlcnMvJHt1c2VySWR9L2NhcmRzL3BoeXNpY2FsYCwgeyBwbGFzdGljSWQgfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IENhcmQocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyBhIG5ldyBwaHlzaWNhbCBjYXJkXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlcklkIFRoZSB1c2VyIElEXHJcbiAgICogQHBhcmFtIGV4cGlyYXRpb25EYXRlIFRoZSBleHBpcmF0aW9uIGRhdGVcclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgZW1pdFZpcnR1YWwodXNlcklkOiBzdHJpbmcsIGV4cGlyYXRpb25EYXRlOiBEYXRlKTogUHJvbWlzZTxDYXJkPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvdXNlcnMvJHt1c2VySWR9L2NhcmRzL3ZpcnR1YWxgLCB7IGV4cGlyYXRpb25EYXRlIH0pO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBDYXJkKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmxvY2tzIGNhcmQgd2l0aCB0aGUgZ2l2ZW4gSURcclxuICAgKlxyXG4gICAqIEBwYXJhbSB1c2VySWQgIFRoZSB1c2VyIElEXHJcbiAgICogQHBhcmFtIHBheWxvYWQgVGhlIGRhdGEgcmVxdWlyZWQgZm9yIHRoZSBjYXJkIGJsb2NraW5nIG9wZXJhdGlvblxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBibG9jayh1c2VySWQ6IHN0cmluZywgcGF5bG9hZDogQ2FyZEJsb2NrUmVxdWVzdFNjaGVtYSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL3VzZXJzLyR7dXNlcklkfS9jYXJkcy8ke3BheWxvYWQuY2FyZElkfS9ibG9ja2AsIHBheWxvYWQpO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbmJsb2NrcyBjYXJkIHdpdGggdGhlIGdpdmVuIElEXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlcklkICBUaGUgdXNlciBJRFxyXG4gICAqIEBwYXJhbSBwYXlsb2FkIFRoZSBkYXRhIHJlcXVpcmVkIGZvciB0aGUgY2FyZCB1bmJsb2NraW5nIG9wZXJhdGlvblxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyB1bmJsb2NrKHVzZXJJZDogc3RyaW5nLCBwYXlsb2FkOiBDYXJkVW5ibG9ja1JlcXVlc3RTY2hlbWEpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC91c2Vycy8ke3VzZXJJZH0vY2FyZHMvJHtwYXlsb2FkLmNhcmRJZH0vdW5ibG9ja2AsIHBheWxvYWQpO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZXMgY2FyZCB3aXRoIHRoZSBnaXZlbiBJRFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVzZXJJZCAgVGhlIHVzZXIgSURcclxuICAgKiBAcGFyYW0gcGF5bG9hZCBUaGUgZGF0YSByZXF1aXJlZCBmb3IgdGhlIGNhcmQgYWN0aXZhdGlvbiBvcGVyYXRpb25cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgYWN0aXZhdGUodXNlcklkOiBzdHJpbmcsIHBheWxvYWQ6IENhcmRCYXNlUmVxdWVzdFNjaGVtYSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChgL3VzZXJzLyR7dXNlcklkfS9jYXJkcy8ke3BheWxvYWQuY2FyZElkfS9hY3RpdmF0ZWAsIHBheWxvYWQpO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgZmluZE9uZSh1c2VySWQ6IHN0cmluZywgY2FyZHNJZDogc3RyaW5nKTogUHJvbWlzZTxDYXJkPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC91c2Vycy8ke3VzZXJJZH0vY2FyZHMvJHtjYXJkc0lkfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgIXJlc3BvbnNlLmRhdGEgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBDYXJkKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluZCB0aGUgUGF5bWVudHMgZnJvbSBhIENhcmQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlcklkICBUaGUgdXNlciBJRFxyXG4gICAqIEBwYXJhbSBpZCAgICAgIFRoZSBDYXJkIElELlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBmaW5kQ2FyZFBheW1lbnRzKHVzZXJJZDogc3RyaW5nLCBpZDogc3RyaW5nLCBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxQYXltZW50Pj4ge1xyXG4gICAgY29uc3QgeyBza2lwLCBsaW1pdCB9ID0gcGFnaW5hdGlvbjtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL3VzZXJzLyR7dXNlcklkfS9jYXJkcy8ke2lkfS9wYXltZW50c2AsIG51bGwsIHsgcGFyYW1zOiB7IHNraXAsIGxpbWl0IH0gfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm4gYSBwYWdpbmF0ZWQgYXJyYXkgd2l0aCBjb3VudCBpbmZvcm1hdGlvbiBmcm9tIGhlYWRlcnNcclxuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtOiBQYXltZW50U2NoZW1hKSA9PiBuZXcgUGF5bWVudChpdGVtKSk7XHJcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcclxuICB9XHJcbn1cclxuIl19