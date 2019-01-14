import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";
import { Card, CardSchema } from "../models/Card";
import { CardBlockRequestSchema, CardUnblockRequestSchema } from "../models/Card/CardBlockRequest";
export interface CardWebServiceOptions extends BaseModelWebServiceOptions {
}
export default class CardWebService extends BaseModelWebService<Card, CardSchema> {
    protected static instance: CardWebService;
    constructor(options: CardWebServiceOptions);
    static getInstance(): CardWebService;
    static initialize(options: CardWebServiceOptions): CardWebService;
    /**
     * Blocks card with the given ID
     *
     * @param id      The card ID
     * @param payload The data required for the card blocking operation
     */
    block(id: string, payload: CardBlockRequestSchema): Promise<boolean>;
    /**
     * Unblocks card with the given ID
     *
     * @param id      The card ID
     * @param payload The data required for the card unblocking operation
     */
    unblock(id: string, payload: CardUnblockRequestSchema): Promise<boolean>;
    findOne(id: string): Promise<Card>;
}
