import { Http } from "../base";
import { Document, DocumentSchema, DocumentType, User, UserSchema, Wallet } from "../models";
import { PaginatedArray, Pagination, PaginationUtil } from "../utils";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";

export interface ConsumerWebServiceOptions extends BaseModelWebServiceOptions {}

export class ConsumerWebService extends BaseModelWebService<User, UserSchema> {
  protected http: Http;
  protected static instance: ConsumerWebService;

  constructor(options: ConsumerWebServiceOptions) {
    super(options);
  }

  public static getInstance(): ConsumerWebService {
    return this.instance;
  }

  public static initialize(options: ConsumerWebServiceOptions): ConsumerWebService {
    this.instance = new ConsumerWebService(options);
    return this.instance;
  }

  /**
   * Find all Users with role Consumer.
   */
  public async findAll(pagination: Pagination): Promise<PaginatedArray<User>> {
    const { skip, limit } = pagination;
    const response = await this.http.get("/consumers", null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: UserSchema) => new User(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find a User with role Consumer.
   *
   * @param id The User ID.
   */
  public async findOne(id: string): Promise<User> {
    const response = await this.http.get(`/consumers/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Find the Documents from a User with role Consumer.
   * This method won't return pictures.
   *
   * @param id The User ID.
   * @deprecated This method was moved to DocumentWebService and will be removed in a future release
   */
  public async findDocumentsById(id: string = "me"): Promise<Document[]> {
    console.warn("This method was moved to DocumentWebService and will be removed in a future release");

    const response = await this.http.get(`/consumers/${id}/documents`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(document => new Document(document));
  }

  /**
   * Find the Documents from a User with role Consumer.
   * This method will return pictures.
   *
   * @param id The User ID.
   * @deprecated This method was moved to DocumentWebService and will be removed in a future release
   */
  public async findDocumentByIdAndType(id: string, type: DocumentType): Promise<Document> {
    console.warn("This method was moved to DocumentWebService and will be removed in a future release");

    const response = await this.http.get(`/consumers/${id}/documents/${type}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Document(response.data);
  }

  /**
   * Find the Wallets from a User with role Consumer.
   *
   * @param id The User ID.
   */
  public async findWalletsById(id: string): Promise<Wallet[]> {
    const response = await this.http.get(`/consumers/${id}/wallets`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(wallet => new Wallet(wallet));
  }

  /**
   * Create a new User with role Consumer.
   *
   * @param consumer The User schema.
   */
  public async create(consumer: UserSchema): Promise<User> {
    const response = await this.http.post(`/consumers`, consumer);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Create a new Document on a User with role Consumer.
   *
   * @param id The User ID.
   * @deprecated This method was moved to DocumentWebService and will be removed in a future release
   */
  public async createDocument(id: string, document: DocumentSchema): Promise<Document> {
    console.warn("This method was moved to DocumentWebService and will be removed in a future release");

    const response = await this.http.post(`/consumers/${id}/documents`, document);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Document(response.data);
  }

  /**
   * Partially update an existing User with role Consumer.
   *
   * @param id The User ID.
   * @param consumer The partial User schema.
   */
  public async update(id: string, consumer: Partial<UserSchema>): Promise<User> {
    const response = await this.http.post(`/consumers/${id}`, consumer);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Upload a new Document picture to a User with role Consumer.
   *
   * @param {string} id The User id.
   * @param {DocumentType} type The Document type.
   * @param {("front" | "back" | "selfie")} side The Document picture side.
   * @param {File} picture The picture to be uploaded.
   * @deprecated This method was moved to DocumentWebService and will be removed in a future release
   */
  public async uploadDocumentPicture(id: string, type: DocumentType, side: "front" | "back" | "selfie", picture: File) {
    console.warn("This method was moved to DocumentWebService and will be removed in a future release");

    const formData = new FormData();
    formData.append("picture", picture);

    const response = await this.http.post(`/consumers/${id}/documents/${type}/${side}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Document(response.data);
  }

  /**
   * Upload a new Document picture to a User with role Consumer using base64.
   *
   * @param {string} id The User id.
   * @param {DocumentType} type The Document type.
   * @param {("front" | "back" | "selfie")} side The Document picture side.
   * @param {string} picture The base64 representation of the picture to be uploaded.
   * @deprecated This method was moved to DocumentWebService and will be removed in a future release
   */
  public async uploadDocumentPictureFromBase64(
    id: string,
    type: DocumentType,
    side: "front" | "back" | "selfie",
    picture: string
  ) {
    console.warn("This method was moved to DocumentWebService and will be removed in a future release");

    const response = await this.http.post(`/consumers/${id}/documents/${type}/${side}`, { picture });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Document(response.data);
  }

  /**
   * Delete a User with role Consumer.
   *
   * @param id The User ID.
   */
  public async delete(id: string): Promise<boolean> {
    const response = await this.http.delete(`/consumers/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
