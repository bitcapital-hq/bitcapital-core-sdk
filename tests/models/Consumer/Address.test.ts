import * as uuid from "uuid/v4";
import { Address, AddressSchema } from "../../../lib";

export const TEST_ADDRESS: AddressSchema = {
  consumerId: uuid(),
  state: "SP",
  country: "Brasil",
  geo: { x: -15.123456, y: 7.987654 },
  city: "São Paulo",
  code: "13000000",
  street: "Example Street",
  complement: "Around the corner",
  number: "1234"
};

describe("lib.models.Consumer.Address", () => {
  it("should instantiate a valid instance", async () => {
    const address = new Address({ ...TEST_ADDRESS });

    expect(address.consumerId).toBe(TEST_ADDRESS.consumerId);
    expect(address.country).toBe(TEST_ADDRESS.country);
    expect(address.geo).toBe(TEST_ADDRESS.geo);
    expect(address.city).toBe(TEST_ADDRESS.city);
    expect(address.code).toBe(TEST_ADDRESS.code);
    expect(address.street).toBe(TEST_ADDRESS.street);
    expect(address.complement).toBe(TEST_ADDRESS.complement);
    expect(address.number).toBe(TEST_ADDRESS.number);

    expect(await address.isValid()).toBe(true);
  });
});
