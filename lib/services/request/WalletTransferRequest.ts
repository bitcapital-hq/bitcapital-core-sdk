export class WalletTransferRequest {
  amount: number;

  bank: {
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
    accountDigit: string
  ) {
    this.amount = amount;
    this.bank.bank = bank;
    this.bank.agency = agency;
    this.bank.agencyDigit = agencyDigit;
    this.bank.account = account;
    this.bank.accountDigit = accountDigit;
  }
}
