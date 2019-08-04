import { PaymentType } from "bitcapital-common";
export interface AssetDestroyRequestSchema {
    id?: string;
    paymentType?: PaymentType;
    amount: string;
    source?: string;
    additionalData?: any;
}
