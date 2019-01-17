import { BaseModel } from "../..";
import { Document, DocumentStatus } from "..";

export interface DocumentStateSchema {
  document: Document;
  status: DocumentStatus;
  additionalData?: any;
}

export class DocumentState extends BaseModel implements DocumentStateSchema {
  document: Document;
  status: DocumentStatus;
  additionalData?: any;

  constructor(data: Partial<DocumentStateSchema> = {}) {
    super(data);

    Object.assign(this, data);

    this.document = data.document && new Document(data.document);
  }
}
