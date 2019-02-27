import * as uuid from "uuid/v4";
import { WalletSchema, WalletStatus } from "bitcapital-common";

export const TEST_WALLET = (): WalletSchema => ({
  id: uuid(),
  status: WalletStatus.PENDING,
  stellar: {
    publicKey: uuid(),
    secretKey: uuid()
  }
});

export const TEST_WALLET_BANKING: WalletSchema = {
  id: uuid(),
  additionalData: {
    bankCode: "341",
    accountAgency: "1234",
    accountNumber: "12345",
    accountDocument: ""
  }
};
