import * as hat from "hat";
import { Asset } from "../../../../lib";

const TEST_ASSET = {
  name: "Test Coin",
  code: "TCN"
};

describe("lib.models.Asset", () => {
  it("should instantiate properly", async () => {
    const domain = new Asset({ ...TEST_ASSET });
    expect(domain.name).toBe(TEST_ASSET.name);
    expect(domain.code).toBe(TEST_ASSET.code);
  });
});
