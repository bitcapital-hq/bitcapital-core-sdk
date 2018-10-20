import * as hat from "hat";
import MockAdapter from "axios-mock-adapter";
import { OAuthWebService } from "../../lib";
import OAuthCredentials from "../../lib/models/OAuth/OAuthCredentials";

const TEST_CREDENTIALS = {
  token_type: "bearer",
  access_token: hat(),
  refresh_token: hat(),
  user_id: hat(),
  expires_in: 3600
};

describe("lib.services.OAuthWebService", () => {
  it("should have a valid lib interface", async () => {
    expect(OAuthWebService).toBeTruthy();
    expect(OAuthWebService.getInstance).toBeInstanceOf(Function);
  });

  it("should instantiate a simple OAuthWebService directly", async () => {
    const oauth = new OAuthWebService({
      clientId: hat(),
      clientSecret: hat(),
      baseURL: "http://localhost:3000/test_url"
    });
    expect(oauth).toBeTruthy();
    expect((oauth as any).http.client).toBeTruthy();
  });

  it("should instantiate a simple singleton OAuthWebService", async () => {
    const oauth = OAuthWebService.initialize({
      clientId: hat(),
      clientSecret: hat(),
      baseURL: "http://localhost:3000/test_url"
    });
    expect(oauth).toBeTruthy();
    expect((oauth as any).http.client).toBeTruthy();
    expect((OAuthWebService as any).instance).toEqual(oauth);
    expect(OAuthWebService.getInstance()).toEqual(oauth);
  });

  describe("Success OAuth 2.0 tokens", () => {
    let oauth: OAuthWebService;

    beforeEach(async () => {
      // This sets the mock adapter on the default instance
      oauth = new OAuthWebService({
        clientId: "test",
        clientSecret: "test",
        baseURL: "http://localhost:3000/test_url"
      });

      const mock = new MockAdapter((oauth as any).http.client);

      // Mock all requests to a simple success
      mock.onPost("/oauth/token").reply(200, TEST_CREDENTIALS);
    });

    it("should perform a password authentication with a mocked instance", async () => {
      const response = await oauth.password({
        username: "test",
        password: "test"
      });

      expect(response).toBeInstanceOf(OAuthCredentials);
    });

    it("should perform a refresh token authentication with a mocked instance", async () => {
      const response = await oauth.refreshToken({
        refreshToken: hat()
      });

      expect(response).toBeInstanceOf(OAuthCredentials);
    });
  });

  describe("Invalid OAuth 2.0 responses", () => {
    let oauth: OAuthWebService;

    beforeEach(async () => {
      // This sets the mock adapter on the default instance
      oauth = new OAuthWebService({
        clientId: "test",
        clientSecret: "test",
        baseURL: "http://localhost:3000/test_url"
      });

      const mock = new MockAdapter((oauth as any).http.client);

      // Mock all requests to a simple fail
      mock.onPost("/oauth/token").networkError();
    });

    it("should fail with a mocked instance", async () => {
      let failed = false;

      try {
        const response = await oauth.password({
          username: "test",
          password: "test"
        });
      } catch (exception) {
        failed = true;
      }

      expect(failed).toBe(true);
    });
  });
});
