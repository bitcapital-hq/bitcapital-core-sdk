import { NestedModelWebService, NestedModelWebServiceOptions } from "./base";
import { DocumentSchema, Document } from "../models";
import { Pagination, PaginatedArray } from "../utils";
export interface DocumentWebServiceOptions extends NestedModelWebServiceOptions {
}
export declare class DocumentWebService extends NestedModelWebService<Document, DocumentSchema> {
    protected readonly options: DocumentWebServiceOptions;
    protected static instance: DocumentWebService;
    constructor(options: DocumentWebServiceOptions);
    static getInstance(): DocumentWebService;
    static initialize(options: DocumentWebServiceOptions): DocumentWebService;
    /**
     * Find all Documents from a Consumer.
     * This method won't return pictures.
     *
     * @param userId The Consumer's User ID.
     * @param pagination The pagination parameters.
     */
    findAll(userId: string, pagination: Pagination): Promise<PaginatedArray<Document>>;
    /**
     * Find an Document based on it's ID or type.
     * This method will return pictures.
     *
     * @param userId The Consumer's User ID.
     * @param documentId The Document ID or type.
     */
    findOne(userId: string, documentIdOrType: string): Promise<Document>;
    /**
     * Create a new Document in the platform.
     *
     * @param userId The Consumer's User ID.
     * @param document The Document schema.
     */
    create(userId: string, document: DocumentSchema): Promise<Document>;
    /**
     * Partially update an existing Document.
     *
     * @param userId The Consumer's User ID.
     * @param documentId The Document ID.
     * @param document The partial Document schema.
     */
    update(userId: string, documentId: string, document: Partial<DocumentSchema>): Promise<Document>;
    /**
     * Upload a new Document picture.
     *
     * @param {string} userId The Consumer's User id.
     * @param {DocumentType} type The Document type.
     * @param {("front" | "back" | "selfie")} side The Document picture side.
     * @param {File} picture The picture to be uploaded.
     */
    uploadPicture(userId: string, type: DocumentType, side: "front" | "back" | "selfie", picture: File): Promise<Document>;
    /**
     * Upload a new Document picture.
     *
     * @param {string} userId The Consumer's User id.
     * @param {DocumentType} type The Document type.
     * @param {("front" | "back" | "selfie")} side The Document picture side.
     * @param {string} picture The base64 representation of the picture to be uploaded.
     */
    uploadPictureFromBase64(userId: string, type: DocumentType, side: "front" | "back" | "selfie", picture: string): Promise<Document>;
    /**
     * Delete an Document from the platform.
     *
     * @param userId The Consumer's User ID.
     * @param documentId The Document ID.
     */
    delete(userId: string, documentId: string): Promise<boolean>;
}
