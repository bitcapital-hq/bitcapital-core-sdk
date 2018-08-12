import { Session } from "../session";
import { Http, HttpOptions } from "../base";
import { Asset, AssetSchema } from "../models";
import { PaginationUtil, PaginatedArray, Pagination } from "../utils";
import BaseModelWebService from "./base/BaseModelWebService";

export default class AssetWebService implements BaseModelWebService<Asset, AssetSchema> {
  protected http: Http;
  protected static instance: AssetWebService;

  constructor(options: HttpOptions) {
    this.http = new Http(options);

    if (Session.getInstance()) {
      this.http.interceptors(Session.getInstance().interceptors());
    }
  }

  public static getInstance(): AssetWebService {
    return this.instance;
  }

  public static initialize(options: HttpOptions): AssetWebService {
    this.instance = new AssetWebService(options);
    return this.instance;
  }

  /**
   * Find all {#Asset}s
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
   * Find a {#Asset} by it's id.
   *
   * @param id The id of the {#Asset}
   */
  public async findOne(id: string): Promise<Asset> {
    const response = await this.http.get(`/assets/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Asset(response.data);
  }

  /**
   * Create a new {#Asset}.
   *
   * @param asset The {#Asset} properties
   */
  public async create(asset: AssetSchema): Promise<Asset> {
    const response = await this.http.post("/assets", asset);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Asset(response.data);
  }

  /**
   * Partially update an existing {#Asset}.
   *
   * @param id the id of the {#Asset}
   * @param asset The values you want to update
   */
  public async update(id: string, asset: Partial<AssetSchema>): Promise<Asset> {
    const response = await this.http.post(`/assets/${id}`, asset);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Asset(response.data);
  }

  /**
   * Delete a {#Asset} by it's id.
   *
   * @param id The id of the {#Asset}
   */
  public async delete(id: string): Promise<boolean> {
    const response = await this.http.delete(`/assets/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
