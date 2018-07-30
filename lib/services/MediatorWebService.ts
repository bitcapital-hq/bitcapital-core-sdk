import { Session } from "../session";
import { Http, HttpOptions } from "../base";
import { User, UserSchema } from "../models";
import { PaginationUtil, PaginatedArray, Pagination } from "../utils";
import BaseModelWebService from "./base/BaseModelWebService";

export default class MediatorWebService implements BaseModelWebService<User, UserSchema> {
  protected http: Http;
  protected static instance: MediatorWebService;

  constructor(options: HttpOptions) {
    this.http = new Http(options);

    if (Session.getInstance()) {
      this.http.interceptors(Session.getInstance().interceptors());
    }
  }

  public static getInstance(options: HttpOptions): MediatorWebService {
    if (!this.instance) {
      this.instance = new MediatorWebService(options);
    }
    return this.instance;
  }

  /**
   * Find all {#User} with role {#Mediator}s
   *
   * @param query The query of the search
   */
  public async findAll(pagination: Pagination): Promise<PaginatedArray<User>> {
    const { skip, limit } = pagination;
    const response = await this.http.get("/mediators", null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: UserSchema) => new User(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a {#User} with role {#Mediator} by it's ID
   *
   * @param id The id of the mediator
   */
  public async findOne(id: string): Promise<User> {
    const response = await this.http.get(`/mediators/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Create a new {#User} with role {#Mediator}
   *
   * @param mediator The mediator properties
   */
  public async create(mediator: UserSchema): Promise<User> {
    const response = await this.http.post("/mediators", mediator);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Partially update an existing {#User} with role {#Mediator}.
   *
   * @param id the id of the {#User} with role {#Mediator}
   * @param mediator The values you want to update
   */
  public async update(id: string, mediator: Partial<UserSchema>): Promise<User> {
    const response = await this.http.post(`/mediators/${id}`, mediator);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Delete a {#User} with role {#Mediator} by it's id
   *
   * @param id The id of the {#User} with role {#Mediator}
   */
  public async delete(id: string): Promise<boolean> {
    const response = await this.http.delete(`/mediators/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
