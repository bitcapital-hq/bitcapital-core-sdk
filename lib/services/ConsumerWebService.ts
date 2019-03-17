import { Http, User, UserSchema, Pagination, PaginatedArray, PaginationUtil } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";

export interface ConsumerWebServiceOptions extends BaseModelWebServiceOptions {}

export class ConsumerWebService extends BaseModelWebService<User, UserSchema> {
  protected http: Http;
  protected static instance: ConsumerWebService;

  constructor(options: ConsumerWebServiceOptions) {
    super(options);
  }

  public static getInstance(): ConsumerWebService {
    return this.instance;
  }

  public static initialize(options: ConsumerWebServiceOptions): ConsumerWebService {
    this.instance = new ConsumerWebService(options);
    return this.instance;
  }

  /**
   * Find all Users with role Consumer.
   */
  public async findAll(pagination: Pagination): Promise<PaginatedArray<User>> {
    const { skip, limit } = pagination;
    const response = await this.http.get("/consumers", null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: UserSchema) => new User(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a User with role Consumer.
   *
   * @param id The User ID.
   */
  public async findOne(id: string): Promise<User> {
    const response = await this.http.get(`/consumers/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Block an User with role Consumer.
   *
   * @param id The User ID.
   */
  public async block(id: string): Promise<boolean> {
    const response = await this.http.post(`/consumers/${id}/block`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data;
  }

  /**
   * Block an User with role Consumer.
   *
   * @param id The User ID.
   */
  public async unblock(id: string): Promise<boolean> {
    const response = await this.http.post(`/consumers/${id}/unblock`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data;
  }

  /**
   * Create a new User with role Consumer.
   *
   * @param consumer The User schema.
   */
  public async create(consumer: UserSchema & { externalId?: string }): Promise<User> {
    const response = await this.http.post(`/consumers`, consumer);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Partially update an existing User with role Consumer.
   *
   * @param id The User ID.
   * @param consumer The partial User schema.
   */
  public async update(id: string, consumer: Partial<UserSchema>): Promise<User> {
    if (consumer.consumer) {
      if (consumer.consumer.addresses) {
        throw new Error("Addresses should be updated on it's own service");
      }
      if (consumer.consumer.documents) {
        throw new Error("Documents should be updated on it's own service");
      }
      if (consumer.consumer.phones) {
        throw new Error("Phones should be updated on it's own service");
      }
    }

    const response = await this.http.post(`/consumers/${id}`, consumer);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Delete a User with role Consumer.
   *
   * @param id The User ID.
   */
  public async delete(id: string): Promise<boolean> {
    const response = await this.http.delete(`/consumers/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
