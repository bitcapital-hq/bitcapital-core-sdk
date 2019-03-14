import { Http, User, UserSchema, Pagination, PaginatedArray } from "bitcapital-common";
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
     * Create a new User with role Consumer.
     *
     * @param consumer The User schema.
     */
    create(consumer: UserSchema & {
        password: string;
        productId: string;
    }): Promise<User>;
    /**
     * Partially update an existing User with role Consumer.
     *
     * @param id The User ID.
     * @param consumer The partial User schema.
     */
    update(id: string, consumer: Partial<UserSchema>): Promise<User>;
    /**
     * Delete a User with role Consumer.
     *
     * @param id The User ID.
     */
    delete(id: string): Promise<boolean>;
}
