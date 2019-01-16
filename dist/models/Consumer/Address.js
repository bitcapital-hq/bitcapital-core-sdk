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
const class_validator_1 = require("class-validator");
var AddressType;
(function (AddressType) {
    AddressType["HOME"] = "home";
    AddressType["WORK"] = "work";
})(AddressType = exports.AddressType || (exports.AddressType = {}));
class Address extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.consumer = undefined;
        this.consumerId = undefined;
        this.type = AddressType.HOME;
        this.country = undefined;
        this.state = undefined;
        this.city = undefined;
        this.code = undefined;
        this.street = undefined;
        this.complement = undefined;
        this.number = undefined;
        this.geo = undefined;
        // Assign all props
        Object.getOwnPropertyNames(this).map(prop => (this[prop] = data[prop]));
    }
}
__decorate([
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], Address.prototype, "consumerId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Address.prototype, "reference", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Address.prototype, "code", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Address.prototype, "complement", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Address.prototype, "number", void 0);
exports.default = Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQ29uc3VtZXIvQWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDBCQUFnRDtBQUNoRCxxREFBaUU7QUFFakUsSUFBWSxXQUdYO0FBSEQsV0FBWSxXQUFXO0lBQ3JCLDRCQUFhLENBQUE7SUFDYiw0QkFBYSxDQUFBO0FBQ2YsQ0FBQyxFQUhXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBR3RCO0FBaUJELGFBQTZCLFNBQVEsYUFBUztJQWdCNUMsWUFBWSxJQUE0QjtRQUN0QyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFoQmQsYUFBUSxHQUFjLFNBQVMsQ0FBQztRQUN0QixlQUFVLEdBQVcsU0FBUyxDQUFDO1FBRXpDLFNBQUksR0FBaUIsV0FBVyxDQUFDLElBQUksQ0FBQztRQUV4QixZQUFPLEdBQVcsU0FBUyxDQUFDO1FBQzVCLFVBQUssR0FBVyxTQUFTLENBQUM7UUFDMUIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUN6QixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBQ3pCLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFDM0IsZUFBVSxHQUFXLFNBQVMsQ0FBQztRQUMvQixXQUFNLEdBQVcsU0FBUyxDQUFDO1FBRXpDLFFBQUcsR0FBNkIsU0FBUyxDQUFDO1FBS3hDLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0Y7QUFwQlc7SUFBVCx3QkFBTSxFQUFFOzsyQ0FBZ0M7QUFHM0I7SUFBYiw0QkFBVSxFQUFFOzswQ0FBb0I7QUFDbkI7SUFBYiw0QkFBVSxFQUFFOzt3Q0FBNkI7QUFDNUI7SUFBYiw0QkFBVSxFQUFFOztzQ0FBMkI7QUFDMUI7SUFBYiw0QkFBVSxFQUFFOztxQ0FBMEI7QUFDekI7SUFBYiw0QkFBVSxFQUFFOztxQ0FBMEI7QUFDekI7SUFBYiw0QkFBVSxFQUFFOzt1Q0FBNEI7QUFDM0I7SUFBYiw0QkFBVSxFQUFFOzsyQ0FBZ0M7QUFDL0I7SUFBYiw0QkFBVSxFQUFFOzt1Q0FBNEI7QUFaM0MsMEJBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3VtZXIgfSBmcm9tIFwiLlwiO1xyXG5pbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSB9IGZyb20gXCIuLlwiO1xyXG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc1VVSUQsIElzT3B0aW9uYWwgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XHJcblxyXG5leHBvcnQgZW51bSBBZGRyZXNzVHlwZSB7XHJcbiAgSE9NRSA9IFwiaG9tZVwiLFxyXG4gIFdPUksgPSBcIndvcmtcIlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFkZHJlc3NTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xyXG4gIHR5cGU/OiBBZGRyZXNzVHlwZTtcclxuICBjb25zdW1lcj86IENvbnN1bWVyO1xyXG4gIGNvbnN1bWVySWQ6IHN0cmluZztcclxuICBjb3VudHJ5OiBzdHJpbmc7XHJcbiAgZ2VvOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH07XHJcbiAgY2l0eTogc3RyaW5nO1xyXG4gIGNvZGU6IHN0cmluZztcclxuICBzdGF0ZTogc3RyaW5nO1xyXG4gIHN0cmVldDogc3RyaW5nO1xyXG4gIGNvbXBsZW1lbnQ6IHN0cmluZztcclxuICBudW1iZXI6IHN0cmluZztcclxuICByZWZlcmVuY2U/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3MgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBBZGRyZXNzU2NoZW1hIHtcclxuICBjb25zdW1lcj86IENvbnN1bWVyID0gdW5kZWZpbmVkO1xyXG4gIEBJc1VVSUQoKSBjb25zdW1lcklkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblxyXG4gIHR5cGU/OiBBZGRyZXNzVHlwZSA9IEFkZHJlc3NUeXBlLkhPTUU7XHJcbiAgQElzT3B0aW9uYWwoKSByZWZlcmVuY2U/OiBzdHJpbmc7XHJcbiAgQElzTm90RW1wdHkoKSBjb3VudHJ5OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBzdGF0ZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgY2l0eTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgY29kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBJc05vdEVtcHR5KCkgc3RyZWV0OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBjb21wbGVtZW50OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQElzTm90RW1wdHkoKSBudW1iZXI6IHN0cmluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgZ2VvOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0gPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8QWRkcmVzc1NjaGVtYT4pIHtcclxuICAgIHN1cGVyKGRhdGEpO1xyXG5cclxuICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcclxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpLm1hcChwcm9wID0+ICh0aGlzW3Byb3BdID0gZGF0YVtwcm9wXSkpO1xyXG4gIH1cclxufVxyXG4iXX0=