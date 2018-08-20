export interface WalletBalance {
  balance: number;
  limit?: number;
  buying_liabilities?: number;
  selling_liabilities?: number;
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
}
