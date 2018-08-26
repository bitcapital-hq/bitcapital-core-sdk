import * as hat from "hat";
import { Domain, DomainRole } from "../../../lib";

const TEST_DOMAIN = {
  name: "Test",
  slug: hat(),
  role: DomainRole.ROOT,
  urls: ["test.btcore.app"],
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
