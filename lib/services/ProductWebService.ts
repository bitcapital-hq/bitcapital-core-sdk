import { Pagination, PaginatedArray, PaginationUtil, Product, ProductSchema } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";

export interface ProductWebServiceOptions extends BaseModelWebServiceOptions {}

export class ProductWebService extends BaseModelWebService<Product, ProductSchema> {
  protected static instance: ProductWebService;

  constructor(options: ProductWebServiceOptions) {
    super(options);
  }

  public static getInstance(): ProductWebService {
    return this.instance;
  }

  public static initialize(options: ProductWebServiceOptions): ProductWebService {
    this.instance = new ProductWebService(options);
    return this.instance;
  }

  /**
   * Find all Products.
   */
  public async findAll(pagination: Pagination): Promise<PaginatedArray<Product>> {
    const { skip, limit } = pagination;
    const response = await this.http.get("/products", null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: ProductSchema) => new Product(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a Product.
   *
   * @param id The Product ID.
   */
  public async findOne(id: string): Promise<Product> {
    const response = await this.http.get(`/products/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Product(response.data);
  }
}
