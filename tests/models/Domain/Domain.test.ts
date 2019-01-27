import * as faker from "faker";
import * as uuid from "uuid/v4";
import { Domain, DomainRole, DomainSchema, DomainSettingsLocks, User } from "../../../lib";
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

describe("lib.models.Domain", () => {
  it("should instantiate a valid instance", async () => {
    const schema = TEST_DOMAIN();
    const domain = new Domain(schema);

    expect(domain.id).toBe(schema.id);
    expect(domain.name).toBe(schema.name);
    expect(domain.role).toBe(schema.role);
    expect(domain.postbackUrl).toBe(schema.postbackUrl);
    expect(domain.test).toBe(schema.test);
    domain.urls.forEach((url, index) => expect(url).toBe(schema.urls[index]));
    domain.users.forEach(user => expect(user).toBeInstanceOf(User));

    expect(await domain.isValid()).toBe(true);
  });
});
