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
    constructor(data = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQ29uc3VtZXIvQWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdCQUE2QztBQUM3QywwQkFBZ0Q7QUFDaEQscURBQXlEO0FBRXpELElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNyQiw0QkFBYSxDQUFBO0lBQ2IsNEJBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUd0QjtBQWdCRCxhQUFxQixTQUFRLGFBQVM7SUFlcEMsWUFBWSxPQUErQixFQUFFO1FBQzNDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQWZkLGFBQVEsR0FBYyxTQUFTLENBQUM7UUFFbEIsU0FBSSxHQUFnQixXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3JDLFlBQU8sR0FBVyxTQUFTLENBQUM7UUFDNUIsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUMxQixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBQ3pCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFDekIsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixlQUFVLEdBQVksU0FBUyxDQUFDO1FBQ2hDLFdBQU0sR0FBWSxTQUFTLENBQUM7UUFHMUMsUUFBRyxHQUE2QixTQUFTLENBQUM7UUFLeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksV0FBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0Y7QUFuQmU7SUFBYiw0QkFBVSxFQUFFOztxQ0FBc0M7QUFDckM7SUFBYiw0QkFBVSxFQUFFOzt3Q0FBNkI7QUFDNUI7SUFBYiw0QkFBVSxFQUFFOztzQ0FBMkI7QUFDMUI7SUFBYiw0QkFBVSxFQUFFOztxQ0FBMEI7QUFDekI7SUFBYiw0QkFBVSxFQUFFOztxQ0FBMEI7QUFDekI7SUFBYiw0QkFBVSxFQUFFOzt1Q0FBNEI7QUFDM0I7SUFBYiw0QkFBVSxFQUFFOzsyQ0FBaUM7QUFDaEM7SUFBYiw0QkFBVSxFQUFFOzt1Q0FBNkI7QUFDNUI7SUFBYiw0QkFBVSxFQUFFOzswQ0FBb0I7QUFYbkMsMEJBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3VtZXIsIENvbnN1bWVyU2NoZW1hIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hIH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc09wdGlvbmFsIH0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xuXG5leHBvcnQgZW51bSBBZGRyZXNzVHlwZSB7XG4gIEhPTUUgPSBcImhvbWVcIixcbiAgV09SSyA9IFwid29ya1wiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWRkcmVzc1NjaGVtYSBleHRlbmRzIEJhc2VNb2RlbFNjaGVtYSB7XG4gIGNvbnN1bWVyPzogQ29uc3VtZXJTY2hlbWE7XG4gIHR5cGU6IEFkZHJlc3NUeXBlO1xuICBjb3VudHJ5OiBzdHJpbmc7XG4gIGdlbzogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xuICBjaXR5OiBzdHJpbmc7XG4gIGNvZGU6IHN0cmluZztcbiAgc3RhdGU6IHN0cmluZztcbiAgc3RyZWV0OiBzdHJpbmc7XG4gIGNvbXBsZW1lbnQ/OiBzdHJpbmc7XG4gIG51bWJlcj86IHN0cmluZztcbiAgcmVmZXJlbmNlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQWRkcmVzcyBleHRlbmRzIEJhc2VNb2RlbCBpbXBsZW1lbnRzIEFkZHJlc3NTY2hlbWEge1xuICBjb25zdW1lcj86IENvbnN1bWVyID0gdW5kZWZpbmVkO1xuXG4gIEBJc05vdEVtcHR5KCkgdHlwZTogQWRkcmVzc1R5cGUgPSBBZGRyZXNzVHlwZS5IT01FO1xuICBASXNOb3RFbXB0eSgpIGNvdW50cnk6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElzTm90RW1wdHkoKSBzdGF0ZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASXNOb3RFbXB0eSgpIGNpdHk6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElzTm90RW1wdHkoKSBjb2RlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJc05vdEVtcHR5KCkgc3RyZWV0OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJc09wdGlvbmFsKCkgY29tcGxlbWVudD86IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElzT3B0aW9uYWwoKSBudW1iZXI/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJc09wdGlvbmFsKCkgcmVmZXJlbmNlPzogc3RyaW5nO1xuXG4gIGdlbzogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9ID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8QWRkcmVzc1NjaGVtYT4gPSB7fSkge1xuICAgIHN1cGVyKGRhdGEpO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcblxuICAgIHRoaXMuY29uc3VtZXIgPSBkYXRhLmNvbnN1bWVyICYmIG5ldyBDb25zdW1lcihkYXRhLmNvbnN1bWVyKTtcbiAgfVxufVxuIl19