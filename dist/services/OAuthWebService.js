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
const buffer_1 = require("buffer");
const qs_1 = require("qs");
const base_1 = require("../base");
const models_1 = require("../models");
const request_1 = require("./request");
const response_1 = require("./response");
const OAuthSecretToken_1 = require("../models/OAuth/OAuthSecretToken");
class OAuthWebService {
    constructor(options) {
        this.options = options;
        this.http = new base_1.Http(options);
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
                return new models_1.OAuthCredentials(response.data);
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
                return new models_1.OAuthCredentials(response.data);
            }
            throw response;
        });
    }
    /**
  <<<<<<< HEAD
     * Revoke one or all tokens from a user using the OAuth 2.0 server.
  =======
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
            return new models_1.OAuthCredentials(response.data);
        });
    }
    /**
     * Revokes one or all tokens from a user using the OAuth 2.0 server.
  >>>>>>> a81b0935c8ce42885bf340c00c6076b15c3ce867
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
            return new OAuthSecretToken_1.default(response.data);
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
exports.default = OAuthWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL09BdXRoV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUNBQWdDO0FBQ2hDLDJCQUErQjtBQUMvQixrQ0FBNEM7QUFDNUMsc0NBQTZDO0FBQzdDLHVDQUFxRztBQUNyRyx5Q0FBaUQ7QUFDakQsdUVBQThGO0FBTzlGO0lBS0UsWUFBWSxPQUErQjtRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsYUFBYSxDQUFDLElBQWdEO1FBQzFFLE1BQU0sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckQsT0FBTyxlQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLFFBQVEsQ0FBQyxJQUE0RDs7WUFDaEYsTUFBTSxPQUFPLEdBQUcsSUFBSSw4QkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25GLE1BQU0sUUFBUSxH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RSxFQUNyQjtnQkFDRSxPQUFPLEVBQUU7b0JBQ1AsY0FBYyxFQUFFLG1DQUFtQztvQkFDbkQsYUFBYSxFQUFFLFVBQVUsV0FBVyxFQUFFO2lCQUN2QzthQUNGLENBQ0YsQ0FBQztZQUVGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLDBCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLE1BQU07O1lBQ2pCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFMUMsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3ZDLE9BQU8sSUFBSSw4QkFBbUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0M7WUFFRCxNQUFNLFFBQVEsQ0FBQztRQUNqQixDQUFDO0tBQUE7Q0FDRjtBQXpKRCxrQ0F5SkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdWZmZXIgfSBmcm9tIFwiYnVmZmVyXCI7XG5pbXBvcnQgeyBzdHJpbmdpZnkgfSBmcm9tIFwicXNcIjtcbmltcG9ydCB7IEh0dHAsIEh0dHBPcHRpb25zIH0gZnJvbSBcIi4uL2Jhc2VcIjtcbmltcG9ydCB7IE9BdXRoQ3JlZGVudGlhbHMgfSBmcm9tIFwiLi4vbW9kZWxzXCI7XG5pbXBvcnQgeyBPQXV0aENsaWVudENyZWRlbnRpYWxzUmVxdWVzdCwgT0F1dGhQYXNzd29yZFJlcXVlc3QsIE9BdXRoUmVmcmVzaFJlcXVlc3QgfSBmcm9tIFwiLi9yZXF1ZXN0XCI7XG5pbXBvcnQgeyBPQXV0aFN0YXR1c1Jlc3BvbnNlIH0gZnJvbSBcIi4vcmVzcG9uc2VcIjtcbmltcG9ydCBPQXV0aFNlY3JldFRva2VuLCB7IE9BdXRoU2VjcmV0VG9rZW5SZXNvdXJjZSB9IGZyb20gXCIuLi9tb2RlbHMvT0F1dGgvT0F1dGhTZWNyZXRUb2tlblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9BdXRoV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBIdHRwT3B0aW9ucyB7XG4gIGNsaWVudElkOiBzdHJpbmc7XG4gIGNsaWVudFNlY3JldDogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQXV0aFdlYlNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgb3B0aW9uczogT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucztcbiAgcHJvdGVjdGVkIGh0dHA6IEh0dHA7XG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IE9BdXRoV2ViU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmh0dHAgPSBuZXcgSHR0cChvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogT0F1dGhXZWJTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zKTogT0F1dGhXZWJTZXJ2aWNlIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IE9BdXRoV2ViU2VydmljZShvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBiYXNpYyB0b2tlbiBmb3IgY2xpZW50IGNyZWRlbnRpYWxzIGF1dGhlbnRpY2F0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRCYXNpY1Rva2VuKGRhdGE6IHsgY2xpZW50SWQ6IHN0cmluZzsgY2xpZW50U2VjcmV0OiBzdHJpbmcgfSk6IHN0cmluZyB7XG4gICAgY29uc3QgbWFzayA9IGAke2RhdGEuY2xpZW50SWR9OiR7ZGF0YS5jbGllbnRTZWNyZXR9YDtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20obWFzaykudG9TdHJpbmcoXCJiYXNlNjRcIik7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybSBhIFwicGFzc3dvcmRcIiBhdXRoZW50aWNhdGlvbiB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlci5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgVGhlIHVzZXIgY3JlZGVudGlhbHMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcGFzc3dvcmQoZGF0YTogeyB1c2VybmFtZTogc3RyaW5nOyBwYXNzd29yZDogc3RyaW5nOyBzY29wZT86IHN0cmluZyB9KTogUHJvbWlzZTxPQXV0aENyZWRlbnRpYWxzPiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBPQXV0aFBhc3N3b3JkUmVxdWVzdChkYXRhLnVzZXJuYW1lLCBkYXRhLnBhc3N3b3JkLCBkYXRhLnNjb3BlKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFwiL29hdXRoL3Rva2VuXCIsIHN0cmluZ2lmeShyZXF1ZXN0KSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmFzaWMgJHtPQXV0aFdlYlNlcnZpY2UuZ2V0QmFzaWNUb2tlbih0aGlzLm9wdGlvbnMpfWBcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgcmV0dXJuIG5ldyBPQXV0aENyZWRlbnRpYWxzKHJlc3BvbnNlLmRhdGEpO1xuICAgIH1cbiAgICB0aHJvdyByZXNwb25zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgXCJjbGllbnRfY3JlZGVudGlhbHNcIiBhdXRoZW50aWNhdGlvbiB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlci5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBjbGllbnRDcmVkZW50aWFscygpOiBQcm9taXNlPE9BdXRoQ3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IE9BdXRoQ2xpZW50Q3JlZGVudGlhbHNSZXF1ZXN0KCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcIi9vYXV0aC90b2tlblwiLCBzdHJpbmdpZnkocmVxdWVzdCksIHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJhc2ljICR7T0F1dGhXZWJTZXJ2aWNlLmdldEJhc2ljVG9rZW4odGhpcy5vcHRpb25zKX1gIC8vIEdldCBjcmVkZW50aWFscyBmcm9tIG9wdGlvbnNcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgcmV0dXJuIG5ldyBPQXV0aENyZWRlbnRpYWxzKHJlc3BvbnNlLmRhdGEpO1xuICAgIH1cbiAgICB0aHJvdyByZXNwb25zZTtcbiAgfVxuXG4gIC8qKlxuPDw8PDw8PCBIRUFEXG4gICAqIFJldm9rZSBvbmUgb3IgYWxsIHRva2VucyBmcm9tIGEgdXNlciB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlci5cbj09PT09PT1cbiAgICogUGVyZm9ybXMgYSBcInJlZnJlc2hfdG9rZW5cIiBhdXRoZW50aWNhdGlvbiB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlci5cbiAgICovXG4gIHB1YmxpYyBhc3luYyByZWZyZXNoVG9rZW4oZGF0YTogeyByZWZyZXNoVG9rZW46IHN0cmluZyB9KTogUHJvbWlzZTxPQXV0aENyZWRlbnRpYWxzPiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBPQXV0aFJlZnJlc2hSZXF1ZXN0KGRhdGEucmVmcmVzaFRva2VuKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoXCIvb2F1dGgvdG9rZW5cIiwgc3RyaW5naWZ5KHJlcXVlc3QpLCB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke09BdXRoV2ViU2VydmljZS5nZXRCYXNpY1Rva2VuKHRoaXMub3B0aW9ucyl9YCAvLyBHZXQgY3JlZGVudGlhbHMgZnJvbSBvcHRpb25zXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE9BdXRoQ3JlZGVudGlhbHMocmVzcG9uc2UuZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogUmV2b2tlcyBvbmUgb3IgYWxsIHRva2VucyBmcm9tIGEgdXNlciB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlci5cbj4+Pj4+Pj4gYTgxYjA5MzVjOGNlNDI4ODViZjM0MGMwMGM2MDc2YjE1YzNjZTg2N1xuICAgKlxuICAgKiBAcGFyYW0gYWNjZXNzVG9rZW4gVGhlIHVzZXIgYWNjZXNzIHRva2VuLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJldm9rZShhY2Nlc3NUb2tlbj86IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoXG4gICAgICBcIi9vYXV0aC9yZXZva2VcIixcbiAgICAgIHsgYWNjZXNzVG9rZW4gfSxcbiAgICAgIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJhc2ljICR7T0F1dGhXZWJTZXJ2aWNlLmdldEJhc2ljVG9rZW4odGhpcy5vcHRpb25zKX1gIC8vIEdldCBjcmVkZW50aWFscyBmcm9tIG9wdGlvbnNcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBUaGUgY2xpZW50IG1heSBjaG9vc2UgdG8gaWdub3JlIHRoaXMgZXJyb3IsIGFzIGl0IHdvdWxkbid0IGludGVyZmVyZSB3aXRoIHRoZSB1c2VyIGZsb3cuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNlY3JldCB0b2tlbiB1c2luZyBhIGFjY2Vzc1Rva2VuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhY2Nlc3NUb2tlbiBUaGUgdXNlciBhY2Nlc3MgdG9rZW5cbiAgICogQHBhcmFtIHtPQXV0aFNlY3JldFRva2VuUmVzb3VyY2V9IHJlc291cmNlcyBUaGUgcmVzb3VyY2VzIHRoZSBzZWNyZXQgdG9rZW4gd2lsbCBoYXZlIGFjY2VzcyB0b1xuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBbc2NvcGVzXSBUaGUgc2NvcGVzIHRoZSBzZWNyZXQgdG9rZW4gd2lsbCBoYXZlIGFjY2VzcyB0by5cbiAgICogSWYgdW5kZWZpbmVkLCB3aWxsIHVzZSB0aGUgZGVmYXVsdCBzY29wZXMgZm9yIHRoZSB1c2VyIHJvbGVcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZWNyZXQoYWNjZXNzVG9rZW46IHN0cmluZywgcmVzb3VyY2VzOiBPQXV0aFNlY3JldFRva2VuUmVzb3VyY2UsIHNjb3Blcz86IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcbiAgICAgIFwiL29hdXRoL3NlY3JldFwiLFxuICAgICAgeyByZXNvdXJjZXMsIHNjb3BlcyB9LFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YFxuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgT0F1dGhTZWNyZXRUb2tlbihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNlcnZlciBzdGF0dXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc3RhdHVzKCk6IFByb21pc2U8T0F1dGhTdGF0dXNSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2ApO1xuXG4gICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICByZXR1cm4gbmV3IE9BdXRoU3RhdHVzUmVzcG9uc2UocmVzcG9uc2UuZGF0YSk7XG4gICAgfVxuXG4gICAgdGhyb3cgcmVzcG9uc2U7XG4gIH1cbn1cbiJdfQ==