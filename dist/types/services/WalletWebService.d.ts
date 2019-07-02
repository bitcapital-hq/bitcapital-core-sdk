import { Wallet, WalletSchema, Transaction, Pagination, PaginatedArray, Card } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";
import { WalletWithdrawRequest } from "./request";
export interface WalletWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class WalletWebService extends BaseModelWebService<Wallet, WalletSchema> {
    protected static instance: WalletWebService;
    constructor(options: WalletWebServiceOptions);
    static getInstance(): WalletWebService;
    static initialize(options: WalletWebServiceOptions): WalletWebService;
    /**
     * Find all Wallets.
     */
    findAll(pagination?: Pagination): Promise<PaginatedArray<Wallet>>;
    /**
     * Find a Wallet.
     *
     * @param id The Wallet ID.
     */
    findOne(id: string): Promise<Wallet>;
    /**
     * Find the Transactions from a Wallet.
     *
     * @param id The Wallet ID.
     */
    findWalletTransactions(id: string, pagination?: Pagination): Promise<PaginatedArray<Transaction>>;
    /**
     * Find the Payments from a Wallet.
     *
     * @param id The Wallet ID.
     */
    findWalletPayments(id: string, pagination?: Pagination): Promise<PaginatedArray<Transaction>>;
    /**
     * Find the Root Wallet.
     */
    findRootWallet(): Promise<Wallet>;
    /**
     * Find all cards associated with specified wallet.
     */
    findCards(walletId: string, pagination?: Pagination): Promise<PaginatedArray<Card>>;
    /**
     * Create a new Wallet.
     *
     * @param wallet The Wallet schema.
     */
    create(wallet: WalletSchema): Promise<Wallet>;
    /**
     * Partially update an existing Wallet.
     *
     * @param id The Wallet ID.
     * @param wallet The partial Wallet schema.
     */
    update(id: string, wallet: Partial<WalletSchema>): Promise<Wallet>;
    /**
     * Delete a Wallet.
     *
     * @param id The Wallet ID.
     */
    delete(id: string): Promise<boolean>;
    /**
     * Withdraw money from a Wallet.
     *
     * @param id The Wallet id.
     */
    withdraw(id: string, schema: WalletWithdrawRequest): Promise<any>;
    /**
     * Get banking deposit info from a Wallet
     *
     * @param id The Wallet id.
     */
    getDepositInfo(id: string): Promise<any>;
}
