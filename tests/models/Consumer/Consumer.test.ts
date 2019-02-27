import * as uuid from "uuid/v4";
import { ConsumerSchema } from "bitcapital-common";
import * as faker from "faker";
import { TEST_ADDRESS } from "./Address.test";
import { TEST_DOCUMENT } from "./Document.test";
import { TEST_PHONE } from "./Phone.test";
import * as CPF from "cpf";

export const TEST_CONSUMER = (): ConsumerSchema => ({
  id: uuid(),
  addresses: Array.from({ length: faker.random.number({ min: 1, max: 3 }) }, () => TEST_ADDRESS()),
  documents: Array.from({ length: faker.random.number({ min: 1, max: 3 }) }, () => TEST_DOCUMENT()),
  phones: Array.from({ length: faker.random.number({ min: 1, max: 3 }) }, () => TEST_PHONE()),
  taxId: CPF.generate()
});
