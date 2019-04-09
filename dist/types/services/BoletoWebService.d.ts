import { Boleto, BoletoSchema, BoletoEmissionRequestSchema, BoletoEmissionResponse, BoletoPaymentRequestSchema, BoletoPaymentResponse, BoletoValidateResponse } from "bitcapital-common";
import { BaseModelWebService, BaseModelWebServiceOptions } from "./base/BaseModelWebService";
export interface BoletoWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class BoletoWebService extends BaseModelWebService<Boleto, BoletoSchema> {
    protected static instance: BoletoWebService;
    constructor(options: BoletoWebServiceOptions);
    static getInstance(): BoletoWebService;
    static initialize(options: BoletoWebServiceOptions): BoletoWebService;
    /**
     * Retrieves data required for boleto payment using its barcode
     *
     * @param barcode The boleto barcode
     */
    getPaymentInfo(barcode: string): Promise<BoletoValidateResponse>;
    /**
     * Pays a boleto identified by his barcode using the account
     * balance of the user whose id was sent in the request body
     *
     * @param payment The Payment schema
     */
    pay(payload: BoletoPaymentRequestSchema): Promise<BoletoPaymentResponse>;
    /**
     * Emits a boleto to enable a deposit into a specified account.
     *
     * @param payload The payload schema
     */
    emit(payload: BoletoEmissionRequestSchema): Promise<BoletoEmissionResponse>;
    /**
     * Find a Boleto by its ID
     *
     * @param id the boleto ID
     */
    findOne(id: string): Promise<Boleto>;
}
