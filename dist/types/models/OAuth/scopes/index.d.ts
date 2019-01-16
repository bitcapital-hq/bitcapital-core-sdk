import { AssetsScopes } from "./assets";
import { DomainsScopes } from "./domains";
import { OAuthClientScopes } from "./oauth-clients";
import { UsersScopes } from "./users";
import { PaymentsScopes } from "./payments";
import { TransactionsScopes } from "./transactions";
import { WalletsScopes } from "./wallets";
export declare type ScopeType = AssetsScopes | DomainsScopes | UsersScopes | PaymentsScopes | TransactionsScopes | WalletsScopes;
export declare const Scopes: {
    assets: typeof AssetsScopes;
    domains: typeof DomainsScopes;
    oAuthClients: typeof OAuthClientScopes;
    users: typeof UsersScopes;
    payments: typeof PaymentsScopes;
    transactions: typeof TransactionsScopes;
    wallets: typeof WalletsScopes;
};
