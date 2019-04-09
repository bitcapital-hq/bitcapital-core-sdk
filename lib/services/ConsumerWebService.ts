import { Http, User, UserSchema, Pagination, PaginatedArray, PaginationUtil, Document } from "bitcapital-common";
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
   * Block an User with role Consumer.
   *
   * @param id The User ID.
   */
  public async block(id: string): Promise<boolean> {
    const response = await this.http.post(`/consumers/${id}/block`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data;
  }

  /**
   * Block an User with role Consumer.
   *
   * @param id The User ID.
   */
  public async unblock(id: string): Promise<boolean> {
    const response = await this.http.post(`/consumers/${id}/unblock`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data;
  }

  /**
   * Gets KYC information about an user for an operator.
   *
   * @param id The User ID.
   */
  public async getKYCData(id: string) {
    const response = await this.http.get(`/consumers/${id}/kyc`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data;
  }

  /**
   * Create a new User with role Consumer.
   *
   * @param consumer The User schema.
   */
  public async create(consumer: UserSchema & { externalId?: string }): Promise<User> {
    const response = await this.http.post(`/consumers`, consumer);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Partially update an existing User with role Consumer.
   *
   * @param id The User ID.
   * @param consumer The partial User schema.
   */
  public async update(id: string, consumer: Partial<UserSchema>): Promise<User> {
    if (consumer.consumer) {
      if (consumer.consumer.addresses) {
        throw new Error("Addresses should be updated on it's own service");
      }
      if (consumer.consumer.documents) {
        throw new Error("Documents should be updated on it's own service");
      }
      if (consumer.consumer.phones) {
        throw new Error("Phones should be updated on it's own service");
      }
    }

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
   * Registers the manual KYC anlysis result.
   *
   * @param {string} id The User id.
   * @param {string} name The consumer's name.
   * @param {{"approved" | "rejected"}} result The analysis veredict.
   * @param {string} result The reason for the consumer's approval or rejection.
   * @param {string} taxId The consumer's tax ID.
   * @param {string} motherName The consumer's mother's name.
   * @param {string} address The consumer's address.
   * @param {string} phone The consumer's phone.
   * @param {string} birthday The consumer's birthday.
   */
  public async setManualKYCAnalysisResult(
    id: string,
    name: string,
    result: string,
    reason: string,
    taxId: string,
    motherName: string,
    address: string,
    phone: string,
    birthday: string
  ) {
    const response = await this.http.post(`/consumers/${id}/kyc`, {
      name,
      result,
      reason,
      taxId,
      motherName,
      address,
      phone,
      birthday
    });

    if (!response || response.status !== 200) {
      throw response;
    }

    return response;
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
