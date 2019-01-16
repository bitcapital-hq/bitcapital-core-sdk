import { NestedModelWebService, NestedModelWebServiceOptions } from "./base";
import { AddressSchema, Address } from "../models";
import { Pagination, PaginatedArray } from "../utils";
export interface AddressWebServiceOptions extends NestedModelWebServiceOptions {
}
export declare class AddressWebService extends NestedModelWebService<Address, AddressSchema> {
    protected readonly options: AddressWebServiceOptions;
    protected static instance: AddressWebService;
    constructor(options: AddressWebServiceOptions);
    static getInstance(): AddressWebService;
    static initialize(options: AddressWebServiceOptions): AddressWebService;
    /**
     * Find all Addresses from a Consumer.
     *
     * @param userId The Consumer's User ID.
     * @param pagination The pagination parameters.
     */
    findAll(userId: string, pagination: Pagination): Promise<PaginatedArray<Address>>;
    /**
     * Find an Address based on it's ID.
     *
     * @param userId The Consumer's User ID.
     * @param addressId The Address ID.
     */
    findOne(userId: string, addressId: string): Promise<Address>;
    /**
     * Create a new Address in the platform.
     *
     * @param userId The Consumer's User ID.
     * @param address The Address schema.
     */
    create(userId: string, address: AddressSchema): Promise<Address>;
    /**
     * Partially update an existing Address.
     *
     * @param userId The Consumer's User ID.
     * @param addressId The Address ID.
     * @param address The partial Address schema.
     */
    update(userId: string, addressId: string, address: Partial<AddressSchema>): Promise<Address>;
    /**
     * Delete an Address from the platform.
     *
     * @param userId The Consumer's User ID.
     * @param addressId The Address ID.
     */
    delete(userId: string, addressId: string): Promise<boolean>;
}
