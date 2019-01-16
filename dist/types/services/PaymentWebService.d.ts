import { Payment, PaymentRequestSchema, PaymentSchema, BankTransferPayment } from "../models";
import BaseModelWebService, { BaseModelWebServiceOptions } from "./base/BaseModelWebService";
export interface PaymentWebServiceOptions extends BaseModelWebServiceOptions {
}
export default class PaymentWebService extends BaseModelWebService<Payment, PaymentSchema> {
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
    pay(request: PaymentRequestSchema): Promise<Payment>;
    /**
     * Performs cashout from consumer wallet to the bank account identified by the given id
     *
     * @param bankingId The id of the bank account to be credited
     */
    withdraw(bankingId: string): Promise<BankTransferPayment>;
}
