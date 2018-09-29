import { Http } from "../base";
import { Domain, DomainSchema, User } from "../models";
import { PaginatedArray, Pagination, PaginationUtil } from "../utils";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";

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
   * Find all {#Domain}s
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
   * Find a {#Domain} by it's id.
   *
   * @param id The id of the {#Domain}
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
   * Find the {#User}s from a {#Domain} by it's id.
   *
   * @param id The id of the {#Domain}
   */
  public async findUsersById(id: string): Promise<User[]> {
    const response = await this.http.get(`/domains/${id}/users`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(user => new User(user));
  }

  /**
   * Find the {#User}s with role {#Consumer} from a {#Domain} by it's id.
   *
   * @param id The id of the {#Domain}
   */
  public async findConsumersById(id: string): Promise<User[]> {
    const response = await this.http.get(`/domains/${id}/consumers`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(user => new User(user));
  }

  /**
   * Find the {#User}s with role Mediator from a {#Domain} by it's id.
   *
   * @param id The id of the {#Domain}
   */
  public async findMediatorsById(id: string): Promise<User[]> {
    const response = await this.http.get(`/domains/${id}/mediators`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(user => new User(user));
  }

  /**
   * Create a new {#Domain}.
   *
   * @param domain The {#Domain} properties
   */
  public async create(domain: DomainSchema): Promise<Domain> {
    const response = await this.http.post("/domains", domain);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Domain(response.data);
  }

  /**
   * Partially update an existing {#Domain}.
   *
   * @param id the id of the {#Domain}
   * @param domain The values you want to update
   */
  public async update(id: string, domain: Partial<DomainSchema>): Promise<Domain> {
    const response = await this.http.post(`/domains/${id}`, domain);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Domain(response.data);
  }

  /**
   * Delete a {#Domain} by it's id.
   *
   * @param id The id of the {#Domain}
   */
  public async delete(id: string): Promise<boolean> {
    const response = await this.http.delete(`/domains/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
