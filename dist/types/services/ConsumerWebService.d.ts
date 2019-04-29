import { Http, User, UserSchema, Pagination, PaginatedArray, Document } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";
export interface ConsumerWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class ConsumerWebService extends BaseModelWebService<User, UserSchema> {
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
     * Block an User with role Consumer.
     *
     * @param id The User ID.
     */
    block(id: string): Promise<boolean>;
    /**
     * Block an User with role Consumer.
     *
     * @param id The User ID.
     */
    unblock(id: string): Promise<boolean>;
    /**
     * Gets KYC information about an user for an operator.
     *
     * @param id The User ID.
     */
    getKYCData(id: string): Promise<any>;
    /**
     * Create a new User with role Consumer.
     *
     * @param consumer The User schema.
     */
    create(consumer: UserSchema & {
        password: string;
        productId?: string;
        externalId?: string;
    }): Promise<User>;
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
     * @deprecated This method was moved to DocumentWebService and will be removed in a future release
     */
    uploadDocumentPicture(id: string, type: DocumentType, side: "front" | "back" | "selfie", picture: File): Promise<Document>;
    /**
     * Registers the manual KYC anlysis result.
     *
     * @param {string} id The User id.
     * @param {string} name The consumer's name.
     * @param {{"approved" | "rejected"}} result The analysis veredict.
     * @param {string} result The reason for the consumer's approval or rejection.
     * @param {string} taxId The consumer's tax ID.
     * @param {string} motherName The consumer's mother's name.
     * @param {string} address The consumer's address.
     * @param {string} phone The consumer's phone.
     * @param {string} birthday The consumer's birthday.
     */
    setManualKYCAnalysisResult(id: string, name: string, result: string, reason: string, taxId: string, motherName: string, address: string, phone: string, birthday: string): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Upload a new Document picture to a User with role Consumer using base64.
     *
     * @param {string} id The User id.
     * @param {DocumentType} type The Document type.
     * @param {("front" | "back" | "selfie")} side The Document picture side.
     * @param {string} picture The base64 representation of the picture to be uploaded.
     * @deprecated This method was moved to DocumentWebService and will be removed in a future release
     */
    uploadDocumentPictureFromBase64(id: string, type: DocumentType, side: "front" | "back" | "selfie", picture: string): Promise<Document>;
    /**
     * Delete a User with role Consumer.
     *
     * @param id The User ID.
     */
    delete(id: string): Promise<boolean>;
}
