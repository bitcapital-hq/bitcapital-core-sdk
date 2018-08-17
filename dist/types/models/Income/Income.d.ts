import { RecipientSchema } from "../Payment/Recipient";
import { TransactionSchema } from "../Transaction/Transaction";
import { PaymentSchema } from "../Payment/Payment";
export interface IncomeSchema {
    amount: RecipientSchema["amount"];
    source: TransactionSchema["source"];
    paymentId: PaymentSchema["id"];
    transactionId: TransactionSchema["id"];
}
