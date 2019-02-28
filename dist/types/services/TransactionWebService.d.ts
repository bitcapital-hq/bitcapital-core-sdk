import { Transaction, TransactionSchema } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";
export interface TransactionWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class TransactionWebService extends BaseModelWebService<Transaction, TransactionSchema> {
    protected static instance: TransactionWebService;
    constructor(options: TransactionWebServiceOptions);
    static getInstance(): TransactionWebService;
    static initialize(options: TransactionWebServiceOptions): TransactionWebService;
    /**
     * Find a Transaction.
     *
     * @param id The Transaction ID.
     */
    findOne(id: string): Promise<Transaction>;
}
