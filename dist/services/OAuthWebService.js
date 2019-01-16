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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL09BdXRoV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUNBQWdDO0FBQ2hDLDJCQUErQjtBQUMvQixrQ0FBNEM7QUFDNUMsc0NBQTZDO0FBQzdDLHVDQUFxRztBQUNyRyx5Q0FBaUQ7QUFDakQsdUVBQThGO0FBTzlGO0lBS0UsWUFBWSxPQUErQjtRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsYUFBYSxDQUFDLElBQWdEO1FBQzFFLE1BQU0sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckQsT0FBTyxlQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLFFBQVEsQ0FBQyxJQUE0RDs7WUFDaEYsTUFBTSxPQUFPLEdBQUcsSUFBSSw4QkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25GLE1BQU0sUUFBUSxH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Q3JCO2dCQUNFLE9BQU8sRUFBRTtvQkFDUCxjQUFjLEVBQUUsbUNBQW1DO29CQUNuRCxhQUFhLEVBQUUsVUFBVSxXQUFXLEVBQUU7aUJBQ3ZDO2FBQ0YsQ0FDRixDQUFDO1lBRUYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksMEJBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsTUFBTTs7WUFDakIsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUUxQyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDdkMsT0FBTyxJQUFJLDhCQUFtQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMvQztZQUVELE1BQU0sUUFBUSxDQUFDO1FBQ2pCLENBQUM7S0FBQTtDQUNGO0FBckpELGtDQXFKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1ZmZlciB9IGZyb20gXCJidWZmZXJcIjtcclxuaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSBcInFzXCI7XHJcbmltcG9ydCB7IEh0dHAsIEh0dHBPcHRpb25zIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgT0F1dGhDcmVkZW50aWFscyB9IGZyb20gXCIuLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgT0F1dGhDbGllbnRDcmVkZW50aWFsc1JlcXVlc3QsIE9BdXRoUGFzc3dvcmRSZXF1ZXN0LCBPQXV0aFJlZnJlc2hSZXF1ZXN0IH0gZnJvbSBcIi4vcmVxdWVzdFwiO1xyXG5pbXBvcnQgeyBPQXV0aFN0YXR1c1Jlc3BvbnNlIH0gZnJvbSBcIi4vcmVzcG9uc2VcIjtcclxuaW1wb3J0IE9BdXRoU2VjcmV0VG9rZW4sIHsgT0F1dGhTZWNyZXRUb2tlblJlc291cmNlIH0gZnJvbSBcIi4uL21vZGVscy9PQXV0aC9PQXV0aFNlY3JldFRva2VuXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9BdXRoV2ViU2VydmljZU9wdGlvbnMgZXh0ZW5kcyBIdHRwT3B0aW9ucyB7XHJcbiAgY2xpZW50SWQ6IHN0cmluZztcclxuICBjbGllbnRTZWNyZXQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0F1dGhXZWJTZXJ2aWNlIHtcclxuICBwcm90ZWN0ZWQgb3B0aW9uczogT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucztcclxuICBwcm90ZWN0ZWQgaHR0cDogSHR0cDtcclxuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBPQXV0aFdlYlNlcnZpY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9BdXRoV2ViU2VydmljZU9wdGlvbnMpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLmh0dHAgPSBuZXcgSHR0cChvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogT0F1dGhXZWJTZXJ2aWNlIHtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IE9BdXRoV2ViU2VydmljZU9wdGlvbnMpOiBPQXV0aFdlYlNlcnZpY2Uge1xyXG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBPQXV0aFdlYlNlcnZpY2Uob3B0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhIGJhc2ljIHRva2VuIGZvciBjbGllbnQgY3JlZGVudGlhbHMgYXV0aGVudGljYXRpb24uXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0QmFzaWNUb2tlbihkYXRhOiB7IGNsaWVudElkOiBzdHJpbmc7IGNsaWVudFNlY3JldDogc3RyaW5nIH0pOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbWFzayA9IGAke2RhdGEuY2xpZW50SWR9OiR7ZGF0YS5jbGllbnRTZWNyZXR9YDtcclxuICAgIHJldHVybiBCdWZmZXIuZnJvbShtYXNrKS50b1N0cmluZyhcImJhc2U2NFwiKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm0gYSBcInBhc3N3b3JkXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSBUaGUgdXNlciBjcmVkZW50aWFscy5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgcGFzc3dvcmQoZGF0YTogeyB1c2VybmFtZTogc3RyaW5nOyBwYXNzd29yZDogc3RyaW5nOyBzY29wZT86IHN0cmluZyB9KTogUHJvbWlzZTxPQXV0aENyZWRlbnRpYWxzPiB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IE9BdXRoUGFzc3dvcmRSZXF1ZXN0KGRhdGEudXNlcm5hbWUsIGRhdGEucGFzc3dvcmQsIGRhdGEuc2NvcGUpO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcIi9vYXV0aC90b2tlblwiLCBzdHJpbmdpZnkocmVxdWVzdCksIHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXHJcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJhc2ljICR7T0F1dGhXZWJTZXJ2aWNlLmdldEJhc2ljVG9rZW4odGhpcy5vcHRpb25zKX1gXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICByZXR1cm4gbmV3IE9BdXRoQ3JlZGVudGlhbHMocmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICB0aHJvdyByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm0gYSBcImNsaWVudF9jcmVkZW50aWFsc1wiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBjbGllbnRDcmVkZW50aWFscygpOiBQcm9taXNlPE9BdXRoQ3JlZGVudGlhbHM+IHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgT0F1dGhDbGllbnRDcmVkZW50aWFsc1JlcXVlc3QoKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoXCIvb2F1dGgvdG9rZW5cIiwgc3RyaW5naWZ5KHJlcXVlc3QpLCB7XHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxyXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke09BdXRoV2ViU2VydmljZS5nZXRCYXNpY1Rva2VuKHRoaXMub3B0aW9ucyl9YCAvLyBHZXQgY3JlZGVudGlhbHMgZnJvbSBvcHRpb25zXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICByZXR1cm4gbmV3IE9BdXRoQ3JlZGVudGlhbHMocmVzcG9uc2UuZGF0YSk7XHJcbiAgICB9XHJcbiAgICB0aHJvdyByZXNwb25zZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm1zIGEgXCJyZWZyZXNoX3Rva2VuXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIHJlZnJlc2hUb2tlbihkYXRhOiB7IHJlZnJlc2hUb2tlbjogc3RyaW5nIH0pOiBQcm9taXNlPE9BdXRoQ3JlZGVudGlhbHM+IHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgT0F1dGhSZWZyZXNoUmVxdWVzdChkYXRhLnJlZnJlc2hUb2tlbik7XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcIi9vYXV0aC90b2tlblwiLCBzdHJpbmdpZnkocmVxdWVzdCksIHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXHJcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJhc2ljICR7T0F1dGhXZWJTZXJ2aWNlLmdldEJhc2ljVG9rZW4odGhpcy5vcHRpb25zKX1gIC8vIEdldCBjcmVkZW50aWFscyBmcm9tIG9wdGlvbnNcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICB0aHJvdyByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IE9BdXRoQ3JlZGVudGlhbHMocmVzcG9uc2UuZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXZva2VzIG9uZSBvciBhbGwgdG9rZW5zIGZyb20gYSB1c2VyIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGFjY2Vzc1Rva2VuIFRoZSB1c2VyIGFjY2VzcyB0b2tlbi5cclxuICAgKi9cclxuICBwdWJsaWMgYXN5bmMgcmV2b2tlKGFjY2Vzc1Rva2VuPzogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFxyXG4gICAgICBcIi9vYXV0aC9yZXZva2VcIixcclxuICAgICAgeyBhY2Nlc3NUb2tlbiB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcclxuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke09BdXRoV2ViU2VydmljZS5nZXRCYXNpY1Rva2VuKHRoaXMub3B0aW9ucyl9YCAvLyBHZXQgY3JlZGVudGlhbHMgZnJvbSBvcHRpb25zXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIFRoZSBjbGllbnQgbWF5IGNob29zZSB0byBpZ25vcmUgdGhpcyBlcnJvciwgYXMgaXQgd291bGRuJ3QgaW50ZXJmZXJlIHdpdGggdGhlIHVzZXIgZmxvdy5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYSBzZWNyZXQgdG9rZW4gdXNpbmcgYSBhY2Nlc3NUb2tlblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFjY2Vzc1Rva2VuIFRoZSB1c2VyIGFjY2VzcyB0b2tlblxyXG4gICAqIEBwYXJhbSB7T0F1dGhTZWNyZXRUb2tlblJlc291cmNlfSByZXNvdXJjZXMgVGhlIHJlc291cmNlcyB0aGUgc2VjcmV0IHRva2VuIHdpbGwgaGF2ZSBhY2Nlc3MgdG9cclxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBbc2NvcGVzXSBUaGUgc2NvcGVzIHRoZSBzZWNyZXQgdG9rZW4gd2lsbCBoYXZlIGFjY2VzcyB0by5cclxuICAgKiBJZiB1bmRlZmluZWQsIHdpbGwgdXNlIHRoZSBkZWZhdWx0IHNjb3BlcyBmb3IgdGhlIHVzZXIgcm9sZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBzZWNyZXQoYWNjZXNzVG9rZW46IHN0cmluZywgcmVzb3VyY2VzOiBPQXV0aFNlY3JldFRva2VuUmVzb3VyY2UsIHNjb3Blcz86IHN0cmluZ1tdKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFxyXG4gICAgICBcIi9vYXV0aC9zZWNyZXRcIixcclxuICAgICAgeyByZXNvdXJjZXMsIHNjb3BlcyB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcclxuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuICAgICAgdGhyb3cgcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBPQXV0aFNlY3JldFRva2VuKHJlc3BvbnNlLmRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzZXJ2ZXIgc3RhdHVzLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBzdGF0dXMoKTogUHJvbWlzZTxPQXV0aFN0YXR1c1Jlc3BvbnNlPiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQoYC9gKTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgcmV0dXJuIG5ldyBPQXV0aFN0YXR1c1Jlc3BvbnNlKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHRocm93IHJlc3BvbnNlO1xyXG4gIH1cclxufVxyXG4iXX0=