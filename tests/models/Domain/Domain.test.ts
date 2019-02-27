import * as faker from "faker";
import * as uuid from "uuid/v4";
import { DomainRole, DomainSchema, DomainSettingsLocks } from "bitcapital-common";
import { TEST_USER } from "../User/User.test";

export const TEST_DOMAIN = (): DomainSchema => ({
  id: uuid(),
  name: "Test",
  role: DomainRole.COMMON,
  postbackUrl: faker.internet.domainName(),
  urls: Array.from({ length: faker.random.number(5) }, () => faker.internet.domainName()),
  users: Array.from({ length: faker.random.number(5) }, () => TEST_USER()),
  settings: { locks: new DomainSettingsLocks() },
  test: faker.random.boolean()
});
