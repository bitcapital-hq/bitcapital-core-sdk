import * as faker from "faker";
import * as uuid from "uuid/v4";
import { AddressSchema, AddressType } from "bitcapital-common";

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
  number: String(Math.floor(Math.random() * 100))
});
