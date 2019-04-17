export declare class WalletTransferRequest {
    amount: number;
    bank: {
        bank: number;
        agency: number;
        agencyDigit: string;
        account: number;
        accountDigit: string;
    };
    constructor(amount: number, bank: number, agency: number, agencyDigit: string, account: number, accountDigit: string);
}
