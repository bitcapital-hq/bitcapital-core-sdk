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
const __1 = require("..");
const BankTransfer_1 = require("./BankTransfer");
const class_validator_1 = require("../../../node_modules/class-validator");
class BankTransferPayment extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.source = undefined;
        this.type = undefined;
        this.bitcapitalCoreId = undefined;
        this.transactionCode = undefined;
        this.amount = undefined;
        this.bankTransfer = undefined;
        Object.assign(this, data);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], BankTransferPayment.prototype, "source", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BankTransferPayment.prototype, "type", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BankTransferPayment.prototype, "bitcapitalCoreId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], BankTransferPayment.prototype, "transactionCode", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], BankTransferPayment.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", BankTransfer_1.BankTransfer)
], BankTransferPayment.prototype, "bankTransfer", void 0);
exports.BankTransferPayment = BankTransferPayment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFua1RyYW5zZmVyUGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvUGF5bWVudC9CYW5rVHJhbnNmZXJQYXltZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQWdEO0FBRWhELGlEQUE4QztBQUM5QywyRUFBK0U7QUFXL0UseUJBQWlDLFNBQVEsYUFBUztJQWM5QyxZQUFZLElBQXdDO1FBQ2hELEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQWJoQixXQUFNLEdBQW9CLFNBQVMsQ0FBQztRQUVwQyxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBRXpCLHFCQUFnQixHQUFXLFNBQVMsQ0FBQztRQUVyQyxvQkFBZSxHQUFZLFNBQVMsQ0FBQztRQUVyQyxXQUFNLEdBQVcsU0FBUyxDQUFDO1FBRTNCLGlCQUFZLEdBQWlCLFNBQVMsQ0FBQztRQUluQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7QUFoQkc7SUFEQyw0QkFBVSxFQUFFOzttREFDdUI7QUFFcEM7SUFEQyw0QkFBVSxFQUFFOztpREFDWTtBQUV6QjtJQURDLDRCQUFVLEVBQUU7OzZEQUN3QjtBQUVyQztJQURDLDRCQUFVLEVBQUU7OzREQUN3QjtBQUVyQztJQURDLDRCQUFVLEVBQUU7O21EQUNjO0FBRTNCO0lBREMsNEJBQVUsRUFBRTs4QkFDQywyQkFBWTt5REFBYTtBQVozQyxrREFrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSB9IGZyb20gXCIuLlwiO1xyXG5pbXBvcnQgV2FsbGV0IGZyb20gXCIuLi9XYWxsZXQvV2FsbGV0XCI7XHJcbmltcG9ydCB7IEJhbmtUcmFuc2ZlciB9IGZyb20gXCIuL0JhbmtUcmFuc2ZlclwiO1xyXG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc09wdGlvbmFsIH0gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzcy12YWxpZGF0b3JcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmFua1RyYW5zZmVyUGF5bWVudFNjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBiaXRjYXBpdGFsQ29yZUlkOiBzdHJpbmc7XHJcbiAgICB0cmFuc2FjdGlvbkNvZGU/OiBzdHJpbmc7XHJcbiAgICBzb3VyY2U6IFdhbGxldCB8IHN0cmluZztcclxuICAgIGFtb3VudDogc3RyaW5nO1xyXG4gICAgYmFua1RyYW5zZmVyOiBCYW5rVHJhbnNmZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYW5rVHJhbnNmZXJQYXltZW50IGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgQmFua1RyYW5zZmVyUGF5bWVudFNjaGVtYSB7XHJcbiAgICBASXNOb3RFbXB0eSgpXHJcbiAgICBzb3VyY2U6IFdhbGxldCB8IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICAgIEBJc05vdEVtcHR5KClcclxuICAgIHR5cGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICAgIEBJc05vdEVtcHR5KClcclxuICAgIGJpdGNhcGl0YWxDb3JlSWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICAgIEBJc09wdGlvbmFsKClcclxuICAgIHRyYW5zYWN0aW9uQ29kZT86IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICAgIEBJc05vdEVtcHR5KClcclxuICAgIGFtb3VudDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gICAgQElzTm90RW1wdHkoKVxyXG4gICAgYmFua1RyYW5zZmVyOiBCYW5rVHJhbnNmZXIgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxCYW5rVHJhbnNmZXJQYXltZW50U2NoZW1hPikge1xyXG4gICAgICAgIHN1cGVyKGRhdGEpO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuIl19