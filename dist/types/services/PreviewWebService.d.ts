import { BaseModelWebServiceOptions } from ".";
import { Http } from "bitcapital-common";
import { PeopleResponse } from "bigdatacorp-service";
export interface PreviewWebServiceOptions extends BaseModelWebServiceOptions {
}
export declare class PreviewWebService {
    protected readonly options: BaseModelWebServiceOptions;
    protected static instance: PreviewWebService;
    protected http: Http;
    constructor(options: BaseModelWebServiceOptions);
    static getInstance(): PreviewWebService;
    static initialize(options: PreviewWebServiceOptions): PreviewWebService;
    findOne(id: string, resourceId?: string): void;
    kyc(taxId: string): Promise<{
        accepted: true;
        details: PeopleResponse;
    }>;
}