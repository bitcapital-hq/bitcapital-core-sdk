export enum ConsumerStatus {
  /* Success states */
  READY = "ready",
  REJECTED = "rejected",

  /* Pending states */
  PENDING_DOCUMENTS = "pending_documents",

  /* Processing states */
  PROCESSING_DOCUMENTS = "processing_documents",
  PROCESSING_WALLETS = "processing_wallets",

  /* Error states */
  INVALID_DOCUMENTS = "invalid_documents",
  MANUAL_VERIFICATION = "manual_verification",

  /* Blocked state */
  BLOCKED = "blocked"
}
