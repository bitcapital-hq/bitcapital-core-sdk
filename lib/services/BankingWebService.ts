import { Banking, BankingSchema, PaginatedArray, Pagination, PaginationUtil } from "bitcapital-common";
import { NestedModelWebService, NestedModelWebServiceOptions } from "./base";

export interface BankingWebServiceOptions extends NestedModelWebServiceOptions {}

export class BankingWebService extends NestedModelWebService<Banking, BankingSchema> {
  protected static instance: BankingWebService;

  constructor(protected readonly options: BankingWebServiceOptions) {
    super(options);
  }

  public static getInstance(): BankingWebService {
    return this.instance;
  }

  public static initialize(options: BankingWebServiceOptions): BankingWebService {
    this.instance = new BankingWebService(options);
    return this.instance;
  }

  /**
   * Find all Bankings from a Consumer.
   *
   * @param userId The Consumer's User ID.
   * @param pagination The pagination parameters.
   */
  public async findAll(userId: string, pagination: Pagination): Promise<PaginatedArray<Banking>> {
    const { skip, limit } = pagination;
    const response = await this.http.get(`/consumers/${userId}/bankings`, null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: BankingSchema) => new Banking(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a Banking based on it's ID.
   *
   * @param userId The Consumer's User ID.
   * @param bankingId The Banking ID.
   */
  public async findOne(userId: string, bankingId: string): Promise<Banking> {
    const response = await this.http.get(`/consumers/${userId}/bankings/${bankingId}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Banking(response.data);
  }

  /**
   * Create a new Banking in the platform.
   *
   * @param userId The Consumer's User ID.
   * @param banking The Banking schema.
   */
  public async create(userId: string, banking: BankingSchema): Promise<Banking> {
    const response = await this.http.post(`/consumers/${userId}/bankings`, banking);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Banking(response.data);
  }

  /**
   * Partially update an existing Banking.
   *
   * @param userId The Consumer's User ID.
   * @param bankingId The Banking ID.
   * @param banking The partial Banking schema.
   */
  public async update(userId: string, bankingId: string, banking: Partial<BankingSchema>): Promise<Banking> {
    const response = await this.http.post(`/consumers/${userId}/bankings/${bankingId}`, banking);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Banking(response.data);
  }

  /**
   * Delete a Banking from the platform.
   *
   * @param userId The Consumer's User ID.
   * @param bankingId The Banking ID.
   */
  public async delete(userId: string, bankingId: string): Promise<boolean> {
    const response = await this.http.delete(`/consumers/${userId}/bankings/${bankingId}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
