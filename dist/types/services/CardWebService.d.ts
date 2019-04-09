import { Card, CardBaseRequestSchema, CardBlockRequestSchema, CardSchema, CardUnblockRequestSchema, PaginatedArray, Pagination, Payment } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base/BaseModelWebService";
import { CardEmitRequest } from "./request/CardEmitRequest";
export interface CardWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class CardWebService extends BaseModelWebService<Card, CardSchema> {
    protected static instance: CardWebService;
    constructor(options: CardWebServiceOptions);
    static getInstance(): CardWebService;
    static initialize(options: CardWebServiceOptions): CardWebService;
    /**
     * Emits a new physical or virtual card
     *
     * @param wallet The wallet ID for this emission
     * @param data.type The type of the card, physical or virtual
     * @param data.plasticId The plastic ID for the emission, from the card design
     * @param data.expirationDate The card expiration date, if needed
     */
    emit(wallet: string, data: CardEmitRequest): Promise<Card>;
    /**
     * Blocks card with the given ID
     *
     * @param walletId  The wallet ID
     * @param payload The data required for the card blocking operation
     */
    block(walletId: string, payload: CardBlockRequestSchema): Promise<boolean>;
    /**
     * Unblocks card with the given ID
     *
     * @param walletId  The wallet ID
     * @param payload The data required for the card unblocking operation
     */
    unblock(walletId: string, payload: CardUnblockRequestSchema): Promise<boolean>;
    /**
     * Activates card with the given ID
     *
     * @param walletId  The wallet ID
     * @param payload The data required for the card activation operation
     */
    activate(walletId: string, payload: CardBaseRequestSchema): Promise<boolean>;
    findOne(walletId: string, cardsId: string): Promise<Card>;
    /**
     * Find the Payments from a Card.
     *
     * @param wallet  The wallet ID
     * @param id      The Card ID.
     */
    findCardPayments(wallet: string, id: string, data: Pagination): Promise<PaginatedArray<Payment>>;
}
