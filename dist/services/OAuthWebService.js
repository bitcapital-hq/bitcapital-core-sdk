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
class OAuthWebService extends base_1.Http {
    constructor(options) {
        super(options);
    }
    static getInstance(options) {
        if (!this.instance) {
            this.instance = new OAuthWebService(options);
        }
        return this.instance;
    }
    /**
     * Gets basic token for client credentials authentication.
     *
     * @returns {String}
     */
    static getBasicToken(data) {
        const mask = `${data.clientId}:${data.clientSecret}`;
        return (new buffer_1.Buffer(mask).toString('base64'));
    }
    /**
     * Performs a "password" authentication using the OAuth 2.0 server.
     *
     * @param data The user credentials
     */
    password(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new request_1.OAuthPasswordRequest(data.username, data.password);
            const response = yield this.post('/oauth/token', qs_1.stringify(request), {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${OAuthWebService.getBasicToken(this.options)}`,
                },
            });
            if (response && response.status === 200) {
                return new models_1.OAuthCredentials(response.data);
            }
            throw response;
        });
    }
    /**
     * Performs a "client_credentials" authentication using the OAuth 2.0 server.
     */
    clientCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new request_1.OAuthClientCredentialsRequest();
            const response = yield this.post('/oauth/token', qs_1.stringify(request), {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${OAuthWebService.getBasicToken(this.options)}`,
                },
            });
            if (response && response.status === 200) {
                return new models_1.OAuthCredentials(response.data);
            }
            throw response;
        });
    }
    /**
     * Revokes one or all tokens from a user using the OAuth 2.0 server.
     *
     * @param accessToken The user access token
     */
    revoke(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.post('/oauth/revoke', { accessToken }, {
                headers: { 'Content-type': 'application/x-www-form-urlencoded' },
            });
            // The client may choose to ignore this error, as it wouldn't interfere with the user flow.
            if (!response || response.status !== 200) {
                throw response;
            }
        });
    }
    /**
     * Gets the server status.
     */
    status() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get(`/`);
            if (response && response.status === 200) {
                return new response_1.OAuthStatusResponse(response.data);
            }
            throw response;
        });
    }
}
exports.default = OAuthWebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhXZWJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NlcnZpY2VzL09BdXRoV2ViU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkJBQStCO0FBQy9CLG1DQUFnQztBQUNoQyxrQ0FBNEM7QUFDNUMsc0NBQTZDO0FBQzdDLHVDQUFnRjtBQUNoRix5Q0FBaUQ7QUFPakQscUJBQXFDLFNBQVEsV0FBSTtJQUkvQyxZQUFZLE9BQStCO1FBQ3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUErQjtRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFnRDtRQUMxRSxNQUFNLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JELE9BQU8sQ0FBQyxJQUFJLGVBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLFFBQVEsQ0FBQyxJQUE0Qzs7WUFDaEUsTUFBTSxPQUFPLEdBQUcsSUFBSSw4QkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2RSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLGNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDbkUsT0FBTyxFQUFFO29CQUNQLGNBQWMsRUFBRSxtQ0FBbUM7b0JBQ25ELGFBQWEsRUFBRSxTQUFTLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2lCQUN0RTthQUNGLENBQUMsQ0FBQztZQUVILElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN2QyxPQUFPLElBQUkseUJBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVDO1lBQ0QsTUFBTSxRQUFRLENBQUM7UUFDakIsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxpQkFBaUI7O1lBQzVCLE1BQU0sT0FBTyxHQUFHLElBQUksdUNBQTZCLEVBQUUsQ0FBQztZQUNwRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLGNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDbkUsT0FBTyxFQUFFO29CQUNQLGNBQWMsRUFBRSxtQ0FBbUM7b0JBQ25ELGFBQWEsRUFBRSxTQUFTLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2lCQUN0RTthQUNGLENBQUMsQ0FBQztZQUVILElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN2QyxPQUFPLElBQUkseUJBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVDO1lBQ0QsTUFBTSxRQUFRLENBQUM7UUFDakIsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLE1BQU0sQ0FBQyxXQUFvQjs7WUFFdEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFO2dCQUNqRSxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsbUNBQW1DLEVBQUU7YUFDakUsQ0FBQyxDQUFDO1lBRUgsMkZBQTJGO1lBQzNGLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hDLE1BQU0sUUFBUSxDQUFDO2FBQ2hCO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxNQUFNOztZQUNqQixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFckMsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3ZDLE9BQU8sSUFBSSw4QkFBbUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0M7WUFFRCxNQUFNLFFBQVEsQ0FBQztRQUNqQixDQUFDO0tBQUE7Q0FDRjtBQTVGRCxrQ0E0RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdHJpbmdpZnkgfSBmcm9tICdxcyc7XG5pbXBvcnQgeyBCdWZmZXIgfSBmcm9tICdidWZmZXInO1xuaW1wb3J0IHsgSHR0cCwgSHR0cE9wdGlvbnMgfSBmcm9tICcuLi9iYXNlJztcbmltcG9ydCB7IE9BdXRoQ3JlZGVudGlhbHMgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgT0F1dGhQYXNzd29yZFJlcXVlc3QsIE9BdXRoQ2xpZW50Q3JlZGVudGlhbHNSZXF1ZXN0IH0gZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7IE9BdXRoU3RhdHVzUmVzcG9uc2UgfSBmcm9tICcuL3Jlc3BvbnNlJztcblxuZXhwb3J0IGludGVyZmFjZSBPQXV0aFdlYlNlcnZpY2VPcHRpb25zIGV4dGVuZHMgSHR0cE9wdGlvbnMge1xuICBjbGllbnRJZDogc3RyaW5nO1xuICBjbGllbnRTZWNyZXQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0F1dGhXZWJTZXJ2aWNlIGV4dGVuZHMgSHR0cCB7XG4gIHByb3RlY3RlZCBvcHRpb25zOiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zO1xuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBPQXV0aFdlYlNlcnZpY2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogT0F1dGhXZWJTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZShvcHRpb25zOiBPQXV0aFdlYlNlcnZpY2VPcHRpb25zKTogT0F1dGhXZWJTZXJ2aWNlIHtcbiAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgT0F1dGhXZWJTZXJ2aWNlKG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGJhc2ljIHRva2VuIGZvciBjbGllbnQgY3JlZGVudGlhbHMgYXV0aGVudGljYXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEJhc2ljVG9rZW4oZGF0YTogeyBjbGllbnRJZDogc3RyaW5nLCBjbGllbnRTZWNyZXQ6IHN0cmluZyB9KTogU3RyaW5nIHtcbiAgICBjb25zdCBtYXNrID0gYCR7ZGF0YS5jbGllbnRJZH06JHtkYXRhLmNsaWVudFNlY3JldH1gO1xuICAgIHJldHVybiAobmV3IEJ1ZmZlcihtYXNrKS50b1N0cmluZygnYmFzZTY0JykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgXCJwYXNzd29yZFwiIGF1dGhlbnRpY2F0aW9uIHVzaW5nIHRoZSBPQXV0aCAyLjAgc2VydmVyLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgdXNlciBjcmVkZW50aWFsc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHBhc3N3b3JkKGRhdGE6IHsgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyB9KTogUHJvbWlzZTxPQXV0aENyZWRlbnRpYWxzPiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBPQXV0aFBhc3N3b3JkUmVxdWVzdChkYXRhLnVzZXJuYW1lLCBkYXRhLnBhc3N3b3JkKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucG9zdCgnL29hdXRoL3Rva2VuJywgc3RyaW5naWZ5KHJlcXVlc3QpLCB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJhc2ljICR7T0F1dGhXZWJTZXJ2aWNlLmdldEJhc2ljVG9rZW4odGhpcy5vcHRpb25zKX1gLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgcmV0dXJuIG5ldyBPQXV0aENyZWRlbnRpYWxzKHJlc3BvbnNlLmRhdGEpO1xuICAgIH1cbiAgICB0aHJvdyByZXNwb25zZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIFwiY2xpZW50X2NyZWRlbnRpYWxzXCIgYXV0aGVudGljYXRpb24gdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2xpZW50Q3JlZGVudGlhbHMoKTogUHJvbWlzZTxPQXV0aENyZWRlbnRpYWxzPiB7XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBPQXV0aENsaWVudENyZWRlbnRpYWxzUmVxdWVzdCgpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wb3N0KCcvb2F1dGgvdG9rZW4nLCBzdHJpbmdpZnkocmVxdWVzdCksIHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmFzaWMgJHtPQXV0aFdlYlNlcnZpY2UuZ2V0QmFzaWNUb2tlbih0aGlzLm9wdGlvbnMpfWAsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICByZXR1cm4gbmV3IE9BdXRoQ3JlZGVudGlhbHMocmVzcG9uc2UuZGF0YSk7XG4gICAgfVxuICAgIHRocm93IHJlc3BvbnNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldm9rZXMgb25lIG9yIGFsbCB0b2tlbnMgZnJvbSBhIHVzZXIgdXNpbmcgdGhlIE9BdXRoIDIuMCBzZXJ2ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBhY2Nlc3NUb2tlbiBUaGUgdXNlciBhY2Nlc3MgdG9rZW5cbiAgICovXG4gIHB1YmxpYyBhc3luYyByZXZva2UoYWNjZXNzVG9rZW4/OiBTdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wb3N0KCcvb2F1dGgvcmV2b2tlJywgeyBhY2Nlc3NUb2tlbiB9LCB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9LFxuICAgIH0pO1xuXG4gICAgLy8gVGhlIGNsaWVudCBtYXkgY2hvb3NlIHRvIGlnbm9yZSB0aGlzIGVycm9yLCBhcyBpdCB3b3VsZG4ndCBpbnRlcmZlcmUgd2l0aCB0aGUgdXNlciBmbG93LlxuICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHRocm93IHJlc3BvbnNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzZXJ2ZXIgc3RhdHVzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHN0YXR1cygpOiBQcm9taXNlPE9BdXRoU3RhdHVzUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0KGAvYCk7XG5cbiAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIHJldHVybiBuZXcgT0F1dGhTdGF0dXNSZXNwb25zZShyZXNwb25zZS5kYXRhKTtcbiAgICB9XG5cbiAgICB0aHJvdyByZXNwb25zZTtcbiAgfVxufVxuIl19