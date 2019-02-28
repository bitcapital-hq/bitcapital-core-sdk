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
class MediatorWebService {
    constructor(options) {
        this.options = options;
        this.http = new bitcapital_common_1.Http(options);
        if (options.session) {
            this.http.interceptors(options.session.interceptors());
        }
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new MediatorWebService(options);
        return this.instance;
    }
    /**
     * Create a new Mediator.
     *
     * @param consumer The Mediator schema.
     */
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post(`/mediators`, user);
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.User(response.data);
        });
    }
}
exports.MediatorWebService = MediatorWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVkaWF0b3JXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL01lZGlhdG9yV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseURBQTJEO0FBSzNELE1BQWEsa0JBQWtCO0lBSTdCLFlBQStCLE9BQW1DO1FBQW5DLFlBQU8sR0FBUCxPQUFPLENBQTRCO1FBQ2hFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx3QkFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTlCLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQWtDO1FBQ3pELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSxNQUFNLENBQUMsSUFBZ0I7O1lBQ2xDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTFELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLHdCQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7S0FBQTtDQUNGO0FBbkNELGdEQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXIsIFVzZXJTY2hlbWEsIEh0dHAgfSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcbmltcG9ydCB7IEJhc2VNb2RlbFdlYlNlcnZpY2VPcHRpb25zIH0gZnJvbSBcIi4vYmFzZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lZGlhdG9yV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxuXG5leHBvcnQgY2xhc3MgTWVkaWF0b3JXZWJTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIGh0dHA6IEh0dHA7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IE1lZGlhdG9yV2ViU2VydmljZTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICB0aGlzLmh0dHAgPSBuZXcgSHR0cChvcHRpb25zKTtcblxuICAgIGlmIChvcHRpb25zLnNlc3Npb24pIHtcbiAgICAgIHRoaXMuaHR0cC5pbnRlcmNlcHRvcnMob3B0aW9ucy5zZXNzaW9uLmludGVyY2VwdG9ycygpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE1lZGlhdG9yV2ViU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogTWVkaWF0b3JXZWJTZXJ2aWNlT3B0aW9ucyk6IE1lZGlhdG9yV2ViU2VydmljZSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBNZWRpYXRvcldlYlNlcnZpY2Uob3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IE1lZGlhdG9yLlxuICAgKlxuICAgKiBAcGFyYW0gY29uc3VtZXIgVGhlIE1lZGlhdG9yIHNjaGVtYS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBjcmVhdGUodXNlcjogVXNlclNjaGVtYSk6IFByb21pc2U8VXNlcj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoYC9tZWRpYXRvcnNgLCB1c2VyKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVXNlcihyZXNwb25zZS5kYXRhKTtcbiAgfVxufVxuIl19