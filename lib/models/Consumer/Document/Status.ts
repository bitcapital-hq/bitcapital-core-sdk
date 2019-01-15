export enum DocumentStatus {
  /* Success states */
  VERIFIED = "verified",
  MANUALLY_VERIFIED = "manually_verified",
  DELETED_BY_USER = "deleted_by_user",

  /* Pending states */
  PENDING_INFORMATION = "pending_information",
  PROCESSING = "processing",

  /* Error states */
  FAILED_VERIFICATION = "failed_verification",
  FAILED_MANUAL_VERIFICATION = "failed_manual_verification"
}
