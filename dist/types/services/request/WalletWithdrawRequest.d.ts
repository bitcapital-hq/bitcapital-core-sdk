export declare class WalletWithdrawRequest {
    amount: number;
    bankingId?: string;
    bank?: {
        bank: number;
        agency: number;
        agencyDigit: string;
        account: number;
        accountDigit: string;
    };
    constructor(amount: number, bank: number, agency: number, agencyDigit: string, account: number, accountDigit: string, bankingId?: string);
}
