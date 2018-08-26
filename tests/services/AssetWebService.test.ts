import MockAdapter from "axios-mock-adapter";
import { AssetWebService } from "../../lib";
import { TEST_ASSET } from "../models/Asset/Asset.test";

describe("lib.services.AssetWebService", () => {
  AssetWebService.initialize({
    baseURL: "http://localhost:3000/test_url"
  });
  const mock = new MockAdapter((AssetWebService.getInstance() as any).http.client);

  mock.onGet("/assets").reply(200, [TEST_ASSET, TEST_ASSET, TEST_ASSET]);
  mock.onGet("/assets/" + TEST_ASSET.id).reply(200, TEST_ASSET);

  it("should find all", async () => {
    const all = await AssetWebService.getInstance().findAll({});

    expect(all.length).toBe(3);
    expect(all[0]).toEqual(TEST_ASSET);
  });

  it("should find one", async () => {
    const one = await AssetWebService.getInstance().findOne(TEST_ASSET.id);

    expect(one).toEqual(TEST_ASSET);
  });
});
