import { AssetSchema, Asset } from "../../../lib";

export const TEST_ASSET: AssetSchema = {
  name: "Name",
  code: "Code "
};

describe("lib.models.Asset", () => {
  it("should instantiate a valid instance", async () => {
    const asset = new Asset({ ...TEST_ASSET });
    expect(asset.name).toBe(TEST_ASSET.name);
    expect(asset.code).toBe(TEST_ASSET.code);

    expect(await asset.isValid()).toBe(true);
  });
});
