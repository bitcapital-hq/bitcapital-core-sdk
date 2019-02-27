import * as uuid from "uuid/v4";
import * as faker from "faker";
import { OAuthCredentials, UserRole, UserStatus, UserSchema, OAuthCredentialsSchema } from "bitcapital-common";
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
