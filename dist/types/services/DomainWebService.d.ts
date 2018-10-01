import { Http } from "../base";
import { Domain, DomainSchema, User } from "../models";
import { PaginatedArray, Pagination } from "../utils";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";
export declare enum PaymentLogType {
    COMMON = "common",
    EMIT = "emit",
    DESTROY = "destroy"
}
export interface DomainMetricsOptions {
    start?: Date;
    end?: Date;
    source?: string;
    recipient?: string;
    asset?: string;
    type?: PaymentLogType;
}
export interface CountMetricsResponse {
    paymentTime: Date;
    count: number;
}
export interface TotalMetricsResponse {
    paymentTime: Date;
    totalAmount: number;
}
export interface DomainWebServiceOptions extends BaseModelWebServiceOptions {
}
export default class DomainWebService extends BaseModelWebService<Domain, DomainSchema> {
    protected http: Http;
    protected static instance: DomainWebService;
    constructor(options: DomainWebServiceOptions);
    static getInstance(): DomainWebService;
    static initialize(options: DomainWebServiceOptions): DomainWebService;
    /**
     * Find all {#Domain}s
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<Domain>>;
    /**
     * Find a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    findOne(id: string): Promise<Domain>;
    /**
     * Find the Root Domain.
     */
    findRootDomain(): Promise<Domain>;
    /**
     * Find the {#User}s from a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    findUsersById(id: string): Promise<User[]>;
    /**
     * Find the {#User}s with role {#Consumer} from a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    findConsumersById(id: string): Promise<User[]>;
    /**
     * Find the {#User}s with role Mediator from a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    findMediatorsById(id: string): Promise<User[]>;
    /**
     * Create a new {#Domain}.
     *
     * @param domain The {#Domain} properties
     */
    create(domain: DomainSchema): Promise<Domain>;
    /**
     * Partially update an existing {#Domain}.
     *
     * @param id the id of the {#Domain}
     * @param domain The values you want to update
     */
    update(id: string, domain: Partial<DomainSchema>): Promise<Domain>;
    /**
     * Delete a {#Domain} by it's id.
     *
     * @param id The id of the {#Domain}
     */
    delete(id: string): Promise<boolean>;
    /**
     * Gets the cumulative sum of payment amounts grouped by time
     *
     * @param {string} id
     * @param {DomainMetricsOptions} [options]
     */
    getPaymentsAmountMetrics(id: string, options?: DomainMetricsOptions): Promise<TotalMetricsResponse[]>;
    /**
     * Gets the cumulative count of payment amounts grouped by time
     *
     * @param {string} id
     * @param {DomainMetricsOptions} [options]
     */
    getPaymentsCountMetrics(id: string, options?: DomainMetricsOptions): Promise<CountMetricsResponse[]>;
    /**
     * Gets the cumulative count of active users grouped by time
     *
     * @param {string} id
     * @param {DomainMetricsOptions} [options]
     */
    getActiveUserCountMetrics(id: string, options?: DomainMetricsOptions): Promise<CountMetricsResponse[]>;
    /**
     * Gets the cumulative balance grouped by time
     *
     * @param {string} id
     * @param {DomainMetricsOptions} [options]
     */
    getBalanceMetrics(id: string, options?: DomainMetricsOptions): Promise<TotalMetricsResponse[]>;
}
