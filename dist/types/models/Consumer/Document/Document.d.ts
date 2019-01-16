import { Consumer } from "..";
import { BaseModel, BaseModelSchema } from "../..";
import { DocumentState } from "./DocumentState";
export declare enum DocumentType {
    TAX_ID = "tax_id",
    BRL_IDENTITY = "brl_identity",
    BRL_INDIVIDUAL_REG = "brl_individual_reg",
    BRL_DRIVERS_LICENSE = "brl_drivers_license",
    BRL_ADDRESS_STATEMENT = "brl_address_statement",
    PASSPORT = "passport"
}
export declare enum DocumentVerificationError {
    NO_MATCHS = "no_matchs",
    IS_DEAD = "is_dead",
    SUSPENDED = "suspended",
    CANCELED = "canceled",
    PENDING_REGULATION = "pending_regulation",
    NULL = "null",
    INCOMPLETE_TAX_ID_DATA = "incomplete_tax_id_data",
    FACE_DIDNT_MATCH = "face_didnt_match",
    RECOGNITION_ERROR = "recognition_error",
    NO_DOC_PICTURE = "no_doc_picture",
    NO_FACIAL_PICTURE = "no_facial_picture",
    NO_INFO_FOUND = "no_info_found",
    DOC_IS_NOT_BASE_64 = "doc_is_not_base_64",
    FACE_IS_NOT_BASE_64 = "face_is_not_base_64",
    POLITICALLY_EXPOSED_PERSON = "politically_exposed_person",
    SANCTIONED = "sanctioned"
}
export interface DocumentSchema extends BaseModelSchema {
    consumer?: Consumer;
    type: DocumentType;
    number?: string;
    front?: string;
    back?: string;
    selfie?: string;
    expiresAt?: Date;
    states?: DocumentState[];
}
export declare class Document extends BaseModel implements DocumentSchema {
    consumer?: Consumer;
    type: DocumentType;
    number?: string;
    front?: string;
    back?: string;
    selfie?: string;
    expiresAt?: Date;
    constructor(data: Partial<DocumentSchema>);
}
