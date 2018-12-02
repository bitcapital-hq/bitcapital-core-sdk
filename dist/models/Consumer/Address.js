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
        this.type = AddressType.HOME;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQ29uc3VtZXIvQWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDBCQUFnRDtBQUNoRCxxREFBcUQ7QUFFckQsSUFBWSxXQUdYO0FBSEQsV0FBWSxXQUFXO0lBQ3JCLDRCQUFhLENBQUE7SUFDYiw0QkFBYSxDQUFBO0FBQ2YsQ0FBQyxFQUhXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBR3RCO0FBZUQsYUFBNkIsU0FBUSxhQUFTO0lBYzVDLFlBQVksSUFBNEI7UUFDdEMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBZGQsU0FBSSxHQUFpQixXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3RDLGFBQVEsR0FBYyxTQUFTLENBQUM7UUFDdEIsZUFBVSxHQUFXLFNBQVMsQ0FBQztRQUUzQixZQUFPLEdBQVcsU0FBUyxDQUFDO1FBQzVCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFDekIsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUN6QixZQUFPLEdBQVcsU0FBUyxDQUFDO1FBQzVCLGVBQVUsR0FBVyxTQUFTLENBQUM7UUFDL0IsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUV6QyxRQUFHLEdBQTZCLFNBQVMsQ0FBQztRQUt4QyxtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztDQUNGO0FBakJXO0lBQVQsd0JBQU0sRUFBRTs7MkNBQWdDO0FBRTNCO0lBQWIsNEJBQVUsRUFBRTs7d0NBQTZCO0FBQzVCO0lBQWIsNEJBQVUsRUFBRTs7cUNBQTBCO0FBQ3pCO0lBQWIsNEJBQVUsRUFBRTs7cUNBQTBCO0FBQ3pCO0lBQWIsNEJBQVUsRUFBRTs7d0NBQTZCO0FBQzVCO0lBQWIsNEJBQVUsRUFBRTs7MkNBQWdDO0FBQy9CO0lBQWIsNEJBQVUsRUFBRTs7dUNBQTRCO0FBVjNDLDBCQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN1bWVyIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hIH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc1VVSUQgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBlbnVtIEFkZHJlc3NUeXBlIHtcbiAgSE9NRSA9ICdob21lJyxcbiAgV09SSyA9ICd3b3JrJyxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBZGRyZXNzU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgdHlwZT86IEFkZHJlc3NUeXBlLFxuICBjb25zdW1lcj86IENvbnN1bWVyO1xuICBjb25zdW1lcklkOiBzdHJpbmc7XG4gIGNvdW50cnk6IHN0cmluZztcbiAgZ2VvOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH07XG4gIGNpdHk6IHN0cmluZztcbiAgY29kZTogc3RyaW5nO1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNvbXBsZW1lbnQ6IHN0cmluZztcbiAgbnVtYmVyOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3MgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBBZGRyZXNzU2NoZW1hIHtcbiAgdHlwZT86IEFkZHJlc3NUeXBlID0gQWRkcmVzc1R5cGUuSE9NRTtcbiAgY29uc3VtZXI/OiBDb25zdW1lciA9IHVuZGVmaW5lZDtcbiAgQElzVVVJRCgpIGNvbnN1bWVySWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBASXNOb3RFbXB0eSgpIGNvdW50cnk6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElzTm90RW1wdHkoKSBjaXR5OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJc05vdEVtcHR5KCkgY29kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASXNOb3RFbXB0eSgpIGFkZHJlc3M6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElzTm90RW1wdHkoKSBjb21wbGVtZW50OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJc05vdEVtcHR5KCkgbnVtYmVyOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgZ2VvOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0gPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxBZGRyZXNzU2NoZW1hPikge1xuICAgIHN1cGVyKGRhdGEpO1xuXG4gICAgLy8gQXNzaWduIGFsbCBwcm9wc1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpLm1hcChwcm9wID0+ICh0aGlzW3Byb3BdID0gZGF0YVtwcm9wXSkpO1xuICB9XG59XG4iXX0=