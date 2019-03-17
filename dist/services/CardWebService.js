"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitcapital_common_1 = require("bitcapital-common");
const BaseModelWebService_1 = require("./base/BaseModelWebService");
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
     * Emits a new physical or virtual card
     *
     * @param wallet The wallet ID for this emission
     * @param data.type The type of the card, physical or virtual
     * @param data.plasticId The plastic ID for the emission, from the card design
     * @param data.expirationDate The card expiration date, if needed
     */
    emit(wallet, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type } = data, otherData = __rest(data, ["type"]);
            const response = yield this.http.post(`/wallets/${wallet}/cards/${type}`, Object.assign({}, otherData));
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Card(response.data);
        });
    }
    /**
     * Blocks card with the given ID
     *
     * @param walletId  The wallet ID
     * @param payload The data required for the card blocking operation
     */
    block(walletId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/wallets/${walletId}/cards/${payload.cardId}/block`, payload);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
    /**
     * Unblocks card with the given ID
     *
     * @param walletId  The wallet ID
     * @param payload The data required for the card unblocking operation
     */
    unblock(walletId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/wallets/${walletId}/cards/${payload.cardId}/unblock`, payload);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
    /**
     * Activates card with the given ID
     *
     * @param walletId  The wallet ID
     * @param payload The data required for the card activation operation
     */
    activate(walletId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/wallets/${walletId}/cards/${payload.cardId}/activate`, payload);
            if (!response || response.status !== 200) {
                throw response;
            }
            return true;
        });
    }
    findOne(walletId, cardsId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/wallets/${walletId}/cards/${cardsId}`);
            if (!response || !response.data || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Card(response.data);
        });
    }
    /**
     * Find the Payments from a Card.
     *
     * @param wallet  The wallet ID
     * @param id      The Card ID.
     */
    findCardPayments(wallet, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, limit } = data;
            const response = yield this.http.get(`/wallets/${wallet}/cards/${id}/payments`, null, {
                params: { skip, limit }
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZFdlYlNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmljZXMvQ2FyZFdlYlNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQVcyQjtBQUMzQixvRUFBNkY7QUFLN0YsTUFBYSxjQUFlLFNBQVEseUNBQXFDO0lBR3ZFLFlBQVksT0FBOEI7UUFDeEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBOEI7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDVSxJQUFJLENBQUMsTUFBYyxFQUFFLElBQXFCOztZQUNyRCxNQUFNLEVBQUUsSUFBSSxLQUFtQixJQUFJLEVBQXJCLGtDQUFxQixDQUFDO1lBQ3BDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxNQUFNLFVBQVUsSUFBSSxFQUFFLG9CQUFPLFNBQVMsRUFBRyxDQUFDO1lBRTVGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLHdCQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ1UsS0FBSyxDQUFDLFFBQWdCLEVBQUUsT0FBK0I7O1lBQ2xFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxRQUFRLFVBQVUsT0FBTyxDQUFDLE1BQU0sUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRXJHLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLE9BQU8sQ0FBQyxRQUFnQixFQUFFLE9BQWlDOztZQUN0RSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksUUFBUSxVQUFVLE9BQU8sQ0FBQyxNQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUV2RyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxRQUFRLENBQUMsUUFBZ0IsRUFBRSxPQUE4Qjs7WUFDcEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLFFBQVEsVUFBVSxPQUFPLENBQUMsTUFBTSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFeEcsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtJQUVZLE9BQU8sQ0FBQyxRQUFnQixFQUFFLE9BQWU7O1lBQ3BELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxRQUFRLFVBQVUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUU5RSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDMUQsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksd0JBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUsRUFBVSxFQUFFLElBQWdCOztZQUN4RSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQztZQUM3QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksTUFBTSxVQUFVLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtnQkFDcEYsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTthQUN4QixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELCtEQUErRDtZQUMvRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksMkJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdFLE9BQU8sa0NBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxDQUFDO0tBQUE7Q0FDRjtBQWpIRCx3Q0FpSEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDYXJkLFxuICBDYXJkQmFzZVJlcXVlc3RTY2hlbWEsXG4gIENhcmRCbG9ja1JlcXVlc3RTY2hlbWEsXG4gIENhcmRTY2hlbWEsXG4gIENhcmRVbmJsb2NrUmVxdWVzdFNjaGVtYSxcbiAgUGFnaW5hdGVkQXJyYXksXG4gIFBhZ2luYXRpb24sXG4gIFBhZ2luYXRpb25VdGlsLFxuICBQYXltZW50LFxuICBQYXltZW50U2NoZW1hXG59IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZSwgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlL0Jhc2VNb2RlbFdlYlNlcnZpY2VcIjtcbmltcG9ydCB7IENhcmRFbWl0UmVxdWVzdCB9IGZyb20gXCIuL3JlcXVlc3QvQ2FyZEVtaXRSZXF1ZXN0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FyZFdlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgeyB9XG5cbmV4cG9ydCBjbGFzcyBDYXJkV2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8Q2FyZCwgQ2FyZFNjaGVtYT4ge1xuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBDYXJkV2ViU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBDYXJkV2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogQ2FyZFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IENhcmRXZWJTZXJ2aWNlT3B0aW9ucyk6IENhcmRXZWJTZXJ2aWNlIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IENhcmRXZWJTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGEgbmV3IHBoeXNpY2FsIG9yIHZpcnR1YWwgY2FyZFxuICAgKlxuICAgKiBAcGFyYW0gd2FsbGV0IFRoZSB3YWxsZXQgSUQgZm9yIHRoaXMgZW1pc3Npb25cbiAgICogQHBhcmFtIGRhdGEudHlwZSBUaGUgdHlwZSBvZiB0aGUgY2FyZCwgcGh5c2ljYWwgb3IgdmlydHVhbFxuICAgKiBAcGFyYW0gZGF0YS5wbGFzdGljSWQgVGhlIHBsYXN0aWMgSUQgZm9yIHRoZSBlbWlzc2lvbiwgZnJvbSB0aGUgY2FyZCBkZXNpZ25cbiAgICogQHBhcmFtIGRhdGEuZXhwaXJhdGlvbkRhdGUgVGhlIGNhcmQgZXhwaXJhdGlvbiBkYXRlLCBpZiBuZWVkZWRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBlbWl0KHdhbGxldDogc3RyaW5nLCBkYXRhOiBDYXJkRW1pdFJlcXVlc3QpOiBQcm9taXNlPENhcmQ+IHtcbiAgICBjb25zdCB7IHR5cGUsIC4uLm90aGVyRGF0YSB9ID0gZGF0YTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvd2FsbGV0cy8ke3dhbGxldH0vY2FyZHMvJHt0eXBlfWAsIHsgLi4ub3RoZXJEYXRhIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBDYXJkKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJsb2NrcyBjYXJkIHdpdGggdGhlIGdpdmVuIElEXG4gICAqXG4gICAqIEBwYXJhbSB3YWxsZXRJZCAgVGhlIHdhbGxldCBJRFxuICAgKiBAcGFyYW0gcGF5bG9hZCBUaGUgZGF0YSByZXF1aXJlZCBmb3IgdGhlIGNhcmQgYmxvY2tpbmcgb3BlcmF0aW9uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgYmxvY2sod2FsbGV0SWQ6IHN0cmluZywgcGF5bG9hZDogQ2FyZEJsb2NrUmVxdWVzdFNjaGVtYSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC93YWxsZXRzLyR7d2FsbGV0SWR9L2NhcmRzLyR7cGF5bG9hZC5jYXJkSWR9L2Jsb2NrYCwgcGF5bG9hZCk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbmJsb2NrcyBjYXJkIHdpdGggdGhlIGdpdmVuIElEXG4gICAqXG4gICAqIEBwYXJhbSB3YWxsZXRJZCAgVGhlIHdhbGxldCBJRFxuICAgKiBAcGFyYW0gcGF5bG9hZCBUaGUgZGF0YSByZXF1aXJlZCBmb3IgdGhlIGNhcmQgdW5ibG9ja2luZyBvcGVyYXRpb25cbiAgICovXG4gIHB1YmxpYyBhc3luYyB1bmJsb2NrKHdhbGxldElkOiBzdHJpbmcsIHBheWxvYWQ6IENhcmRVbmJsb2NrUmVxdWVzdFNjaGVtYSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC93YWxsZXRzLyR7d2FsbGV0SWR9L2NhcmRzLyR7cGF5bG9hZC5jYXJkSWR9L3VuYmxvY2tgLCBwYXlsb2FkKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlcyBjYXJkIHdpdGggdGhlIGdpdmVuIElEXG4gICAqXG4gICAqIEBwYXJhbSB3YWxsZXRJZCAgVGhlIHdhbGxldCBJRFxuICAgKiBAcGFyYW0gcGF5bG9hZCBUaGUgZGF0YSByZXF1aXJlZCBmb3IgdGhlIGNhcmQgYWN0aXZhdGlvbiBvcGVyYXRpb25cbiAgICovXG4gIHB1YmxpYyBhc3luYyBhY3RpdmF0ZSh3YWxsZXRJZDogc3RyaW5nLCBwYXlsb2FkOiBDYXJkQmFzZVJlcXVlc3RTY2hlbWEpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvd2FsbGV0cy8ke3dhbGxldElkfS9jYXJkcy8ke3BheWxvYWQuY2FyZElkfS9hY3RpdmF0ZWAsIHBheWxvYWQpO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZmluZE9uZSh3YWxsZXRJZDogc3RyaW5nLCBjYXJkc0lkOiBzdHJpbmcpOiBQcm9taXNlPENhcmQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC93YWxsZXRzLyR7d2FsbGV0SWR9L2NhcmRzLyR7Y2FyZHNJZH1gKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgIXJlc3BvbnNlLmRhdGEgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ2FyZChyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBQYXltZW50cyBmcm9tIGEgQ2FyZC5cbiAgICpcbiAgICogQHBhcmFtIHdhbGxldCAgVGhlIHdhbGxldCBJRFxuICAgKiBAcGFyYW0gaWQgICAgICBUaGUgQ2FyZCBJRC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBmaW5kQ2FyZFBheW1lbnRzKHdhbGxldDogc3RyaW5nLCBpZDogc3RyaW5nLCBkYXRhOiBQYWdpbmF0aW9uKTogUHJvbWlzZTxQYWdpbmF0ZWRBcnJheTxQYXltZW50Pj4ge1xuICAgIGNvbnN0IHsgc2tpcCwgbGltaXQgfSA9IGRhdGE7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvd2FsbGV0cy8ke3dhbGxldH0vY2FyZHMvJHtpZH0vcGF5bWVudHNgLCBudWxsLCB7XG4gICAgICBwYXJhbXM6IHsgc2tpcCwgbGltaXQgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGEgcGFnaW5hdGVkIGFycmF5IHdpdGggY291bnQgaW5mb3JtYXRpb24gZnJvbSBoZWFkZXJzXG4gICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuZGF0YS5tYXAoKGl0ZW06IFBheW1lbnRTY2hlbWEpID0+IG5ldyBQYXltZW50KGl0ZW0pKTtcbiAgICByZXR1cm4gUGFnaW5hdGlvblV0aWwucGFyc2UocmVzdWx0LCByZXNwb25zZS5oZWFkZXJzKTtcbiAgfVxufVxuIl19