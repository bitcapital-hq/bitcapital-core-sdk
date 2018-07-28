import * as hat from "hat";
import { Document, DocumentSchema, DocumentType } from "../../../lib";

export const TEST_DOCUMENT: DocumentSchema = {
  consumerId: hat(),
  type: DocumentType.BRL_IDENTITY,
  number: hat(),
  front: hat(),
  back: hat(),
  selfie: hat(),
  verifiedAt: new Date()
};

describe("lib.models.Consumer.Document", () => {
  it("should instantiate properly", async () => {
    const document = new Document({ ...TEST_DOCUMENT });

    expect(document.consumerId).toBe(TEST_DOCUMENT.consumerId);
    expect(document.type).toBe(TEST_DOCUMENT.type);
    expect(document.number).toBe(TEST_DOCUMENT.number);
    expect(document.front).toBe(TEST_DOCUMENT.front);
    expect(document.back).toBe(TEST_DOCUMENT.back);
    expect(document.selfie).toBe(TEST_DOCUMENT.selfie);
    expect(document.verifiedAt).toBe(TEST_DOCUMENT.verifiedAt);
  });
});
