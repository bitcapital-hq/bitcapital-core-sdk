import { AssetsScopes } from "./assets";
import { DomainsScopes } from "./domains";
import { UsersScopes } from "./users";
import { PaymentsScopes } from "./payments";
import { TransactionsScopes } from "./transactions";
import { WalletsScopes } from "./wallets";

const scopes = {
  assets: AssetsScopes,
  domains: DomainsScopes,
  users: UsersScopes,
  payments: PaymentsScopes,
  transactions: TransactionsScopes,
  wallets: WalletsScopes
};

export default scopes;
