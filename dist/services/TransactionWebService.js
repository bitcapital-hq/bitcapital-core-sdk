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
class TransactionWebService extends base_1.BaseModelWebService {
    constructor(options) {
        super(options);
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new TransactionWebService(options);
        return this.instance;
    }
    /**
     * Find a Transaction.
     *
     * @param id The Transaction ID.
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/transactions/${id}`);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.Transaction(response.data);
        });
    }
}
exports.TransactionWebService = TransactionWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNhY3Rpb25XZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL1RyYW5zYWN0aW9uV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseURBQW1FO0FBQ25FLGlDQUF5RTtBQUl6RSxNQUFhLHFCQUFzQixTQUFRLDBCQUFtRDtJQUc1RixZQUFZLE9BQXFDO1FBQy9DLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQXFDO1FBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSxPQUFPLENBQUMsRUFBVTs7WUFDN0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUU1RCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSwrQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7Q0FDRjtBQTlCRCxzREE4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2FjdGlvbiwgVHJhbnNhY3Rpb25TY2hlbWEgfSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcclxuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZSwgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zYWN0aW9uV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxyXG5cclxuZXhwb3J0IGNsYXNzIFRyYW5zYWN0aW9uV2ViU2VydmljZSBleHRlbmRzIEJhc2VNb2RlbFdlYlNlcnZpY2U8VHJhbnNhY3Rpb24sIFRyYW5zYWN0aW9uU2NoZW1hPiB7XHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogVHJhbnNhY3Rpb25XZWJTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBUcmFuc2FjdGlvbldlYlNlcnZpY2VPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogVHJhbnNhY3Rpb25XZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IFRyYW5zYWN0aW9uV2ViU2VydmljZU9wdGlvbnMpOiBUcmFuc2FjdGlvbldlYlNlcnZpY2Uge1xyXG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBUcmFuc2FjdGlvbldlYlNlcnZpY2Uob3B0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmQgYSBUcmFuc2FjdGlvbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZCBUaGUgVHJhbnNhY3Rpb24gSUQuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGZpbmRPbmUoaWQ6IHN0cmluZyk6IFByb21pc2U8VHJhbnNhY3Rpb24+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL3RyYW5zYWN0aW9ucy8ke2lkfWApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbihyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcbn1cclxuIl19