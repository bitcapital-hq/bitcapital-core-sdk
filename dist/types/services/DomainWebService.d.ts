import { Domain, DomainSchema, Http, PaginatedArray, Pagination, User } from "bitcapital-common";
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
     * Find all Domains.
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<Domain>>;
    /**
     * Find a Domain.
     *
     * @param id The Domain ID.
     */
    findOne(id: string): Promise<Domain>;
    /**
     * Find the Root Domain.
     */
    findRootDomain(): Promise<Domain>;
    /**
     * Find the Users with role Consumer from a Domain.
     *
     * @param id The Domain ID.
     */
    findConsumersById(id: string): Promise<User[]>;
    /**
     * Find the Users with role Mediator from a Domain.
     *
     * @param id The Domain ID.
     */
    findMediatorsById(id: string): Promise<User[]>;
    /**
     * Create a new Domain.
     *
     * @param domain The Domain schema.
     */
    create(domain: DomainSchema): Promise<Domain>;
    /**
     * Partially update an existing Domain.
     *
     * @param id The Domain ID.
     * @param domain The partial Domain schema.
     */
    update(id: string, domain: Partial<DomainSchema>): Promise<Domain>;
    /**
     * Delete a Domain.
     *
     * @param id The Domain ID.
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
