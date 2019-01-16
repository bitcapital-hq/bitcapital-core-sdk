import { BaseModel } from "../..";
import { Document, DocumentStatus } from "..";
export interface DocumentStateSchema {
    document: Document;
    status: DocumentStatus;
    additionalData?: any;
}
export declare class DocumentState extends BaseModel implements DocumentStateSchema {
    document: Document;
    status: DocumentStatus;
    additionalData?: any;
    constructor(data: Partial<DocumentStateSchema>);
}
