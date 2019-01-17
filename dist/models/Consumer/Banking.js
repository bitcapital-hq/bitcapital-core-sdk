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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFua2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQ29uc3VtZXIvQmFua2luZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGlEQUErRDtBQUMvRCx5Q0FBa0M7QUFDbEMsMkVBQW1FO0FBRW5FLElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNyQixvQ0FBcUIsQ0FBQTtJQUNyQixrQ0FBbUIsQ0FBQTtBQUNyQixDQUFDLEVBSFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFHdEI7QUFZRCxhQUFxQixTQUFRLG1CQUFTO0lBU3BDLFlBQVksSUFBNEI7UUFDdEMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBVEEsYUFBUSxHQUFhLFNBQVMsQ0FBQztRQUMvQixTQUFJLEdBQWdCLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDekMsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUN6QixXQUFNLEdBQVcsU0FBUyxDQUFDO1FBQzNCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBQ2hDLFlBQU8sR0FBVyxTQUFTLENBQUM7UUFDNUIsaUJBQVksR0FBVyxTQUFTLENBQUM7UUFJN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBWmU7SUFBYiw0QkFBVSxFQUFFOzhCQUFXLGtCQUFRO3lDQUFhO0FBQy9CO0lBQWIsNEJBQVUsRUFBRTs7cUNBQTBDO0FBQ3pDO0lBQWIsNEJBQVUsRUFBRTs7cUNBQTBCO0FBQ3pCO0lBQWIsNEJBQVUsRUFBRTs7dUNBQTRCO0FBQzNCO0lBQWIsNEJBQVUsRUFBRTs7NENBQWlDO0FBQ2hDO0lBQWIsNEJBQVUsRUFBRTs7d0NBQTZCO0FBQzVCO0lBQWIsNEJBQVUsRUFBRTs7NkNBQWtDO0FBUGpELDBCQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VNb2RlbCwgeyBCYXNlTW9kZWxTY2hlbWEgfSBmcm9tIFwiLi4vQmFzZS9CYXNlTW9kZWxcIjtcclxuaW1wb3J0IENvbnN1bWVyIGZyb20gXCIuL0NvbnN1bWVyXCI7XHJcbmltcG9ydCB7IElzTm90RW1wdHkgfSBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NsYXNzLXZhbGlkYXRvclwiO1xyXG5cclxuZXhwb3J0IGVudW0gQmFua2luZ1R5cGUge1xyXG4gIENIRUNLSU5HID0gXCJjaGVja2luZ1wiLFxyXG4gIFNBVklOR1MgPSBcInNhdmluZ3NcIlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJhbmtpbmdTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xyXG4gIGNvbnN1bWVyOiBDb25zdW1lcjtcclxuICB0eXBlOiBCYW5raW5nVHlwZTtcclxuICBiYW5rOiBudW1iZXI7XHJcbiAgYWdlbmN5OiBudW1iZXI7XHJcbiAgYWdlbmN5RGlnaXQ6IHN0cmluZztcclxuICBhY2NvdW50OiBudW1iZXI7XHJcbiAgYWNjb3VudERpZ2l0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYW5raW5nIGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgQmFua2luZ1NjaGVtYSB7XHJcbiAgQElzTm90RW1wdHkoKSBjb25zdW1lcjogQ29uc3VtZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSB0eXBlOiBCYW5raW5nVHlwZSA9IEJhbmtpbmdUeXBlLkNIRUNLSU5HO1xyXG4gIEBJc05vdEVtcHR5KCkgYmFuazogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYWdlbmN5OiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBhZ2VuY3lEaWdpdDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYWNjb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgYWNjb3VudERpZ2l0OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8QmFua2luZ1NjaGVtYT4pIHtcclxuICAgIHN1cGVyKGRhdGEpO1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcclxuICB9XHJcbn1cclxuIl19