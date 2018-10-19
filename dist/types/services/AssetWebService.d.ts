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
     * Find all Assets.
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<Asset>>;
    /**
     * Find an Asset.
     *
     * @param id The Asset ID.
     */
    findOne(id: string): Promise<Asset>;
    /**
     * Emit an Asset.
     */
    emit(request: AssetEmitRequestSchema): Promise<Payment>;
    /**
     * Create a new Asset.
     *
     * @param asset The Asset schema.
     */
    create(asset: AssetSchema): Promise<Asset>;
    /**
     * Partially update an existing Asset.
     *
     * @param id The Asset ID.
     * @param asset The partial Asset schema.
     */
    update(id: string, asset: Partial<AssetSchema>): Promise<Asset>;
    /**
     * Delete a Asset.
     *
     * @param id The Asset ID.
     */
    delete(id: string): Promise<boolean>;
}
