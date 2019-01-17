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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFua1RyYW5zZmVyUGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvUGF5bWVudC9CYW5rVHJhbnNmZXJQYXltZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQWdEO0FBRWhELGlEQUE4QztBQUM5QywyRUFBK0U7QUFXL0UseUJBQWlDLFNBQVEsYUFBUztJQVFoRCxZQUFZLElBQXdDO1FBQ2xELEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQVJBLFdBQU0sR0FBb0IsU0FBUyxDQUFDO1FBQ3BDLFNBQUksR0FBVyxTQUFTLENBQUM7UUFDekIscUJBQWdCLEdBQVcsU0FBUyxDQUFDO1FBQ3JDLG9CQUFlLEdBQVksU0FBUyxDQUFDO1FBQ3JDLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFDM0IsaUJBQVksR0FBaUIsU0FBUyxDQUFDO1FBSW5ELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQVhlO0lBQWIsNEJBQVUsRUFBRTs7bURBQXFDO0FBQ3BDO0lBQWIsNEJBQVUsRUFBRTs7aURBQTBCO0FBQ3pCO0lBQWIsNEJBQVUsRUFBRTs7NkRBQXNDO0FBQ3JDO0lBQWIsNEJBQVUsRUFBRTs7NERBQXNDO0FBQ3JDO0lBQWIsNEJBQVUsRUFBRTs7bURBQTRCO0FBQzNCO0lBQWIsNEJBQVUsRUFBRTs4QkFBZSwyQkFBWTt5REFBYTtBQU52RCxrREFZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hIH0gZnJvbSBcIi4uXCI7XHJcbmltcG9ydCBXYWxsZXQgZnJvbSBcIi4uL1dhbGxldC9XYWxsZXRcIjtcclxuaW1wb3J0IHsgQmFua1RyYW5zZmVyIH0gZnJvbSBcIi4vQmFua1RyYW5zZmVyXCI7XHJcbmltcG9ydCB7IElzTm90RW1wdHksIElzT3B0aW9uYWwgfSBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NsYXNzLXZhbGlkYXRvclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCYW5rVHJhbnNmZXJQYXltZW50U2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgYml0Y2FwaXRhbENvcmVJZDogc3RyaW5nO1xyXG4gIHRyYW5zYWN0aW9uQ29kZT86IHN0cmluZztcclxuICBzb3VyY2U6IFdhbGxldCB8IHN0cmluZztcclxuICBhbW91bnQ6IHN0cmluZztcclxuICBiYW5rVHJhbnNmZXI6IEJhbmtUcmFuc2ZlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhbmtUcmFuc2ZlclBheW1lbnQgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBCYW5rVHJhbnNmZXJQYXltZW50U2NoZW1hIHtcclxuICBASXNOb3RFbXB0eSgpIHNvdXJjZTogV2FsbGV0IHwgc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgdHlwZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYml0Y2FwaXRhbENvcmVJZDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc09wdGlvbmFsKCkgdHJhbnNhY3Rpb25Db2RlPzogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYW1vdW50OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBiYW5rVHJhbnNmZXI6IEJhbmtUcmFuc2ZlciA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxCYW5rVHJhbnNmZXJQYXltZW50U2NoZW1hPikge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxufVxyXG4iXX0=