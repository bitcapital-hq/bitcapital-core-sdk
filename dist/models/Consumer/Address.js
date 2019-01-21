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
        this.reference = undefined;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9tb2RlbHMvQ29uc3VtZXIvQWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdCQUE2QztBQUM3QywwQkFBZ0Q7QUFDaEQscURBQXlEO0FBRXpELElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNyQiw0QkFBYSxDQUFBO0lBQ2IsNEJBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUd0QjtBQWdCRCxhQUFxQixTQUFRLGFBQVM7SUFlcEMsWUFBWSxPQUErQixFQUFFO1FBQzNDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQWZkLGFBQVEsR0FBYyxTQUFTLENBQUM7UUFFbEIsU0FBSSxHQUFnQixXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3JDLFlBQU8sR0FBVyxTQUFTLENBQUM7UUFDNUIsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUMxQixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBQ3pCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFDekIsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixlQUFVLEdBQVksU0FBUyxDQUFDO1FBQ2hDLFdBQU0sR0FBWSxTQUFTLENBQUM7UUFDNUIsY0FBUyxHQUFZLFNBQVMsQ0FBQztRQUU3QyxRQUFHLEdBQTZCLFNBQVMsQ0FBQztRQUt4QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxXQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDRjtBQW5CZTtJQUFiLDRCQUFVLEVBQUU7O3FDQUFzQztBQUNyQztJQUFiLDRCQUFVLEVBQUU7O3dDQUE2QjtBQUM1QjtJQUFiLDRCQUFVLEVBQUU7O3NDQUEyQjtBQUMxQjtJQUFiLDRCQUFVLEVBQUU7O3FDQUEwQjtBQUN6QjtJQUFiLDRCQUFVLEVBQUU7O3FDQUEwQjtBQUN6QjtJQUFiLDRCQUFVLEVBQUU7O3VDQUE0QjtBQUMzQjtJQUFiLDRCQUFVLEVBQUU7OzJDQUFpQztBQUNoQztJQUFiLDRCQUFVLEVBQUU7O3VDQUE2QjtBQUM1QjtJQUFiLDRCQUFVLEVBQUU7OzBDQUFnQztBQVgvQywwQkFzQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdW1lciwgQ29uc3VtZXJTY2hlbWEgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgQmFzZU1vZGVsLCBCYXNlTW9kZWxTY2hlbWEgfSBmcm9tIFwiLi5cIjtcbmltcG9ydCB7IElzTm90RW1wdHksIElzT3B0aW9uYWwgfSBmcm9tIFwiY2xhc3MtdmFsaWRhdG9yXCI7XG5cbmV4cG9ydCBlbnVtIEFkZHJlc3NUeXBlIHtcbiAgSE9NRSA9IFwiaG9tZVwiLFxuICBXT1JLID0gXCJ3b3JrXCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBZGRyZXNzU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgY29uc3VtZXI/OiBDb25zdW1lclNjaGVtYTtcbiAgdHlwZTogQWRkcmVzc1R5cGU7XG4gIGNvdW50cnk6IHN0cmluZztcbiAgZ2VvOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH07XG4gIGNpdHk6IHN0cmluZztcbiAgY29kZTogc3RyaW5nO1xuICBzdGF0ZTogc3RyaW5nO1xuICBzdHJlZXQ6IHN0cmluZztcbiAgY29tcGxlbWVudD86IHN0cmluZztcbiAgbnVtYmVyPzogc3RyaW5nO1xuICByZWZlcmVuY2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBBZGRyZXNzIGV4dGVuZHMgQmFzZU1vZGVsIGltcGxlbWVudHMgQWRkcmVzc1NjaGVtYSB7XG4gIGNvbnN1bWVyPzogQ29uc3VtZXIgPSB1bmRlZmluZWQ7XG5cbiAgQElzTm90RW1wdHkoKSB0eXBlOiBBZGRyZXNzVHlwZSA9IEFkZHJlc3NUeXBlLkhPTUU7XG4gIEBJc05vdEVtcHR5KCkgY291bnRyeTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASXNOb3RFbXB0eSgpIHN0YXRlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBJc05vdEVtcHR5KCkgY2l0eTogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASXNOb3RFbXB0eSgpIGNvZGU6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElzTm90RW1wdHkoKSBzdHJlZXQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElzT3B0aW9uYWwoKSBjb21wbGVtZW50Pzogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASXNPcHRpb25hbCgpIG51bWJlcj86IHN0cmluZyA9IHVuZGVmaW5lZDtcbiAgQElzT3B0aW9uYWwoKSByZWZlcmVuY2U/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgZ2VvOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0gPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxBZGRyZXNzU2NoZW1hPiA9IHt9KSB7XG4gICAgc3VwZXIoZGF0YSk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuXG4gICAgdGhpcy5jb25zdW1lciA9IGRhdGEuY29uc3VtZXIgJiYgbmV3IENvbnN1bWVyKGRhdGEuY29uc3VtZXIpO1xuICB9XG59XG4iXX0=