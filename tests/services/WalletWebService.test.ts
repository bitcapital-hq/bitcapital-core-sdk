import MockAdapter from "axios-mock-adapter";
import { WalletWebService } from "../../lib";
import { TEST_WALLET } from "../models/Wallet/Wallet.test";

describe("lib.services.WalletWebService", () => {
  WalletWebService.initialize({
    baseURL: "http://localhost:3000/test_url"
  });
  const mock = new MockAdapter((WalletWebService.getInstance() as any).http.client);

  mock.onGet("/wallets").reply(200, [TEST_WALLET, TEST_WALLET, TEST_WALLET]);
  mock.onGet("/wallets/" + TEST_WALLET.id).reply(200, TEST_WALLET);

  it("should find all", async () => {
    const all = await WalletWebService.getInstance().findAll({});

    expect(all.length).toBe(3);
    expect(all[0]).toEqual(TEST_WALLET);
  });

  it("should find one", async () => {
    const one = await WalletWebService.getInstance().findOne(TEST_WALLET.id);

    expect(one).toEqual(TEST_WALLET);
  });
});
