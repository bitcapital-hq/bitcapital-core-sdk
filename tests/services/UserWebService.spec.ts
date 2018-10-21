import * as hat from "hat";
import MockAdapter from "axios-mock-adapter";
import { UserWebService, OAuthCredentials, User, UserSchema } from "../../lib";
import { TEST_USER } from "../models/User/User.test";
import { CRUDWebServiceTest } from "./WebServiceUtil";

const TEST_CREDENTIALS = {
  token_type: "bearer",
  access_token: hat(),
  refresh_token: hat(),
  user_id: hat(),
  expires_in: 3600
};

describe("lib.services.UserWebService", () => {
  CRUDWebServiceTest("users", UserWebService, TEST_USER);
});

describe("Success user instance", () => {
  let user: UserWebService;

  beforeEach(async () => {
    // This sets the mock adapter on the default instance
    user = new UserWebService({
      baseURL: "http://localhost:3000/test_url",
      clientId: "test",
      clientSecret: "test"
    });

    const mock = new MockAdapter((user as any).http.client);

    // Mock all requests to a simple success
    mock.onGet("/users/me").reply(200, TEST_USER);
  });

  it("should get an user with a mocked instance", async () => {
    const response = await user.me(new OAuthCredentials(TEST_CREDENTIALS));
    expect(response).toBeInstanceOf(User);
    expect(response.credentials).toBeInstanceOf(OAuthCredentials);
  });
});
