import * as hat from "hat";
import * as uuid from "uuid/v4";
import { BoletoSchema, Boleto } from "../../../lib";

export const TEST_BOLETO: BoletoSchema = {
  id: uuid(),
  expiresAt: new Date(2019, 1, 31),
  amount: 1000.0,
  barCode: "23790504004188102313343008109209176890000019900",
  beneficiaryName: "BitCapital"
};

describe("lib.models.Boleto", () => {
  it("should instantiate properly", async () => {
    const boleto = new Boleto({ ...TEST_BOLETO });

    expect(await boleto.isValid()).toBe(true);
  });
});
