export enum UsersScopes {
  /* Read scopes */
  READ = "users:read",
  READ_BANKINGS = "users:bankings:read",
  READ_DOCUMENTS = "users:documents:read",
  READ_SECRET_TOKENS = "users:secret_tokens:read",
  /* Write scopes */
  WRITE = "users:write",
  WRITE_BANKINGS = "users:bankings:write",
  WRITE_DOCUMENTS = "users:documents:write",
  WRITE_SECRET_TOKENS = "users:secret_tokens:write",
  /* Delete scopes */
  DELETE = "users:delete",
  /* Block scopes */
  BLOCK = "users:block"
}
