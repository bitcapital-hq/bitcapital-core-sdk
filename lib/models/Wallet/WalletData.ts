export interface StellarWalletData {
  publicKey?: string;
  secretKey?: string;
  assets?: string[];
}

export interface BankingWalletData {
  bankCode?: string;
  accountAgency?: string;
  accountNumber?: string;
  accountDocument?: string;
}
