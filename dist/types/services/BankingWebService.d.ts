import { BaseModelWebService, BaseModelWebServiceOptions } from "./base/BaseModelWebService";
import { Banking, BankingSchema, Pagination, PaginatedArray } from "bitcapital-common";
export interface BankingWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class BankingWebService extends BaseModelWebService<Banking, BankingSchema> {
    protected readonly options: BankingWebServiceOptions;
    protected static instance: BankingWebService;
    constructor(options: BankingWebServiceOptions);
    static getInstance(): BankingWebService;
    static initialize(options: BankingWebServiceOptions): BankingWebService;
    /**
     * Find all Bankings from a Consumer.
     *
     * @param userId The Consumer's User ID.
     * @param pagination The pagination parameters.
     */
    findAll(userId: string, pagination: Pagination): Promise<PaginatedArray<Banking>>;
    /**
     * Find an Banking based on it's ID.
     *
     * @param userId The Consumer's User ID.
     * @param bankingId The Banking ID.
     */
    findOneById(userId: string, bankingId: string): Promise<Banking>;
    findOne(id: string): Promise<Banking>;
    /**
     * Create a new Banking in the platform.
     *
     * @param userId The Consumer's User ID.
     * @param banking The Banking schema.
     */
    create(userId: string, banking: BankingSchema): Promise<Banking>;
    /**
     * Partially update an existing Banking.
     *
     * @param userId The Consumer's User ID.
     * @param bankingId The Banking ID.
     * @param banking The partial Banking schema.
     */
    update(userId: string, bankingId: string, banking: Partial<BankingSchema>): Promise<Banking>;
    /**
     * Delete an Banking from the platform.
     *
     * @param userId The Consumer's User ID.
     * @param bankingId The Banking ID.
     */
    delete(userId: string, bankingId: string): Promise<boolean>;
}
