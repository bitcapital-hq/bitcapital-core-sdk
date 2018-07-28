import * as hat from "hat";
import { Phone, PhoneSchema } from "../../../lib";

export const TEST_PHONE: PhoneSchema = {
  consumerId: hat(),
  code: 55,
  number: "999999999",
  verifiedAt: new Date()
};

describe("lib.models.Consumer.Phone", () => {
  it("should instantiate properly", async () => {
    const phone = new Phone({ ...TEST_PHONE });

    expect(phone.consumerId).toBe(TEST_PHONE.consumerId);
    expect(phone.code).toBe(TEST_PHONE.code);
    expect(phone.number).toBe(TEST_PHONE.number);
    expect(phone.verifiedAt).toBe(TEST_PHONE.verifiedAt);
  });
});
