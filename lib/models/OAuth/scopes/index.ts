import { AssetsScopes } from "./assets";
import { DomainsScopes } from "./domains";
import { OAuthClientScopes } from "./oauth-clients";
import { UsersScopes } from "./users";
import { PaymentsScopes } from "./payments";
import { TransactionsScopes } from "./transactions";
import { WalletsScopes } from "./wallets";

export type ScopeType =
  | AssetsScopes
  | DomainsScopes
  | UsersScopes
  | PaymentsScopes
  | TransactionsScopes
  | WalletsScopes;

export const Scopes = {
  assets: AssetsScopes,
  domains: DomainsScopes,
  oAuthClients: OAuthClientScopes,
  users: UsersScopes,
  payments: PaymentsScopes,
  transactions: TransactionsScopes,
  wallets: WalletsScopes
};
