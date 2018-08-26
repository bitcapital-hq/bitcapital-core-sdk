import * as uuid from "uuid/v4";
import * as hat from "hat";
import { Domain, DomainRole, DomainSchema } from "../../../lib";

export const TEST_DOMAIN: DomainSchema = {
  id: uuid(),
  name: "Test",
  slug: hat(),
  role: DomainRole.ROOT,
  urls: ["test.btcore.app"],
  users: [],
  settings: {}
};

describe("lib.models.Domain", () => {
  it("should instantiate a valid instance", async () => {
    const domain = new Domain({ ...TEST_DOMAIN });
    expect(domain.name).toBe(TEST_DOMAIN.name);
    expect(domain.slug).toBe(TEST_DOMAIN.slug);
    expect(domain.role).toBe(TEST_DOMAIN.role);

    expect(await domain.isValid()).toBe(true);
  });
});
