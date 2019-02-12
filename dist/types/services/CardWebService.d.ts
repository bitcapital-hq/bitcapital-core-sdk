import { BaseModelWebService, BaseModelWebServiceOptions } from "./base/BaseModelWebService";
import { Card, CardSchema, CardBlockRequestSchema, CardUnblockRequestSchema, CardBaseRequestSchema, Payment, Pagination, PaginatedArray } from "bitcapital-common";
export interface CardWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class CardWebService extends BaseModelWebService<Card, CardSchema> {
    protected static instance: CardWebService;
    constructor(options: CardWebServiceOptions);
    static getInstance(): CardWebService;
    static initialize(options: CardWebServiceOptions): CardWebService;
    /**
     * Blocks card with the given ID
     *
     * @param userId  The user ID
     * @param payload The data required for the card blocking operation
     */
    block(userId: string, payload: CardBlockRequestSchema): Promise<boolean>;
    /**
     * Unblocks card with the given ID
     *
     * @param userId  The user ID
     * @param payload The data required for the card unblocking operation
     */
    unblock(userId: string, payload: CardUnblockRequestSchema): Promise<boolean>;
    /**
     * Activates card with the given ID
     *
     * @param userId  The user ID
     * @param payload The data required for the card activation operation
     */
    activate(userId: string, payload: CardBaseRequestSchema): Promise<boolean>;
    findOne(userId: string, cardsId: string): Promise<Card>;
    /**
     * Find the Payments from a Card.
     *
     * @param userId  The user ID
     * @param id      The Card ID.
     */
    findCardPayments(userId: string, id: string, pagination: Pagination): Promise<PaginatedArray<Payment>>;
}
