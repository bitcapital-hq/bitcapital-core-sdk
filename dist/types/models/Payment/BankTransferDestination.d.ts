export interface BankTransferDestinationSchema {
    account: number;
    accountDigit: string;
    agency: number;
    agencyDigit: string;
    bank: number;
    name: string;
    taxIdNumber: string;
    type: string;
}
export declare class BankTransferDestination implements BankTransferDestinationSchema {
    account: number;
    accountDigit: string;
    agency: number;
    agencyDigit: string;
    bank: number;
    name: string;
    taxIdNumber: string;
    type: string;
    constructor(data: Partial<BankTransferDestinationSchema>);
}
