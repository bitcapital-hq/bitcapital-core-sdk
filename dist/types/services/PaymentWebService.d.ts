import { Payment, PaymentRequestSchema, PaymentSchema } from "../models";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";
export interface PaymentWebServiceOptions extends BaseModelWebServiceOptions {
}
export default class PaymentWebService extends BaseModelWebService<Payment, PaymentSchema> {
    protected static instance: PaymentWebService;
    constructor(options: PaymentWebServiceOptions);
    static getInstance(): PaymentWebService;
    static initialize(options: PaymentWebServiceOptions): PaymentWebService;
    /**
     * Find a {#Payment} by it's id.
     *
     * @param id The id of the {#Payment}
     */
    findOne(id: string): Promise<Payment>;
    /**
     * Create a {#Payment}
     *
     * @param payment The payment to be created
     */
    pay(request: PaymentRequestSchema): Promise<Payment>;
}
