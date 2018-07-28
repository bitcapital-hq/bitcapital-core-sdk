import * as hat from "hat";
import { Domain, DomainRole } from "../../lib";

const TEST_DOMAIN = {
  name: "Test",
  slug: hat(),
  role: DomainRole.ROOT,
  urls: ["https://test.btcore.app"],
  settings: {}
};

describe("lib.models.Domain", () => {
  it("should instantiate properly without credentials", async () => {
    const user = new Domain({ ...TEST_DOMAIN });
    expect(user.name).toBe(TEST_DOMAIN.name);
    expect(user.slug).toBe(TEST_DOMAIN.slug);
    expect(user.role).toBe(TEST_DOMAIN.role);
  });
});
