"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("../../../node_modules/class-validator");
class BoletoInfo {
    constructor(data) {
        this.description = undefined;
        this.amount = undefined;
        this.expiresAt = undefined;
        this.hasExpirationDate = undefined;
        this.barcodeNumber = undefined;
        Object.assign(this, data);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BoletoInfo.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BoletoInfo.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], BoletoInfo.prototype, "expiresAt", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], BoletoInfo.prototype, "hasExpirationDate", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BoletoInfo.prototype, "barcodeNumber", void 0);
exports.BoletoInfo = BoletoInfo;
class TradersInfo {
    constructor(data) {
        this.recipient = undefined;
        this.recipientDocument = undefined;
        this.payerName = undefined;
        this.payerDocument = undefined;
        Object.assign(this, data);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TradersInfo.prototype, "recipient", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TradersInfo.prototype, "recipientDocument", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TradersInfo.prototype, "payerName", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TradersInfo.prototype, "payerDocument", void 0);
exports.TradersInfo = TradersInfo;
class PartialAmountDetails {
    constructor(data) {
        this.code = undefined;
        this.description = undefined;
        Object.assign(this, data);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], PartialAmountDetails.prototype, "code", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PartialAmountDetails.prototype, "description", void 0);
exports.PartialAmountDetails = PartialAmountDetails;
class PaymentAmountDetails {
    constructor(data) {
        this.interestAmount = undefined;
        this.discount = undefined;
        this.fineAmount = undefined;
        this.totalAmount = undefined;
        this.paymentAmountUpdated = undefined;
        this.calculationDate = undefined;
        Object.assign(this, data);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], PaymentAmountDetails.prototype, "interestAmount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], PaymentAmountDetails.prototype, "discount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], PaymentAmountDetails.prototype, "fineAmount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], PaymentAmountDetails.prototype, "totalAmount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], PaymentAmountDetails.prototype, "paymentAmountUpdated", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], PaymentAmountDetails.prototype, "calculationDate", void 0);
exports.PaymentAmountDetails = PaymentAmountDetails;
class PaymentInfo {
    constructor(data) {
        this.contractId = undefined;
        this.idNumber = undefined;
        this.traders = undefined;
        this.expiresAt = undefined;
        this.totalAmount = undefined;
        this.amountDetails = undefined;
        this.acceptPartialAmount = undefined;
        this.barcode = undefined;
        this.digitableLine = undefined;
        this.paymentDeadline = undefined;
        this.validDate = undefined;
        this.nextBusinessDay = undefined;
        Object.assign(this, data);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PaymentInfo.prototype, "contractId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PaymentInfo.prototype, "idNumber", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", TradersInfo)
], PaymentInfo.prototype, "traders", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], PaymentInfo.prototype, "expiresAt", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], PaymentInfo.prototype, "totalAmount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", PaymentAmountDetails)
], PaymentInfo.prototype, "amountDetails", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", PartialAmountDetails)
], PaymentInfo.prototype, "acceptPartialAmount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PaymentInfo.prototype, "barcode", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PaymentInfo.prototype, "digitableLine", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], PaymentInfo.prototype, "paymentDeadline", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], PaymentInfo.prototype, "validDate", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], PaymentInfo.prototype, "nextBusinessDay", void 0);
exports.PaymentInfo = PaymentInfo;
class BoletoValidateResponse {
    constructor(data) {
        this.paid = undefined;
        this.boletoInfo = undefined;
        this.paymentInfo = undefined;
        Object.assign(this, data);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], BoletoValidateResponse.prototype, "paid", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", BoletoInfo)
], BoletoValidateResponse.prototype, "boletoInfo", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", PaymentInfo)
], BoletoValidateResponse.prototype, "paymentInfo", void 0);
exports.BoletoValidateResponse = BoletoValidateResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZXRvVmFsaWRhdGVSZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQm9sZXRvL0JvbGV0b1ZhbGlkYXRlUmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyRUFBbUU7QUFVbkU7SUFPRSxZQUFZLElBQStCO1FBTjdCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBQ2hDLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFDM0IsY0FBUyxHQUFTLFNBQVMsQ0FBQztRQUM1QixzQkFBaUIsR0FBWSxTQUFTLENBQUM7UUFDdkMsa0JBQWEsR0FBVyxTQUFTLENBQUM7UUFHOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBVGU7SUFBYiw0QkFBVSxFQUFFOzsrQ0FBaUM7QUFDaEM7SUFBYiw0QkFBVSxFQUFFOzswQ0FBNEI7QUFDM0I7SUFBYiw0QkFBVSxFQUFFOzhCQUFZLElBQUk7NkNBQWE7QUFDNUI7SUFBYiw0QkFBVSxFQUFFOztxREFBd0M7QUFDdkM7SUFBYiw0QkFBVSxFQUFFOztpREFBbUM7QUFMbEQsZ0NBVUM7QUFTRDtJQU1FLFlBQVksSUFBZ0M7UUFMOUIsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUM5QixzQkFBaUIsR0FBVyxTQUFTLENBQUM7UUFDdEMsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUM5QixrQkFBYSxHQUFXLFNBQVMsQ0FBQztRQUc5QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFSZTtJQUFiLDRCQUFVLEVBQUU7OzhDQUErQjtBQUM5QjtJQUFiLDRCQUFVLEVBQUU7O3NEQUF1QztBQUN0QztJQUFiLDRCQUFVLEVBQUU7OzhDQUErQjtBQUM5QjtJQUFiLDRCQUFVLEVBQUU7O2tEQUFtQztBQUpsRCxrQ0FTQztBQU9EO0lBSUUsWUFBWSxJQUF5QztRQUh2QyxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBQ3pCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBRzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQU5lO0lBQWIsNEJBQVUsRUFBRTs7a0RBQTBCO0FBQ3pCO0lBQWIsNEJBQVUsRUFBRTs7eURBQWlDO0FBRmhELG9EQU9DO0FBV0Q7SUFRRSxZQUFZLElBQXlDO1FBUHZDLG1CQUFjLEdBQVcsU0FBUyxDQUFDO1FBQ25DLGFBQVEsR0FBVyxTQUFTLENBQUM7UUFDN0IsZUFBVSxHQUFXLFNBQVMsQ0FBQztRQUMvQixnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUNoQyx5QkFBb0IsR0FBVyxTQUFTLENBQUM7UUFDekMsb0JBQWUsR0FBUyxTQUFTLENBQUM7UUFHOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBVmU7SUFBYiw0QkFBVSxFQUFFOzs0REFBb0M7QUFDbkM7SUFBYiw0QkFBVSxFQUFFOztzREFBOEI7QUFDN0I7SUFBYiw0QkFBVSxFQUFFOzt3REFBZ0M7QUFDL0I7SUFBYiw0QkFBVSxFQUFFOzt5REFBaUM7QUFDaEM7SUFBYiw0QkFBVSxFQUFFOztrRUFBMEM7QUFDekM7SUFBYiw0QkFBVSxFQUFFOzhCQUFrQixJQUFJOzZEQUFhO0FBTmxELG9EQVdDO0FBaUJEO0lBY0UsWUFBWSxJQUFnQztRQWI5QixlQUFVLEdBQVcsU0FBUyxDQUFDO1FBQy9CLGFBQVEsR0FBVyxTQUFTLENBQUM7UUFDN0IsWUFBTyxHQUFnQixTQUFTLENBQUM7UUFDakMsY0FBUyxHQUFTLFNBQVMsQ0FBQztRQUM1QixnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUNoQyxrQkFBYSxHQUF5QixTQUFTLENBQUM7UUFDaEQsd0JBQW1CLEdBQXlCLFNBQVMsQ0FBQztRQUN0RCxZQUFPLEdBQVcsU0FBUyxDQUFDO1FBQzVCLGtCQUFhLEdBQVcsU0FBUyxDQUFDO1FBQ2xDLG9CQUFlLEdBQVMsU0FBUyxDQUFDO1FBQ2xDLGNBQVMsR0FBWSxTQUFTLENBQUM7UUFDL0Isb0JBQWUsR0FBVyxTQUFTLENBQUM7UUFHaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBaEJlO0lBQWIsNEJBQVUsRUFBRTs7K0NBQWdDO0FBQy9CO0lBQWIsNEJBQVUsRUFBRTs7NkNBQThCO0FBQzdCO0lBQWIsNEJBQVUsRUFBRTs4QkFBVSxXQUFXOzRDQUFhO0FBQ2pDO0lBQWIsNEJBQVUsRUFBRTs4QkFBWSxJQUFJOzhDQUFhO0FBQzVCO0lBQWIsNEJBQVUsRUFBRTs7Z0RBQWlDO0FBQ2hDO0lBQWIsNEJBQVUsRUFBRTs4QkFBZ0Isb0JBQW9CO2tEQUFhO0FBQ2hEO0lBQWIsNEJBQVUsRUFBRTs4QkFBc0Isb0JBQW9CO3dEQUFhO0FBQ3REO0lBQWIsNEJBQVUsRUFBRTs7NENBQTZCO0FBQzVCO0lBQWIsNEJBQVUsRUFBRTs7a0RBQW1DO0FBQ2xDO0lBQWIsNEJBQVUsRUFBRTs4QkFBa0IsSUFBSTtvREFBYTtBQUNsQztJQUFiLDRCQUFVLEVBQUU7OzhDQUFnQztBQUMvQjtJQUFiLDRCQUFVLEVBQUU7O29EQUFxQztBQVpwRCxrQ0FpQkM7QUFRRDtJQUtFLFlBQVksSUFBMkM7UUFKekMsU0FBSSxHQUFZLFNBQVMsQ0FBQztRQUMxQixlQUFVLEdBQWUsU0FBUyxDQUFDO1FBQ25DLGdCQUFXLEdBQWdCLFNBQVMsQ0FBQztRQUdqRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFQZTtJQUFiLDRCQUFVLEVBQUU7O29EQUEyQjtBQUMxQjtJQUFiLDRCQUFVLEVBQUU7OEJBQWEsVUFBVTswREFBYTtBQUNuQztJQUFiLDRCQUFVLEVBQUU7OEJBQWMsV0FBVzsyREFBYTtBQUhyRCx3REFRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElzTm90RW1wdHkgfSBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NsYXNzLXZhbGlkYXRvclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCb2xldG9JbmZvU2NoZW1hIHtcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGFtb3VudDogbnVtYmVyO1xyXG4gIGV4cGlyZXNBdDogRGF0ZTtcclxuICBoYXNFeHBpcmF0aW9uRGF0ZTogYm9vbGVhbjtcclxuICBiYXJjb2RlTnVtYmVyOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCb2xldG9JbmZvIGltcGxlbWVudHMgQm9sZXRvSW5mb1NjaGVtYSB7XHJcbiAgQElzTm90RW1wdHkoKSBkZXNjcmlwdGlvbjogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYW1vdW50OiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBleHBpcmVzQXQ6IERhdGUgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBoYXNFeHBpcmF0aW9uRGF0ZTogYm9vbGVhbiA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGJhcmNvZGVOdW1iZXI6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxCb2xldG9JbmZvU2NoZW1hPikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHJhZGVyc0luZm9TY2hlbWEge1xyXG4gIHJlY2lwaWVudDogc3RyaW5nO1xyXG4gIHJlY2lwaWVudERvY3VtZW50OiBzdHJpbmc7XHJcbiAgcGF5ZXJOYW1lOiBzdHJpbmc7XHJcbiAgcGF5ZXJEb2N1bWVudDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhZGVyc0luZm8gaW1wbGVtZW50cyBUcmFkZXJzSW5mb1NjaGVtYSB7XHJcbiAgQElzTm90RW1wdHkoKSByZWNpcGllbnQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHJlY2lwaWVudERvY3VtZW50OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBwYXllck5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHBheWVyRG9jdW1lbnQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxUcmFkZXJzSW5mb1NjaGVtYT4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBhcnRpYWxBbW91bnREZXRhaWxzU2NoZW1hIHtcclxuICBjb2RlOiBudW1iZXI7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnRpYWxBbW91bnREZXRhaWxzIGltcGxlbWVudHMgUGFydGlhbEFtb3VudERldGFpbHNTY2hlbWEge1xyXG4gIEBJc05vdEVtcHR5KCkgY29kZTogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgZGVzY3JpcHRpb246IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxQYXJ0aWFsQW1vdW50RGV0YWlsc1NjaGVtYT4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBheW1lbnRBbW91bnREZXRhaWxzU2NoZW1hIHtcclxuICBpbnRlcmVzdEFtb3VudDogbnVtYmVyO1xyXG4gIGRpc2NvdW50OiBudW1iZXI7XHJcbiAgZmluZUFtb3VudDogbnVtYmVyO1xyXG4gIHRvdGFsQW1vdW50OiBudW1iZXI7XHJcbiAgcGF5bWVudEFtb3VudFVwZGF0ZWQ6IG51bWJlcjtcclxuICBjYWxjdWxhdGlvbkRhdGU6IERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXltZW50QW1vdW50RGV0YWlscyBpbXBsZW1lbnRzIFBheW1lbnRBbW91bnREZXRhaWxzU2NoZW1hIHtcclxuICBASXNOb3RFbXB0eSgpIGludGVyZXN0QW1vdW50OiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBkaXNjb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgZmluZUFtb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgdG90YWxBbW91bnQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHBheW1lbnRBbW91bnRVcGRhdGVkOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBjYWxjdWxhdGlvbkRhdGU6IERhdGUgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8UGF5bWVudEFtb3VudERldGFpbHNTY2hlbWE+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXltZW50SW5mb1NjaGVtYSB7XHJcbiAgY29udHJhY3RJZDogc3RyaW5nO1xyXG4gIGlkTnVtYmVyOiBzdHJpbmc7XHJcbiAgdHJhZGVyczogVHJhZGVyc0luZm87XHJcbiAgZXhwaXJlc0F0OiBEYXRlO1xyXG4gIHRvdGFsQW1vdW50OiBudW1iZXI7XHJcbiAgYW1vdW50RGV0YWlsczogUGF5bWVudEFtb3VudERldGFpbHM7XHJcbiAgYWNjZXB0UGFydGlhbEFtb3VudDogUGFydGlhbEFtb3VudERldGFpbHM7XHJcbiAgYmFyY29kZTogc3RyaW5nO1xyXG4gIGRpZ2l0YWJsZUxpbmU6IHN0cmluZztcclxuICBwYXltZW50RGVhZGxpbmU6IERhdGU7XHJcbiAgdmFsaWREYXRlOiBib29sZWFuO1xyXG4gIG5leHRCdXNpbmVzc0RheTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGF5bWVudEluZm8gaW1wbGVtZW50cyBQYXltZW50SW5mb1NjaGVtYSB7XHJcbiAgQElzTm90RW1wdHkoKSBjb250cmFjdElkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBpZE51bWJlcjogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgdHJhZGVyczogVHJhZGVyc0luZm8gPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBleHBpcmVzQXQ6IERhdGUgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSB0b3RhbEFtb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYW1vdW50RGV0YWlsczogUGF5bWVudEFtb3VudERldGFpbHMgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBhY2NlcHRQYXJ0aWFsQW1vdW50OiBQYXJ0aWFsQW1vdW50RGV0YWlscyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGJhcmNvZGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGRpZ2l0YWJsZUxpbmU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHBheW1lbnREZWFkbGluZTogRGF0ZSA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHZhbGlkRGF0ZTogYm9vbGVhbiA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIG5leHRCdXNpbmVzc0RheTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPFBheW1lbnRJbmZvU2NoZW1hPikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQm9sZXRvVmFsaWRhdGVSZXNwb25zZVNjaGVtYSB7XHJcbiAgcGFpZDogYm9vbGVhbjtcclxuICBib2xldG9JbmZvOiBCb2xldG9JbmZvO1xyXG4gIHBheW1lbnRJbmZvOiBQYXltZW50SW5mbztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJvbGV0b1ZhbGlkYXRlUmVzcG9uc2UgaW1wbGVtZW50cyBCb2xldG9WYWxpZGF0ZVJlc3BvbnNlU2NoZW1hIHtcclxuICBASXNOb3RFbXB0eSgpIHBhaWQ6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBib2xldG9JbmZvOiBCb2xldG9JbmZvID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgcGF5bWVudEluZm86IFBheW1lbnRJbmZvID0gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPEJvbGV0b1ZhbGlkYXRlUmVzcG9uc2VTY2hlbWE+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxufVxyXG4iXX0=