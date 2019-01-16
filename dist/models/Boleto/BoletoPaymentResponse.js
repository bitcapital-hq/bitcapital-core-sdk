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
class BoletoPaymentResponse {
    constructor(data) {
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
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
exports.default = BoletoPaymentResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZXRvUGF5bWVudFJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9Cb2xldG8vQm9sZXRvUGF5bWVudFJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkVBQW1FO0FBZW5FO0lBdUJJLFlBQVksSUFBb0M7UUFDNUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztDQUVKO0FBeEJHO0lBREMsNEJBQVUsRUFBRTs7d0RBQ0s7QUFFbEI7SUFEQyw0QkFBVSxFQUFFOzt3REFDSztBQUVsQjtJQURDLDRCQUFVLEVBQUU7O3FEQUNFO0FBRWY7SUFEQyw0QkFBVSxFQUFFOzswREFDTztBQUVwQjtJQURDLDRCQUFVLEVBQUU7O3NEQUNHO0FBRWhCO0lBREMsNEJBQVUsRUFBRTs4QkFDRixJQUFJO3dEQUFDO0FBRWhCO0lBREMsNEJBQVUsRUFBRTs7NERBQ1M7QUFFdEI7SUFEQyw0QkFBVSxFQUFFOzt1REFDSTtBQUVqQjtJQURDLDRCQUFVLEVBQUU7O3dEQUNLO0FBRWxCO0lBREMsNEJBQVUsRUFBRTs7cURBQ0U7QUFyQm5CLHdDQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElzTm90RW1wdHkgfSBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NsYXNzLXZhbGlkYXRvclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCb2xldG9QYXltZW50UmVzcG9uc2VTY2hlbWEge1xyXG4gICAgcGF5bWVudElkOiBudW1iZXI7XHJcbiAgICBhY2NvdW50SWQ6IG51bWJlcjtcclxuICAgIHN0YXR1czogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIGJhcmNvZGU6IHN0cmluZztcclxuICAgIGV4cGlyZXNBdDogRGF0ZTtcclxuICAgIHJlY2lwaWVudE5hbWU6IHN0cmluZztcclxuICAgIGRpc2NvdW50OiBudW1iZXI7XHJcbiAgICB0YXhBbW91bnQ6IG51bWJlcjtcclxuICAgIGFtb3VudDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2xldG9QYXltZW50UmVzcG9uc2UgaW1wbGVtZW50cyBCb2xldG9QYXltZW50UmVzcG9uc2VTY2hlbWEge1xyXG5cclxuICAgIEBJc05vdEVtcHR5KClcclxuICAgIHBheW1lbnRJZDogbnVtYmVyO1xyXG4gICAgQElzTm90RW1wdHkoKVxyXG4gICAgYWNjb3VudElkOiBudW1iZXI7XHJcbiAgICBASXNOb3RFbXB0eSgpXHJcbiAgICBzdGF0dXM6IHN0cmluZztcclxuICAgIEBJc05vdEVtcHR5KClcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBASXNOb3RFbXB0eSgpXHJcbiAgICBiYXJjb2RlOiBzdHJpbmc7XHJcbiAgICBASXNOb3RFbXB0eSgpXHJcbiAgICBleHBpcmVzQXQ6IERhdGU7XHJcbiAgICBASXNOb3RFbXB0eSgpXHJcbiAgICByZWNpcGllbnROYW1lOiBzdHJpbmc7XHJcbiAgICBASXNOb3RFbXB0eSgpXHJcbiAgICBkaXNjb3VudDogbnVtYmVyO1xyXG4gICAgQElzTm90RW1wdHkoKVxyXG4gICAgdGF4QW1vdW50OiBudW1iZXI7XHJcbiAgICBASXNOb3RFbXB0eSgpXHJcbiAgICBhbW91bnQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPEJvbGV0b1BheW1lbnRSZXNwb25zZT4pIHtcclxuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKS5tYXAocHJvcCA9PiAodGhpc1twcm9wXSA9IGRhdGFbcHJvcF0pKTtcclxuICAgIH1cclxuXHJcbn0iXX0=