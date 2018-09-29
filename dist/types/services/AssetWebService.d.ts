import { Asset, AssetEmitRequestSchema, AssetSchema, Payment } from "../models";
import { PaginatedArray, Pagination } from "../utils";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";
export interface AssetWebServiceOptions extends BaseModelWebServiceOptions {
}
export default class AssetWebService extends BaseModelWebService<Asset, AssetSchema> {
    protected static instance: AssetWebService;
    constructor(options: AssetWebServiceOptions);
    static getInstance(): AssetWebService;
    static initialize(options: AssetWebServiceOptions): AssetWebService;
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
     * Emits an {#Asset} by it's id.
     *
     * @param id The id of the {#Asset}
     * @param amount The amount to be emitted
     * @param [destination] The destination wallet
     */
    emit(request: AssetEmitRequestSchema): Promise<Payment>;
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
