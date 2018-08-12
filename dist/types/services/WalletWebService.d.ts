import { Http, HttpOptions } from "../base";
import { Wallet, WalletSchema, User } from "../models";
import { PaginatedArray, Pagination } from "../utils";
import BaseModelWebService from "./base/BaseModelWebService";
export default class WalletWebService implements BaseModelWebService<Wallet, WalletSchema> {
    protected http: Http;
    protected static instance: WalletWebService;
    constructor(options: HttpOptions);
    static getInstance(): WalletWebService;
    static initialize(options: HttpOptions): WalletWebService;
    /**
     * Find all {#Wallet}s
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<Wallet>>;
    /**
     * Find a {#Wallet} by it's id.
     *
     * @param id The id of the {#Wallet}
     */
    findOne(id: string): Promise<Wallet>;
    /**
     * Find the Root Wallet.
     */
    findRootWallet(): Promise<Wallet>;
    /**
     * Find the {#User}s from a {#Wallet} by it's id.
     *
     * @param id The id of the {#Wallet}
     */
    findUsersById(id: string): Promise<User[]>;
    /**
     * Find the {#User}s with role {#Consumer} from a {#Wallet} by it's id.
     *
     * @param id The id of the {#Wallet}
     */
    findConsumersById(id: string): Promise<User[]>;
    /**
     * Find the {#User}s with role Mediator from a {#Wallet} by it's id.
     *
     * @param id The id of the {#Wallet}
     */
    findMediatorsById(id: string): Promise<User[]>;
    /**
     * Create a new {#Wallet}.
     *
     * @param wallet The {#Wallet} properties
     */
    create(wallet: WalletSchema): Promise<Wallet>;
    /**
     * Partially update an existing {#Wallet}.
     *
     * @param id the id of the {#Wallet}
     * @param wallet The values you want to update
     */
    update(id: string, wallet: Partial<WalletSchema>): Promise<Wallet>;
    /**
     * Upsert a {#Wallet}.
     *
     * @param wallet The values you want to upsert
     */
    upsert(wallet: WalletSchema): Promise<Wallet>;
    /**
     * Delete a {#Wallet} by it's id.
     *
     * @param id The id of the {#Wallet}
     */
    delete(id: string): Promise<boolean>;
}
