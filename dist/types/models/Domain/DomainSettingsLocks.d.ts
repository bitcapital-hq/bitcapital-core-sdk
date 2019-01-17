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
export declare class DomainSettingsLocks implements DomainSettingsLocksSchema {
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
    constructor(data?: Partial<DomainSettingsLocks>);
}
