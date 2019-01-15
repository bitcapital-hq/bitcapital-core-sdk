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
const _1 = require(".");
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
        this.type = AddressType.HOME;
        this.country = undefined;
        this.state = undefined;
        this.city = undefined;
        this.code = undefined;
        this.street = undefined;
        this.complement = undefined;
        this.number = undefined;
        this.geo = undefined;
        Object.assign(this, data);
        this.consumer = data.consumer && new _1.Consumer(data.consumer);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Address.prototype, "type", void 0);
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
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Address.prototype, "complement", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Address.prototype, "number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Address.prototype, "reference", void 0);
exports.Address = Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQ29uc3VtZXIvQWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdCQUE2QztBQUM3QywwQkFBZ0Q7QUFDaEQscURBQXlEO0FBRXpELElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNyQiw0QkFBYSxDQUFBO0lBQ2IsNEJBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUd0QjtBQWdCRCxhQUFxQixTQUFRLGFBQVM7SUFlcEMsWUFBWSxJQUE0QjtRQUN0QyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFmZCxhQUFRLEdBQWMsU0FBUyxDQUFDO1FBRWxCLFNBQUksR0FBZ0IsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNyQyxZQUFPLEdBQVcsU0FBUyxDQUFDO1FBQzVCLFVBQUssR0FBVyxTQUFTLENBQUM7UUFDMUIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUN6QixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBQ3pCLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFDM0IsZUFBVSxHQUFZLFNBQVMsQ0FBQztRQUNoQyxXQUFNLEdBQVksU0FBUyxDQUFDO1FBRzFDLFFBQUcsR0FBNkIsU0FBUyxDQUFDO1FBS3hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLFdBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNGO0FBbkJlO0lBQWIsNEJBQVUsRUFBRTs7cUNBQXNDO0FBQ3JDO0lBQWIsNEJBQVUsRUFBRTs7d0NBQTZCO0FBQzVCO0lBQWIsNEJBQVUsRUFBRTs7c0NBQTJCO0FBQzFCO0lBQWIsNEJBQVUsRUFBRTs7cUNBQTBCO0FBQ3pCO0lBQWIsNEJBQVUsRUFBRTs7cUNBQTBCO0FBQ3pCO0lBQWIsNEJBQVUsRUFBRTs7dUNBQTRCO0FBQzNCO0lBQWIsNEJBQVUsRUFBRTs7MkNBQWlDO0FBQ2hDO0lBQWIsNEJBQVUsRUFBRTs7dUNBQTZCO0FBQzVCO0lBQWIsNEJBQVUsRUFBRTs7MENBQW9CO0FBWG5DLDBCQXNCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN1bWVyLCBDb25zdW1lclNjaGVtYSB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBCYXNlTW9kZWwsIEJhc2VNb2RlbFNjaGVtYSB9IGZyb20gXCIuLlwiO1xuaW1wb3J0IHsgSXNOb3RFbXB0eSwgSXNPcHRpb25hbCB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcblxuZXhwb3J0IGVudW0gQWRkcmVzc1R5cGUge1xuICBIT01FID0gXCJob21lXCIsXG4gIFdPUksgPSBcIndvcmtcIlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFkZHJlc3NTY2hlbWEgZXh0ZW5kcyBCYXNlTW9kZWxTY2hlbWEge1xuICBjb25zdW1lcj86IENvbnN1bWVyU2NoZW1hO1xuICB0eXBlOiBBZGRyZXNzVHlwZTtcbiAgY291bnRyeTogc3RyaW5nO1xuICBnZW86IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcbiAgY2l0eTogc3RyaW5nO1xuICBjb2RlOiBzdHJpbmc7XG4gIHN0YXRlOiBzdHJpbmc7XG4gIHN0cmVldDogc3RyaW5nO1xuICBjb21wbGVtZW50Pzogc3RyaW5nO1xuICBudW1iZXI/OiBzdHJpbmc7XG4gIHJlZmVyZW5jZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEFkZHJlc3MgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBBZGRyZXNzU2NoZW1hIHtcbiAgY29uc3VtZXI/OiBDb25zdW1lciA9IHVuZGVmaW5lZDtcblxuICBASXNOb3RFbXB0eSgpIHR5cGU6IEFkZHJlc3NUeXBlID0gQWRkcmVzc1R5cGUuSE9NRTtcbiAgQElzTm90RW1wdHkoKSBjb3VudHJ5OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJc05vdEVtcHR5KCkgc3RhdGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElzTm90RW1wdHkoKSBjaXR5OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJc05vdEVtcHR5KCkgY29kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASXNOb3RFbXB0eSgpIHN0cmVldDogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASXNPcHRpb25hbCgpIGNvbXBsZW1lbnQ/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJc09wdGlvbmFsKCkgbnVtYmVyPzogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASXNPcHRpb25hbCgpIHJlZmVyZW5jZT86IHN0cmluZztcblxuICBnZW86IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPEFkZHJlc3NTY2hlbWE+KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICAgIFxuICAgIHRoaXMuY29uc3VtZXIgPSBkYXRhLmNvbnN1bWVyICYmIG5ldyBDb25zdW1lcihkYXRhLmNvbnN1bWVyKTtcbiAgfVxufVxuIl19