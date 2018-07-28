import { Session } from "../session";
import { Http, HttpOptions } from "../base";
import { Domain, DomainSchema, User } from "../models";
import { PaginationUtil, PaginatedArray } from "../utils";

export interface DomainWebServiceOptions extends HttpOptions {
  session?: Session;
}

export default class DomainWebService extends Http {
  protected options: DomainWebServiceOptions;
  protected static instance: DomainWebService;

  constructor(options: DomainWebServiceOptions) {
    super(options);
    if (options.session) {
      this.interceptors(options.session.interceptors());
    }
  }

  public static getInstance(options: DomainWebServiceOptions): DomainWebService {
    if (!this.instance) {
      this.instance = new DomainWebService(options);
    }
    return this.instance;
  }

  /**
   * Find all {#Domain}s
   */
  public async findAll(): Promise<PaginatedArray<Domain>> {
    const response = await this.get("/domains");

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
  public async findById(id: string): Promise<Domain> {
    const response = await this.get(`/domains/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Domain(response.data);
  }

  public async findUsersById(id: string): Promise<User> {
    const response = await this.get(`/domains/${id}/users`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(user => new User(user));
  }

  public async findConsumersById(id: string): Promise<User> {
    const response = await this.get(`/domains/${id}/consumers`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(user => new User(user));
  }

  public async findMediatorsById(id: string): Promise<User> {
    const response = await this.get(`/domains/${id}/mediators`);

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
    const response = await this.post("/domains", domain);

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
    const response = await this.post(`/domains/${id}`, domain);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Domain(response.data);
  }

  /**
   * Upsert a {#Domain}.
   *
   * @param domain The values you want to upsert
   */
  public async upsert(domain: DomainSchema): Promise<Domain> {
    const response = await this.put(`/domains`, domain);

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
  public async deleteById(id: string): Promise<boolean> {
    const response = await this.delete(`/domains/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
