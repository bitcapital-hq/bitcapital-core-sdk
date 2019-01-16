import * as uuid from "uuid/v4";
import { Domain, DomainRole, DomainSchema, DomainSettingsLocks } from "../../../lib";

export const TEST_DOMAIN: DomainSchema = {
  id: uuid(),
  name: "Test",
  role: DomainRole.ROOT,
  urls: ["test.btcore.app"],
  users: [],
  settings: { locks: new DomainSettingsLocks() },
  test: true
};

describe("lib.models.Domain", () => {
  it("should instantiate a valid instance", async () => {
    const domain = new Domain({ ...TEST_DOMAIN });
    expect(domain.name).toBe(TEST_DOMAIN.name);
    expect(domain.role).toBe(TEST_DOMAIN.role);

    expect(await domain.isValid()).toBe(true);
  });
});
