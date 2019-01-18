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
const class_validator_1 = require("class-validator");
const BaseModel_1 = require("../Base/BaseModel");
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
class BoletoValidateResponse extends BaseModel_1.default {
    constructor(data) {
        super(data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZXRvVmFsaWRhdGVSZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQm9sZXRvL0JvbGV0b1ZhbGlkYXRlUmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxxREFBNkM7QUFDN0MsaURBQStEO0FBVS9EO0lBT0UsWUFBWSxJQUErQjtRQU43QixnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUNoQyxXQUFNLEdBQVcsU0FBUyxDQUFDO1FBQzNCLGNBQVMsR0FBUyxTQUFTLENBQUM7UUFDNUIsc0JBQWlCLEdBQVksU0FBUyxDQUFDO1FBQ3ZDLGtCQUFhLEdBQVcsU0FBUyxDQUFDO1FBRzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQVRlO0lBQWIsNEJBQVUsRUFBRTs7K0NBQWlDO0FBQ2hDO0lBQWIsNEJBQVUsRUFBRTs7MENBQTRCO0FBQzNCO0lBQWIsNEJBQVUsRUFBRTs4QkFBWSxJQUFJOzZDQUFhO0FBQzVCO0lBQWIsNEJBQVUsRUFBRTs7cURBQXdDO0FBQ3ZDO0lBQWIsNEJBQVUsRUFBRTs7aURBQW1DO0FBTGxELGdDQVVDO0FBU0Q7SUFNRSxZQUFZLElBQWdDO1FBTDlCLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFDOUIsc0JBQWlCLEdBQVcsU0FBUyxDQUFDO1FBQ3RDLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFDOUIsa0JBQWEsR0FBVyxTQUFTLENBQUM7UUFHOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBUmU7SUFBYiw0QkFBVSxFQUFFOzs4Q0FBK0I7QUFDOUI7SUFBYiw0QkFBVSxFQUFFOztzREFBdUM7QUFDdEM7SUFBYiw0QkFBVSxFQUFFOzs4Q0FBK0I7QUFDOUI7SUFBYiw0QkFBVSxFQUFFOztrREFBbUM7QUFK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QWIsNEJBQVUsRUFBRTs4QkFBYyxXQUFXOzJEQUFhO0FBSHJELHdEQVNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSXNOb3RFbXB0eSB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcclxuaW1wb3J0IEJhc2VNb2RlbCwgeyBCYXNlTW9kZWxTY2hlbWEgfSBmcm9tIFwiLi4vQmFzZS9CYXNlTW9kZWxcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQm9sZXRvSW5mb1NjaGVtYSB7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBhbW91bnQ6IG51bWJlcjtcclxuICBleHBpcmVzQXQ6IERhdGU7XHJcbiAgaGFzRXhwaXJhdGlvbkRhdGU6IGJvb2xlYW47XHJcbiAgYmFyY29kZU51bWJlcjogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQm9sZXRvSW5mbyBpbXBsZW1lbnRzIEJvbGV0b0luZm9TY2hlbWEge1xyXG4gIEBJc05vdEVtcHR5KCkgZGVzY3JpcHRpb246IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGFtb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgZXhwaXJlc0F0OiBEYXRlID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgaGFzRXhwaXJhdGlvbkRhdGU6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBiYXJjb2RlTnVtYmVyOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8Qm9sZXRvSW5mb1NjaGVtYT4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRyYWRlcnNJbmZvU2NoZW1hIHtcclxuICByZWNpcGllbnQ6IHN0cmluZztcclxuICByZWNpcGllbnREb2N1bWVudDogc3RyaW5nO1xyXG4gIHBheWVyTmFtZTogc3RyaW5nO1xyXG4gIHBheWVyRG9jdW1lbnQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRyYWRlcnNJbmZvIGltcGxlbWVudHMgVHJhZGVyc0luZm9TY2hlbWEge1xyXG4gIEBJc05vdEVtcHR5KCkgcmVjaXBpZW50OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSByZWNpcGllbnREb2N1bWVudDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgcGF5ZXJOYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBwYXllckRvY3VtZW50OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8VHJhZGVyc0luZm9TY2hlbWE+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXJ0aWFsQW1vdW50RGV0YWlsc1NjaGVtYSB7XHJcbiAgY29kZTogbnVtYmVyO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJ0aWFsQW1vdW50RGV0YWlscyBpbXBsZW1lbnRzIFBhcnRpYWxBbW91bnREZXRhaWxzU2NoZW1hIHtcclxuICBASXNOb3RFbXB0eSgpIGNvZGU6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8UGFydGlhbEFtb3VudERldGFpbHNTY2hlbWE+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXltZW50QW1vdW50RGV0YWlsc1NjaGVtYSB7XHJcbiAgaW50ZXJlc3RBbW91bnQ6IG51bWJlcjtcclxuICBkaXNjb3VudDogbnVtYmVyO1xyXG4gIGZpbmVBbW91bnQ6IG51bWJlcjtcclxuICB0b3RhbEFtb3VudDogbnVtYmVyO1xyXG4gIHBheW1lbnRBbW91bnRVcGRhdGVkOiBudW1iZXI7XHJcbiAgY2FsY3VsYXRpb25EYXRlOiBEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGF5bWVudEFtb3VudERldGFpbHMgaW1wbGVtZW50cyBQYXltZW50QW1vdW50RGV0YWlsc1NjaGVtYSB7XHJcbiAgQElzTm90RW1wdHkoKSBpbnRlcmVzdEFtb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgZGlzY291bnQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGZpbmVBbW91bnQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHRvdGFsQW1vdW50OiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBwYXltZW50QW1vdW50VXBkYXRlZDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgY2FsY3VsYXRpb25EYXRlOiBEYXRlID0gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPFBheW1lbnRBbW91bnREZXRhaWxzU2NoZW1hPikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGF5bWVudEluZm9TY2hlbWEge1xyXG4gIGNvbnRyYWN0SWQ6IHN0cmluZztcclxuICBpZE51bWJlcjogc3RyaW5nO1xyXG4gIHRyYWRlcnM6IFRyYWRlcnNJbmZvO1xyXG4gIGV4cGlyZXNBdDogRGF0ZTtcclxuICB0b3RhbEFtb3VudDogbnVtYmVyO1xyXG4gIGFtb3VudERldGFpbHM6IFBheW1lbnRBbW91bnREZXRhaWxzO1xyXG4gIGFjY2VwdFBhcnRpYWxBbW91bnQ6IFBhcnRpYWxBbW91bnREZXRhaWxzO1xyXG4gIGJhcmNvZGU6IHN0cmluZztcclxuICBkaWdpdGFibGVMaW5lOiBzdHJpbmc7XHJcbiAgcGF5bWVudERlYWRsaW5lOiBEYXRlO1xyXG4gIHZhbGlkRGF0ZTogYm9vbGVhbjtcclxuICBuZXh0QnVzaW5lc3NEYXk6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBheW1lbnRJbmZvIGltcGxlbWVudHMgUGF5bWVudEluZm9TY2hlbWEge1xyXG4gIEBJc05vdEVtcHR5KCkgY29udHJhY3RJZDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgaWROdW1iZXI6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHRyYWRlcnM6IFRyYWRlcnNJbmZvID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgZXhwaXJlc0F0OiBEYXRlID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgdG90YWxBbW91bnQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGFtb3VudERldGFpbHM6IFBheW1lbnRBbW91bnREZXRhaWxzID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYWNjZXB0UGFydGlhbEFtb3VudDogUGFydGlhbEFtb3VudERldGFpbHMgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBiYXJjb2RlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBkaWdpdGFibGVMaW5lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBwYXltZW50RGVhZGxpbmU6IERhdGUgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSB2YWxpZERhdGU6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBuZXh0QnVzaW5lc3NEYXk6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxQYXltZW50SW5mb1NjaGVtYT4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJvbGV0b1ZhbGlkYXRlUmVzcG9uc2VTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEgIHtcclxuICBwYWlkOiBib29sZWFuO1xyXG4gIGJvbGV0b0luZm86IEJvbGV0b0luZm87XHJcbiAgcGF5bWVudEluZm86IFBheW1lbnRJbmZvO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQm9sZXRvVmFsaWRhdGVSZXNwb25zZSBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIEJvbGV0b1ZhbGlkYXRlUmVzcG9uc2VTY2hlbWEge1xyXG4gIEBJc05vdEVtcHR5KCkgcGFpZDogYm9vbGVhbiA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGJvbGV0b0luZm86IEJvbGV0b0luZm8gPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBwYXltZW50SW5mbzogUGF5bWVudEluZm8gPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8Qm9sZXRvVmFsaWRhdGVSZXNwb25zZVNjaGVtYT4pIHtcclxuICAgIHN1cGVyKGRhdGEpO1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcbn1cclxuIl19