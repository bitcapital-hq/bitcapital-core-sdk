import * as hat from "hat";
import MockAdapter from "axios-mock-adapter";
import { UserWebService, OAuthCredentials, User, UserSchema } from "../../lib";
import { TEST_USER } from "../models/User/User.test";

const TEST_CREDENTIALS = {
  token_type: "bearer",
  access_token: hat(),
  refresh_token: hat(),
  user_id: hat(),
  expires_in: 3600
};

describe("lib.services.UserWebService", () => {
  beforeAll(() => {
    UserWebService.initialize({
      baseURL: "http://localhost:3000/test_url"
    });
    const mock = new MockAdapter((UserWebService.getInstance() as any).http.client);

    mock.onGet("/users").reply(200, [TEST_USER, TEST_USER, TEST_USER]);
    mock.onGet("/users/" + TEST_USER.id).reply(200, TEST_USER);
    mock.onPost("/users").reply(200, TEST_USER);
    mock.onPost("/users/" + TEST_USER.id).reply(200, TEST_USER);
    mock.onDelete("/users/" + TEST_USER.id).reply(200);
  });

  it("should find all", async () => {
    const all = await UserWebService.getInstance().findAll({});

    expect(all.length).toBe(3);
    expect(all[0]).toEqual(TEST_USER);
  });

  it("should find one", async () => {
    const one = await UserWebService.getInstance().findOne(TEST_USER.id);

    expect(one).toEqual(TEST_USER);
  });

  it("should create one", async () => {
    const one = await UserWebService.getInstance().create(TEST_USER);

    expect(one).toEqual(TEST_USER);
  });

  it("should update one", async () => {
    const one = await UserWebService.getInstance().update(TEST_USER.id, TEST_USER);

    expect(one).toEqual(TEST_USER);
  });

  it("should delete one", async () => {
    const one = await UserWebService.getInstance().delete(TEST_USER.id);

    expect(one).toEqual(true);
  });
});

describe("Success user instance", () => {
  let user: UserWebService;

  beforeEach(async () => {
    // This sets the mock adapter on the default instance
    user = new UserWebService({
      baseURL: "http://localhost:3000/test_url"
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
