import { Session } from "../session";
import { Http, HttpOptions } from "../base";
import { User, UserSchema, Document, Wallet, DocumentSchema } from "../models";
import { PaginationUtil, PaginatedArray, Pagination } from "../utils";
import BaseModelWebService from "./base/BaseModelWebService";

export default class ConsumerWebService implements BaseModelWebService<User, UserSchema> {
  protected http: Http;
  protected static instance: ConsumerWebService;

  constructor(options: HttpOptions) {
    this.http = new Http(options);

    if (Session.getInstance()) {
      this.http.interceptors(Session.getInstance().interceptors());
    }
  }

  public static getInstance(): ConsumerWebService {
    return this.instance;
  }

  public static initialize(options: HttpOptions): ConsumerWebService {
    this.instance = new ConsumerWebService(options);
    return this.instance;
  }

  /**
   * Find all {#User} with role {#Consumer}s
   *
   * @param query The query of the search
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
   * Find a {#User} with role {#Consumer} by it's ID
   *
   * @param id The id of the {#Consumer}
   */
  public async findOne(id: string): Promise<User> {
    const response = await this.http.get(`/consumers/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Find the #{Document}s from a {#Consumer} by it's ID
   * This method won't return pictures
   *
   * @param id The id of the {#Consumer}
   */
  public async findDocumentsById(id: string): Promise<Document[]> {
    const response = await this.http.get(`/consumers/${id}/documents`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(document => new Document(document));
  }

  /**
   * Find the {#Document}s from a {#Consumer} by it's ID and the {#Document} type
   * This method will return pictures
   *
   * @param id The id of the {#Consumer}
   */
  public async findDocumentByIdAndType(id: string, type: DocumentType): Promise<Document> {
    const response = await this.http.get(`/consumers/${id}/documents/${type}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Document(response.data);
  }

  /**
   * Find the {#Wallet}s from a {#Consumer} by it's ID
   *
   * @param id The id of the {#Consumer}
   */
  public async findWalletsById(id: string): Promise<Wallet[]> {
    const response = await this.http.get(`/consumers/${id}/wallets`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return response.data.map(wallet => new Wallet(wallet));
  }

  /**
   * Create a new {#Document} on a {#Consumer} by it's ID
   *
   * @param id The id of the {#Consumer}
   */
  public async createDocument(id: string, document: DocumentSchema): Promise<Document> {
    const response = await this.http.post(`/consumers/${id}/documents`, document);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Document(response.data);
  }

  /**
   * Partially update an existing {#User} with role {#Consumer}.
   *
   * @param id the id of the {#User} with role {#Consumer}
   * @param consumer The values you want to update
   */
  public async update(id: string, consumer: Partial<UserSchema>): Promise<User> {
    const response = await this.http.post(`/consumers/${id}`, consumer);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new User(response.data);
  }

  /**
   * Upload a new {#Document} picture to a {#Consumer} by it's ID and the {#Document} type and side
   *
   * @param id The id of the {#Consumer}
   */
  public async uploadDocumentPicture(id: string, type: DocumentType, side: "front" | "back" | "selfie", picture: File) {
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
   * Delete a {#User} with role {#Consumer} by it's id
   *
   * @param id The id of the {#User} with role {#Consumer}
   */
  public async delete(id: string): Promise<boolean> {
    const response = await this.http.delete(`/consumers/${id}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
