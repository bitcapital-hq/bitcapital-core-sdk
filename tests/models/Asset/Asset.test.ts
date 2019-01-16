import { AssetSchema, Asset } from "../../../lib";
import * as uuid from "uuid/v4";
import { TEST_WALLET } from "../Wallet/Wallet.test";

export const TEST_ASSET: AssetSchema = {
  id: uuid(),
  name: "Name",
  code: "Code ",
  issuer: TEST_WALLET
};

describe("lib.models.Asset", () => {
  it("should instantiate a valid instance", async () => {
    const asset = new Asset({ ...TEST_ASSET });
    expect(asset.name).toBe(TEST_ASSET.name);
    expect(asset.code).toBe(TEST_ASSET.code);

    expect(await asset.isValid()).toBe(true);
  });
});
