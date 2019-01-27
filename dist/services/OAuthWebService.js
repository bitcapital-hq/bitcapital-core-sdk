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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL09BdXRoV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseURBQW9IO0FBQ3BILG1DQUFnQztBQUNoQywyQkFBK0I7QUFDL0IsdUNBQXFHO0FBQ3JHLHlDQUFpRDtBQU9qRDtJQUtFLFlBQVksT0FBK0I7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHdCQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUErQjtRQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBZ0Q7UUFDMUUsTUFBTSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyRCxPQUFPLGVBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7OztPQUlHO0lBQ1UsUUFBUSxDQUFDLElBQTREOztZQUNoRixNQUFNLE9BQU8sR0FBRyxJQUFJLDhCQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkYsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxD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LGNBQWMsRUFBRSxtQ0FBbUM7b0JBQ25ELGFBQWEsRUFBRSxVQUFVLFdBQVcsRUFBRTtpQkFDdkM7YUFDRixDQUNGLENBQUM7WUFFRixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QyxNQUFNLFFBQVEsQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxvQ0FBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxNQUFNOztZQUNqQixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTFDLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN2QyxPQUFPLElBQUksOEJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9DO1lBRUQsTUFBTSxRQUFRLENBQUM7UUFDakIsQ0FBQztLQUFBO0NBQ0Y7QUFySkQsMENBcUpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cCwgSHR0cE9wdGlvbnMsIE9BdXRoQ3JlZGVudGlhbHMsIE9BdXRoU2VjcmV0VG9rZW4sIE9BdXRoU2VjcmV0VG9rZW5SZXNvdXJjZSB9IGZyb20gXCJiaXRjYXBpdGFsLWNvbW1vblwiO1xuaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSBcImJ1ZmZlclwiO1xuaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSBcInFzXCI7XG5pbXBvcnQgeyBPQXV0aENsaWVudENyZWRlbnRpYWxzUmVxdWVzdCwgT0F1dGhQYXNzd29yZFJlcXVlc3QsIE9BdXRoUmVmcmVzaFJlcXVlc3QgfSBmcm9tIFwiLi9yZXF1ZXN0XCI7XG5pbXBvcnQgeyBPQXV0aFN0YXR1c1Jlc3BvbnNlIH0gZnJvbSBcIi4vcmVzcG9uc2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBPQXV0aFdlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgSHR0cE9wdGlvbnMge1xuICBjbGllbnRJZDogc3RyaW5nO1xuICBjbGllbnRTZWNyZXQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIE9BdXRoV2ViU2VydmljZSB7XG4gIHByb3RlY3RlZCBvcHRpb25zOiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zO1xuICBwcm90ZWN0ZWQgaHR0cDogSHR0cDtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogT0F1dGhXZWJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9BdXRoV2ViU2VydmljZU9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuaHR0cCA9IG5ldyBIdHRwKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBPQXV0aFdlYlNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IE9BdXRoV2ViU2VydmljZU9wdGlvbnMpOiBPQXV0aFdlYlNlcnZpY2Uge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgT0F1dGhXZWJTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGJhc2ljIHRva2VuIGZvciBjbGllbnQgY3JlZGVudGlhbHMgYXV0aGVudGljYXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEJhc2ljVG9rZW4oZGF0YTogeyBjbGllbnRJZDogc3RyaW5nOyBjbGllbnRTZWNyZXQ6IHN0cmluZyB9KTogc3RyaW5nIHtcbiAgICBjb25zdCBtYXNrID0gYCR7ZGF0YS5jbGllbnRJZH06JHtkYXRhLmNsaWVudFNlY3JldH1gO1xuICAgIHJldHVybiBCdWZmZXIuZnJvbShtYXNrKS50b1N0cmluZyhcImJhc2U2NFwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgXCJwYXNzd29yZFwiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgdXNlciBjcmVkZW50aWFscy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBwYXNzd29yZChkYXRhOiB7IHVzZXJuYW1lOiBzdHJpbmc7IHBhc3N3b3JkOiBzdHJpbmc7IHNjb3BlPzogc3RyaW5nIH0pOiBQcm9taXNlPE9BdXRoQ3JlZGVudGlhbHM+IHtcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IE9BdXRoUGFzc3dvcmRSZXF1ZXN0KGRhdGEudXNlcm5hbWUsIGRhdGEucGFzc3dvcmQsIGRhdGEuc2NvcGUpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3QoXCIvb2F1dGgvdG9rZW5cIiwgc3RyaW5naWZ5KHJlcXVlc3QpLCB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIsXG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke09BdXRoV2ViU2VydmljZS5nZXRCYXNpY1Rva2VuKHRoaXMub3B0aW9ucyl9YFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICByZXR1cm4gbmV3IE9BdXRoQ3JlZGVudGlhbHMocmVzcG9uc2UuZGF0YSk7XG4gICAgfVxuICAgIHRocm93IHJlc3BvbnNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBcImNsaWVudF9jcmVkZW50aWFsc1wiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNsaWVudENyZWRlbnRpYWxzKCk6IFByb21pc2U8T0F1dGhDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgT0F1dGhDbGllbnRDcmVkZW50aWFsc1JlcXVlc3QoKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFwiL29hdXRoL3Rva2VuXCIsIHN0cmluZ2lmeShyZXF1ZXN0KSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmFzaWMgJHtPQXV0aFdlYlNlcnZpY2UuZ2V0QmFzaWNUb2tlbih0aGlzLm9wdGlvbnMpfWAgLy8gR2V0IGNyZWRlbnRpYWxzIGZyb20gb3B0aW9uc1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICByZXR1cm4gbmV3IE9BdXRoQ3JlZGVudGlhbHMocmVzcG9uc2UuZGF0YSk7XG4gICAgfVxuICAgIHRocm93IHJlc3BvbnNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgXCJyZWZyZXNoX3Rva2VuXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmVmcmVzaFRva2VuKGRhdGE6IHsgcmVmcmVzaFRva2VuOiBzdHJpbmcgfSk6IFByb21pc2U8T0F1dGhDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgT0F1dGhSZWZyZXNoUmVxdWVzdChkYXRhLnJlZnJlc2hUb2tlbik7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFwiL29hdXRoL3Rva2VuXCIsIHN0cmluZ2lmeShyZXF1ZXN0KSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmFzaWMgJHtPQXV0aFdlYlNlcnZpY2UuZ2V0QmFzaWNUb2tlbih0aGlzLm9wdGlvbnMpfWAgLy8gR2V0IGNyZWRlbnRpYWxzIGZyb20gb3B0aW9uc1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBPQXV0aENyZWRlbnRpYWxzKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldm9rZXMgb25lIG9yIGFsbCB0b2tlbnMgZnJvbSBhIHVzZXIgdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBhY2Nlc3NUb2tlbiBUaGUgdXNlciBhY2Nlc3MgdG9rZW4uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcmV2b2tlKGFjY2Vzc1Rva2VuPzogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdChcbiAgICAgIFwiL29hdXRoL3Jldm9rZVwiLFxuICAgICAgeyBhY2Nlc3NUb2tlbiB9LFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIixcbiAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmFzaWMgJHtPQXV0aFdlYlNlcnZpY2UuZ2V0QmFzaWNUb2tlbih0aGlzLm9wdGlvbnMpfWAgLy8gR2V0IGNyZWRlbnRpYWxzIGZyb20gb3B0aW9uc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIFRoZSBjbGllbnQgbWF5IGNob29zZSB0byBpZ25vcmUgdGhpcyBlcnJvciwgYXMgaXQgd291bGRuJ3QgaW50ZXJmZXJlIHdpdGggdGhlIHVzZXIgZmxvdy5cbiAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICB0aHJvdyByZXNwb25zZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgc2VjcmV0IHRva2VuIHVzaW5nIGEgYWNjZXNzVG9rZW5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFjY2Vzc1Rva2VuIFRoZSB1c2VyIGFjY2VzcyB0b2tlblxuICAgKiBAcGFyYW0ge09BdXRoU2VjcmV0VG9rZW5SZXNvdXJjZX0gcmVzb3VyY2VzIFRoZSByZXNvdXJjZXMgdGhlIHNlY3JldCB0b2tlbiB3aWxsIGhhdmUgYWNjZXNzIHRvXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IFtzY29wZXNdIFRoZSBzY29wZXMgdGhlIHNlY3JldCB0b2tlbiB3aWxsIGhhdmUgYWNjZXNzIHRvLlxuICAgKiBJZiB1bmRlZmluZWQsIHdpbGwgdXNlIHRoZSBkZWZhdWx0IHNjb3BlcyBmb3IgdGhlIHVzZXIgcm9sZVxuICAgKi9cbiAgcHVibGljIGFzeW5jIHNlY3JldChhY2Nlc3NUb2tlbjogc3RyaW5nLCByZXNvdXJjZXM6IE9BdXRoU2VjcmV0VG9rZW5SZXNvdXJjZSwgc2NvcGVzPzogc3RyaW5nW10pIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0KFxuICAgICAgXCIvb2F1dGgvc2VjcmV0XCIsXG4gICAgICB7IHJlc291cmNlcywgc2NvcGVzIH0sXG4gICAgICB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgdGhyb3cgcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBPQXV0aFNlY3JldFRva2VuKHJlc3BvbnNlLmRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc2VydmVyIHN0YXR1cy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzdGF0dXMoKTogUHJvbWlzZTxPQXV0aFN0YXR1c1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0KGAvYCk7XG5cbiAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIHJldHVybiBuZXcgT0F1dGhTdGF0dXNSZXNwb25zZShyZXNwb25zZS5kYXRhKTtcbiAgICB9XG5cbiAgICB0aHJvdyByZXNwb25zZTtcbiAgfVxufVxuIl19