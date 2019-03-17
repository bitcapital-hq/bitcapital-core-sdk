import {
  Card,
  CardBaseRequestSchema,
  CardBlockRequestSchema,
  CardSchema,
  CardUnblockRequestSchema,
  PaginatedArray,
  Pagination,
  PaginationUtil,
  Payment,
  PaymentSchema
} from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base/BaseModelWebService";
import { CardEmitRequest } from "./request/CardEmitRequest";

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
   * Emits a new physical or virtual card
   *
   * @param wallet The wallet ID for this emission
   * @param data.type The type of the card, physical or virtual
   * @param data.plasticId The plastic ID for the emission, from the card design
   * @param data.expirationDate The card expiration date, if needed
   */
  public async emit(wallet: string, data: CardEmitRequest): Promise<Card> {
    const { type, ...otherData } = data;
    const response = await this.http.post(`/wallets/${wallet}/cards/${type}`, { ...otherData });

    if (!response || response.status !== 200) {
      throw response;
    }

    return new Card(response.data);
  }

  /**
   * Blocks card with the given ID
   *
   * @param walletId  The wallet ID
   * @param payload The data required for the card blocking operation
   */
  public async block(walletId: string, payload: CardBlockRequestSchema): Promise<boolean> {
    const response = await this.http.post(`/wallets/${walletId}/cards/${payload.cardId}/block`, payload);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }

  /**
   * Unblocks card with the given ID
   *
   * @param walletId  The wallet ID
   * @param payload The data required for the card unblocking operation
   */
  public async unblock(walletId: string, payload: CardUnblockRequestSchema): Promise<boolean> {
    const response = await this.http.post(`/wallets/${walletId}/cards/${payload.cardId}/unblock`, payload);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }

  /**
   * Activates card with the given ID
   *
   * @param walletId  The wallet ID
   * @param payload The data required for the card activation operation
   */
  public async activate(walletId: string, payload: CardBaseRequestSchema): Promise<boolean> {
    const response = await this.http.post(`/wallets/${walletId}/cards/${payload.cardId}/activate`, payload);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }

  public async findOne(walletId: string, cardsId: string): Promise<Card> {
    const response = await this.http.get(`/wallets/${walletId}/cards/${cardsId}`);

    if (!response || !response.data || response.status !== 200) {
      throw response;
    }

    return new Card(response.data);
  }

  /**
   * Find the Payments from a Card.
   *
   * @param wallet  The wallet ID
   * @param id      The Card ID.
   */
  public async findCardPayments(wallet: string, id: string, data: Pagination): Promise<PaginatedArray<Payment>> {
    const { skip, limit } = data;
    const response = await this.http.get(`/wallets/${wallet}/cards/${id}/payments`, null, {
      params: { skip, limit }
    });

    if (!response || response.status !== 200) {
      throw response;
    }

    // Return a paginated array with count information from headers
    const result = response.data.map((item: PaymentSchema) => new Payment(item));
    return PaginationUtil.parse(result, response.headers);
  }
}
