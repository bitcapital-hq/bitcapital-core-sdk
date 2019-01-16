import { NestedModelWebService, NestedModelWebServiceOptions } from "./base";
import { AddressSchema, Address } from "../models";
import { Pagination, PaginatedArray, PaginationUtil } from "../utils";

export interface AddressWebServiceOptions extends NestedModelWebServiceOptions {}

export class AddressWebService extends NestedModelWebService<Address, AddressSchema> {
  protected static instance: AddressWebService;

  constructor(protected readonly options: AddressWebServiceOptions) {
    super(options);
  }

  public static getInstance(): AddressWebService {
    return this.instance;
  }

  public static initialize(options: AddressWebServiceOptions): AddressWebService {
    this.instance = new AddressWebService(options);
    return this.instance;
  }

  /**
   * Find all Addresses from a Consumer.
   *
   * @param userId The Consumer's User ID.
   * @param pagination The pagination parameters.
   */
  public async findAll(userId: string, pagination: Pagination): Promise<PaginatedArray<Address>> {
    const { skip, limit } = pagination;
    const response = await this.http.get(`/consumer/${userId}/addresses`, null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: AddressSchema) => new Address(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find an Address based on it's ID.
   *
   * @param userId The Consumer's User ID.
   * @param addressId The Address ID.
   */
  public async findOne(userId: string, addressId: string): Promise<Address> {
    const response = await this.http.get(`/consumer/${userId}/addresses/${addressId}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Address(response.data);
  }

  /**
   * Create a new Address in the platform.
   *
   * @param userId The Consumer's User ID.
   * @param address The Address schema.
   */
  public async create(userId: string, address: AddressSchema): Promise<Address> {
    const response = await this.http.post(`/consumer/${userId}/addresses`, address);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Address(response.data);
  }

  /**
   * Partially update an existing Address.
   *
   * @param userId The Consumer's User ID.
   * @param addressId The Address ID.
   * @param address The partial Address schema.
   */
  public async update(userId: string, addressId: string, address: Partial<AddressSchema>): Promise<Address> {
    const response = await this.http.post(`/consumer/${userId}/addresses/${addressId}`, address);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Address(response.data);
  }

  /**
   * Delete an Address from the platform.
   *
   * @param userId The Consumer's User ID.
   * @param addressId The Address ID.
   */
  public async delete(userId: string, addressId: string): Promise<boolean> {
    const response = await this.http.delete(`/consumer/${userId}/addresses/${addressId}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
