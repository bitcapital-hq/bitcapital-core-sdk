import * as hat from "hat";
import * as uuid from "uuid/v4";
import { Wallet, WalletType, StellarWalletData, WalletSchema, BankingWalletData } from "../../../lib";

export const TEST_WALLET: WalletSchema = {
  id: uuid(),
  type: WalletType.STELLAR,
  data: { publicKey: hat() } as StellarWalletData
};

export const TEST_WALLET_BANKING: WalletSchema = {
  id: uuid(),
  type: WalletType.BANKING,
  data: {
    bankCode: "341",
    accountAgency: "1234",
    accountNumber: "12345",
    accountDocument: ""
  } as BankingWalletData
};

describe("lib.models.Wallet", () => {
  it("should instantiate properly", async () => {
    const wallet = new Wallet({ ...TEST_WALLET });
    expect(wallet.type).toBe(TEST_WALLET.type);
    expect(wallet.data).toBe(TEST_WALLET.data);

    expect(await wallet.isValid()).toBe(true);
  });
});
