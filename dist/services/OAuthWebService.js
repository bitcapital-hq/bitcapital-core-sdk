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
const qs_1 = require("qs");
const buffer_1 = require("buffer");
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
     * Revoke one or all tokens from a user using the OAuth 2.0 server.
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
                headers: { "Content-type": "application/x-www-form-urlencoded",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL09BdXRoV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkJBQStCO0FBQy9CLG1DQUFnQztBQUNoQyxrQ0FBNEM7QUFDNUMsc0NBQTZDO0FBQzdDLHVDQUFnRjtBQUNoRix5Q0FBaUQ7QUFDakQsdUVBQThGO0FBTzlGO0lBS0UsWUFBWSxPQUErQjtRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsYUFBYSxDQUFDLElBQWdEO1FBQzFFLE1BQU0sSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckQsT0FBTyxlQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLFFBQVEsQ0FBQyxJQUE0RDs7WUFDaEYsTUFBTSxPQUFPLEdBQUcsSUFBSSw4QkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25GLE1BQU0sUUFBUSxH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QUM7S0FBQTtDQUNGO0FBaElELGtDQWdJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0cmluZ2lmeSB9IGZyb20gXCJxc1wiO1xuaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSBcImJ1ZmZlclwiO1xuaW1wb3J0IHsgSHR0cCwgSHR0cE9wdGlvbnMgfSBmcm9tIFwiLi4vYmFzZVwiO1xuaW1wb3J0IHsgT0F1dGhDcmVkZW50aWFscyB9IGZyb20gXCIuLi9tb2RlbHNcIjtcbmltcG9ydCB7IE9BdXRoUGFzc3dvcmRSZXF1ZXN0LCBPQXV0aENsaWVudENyZWRlbnRpYWxzUmVxdWVzdCB9IGZyb20gXCIuL3JlcXVlc3RcIjtcbmltcG9ydCB7IE9BdXRoU3RhdHVzUmVzcG9uc2UgfSBmcm9tIFwiLi9yZXNwb25zZVwiO1xuaW1wb3J0IE9BdXRoU2VjcmV0VG9rZW4sIHsgT0F1dGhTZWNyZXRUb2tlblJlc291cmNlIH0gZnJvbSBcIi4uL21vZGVscy9PQXV0aC9PQXV0aFNlY3JldFRva2VuXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIEh0dHBPcHRpb25zIHtcbiAgY2xpZW50SWQ6IHN0cmluZztcbiAgY2xpZW50U2VjcmV0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9BdXRoV2ViU2VydmljZSB7XG4gIHByb3RlY3RlZCBvcHRpb25zOiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zO1xuICBwcm90ZWN0ZWQgaHR0cDogSHR0cDtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogT0F1dGhXZWJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9BdXRoV2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuaHR0cCA9IG5ldyBIdHRwKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBPQXV0aFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IE9BdXRoV2ViU2VydmljZU9wdGlvbnMpOiBPQXV0aFdlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgT0F1dGhXZWJTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGJhc2ljIHRva2VuIGZvciBjbGllbnQgY3JlZGVudGlhbHMgYXV0aGVudGljYXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEJhc2ljVG9rZW4oZGF0YTogeyBjbGllbnRJZDogc3RyaW5nOyBjbGllbnRTZWNyZXQ6IHN0cmluZyB9KTogc3RyaW5nIHtcbiAgICBjb25zdCBtYXNrID0gYCR7ZGF0YS5jbGllbnRJZH06JHtkYXRhLmNsaWVudFNlY3JldH1gO1xuICAgIHJldHVybiBCdWZmZXIuZnJvbShtYXNrKS50b1N0cmluZyhcImJhc2U2NFwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgXCJwYXNzd29yZFwiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgdXNlciBjcmVkZW50aWFscy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBwYXNzd29yZChkYXRhOiB7IHVzZXJuYW1lOiBzdHJpbmc7IHBhc3N3b3JkOiBzdHJpbmc7IHNjb3BlPzogc3RyaW5nIH0pOiBQcm9taXNlPE9BdXRoQ3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IE9BdXRoUGFzc3dvcmRSZXF1ZXN0KGRhdGEudXNlcm5hbWUsIGRhdGEucGFzc3dvcmQsIGRhdGEuc2NvcGUpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoXCIvb2F1dGgvdG9rZW5cIiwgc3RyaW5naWZ5KHJlcXVlc3QpLCB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke09BdXRoV2ViU2VydmljZS5nZXRCYXNpY1Rva2VuKHRoaXMub3B0aW9ucyl9YFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICByZXR1cm4gbmV3IE9BdXRoQ3JlZGVudGlhbHMocmVzcG9uc2UuZGF0YSk7XG4gICAgfVxuICAgIHRocm93IHJlc3BvbnNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBcImNsaWVudF9jcmVkZW50aWFsc1wiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNsaWVudENyZWRlbnRpYWxzKCk6IFByb21pc2U8T0F1dGhDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgT0F1dGhDbGllbnRDcmVkZW50aWFsc1JlcXVlc3QoKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFwiL29hdXRoL3Rva2VuXCIsIHN0cmluZ2lmeShyZXF1ZXN0KSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmFzaWMgJHtPQXV0aFdlYlNlcnZpY2UuZ2V0QmFzaWNUb2tlbih0aGlzLm9wdGlvbnMpfWAgLy8gR2V0IGNyZWRlbnRpYWxzIGZyb20gb3B0aW9uc1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICByZXR1cm4gbmV3IE9BdXRoQ3JlZGVudGlhbHMocmVzcG9uc2UuZGF0YSk7XG4gICAgfVxuICAgIHRocm93IHJlc3BvbnNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldm9rZSBvbmUgb3IgYWxsIHRva2VucyBmcm9tIGEgdXNlciB1c2luZyB0aGUgT0F1dGggMi4wIHNlcnZlci5cbiAgICpcbiAgICogQHBhcmFtIGFjY2Vzc1Rva2VuIFRoZSB1c2VyIGFjY2VzcyB0b2tlbi5cbiAgICovXG4gIHB1YmxpYyBhc3luYyByZXZva2UoYWNjZXNzVG9rZW4/OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFxuICAgICAgXCIvb2F1dGgvcmV2b2tlXCIsXG4gICAgICB7IGFjY2Vzc1Rva2VuIH0sXG4gICAgICB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke09BdXRoV2ViU2VydmljZS5nZXRCYXNpY1Rva2VuKHRoaXMub3B0aW9ucyl9YCAvLyBHZXQgY3JlZGVudGlhbHMgZnJvbSBvcHRpb25zXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gVGhlIGNsaWVudCBtYXkgY2hvb3NlIHRvIGlnbm9yZSB0aGlzIGVycm9yLCBhcyBpdCB3b3VsZG4ndCBpbnRlcmZlcmUgd2l0aCB0aGUgdXNlciBmbG93LlxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzZWNyZXQgdG9rZW4gdXNpbmcgYSBhY2Nlc3NUb2tlblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYWNjZXNzVG9rZW4gVGhlIHVzZXIgYWNjZXNzIHRva2VuXG4gICAqIEBwYXJhbSB7T0F1dGhTZWNyZXRUb2tlblJlc291cmNlfSByZXNvdXJjZXMgVGhlIHJlc291cmNlcyB0aGUgc2VjcmV0IHRva2VuIHdpbGwgaGF2ZSBhY2Nlc3MgdG9cbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gW3Njb3Blc10gVGhlIHNjb3BlcyB0aGUgc2VjcmV0IHRva2VuIHdpbGwgaGF2ZSBhY2Nlc3MgdG8uIFxuICAgKiBJZiB1bmRlZmluZWQsIHdpbGwgdXNlIHRoZSBkZWZhdWx0IHNjb3BlcyBmb3IgdGhlIHVzZXIgcm9sZVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlY3JldChhY2Nlc3NUb2tlbjogc3RyaW5nLCByZXNvdXJjZXM6IE9BdXRoU2VjcmV0VG9rZW5SZXNvdXJjZSwgc2NvcGVzPzogc3RyaW5nW10pIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFxuICAgICAgXCIvb2F1dGgvc2VjcmV0XCIsXG4gICAgICB7IHJlc291cmNlcywgc2NvcGVzIH0sXG4gICAgICB7XG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FjY2Vzc1Rva2VufWBcbiAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgT0F1dGhTZWNyZXRUb2tlbihyZXNwb25zZS5kYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNlcnZlciBzdGF0dXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc3RhdHVzKCk6IFByb21pc2U8T0F1dGhTdGF0dXNSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldChgL2ApO1xuXG4gICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICByZXR1cm4gbmV3IE9BdXRoU3RhdHVzUmVzcG9uc2UocmVzcG9uc2UuZGF0YSk7XG4gICAgfVxuXG4gICAgdGhyb3cgcmVzcG9uc2U7XG4gIH1cbn1cbiJdfQ==