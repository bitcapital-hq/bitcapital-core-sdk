export class WalletWithdrawRequest {
  amount: number;
  bankingId?: string;
  bank?: {
    bank: number;
    agency: number;
    agencyDigit: string;
    account: number;
    accountDigit: string;
  };

  constructor(
    amount: number,
    bank: number,
    agency: number,
    agencyDigit: string,
    account: number,
    accountDigit: string,
    bankingId?: string
  ) {
    this.amount = amount;
    this.bank.bank = bank;
    this.bank.agency = agency;
    this.bank.agencyDigit = agencyDigit;
    this.bank.account = account;
    this.bank.accountDigit = accountDigit;
    this.bankingId = bankingId;
  }
}
