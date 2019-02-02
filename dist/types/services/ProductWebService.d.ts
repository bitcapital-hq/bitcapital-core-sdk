import { Pagination, PaginatedArray, Product, ProductSchema } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";
export interface ProductWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class ProductWebService extends BaseModelWebService<Product, ProductSchema> {
    protected static instance: ProductWebService;
    constructor(options: ProductWebServiceOptions);
    static getInstance(): ProductWebService;
    static initialize(options: ProductWebServiceOptions): ProductWebService;
    /**
     * Find all Products.
     */
    findAll(pagination: Pagination): Promise<PaginatedArray<Product>>;
    /**
     * Find a Product.
     *
     * @param id The Product ID.
     */
    findOne(id: string): Promise<Product>;
}
