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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVkaWF0b3JXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL01lZGlhdG9yV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseURBQTJEO0FBSzNELE1BQWEsa0JBQWtCO0lBSTdCLFlBQStCLE9BQW1DO1FBQW5DLFlBQU8sR0FBUCxPQUFPLENBQTRCO1FBQ2hFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx3QkFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTlCLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQWtDO1FBQ3pELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSxNQUFNLENBQUMsSUFBZ0I7O1lBQ2xDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTFELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLHdCQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7S0FBQTtDQUNGO0FBbkNELGdEQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXIsIFVzZXJTY2hlbWEsIEh0dHAgfSBmcm9tIFwiYml0Y2FwaXRhbC1jb21tb25cIjtcclxuaW1wb3J0IHsgQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMgfSBmcm9tIFwiLi9iYXNlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1lZGlhdG9yV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBCYXNlTW9kZWxXZWJTZXJ2aWNlT3B0aW9ucyB7fVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lZGlhdG9yV2ViU2VydmljZSB7XHJcbiAgcHJvdGVjdGVkIGh0dHA6IEh0dHA7XHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogTWVkaWF0b3JXZWJTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogQmFzZU1vZGVsV2ViU2VydmljZU9wdGlvbnMpIHtcclxuICAgIHRoaXMuaHR0cCA9IG5ldyBIdHRwKG9wdGlvbnMpO1xyXG5cclxuICAgIGlmIChvcHRpb25zLnNlc3Npb24pIHtcclxuICAgICAgdGhpcy5odHRwLmludGVyY2VwdG9ycyhvcHRpb25zLnNlc3Npb24uaW50ZXJjZXB0b3JzKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBNZWRpYXRvcldlYlNlcnZpY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogTWVkaWF0b3JXZWJTZXJ2aWNlT3B0aW9ucyk6IE1lZGlhdG9yV2ViU2VydmljZSB7XHJcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IE1lZGlhdG9yV2ViU2VydmljZShvcHRpb25zKTtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IE1lZGlhdG9yLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGNvbnN1bWVyIFRoZSBNZWRpYXRvciBzY2hlbWEuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGNyZWF0ZSh1c2VyOiBVc2VyU2NoZW1hKTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KGAvbWVkaWF0b3JzYCwgdXNlcik7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFVzZXIocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==