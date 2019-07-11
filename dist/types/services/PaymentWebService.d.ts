import { Payment, PaymentSchema, PaymentRequestSchema, WithdrawalRequestSchema, BankTransferPayment, Transaction, PaymentType } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base";
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
    pay(request: PaymentRequestSchema): Promise<Transaction>;
    /**
     * Performs cashout from consumer wallet to the bank account identified by the given id
     *
     * @param bankingId The id of the bank account to be credited
     */
    withdraw(requestData: WithdrawalRequestSchema): Promise<BankTransferPayment>;
    confirm(source: string, id: string, extra?: any): Promise<Payment>;
    reverse(source: string, id: string, extra?: any): Promise<Payment>;
    authorize(request: {
        source: string;
        amount: string;
        type: PaymentType;
        assetCode?: string;
        additionalData?: any;
    }): Promise<Transaction>;
}
