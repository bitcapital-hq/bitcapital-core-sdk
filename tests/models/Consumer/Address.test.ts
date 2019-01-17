import * as faker from "faker";
import * as uuid from "uuid/v4";
import { Address, AddressSchema, AddressType } from "../../../lib";

export const TEST_ADDRESS = (): AddressSchema => ({
  id: uuid(),
  type: AddressType.HOME,
  street: faker.address.streetAddress(),
  state: faker.address.state(),
  city: faker.address.city(),
  code: faker.address.zipCode(),
  // Half addresses will have no complement
  complement: Math.random() > 0.5 ? faker.address.secondaryAddress() : undefined,
  country: faker.address.country(),
  number: String(Math.floor(Math.random() * 100)),
  geo: {
    x: Number(faker.address.latitude()),
    y: Number(faker.address.longitude())
  }
});

describe("lib.models.Consumer.Address", () => {
  it("should instantiate a valid instance", async () => {
    const schema = TEST_ADDRESS();
    const address = new Address(schema);

    expect(address.id).toBe(schema.id);
    expect(address.type).toBe(schema.type);
    expect(address.country).toBe(schema.country);
    expect(address.geo).toMatchObject(schema.geo);
    expect(address.state).toBe(schema.state);
    expect(address.city).toBe(schema.city);
    expect(address.code).toBe(schema.code);
    expect(address.street).toBe(schema.street);
    expect(address.complement).toBe(schema.complement);
    expect(address.number).toBe(schema.number);

    expect(await address.isValid()).toBe(true);
  });
});
