import { Min, IsNumber, IsNotEmpty } from "class-validator";

export interface DomainSettingsLocksSchema {
  total_single_transaction_value: number;
  total_recent_transactions_value_monthly: number;
  total_recent_transactions_value_weekly: number;
  total_recent_transactions_value_daily: number;
  total_sent_transactions_value_monthly: number;
  total_sent_transactions_value_weekly: number;
  total_sent_transactions_value_daily: number;
  total_received_transactions_value_monthly: number;
  total_received_transactions_value_weekly: number;
  total_received_transactions_value_daily: number;
}

export class DomainSettingsLocks implements DomainSettingsLocksSchema {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total_single_transaction_value = 0;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total_recent_transactions_value_monthly = 0;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total_recent_transactions_value_weekly = 0;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total_recent_transactions_value_daily = 0;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total_sent_transactions_value_monthly = 0;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total_sent_transactions_value_weekly = 0;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total_sent_transactions_value_daily = 0;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total_received_transactions_value_monthly = 0;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total_received_transactions_value_weekly = 0;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total_received_transactions_value_daily = 0;

  constructor(data: Partial<DomainSettingsLocks> = {}) {
    Object.assign(data, this);
  }
}
