import { Asset, AssetSchema, Payment } from "bitcapital-common";
import { PaginatedArray, Pagination } from "../utils";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";
import { AssetDestroyRequestSchema, AssetEmitRequestSchema } from "./request";
export interface AssetWebServiceOptions extends BaseModelWebServiceOptions {
}
export default class AssetWebService extends BaseModelWebService<Asset, AssetSchema> {
    protected readonly options: AssetWebServiceOptions;
    protected static instance: AssetWebService;
    constructor(options: AssetWebServiceOptions);
    static getInstance(): AssetWebService;
    static initialize(options: AssetWebServiceOptions): AssetWebService;
    /**
     * Find all Assets in the platform.
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<Asset>>;
    /**
     * Find an Asset based on its ID.
     *
     * @param id The Asset ID.
     */
    findOne(id: string): Promise<Asset>;
    /**
     * Emits an Asset to a specific wallet. If none supplied, will be emited to the mediator wallet.
     */
    emit(request: AssetEmitRequestSchema): Promise<Payment>;
    /**
     * Destroys an amount of Assets from a specific wallet. If none supplied, will be destroyed from the mediator wallet.
     */
    destroy(request: AssetDestroyRequestSchema): Promise<Payment>;
    /**
     * Create a new Asset in the platform.
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
     * Delete an Asset from the platform.
     *
     * @param id The Asset ID.
     */
    delete(id: string): Promise<boolean>;
}
