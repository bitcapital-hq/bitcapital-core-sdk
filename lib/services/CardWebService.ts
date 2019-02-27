import { BaseModelWebService, BaseModelWebServiceOptions } from "./base/BaseModelWebService";
import {
  Card,
  CardSchema,
  CardBlockRequestSchema,
  CardUnblockRequestSchema,
  CardBaseRequestSchema,
  Payment,
  PaymentSchema,
  Pagination,
  PaginatedArray,
  PaginationUtil
} from "bitcapital-common";

export interface CardWebServiceOptions extends BaseModelWebServiceOptions {}

export class CardWebService extends BaseModelWebService<Card, CardSchema> {
  protected static instance: CardWebService;

  constructor(options: CardWebServiceOptions) {
    super(options);
  }

  public static getInstance(): CardWebService {
    return this.instance;
  }

  public static initialize(options: CardWebServiceOptions): CardWebService {
    this.instance = new CardWebService(options);
    return this.instance;
  }

  /**
   * Blocks card with the given ID
   *
   * @param userId  The user ID
   * @param payload The data required for the card blocking operation
   */
  public async block(userId: string, payload: CardBlockRequestSchema): Promise<boolean> {
    const response = await this.http.post(`/users/${userId}/cards/${payload.cardId}/block`, payload);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }

  /**
   * Unblocks card with the given ID
   *
   * @param userId  The user ID
   * @param payload The data required for the card unblocking operation
   */
  public async unblock(userId: string, payload: CardUnblockRequestSchema): Promise<boolean> {
    const response = await this.http.post(`/users/${userId}/cards/${payload.cardId}/unblock`, payload);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }

  /**
   * Activates card with the given ID
   *
   * @param userId  The user ID
   * @param payload The data required for the card activation operation
   */
  public async activate(userId: string, payload: CardBaseRequestSchema): Promise<boolean> {
    const response = await this.http.post(`/users/${userId}/cards/${payload.cardId}/activate`, payload);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }

  public async findOne(userId: string, cardsId: string): Promise<Card> {
    const response = await this.http.get(`/users/${userId}/cards/${cardsId}`);

    if (!response || !response.data || response.status !== 200) {
      throw response;
    }

    return new Card(response.data);
  }

  /**
   * Find the Payments from a Card.
   *
   * @param userId  The user ID
   * @param id      The Card ID.
   */
  public async findCardPayments(userId: string, id: string, pagination: Pagination): Promise<PaginatedArray<Payment>> {
    const { skip, limit } = pagination;
    const response = await this.http.get(`/users/${userId}/cards/${id}/payments`, null, { params: { skip, limit } });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: PaymentSchema) => new Payment(item));
    return PaginationUtil.parse(result, response.headers);
  }
}
