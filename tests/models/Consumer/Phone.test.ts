import * as uuid from "uuid/v4";
import * as faker from "faker";
import { Phone, PhoneSchema } from "../../../lib";

export const TEST_PHONE = (): PhoneSchema => ({
  id: uuid(),
  number: faker.random.number(99999999).toString(),
  code: faker.random.number(99).toString(),
  // Half phones will have no extension
  extension: Math.random() > 0.5 ? faker.random.number(99).toString() : undefined,
  verifiedAt: faker.date.past()
});

describe("lib.models.Consumer.Phone", () => {
  it("should instantiate a valid instance", async () => {
    const schema = TEST_PHONE();
    const phone = new Phone(schema);

    expect(phone.id).toBe(schema.id);
    expect(phone.code).toBe(schema.code);
    expect(phone.number).toBe(schema.number);
    expect(phone.extension).toBe(schema.extension);
    expect(phone.verifiedAt.getTime()).toBe(schema.verifiedAt.getTime());

    expect(await phone.isValid()).toBe(true);
  });
});
