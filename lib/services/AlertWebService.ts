import { Pagination, PaginatedArray, PaginationUtil, Alert, AlertSchema } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";

export interface AlertWebServiceOptions extends BaseModelWebServiceOptions {}

export class AlertWebService extends BaseModelWebService<Alert, AlertSchema> {
  protected static instance: AlertWebService;

  constructor(options: AlertWebServiceOptions) {
    super(options);
  }

  public static getInstance(): AlertWebService {
    return this.instance;
  }

  public static initialize(options: AlertWebServiceOptions): AlertWebService {
    this.instance = new AlertWebService(options);
    return this.instance;
  }

  /**
   * Find All Alerts
   */
  public async findAll(pagination: Pagination): Promise<PaginatedArray<Alert>> {
    const { skip, limit } = pagination;
    const response = await this.http.get("/alerts", null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: AlertSchema) => new Alert(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find an Alert.
   *
   * @param id The Alert ID.
   */
  public async findOne(id: string): Promise<Alert> {
    const response = await this.http.get(`/alerts/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Alert(response.data);
  }

  /**
   * Create a new Alert in the platform.
   *
   * @param asset The Alert schema.
   */
  public async create(issue: AlertSchema): Promise<Alert> {
    const response = await this.http.post("/alerts", issue);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Alert(response.data);
  }

  /**
   * Delete an Alert from the platform.
   *
   * @param id The Alert's ID.
   */
  public async delete(id: string): Promise<boolean> {
    const response = await this.http.delete(`/alerts/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
