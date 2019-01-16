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
const class_validator_1 = require("../../../node_modules/class-validator");
class Boleto extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.conductorId = undefined;
        this.documentNumber = undefined;
        this.expiresAt = undefined;
        this.amount = undefined;
        this.beneficiaryName = undefined;
        this.beneficiaryCode = undefined;
        this.beneficiaryDocument = undefined;
        this.bank = undefined;
        this.agency = undefined;
        this.agreementNumber = undefined;
        this.agreementNumberDigit = undefined;
        this.conductorNumber = undefined;
        this.conductorNumberDigit = undefined;
        this.barCode = undefined;
        this.digitableLine = undefined;
        this.isRegistered = false;
        Object.assign(this, data);
    }
}
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], Boleto.prototype, "conductorId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Boleto.prototype, "documentNumber", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], Boleto.prototype, "expiresAt", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], Boleto.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Boleto.prototype, "beneficiaryName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Boleto.prototype, "beneficiaryCode", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Boleto.prototype, "beneficiaryDocument", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Boleto.prototype, "bank", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Boleto.prototype, "agency", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Boleto.prototype, "agreementNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Boleto.prototype, "agreementNumberDigit", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Boleto.prototype, "conductorNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Boleto.prototype, "conductorNumberDigit", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Boleto.prototype, "barCode", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Boleto.prototype, "digitableLine", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], Boleto.prototype, "isRegistered", void 0);
exports.Boleto = Boleto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZXRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9Cb2xldG8vQm9sZXRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQWdEO0FBQ2hELDJFQUErRTtBQXFCL0UsWUFBb0IsU0FBUSxhQUFTO0lBa0JuQyxZQUFZLElBQTJCO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQWxCQSxnQkFBVyxHQUFZLFNBQVMsQ0FBQztRQUNqQyxtQkFBYyxHQUFZLFNBQVMsQ0FBQztRQUNwQyxjQUFTLEdBQVMsU0FBUyxDQUFDO1FBQzVCLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFDM0Isb0JBQWUsR0FBWSxTQUFTLENBQUM7UUFDckMsb0JBQWUsR0FBWSxTQUFTLENBQUM7UUFDckMsd0JBQW1CLEdBQVksU0FBUyxDQUFDO1FBQ3pDLFNBQUksR0FBWSxTQUFTLENBQUM7UUFDMUIsV0FBTSxHQUFZLFNBQVMsQ0FBQztRQUM1QixvQkFBZSxHQUFZLFNBQVMsQ0FBQztRQUNyQyx5QkFBb0IsR0FBWSxTQUFTLENBQUM7UUFDMUMsb0JBQWUsR0FBWSxTQUFTLENBQUM7UUFDckMseUJBQW9CLEdBQVksU0FBUyxDQUFDO1FBQzFDLFlBQU8sR0FBWSxTQUFTLENBQUM7UUFDN0Isa0JBQWEsR0FBWSxTQUFTLENBQUM7UUFDbkMsaUJBQVksR0FBYSxLQUFLLENBQUM7UUFJM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBckJlO0lBQWIsNEJBQVUsRUFBRTs7MkNBQWtDO0FBQ2pDO0lBQWIsNEJBQVUsRUFBRTs7OENBQXFDO0FBQ3BDO0lBQWIsNEJBQVUsRUFBRTs4QkFBWSxJQUFJO3lDQUFhO0FBQzVCO0lBQWIsNEJBQVUsRUFBRTs7c0NBQTRCO0FBQzNCO0lBQWIsNEJBQVUsRUFBRTs7K0NBQXNDO0FBQ3JDO0lBQWIsNEJBQVUsRUFBRTs7K0NBQXNDO0FBQ3JDO0lBQWIsNEJBQVUsRUFBRTs7bURBQTBDO0FBQ3pDO0lBQWIsNEJBQVUsRUFBRTs7b0NBQTJCO0FBQzFCO0lBQWIsNEJBQVUsRUFBRTs7c0NBQTZCO0FBQzVCO0lBQWIsNEJBQVUsRUFBRTs7K0NBQXNDO0FBQ3JDO0lBQWIsNEJBQVUsRUFBRTs7b0RBQTJDO0FBQzFDO0lBQWIsNEJBQVUsRUFBRTs7K0NBQXNDO0FBQ3JDO0lBQWIsNEJBQVUsRUFBRTs7b0RBQTJDO0FBQzFDO0lBQWIsNEJBQVUsRUFBRTs7dUNBQThCO0FBQzdCO0lBQWIsNEJBQVUsRUFBRTs7NkNBQW9DO0FBQ25DO0lBQWIsNEJBQVUsRUFBRTs7NENBQWdDO0FBaEIvQyx3QkFzQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSB9IGZyb20gXCIuLlwiO1xyXG5pbXBvcnQgeyBJc09wdGlvbmFsLCBJc05vdEVtcHR5IH0gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzcy12YWxpZGF0b3JcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQm9sZXRvU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcclxuICBjb25kdWN0b3JJZD86IG51bWJlcjtcclxuICBkb2N1bWVudE51bWJlcj86IHN0cmluZztcclxuICBleHBpcmVzQXQ6IERhdGU7XHJcbiAgYW1vdW50OiBudW1iZXI7XHJcbiAgYmVuZWZpY2lhcnlOYW1lPzogc3RyaW5nO1xyXG4gIGJlbmVmaWNpYXJ5Q29kZT86IHN0cmluZztcclxuICBiZW5lZmljaWFyeURvY3VtZW50Pzogc3RyaW5nO1xyXG4gIGJhbms/OiBzdHJpbmc7XHJcbiAgYWdlbmN5Pzogc3RyaW5nO1xyXG4gIGFncmVlbWVudE51bWJlcj86IHN0cmluZztcclxuICBhZ3JlZW1lbnROdW1iZXJEaWdpdD86IHN0cmluZztcclxuICBjb25kdWN0b3JOdW1iZXI/OiBzdHJpbmc7XHJcbiAgY29uZHVjdG9yTnVtYmVyRGlnaXQ/OiBzdHJpbmc7XHJcbiAgYmFyQ29kZT86IHN0cmluZztcclxuICBkaWdpdGFibGVMaW5lPzogc3RyaW5nO1xyXG4gIGlzUmVnaXN0ZXJlZD86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCb2xldG8gZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBCb2xldG9TY2hlbWEge1xyXG4gIEBJc09wdGlvbmFsKCkgY29uZHVjdG9ySWQ/OiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgQElzT3B0aW9uYWwoKSBkb2N1bWVudE51bWJlcj86IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGV4cGlyZXNBdDogRGF0ZSA9IHVuZGVmaW5lZDtcclxuICBASXNOb3RFbXB0eSgpIGFtb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc09wdGlvbmFsKCkgYmVuZWZpY2lhcnlOYW1lPzogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc09wdGlvbmFsKCkgYmVuZWZpY2lhcnlDb2RlPzogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc09wdGlvbmFsKCkgYmVuZWZpY2lhcnlEb2N1bWVudD86IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNPcHRpb25hbCgpIGJhbms/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzT3B0aW9uYWwoKSBhZ2VuY3k/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzT3B0aW9uYWwoKSBhZ3JlZW1lbnROdW1iZXI/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzT3B0aW9uYWwoKSBhZ3JlZW1lbnROdW1iZXJEaWdpdD86IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNPcHRpb25hbCgpIGNvbmR1Y3Rvck51bWJlcj86IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNPcHRpb25hbCgpIGNvbmR1Y3Rvck51bWJlckRpZ2l0Pzogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc09wdGlvbmFsKCkgYmFyQ29kZT86IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuICBASXNPcHRpb25hbCgpIGRpZ2l0YWJsZUxpbmU/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzT3B0aW9uYWwoKSBpc1JlZ2lzdGVyZWQ/OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8Qm9sZXRvU2NoZW1hPikge1xyXG4gICAgc3VwZXIoZGF0YSk7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xyXG4gIH1cclxufVxyXG4iXX0=