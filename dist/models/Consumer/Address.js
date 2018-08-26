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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQ29uc3VtZXIvQWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDBCQUFnRDtBQUNoRCxxREFBcUQ7QUFjckQsYUFBNkIsU0FBUSxhQUFTO0lBYTVDLFlBQVksSUFBNEI7UUFDdEMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBYmQsYUFBUSxHQUFjLFNBQVMsQ0FBQztRQUN0QixlQUFVLEdBQVcsU0FBUyxDQUFDO1FBRTNCLFlBQU8sR0FBVyxTQUFTLENBQUM7UUFDNUIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUN6QixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBQ3pCLFlBQU8sR0FBVyxTQUFTLENBQUM7UUFDNUIsZUFBVSxHQUFXLFNBQVMsQ0FBQztRQUMvQixXQUFNLEdBQVcsU0FBUyxDQUFDO1FBRXpDLFFBQUcsR0FBNkIsU0FBUyxDQUFDO1FBS3hDLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0Y7QUFqQlc7SUFBVCx3QkFBTSxFQUFFOzsyQ0FBZ0M7QUFFM0I7SUFBYiw0QkFBVSxFQUFFOzt3Q0FBNkI7QUFDNUI7SUFBYiw0QkFBVSxFQUFFOztxQ0FBMEI7QUFDekI7SUFBYiw0QkFBVSxFQUFFOztxQ0FBMEI7QUFDekI7SUFBYiw0QkFBVSxFQUFFOzt3Q0FBNkI7QUFDNUI7SUFBYiw0QkFBVSxFQUFFOzsyQ0FBZ0M7QUFDL0I7SUFBYiw0QkFBVSxFQUFFOzt1Q0FBNEI7QUFUM0MsMEJBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3VtZXIgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IElzTm90RW1wdHksIElzVVVJRCB9IGZyb20gXCJjbGFzcy12YWxpZGF0b3JcIjtcblxuZXhwb3J0IGludGVyZmFjZSBBZGRyZXNzU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgY29uc3VtZXI/OiBDb25zdW1lcjtcbiAgY29uc3VtZXJJZDogc3RyaW5nO1xuICBjb3VudHJ5OiBzdHJpbmc7XG4gIGdlbzogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xuICBjaXR5OiBzdHJpbmc7XG4gIGNvZGU6IHN0cmluZztcbiAgYWRkcmVzczogc3RyaW5nO1xuICBjb21wbGVtZW50OiBzdHJpbmc7XG4gIG51bWJlcjogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzIGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgQWRkcmVzc1NjaGVtYSB7XG4gIGNvbnN1bWVyPzogQ29uc3VtZXIgPSB1bmRlZmluZWQ7XG4gIEBJc1VVSUQoKSBjb25zdW1lcklkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKSBjb3VudHJ5OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJc05vdEVtcHR5KCkgY2l0eTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASXNOb3RFbXB0eSgpIGNvZGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElzTm90RW1wdHkoKSBhZGRyZXNzOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJc05vdEVtcHR5KCkgY29tcGxlbWVudDogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASXNOb3RFbXB0eSgpIG51bWJlcjogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gIGdlbzogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9ID0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFBhcnRpYWw8QWRkcmVzc1NjaGVtYT4pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIC8vIEFzc2lnbiBhbGwgcHJvcHNcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzKS5tYXAocHJvcCA9PiAodGhpc1twcm9wXSA9IGRhdGFbcHJvcF0pKTtcbiAgfVxufVxuIl19