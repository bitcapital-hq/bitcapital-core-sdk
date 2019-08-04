import { BaseModelWebServiceOptions, BaseModelWebService } from "./base";
import {
  Asset,
  AssetSchema,
  Pagination,
  PaginatedArray,
  PaginationUtil,
  RequestUtil,
  Transaction
} from "bitcapital-common";
import { AssetEmitRequestSchema, AssetDestroyRequestSchema } from "./request";

export interface AssetWebServiceOptions extends BaseModelWebServiceOptions {}

export class AssetWebService extends BaseModelWebService<Asset, AssetSchema> {
  protected static instance: AssetWebService;

  constructor(protected readonly options: AssetWebServiceOptions) {
    super(options);
  }

  public static getInstance(): AssetWebService {
    return this.instance;
  }

  public static initialize(options: AssetWebServiceOptions): AssetWebService {
    this.instance = new AssetWebService(options);
    return this.instance;
  }

  /**
   * Find all Assets in the platform.
   */
  public async findAll(pagination: Pagination): Promise<PaginatedArray<Asset>> {
    const { skip, limit } = pagination;
    const response = await this.http.get("/assets", null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: AssetSchema) => new Asset(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find an Asset based on its ID.
   *
   * @param id The Asset ID.
   */
  public async findOne(id: string): Promise<Asset> {
    const response = await this.http.get(`/assets/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Asset(response.data);
  }

  /**
   * Emits an Asset to a specific wallet. If none supplied, will be emited to the mediator wallet.
   */
  public async emit(request: AssetEmitRequestSchema): Promise<Transaction> {
    const { id, paymentType, amount, destination, additionalData } = request;
    const body = { amount, paymentType, destination, additionalData };
    const signature = RequestUtil.sign(this.options.clientSecret, {
      method: "POST",
      url: `/assets/${id}/emit`,
      body: JSON.stringify(body)
    });

    const response = await this.http.post(`/assets/${id}/emit`, body, {
      headers: { ...signature }
    });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Transaction(response.data);
  }

  /**
   * Destroys an amount of Assets from a specific wallet. If none supplied, will be destroyed from the mediator wallet.
   */
  public async destroy(request: AssetDestroyRequestSchema): Promise<Transaction> {
    const { id, paymentType, amount, source, additionalData } = request;
    const body = { paymentType, amount, source, additionalData };
    const signature = RequestUtil.sign(this.options.clientSecret, {
      method: "POST",
      url: `/assets/${id}/destroy`,
      body: JSON.stringify(body)
    });

    const response = await this.http.post(`/assets/${id}/destroy`, body, {
      headers: { ...signature }
    });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Transaction(response.data);
  }

  /**
   * Create a new Asset in the platform.
   *
   * @param asset The Asset schema.
   */
  public async create(asset: AssetSchema): Promise<Asset> {
    const response = await this.http.post("/assets", asset);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Asset(response.data);
  }
}
