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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZXRvVmFsaWRhdGVSZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQm9sZXRvL0JvbGV0b1ZhbGlkYXRlUmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyRUFBbUU7QUFRbkU7SUFLRSxZQUFZLElBQTJDO1FBSnpDLFNBQUksR0FBWSxTQUFTLENBQUM7UUFDMUIsZUFBVSxHQUFlLFNBQVMsQ0FBQztRQUNuQyxnQkFBVyxHQUFnQixTQUFTLENBQUM7UUFHakQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBUGU7SUFBYiw0QkFBVSxFQUFFOztvREFBMkI7QUFDMUI7SUFBYiw0QkFBVSxFQUFFOzhCQUFhLFVBQVU7MERBQWE7QUFDbkM7SUFBYiw0QkFBVSxFQUFFOzhCQUFjLFdBQVc7MkRBQWE7QUFIckQsd0RBUUM7QUFVRDtJQU9FLFlBQVksSUFBK0I7UUFON0IsZ0JBQVcsR0FBVyxTQUFTLENBQUM7UUFDaEMsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixjQUFTLEdBQVMsU0FBUyxDQUFDO1FBQzVCLHNCQUFpQixHQUFZLFNBQVMsQ0FBQztRQUN2QyxrQkFBYSxHQUFXLFNBQVMsQ0FBQztRQUc5QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFUZTtJQUFiLDRCQUFVLEVBQUU7OytDQUFpQztBQUNoQztJQUFiLDRCQUFVLEVBQUU7OzBDQUE0QjtBQUMzQjtJQUFiLDRCQUFVLEVBQUU7OEJBQVksSUFBSTs2Q0FBYTtBQUM1QjtJQUFiLDRCQUFVLEVBQUU7O3FEQUF3QztBQUN2QztJQUFiLDRCQUFVLEVBQUU7O2lEQUFtQztBQUxsRCxnQ0FVQztBQWlCRDtJQWNFLFlBQVksSUFBZ0M7UUFiOUIsZUFBVSxHQUFXLFNBQVMsQ0FBQztRQUMvQixhQUFRLEdBQVcsU0FBUyxDQUFDO1FBQzdCLFlBQU8sR0FBZ0IsU0FBUyxDQUFDO1FBQ2pDLGNBQVMsR0FBUyxTQUFTLENBQUM7UUFDNUIsZ0JBQVcsR0FBVyxTQUFTLENBQUM7UUFDaEMsa0JBQWEsR0FBeUIsU0FBUyxDQUFDO1FBQ2hELHdCQUFtQixHQUF5QixTQUFTLENBQUM7UUFDdEQsWUFBTyxHQUFXLFNBQVMsQ0FBQztRQUM1QixrQkFBYSxHQUFXLFNBQVMsQ0FBQztRQUNsQyxvQkFBZSxHQUFTLFNBQVMsQ0FBQztRQUNsQyxjQUFTLEdBQVksU0FBUyxDQUFDO1FBQy9CLG9CQUFlLEdBQVcsU0FBUyxDQUFDO1FBR2hELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQWhCZTtJQUFiLDRCQUFVLEVBQUU7OytDQUFnQztBQUMvQjtJQUFiLDRCQUFVLEVBQUU7OzZDQUE4QjtBQUM3QjtJQUFiLDRCQUFVLEVBQUU7OEJBQVUsV0FBVzs0Q0FBYTtBQUNqQztJQUFiLDRCQUFVLEVBQUU7OEJBQVksSUFBSTs4Q0FBYTtBQUM1QjtJQUFiLDRCQUFVLEVBQUU7O2dEQUFpQztBQUNoQztJQUFiLDRCQUFVLEVBQUU7OEJBQWdCLG9CQUFvQjtrREFBYTtBQUNoRDtJQUFiLDRCQUFVLEVBQUU7OEJBQXNCLG9CQUFvQjt3REFBYTtBQUN0RDtJQUFiLDRCQUFVLEVBQUU7OzRDQUE2QjtBQUM1QjtJQUFiLDRCQUFVLEVBQUU7O2tEQUFtQztBQUNsQztJQUFiLDRCQUFVLEVBQUU7OEJBQWtCLElBQUk7b0RBQWE7QUFDbEM7SUFBYiw0QkFBVSxFQUFFOzs4Q0FBZ0M7QUFDL0I7SUFBYiw0QkFBVSxFQUFFOztvREFBcUM7QUFacEQsa0NBaUJDO0FBU0Q7SUFNRSxZQUFZLElBQWdDO1FBTDlCLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFDOUIsc0JBQWlCLEdBQVcsU0FBUyxDQUFDO1FBQ3RDLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFDOUIsa0JBQWEsR0FBVyxTQUFTLENBQUM7UUFHOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBUmU7SUFBYiw0QkFBVSxFQUFFOzs4Q0FBK0I7QUFDOUI7SUFBYiw0QkFBVSxFQUFFOztzREFBdUM7QUFDdEM7SUFBYiw0QkFBVSxFQUFFOzs4Q0FBK0I7QUFDOUI7SUFBYiw0QkFBVSxFQUFFOztrREFBbUM7QUFKbEQsa0NBU0M7QUFPRDtJQUlFLFlBQVksSUFBeUM7UUFIdkMsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUN6QixnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUc1QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFOZTtJQUFiLDRCQUFVLEVBQUU7O2tEQUEwQjtBQUN6QjtJQUFiLDRCQUFVLEVBQUU7O3lEQUFpQztBQUZoRCxvREFPQztBQVdEO0lBUUUsWUFBWSxJQUF5QztRQVB2QyxtQkFBYyxHQUFXLFNBQVMsQ0FBQztRQUNuQyxhQUFRLEdBQVcsU0FBUyxDQUFDO1FBQzdCLGVBQVUsR0FBVyxTQUFTLENBQUM7UUFDL0IsZ0JBQVcsR0FBVyxTQUFTLENBQUM7UUFDaEMseUJBQW9CLEdBQVcsU0FBUyxDQUFDO1FBQ3pDLG9CQUFlLEdBQVMsU0FBUyxDQUFDO1FBRzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQVZlO0lBQWIsNEJBQVUsRUFBRTs7NERBQW9DO0FBQ25DO0lBQWIsNEJBQVUsRUFBRTs7c0RBQThCO0FBQzdCO0lBQWIsNEJBQVUsRUFBRTs7d0RBQWdDO0FBQy9CO0lBQWIsNEJBQVUsRUFBRTs7eURBQWlDO0FBQ2hDO0lBQWIsNEJBQVUsRUFBRTs7a0VBQTBDO0FBQ3pDO0lBQWIsNEJBQVUsRUFBRTs4QkFBa0IsSUFBSTs2REFBYTtBQU5sRCxvREFXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElzTm90RW1wdHkgfSBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NsYXNzLXZhbGlkYXRvclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCb2xldG9WYWxpZGF0ZVJlc3BvbnNlU2NoZW1hIHtcclxuICBwYWlkOiBib29sZWFuO1xyXG4gIGJvbGV0b0luZm86IEJvbGV0b0luZm87XHJcbiAgcGF5bWVudEluZm86IFBheW1lbnRJbmZvO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQm9sZXRvVmFsaWRhdGVSZXNwb25zZSBpbXBsZW1lbnRzIEJvbGV0b1ZhbGlkYXRlUmVzcG9uc2VTY2hlbWEge1xyXG4gIEBJc05vdEVtcHR5KCkgcGFpZDogYm9vbGVhbiA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGJvbGV0b0luZm86IEJvbGV0b0luZm8gPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBwYXltZW50SW5mbzogUGF5bWVudEluZm8gPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8Qm9sZXRvVmFsaWRhdGVSZXNwb25zZVNjaGVtYT4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJvbGV0b0luZm9TY2hlbWEge1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgYW1vdW50OiBudW1iZXI7XHJcbiAgZXhwaXJlc0F0OiBEYXRlO1xyXG4gIGhhc0V4cGlyYXRpb25EYXRlOiBib29sZWFuO1xyXG4gIGJhcmNvZGVOdW1iZXI6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJvbGV0b0luZm8gaW1wbGVtZW50cyBCb2xldG9JbmZvU2NoZW1hIHtcclxuICBASXNOb3RFbXB0eSgpIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBhbW91bnQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGV4cGlyZXNBdDogRGF0ZSA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGhhc0V4cGlyYXRpb25EYXRlOiBib29sZWFuID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYmFyY29kZU51bWJlcjogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPEJvbGV0b0luZm9TY2hlbWE+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXltZW50SW5mb1NjaGVtYSB7XHJcbiAgY29udHJhY3RJZDogc3RyaW5nO1xyXG4gIGlkTnVtYmVyOiBzdHJpbmc7XHJcbiAgdHJhZGVyczogVHJhZGVyc0luZm87XHJcbiAgZXhwaXJlc0F0OiBEYXRlO1xyXG4gIHRvdGFsQW1vdW50OiBudW1iZXI7XHJcbiAgYW1vdW50RGV0YWlsczogUGF5bWVudEFtb3VudERldGFpbHM7XHJcbiAgYWNjZXB0UGFydGlhbEFtb3VudDogUGFydGlhbEFtb3VudERldGFpbHM7XHJcbiAgYmFyY29kZTogc3RyaW5nO1xyXG4gIGRpZ2l0YWJsZUxpbmU6IHN0cmluZztcclxuICBwYXltZW50RGVhZGxpbmU6IERhdGU7XHJcbiAgdmFsaWREYXRlOiBib29sZWFuO1xyXG4gIG5leHRCdXNpbmVzc0RheTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGF5bWVudEluZm8gaW1wbGVtZW50cyBQYXltZW50SW5mb1NjaGVtYSB7XHJcbiAgQElzTm90RW1wdHkoKSBjb250cmFjdElkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBpZE51bWJlcjogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgdHJhZGVyczogVHJhZGVyc0luZm8gPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBleHBpcmVzQXQ6IERhdGUgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSB0b3RhbEFtb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYW1vdW50RGV0YWlsczogUGF5bWVudEFtb3VudERldGFpbHMgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBhY2NlcHRQYXJ0aWFsQW1vdW50OiBQYXJ0aWFsQW1vdW50RGV0YWlscyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGJhcmNvZGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGRpZ2l0YWJsZUxpbmU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHBheW1lbnREZWFkbGluZTogRGF0ZSA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHZhbGlkRGF0ZTogYm9vbGVhbiA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIG5leHRCdXNpbmVzc0RheTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPFBheW1lbnRJbmZvU2NoZW1hPikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHJhZGVyc0luZm9TY2hlbWEge1xyXG4gIHJlY2lwaWVudDogc3RyaW5nO1xyXG4gIHJlY2lwaWVudERvY3VtZW50OiBzdHJpbmc7XHJcbiAgcGF5ZXJOYW1lOiBzdHJpbmc7XHJcbiAgcGF5ZXJEb2N1bWVudDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhZGVyc0luZm8gaW1wbGVtZW50cyBUcmFkZXJzSW5mb1NjaGVtYSB7XHJcbiAgQElzTm90RW1wdHkoKSByZWNpcGllbnQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHJlY2lwaWVudERvY3VtZW50OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBwYXllck5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHBheWVyRG9jdW1lbnQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxUcmFkZXJzSW5mb1NjaGVtYT4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBhcnRpYWxBbW91bnREZXRhaWxzU2NoZW1hIHtcclxuICBjb2RlOiBudW1iZXI7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnRpYWxBbW91bnREZXRhaWxzIGltcGxlbWVudHMgUGFydGlhbEFtb3VudERldGFpbHNTY2hlbWEge1xyXG4gIEBJc05vdEVtcHR5KCkgY29kZTogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgZGVzY3JpcHRpb246IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxQYXJ0aWFsQW1vdW50RGV0YWlsc1NjaGVtYT4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBheW1lbnRBbW91bnREZXRhaWxzU2NoZW1hIHtcclxuICBpbnRlcmVzdEFtb3VudDogbnVtYmVyO1xyXG4gIGRpc2NvdW50OiBudW1iZXI7XHJcbiAgZmluZUFtb3VudDogbnVtYmVyO1xyXG4gIHRvdGFsQW1vdW50OiBudW1iZXI7XHJcbiAgcGF5bWVudEFtb3VudFVwZGF0ZWQ6IG51bWJlcjtcclxuICBjYWxjdWxhdGlvbkRhdGU6IERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXltZW50QW1vdW50RGV0YWlscyBpbXBsZW1lbnRzIFBheW1lbnRBbW91bnREZXRhaWxzU2NoZW1hIHtcclxuICBASXNOb3RFbXB0eSgpIGludGVyZXN0QW1vdW50OiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBkaXNjb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgZmluZUFtb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgdG90YWxBbW91bnQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHBheW1lbnRBbW91bnRVcGRhdGVkOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBjYWxjdWxhdGlvbkRhdGU6IERhdGUgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8UGF5bWVudEFtb3VudERldGFpbHNTY2hlbWE+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH0gXHJcbn1cclxuIl19