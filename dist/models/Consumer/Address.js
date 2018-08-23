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
class Address extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.consumer = undefined;
        this.consumerId = undefined;
        this.country = undefined;
        this.city = undefined;
        this.code = undefined;
        this.address = undefined;
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
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
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
], Address.prototype, "address", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Address.prototype, "complement", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Address.prototype, "number", void 0);
exports.default = Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQ29uc3VtZXIvQWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDBCQUFnRDtBQUNoRCxxREFBcUQ7QUFjckQsYUFBNkIsU0FBUSxhQUFTO0lBb0I1QyxZQUFZLElBQTRCO1FBQ3RDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQXBCZCxhQUFRLEdBQWMsU0FBUyxDQUFDO1FBRWhDLGVBQVUsR0FBVyxTQUFTLENBQUM7UUFHL0IsWUFBTyxHQUFXLFNBQVMsQ0FBQztRQUU1QixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBRXpCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFFekIsWUFBTyxHQUFXLFNBQVMsQ0FBQztRQUU1QixlQUFVLEdBQVcsU0FBUyxDQUFDO1FBRS9CLFdBQU0sR0FBVyxTQUFTLENBQUM7UUFFM0IsUUFBRyxHQUE2QixTQUFTLENBQUM7UUFLeEMsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Q0FDRjtBQXZCQztJQURDLHdCQUFNLEVBQUU7OzJDQUNzQjtBQUcvQjtJQURDLDRCQUFVLEVBQUU7O3dDQUNlO0FBRTVCO0lBREMsNEJBQVUsRUFBRTs7cUNBQ1k7QUFFekI7SUFEQyw0QkFBVSxFQUFFOztxQ0FDWTtBQUV6QjtJQURDLDRCQUFVLEVBQUU7O3dDQUNlO0FBRTVCO0lBREMsNEJBQVUsRUFBRTs7MkNBQ2tCO0FBRS9CO0lBREMsNEJBQVUsRUFBRTs7dUNBQ2M7QUFoQjdCLDBCQTBCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN1bWVyIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hIH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc1VVSUQgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWRkcmVzc1NjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XG4gIGNvbnN1bWVyPzogQ29uc3VtZXI7XG4gIGNvbnN1bWVySWQ6IHN0cmluZztcbiAgY291bnRyeTogc3RyaW5nO1xuICBnZW86IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfTtcbiAgY2l0eTogc3RyaW5nO1xuICBjb2RlOiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgY29tcGxlbWVudDogc3RyaW5nO1xuICBudW1iZXI6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkcmVzcyBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIEFkZHJlc3NTY2hlbWEge1xuICBjb25zdW1lcj86IENvbnN1bWVyID0gdW5kZWZpbmVkO1xuICBASXNVVUlEKClcbiAgY29uc3VtZXJJZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIEBJc05vdEVtcHR5KClcbiAgY291bnRyeTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASXNOb3RFbXB0eSgpXG4gIGNpdHk6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElzTm90RW1wdHkoKVxuICBjb2RlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJc05vdEVtcHR5KClcbiAgYWRkcmVzczogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASXNOb3RFbXB0eSgpXG4gIGNvbXBsZW1lbnQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElzTm90RW1wdHkoKVxuICBudW1iZXI6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBnZW86IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBQYXJ0aWFsPEFkZHJlc3NTY2hlbWE+KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICAvLyBBc3NpZ24gYWxsIHByb3BzXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcykubWFwKHByb3AgPT4gKHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdKSk7XG4gIH1cbn1cbiJdfQ==