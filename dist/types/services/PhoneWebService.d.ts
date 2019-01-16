import { NestedModelWebService, NestedModelWebServiceOptions } from "./base";
import { PhoneSchema, Phone } from "../models";
import { Pagination, PaginatedArray } from "../utils";
export interface PhoneWebServiceOptions extends NestedModelWebServiceOptions {
}
export declare class PhoneWebService extends NestedModelWebService<Phone, PhoneSchema> {
    protected readonly options: PhoneWebServiceOptions;
    protected static instance: PhoneWebService;
    constructor(options: PhoneWebServiceOptions);
    static getInstance(): PhoneWebService;
    static initialize(options: PhoneWebServiceOptions): PhoneWebService;
    /**
     * Find all Phones from a Consumer.
     *
     * @param userId The Consumer's User ID.
     * @param pagination The pagination parameters.
     */
    findAll(userId: string, pagination: Pagination): Promise<PaginatedArray<Phone>>;
    /**
     * Find an Phone based on it's ID.
     *
     * @param userId The Consumer's User ID.
     * @param phoneId The Phone ID.
     */
    findOne(userId: string, phoneId: string): Promise<Phone>;
    /**
     * Create a new Phone in the platform.
     *
     * @param userId The Consumer's User ID.
     * @param phone The Phone schema.
     */
    create(userId: string, phone: PhoneSchema): Promise<Phone>;
    /**
     * Partially update an existing Phone.
     *
     * @param userId The Consumer's User ID.
     * @param phoneId The Phone ID.
     * @param phone The partial Phone schema.
     */
    update(userId: string, phoneId: string, phone: Partial<PhoneSchema>): Promise<Phone>;
    /**
     * Delete an Phone from the platform.
     *
     * @param userId The Consumer's User ID.
     * @param phoneId The Phone ID.
     */
    delete(userId: string, phoneId: string): Promise<boolean>;
}
