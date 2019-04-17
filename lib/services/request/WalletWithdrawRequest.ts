export class WalletWithdrawRequest {
  bankingId?: string;
  amount: string;
  constructor(bankingId: string, amount: string) {
    this.bankingId = bankingId;
    this.amount = amount;
  }
}
