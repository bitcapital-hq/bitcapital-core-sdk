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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
    /**
     * Returns true if the model is valid or an array of validation errors if invalid
     *
     * @param {boolean} [toString] If toString is true, this will return a formatted error string
     */
    isValid(toString) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield class_validator_1.validate(this);
            if (errors.length === 0) {
                return true;
            }
            if (toString) {
                return errors.map(error => error.toString(true)).join("; ");
            }
            return errors;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZXRvVmFsaWRhdGVSZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQm9sZXRvL0JvbGV0b1ZhbGlkYXRlUmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJFQUE4RjtBQVU5RjtJQU9FLFlBQVksSUFBK0I7UUFON0IsZ0JBQVcsR0FBVyxTQUFTLENBQUM7UUFDaEMsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixjQUFTLEdBQVMsU0FBUyxDQUFDO1FBQzVCLHNCQUFpQixHQUFZLFNBQVMsQ0FBQztRQUN2QyxrQkFBYSxHQUFXLFNBQVMsQ0FBQztRQUc5QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFUZTtJQUFiLDRCQUFVLEVBQUU7OytDQUFpQztBQUNoQztJQUFiLDRCQUFVLEVBQUU7OzBDQUE0QjtBQUMzQjtJQUFiLDRCQUFVLEVBQUU7OEJBQVksSUFBSTs2Q0FBYTtBQUM1QjtJQUFiLDRCQUFVLEVBQUU7O3FEQUF3QztBQUN2QztJQUFiLDRCQUFVLEVBQUU7O2lEQUFtQztBQUxsRCxnQ0FVQztBQVNEO0lBTUUsWUFBWSxJQUFnQztRQUw5QixjQUFTLEdBQVcsU0FBUyxDQUFDO1FBQzlCLHNCQUFpQixHQUFXLFNBQVMsQ0FBQztRQUN0QyxjQUFTLEdBQVcsU0FBUyxDQUFDO1FBQzlCLGtCQUFhLEdBQVcsU0FBUyxDQUFDO1FBRzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQVJlO0lBQWIsNEJBQVUsRUFBRTs7OENBQStCO0FBQzlCO0lBQWIsNEJBQVUsRUFBRTs7c0RBQXVDO0FBQ3RDO0lBQWIsNEJBQVUsRUFBRTs7OENBQStCO0FBQzlCO0lBQWIsNEJBQVUsRUFBRTs7a0RBQW1DO0FBSmxELGtDQVNDO0FBT0Q7SUFJRSxZQUFZLElBQXlDO1FBSHZDLFNBQUksR0FBVyxTQUFTLENBQUM7UUFDekIsZ0JBQVcsR0FBVyxTQUFTLENBQUM7UUFHNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBTmU7SUFBYiw0QkFBVSxFQUFFOztrREFBMEI7QUFDekI7SUFBYiw0QkFBVSxFQUFFOzt5REFBaUM7QUFGaEQsb0RBT0M7QUFXRDtJQVFFLFlBQVksSUFBeUM7UUFQdkMsbUJBQWMsR0FBVyxTQUFTLENBQUM7UUFDbkMsYUFBUSxHQUFXLFNBQVMsQ0FBQztRQUM3QixlQUFVLEdBQVcsU0FBUyxDQUFDO1FBQy9CLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBQ2hDLHlCQUFvQixHQUFXLFNBQVMsQ0FBQztRQUN6QyxvQkFBZSxHQUFTLFNBQVMsQ0FBQztRQUc5QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFWZTtJQUFiLDRCQUFVLEVBQUU7OzREQUFvQztBQUNuQztJQUFiLDRCQUFVLEVBQUU7O3NEQUE4QjtBQUM3QjtJQUFiLDRCQUFVLEVBQUU7O3dEQUFnQztBQUMvQjtJQUFiLDRCQUFVLEVBQUU7O3lEQUFpQztBQUNoQztJQUFiLDRCQUFVLEVBQUU7O2tFQUEwQztBQUN6QztJQUFiLDRCQUFVLEVBQUU7OEJBQWtCLElBQUk7NkRBQWE7QUFObEQsb0RBV0M7QUFpQkQ7SUFjRSxZQUFZLElBQWdDO1FBYjlCLGVBQVUsR0FBVyxTQUFTLENBQUM7UUFDL0IsYUFBUSxHQUFXLFNBQVMsQ0FBQztRQUM3QixZQUFPLEdBQWdCLFNBQVMsQ0FBQztRQUNqQyxjQUFTLEdBQVMsU0FBUyxDQUFDO1FBQzVCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBQ2hDLGtCQUFhLEdBQXlCLFNBQVMsQ0FBQztRQUNoRCx3QkFBbUIsR0FBeUIsU0FBUyxDQUFDO1FBQ3RELFlBQU8sR0FBVyxTQUFTLENBQUM7UUFDNUIsa0JBQWEsR0FBVyxTQUFTLENBQUM7UUFDbEMsb0JBQWUsR0FBUyxTQUFTLENBQUM7UUFDbEMsY0FBUyxHQUFZLFNBQVMsQ0FBQztRQUMvQixvQkFBZSxHQUFXLFNBQVMsQ0FBQztRQUdoRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFoQmU7SUFBYiw0QkFBVSxFQUFFOzsrQ0FBZ0M7QUFDL0I7SUFBYiw0QkFBVSxFQUFFOzs2Q0FBOEI7QUFDN0I7SUFBYiw0QkFBVSxFQUFFOzhCQUFVLFdBQVc7NENBQWE7QUFDakM7SUFBYiw0QkFBVSxFQUFFOzhCQUFZLElBQUk7OENBQWE7QUFDNUI7SUFBYiw0QkFBVSxFQUFFOztnREFBaUM7QUFDaEM7SUFBYiw0QkFBVSxFQUFFOzhCQUFnQixvQkFBb0I7a0RBQWE7QUFDaEQ7SUFBYiw0QkFBVSxFQUFFOzhCQUFzQixvQkFBb0I7d0RBQWE7QUFDdEQ7SUFBYiw0QkFBVSxFQUFFOzs0Q0FBNkI7QUFDNUI7SUFBYiw0QkFBVSxFQUFFOztrREFBbUM7QUFDbEM7SUFBYiw0QkFBVSxFQUFFOzhCQUFrQixJQUFJO29EQUFhO0FBQ2xDO0lBQWIsNEJBQVUsRUFBRTs7OENBQWdDO0FBQy9CO0lBQWIsNEJBQVUsRUFBRTs7b0RBQXFDO0FBWnBELGtDQWlCQztBQVFEO0lBS0UsWUFBWSxJQUEyQztRQUp6QyxTQUFJLEdBQVksU0FBUyxDQUFDO1FBQzFCLGVBQVUsR0FBZSxTQUFTLENBQUM7UUFDbkMsZ0JBQVcsR0FBZ0IsU0FBUyxDQUFDO1FBR2pELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7OztPQUlHO0lBQ1UsT0FBTyxDQUFDLFFBQWtCOztZQUNyQyxNQUFNLE1BQU0sR0FBRyxNQUFNLDBCQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFcEMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDdkIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELElBQUksUUFBUSxFQUFFO2dCQUNaLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0Q7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO0tBQUE7Q0FDRjtBQTFCZTtJQUFiLDRCQUFVLEVBQUU7O29EQUEyQjtBQUMxQjtJQUFiLDRCQUFVLEVBQUU7OEJBQWEsVUFBVTswREFBYTtBQUNuQztJQUFiLDRCQUFVLEVBQUU7OEJBQWMsV0FBVzsyREFBYTtBQUhyRCx3REEyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJc05vdEVtcHR5LCB2YWxpZGF0ZSwgVmFsaWRhdGlvbkVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzcy12YWxpZGF0b3JcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQm9sZXRvSW5mb1NjaGVtYSB7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBhbW91bnQ6IG51bWJlcjtcclxuICBleHBpcmVzQXQ6IERhdGU7XHJcbiAgaGFzRXhwaXJhdGlvbkRhdGU6IGJvb2xlYW47XHJcbiAgYmFyY29kZU51bWJlcjogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQm9sZXRvSW5mbyBpbXBsZW1lbnRzIEJvbGV0b0luZm9TY2hlbWEge1xyXG4gIEBJc05vdEVtcHR5KCkgZGVzY3JpcHRpb246IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGFtb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgZXhwaXJlc0F0OiBEYXRlID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgaGFzRXhwaXJhdGlvbkRhdGU6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBiYXJjb2RlTnVtYmVyOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8Qm9sZXRvSW5mb1NjaGVtYT4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRyYWRlcnNJbmZvU2NoZW1hIHtcclxuICByZWNpcGllbnQ6IHN0cmluZztcclxuICByZWNpcGllbnREb2N1bWVudDogc3RyaW5nO1xyXG4gIHBheWVyTmFtZTogc3RyaW5nO1xyXG4gIHBheWVyRG9jdW1lbnQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRyYWRlcnNJbmZvIGltcGxlbWVudHMgVHJhZGVyc0luZm9TY2hlbWEge1xyXG4gIEBJc05vdEVtcHR5KCkgcmVjaXBpZW50OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSByZWNpcGllbnREb2N1bWVudDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgcGF5ZXJOYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBwYXllckRvY3VtZW50OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8VHJhZGVyc0luZm9TY2hlbWE+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXJ0aWFsQW1vdW50RGV0YWlsc1NjaGVtYSB7XHJcbiAgY29kZTogbnVtYmVyO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJ0aWFsQW1vdW50RGV0YWlscyBpbXBsZW1lbnRzIFBhcnRpYWxBbW91bnREZXRhaWxzU2NoZW1hIHtcclxuICBASXNOb3RFbXB0eSgpIGNvZGU6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8UGFydGlhbEFtb3VudERldGFpbHNTY2hlbWE+KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXltZW50QW1vdW50RGV0YWlsc1NjaGVtYSB7XHJcbiAgaW50ZXJlc3RBbW91bnQ6IG51bWJlcjtcclxuICBkaXNjb3VudDogbnVtYmVyO1xyXG4gIGZpbmVBbW91bnQ6IG51bWJlcjtcclxuICB0b3RhbEFtb3VudDogbnVtYmVyO1xyXG4gIHBheW1lbnRBbW91bnRVcGRhdGVkOiBudW1iZXI7XHJcbiAgY2FsY3VsYXRpb25EYXRlOiBEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGF5bWVudEFtb3VudERldGFpbHMgaW1wbGVtZW50cyBQYXltZW50QW1vdW50RGV0YWlsc1NjaGVtYSB7XHJcbiAgQElzTm90RW1wdHkoKSBpbnRlcmVzdEFtb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgZGlzY291bnQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGZpbmVBbW91bnQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHRvdGFsQW1vdW50OiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBwYXltZW50QW1vdW50VXBkYXRlZDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgY2FsY3VsYXRpb25EYXRlOiBEYXRlID0gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPFBheW1lbnRBbW91bnREZXRhaWxzU2NoZW1hPikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGF5bWVudEluZm9TY2hlbWEge1xyXG4gIGNvbnRyYWN0SWQ6IHN0cmluZztcclxuICBpZE51bWJlcjogc3RyaW5nO1xyXG4gIHRyYWRlcnM6IFRyYWRlcnNJbmZvO1xyXG4gIGV4cGlyZXNBdDogRGF0ZTtcclxuICB0b3RhbEFtb3VudDogbnVtYmVyO1xyXG4gIGFtb3VudERldGFpbHM6IFBheW1lbnRBbW91bnREZXRhaWxzO1xyXG4gIGFjY2VwdFBhcnRpYWxBbW91bnQ6IFBhcnRpYWxBbW91bnREZXRhaWxzO1xyXG4gIGJhcmNvZGU6IHN0cmluZztcclxuICBkaWdpdGFibGVMaW5lOiBzdHJpbmc7XHJcbiAgcGF5bWVudERlYWRsaW5lOiBEYXRlO1xyXG4gIHZhbGlkRGF0ZTogYm9vbGVhbjtcclxuICBuZXh0QnVzaW5lc3NEYXk6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBheW1lbnRJbmZvIGltcGxlbWVudHMgUGF5bWVudEluZm9TY2hlbWEge1xyXG4gIEBJc05vdEVtcHR5KCkgY29udHJhY3RJZDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgaWROdW1iZXI6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHRyYWRlcnM6IFRyYWRlcnNJbmZvID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgZXhwaXJlc0F0OiBEYXRlID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgdG90YWxBbW91bnQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGFtb3VudERldGFpbHM6IFBheW1lbnRBbW91bnREZXRhaWxzID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYWNjZXB0UGFydGlhbEFtb3VudDogUGFydGlhbEFtb3VudERldGFpbHMgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBiYXJjb2RlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBkaWdpdGFibGVMaW5lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBwYXltZW50RGVhZGxpbmU6IERhdGUgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSB2YWxpZERhdGU6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBuZXh0QnVzaW5lc3NEYXk6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxQYXltZW50SW5mb1NjaGVtYT4pIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJvbGV0b1ZhbGlkYXRlUmVzcG9uc2VTY2hlbWEge1xyXG4gIHBhaWQ6IGJvb2xlYW47XHJcbiAgYm9sZXRvSW5mbzogQm9sZXRvSW5mbztcclxuICBwYXltZW50SW5mbzogUGF5bWVudEluZm87XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCb2xldG9WYWxpZGF0ZVJlc3BvbnNlIGltcGxlbWVudHMgQm9sZXRvVmFsaWRhdGVSZXNwb25zZVNjaGVtYSB7XHJcbiAgQElzTm90RW1wdHkoKSBwYWlkOiBib29sZWFuID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYm9sZXRvSW5mbzogQm9sZXRvSW5mbyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHBheW1lbnRJbmZvOiBQYXltZW50SW5mbyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxCb2xldG9WYWxpZGF0ZVJlc3BvbnNlU2NoZW1hPikge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgbW9kZWwgaXMgdmFsaWQgb3IgYW4gYXJyYXkgb2YgdmFsaWRhdGlvbiBlcnJvcnMgaWYgaW52YWxpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbdG9TdHJpbmddIElmIHRvU3RyaW5nIGlzIHRydWUsIHRoaXMgd2lsbCByZXR1cm4gYSBmb3JtYXR0ZWQgZXJyb3Igc3RyaW5nXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGlzVmFsaWQodG9TdHJpbmc/OiBib29sZWFuKTogUHJvbWlzZTxzdHJpbmcgfCB0cnVlIHwgVmFsaWRhdGlvbkVycm9yW10+IHtcclxuICAgIGNvbnN0IGVycm9ycyA9IGF3YWl0IHZhbGlkYXRlKHRoaXMpO1xyXG5cclxuICAgIGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0b1N0cmluZykge1xyXG4gICAgICByZXR1cm4gZXJyb3JzLm1hcChlcnJvciA9PiBlcnJvci50b1N0cmluZyh0cnVlKSkuam9pbihcIjsgXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBlcnJvcnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==