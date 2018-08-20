import { Http, HttpOptions } from "../base";
import { User, UserSchema, Document, Wallet, DocumentSchema, DocumentType } from "../models";
import { PaginatedArray, Pagination } from "../utils";
import BaseModelWebService from "./base/BaseModelWebService";
export default class ConsumerWebService implements BaseModelWebService<User, UserSchema> {
    protected http: Http;
    protected static instance: ConsumerWebService;
    constructor(options: HttpOptions);
    static getInstance(): ConsumerWebService;
    static initialize(options: HttpOptions): ConsumerWebService;
    /**
     * Find all {#User} with role {#Consumer}s
     *
     * @param query The query of the search
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<User>>;
    /**
     * Find a {#User} with role {#Consumer} by it's ID
     *
     * @param id The id of the {#Consumer}
     */
    findOne(id: string): Promise<User>;
    /**
     * Find the #{Document}s from a {#Consumer} by it's ID
     * This method won't return pictures
     *
     * @param id The id of the {#Consumer}
     */
    findDocumentsById(id?: string): Promise<Document[]>;
    /**
     * Find the {#Document}s from a {#Consumer} by it's ID and the {#Document} type
     * This method will return pictures
     *
     * @param id The id of the {#Consumer}
     */
    findDocumentByIdAndType(id: string, type: DocumentType): Promise<Document>;
    /**
     * Find the {#Wallet}s from a {#Consumer} by it's ID
     *
     * @param id The id of the {#Consumer}
     */
    findWalletsById(id: string): Promise<Wallet[]>;
    /**
     *  Inserts a new {#Consumer}.
     *
     * @param consumer The values you want to insert
     */
    create(consumer: UserSchema): Promise<User>;
    /**
     * Create a new {#Document} on a {#Consumer} by it's ID
     *
     * @param id The id of the {#Consumer}
     */
    createDocument(id: string, document: DocumentSchema): Promise<Document>;
    /**
     * Partially update an existing {#User} with role {#Consumer}.
     *
     * @param id the id of the {#User} with role {#Consumer}
     * @param consumer The values you want to update
     */
    update(id: string, consumer: Partial<UserSchema>): Promise<User>;
    /**
     * Upload a new {#Document} picture to a {#Consumer} by it's ID and the {#Document} type and side
     *
     * @param id The id of the {#Consumer}
     */
    uploadDocumentPicture(id: string, type: DocumentType, side: "front" | "back" | "selfie", picture: File): Promise<Document>;
    /**
     * Upload a new {#Document} picture to a {#Consumer} by it's ID and the {#Document} type and side from base64
     *
     * @param id The id of the {#Consumer}
     */
    uploadDocumentPictureFromBase64(id: string, type: DocumentType, side: "front" | "back" | "selfie", picture: string): Promise<Document>;
    /**
     * Delete a {#User} with role {#Consumer} by it's id
     *
     * @param id The id of the {#User} with role {#Consumer}
     */
    delete(id: string): Promise<boolean>;
}
