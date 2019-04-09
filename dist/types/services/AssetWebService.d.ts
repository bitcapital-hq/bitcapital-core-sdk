import { BaseModelWebServiceOptions, BaseModelWebService } from "./base";
import { Asset, AssetSchema, Pagination, PaginatedArray, Transaction } from "bitcapital-common";
import { AssetEmitRequestSchema, AssetDestroyRequestSchema } from "./request";
export interface AssetWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class AssetWebService extends BaseModelWebService<Asset, AssetSchema> {
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
    emit(request: AssetEmitRequestSchema): Promise<Transaction>;
    /**
     * Destroys an amount of Assets from a specific wallet. If none supplied, will be destroyed from the mediator wallet.
     */
    destroy(request: AssetDestroyRequestSchema): Promise<Transaction>;
    /**
     * Create a new Asset in the platform.
     *
     * @param asset The Asset schema.
     */
    create(asset: AssetSchema): Promise<Asset>;
}
