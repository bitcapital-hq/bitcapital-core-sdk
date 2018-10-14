export enum UsersScopes {
  /* Read scopes */
  READ = "users:read",
  READ_DOCUMENTS = "users:documents:read",
  READ_SECRET_TOKENS = "users:secret_tokens:read",
  /* Write scopes */
  WRITE = "users:write",
  WRITE_DOCUMENTS = "users:documents:write",
  WRITE_SECRET_TOKENS = "users:secret_tokens:write",
  /* Delete scopes */
  DELETE = "users:delete"
}
