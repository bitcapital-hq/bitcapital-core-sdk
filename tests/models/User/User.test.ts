import * as uuid from "uuid/v4";
import * as faker from "faker";
import {
  User,
  OAuthCredentials,
  UserRole,
  UserStatus,
  UserSchema,
  Consumer,
  OAuthCredentialsSchema
} from "../../../lib";
import { TEST_CONSUMER } from "../Consumer/Consumer.test";
import { TEST_WALLET } from "../Wallet/Wallet.test";

const TEST_CREDENTIALS = (virtual: boolean = false): OAuthCredentialsSchema => ({
  virtual,
  token_type: "bearer",
  access_token: uuid(),
  refresh_token: uuid(),
  user_id: uuid(),
  expires_in: 3600,
  scope: []
});

export const TEST_USER = (
  options: { consumer: boolean; credentials: false | "common" | "virtual" } = { consumer: false, credentials: false }
): UserSchema => ({
  id: uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  role: UserRole.PUBLIC,
  status: UserStatus.ACTIVE,
  consumer: options.consumer ? TEST_CONSUMER() : undefined,
  wallets: Array.from({ length: faker.random.number({ min: 1, max: 3 }) }, () => TEST_WALLET()),
  credentials: options.credentials
    ? new OAuthCredentials(TEST_CREDENTIALS(options.credentials === "virtual"))
    : undefined
});

describe("lib.models.User", () => {
  it("should instantiate properly without credentials", async () => {
    const schema = TEST_USER({ consumer: true, credentials: false });
    const user = new User(schema);

    expect(user.id).toBe(schema.id);
    expect(user.firstName).toBe(schema.firstName);
    expect(user.lastName).toBe(schema.lastName);
    expect(user.email).toBe(schema.email);
    expect(user.role).toBe(schema.role);
    expect(user.status).toBe(schema.status);
    expect(user.consumer).toBeInstanceOf(Consumer);
  });

  it("should instantiate properly with credentials instance", async () => {
    const schema = TEST_USER({ consumer: true, credentials: "common" });
    const user = new User(schema);

    expect(user.id).toBe(schema.id);
    expect(user.firstName).toBe(schema.firstName);
    expect(user.lastName).toBe(schema.lastName);
    expect(user.email).toBe(schema.email);
    expect(user.role).toBe(schema.role);
    expect(user.status).toBe(schema.status);
    expect(user.credentials).toBeInstanceOf(OAuthCredentials);
  });

  it("should instantiate properly with virtual credentials instance", async () => {
    const schema = TEST_USER({ consumer: true, credentials: "virtual" });
    const user = new User(schema);

    expect(user.id).toBe(schema.id);
    expect(user.firstName).toBe(schema.firstName);
    expect(user.lastName).toBe(schema.lastName);
    expect(user.email).toBe(schema.email);
    expect(user.role).toBe(schema.role);
    expect(user.status).toBe(schema.status);
    expect(user.credentials).toBeInstanceOf(OAuthCredentials);
    expect(user.virtual).toBe(true);
  });

  it("should handle the name getter and setter properly", async () => {
    const user = new User({ credentials: TEST_CREDENTIALS as any, ...TEST_USER });

    expect(user).toBeTruthy();
    expect(user.name).toMatch(new RegExp(user.firstName, "ig"));
    expect(user.name).toMatch(new RegExp(user.lastName, "ig"));
  });
});
