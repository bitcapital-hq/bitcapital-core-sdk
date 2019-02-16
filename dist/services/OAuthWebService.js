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
const buffer_1 = require("buffer");
const qs_1 = require("qs");
const request_1 = require("./request");
const response_1 = require("./response");
class OAuthWebService {
    constructor(options) {
        this.options = options;
        this.http = new bitcapital_common_1.Http(options);
    }
    static getInstance() {
        return this.instance;
    }
    static initialize(options) {
        this.instance = new OAuthWebService(options);
        return this.instance;
    }
    /**
     * Get a basic token for client credentials authentication.
     *
     * @returns {string}
     */
    static getBasicToken(data) {
        const mask = `${data.clientId}:${data.clientSecret}`;
        return buffer_1.Buffer.from(mask).toString("base64");
    }
    /**
     * Perform a "password" authentication using the OAuth 2.0 server.
     *
     * @param data The user credentials.
     */
    password(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new request_1.OAuthPasswordRequest(data.username, data.password, data.scope);
            const response = yield this.http.post("/oauth/token", qs_1.stringify(request), {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${OAuthWebService.getBasicToken(this.options)}`
                }
            });
            if (response && response.status === 200) {
                return new bitcapital_common_1.OAuthCredentials(response.data);
            }
            throw response;
        });
    }
    /**
     * Perform a "client_credentials" authentication using the OAuth 2.0 server.
     */
    clientCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new request_1.OAuthClientCredentialsRequest();
            const response = yield this.http.post("/oauth/token", qs_1.stringify(request), {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${OAuthWebService.getBasicToken(this.options)}` // Get credentials from options
                }
            });
            if (response && response.status === 200) {
                return new bitcapital_common_1.OAuthCredentials(response.data);
            }
            throw response;
        });
    }
    /**
     * Performs a "refresh_token" authentication using the OAuth 2.0 server.
     */
    refreshToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new request_1.OAuthRefreshRequest(data.refreshToken);
            const response = yield this.http.post("/oauth/token", qs_1.stringify(request), {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${OAuthWebService.getBasicToken(this.options)}` // Get credentials from options
                }
            });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.OAuthCredentials(response.data);
        });
    }
    /**
     * Revokes one or all tokens from a user using the OAuth 2.0 server.
     *
     * @param accessToken The user access token.
     */
    revoke(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post("/oauth/revoke", { accessToken }, {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${OAuthWebService.getBasicToken(this.options)}` // Get credentials from options
                }
            });
            // The client may choose to ignore this error, as it wouldn't interfere with the user flow.
            if (!response || response.status !== 200) {
                throw response;
            }
        });
    }
    /**
     * Get a secret token using a accessToken
     *
     * @param {string} accessToken The user access token
     * @param {OAuthSecretTokenResource} resources The resources the secret token will have access to
     * @param {string[]} [scopes] The scopes the secret token will have access to.
     * If undefined, will use the default scopes for the user role
     */
    secret(accessToken, resources, scopes) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post("/oauth/secret", { resources, scopes }, {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (!response || response.status !== 200) {
                throw response;
            }
            return new bitcapital_common_1.OAuthSecretToken(response.data);
        });
    }
    /**
     * Get the server status.
     */
    status() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.get(`/`);
            if (response && response.status === 200) {
                return new response_1.OAuthStatusResponse(response.data);
            }
            throw response;
        });
    }
}
exports.OAuthWebService = OAuthWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL09BdXRoV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseURBQW9IO0FBQ3BILG1DQUFnQztBQUNoQywyQkFBK0I7QUFDL0IsdUNBQXFHO0FBQ3JHLHlDQUFpRDtBQU9qRCxNQUFhLGVBQWU7SUFLMUIsWUFBWSxPQUErQjtRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksd0JBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQStCO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFnRDtRQUMxRSxNQUFNLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JELE9BQU8sZUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7O09BSUc7SUFDVSxRQUFRLENBQUMsSUFBNEQ7O1lBQ2hGLE1BQU0sT0FBTyxHQUFHLElBQUksOEJBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUks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LEVBQUU7b0JBQ1AsY0FBYyxFQUFFLG1DQUFtQztvQkFDbkQsYUFBYSxFQUFFLFVBQVUsV0FBVyxFQUFFO2lCQUN2QzthQUNGLENBQ0YsQ0FBQztZQUVGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLG9DQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLE1BQU07O1lBQ2pCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFMUMsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3ZDLE9BQU8sSUFBSSw4QkFBbUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0M7WUFFRCxNQUFNLFFBQVEsQ0FBQztRQUNqQixDQUFDO0tBQUE7Q0FDRjtBQXJKRCwwQ0FxSkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwLCBIdHRwT3B0aW9ucywgT0F1dGhDcmVkZW50aWFscywgT0F1dGhTZWNyZXRUb2tlbiwgT0F1dGhTZWNyZXRUb2tlblJlc291cmNlIH0gZnJvbSBcImJpdGNhcGl0YWwtY29tbW9uXCI7XHJcbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gXCJidWZmZXJcIjtcclxuaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSBcInFzXCI7XHJcbmltcG9ydCB7IE9BdXRoQ2xpZW50Q3JlZGVudGlhbHNSZXF1ZXN0LCBPQXV0aFBhc3N3b3JkUmVxdWVzdCwgT0F1dGhSZWZyZXNoUmVxdWVzdCB9IGZyb20gXCIuL3JlcXVlc3RcIjtcclxuaW1wb3J0IHsgT0F1dGhTdGF0dXNSZXNwb25zZSB9IGZyb20gXCIuL3Jlc3BvbnNlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9BdXRoV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBIdHRwT3B0aW9ucyB7XHJcbiAgY2xpZW50SWQ6IHN0cmluZztcclxuICBjbGllbnRTZWNyZXQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE9BdXRoV2ViU2VydmljZSB7XHJcbiAgcHJvdGVjdGVkIG9wdGlvbnM6IE9BdXRoV2ViU2VydmljZU9wdGlvbnM7XHJcbiAgcHJvdGVjdGVkIGh0dHA6IEh0dHA7XHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogT0F1dGhXZWJTZXJ2aWNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5odHRwID0gbmV3IEh0dHAob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE9BdXRoV2ViU2VydmljZSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zKTogT0F1dGhXZWJTZXJ2aWNlIHtcclxuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgT0F1dGhXZWJTZXJ2aWNlKG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYSBiYXNpYyB0b2tlbiBmb3IgY2xpZW50IGNyZWRlbnRpYWxzIGF1dGhlbnRpY2F0aW9uLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIGdldEJhc2ljVG9rZW4oZGF0YTogeyBjbGllbnRJZDogc3RyaW5nOyBjbGllbnRTZWNyZXQ6IHN0cmluZyB9KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG1hc2sgPSBgJHtkYXRhLmNsaWVudElkfToke2RhdGEuY2xpZW50U2VjcmV0fWA7XHJcbiAgICByZXR1cm4gQnVmZmVyLmZyb20obWFzaykudG9TdHJpbmcoXCJiYXNlNjRcIik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIGEgXCJwYXNzd29yZFwiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgVGhlIHVzZXIgY3JlZGVudGlhbHMuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHBhc3N3b3JkKGRhdGE6IHsgdXNlcm5hbWU6IHN0cmluZzsgcGFzc3dvcmQ6IHN0cmluZzsgc2NvcGU/OiBzdHJpbmcgfSk6IFByb21pc2U8T0F1dGhDcmVkZW50aWFscz4ge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBPQXV0aFBhc3N3b3JkUmVxdWVzdChkYXRhLnVzZXJuYW1lLCBkYXRhLnBhc3N3b3JkLCBkYXRhLnNjb3BlKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoXCIvb2F1dGgvdG9rZW5cIiwgc3RyaW5naWZ5KHJlcXVlc3QpLCB7XHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxyXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke09BdXRoV2ViU2VydmljZS5nZXRCYXNpY1Rva2VuKHRoaXMub3B0aW9ucyl9YFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgcmV0dXJuIG5ldyBPQXV0aENyZWRlbnRpYWxzKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIGEgXCJjbGllbnRfY3JlZGVudGlhbHNcIiBhdXRoZW50aWNhdGlvbiB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlci5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgY2xpZW50Q3JlZGVudGlhbHMoKTogUHJvbWlzZTxPQXV0aENyZWRlbnRpYWxzPiB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IE9BdXRoQ2xpZW50Q3JlZGVudGlhbHNSZXF1ZXN0KCk7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFwiL29hdXRoL3Rva2VuXCIsIHN0cmluZ2lmeShyZXF1ZXN0KSwge1xyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcclxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmFzaWMgJHtPQXV0aFdlYlNlcnZpY2UuZ2V0QmFzaWNUb2tlbih0aGlzLm9wdGlvbnMpfWAgLy8gR2V0IGNyZWRlbnRpYWxzIGZyb20gb3B0aW9uc1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgcmV0dXJuIG5ldyBPQXV0aENyZWRlbnRpYWxzKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtcyBhIFwicmVmcmVzaF90b2tlblwiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoVG9rZW4oZGF0YTogeyByZWZyZXNoVG9rZW46IHN0cmluZyB9KTogUHJvbWlzZTxPQXV0aENyZWRlbnRpYWxzPiB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IE9BdXRoUmVmcmVzaFJlcXVlc3QoZGF0YS5yZWZyZXNoVG9rZW4pO1xyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoXCIvb2F1dGgvdG9rZW5cIiwgc3RyaW5naWZ5KHJlcXVlc3QpLCB7XHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxyXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke09BdXRoV2ViU2VydmljZS5nZXRCYXNpY1Rva2VuKHRoaXMub3B0aW9ucyl9YCAvLyBHZXQgY3JlZGVudGlhbHMgZnJvbSBvcHRpb25zXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBPQXV0aENyZWRlbnRpYWxzKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV2b2tlcyBvbmUgb3IgYWxsIHRva2VucyBmcm9tIGEgdXNlciB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBhY2Nlc3NUb2tlbiBUaGUgdXNlciBhY2Nlc3MgdG9rZW4uXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHJldm9rZShhY2Nlc3NUb2tlbj86IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcclxuICAgICAgXCIvb2F1dGgvcmV2b2tlXCIsXHJcbiAgICAgIHsgYWNjZXNzVG9rZW4gfSxcclxuICAgICAge1xyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXHJcbiAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmFzaWMgJHtPQXV0aFdlYlNlcnZpY2UuZ2V0QmFzaWNUb2tlbih0aGlzLm9wdGlvbnMpfWAgLy8gR2V0IGNyZWRlbnRpYWxzIGZyb20gb3B0aW9uc1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBUaGUgY2xpZW50IG1heSBjaG9vc2UgdG8gaWdub3JlIHRoaXMgZXJyb3IsIGFzIGl0IHdvdWxkbid0IGludGVyZmVyZSB3aXRoIHRoZSB1c2VyIGZsb3cuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGEgc2VjcmV0IHRva2VuIHVzaW5nIGEgYWNjZXNzVG9rZW5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhY2Nlc3NUb2tlbiBUaGUgdXNlciBhY2Nlc3MgdG9rZW5cclxuICAgKiBAcGFyYW0ge09BdXRoU2VjcmV0VG9rZW5SZXNvdXJjZX0gcmVzb3VyY2VzIFRoZSByZXNvdXJjZXMgdGhlIHNlY3JldCB0b2tlbiB3aWxsIGhhdmUgYWNjZXNzIHRvXHJcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gW3Njb3Blc10gVGhlIHNjb3BlcyB0aGUgc2VjcmV0IHRva2VuIHdpbGwgaGF2ZSBhY2Nlc3MgdG8uXHJcbiAgICogSWYgdW5kZWZpbmVkLCB3aWxsIHVzZSB0aGUgZGVmYXVsdCBzY29wZXMgZm9yIHRoZSB1c2VyIHJvbGVcclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgc2VjcmV0KGFjY2Vzc1Rva2VuOiBzdHJpbmcsIHJlc291cmNlczogT0F1dGhTZWNyZXRUb2tlblJlc291cmNlLCBzY29wZXM/OiBzdHJpbmdbXSkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcclxuICAgICAgXCIvb2F1dGgvc2VjcmV0XCIsXHJcbiAgICAgIHsgcmVzb3VyY2VzLCBzY29wZXMgfSxcclxuICAgICAge1xyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXHJcbiAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgIHRocm93IHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgT0F1dGhTZWNyZXRUb2tlbihyZXNwb25zZS5kYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgc2VydmVyIHN0YXR1cy5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgc3RhdHVzKCk6IFByb21pc2U8T0F1dGhTdGF0dXNSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvYCk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgIHJldHVybiBuZXcgT0F1dGhTdGF0dXNSZXNwb25zZShyZXNwb25zZS5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyByZXNwb25zZTtcclxuICB9XHJcbn1cclxuIl19