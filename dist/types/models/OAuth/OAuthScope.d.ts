export default class Scopes {
    /**
     * The OAuth 2.0 domain scopes.
     */
    static readonly domains: {
        read: string;
        write: string;
        delete: string;
        metrics: string;
    };
    /**
     * The OAuth 2.0 user documents scopes.
     */
    static readonly users: {
        read: string;
        write: string;
        delete: string;
    };
    /**
     * The OAuth 2.0 user documents scopes.
     */
    static readonly userDocuments: {
        read: string;
        write: string;
        delete: string;
    };
    /**
     * The OAuth 2.0 assets scopes.
     */
    static readonly assets: {
        read: string;
        write: string;
        delete: string;
        distribute: string;
    };
    /**
     * The OAuth 2.0 wallets scopes.
     */
    static readonly wallets: {
        read: string;
        write: string;
        delete: string;
    };
    /**
     * The OAuth 2.0 payments scopes.
     */
    static readonly payments: {
        read: string;
        write: string;
        delete: string;
    };
}
