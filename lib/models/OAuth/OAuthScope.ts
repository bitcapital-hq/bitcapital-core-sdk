export default class Scopes {
  /**
   * The OAuth 2.0 domain scopes.
   */
  static readonly domains = {
    read: "domains:read",
    write: "domains:write",
    delete: "domains:delete",
    metrics: "domains:metrics"
  };

  /**
   * The OAuth 2.0 user documents scopes.
   */
  static readonly users = {
    read: "users:read",
    write: "users:write",
    delete: "users:delete"
  };

  /**
   * The OAuth 2.0 user documents scopes.
   */
  static readonly userDocuments = {
    read: "users:documents:read",
    write: "users:documents:write",
    delete: "users:documents:delete"
  };

  /**
   * The OAuth 2.0 assets scopes.
   */
  static readonly assets = {
    read: "assets:read",
    write: "assets:write",
    delete: "assets:delete",
    distribute: "assets:distribute"
  };

  /**
   * The OAuth 2.0 wallets scopes.
   */
  static readonly wallets = {
    read: "wallets:read",
    write: "wallets:write",
    delete: "wallets:delete"
  };

  /**
   * The OAuth 2.0 payments scopes.
   */
  static readonly payments = {
    read: "payments:read",
    write: "payments:write",
    delete: "payments:delete"
  };
}
