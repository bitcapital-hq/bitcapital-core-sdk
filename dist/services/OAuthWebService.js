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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL09BdXRoV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUNBQWdDO0FBQ2hDLDJCQUErQjtBQUMvQixrQ0FBNEM7QUFDNUMsc0NBQTZDO0FBQzdDLHVDQUFxRztBQUNyRyx5Q0FBaUQ7QUFDakQsdUVBQThGO0FBTzlGO0lBS0UsWUFBWSxPQUErQjtRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsYUFBYSxDQUFDLElBQWdEO1FBQzFFLE1BQU0sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckQsT0FBTyxlQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLFFBQVEsQ0FBQyxJQUE0RDs7WUFDaEYsTUFBTSxPQUFPLEdBQUcsSUFBSSw4QkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25GLE1BQU0sUUFBUSxH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Q3JCO2dCQUNFLE9BQU8sRUFBRTtvQkFDUCxjQUFjLEVBQUUsbUNBQW1DO29CQUNuRCxhQUFhLEVBQUUsVUFBVSxXQUFXLEVBQUU7aUJBQ3ZDO2FBQ0YsQ0FDRixDQUFDO1lBRUYsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEMsTUFBTSxRQUFRLENBQUM7YUFDaEI7WUFFRCxPQUFPLElBQUksMEJBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsTUFBTTs7WUFDakIsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUUxQyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDdkMsT0FBTyxJQUFJLDhCQUFtQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMvQztZQUVELE1BQU0sUUFBUSxDQUFDO1FBQ2pCLENBQUM7S0FBQTtDQUNGO0FBckpELGtDQXFKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1ZmZlciB9IGZyb20gXCJidWZmZXJcIjtcbmltcG9ydCB7IHN0cmluZ2lmeSB9IGZyb20gXCJxc1wiO1xuaW1wb3J0IHsgSHR0cCwgSHR0cE9wdGlvbnMgfSBmcm9tIFwiLi4vYmFzZVwiO1xuaW1wb3J0IHsgT0F1dGhDcmVkZW50aWFscyB9IGZyb20gXCIuLi9tb2RlbHNcIjtcbmltcG9ydCB7IE9BdXRoQ2xpZW50Q3JlZGVudGlhbHNSZXF1ZXN0LCBPQXV0aFBhc3N3b3JkUmVxdWVzdCwgT0F1dGhSZWZyZXNoUmVxdWVzdCB9IGZyb20gXCIuL3JlcXVlc3RcIjtcbmltcG9ydCB7IE9BdXRoU3RhdHVzUmVzcG9uc2UgfSBmcm9tIFwiLi9yZXNwb25zZVwiO1xuaW1wb3J0IE9BdXRoU2VjcmV0VG9rZW4sIHsgT0F1dGhTZWNyZXRUb2tlblJlc291cmNlIH0gZnJvbSBcIi4uL21vZGVscy9PQXV0aC9PQXV0aFNlY3JldFRva2VuXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEh0dHBPcHRpb25zIHtcbiAgY2xpZW50SWQ6IHN0cmluZztcbiAgY2xpZW50U2VjcmV0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9BdXRoV2ViU2VydmljZSB7XG4gIHByb3RlY3RlZCBvcHRpb25zOiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zO1xuICBwcm90ZWN0ZWQgaHR0cDogSHR0cDtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogT0F1dGhXZWJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9BdXRoV2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuaHR0cCA9IG5ldyBIdHRwKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBPQXV0aFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IE9BdXRoV2ViU2VydmljZU9wdGlvbnMpOiBPQXV0aFdlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgT0F1dGhXZWJTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGJhc2ljIHRva2VuIGZvciBjbGllbnQgY3JlZGVudGlhbHMgYXV0aGVudGljYXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEJhc2ljVG9rZW4oZGF0YTogeyBjbGllbnRJZDogc3RyaW5nOyBjbGllbnRTZWNyZXQ6IHN0cmluZyB9KTogc3RyaW5nIHtcbiAgICBjb25zdCBtYXNrID0gYCR7ZGF0YS5jbGllbnRJZH06JHtkYXRhLmNsaWVudFNlY3JldH1gO1xuICAgIHJldHVybiBCdWZmZXIuZnJvbShtYXNrKS50b1N0cmluZyhcImJhc2U2NFwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgXCJwYXNzd29yZFwiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgdXNlciBjcmVkZW50aWFscy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBwYXNzd29yZChkYXRhOiB7IHVzZXJuYW1lOiBzdHJpbmc7IHBhc3N3b3JkOiBzdHJpbmc7IHNjb3BlPzogc3RyaW5nIH0pOiBQcm9taXNlPE9BdXRoQ3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IE9BdXRoUGFzc3dvcmRSZXF1ZXN0KGRhdGEudXNlcm5hbWUsIGRhdGEucGFzc3dvcmQsIGRhdGEuc2NvcGUpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoXCIvb2F1dGgvdG9rZW5cIiwgc3RyaW5naWZ5KHJlcXVlc3QpLCB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke09BdXRoV2ViU2VydmljZS5nZXRCYXNpY1Rva2VuKHRoaXMub3B0aW9ucyl9YFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICByZXR1cm4gbmV3IE9BdXRoQ3JlZGVudGlhbHMocmVzcG9uc2UuZGF0YSk7XG4gICAgfVxuICAgIHRocm93IHJlc3BvbnNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBcImNsaWVudF9jcmVkZW50aWFsc1wiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNsaWVudENyZWRlbnRpYWxzKCk6IFByb21pc2U8T0F1dGhDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgT0F1dGhDbGllbnRDcmVkZW50aWFsc1JlcXVlc3QoKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFwiL29hdXRoL3Rva2VuXCIsIHN0cmluZ2lmeShyZXF1ZXN0KSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmFzaWMgJHtPQXV0aFdlYlNlcnZpY2UuZ2V0QmFzaWNUb2tlbih0aGlzLm9wdGlvbnMpfWAgLy8gR2V0IGNyZWRlbnRpYWxzIGZyb20gb3B0aW9uc1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICByZXR1cm4gbmV3IE9BdXRoQ3JlZGVudGlhbHMocmVzcG9uc2UuZGF0YSk7XG4gICAgfVxuICAgIHRocm93IHJlc3BvbnNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgXCJyZWZyZXNoX3Rva2VuXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVmcmVzaFRva2VuKGRhdGE6IHsgcmVmcmVzaFRva2VuOiBzdHJpbmcgfSk6IFByb21pc2U8T0F1dGhDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgT0F1dGhSZWZyZXNoUmVxdWVzdChkYXRhLnJlZnJlc2hUb2tlbik7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFwiL29hdXRoL3Rva2VuXCIsIHN0cmluZ2lmeShyZXF1ZXN0KSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmFzaWMgJHtPQXV0aFdlYlNlcnZpY2UuZ2V0QmFzaWNUb2tlbih0aGlzLm9wdGlvbnMpfWAgLy8gR2V0IGNyZWRlbnRpYWxzIGZyb20gb3B0aW9uc1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBPQXV0aENyZWRlbnRpYWxzKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldm9rZXMgb25lIG9yIGFsbCB0b2tlbnMgZnJvbSBhIHVzZXIgdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBhY2Nlc3NUb2tlbiBUaGUgdXNlciBhY2Nlc3MgdG9rZW4uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmV2b2tlKGFjY2Vzc1Rva2VuPzogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcbiAgICAgIFwiL29hdXRoL3Jldm9rZVwiLFxuICAgICAgeyBhY2Nlc3NUb2tlbiB9LFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmFzaWMgJHtPQXV0aFdlYlNlcnZpY2UuZ2V0QmFzaWNUb2tlbih0aGlzLm9wdGlvbnMpfWAgLy8gR2V0IGNyZWRlbnRpYWxzIGZyb20gb3B0aW9uc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIFRoZSBjbGllbnQgbWF5IGNob29zZSB0byBpZ25vcmUgdGhpcyBlcnJvciwgYXMgaXQgd291bGRuJ3QgaW50ZXJmZXJlIHdpdGggdGhlIHVzZXIgZmxvdy5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgc2VjcmV0IHRva2VuIHVzaW5nIGEgYWNjZXNzVG9rZW5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFjY2Vzc1Rva2VuIFRoZSB1c2VyIGFjY2VzcyB0b2tlblxuICAgKiBAcGFyYW0ge09BdXRoU2VjcmV0VG9rZW5SZXNvdXJjZX0gcmVzb3VyY2VzIFRoZSByZXNvdXJjZXMgdGhlIHNlY3JldCB0b2tlbiB3aWxsIGhhdmUgYWNjZXNzIHRvXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IFtzY29wZXNdIFRoZSBzY29wZXMgdGhlIHNlY3JldCB0b2tlbiB3aWxsIGhhdmUgYWNjZXNzIHRvLlxuICAgKiBJZiB1bmRlZmluZWQsIHdpbGwgdXNlIHRoZSBkZWZhdWx0IHNjb3BlcyBmb3IgdGhlIHVzZXIgcm9sZVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlY3JldChhY2Nlc3NUb2tlbjogc3RyaW5nLCByZXNvdXJjZXM6IE9BdXRoU2VjcmV0VG9rZW5SZXNvdXJjZSwgc2NvcGVzPzogc3RyaW5nW10pIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFxuICAgICAgXCIvb2F1dGgvc2VjcmV0XCIsXG4gICAgICB7IHJlc291cmNlcywgc2NvcGVzIH0sXG4gICAgICB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBPQXV0aFNlY3JldFRva2VuKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc2VydmVyIHN0YXR1cy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzdGF0dXMoKTogUHJvbWlzZTxPQXV0aFN0YXR1c1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvYCk7XG5cbiAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIHJldHVybiBuZXcgT0F1dGhTdGF0dXNSZXNwb25zZShyZXNwb25zZS5kYXRhKTtcbiAgICB9XG5cbiAgICB0aHJvdyByZXNwb25zZTtcbiAgfVxufVxuIl19