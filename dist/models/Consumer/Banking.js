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
const BaseModel_1 = require("../Base/BaseModel");
const Consumer_1 = require("./Consumer");
const class_validator_1 = require("../../../node_modules/class-validator");
var BankingType;
(function (BankingType) {
    BankingType["CHECKING"] = "checking";
    BankingType["SAVINGS"] = "savings";
})(BankingType = exports.BankingType || (exports.BankingType = {}));
class Banking extends BaseModel_1.default {
    constructor(data) {
        super(data);
        this.consumer = undefined;
        this.type = BankingType.CHECKING;
        this.bank = undefined;
        this.agency = undefined;
        this.agencyDigit = undefined;
        this.account = undefined;
        this.accountDigit = undefined;
        Object.assign(this, data);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Consumer_1.default)
], Banking.prototype, "consumer", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Banking.prototype, "type", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], Banking.prototype, "bank", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], Banking.prototype, "agency", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Banking.prototype, "agencyDigit", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], Banking.prototype, "account", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Banking.prototype, "accountDigit", void 0);
exports.Banking = Banking;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFua2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQ29uc3VtZXIvQmFua2luZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGlEQUErRDtBQUMvRCx5Q0FBa0M7QUFDbEMsMkVBQW1FO0FBRW5FLElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNuQixvQ0FBcUIsQ0FBQTtJQUNyQixrQ0FBbUIsQ0FBQTtBQUN2QixDQUFDLEVBSFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFHdEI7QUFZRCxhQUFxQixTQUFRLG1CQUFTO0lBZ0JsQyxZQUFZLElBQTRCO1FBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQWZoQixhQUFRLEdBQWEsU0FBUyxDQUFDO1FBRS9CLFNBQUksR0FBZ0IsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUV6QyxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBRXpCLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFFM0IsZ0JBQVcsR0FBVyxTQUFTLENBQUM7UUFFaEMsWUFBTyxHQUFXLFNBQVMsQ0FBQztRQUU1QixpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUk3QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7QUFsQkc7SUFEQyw0QkFBVSxFQUFFOzhCQUNILGtCQUFRO3lDQUFhO0FBRS9CO0lBREMsNEJBQVUsRUFBRTs7cUNBQzRCO0FBRXpDO0lBREMsNEJBQVUsRUFBRTs7cUNBQ1k7QUFFekI7SUFEQyw0QkFBVSxFQUFFOzt1Q0FDYztBQUUzQjtJQURDLDRCQUFVLEVBQUU7OzRDQUNtQjtBQUVoQztJQURDLDRCQUFVLEVBQUU7O3dDQUNlO0FBRTVCO0lBREMsNEJBQVUsRUFBRTs7NkNBQ29CO0FBZHJDLDBCQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlTW9kZWwsIHsgQmFzZU1vZGVsU2NoZW1hIH0gZnJvbSBcIi4uL0Jhc2UvQmFzZU1vZGVsXCI7XHJcbmltcG9ydCBDb25zdW1lciBmcm9tIFwiLi9Db25zdW1lclwiO1xyXG5pbXBvcnQgeyBJc05vdEVtcHR5IH0gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzcy12YWxpZGF0b3JcIjtcclxuXHJcbmV4cG9ydCBlbnVtIEJhbmtpbmdUeXBlIHtcclxuICAgIENIRUNLSU5HID0gXCJjaGVja2luZ1wiLFxyXG4gICAgU0FWSU5HUyA9IFwic2F2aW5nc1wiXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmFua2luZ1NjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XHJcbiAgICBjb25zdW1lcjogQ29uc3VtZXI7XHJcbiAgICB0eXBlOiBCYW5raW5nVHlwZTtcclxuICAgIGJhbms6IG51bWJlcjtcclxuICAgIGFnZW5jeTogbnVtYmVyO1xyXG4gICAgYWdlbmN5RGlnaXQ6IHN0cmluZztcclxuICAgIGFjY291bnQ6IG51bWJlcjtcclxuICAgIGFjY291bnREaWdpdDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmFua2luZyBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIEJhbmtpbmdTY2hlbWEge1xyXG4gICAgQElzTm90RW1wdHkoKVxyXG4gICAgY29uc3VtZXI6IENvbnN1bWVyID0gdW5kZWZpbmVkO1xyXG4gICAgQElzTm90RW1wdHkoKVxyXG4gICAgdHlwZTogQmFua2luZ1R5cGUgPSBCYW5raW5nVHlwZS5DSEVDS0lORztcclxuICAgIEBJc05vdEVtcHR5KClcclxuICAgIGJhbms6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICAgIEBJc05vdEVtcHR5KClcclxuICAgIGFnZW5jeTogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gICAgQElzTm90RW1wdHkoKVxyXG4gICAgYWdlbmN5RGlnaXQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICAgIEBJc05vdEVtcHR5KClcclxuICAgIGFjY291bnQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICAgIEBJc05vdEVtcHR5KClcclxuICAgIGFjY291bnREaWdpdDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8QmFua2luZ1NjaGVtYT4pIHtcclxuICAgICAgICBzdXBlcihkYXRhKTtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gICAgfVxyXG59Il19