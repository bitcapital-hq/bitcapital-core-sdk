import { Banking, BankingSchema, PaginatedArray, Pagination } from "bitcapital-common";
import { NestedModelWebService, NestedModelWebServiceOptions } from "./base";
export interface BankingWebServiceOptions extends NestedModelWebServiceOptions {
}
export declare class BankingWebService extends NestedModelWebService<Banking, BankingSchema> {
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
     * Find a Banking based on it's ID.
     *
     * @param userId The Consumer's User ID.
     * @param bankingId The Banking ID.
     */
    findOne(userId: string, bankingId: string): Promise<Banking>;
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
     * Delete a Banking from the platform.
     *
     * @param userId The Consumer's User ID.
     * @param bankingId The Banking ID.
     */
    delete(userId: string, bankingId: string): Promise<boolean>;
}
