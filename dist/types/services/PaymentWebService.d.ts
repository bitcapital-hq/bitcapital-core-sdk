import { Payment, PaymentSchema } from "../models";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";
import { PaymentRequest } from "./request";
export interface PaymentWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class PaymentWebService extends BaseModelWebService<Payment, PaymentSchema> {
    protected static instance: PaymentWebService;
    constructor(options: PaymentWebServiceOptions);
    static getInstance(): PaymentWebService;
    static initialize(options: PaymentWebServiceOptions): PaymentWebService;
    /**
     * Find a Payment.
     *
     * @param id The Payment ID.
     */
    findOne(id: string): Promise<Payment>;
    /**
     * Sends a new Payment to the network, from a single source wallet splitting into multiple payment recipients.
     *
     * @param payment The Payment schema
     */
    pay(request: PaymentRequest): Promise<Payment>;
}
