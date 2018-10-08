import { Http } from "../base";
import { Document, DocumentSchema, DocumentType, User, UserSchema, Wallet } from "../models";
import { PaginatedArray, Pagination } from "../utils";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";
export interface ConsumerWebServiceOptions extends BaseModelWebServiceOptions {
}
export default class ConsumerWebService extends BaseModelWebService<User, UserSchema> {
    protected http: Http;
    protected static instance: ConsumerWebService;
    constructor(options: ConsumerWebServiceOptions);
    static getInstance(): ConsumerWebService;
    static initialize(options: ConsumerWebServiceOptions): ConsumerWebService;
    /**
     * Find all Users with role Consumer.
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<User>>;
    /**
     * Find a User with role Consumer.
     *
     * @param id The User ID.
     */
    findOne(id: string): Promise<User>;
    /**
     * Find the Documents from a User with role Consumer.
     * This method won't return pictures.
     *
     * @param id The User ID.
     */
    findDocumentsById(id?: string): Promise<Document[]>;
    /**
     * Find the Documents from a User with role Consumer.
     * This method will return pictures.
     *
     * @param id The User ID.
     */
    findDocumentByIdAndType(id: string, type: DocumentType): Promise<Document>;
    /**
     * Find the Wallets from a User with role Consumer.
     *
     * @param id The User ID.
     */
    findWalletsById(id: string): Promise<Wallet[]>;
    /**
     * Create a new User with role Consumer.
     *
     * @param consumer The User schema.
     */
    create(consumer: UserSchema): Promise<User>;
    /**
     * Create a new Document on a User with role Consumer.
     *
     * @param id The User ID.
     */
    createDocument(id: string, document: DocumentSchema): Promise<Document>;
    /**
     * Partially update an existing User with role Consumer.
     *
     * @param id The User ID.
     * @param consumer The partial User schema.
     */
    update(id: string, consumer: Partial<UserSchema>): Promise<User>;
    /**
     * Upload a new Document picture to a User with role Consumer.
     *
     * @param {string} id The User id.
     * @param {DocumentType} type The Document type.
     * @param {("front" | "back" | "selfie")} side The Document picture side.
     * @param {File} picture The picture to be uploaded.
     */
    uploadDocumentPicture(id: string, type: DocumentType, side: "front" | "back" | "selfie", picture: File): Promise<Document>;
    /**
     * Upload a new Document picture to a User with role Consumer using base64.
     *
     * @param {string} id The User id.
     * @param {DocumentType} type The Document type.
     * @param {("front" | "back" | "selfie")} side The Document picture side.
     * @param {string} picture The base64 representation of the picture to be uploaded.
     */
    uploadDocumentPictureFromBase64(id: string, type: DocumentType, side: "front" | "back" | "selfie", picture: string): Promise<Document>;
    /**
     * Delete a User with role Consumer.
     *
     * @param id The User ID.
     */
    delete(id: string): Promise<boolean>;
}
