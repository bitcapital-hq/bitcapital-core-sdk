import { Http, HttpOptions } from "../base";
import { Asset, AssetSchema } from "../models";
import { PaginatedArray, Pagination } from "../utils";
import BaseModelWebService from "./base/BaseModelWebService";
export default class AssetWebService implements BaseModelWebService<Asset, AssetSchema> {
    protected http: Http;
    protected static instance: AssetWebService;
    constructor(options: HttpOptions);
    static getInstance(): AssetWebService;
    static initialize(options: HttpOptions): AssetWebService;
    /**
     * Find all {#Asset}s
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<Asset>>;
    /**
     * Find a {#Asset} by it's id.
     *
     * @param id The id of the {#Asset}
     */
    findOne(id: string): Promise<Asset>;
    /**
     * Create a new {#Asset}.
     *
     * @param asset The {#Asset} properties
     */
    create(asset: AssetSchema): Promise<Asset>;
    /**
     * Partially update an existing {#Asset}.
     *
     * @param id the id of the {#Asset}
     * @param asset The values you want to update
     */
    update(id: string, asset: Partial<AssetSchema>): Promise<Asset>;
    /**
     * Delete a {#Asset} by it's id.
     *
     * @param id The id of the {#Asset}
     */
    delete(id: string): Promise<boolean>;
}
