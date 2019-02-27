import * as faker from "faker";
import * as uuid from "uuid/v4";
import { DocumentSchema, DocumentType } from "bitcapital-common";

console.dir(DocumentType);

export const TEST_DOCUMENT = (type?: DocumentType): DocumentSchema => ({
  id: uuid(),
  number: faker.random.alphaNumeric(12),
  back: Buffer.from(uuid()).toString("base64"),
  front: Buffer.from(uuid()).toString("base64"),
  selfie: Buffer.from(uuid()).toString("base64"),
  type: type || DocumentType.BRL_IDENTITY
});
