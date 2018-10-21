import { WalletWebService } from "../../lib";
import { TEST_WALLET } from "../models/Wallet/Wallet.test";
import { CRUDWebServiceTest } from "./WebServiceUtil";
import MockAdapter from "axios-mock-adapter";
import { TEST_PAYMENT } from "../models/Payment/Payment.test";
import { TEST_USER } from "../models/User/User.test";

describe("lib.services.WalletWebService", () => {
  CRUDWebServiceTest("wallets", WalletWebService, TEST_WALLET);

  describe("Success cases", () => {
    beforeAll(() => {
      WalletWebService.initialize({
        baseURL: "http://localhost:3000/test_url",
        clientId: "test",
        clientSecret: "test"
      });
      const mock = new MockAdapter((WalletWebService.getInstance() as any).http.client);

      mock.onGet(`/wallets/${TEST_WALLET.id}/payments`).reply(200, [TEST_PAYMENT, TEST_PAYMENT, TEST_PAYMENT]);
      mock.onGet(`/wallets/root`).reply(200, TEST_WALLET);
      mock.onGet(`/wallets/${TEST_WALLET.id}/users`).reply(200, [TEST_USER, TEST_USER, TEST_USER]);
      mock.onGet(`/wallets/${TEST_WALLET.id}/consumers`).reply(200, [TEST_USER, TEST_USER, TEST_USER]);
      mock.onGet(`/wallets/${TEST_WALLET.id}/mediators`).reply(200, [TEST_USER, TEST_USER, TEST_USER]);
    });

    it("should find received payments", async () => {
      const received = await WalletWebService.getInstance().findWalletPayments(TEST_WALLET.id, {});

      expect(received.length).toBe(3);
      expect(received[0]).toEqual(TEST_PAYMENT);
    });

    it("should find root wallet", async () => {
      const root = await WalletWebService.getInstance().findRootWallet();

      expect(root).toEqual(TEST_WALLET);
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

      mock.onGet(`/wallets/${TEST_WALLET.id}/payments`).reply(500);
      mock.onGet(`/wallets/root`).reply(500);
      mock.onGet(`/wallets/${TEST_WALLET.id}/users`).reply(500);
      mock.onGet(`/wallets/${TEST_WALLET.id}/consumers`).reply(500);
      mock.onGet(`/wallets/${TEST_WALLET.id}/mediators`).reply(500);
    });

    it("should find received payments", async () => {
      expect.assertions(1);
      return expect(WalletWebService.getInstance().findWalletPayments(TEST_WALLET.id, {})).rejects.toBeTruthy();
    });

    it("should find root wallet", async () => {
      expect.assertions(1);
      return expect(WalletWebService.getInstance().findRootWallet()).rejects.toBeTruthy();
    });
  });
});
