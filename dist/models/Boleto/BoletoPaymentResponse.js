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
class BoletoPaymentResponse extends BaseModel_1.default {
    constructor(data) {
        super(data);
        this.paymentId = undefined;
        this.accountId = undefined;
        this.status = undefined;
        this.description = undefined;
        this.barcode = undefined;
        this.expiresAt = undefined;
        this.recipientName = undefined;
        this.discount = undefined;
        this.taxAmount = undefined;
        this.amount = undefined;
        Object.assign(this, data);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BoletoPaymentResponse.prototype, "paymentId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BoletoPaymentResponse.prototype, "accountId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BoletoPaymentResponse.prototype, "status", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BoletoPaymentResponse.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BoletoPaymentResponse.prototype, "barcode", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], BoletoPaymentResponse.prototype, "expiresAt", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BoletoPaymentResponse.prototype, "recipientName", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BoletoPaymentResponse.prototype, "discount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BoletoPaymentResponse.prototype, "taxAmount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], BoletoPaymentResponse.prototype, "amount", void 0);
exports.BoletoPaymentResponse = BoletoPaymentResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZXRvUGF5bWVudFJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9Cb2xldG8vQm9sZXRvUGF5bWVudFJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEscURBQTZDO0FBQzdDLGlEQUErRDtBQWUvRCwyQkFBbUMsU0FBUSxtQkFBUztJQVlsRCxZQUFZLElBQW9DO1FBQzlDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQVpBLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFDOUIsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUM5QixXQUFNLEdBQVcsU0FBUyxDQUFDO1FBQzNCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBQ2hDLFlBQU8sR0FBVyxTQUFTLENBQUM7UUFDNUIsY0FBUyxHQUFTLFNBQVMsQ0FBQztRQUM1QixrQkFBYSxHQUFXLFNBQVMsQ0FBQztRQUNsQyxhQUFRLEdBQVcsU0FBUyxDQUFDO1FBQzdCLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFDOUIsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUl2QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFmZTtJQUFiLDRCQUFVLEVBQUU7O3dEQUErQjtBQUM5QjtJQUFiLDRCQUFVLEVBQUU7O3dEQUErQjtBQUM5QjtJQUFiLDRCQUFVLEVBQUU7O3FEQUE0QjtBQUMzQjtJQUFiLDRCQUFVLEVBQUU7OzBEQUFpQztBQUNoQztJQUFiLDRCQUFVLEVBQUU7O3NEQUE2QjtBQUM1QjtJQUFiLDRCQUFVLEVBQUU7OEJBQVksSUFBSTt3REFBYTtBQUM1QjtJQUFiLDRCQUFVLEVBQUU7OzREQUFtQztBQUNsQztJQUFiLDRCQUFVLEVBQUU7O3VEQUE4QjtBQUM3QjtJQUFiLDRCQUFVLEVBQUU7O3dEQUErQjtBQUM5QjtJQUFiLDRCQUFVLEVBQUU7O3FEQUE0QjtBQVYzQyxzREFnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJc05vdEVtcHR5IH0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xyXG5pbXBvcnQgQmFzZU1vZGVsLCB7IEJhc2VNb2RlbFNjaGVtYSB9IGZyb20gXCIuLi9CYXNlL0Jhc2VNb2RlbFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCb2xldG9QYXltZW50UmVzcG9uc2VTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xyXG4gIHBheW1lbnRJZDogbnVtYmVyO1xyXG4gIGFjY291bnRJZDogbnVtYmVyO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgYmFyY29kZTogc3RyaW5nO1xyXG4gIGV4cGlyZXNBdDogRGF0ZTtcclxuICByZWNpcGllbnROYW1lOiBzdHJpbmc7XHJcbiAgZGlzY291bnQ6IG51bWJlcjtcclxuICB0YXhBbW91bnQ6IG51bWJlcjtcclxuICBhbW91bnQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJvbGV0b1BheW1lbnRSZXNwb25zZSBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIEJvbGV0b1BheW1lbnRSZXNwb25zZVNjaGVtYSB7XHJcbiAgQElzTm90RW1wdHkoKSBwYXltZW50SWQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGFjY291bnRJZDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgc3RhdHVzOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBkZXNjcmlwdGlvbjogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYmFyY29kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgZXhwaXJlc0F0OiBEYXRlID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgcmVjaXBpZW50TmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgZGlzY291bnQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIHRheEFtb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYW1vdW50OiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8Qm9sZXRvUGF5bWVudFJlc3BvbnNlPikge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxufVxyXG4iXX0=