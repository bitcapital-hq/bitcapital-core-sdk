import { WalletWebService } from "../../lib";
import { TEST_WALLET } from "../models/Wallet/Wallet.test";
import { CRUDWebServiceTest } from "./WebServiceUtil";

describe("lib.services.WalletWebService", () => {
  CRUDWebServiceTest("wallets", WalletWebService, TEST_WALLET);
});
