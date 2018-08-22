import { Http, HttpOptions } from "../base";
import { Payment, PaymentSchema, PaymentRequestSchema } from "../models";
import BaseModelWebService from "./base/BaseModelWebService";
export default class PaymentWebService implements BaseModelWebService<Payment, PaymentSchema> {
    protected http: Http;
    protected static instance: PaymentWebService;
    constructor(options: HttpOptions);
    static getInstance(): PaymentWebService;
    static initialize(options: HttpOptions): PaymentWebService;
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
