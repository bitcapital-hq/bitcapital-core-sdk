import { WalletWebService } from "../../lib";
import { TEST_WALLET } from "../models/Wallet/Wallet.test";
import { CRUDWebServiceTest } from "./WebServiceUtil";
import MockAdapter from "axios-mock-adapter";
import { TEST_USER } from "../models/User/User.test";

const walletSchema = TEST_WALLET();
const userSchema = TEST_USER();

describe("lib.services.WalletWebService", () => {
  CRUDWebServiceTest("wallets", WalletWebService, walletSchema);

  describe("Success cases", () => {
    beforeAll(() => {
      WalletWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((WalletWebService.getInstance() as any).http.client);

      mock.onGet(`/wallets/root`).reply(200, walletSchema);
      mock.onGet(`/wallets/${walletSchema.id}/users`).reply(200, [userSchema, userSchema, userSchema]);
      mock.onGet(`/wallets/${walletSchema.id}/consumers`).reply(200, [userSchema, userSchema, userSchema]);
      mock.onGet(`/wallets/${walletSchema.id}/mediators`).reply(200, [userSchema, userSchema, userSchema]);
    });

    it("should find root wallet", async () => {
      const root = await WalletWebService.getInstance().findRootWallet();

      expect(root).toEqual(walletSchema);
    });
  });

  describe("Fail cases", () => {
    beforeAll(() => {
      WalletWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((WalletWebService.getInstance() as any).http.client);

      mock.onGet(`/wallets/${walletSchema.id}/payments`).reply(500);
      mock.onGet(`/wallets/root`).reply(500);
      mock.onGet(`/wallets/${walletSchema.id}/users`).reply(500);
      mock.onGet(`/wallets/${walletSchema.id}/consumers`).reply(500);
      mock.onGet(`/wallets/${walletSchema.id}/mediators`).reply(500);
    });

    it("should find received payments", async () => {
      expect.assertions(1);
      return expect(WalletWebService.getInstance().findWalletPayments(walletSchema.id, {})).rejects.toBeTruthy();
    });

    it("should find root wallet", async () => {
      expect.assertions(1);
      return expect(WalletWebService.getInstance().findRootWallet()).rejects.toBeTruthy();
    });
  });
});
