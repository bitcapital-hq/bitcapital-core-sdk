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
        this.isRegistered = false;
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
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
exports.default = Boleto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZXRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL21vZGVscy9Cb2xldG8vQm9sZXRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMEJBQWdEO0FBQ2hELDJFQUErRTtBQXFCL0UsWUFBNEIsU0FBUSxhQUFTO0lBbUN6QyxZQUFZLElBQTJCO1FBQ25DLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUhoQixpQkFBWSxHQUFhLEtBQUssQ0FBQztRQUszQixtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztDQUNKO0FBdENHO0lBREMsNEJBQVUsRUFBRTs7MkNBQ1E7QUFFckI7SUFEQyw0QkFBVSxFQUFFOzs4Q0FDVztBQUV4QjtJQURDLDRCQUFVLEVBQUU7OEJBQ0YsSUFBSTt5Q0FBQztBQUVoQjtJQURDLDRCQUFVLEVBQUU7O3NDQUNFO0FBRWY7SUFEQyw0QkFBVSxFQUFFOzsrQ0FDWTtBQUV6QjtJQURDLDRCQUFVLEVBQUU7OytDQUNZO0FBRXpCO0lBREMsNEJBQVUsRUFBRTs7bURBQ2dCO0FBRTdCO0lBREMsNEJBQVUsRUFBRTs7b0NBQ0M7QUFFZDtJQURDLDRCQUFVLEVBQUU7O3NDQUNHO0FBRWhCO0lBREMsNEJBQVUsRUFBRTs7K0NBQ1k7QUFFekI7SUFEQyw0QkFBVSxFQUFFOztvREFDaUI7QUFFOUI7SUFEQyw0QkFBVSxFQUFFOzsrQ0FDWTtBQUV6QjtJQURDLDRCQUFVLEVBQUU7O29EQUNpQjtBQUU5QjtJQURDLDRCQUFVLEVBQUU7O3VDQUNJO0FBRWpCO0lBREMsNEJBQVUsRUFBRTs7NkNBQ1U7QUFFdkI7SUFEQyw0QkFBVSxFQUFFOzs0Q0FDa0I7QUFqQ25DLHlCQXlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hIH0gZnJvbSBcIi4uXCI7XHJcbmltcG9ydCB7IElzT3B0aW9uYWwsIElzTm90RW1wdHkgfSBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NsYXNzLXZhbGlkYXRvclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCb2xldG9TY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xyXG4gICAgY29uZHVjdG9ySWQ/OiBudW1iZXI7XHJcbiAgICBkb2N1bWVudE51bWJlcj86IHN0cmluZztcclxuICAgIGV4cGlyZXNBdDogRGF0ZTtcclxuICAgIGFtb3VudDogbnVtYmVyO1xyXG4gICAgYmVuZWZpY2lhcnlOYW1lPzogc3RyaW5nO1xyXG4gICAgYmVuZWZpY2lhcnlDb2RlPzogc3RyaW5nO1xyXG4gICAgYmVuZWZpY2lhcnlEb2N1bWVudD86IHN0cmluZztcclxuICAgIGJhbms/OiBzdHJpbmc7XHJcbiAgICBhZ2VuY3k/OiBzdHJpbmc7XHJcbiAgICBhZ3JlZW1lbnROdW1iZXI/OiBzdHJpbmc7XHJcbiAgICBhZ3JlZW1lbnROdW1iZXJEaWdpdD86IHN0cmluZztcclxuICAgIGNvbmR1Y3Rvck51bWJlcj86IHN0cmluZztcclxuICAgIGNvbmR1Y3Rvck51bWJlckRpZ2l0Pzogc3RyaW5nO1xyXG4gICAgYmFyQ29kZT86IHN0cmluZztcclxuICAgIGRpZ2l0YWJsZUxpbmU/OiBzdHJpbmc7XHJcbiAgICBpc1JlZ2lzdGVyZWQ/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2xldG8gZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBCb2xldG9TY2hlbWEge1xyXG5cclxuICAgIEBJc09wdGlvbmFsKClcclxuICAgIGNvbmR1Y3RvcklkPzogbnVtYmVyO1xyXG4gICAgQElzT3B0aW9uYWwoKVxyXG4gICAgZG9jdW1lbnROdW1iZXI/OiBzdHJpbmc7XHJcbiAgICBASXNOb3RFbXB0eSgpXHJcbiAgICBleHBpcmVzQXQ6IERhdGU7XHJcbiAgICBASXNOb3RFbXB0eSgpXHJcbiAgICBhbW91bnQ6IG51bWJlcjtcclxuICAgIEBJc09wdGlvbmFsKClcclxuICAgIGJlbmVmaWNpYXJ5TmFtZT86IHN0cmluZztcclxuICAgIEBJc09wdGlvbmFsKClcclxuICAgIGJlbmVmaWNpYXJ5Q29kZT86IHN0cmluZztcclxuICAgIEBJc09wdGlvbmFsKClcclxuICAgIGJlbmVmaWNpYXJ5RG9jdW1lbnQ/OiBzdHJpbmc7XHJcbiAgICBASXNPcHRpb25hbCgpXHJcbiAgICBiYW5rPzogc3RyaW5nO1xyXG4gICAgQElzT3B0aW9uYWwoKVxyXG4gICAgYWdlbmN5Pzogc3RyaW5nO1xyXG4gICAgQElzT3B0aW9uYWwoKVxyXG4gICAgYWdyZWVtZW50TnVtYmVyPzogc3RyaW5nO1xyXG4gICAgQElzT3B0aW9uYWwoKVxyXG4gICAgYWdyZWVtZW50TnVtYmVyRGlnaXQ/OiBzdHJpbmc7XHJcbiAgICBASXNPcHRpb25hbCgpXHJcbiAgICBjb25kdWN0b3JOdW1iZXI/OiBzdHJpbmc7XHJcbiAgICBASXNPcHRpb25hbCgpXHJcbiAgICBjb25kdWN0b3JOdW1iZXJEaWdpdD86IHN0cmluZztcclxuICAgIEBJc09wdGlvbmFsKClcclxuICAgIGJhckNvZGU/OiBzdHJpbmc7XHJcbiAgICBASXNPcHRpb25hbCgpXHJcbiAgICBkaWdpdGFibGVMaW5lPzogc3RyaW5nO1xyXG4gICAgQElzT3B0aW9uYWwoKVxyXG4gICAgaXNSZWdpc3RlcmVkPzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIFxyXG4gICAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxCb2xldG9TY2hlbWE+KSB7XHJcbiAgICAgICAgc3VwZXIoZGF0YSk7XHJcblxyXG4gICAgICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcclxuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKS5tYXAocHJvcCA9PiAodGhpc1twcm9wXSA9IGRhdGFbcHJvcF0pKTtcclxuICAgIH1cclxufVxyXG4iXX0=