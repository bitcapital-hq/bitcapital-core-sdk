import { NestedModelWebService, NestedModelWebServiceOptions } from "./base";
import { DocumentSchema, Document } from "../models";
import { Pagination, PaginatedArray, PaginationUtil } from "../utils";

export interface DocumentWebServiceOptions extends NestedModelWebServiceOptions {}

export class DocumentWebService extends NestedModelWebService<Document, DocumentSchema> {
  protected static instance: DocumentWebService;

  constructor(protected readonly options: DocumentWebServiceOptions) {
    super(options);
  }

  public static getInstance(): DocumentWebService {
    return this.instance;
  }

  public static initialize(options: DocumentWebServiceOptions): DocumentWebService {
    this.instance = new DocumentWebService(options);
    return this.instance;
  }

  /**
   * Find all Documents from a Consumer.
   * This method won't return pictures.
   *
   * @param userId The Consumer's User ID.
   * @param pagination The pagination parameters.
   */
  public async findAll(userId: string, pagination: Pagination): Promise<PaginatedArray<Document>> {
    const { skip, limit } = pagination;
    const response = await this.http.get(`/consumers/${userId}/documents`, null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: DocumentSchema) => new Document(item));
    return PaginationUtil.parse(result, response.headers);
  }

  /**
   * Find an Document based on it's ID or type.
   * This method will return pictures.
   *
   * @param userId The Consumer's User ID.
   * @param documentId The Document ID or type.
   */
  public async findOne(userId: string, documentIdOrType: string): Promise<Document> {
    const response = await this.http.get(`/consumers/${userId}/documents/${documentIdOrType}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Document(response.data);
  }

  /**
   * Create a new Document in the platform.
   *
   * @param userId The Consumer's User ID.
   * @param document The Document schema.
   */
  public async create(userId: string, document: DocumentSchema): Promise<Document> {
    const response = await this.http.post(`/consumers/${userId}/documents`, document);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Document(response.data);
  }

  /**
   * Partially update an existing Document.
   *
   * @param userId The Consumer's User ID.
   * @param documentId The Document ID.
   * @param document The partial Document schema.
   */
  public async update(userId: string, documentId: string, document: Partial<DocumentSchema>): Promise<Document> {
    const response = await this.http.post(`/consumers/${userId}/documents/${documentId}`, document);

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Document(response.data);
  }

  /**
   * Upload a new Document picture.
   *
   * @param {string} userId The Consumer's User id.
   * @param {DocumentType} type The Document type.
   * @param {("front" | "back" | "selfie")} side The Document picture side.
   * @param {File} picture The picture to be uploaded.
   */
  public async uploadPicture(userId: string, type: DocumentType, side: "front" | "back" | "selfie", picture: File) {
    const formData = new FormData();
    formData.append("picture", picture);

    const response = await this.http.post(`/consumers/${userId}/documents/${type}/${side}`, formData, {
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
   * Upload a new Document picture.
   *
   * @param {string} userId The Consumer's User id.
   * @param {DocumentType} type The Document type.
   * @param {("front" | "back" | "selfie")} side The Document picture side.
   * @param {string} picture The base64 representation of the picture to be uploaded.
   */
  public async uploadPictureFromBase64(
    userId: string,
    type: DocumentType,
    side: "front" | "back" | "selfie",
    picture: string
  ) {
    const response = await this.http.post(`/consumers/${userId}/documents/${type}/${side}`, { picture });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Document(response.data);
  }

  /**
   * Delete an Document from the platform.
   *
   * @param userId The Consumer's User ID.
   * @param documentId The Document ID.
   */
  public async delete(userId: string, documentId: string): Promise<boolean> {
    const response = await this.http.delete(`/consumers/${userId}/documents/${documentId}`);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }
}
