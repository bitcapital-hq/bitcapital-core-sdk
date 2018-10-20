import * as hat from "hat";
import * as MockAdapter from "axios-mock-adapter";
import { User, OAuthCredentials, Session, StorageUtil, MemoryStorage } from "../../lib";
import OAuthWebService from "../../lib/services/OAuthWebService";
import UserWebService from "../../lib/services/UserWebService";

jest.useFakeTimers();

const TEST_CREDENTIALS = {
  token_type: "bearer",
  access_token: hat(),
  refresh_token: hat(),
  user_id: hat(),
  expires_in: 3600
};

const TEST_USER = {
  _id: hat(),
  name: "Test User",
  email: "user@test.com"
};

describe("lib.session.Session", () => {
  it("should have a valid lib interface", async () => {
    expect(Session).toBeTruthy();
    expect(Session.getInstance).toBeInstanceOf(Function);
  });

  it("should instantiate a simple Session directly", async () => {
    const session = new Session({
      storage: new StorageUtil("session", new MemoryStorage()),
      oauth: {
        clientId: hat(),
        clientSecret: hat(),
        baseURL: "http://localhost:3000/test_url"
      },
      http: {
        baseURL: "http://localhost:3000/test_url"
      }
    });
    expect(session).toBeTruthy();
  });

  it("should instantiate a simple singleton Session", async () => {
    const session = Session.initialize({
      storage: new StorageUtil("session", new MemoryStorage()),
      oauth: {
        clientId: hat(),
        clientSecret: hat(),
        baseURL: "http://localhost:3000/test_url"
      },
      http: {
        baseURL: "http://localhost:3000/test_url"
      }
    });
    expect(session).toBeTruthy();
    expect((Session as any).instance).toEqual(session);
    expect(Session.getInstance()).toEqual(session);
  });

  describe("Success OAuth 2.0 tokens", () => {
    let session: Session;

    beforeEach(async () => {
      // This sets the mock adapter on the default instance
      session = new Session({
        storage: new StorageUtil("session", new MemoryStorage()),
        oauth: {
          clientId: hat(),
          clientSecret: hat(),
          baseURL: "http://localhost:3000/test_url"
        },
        http: {
          baseURL: "http://localhost:3000/test_url"
        }
      });

      // Mock session web services for authentication
      const oauthMock = new (MockAdapter as any)((session.oauthWebService as any).http.client);
      const userMock = new (MockAdapter as any)((session.userWebService as any).http.client);

      // Mock requests to a simple success
      oauthMock.onPost("/oauth/token").reply(200, TEST_CREDENTIALS);
      userMock.onGet("/users/me").reply(200, TEST_USER);

      // Mock find all users request to 401 so we can test refresh token
      userMock.onGet("/users").reply(401);
    });

    afterEach(async () => {
      if (session) {
        session.destroy();
      }
      session = undefined;
    });

    it("should password authenticate with a mocked instance", async () => {
      const response = await session.password({
        username: "test",
        password: "test"
      });

      expect(response).toBeInstanceOf(User);
      expect(response.credentials).toBeInstanceOf(OAuthCredentials);
      expect(session.current).toBe(response);

      await (session as any).fetch();
      expect(session.current).toBeTruthy();

      await session.destroy();
      expect(session.current).toBeFalsy();
    });

    it("should refresh token authenticate with a mocked instance", async () => {
      const response = await session.refreshToken({
        refreshToken: hat()
      });

      expect(response).toBeInstanceOf(User);
      expect(response.credentials).toBeInstanceOf(OAuthCredentials);
      expect(session.current).toBe(response);

      await (session as any).fetch();
      expect(session.current).toBeTruthy();

      await session.destroy();
      expect(session.current).toBeFalsy();
    });

    it("should try to refresh token authenticate on the first 401 response", async () => {
      // Authenticate the user
      await session.password({
        username: "test",
        password: "test"
      });

      // Make a call that will return 401, as if the token was revoked or expired
      try {
        await session.userWebService.findAll({});
      } catch {}

      // Check if the session performed a refresh token authentication
      expect(session.current).toBeInstanceOf(User);
    });

    it("should publish the right events", async () => {
      let notified = false;
      const observer = {
        update(eventName: string) {
          notified = true;
        }
      };

      session.subscribe(observer);

      const response = await session.password({
        username: "test",
        password: "test"
      });

      expect(response).toBeInstanceOf(User);
      expect(response.credentials).toBeInstanceOf(OAuthCredentials);

      // Fast-forward until all timers have been executed
      jest.runAllTimers();
      expect(notified).toBe(true);

      notified = false;

      session.unsubscribe(observer);
      await session.destroy();

      expect(session.current).toBeFalsy();
      expect(notified).toBe(false);
    });
  });
});
