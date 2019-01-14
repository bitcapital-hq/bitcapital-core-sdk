export interface CardBlockRequestSchema {
  password: string;
  description?: string;
}

export interface CardUnblockRequestSchema extends CardBlockRequestSchema {}
