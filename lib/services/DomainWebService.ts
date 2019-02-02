import { Domain, DomainSchema, Http, PaginatedArray, Pagination, PaginationUtil, User } from "bitcapital-common";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";

export enum PaymentLogType {
  COMMON = "common",
  EMIT = "emit",
  DESTROY = "destroy"
}

export interface DomainMetricsOptions {
  start?: Date; // Start of date range for metrics
  end?: Date; // End of date range for metrics
  source?: string; // Get metrics for a single source
  recipient?: string; // Get metrics for a single recipient
  asset?: string; // Get metrics for a single asset
  type?: PaymentLogType; // Get metrics for a single payment type
}

export interface CountMetricsResponse {
  paymentTime: Date;
  count: number;
}

export interface TotalMetricsResponse {
  paymentTime: Date;
  totalAmount: number;
}

export interface DomainWebServiceOptions extends BaseModelWebServiceOptions {}

export default class DomainWebService extends BaseModelWebService<Domain, DomainSchema> {
  protected http: Http;
  protected static instance: DomainWebService;

  constructor(options: DomainWebServiceOptions) {
    super(options);
  }

  public static getInstance(): DomainWebService {
    return this.instance;
  }

  public static initialize(options: DomainWebServiceOptions): DomainWebService {
    this.instance = new DomainWebService(options);
    return this.instance;
  }

  /**
   * Find all Domains.
   */
  public async findAll(pagination: Pagination): Promise<PaginatedArray<Domain>> {
    const { skip, limit } = pagination;
    const response = await this.http.get("/domains", null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: DomainSchema) => new Domain(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a Domain.
   *
   * @param id The Domain ID.
   */
  public async findOne(id: string): Promise<Domain> {
    const response = await this.http.get(`/domains/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Domain(response.data);
  }

  /**
   * Find the Root Domain.
   */
  public async findRootDomain(): Promise<Domain> {
    const response = await this.http.get(`/domains/root`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Domain(response.data);
  }

  /**
   * Find the Users with role Consumer from a Domain.
   *
   * @param id The Domain ID.
   */
  public async findConsumersById(id: string): Promise<User[]> {
    const response = await this.http.get(`/domains/${id}/consumers`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(user => new User(user));
  }

  /**
   * Find the Users with role Mediator from a Domain.
   *
   * @param id The Domain ID.
   */
  public async findMediatorsById(id: string): Promise<User[]> {
    const response = await this.http.get(`/domains/${id}/mediators`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(user => new User(user));
  }

  /**
   * Create a new Domain.
   *
   * @param domain The Domain schema.
   */
  public async create(domain: DomainSchema): Promise<Domain> {
    const response = await this.http.post("/domains", domain);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Domain(response.data);
  }

  /**
   * Partially update an existing Domain.
   *
   * @param id The Domain ID.
   * @param domain The partial Domain schema.
   */
  public async update(id: string, domain: Partial<DomainSchema>): Promise<Domain> {
    const response = await this.http.post(`/domains/${id}`, domain);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Domain(response.data);
  }

  /**
   * Delete a Domain.
   *
   * @param id The Domain ID.
   */
  public async delete(id: string): Promise<boolean> {
    const response = await this.http.delete(`/domains/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }

  /**
   * Gets the cumulative sum of payment amounts grouped by time
   *
   * @param {string} id
   * @param {DomainMetricsOptions} [options]
   */
  public async getPaymentsAmountMetrics(id: string, options?: DomainMetricsOptions): Promise<TotalMetricsResponse[]> {
    const response = await this.http.get(`/domains/${id}/metrics/payments/amount`, { params: options });

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(r => ({ time: new Date(r.time), totalAmount: Number(r.total_amount) }));
  }

  /**
   * Gets the cumulative count of payment amounts grouped by time
   *
   * @param {string} id
   * @param {DomainMetricsOptions} [options]
   */
  public async getPaymentsCountMetrics(id: string, options?: DomainMetricsOptions): Promise<CountMetricsResponse[]> {
    const response = await this.http.get(`/domains/${id}/metrics/payments/count`, { params: options });

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(r => ({ time: new Date(r.time), count: Number(r.count) }));
  }

  /**
   * Gets the cumulative count of active users grouped by time
   *
   * @param {string} id
   * @param {DomainMetricsOptions} [options]
   */
  public async getActiveUserCountMetrics(id: string, options?: DomainMetricsOptions): Promise<CountMetricsResponse[]> {
    const response = await this.http.get(`/domains/${id}/metrics/users/count`, { params: options });

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(r => ({ time: new Date(r.time), count: Number(r.count) }));
  }

  /**
   * Gets the cumulative balance grouped by time
   *
   * @param {string} id
   * @param {DomainMetricsOptions} [options]
   */
  public async getBalanceMetrics(id: string, options?: DomainMetricsOptions): Promise<TotalMetricsResponse[]> {
    const response = await this.http.get(`/domains/${id}/metrics/balance`, { params: options });

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(r => ({ time: new Date(r.time), totalAmount: Number(r.total_amount) }));
  }
}
