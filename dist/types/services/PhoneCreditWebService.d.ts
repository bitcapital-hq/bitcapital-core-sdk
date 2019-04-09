import { BaseModelWebServiceOptions, BaseModelWebService } from ".";
import { PhoneCredit, PhoneCreditSchema, PhoneCreditDealers } from "bitcapital-common";
export interface PhoneCreditWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class PhoneCreditWebService extends BaseModelWebService<PhoneCredit, PhoneCreditSchema> {
    protected static instance: PhoneCreditWebService;
    constructor(options: PhoneCreditWebServiceOptions);
    static getInstance(): PhoneCreditWebService;
    static initialize(options: PhoneCreditWebServiceOptions): PhoneCreditWebService;
    findOne(id: string, resourceId?: string): Promise<PhoneCredit>;
    getPhoneCreditProviders(): Promise<PhoneCreditDealers>;
    getPhoneCreditOrderHistoryForWallet(walletId: String): Promise<PhoneCredit[]>;
    createOrder(phoneCode: string, phoneNumber: string, providerCode: string): Promise<PhoneCredit>;
    completeOrder(amount: String, sourceWalletId: String, phoneCreditOrderId: string): Promise<PhoneCredit>;
}
