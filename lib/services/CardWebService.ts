import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";
import { Card, CardSchema } from "../models";
import { CardBlockRequestSchema, CardUnblockRequestSchema } from "../models/Card/CardBlockRequest";

export interface CardWebServiceOptions extends BaseModelWebServiceOptions {}

export default class CardWebService extends BaseModelWebService<Card, CardSchema> {
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
   * @param id      The card ID
   * @param payload The data required for the card blocking operation
   */
  public async block(id: string, payload: CardBlockRequestSchema): Promise<boolean> {
    const response = await this.http.post(`/cards/${id}/block`, payload);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }

  /**
   * Unblocks card with the given ID
   *
   * @param id      The card ID
   * @param payload The data required for the card unblocking operation
   */
  public async unblock(id: string, payload: CardUnblockRequestSchema): Promise<boolean> {
    const response = await this.http.post(`/cards/${id}/unblock`, payload);

    if (!response || response.status !== 200) {
      throw response;
    }

    return true;
  }

  public async findOne(id: string): Promise<Card> {
    const response = await this.http.get(`/cards/${id}`);

    if (!response || !response.data || response.status !== 200) {
      throw response;
    }

    return new Card(response.data);
  }
}
