import { NestedModelWebService, NestedModelWebServiceOptions } from "./base";
import { PhoneSchema, Phone } from "../models";
import { Pagination, PaginatedArray, PaginationUtil } from "../utils";

export interface PhoneWebServiceOptions extends NestedModelWebServiceOptions {}

export class PhoneWebService extends NestedModelWebService<Phone, PhoneSchema> {
  protected static instance: PhoneWebService;

  constructor(protected readonly options: PhoneWebServiceOptions) {
    super(options);
  }

  public static getInstance(): PhoneWebService {
    return this.instance;
  }

  public static initialize(options: PhoneWebServiceOptions): PhoneWebService {
    this.instance = new PhoneWebService(options);
    return this.instance;
  }

  /**
   * Find all Phones from a Consumer.
   *
   * @param userId The Consumer's User ID.
   * @param pagination The pagination parameters.
   */
  public async findAll(userId: string, pagination: Pagination): Promise<PaginatedArray<Phone>> {
    const { skip, limit } = pagination;
    const response = await this.http.get(`/consumer/${userId}/phones`, null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: PhoneSchema) => new Phone(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find an Phone based on it's ID.
   *
   * @param userId The Consumer's User ID.
   * @param phoneId The Phone ID.
   */
  public async findOne(userId: string, phoneId: string): Promise<Phone> {
    const response = await this.http.get(`/consumer/${userId}/phones/${phoneId}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Phone(response.data);
  }

  /**
   * Create a new Phone in the platform.
   *
   * @param userId The Consumer's User ID.
   * @param phone The Phone schema.
   */
  public async create(userId: string, phone: PhoneSchema): Promise<Phone> {
    const response = await this.http.post(`/consumer/${userId}/phones`, phone);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Phone(response.data);
  }

  /**
   * Partially update an existing Phone.
   *
   * @param userId The Consumer's User ID.
   * @param phoneId The Phone ID.
   * @param phone The partial Phone schema.
   */
  public async update(userId: string, phoneId: string, phone: Partial<PhoneSchema>): Promise<Phone> {
    const response = await this.http.post(`/consumer/${userId}/phones/${phoneId}`, phone);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Phone(response.data);
  }

  /**
   * Delete an Phone from the platform.
   *
   * @param userId The Consumer's User ID.
   * @param phoneId The Phone ID.
   */
  public async delete(userId: string, phoneId: string): Promise<boolean> {
    const response = await this.http.delete(`/consumer/${userId}/phones/${phoneId}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
