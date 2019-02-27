import * as uuid from "uuid/v4";
import { BoletoSchema } from "bitcapital-common";

export const TEST_BOLETO: BoletoSchema = {
  id: uuid(),
  conductorId: 123456789,
  documentNumber: "123456789",
  createdAt: new Date(),
  updatedAt: new Date(),
  expiresAt: new Date(2019, 1, 31),
  beneficiaryName: "BitCapital",
  beneficiaryCode: "string",
  beneficiaryDocument: "string",
  amount: "1000.0",
  barCode: "23790504004188102313343008109209176890000019900",
  digitableLine: "23790504004188102313343008109209176890000019900",
  bank: "341",
  agency: "1234",
  agreementNumber: "123456789",
  agreementNumberDigit: "9",
  conductorNumber: "123456789",
  conductorNumberDigit: "9",
  isRegistered: false
};
