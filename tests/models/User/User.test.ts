import * as hat from "hat";
import * as uuid from "uuid/v4";
import { User, OAuthCredentials, UserRole, UserStatus, UserSchema } from "../../../lib";

const TEST_CREDENTIALS = {
  token_type: "bearer",
  access_token: hat(),
  refresh_token: hat(),
  user_id: hat(),
  expires_in: 3600
};

const TEST_VIRTUAL_CREDENTIALS = {
  token_type: "bearer",
  access_token: hat(),
  refresh_token: hat(),
  user_id: hat(),
  expires_in: 3600,
  virtual: true
};

export const TEST_USER: UserSchema = {
  id: uuid(),
  firstName: "John Doe",
  lastName: "Connor Bro",
  email: "user@test.com",
  role: UserRole.CONSUMER,
  status: UserStatus.ACTIVE,
  domain: undefined,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

describe("lib.models.User", () => {
  it("should instantiate properly without credentials", async () => {
    const user = new User({ ...TEST_USER });

    expect(user).toBeTruthy();
    expect(user.firstName).toBe(TEST_USER.firstName);
    expect(user.lastName).toBe(TEST_USER.lastName);
    expect(user.email).toBe(TEST_USER.email);
    expect(user.credentials).toBeUndefined();
  });

  it("should instantiate properly with credentials instance", async () => {
    const credentials = new OAuthCredentials(TEST_CREDENTIALS);
    const user = new User({ credentials, ...TEST_USER });

    expect(user).toBeTruthy();
    expect(user.firstName).toBe(TEST_USER.firstName);
    expect(user.lastName).toBe(TEST_USER.lastName);
    expect(user.email).toBe(TEST_USER.email);
    expect(user.credentials).toBeInstanceOf(OAuthCredentials);
  });

  it("should instantiate properly with virtual credentials instance", async () => {
    const credentials = new OAuthCredentials(TEST_VIRTUAL_CREDENTIALS);
    const user = new User({ credentials, ...TEST_USER });

    expect(user).toBeTruthy();
    expect(user.virtual).toBe(true);
    expect(user.firstName).toBe(TEST_USER.firstName);
    expect(user.lastName).toBe(TEST_USER.lastName);
    expect(user.email).toBe(TEST_USER.email);
    expect(user.credentials).toBeInstanceOf(OAuthCredentials);
  });

  it("should instantiate properly with credentials raw data", async () => {
    const user = new User({ credentials: TEST_CREDENTIALS as any, ...TEST_USER });

    expect(user).toBeTruthy();
    expect(user.firstName).toBe(TEST_USER.firstName);
    expect(user.lastName).toBe(TEST_USER.lastName);
    expect(user.email).toBe(TEST_USER.email);
    expect(user.credentials).toBeInstanceOf(OAuthCredentials);
  });

  it("should handle the name getter and setter properly", async () => {
    const user = new User({ credentials: TEST_CREDENTIALS as any, ...TEST_USER });

    expect(user).toBeTruthy();
    expect(user.name).toMatch(new RegExp(user.firstName, "ig"));
    expect(user.name).toMatch(new RegExp(user.lastName, "ig"));
  });
});
